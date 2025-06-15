<template>
  <div class="form-container">
    <div class="form-card">
      <h2>Sign In</h2>
      <p v-if="error" class="error-message">{{ error }}</p>
      <form @submit.prevent="login">
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" v-model="email" required />
        </div>
        <div class="form-group password-group">
          <label for="password">Password</label>
          <input :type="passwordFieldType" id="password" v-model="password" required />
          <button type="button" @click="togglePasswordVisibility" class="password-toggle">
            <svg v-if="passwordFieldType === 'password'" xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
              <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd" />
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414L5.586 7.5c-.75.811-1.25 1.776-1.5 2.5a10.029 10.029 0 003.5 3.5 10.029 10.029 0 002.5-.586l3.707 3.707a1 1 0 001.414-1.414L4.414 3.5zM7.5 10a2.5 2.5 0 002.5 2.5c.749 0 1.432-.303 1.946-.799l.707.707a4.502 4.502 0 01-2.653 1.092 4.5 4.5 0 01-4.5-4.5c0-1.396.56-2.653 1.464-3.536L7.5 8.5V10z" clip-rule="evenodd" />
            </svg>
          </button>
        </div>
        <button type="submit" :disabled="loading">{{ loading ? 'Signing in...' : 'Sign In' }}</button>
      </form>
      <div class="divider">OR</div>
      <button type="button" @click="signInWithGoogle" class="google-button">
        <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" alt="Google logo" class="google-logo" />
        Sign in with Google
      </button>
      <p class="signup-link">
        Don't have an account? <router-link to="/signup">Sign Up</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()
const email = ref('')
const password = ref('')
const loading = ref(false)
const passwordFieldType = ref('password')
const error = ref(null)

const togglePasswordVisibility = () => {
  passwordFieldType.value = passwordFieldType.value === 'password' ? 'text' : 'password'
}

const login = async () => {
  loading.value = true
  error.value = null
  try {
    const response = await axios.post('http://localhost:3000/api/auth/signin', {
      email: email.value,
      password: password.value,
    })
    console.log('Login success:', response.data)
    alert('Login successful!')
    // router.push('/dashboard')
  } catch (err) {
    console.error('Login error:', err.response?.data?.error || err.message)
    error.value = err.response?.data?.error || 'Login failed. Please check your credentials.'
  } finally {
    loading.value = false
  }
}

const signInWithGoogle = () => {
  // Implementation for signing in with Google
}
</script>

<style scoped>
@keyframes gradientAnimation {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.form-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 80px - 60px); /* Adjust for navbar and footer height */
  width: 100%; /* Ensure it takes full width */
  margin: 0; /* Remove any default margins */
}

.form-card {
  background: rgba(255, 255, 255, 0.9);
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  padding: 40px;
  width: 420px;
  max-width: 90%;
  text-align: center;
  backdrop-filter: blur(5px);
  animation: fadeIn 1s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
}

h2 {
  font-size: 28px;
  margin-bottom: 25px;
  color: #333;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.1);
}

.error-message {
  color: #e74c3c;
  margin-bottom: 20px;
  font-size: 15px;
  font-weight: 500;
}

.form-group {
  margin-bottom: 20px;
  text-align: left;
}

label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
  color: #555;
  font-size: 15px;
}

input[type="email"],
input[type="password"],
input[type="text"] {
  width: 100%;
  padding: 12px 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  box-sizing: border-box;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
  background-color: #fcfcfc;
  color: #333; /* Ensuring text color is dark */
}

input:focus {
  outline: none;
  border-color: #6a5acd;
  box-shadow: 0 0 0 3px rgba(106, 90, 205, 0.2);
}

.password-group {
  position: relative;
}

.password-toggle {
  position: absolute;
  right: 12px;
  top: 60%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
}

.password-toggle .icon {
  width: 22px;
  height: 22px;
  color: #888;
  transition: color 0.3s ease;
}

.password-toggle:hover .icon {
  color: #6a5acd;
}

button[type="submit"] {
  background-color: #6a5acd;
  color: white;
  padding: 14px 25px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 18px;
  width: 100%;
  transition: background-color 0.3s ease, transform 0.3s ease;
  letter-spacing: 0.5px;
  margin-top: 25px;
}

button[type="submit"]:hover {
  background-color: #483d8b;
  transform: translateY(-2px);
}

button[type="submit"]:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
  transform: none;
}

.divider {
  text-align: center;
  margin: 25px 0;
  font-size: 14px;
  color: #777;
  position: relative;
}

.divider::before,
.divider::after {
  content: '';
  position: absolute;
  top: 50%;
  width: 40%;
  height: 1px;
  background-color: #ccc;
}

.divider::before {
  left: 0;
}

.divider::after {
  right: 0;
}

.google-button {
  background-color: #ffffff;
  color: #333;
  border: 1px solid #ddd;
  padding: 12px 20px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
}

.google-button:hover {
  background-color: #f0f0f0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.google-button .google-logo {
  width: 20px;
  height: 20px;
}

.signup-link {
  margin-top: 20px;
  font-size: 14px;
  color: #555;
}

.signup-link a {
  color: #007bff;
  text-decoration: none;
  font-weight: bold;
}

.signup-link a:hover {
  text-decoration: underline;
}
</style> 