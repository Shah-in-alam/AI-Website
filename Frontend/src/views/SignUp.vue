<template>
  <div class="signup-modern-bg">
    <div class="signup-hero">
      <h1 class="signup-title animate-fade-in">Create Your <span class="gradient-text">AI Website</span> Account</h1>
      <p class="signup-sub animate-slide-up">Join us and unlock the power of artificial intelligence for your business.</p>
    </div>
    <div class="form-container-modern animate-fade-in-delay">
      <div class="form-card-modern">
        <h2 class="form-title">Sign Up</h2>
        <p v-if="error" class="error-message animate-shake">{{ error }}</p>
        <form @submit.prevent="handleSubmit">
          <div class="form-group-modern">
            <label for="username">Full Name</label>
            <input type="text" id="username" v-model="username" required class="input-anim" />
          </div>
          <div class="form-group-modern">
            <label for="email">Email</label>
            <input type="email" id="email" v-model="email" required class="input-anim" />
          </div>
          <div class="form-group-modern">
            <label for="confirmEmail">Confirm Email</label>
            <input type="email" id="confirmEmail" v-model="confirmEmail" required class="input-anim" />
          </div>
          <div class="form-group-modern password-group-modern">
            <label for="password">Password</label>
            <input :type="passwordFieldType" id="password" v-model="password" required class="input-anim" />
            <button type="button" @click="togglePasswordVisibility" class="password-toggle-modern">
              <svg v-if="passwordFieldType === 'password'" xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd" />
              </svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414L5.586 7.5c-.75.811-1.25 1.776-1.5 2.5a10.029 10.029 0 003.5 3.5 10.029 10.029 0 002.5-.586l3.707 3.707a1 1 0 001.414-1.414L4.414 3.5zM7.5 10a2.5 2.5 0 002.5 2.5c.749 0 1.432-.303 1.946-.799l.707.707a4.502 4.502 0 01-2.653 1.092 4.5 4.5 0 01-4.5-4.5c0-1.396.56-2.653 1.464-3.536L7.5 8.5V10z" clip-rule="evenodd" />
              </svg>
            </button>
          </div>
          <div class="form-group-modern">
            <label for="address">Address</label>
            <input type="text" id="address" v-model="address" required class="input-anim" />
          </div>
          <div class="form-group-modern checkbox-group-modern">
            <input type="checkbox" id="privacyPolicy" v-model="privacyPolicy" required />
            <label for="privacyPolicy" class="terms-label">
              I accept the
              <router-link to="/terms" class="terms-link">Terms</router-link>
              and
              <router-link to="/privacy" class="terms-link">Privacy Policy</router-link>
            </label>
          </div>
          <button type="submit" :disabled="loading" class="signup-btn-modern">{{ loading ? 'Creating account...' : 'Create Account' }}</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import axios from 'axios'
import { API_ENDPOINTS } from '../config/api'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()
const username = ref('')
const email = ref('')
const confirmEmail = ref('')
const password = ref('')
const address = ref('')
const privacyPolicy = ref(false)
const loading = ref(false)
const passwordFieldType = ref('password')
const error = ref(null)

const togglePasswordVisibility = () => {
  passwordFieldType.value = passwordFieldType.value === 'password' ? 'text' : 'password'
}

