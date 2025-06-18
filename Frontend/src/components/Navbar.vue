<template>
  <nav class="navbar" :class="{ 'scrolled': isScrolled, 'nav-hidden': isNavHidden }">
    <div class="nav-container">
      <div class="nav-brand">
        <router-link to="/" class="brand-link">
          <span class="brand-text">AI Website</span>
        </router-link>
      </div>
      
      <!-- Hamburger Menu Button -->
      <button class="hamburger" @click="toggleMenu" :class="{ 'active': isMenuOpen }" aria-label="Toggle menu">
        <span></span>
        <span></span>
        <span></span>
      </button>

      <!-- Navigation Menu -->
      <div class="nav-menu" :class="{ 'active': isMenuOpen }">
        <div class="nav-links">
          <router-link to="/" class="nav-item" @click="closeMenu">Home</router-link>
          <router-link to="/services" class="nav-item" @click="closeMenu">Services</router-link>
          <router-link to="/plans" class="nav-item" @click="closeMenu">Plans</router-link>
          <router-link to="/contact" class="nav-item" @click="closeMenu">Contact</router-link>
          <router-link to="/about" class="nav-item" @click="closeMenu">About</router-link>
          <router-link to="/career" class="nav-item" @click="closeMenu">Careers</router-link>
        </div>

        <div class="more-menu">
          <button class="more-button" @click="toggleMoreMenu">
            <span>More</span>
            <svg class="more-icon" :class="{ 'active': isMoreMenuOpen }" viewBox="0 0 24 24">
              <path d="M7 10l5 5 5-5z"/>
            </svg>
          </button>
          <div class="more-dropdown" v-if="isMoreMenuOpen">
            <router-link to="/faq" class="more-item" @click="closeMenu">FAQ</router-link>
            <router-link to="/blog" class="more-item" @click="closeMenu">Blog</router-link>
            <router-link to="/support" class="more-item" @click="closeMenu">Support</router-link>
            <router-link to="/privacy" class="more-item" @click="closeMenu">Privacy Policy</router-link>
            <router-link to="/terms" class="more-item" @click="closeMenu">Terms of Service</router-link>
          </div>
        </div>

        <div class="auth-buttons">
          <template v-if="isAuthenticated">
            <div class="user-info">
              <span v-if="userData && userData.username" class="welcome-text">Welcome, {{ userData.username }}</span>
              <button @click="handleLogout" class="logout-button">Logout</button>
            </div>
          </template>
          <template v-else>
            <router-link to="/signin" class="nav-item signin" @click="closeMenu">Sign In</router-link>
            <router-link to="/signup" class="nav-item signup" @click="closeMenu">Sign Up</router-link>
          </template>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useAuthStore } from '../stores/auth'

const isMenuOpen = ref(false)
const isMoreMenuOpen = ref(false)
const isScrolled = ref(false)
const isNavHidden = ref(false)
let lastScrollY = ref(0)

const authStore = useAuthStore()
const isAuthenticated = computed(() => authStore.isAuthenticated)
const userData = computed(() => authStore.userData)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
  if (!isMenuOpen.value) {
    isMoreMenuOpen.value = false
  }
}

const toggleMoreMenu = () => {
  isMoreMenuOpen.value = !isMoreMenuOpen.value
}

const closeMenu = () => {
  isMenuOpen.value = false
  isMoreMenuOpen.value = false
}

const handleLogout = () => {
  authStore.logout()
  if (isMenuOpen.value) {
    isMenuOpen.value = false
  }
}

const handleScroll = () => {
  const currentScrollY = window.scrollY
  
  // Show/hide navbar based on scroll direction
  if (currentScrollY > lastScrollY.value && currentScrollY > 100) {
    // Scrolling down & past threshold
    isNavHidden.value = true
  } else {
    // Scrolling up
    isNavHidden.value = false
  }
  
  // Update scroll position
  lastScrollY.value = currentScrollY
  
  // Update scrolled state for background
  isScrolled.value = currentScrollY > 20
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  lastScrollY.value = window.scrollY
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  transition: all 0.3s ease;
  background: transparent;
  transform: translateY(0);
  height: 70px; /* Fixed height for navbar */
}

