const express = require('express');
const router = express.Router();
const prisma = require('../config/database');
const { authenticateToken } = require('../middleware/auth');

// Initialize Stripe only if the key is available
let stripe;
try {
  stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
} catch (error) {
  console.warn('Stripe initialization failed:', error.message);
}

// Create a payment intent
router.post('/create-payment-intent', authenticateToken, async (req, res) => {
  try {
    if (!stripe) {
      return res.status(503).json({ error: 'Payment service is currently unavailable' });
    }

    const { amount, currency, plan, period } = req.body;
    const userId = req.user.userId;

    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: currency,
      metadata: {
        plan: plan,
        period: period,
        userId: userId
      },
      automatic_payment_methods: {
        enabled: true,
      },
    });

    // Create a pending payment record
    await prisma.payment.create({
      data: {
        userId: userId,
        amount: amount / 100, // Convert from cents to actual amount
        currency: currency,
        status: 'pending',
        stripePaymentId: paymentIntent.id,
        subscription: {
          create: {
            userId: userId,
            planName: plan,
            planType: period,
            price: amount / 100,
            status: 'pending',
            endDate: new Date(
              period === 'monthly' 
                ? Date.now() + 30 * 24 * 60 * 60 * 1000 
                : Date.now() + 365 * 24 * 60 * 60 * 1000
            )
          }
        }
      }
    });

    res.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    res.status(500).json({ error: error.message });
  }
});

// Webhook handler
router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  if (!stripe) {
    return res.status(503).json({ error: 'Payment service is currently unavailable' });
  }

  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'payment_intent.succeeded') {
    const paymentIntent = event.data.object;
    
    try {
      await prisma.$transaction([
        prisma.payment.update({
          where: { stripePaymentId: paymentIntent.id },
          data: { status: 'completed' }
        }),
        prisma.subscription.update({
          where: { 
            payment: { stripePaymentId: paymentIntent.id }
          },
          data: { status: 'active' }
        })
      ]);
    } catch (error) {
      console.error('Error updating payment status:', error);
      return res.status(500).json({ error: 'Error updating payment status' });
    }
  }

  res.json({ received: true });
});

// Process payment without Stripe
router.post('/process-payment', authenticateToken, async (req, res) => {
  try {
    const { planName, price, period } = req.body;
    const userId = req.user.userId;

    const endDate = new Date();
    if (period === 'month') {
      endDate.setMonth(endDate.getMonth() + 1);
    } else if (period === 'year') {
      endDate.setFullYear(endDate.getFullYear() + 1);
    }

    const subscription = await prisma.subscription.create({
      data: {
        userId: userId,
        planName: planName,
        planType: period,
        price: parseFloat(price),
        status: 'active',
        endDate: endDate,
      }
    });

    await prisma.payment.create({
      data: {
        userId: userId,
        subscriptionId: subscription.id,
        amount: parseFloat(price),
        currency: 'EUR', // Assuming EUR, you can make this dynamic
        status: 'completed'
      }
    });

    res.status(201).json({ message: 'Payment successful', subscription });

  } catch (error) {
    console.error('Error processing payment:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get subscription status
router.get('/subscription', authenticateToken, async (req, res) => {
  try {
    const subscription = await prisma.subscription.findFirst({
      where: {
        userId: req.user.userId,
        status: 'active'
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    res.json({ subscription });
  } catch (error) {
    console.error('Error fetching subscription:', error);
    res.status(500).json({ error: 'Error fetching subscription status' });
  }
});

router.get('/test', (req, res) => res.send('Payment router working!'));

module.exports = router; 