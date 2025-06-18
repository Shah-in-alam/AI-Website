<template>
  <div class="payment-page">
    <div class="payment-container">
      <!-- Plan Summary -->
      <div class="plan-summary">
        <h2>Plan Summary</h2>
        <div class="selected-plan">
          <h3>{{ selectedPlan.name }}</h3>
          <div class="plan-price">
            <span class="currency">€</span>
            <span class="amount">{{ selectedPlan.price }}</span>
            <span class="period">/{{ selectedPlan.period }}</span>
          </div>
          <ul class="plan-features">
            <li v-for="(feature, index) in selectedPlan.features" :key="index">
              <span class="check">✓</span> {{ feature }}
            </li>
          </ul>
        </div>
      </div>

      <!-- Payment Form -->
      <div class="payment-form">
        <h2>Payment Details</h2>
        <form @submit.prevent="handlePayment">
          <!-- Error Message -->
          <div v-if="stripeError" class="error-message">
            {{ stripeError }}
          </div>

          <!-- Card Number -->
          <div class="form-group">
            <label for="cardNumber">Card Number</label>
            <div class="card-input">
              <input 
                type="text" 
                id="cardNumber" 
                v-model="paymentDetails.cardNumber"
                placeholder="1234 5678 9012 3456"
                maxlength="19"
                @input="formatCardNumber"
                required
              />
              <div class="card-type">
                <img :src="cardTypeIcon" alt="Card Type" v-if="cardTypeIcon" />
              </div>
            </div>
          </div>

          <!-- Card Details Row -->
          <div class="card-details-row">
            <!-- Expiry Date -->
            <div class="form-group">
              <label for="expiryDate">Expiry Date</label>
              <input 
                type="text" 
                id="expiryDate" 
                v-model="paymentDetails.expiryDate"
                placeholder="MM/YY"
                maxlength="5"
                @input="formatExpiryDate"
                required
              />
            </div>

            <!-- CVV -->
            <div class="form-group">
              <label for="cvv">CVV</label>
              <input 
                type="text" 
                id="cvv" 
                v-model="paymentDetails.cvv"
                placeholder="123"
                maxlength="3"
                @input="formatCVV"
                required
              />
            </div>
          </div>

          <!-- Cardholder Name -->
          <div class="form-group">
            <label for="cardholderName">Cardholder Name</label>
            <input 
              type="text" 
              id="cardholderName" 
              v-model="paymentDetails.cardholderName"
              placeholder="John Doe"
              required
            />
          </div>

          <!-- Billing Address -->
          <div class="form-group">
            <label for="billingAddress">Billing Address</label>
            <input 
              type="text" 
              id="billingAddress" 
              v-model="paymentDetails.billingAddress"
              placeholder="123 Street Name"
              required
            />
          </div>

          <!-- City and Postal Code -->
          <div class="card-details-row">
            <div class="form-group">
              <label for="city">City</label>
              <input 
                type="text" 
                id="city" 
                v-model="paymentDetails.city"
                placeholder="City"
                required
              />
            </div>
            <div class="form-group">
              <label for="postalCode">Postal Code</label>
              <input 
                type="text" 
                id="postalCode" 
                v-model="paymentDetails.postalCode"
                placeholder="12345"
                required
              />
            </div>
          </div>

          <!-- Country -->
          <div class="form-group">
            <label for="country">Country</label>
            <select id="country" v-model="paymentDetails.country" required>
              <option value="">Select Country</option>
              <option value="DE">Germany</option>
              <option value="FR">France</option>
              <option value="IT">Italy</option>
              <option value="ES">Spain</option>
              <option value="UK">United Kingdom</option>
              <!-- Add more countries as needed -->
            </select>
          </div>

          <!-- Terms and Conditions -->
          <div class="terms-checkbox">
            <label>
              <input 
                type="checkbox" 
                v-model="paymentDetails.acceptTerms"
                required
              />
              I agree to the <router-link to="/terms">Terms of Service</router-link> and <router-link to="/privacy">Privacy Policy</router-link>
            </label>
          </div>

          <!-- Payment Button -->
          <button 
            type="submit" 
            class="payment-button"
            :disabled="isProcessing"
          >
            <span v-if="isProcessing">
              <span class="spinner"></span>
              Processing...
            </span>
            <span v-else>
              Pay €{{ selectedPlan.price }}
            </span>
          </button>

          <!-- Secure Payment Notice -->
          <div class="secure-payment">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
            <span>Secure Payment</span>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import stripePromise from '../config/stripe'
import axios from 'axios'

const route = useRoute()
const router = useRouter()
const isProcessing = ref(false)
const stripeError = ref(null)

// Get plan details from route query
const selectedPlan = ref({
  name: route.query.planName || 'Monthly Plan',
  price: route.query.price || '50',
  period: route.query.period || 'month',
  features: [
    'Full access to all features',
    'Unlimited projects',
    'Priority support',
    'Advanced analytics',
    'API access'
  ]
})

// Payment form data
const paymentDetails = ref({
  cardNumber: '',
  expiryDate: '',
  cvv: '',
  cardholderName: '',
  billingAddress: '',
  city: '',
  postalCode: '',
  country: '',
  acceptTerms: false
})

