<template>
  <div class="payment-page">
    <div class="payment-container">
      <!-- Success Message -->
      <div v-if="paymentSuccess" class="payment-success">
        <div class="success-icon">
          <svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
        </div>
        <h2>Payment Successful!</h2>
        <p>Your subscription is now active. Thank you for your purchase.</p>
        <div class="plan-summary">
          <h3>{{ selectedPlan.name }}</h3>
          <div class="plan-price">
            <span class="currency">€</span>
            <span class="amount">{{ selectedPlan.price }}</span>
            <span class="period">/{{ selectedPlan.period }}</span>
          </div>
        </div>
        <button @click="goHome" class="home-button">Go to Homepage</button>
      </div>

      <template v-else>
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
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import api from '../config/api'
import { useAuthStore } from '../stores/auth'

const route = useRoute()
const router = useRouter()
const isProcessing = ref(false)
const stripeError = ref(null)
const paymentSuccess = ref(false)
const authStore = useAuthStore()

// Get plan details from route query
const selectedPlan = ref({
  name: route.query.planName || 'Monthly Plan',
  price: route.query.price || '50',
  period: route.query.period || 'month',
  features: [
    'Full access to all features',
    'Priority support',
    'Cancel anytime',
  ],
})

const paymentDetails = ref({
  cardNumber: '',
  expiryDate: '',
  cvv: '',
  cardholderName: '',
  billingAddress: '',
  city: '',
  postalCode: '',
  country: '',
  acceptTerms: false,
})

const cardTypeIcon = computed(() => {
  // Simple card type detection (Visa, MasterCard, etc.)
  const number = paymentDetails.value.cardNumber
  if (/^4/.test(number)) return 'https://img.icons8.com/color/48/000000/visa.png'
  if (/^5[1-5]/.test(number)) return 'https://img.icons8.com/color/48/000000/mastercard.png'
  if (/^3[47]/.test(number)) return 'https://img.icons8.com/color/48/000000/amex.png'
  return ''
})

function formatCardNumber(e) {
  let value = e.target.value.replace(/\D/g, '')
  value = value.replace(/(.{4})/g, '$1 ').trim()
  paymentDetails.value.cardNumber = value
}
function formatExpiryDate(e) {
  let value = e.target.value.replace(/\D/g, '')
  if (value.length > 2) value = value.slice(0,2) + '/' + value.slice(2,4)
  paymentDetails.value.expiryDate = value.slice(0,5)
}
function formatCVV(e) {
  paymentDetails.value.cvv = e.target.value.replace(/\D/g, '').slice(0,3)
}

async function handlePayment() {
  isProcessing.value = true
  stripeError.value = null

  try {
    const paymentData = {
      planName: selectedPlan.value.name,
      price: selectedPlan.value.price,
      period: selectedPlan.value.period,
    };

    // Assuming you have the auth token in your api instance
    await api.post('/payment/process-payment', paymentData, {
       headers: {
        'Authorization': `Bearer ${authStore.token}`
      }
    });

    paymentSuccess.value = true
  } catch (error) {
    stripeError.value = 'An error occurred during payment. Please try again.'
    console.error('Payment error:', error);
  } finally {
    isProcessing.value = false
  }
}

function goHome() {
  router.push('/');
}
</script>