const handleSubmit = async () => {
  if (email.value !== confirmEmail.value) {
    error.value = 'Emails do not match'
    return
  }
  loading.value = true
  error.value = null
  try {
    const response = await axios.post(API_ENDPOINTS.SIGNUP, {
      username: username.value,
      email: email.value,
      confirmEmail: confirmEmail.value,
      password: password.value,
      address: address.value,
      privacyPolicy: privacyPolicy.value
    })
    localStorage.setItem('token', response.data.token)
    authStore.setAuth(true, response.data.user)
    const redirect = route.query.redirect
    if (redirect === 'payment') {
      const selectedPlan = JSON.parse(localStorage.getItem('selectedPlan'))
      if (selectedPlan) {
        localStorage.removeItem('selectedPlan')
        router.push({
          path: '/payment',
          query: {
            planName: selectedPlan.name,
            price: selectedPlan.price,
            period: selectedPlan.period
          }
        })
        return
      }
    }
    router.push('/signin')
  } catch (err) {
    error.value = err.response?.data?.error || 'Registration failed. Please try again.'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.signup-modern-bg {
  min-height: 100vh;
  background: linear-gradient(120deg, #6a5acd 0%, #00c6ff 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  overflow-x: hidden;
}
.signup-hero {
  text-align: center;
  margin-top: 3.5rem;
  margin-bottom: 2.5rem;
}
.signup-title {
  font-size: 2.5rem;
  font-weight: 900;
  color: #fff;
  margin-bottom: 0.7rem;
  letter-spacing: 1px;
}
.gradient-text {
  background: linear-gradient(90deg, #3498db, #2ecc71);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.signup-sub {
  font-size: 1.2rem;
  color: #e0e0e0;
  font-weight: 500;
}
.form-container-modern {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  min-height: 60vh;
}
.form-card-modern {
  background: rgba(255,255,255,0.92);
  border-radius: 1.5rem;
  box-shadow: 0 8px 32px rgba(52, 152, 219, 0.18);
  padding: 2.5rem 2rem 2rem 2rem;
  width: 420px;
  max-width: 95vw;
  text-align: center;
  backdrop-filter: blur(7px);
  animation: fadeInUp 0.8s cubic-bezier(.39,.575,.56,1) both;
}
.form-title {
  font-size: 2rem;
  font-weight: 800;
  color: #2c3e50;
  margin-bottom: 1.5rem;
}
.error-message {
  color: #e74c3c;
  margin-bottom: 20px;
  font-size: 15px;
  font-weight: 500;
}
.form-group-modern {
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
.input-anim {
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
.input-anim:focus {
  outline: none;
  border-color: #6a5acd;
  box-shadow: 0 0 0 3px rgba(106, 90, 205, 0.13);
  background: #f4f8ff;
}
.password-group-modern {
  position: relative;
}
.password-toggle-modern {
  position: absolute;
  right: 12px;
  top: 60%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
}
.password-toggle-modern .icon {
  width: 22px;
  height: 22px;
  color: #888;
  transition: color 0.3s;
}
.password-toggle-modern:hover .icon {
  color: #6a5acd;
}
.signup-btn-modern {
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
.signup-btn-modern:hover {
  background: linear-gradient(90deg, #2ecc71 0%, #3498db 100%);
  transform: translateY(-2px) scale(1.04);
}
.checkbox-group-modern {
  display: flex;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 20px;
}
.checkbox-group-modern input[type="checkbox"] {
  width: auto;
  margin-right: 10px;
  height: 20px;
  width: 20px;
}
.checkbox-group-modern label {
  margin-bottom: 0;
  font-size: 15px;
  font-weight: normal;
  color: #555;
}
/* Animations */
.animate-fade-in {
  animation: fadeIn 1.1s cubic-bezier(.39,.575,.56,1) both;
}
.animate-fade-in-delay {
  animation: fadeIn 1.1s cubic-bezier(.39,.575,.56,1) both;
  animation-delay: 0.5s;
}
@keyframes fadeIn {
  0% { opacity: 0; transform: translateY(20px); }
  100% { opacity: 1; transform: translateY(0); }
}
.animate-slide-up {
  animation: slideUp 1.2s cubic-bezier(.39,.575,.56,1) both;
}
@keyframes slideUp {
  0% { opacity: 0; transform: translateY(40px); }
  100% { opacity: 1; transform: translateY(0); }
}
@keyframes fadeInUp {
  0% { opacity: 0; transform: translateY(40px); }
  100% { opacity: 1; transform: translateY(0); }
}
.animate-shake {
  animation: shake 0.4s cubic-bezier(.36,.07,.19,.97) both;
}
@keyframes shake {
  10%, 90% { transform: translateX(-2px); }
  20%, 80% { transform: translateX(4px); }
  30%, 50%, 70% { transform: translateX(-8px); }
  40%, 60% { transform: translateX(8px); }
}
.terms-label {
  font-size: 0.98rem;
  color: #555;
  font-weight: 400;
}
.terms-link {
  color: #3498db;
  text-decoration: underline;
  font-size: 0.98rem;
  margin: 0 2px;
  cursor: pointer;
  transition: color 0.2s;
}
.terms-link:hover {
  color: #2ecc71;
}
</style> 