// Card type detection
const cardTypeIcon = computed(() => {
  const number = paymentDetails.value.cardNumber.replace(/\D/g, '')
  if (number.startsWith('4')) return '/visa.svg'
  if (number.startsWith('5')) return '/mastercard.svg'
  if (number.startsWith('3')) return '/amex.svg'
  return null
})

// Format card number with spaces
const formatCardNumber = (event) => {
  let value = event.target.value.replace(/\D/g, '')
  let formattedValue = ''
  for (let i = 0; i < value.length; i++) {
    if (i > 0 && i % 4 === 0) {
      formattedValue += ' '
    }
    formattedValue += value[i]
  }
  paymentDetails.value.cardNumber = formattedValue
}

// Format expiry date
const formatExpiryDate = (event) => {
  let value = event.target.value.replace(/\D/g, '')
  if (value.length >= 2) {
    value = value.slice(0, 2) + '/' + value.slice(2)
  }
  paymentDetails.value.expiryDate = value
}

// Format CVV
const formatCVV = (event) => {
  paymentDetails.value.cvv = event.target.value.replace(/\D/g, '')
}

// Handle payment submission
const handlePayment = async () => {
  try {
    isProcessing.value = true
    stripeError.value = null

    // 1. Create a payment intent on your backend
    const response = await axios.post('http://localhost:5000/api/create-payment-intent', {
      amount: selectedPlan.value.price * 100, // Convert to cents
      currency: 'eur',
      plan: selectedPlan.value.name,
      period: selectedPlan.value.period
    })

    // 2. Get the client secret from the response
    const { clientSecret } = response.data

    // 3. Load Stripe
    const stripe = await stripePromise

    // 4. Confirm the payment
    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: {
          number: paymentDetails.value.cardNumber.replace(/\s/g, ''),
          exp_month: parseInt(paymentDetails.value.expiryDate.split('/')[0]),
          exp_year: parseInt('20' + paymentDetails.value.expiryDate.split('/')[1]),
          cvc: paymentDetails.value.cvv
        },
        billing_details: {
          name: paymentDetails.value.cardholderName,
          address: {
            line1: paymentDetails.value.billingAddress,
            city: paymentDetails.value.city,
            postal_code: paymentDetails.value.postalCode,
            country: paymentDetails.value.country
          }
        }
      }
    })

    if (error) {
      stripeError.value = error.message
      throw new Error(error.message)
    }

    if (paymentIntent.status === 'succeeded') {
      // Payment successful
      alert('Payment successful! Thank you for your subscription.')
      router.push('/dashboard') // Redirect to dashboard or success page
    }
  } catch (error) {
    console.error('Payment error:', error)
    stripeError.value = error.message || 'An error occurred during payment processing.'
  } finally {
    isProcessing.value = false
  }
}

// Check if plan details are provided
onMounted(() => {
  if (!route.query.planName || !route.query.price) {
    router.push('/plans') // Redirect to plans page if no plan selected
  }
})
</script>

<style scoped>
.payment-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #1a1a1a, #2c3e50);
  padding: 4rem 2rem;
  color: #fff;
}

.payment-container {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 2rem;
}

.plan-summary, .payment-form {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 2rem;
}

.plan-summary h2, .payment-form h2 {
  color: #3498db;
  margin-bottom: 2rem;
  text-align: center;
}

.selected-plan {
  text-align: center;
}

.plan-price {
  font-size: 2.5rem;
  font-weight: 700;
  margin: 1rem 0;
  color: #2ecc71;
}

.plan-features {
  list-style: none;
  padding: 0;
  margin: 2rem 0;
}

.plan-features li {
  margin: 1rem 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.check {
  color: #2ecc71;
  font-weight: bold;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: rgba(255, 255, 255, 0.9);
}

.form-group input,
.form-group select {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.05);
  color: #fff;
  font-size: 1rem;
}

.card-input {
  position: relative;
}

.card-type {
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
}

.card-type img {
  height: 24px;
}

.card-details-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.terms-checkbox {
  margin: 2rem 0;
}

.terms-checkbox label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: rgba(255, 255, 255, 0.9);
}

.terms-checkbox a {
  color: #3498db;
  text-decoration: none;
}

.payment-button {
  width: 100%;
  padding: 1rem;
  border: none;
  border-radius: 8px;
  background: linear-gradient(135deg, #3498db, #2ecc71);
  color: white;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
}

.payment-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(52, 152, 219, 0.3);
}

.payment-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.spinner {
  width: 20px;
  height: 20px;
  border: 2px solid #fff;
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.secure-payment {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1rem;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
}

.secure-payment svg {
  width: 16px;
  height: 16px;
  color: #2ecc71;
}

.error-message {
  background-color: #fee2e2;
  color: #dc2626;
  padding: 1rem;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
  font-size: 0.875rem;
}

@media (max-width: 768px) {
  .payment-container {
    grid-template-columns: 1fr;
  }
  
  .card-details-row {
    grid-template-columns: 1fr;
  }
}
</style> 