<style scoped>
.payment-page {
  min-height: 100vh;
  background: linear-gradient(120deg, #6a5acd 0%, #00c6ff 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3vw 1vw;
}
.payment-container {
  display: flex;
  flex-wrap: wrap;
  gap: 3rem;
  background: rgba(255,255,255,0.92);
  border-radius: 2rem;
  box-shadow: 0 8px 32px rgba(52, 152, 219, 0.18);
  padding: 3rem 2.5rem 2.5rem 2.5rem;
  max-width: 900px;
  width: 100%;
  animation: fadeInUp 0.8s cubic-bezier(.39,.575,.56,1) both;
}
.plan-summary {
  flex: 1 1 300px;
  background: rgba(255,255,255,0.85);
  border-radius: 1.2rem;
  box-shadow: 0 2px 8px rgba(52, 152, 219, 0.08);
  padding: 1.5rem 1.2rem 1.2rem 1.2rem;
  margin-bottom: 2rem;
  margin-right: 1.5rem;
  min-width: 260px;
  max-width: 320px;
  align-self: flex-start;
}
.plan-summary h2 {
  color: #3498db;
  font-size: 1.25rem;
  font-weight: 800;
  margin-bottom: 1.2rem;
}
.selected-plan h3 {
  color: #2c3e50;
  font-size: 1.15rem;
  font-weight: 700;
  margin-bottom: 2px;
}
.plan-price {
  font-size: 2rem;
  font-weight: 900;
  color: #2ecc71;
  margin-bottom: 0.7rem;
}
.currency {
  font-size: 1.2rem;
  vertical-align: super;
}
.period {
  font-size: 1.1rem;
  color: #888;
  margin-left: 2px;
}
.plan-features {
  margin-top: 1rem;
  padding-left: 1.2rem;
}
.plan-features li {
  color: #4a5568;
  font-size: 1.05rem;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
}
.check {
  color: #2ecc71;
  margin-right: 0.5rem;
}
.payment-form {
  flex: 2 1 400px;
  background: rgba(255,255,255,0.98);
  border-radius: 1.2rem;
  box-shadow: 0 2px 8px rgba(52, 152, 219, 0.08);
  padding: 1.5rem 1.2rem 1.2rem 1.2rem;
  animation: fadeInUp 0.7s cubic-bezier(.39,.575,.56,1) both;
}
.payment-form h2 {
  color: #3498db;
  font-size: 1.15rem;
  font-weight: 800;
  margin-bottom: 1.2rem;
}
.form-group {
  margin-bottom: 22px;
  text-align: left;
}
label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
  color: #555;
  font-size: 15px;
}
input, select {
  width: 100%;
  padding: 13px 16px;
  border: 1.5px solid #ddd;
  border-radius: 10px;
  font-size: 16px;
  box-sizing: border-box;
  background-color: #fcfcfc;
  color: #333;
  transition: border-color 0.3s, box-shadow 0.3s, background 0.3s;
  animation: fadeIn 1.1s cubic-bezier(.39,.575,.56,1) both;
}
input:focus, select:focus {
  outline: none;
  border-color: #6a5acd;
  box-shadow: 0 0 0 3px rgba(106, 90, 205, 0.13);
  background: #f4f8ff;
}
.card-input {
  display: flex;
  align-items: center;
  gap: 0.7rem;
}
.card-type img {
  width: 36px;
  height: 24px;
}
.card-details-row {
  display: flex;
  gap: 1.2rem;
}
.card-details-row .form-group {
  flex: 1;
}
.terms-checkbox {
  margin-bottom: 1.2rem;
  font-size: 0.98rem;
  color: #555;
}
.terms-checkbox input[type="checkbox"] {
  margin-right: 0.5rem;
}
.payment-button {
  background: linear-gradient(90deg, #3498db 0%, #2ecc71 100%);
  color: #fff;
  border: none;
  border-radius: 2rem;
  padding: 0.9rem 2.5rem;
  font-size: 1.2rem;
  font-weight: 700;
  cursor: pointer;
  width: 100%;
  margin-top: 10px;
  box-shadow: 0 4px 16px rgba(52, 152, 219, 0.12);
  transition: background 0.2s, transform 0.2s;
}
.payment-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}
.payment-button:hover:not(:disabled) {
  background: linear-gradient(90deg, #2ecc71 0%, #3498db 100%);
  transform: translateY(-2px) scale(1.04);
}
.spinner {
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 3px solid #fff;
  border-top: 3px solid #3498db;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-right: 8px;
  vertical-align: middle;
}
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
.secure-payment {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #2ecc71;
  font-weight: 700;
  font-size: 1.08rem;
  margin-top: 1.5rem;
}
.secure-payment svg {
  width: 24px;
  height: 24px;
}
.error-message {
  color: #e74c3c;
  background: #fff0f0;
  border: 1.5px solid #e74c3c;
  border-radius: 0.7rem;
  padding: 0.7rem 1.2rem;
  margin-bottom: 1rem;
  font-weight: 600;
  font-size: 1.05rem;
}
@media (max-width: 900px) {
  .payment-container {
    flex-direction: column;
    padding: 2rem 0.5rem;
    max-width: 98vw;
  }
  .plan-summary {
    margin-right: 0;
    margin-bottom: 1.5rem;
    max-width: 100vw;
  }
}
@keyframes fadeInUp {
  0% { opacity: 0; transform: translateY(40px); }
  100% { opacity: 1; transform: translateY(0); }
}
.payment-success {
  text-align: center;
  padding: 3rem;
  width: 100%;
  background: #fff;
  border-radius: 2rem;
  box-shadow: 0 8px 32px rgba(52, 152, 219, 0.18);
  animation: fadeInUp 0.8s cubic-bezier(.39,.575,.56,1) both;
}
.success-icon {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: #2ecc71;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
}
.success-icon svg {
  width: 48px;
  height: 48px;
  fill: currentColor;
}
.payment-success h2 {
  font-size: 2rem;
  color: #2c3e50;
  margin-bottom: 0.5rem;
}
.payment-success p {
  font-size: 1.1rem;
  color: #4a5568;
  margin-bottom: 2rem;
}
.payment-success .plan-summary {
  margin: 0 auto 2rem;
  padding: 1.5rem;
  border: 1px solid #eee;
  border-radius: 1rem;
  max-width: 300px;
}
.home-button {
  background: linear-gradient(90deg, #3498db 0%, #2ecc71 100%);
  color: #fff;
  border: none;
  border-radius: 2rem;
  padding: 0.9rem 2.5rem;
  font-size: 1.2rem;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 4px 16px rgba(52, 152, 219, 0.12);
  transition: background 0.2s, transform 0.2s;
}
.home-button:hover {
  background: linear-gradient(90deg, #2ecc71 0%, #3498db 100%);
  transform: translateY(-2px) scale(1.04);
}
</style> 