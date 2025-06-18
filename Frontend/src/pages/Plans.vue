<template>
  <div class="plans-page">
    <div class="plans-container">
      <div class="plans-header">
        <h1>Choose Your Plan</h1>
        <p class="subtitle">Select the perfect plan for your needs</p>
        
        <!-- Billing Toggle -->
        <div class="billing-toggle">
          <span :class="{ active: billingCycle === 'monthly' }">Monthly</span>
          <label class="switch">
            <input type="checkbox" v-model="billingCycle" true-value="yearly" false-value="monthly">
            <span class="slider round"></span>
          </label>
          <span :class="{ active: billingCycle === 'yearly' }">Yearly</span>
          <span class="save-badge" v-if="billingCycle === 'yearly'">Save 16%</span>
        </div>
      </div>

      <!-- Plans Grid -->
      <div class="plans-grid">
        <!-- Monthly Plan -->
        <div class="plan-card" :class="{ 'active': billingCycle === 'monthly' }">
          <div class="plan-header">
            <h2>Monthly Plan</h2>
            <div class="price">
              <span class="currency">€</span>
              <span class="amount">50</span>
              <span class="period">/month</span>
            </div>
          </div>
          <div class="plan-features">
            <ul>
              <li><span class="check">✓</span> Full access to all features</li>
              <li><span class="check">✓</span> Unlimited projects</li>
              <li><span class="check">✓</span> Priority support</li>
              <li><span class="check">✓</span> Advanced analytics</li>
              <li><span class="check">✓</span> API access</li>
            </ul>
          </div>
          <button class="select-plan" @click="selectPlan('monthly')">
            Get Started
          </button>
        </div>

        <!-- Yearly Plan -->
        <div class="plan-card" :class="{ 'active': billingCycle === 'yearly' }">
          <div class="plan-header">
            <h2>Yearly Plan</h2>
            <div class="price">
              <span class="currency">€</span>
              <span class="amount">699</span>
              <span class="period">/year</span>
            </div>
            <div class="monthly-price">€58.25/month</div>
          </div>
          <div class="plan-features">
            <ul>
              <li><span class="check">✓</span> All Monthly features</li>
              <li><span class="check">✓</span> 2 months free</li>
              <li><span class="check">✓</span> Premium support</li>
              <li><span class="check">✓</span> Custom integrations</li>
              <li><span class="check">✓</span> Team collaboration</li>
            </ul>
          </div>
          <button class="select-plan" @click="selectPlan('yearly')">
            Get Started
          </button>
        </div>
      </div>

      <!-- FAQ Section -->
      <div class="plans-faq">
        <h2>Frequently Asked Questions</h2>
        <div class="faq-grid">
          <div class="faq-item">
            <h3>Can I change plans later?</h3>
            <p>Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.</p>
          </div>
          <div class="faq-item">
            <h3>What payment methods do you accept?</h3>
            <p>We accept all major credit cards, PayPal, and bank transfers.</p>
          </div>
          <div class="faq-item">
            <h3>Is there a free trial?</h3>
            <p>Yes, we offer a 14-day free trial with full access to all features.</p>
          </div>
          <div class="faq-item">
            <h3>Can I get a refund?</h3>
            <p>We offer a 30-day money-back guarantee for all paid plans.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const authStore = useAuthStore()
const billingCycle = ref('monthly')

const selectPlan = (plan) => {
  // Check if user is authenticated
  if (!authStore.checkAuth()) {
    // Store the selected plan in localStorage to retrieve it after signup
    const planDetails = {
      monthly: {
        name: 'Monthly Plan',
        price: '50',
        period: 'month'
      },
      yearly: {
        name: 'Yearly Plan',
        price: '699',
        period: 'year'
      }
    }
    
    localStorage.setItem('selectedPlan', JSON.stringify(planDetails[plan]))
    
    // Redirect to signup page
    router.push({
      path: '/signup',
      query: { redirect: 'payment' }
    })
    return
  }

  // If authenticated, proceed to payment
  const planDetails = {
    monthly: {
      name: 'Monthly Plan',
      price: '50',
      period: 'month'
    },
    yearly: {
      name: 'Yearly Plan',
      price: '699',
      period: 'year'
    }
  }
  
  const selectedPlan = planDetails[plan]
  router.push({
    path: '/payment',
    query: {
      planName: selectedPlan.name,
      price: selectedPlan.price,
      period: selectedPlan.period
    }
  })
}
</script>

<style scoped>
.plans-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #1a1a1a, #2c3e50);
  padding: 4rem 2rem;
  color: #fff;
}

.plans-container {
  max-width: 1200px;
  margin: 0 auto;
}

.plans-header {
  text-align: center;
  margin-bottom: 4rem;
}

.plans-header h1 {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, #3498db, #2ecc71);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.subtitle {
  color: rgba(255, 255, 255, 0.7);
  font-size: 1.2rem;
  margin-bottom: 2rem;
}

.billing-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
}

.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  transition: .4s;
}

input:checked + .slider {
  background-color: #3498db;
}

input:checked + .slider:before {
  transform: translateX(26px);
}

.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}

.save-badge {
  background: #2ecc71;
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
}

.plans-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
}

.plan-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}

.plan-card:hover {
  transform: translateY(-5px);
  border-color: #3498db;
}

.plan-card.active {
  border-color: #3498db;
  box-shadow: 0 0 20px rgba(52, 152, 219, 0.3);
}

.plan-header {
  text-align: center;
  margin-bottom: 2rem;
}

.plan-header h2 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #3498db;
}

.price {
  font-size: 3rem;
  font-weight: 700;
  color: #fff;
}

.currency {
  font-size: 1.5rem;
  vertical-align: super;
}

.period {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.7);
}

.monthly-price {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
  margin-top: 0.5rem;
}

.plan-features {
  margin-bottom: 2rem;
}

.plan-features ul {
  list-style: none;
  padding: 0;
}

.plan-features li {
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.check {
  color: #2ecc71;
  font-weight: bold;
}

.select-plan {
  width: 100%;
  padding: 1rem;
  border: none;
  border-radius: 10px;
  background: linear-gradient(135deg, #3498db, #2ecc71);
  color: white;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.select-plan:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(52, 152, 219, 0.3);
}

.plans-faq {
  margin-top: 4rem;
}

.plans-faq h2 {
  text-align: center;
  margin-bottom: 2rem;
  color: #3498db;
}

.faq-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.faq-item {
  background: rgba(255, 255, 255, 0.05);
  padding: 1.5rem;
  border-radius: 15px;
}

.faq-item h3 {
  color: #3498db;
  margin-bottom: 1rem;
}

.faq-item p {
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.6;
}

@media (max-width: 768px) {
  .plans-page {
    padding: 2rem 1rem;
  }

  .plans-header h1 {
    font-size: 2rem;
  }

  .plans-grid {
    grid-template-columns: 1fr;
  }
}
</style> 