.navbar.nav-hidden {
  transform: translateY(-100%);
}

.navbar.scrolled {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
}

.nav-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%; /* Make container take full height of navbar */
}

.nav-brand {
  z-index: 2;
}

.brand-link {
  text-decoration: none;
}

.brand-text {
  font-size: 1.5rem;
  font-weight: 700;
  color: #2c3e50;
  transition: color 0.3s ease;
}

.navbar.scrolled .brand-text {
  color: #2c3e50;
}

.hamburger {
  display: none;
  flex-direction: column;
  justify-content: space-between;
  width: 30px;
  height: 21px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 10;
}

.hamburger span {
  width: 100%;
  height: 3px;
  background-color: #2c3e50;
  border-radius: 3px;
  transition: all 0.3s ease;
}

.hamburger.active span:nth-child(1) {
  transform: translateY(9px) rotate(45deg);
}

.hamburger.active span:nth-child(2) {
  opacity: 0;
}

.hamburger.active span:nth-child(3) {
  transform: translateY(-9px) rotate(-45deg);
}

.nav-menu {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.nav-links {
  display: flex;
  gap: 2rem;
}

.nav-item {
  color: #2c3e50;
  text-decoration: none;
  font-size: 1rem;
  font-weight: 500;
  transition: all 0.3s ease;
  position: relative;
}

.nav-item::after {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 0;
  height: 2px;
  background: #3498db;
  transition: width 0.3s ease;
}

.nav-item:hover::after {
  width: 100%;
}

.auth-buttons {
  display: flex;
  gap: 1rem;
  margin-left: 2rem;
}

.signin {
  color: #2c3e50;
}

.signup {
  background: linear-gradient(135deg, #3498db, #2980b9);
  color: white;
  padding: 0.5rem 1.5rem;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.signup:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(52, 152, 219, 0.3);
}

.more-menu {
  position: relative;
}

.more-button {
  background: none;
  border: none;
  color: #2c3e50;
  font-size: 1rem;
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.more-icon {
  width: 20px;
  height: 20px;
  transition: transform 0.3s ease;
}

.more-icon.active {
  transform: rotate(180deg);
}

.more-dropdown {
  position: absolute;
  top: 100%;
  right: 0;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  min-width: 200px;
  padding: 0.5rem;
  margin-top: 0.5rem;
  animation: fadeIn 0.3s ease;
}

.more-item {
  display: block;
  padding: 0.75rem 1rem;
  color: #2c3e50;
  text-decoration: none;
  transition: all 0.3s ease;
  border-radius: 8px;
}

.more-item:hover {
  background: #f8f9fa;
  color: #3498db;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .hamburger {
    display: flex;
  }

  .nav-menu {
    position: fixed;
    top: 0;
    right: -100%;
    width: 100%;
    height: 100vh;
    background: white;
    flex-direction: column;
    padding: 80px 2rem 2rem;
    transition: right 0.3s ease;
  }

  .nav-menu.active {
    right: 0;
  }

  .nav-links {
    flex-direction: column;
    width: 100%;
    text-align: center;
  }

  .auth-buttons {
    flex-direction: column;
    width: 100%;
    margin: 1rem 0;
  }

  .signup {
    text-align: center;
  }

  .more-dropdown {
    position: static;
    box-shadow: none;
    background: transparent;
    padding: 0;
    margin: 0;
  }

  .more-item {
    padding: 0.5rem 0;
  }
}

.user-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.welcome-text {
  color: #2c3e50;
  font-size: 0.9rem;
}

.logout-button {
  background: #e74c3c;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background-color 0.3s ease;
}

.logout-button:hover {
  background: #c0392b;
}
</style> 