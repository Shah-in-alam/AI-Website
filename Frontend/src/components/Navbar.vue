<template>
  <nav class="navbar">
    <div class="nav-brand">
      <router-link to="/">AI Website</router-link>
    </div>
    
    <!-- Hamburger Menu Button -->
    <button class="hamburger" @click="toggleMenu" :class="{ 'active': isMenuOpen }">
      <span></span>
      <span></span>
      <span></span>
    </button>

    <!-- Navigation Menu -->
    <div class="nav-menu" :class="{ 'active': isMenuOpen }">
      <router-link to="/" class="nav-item">Home</router-link>
      <router-link to="/services" class="nav-item">Services</router-link>
      <router-link to="/plans" class="nav-item">Plans</router-link>
      <router-link to="/contact" class="nav-item">Contact</router-link>
      <router-link to="/about" class="nav-item">About</router-link>
      <div class="more-menu">
        <button class="more-button" @click="toggleMoreMenu">
          <span>...</span>
        </button>
        <div class="more-dropdown" v-if="isMoreMenuOpen">
          <router-link to="/faq" class="more-item">FAQ</router-link>
          <router-link to="/blog" class="more-item">Blog</router-link>
          <router-link to="/support" class="more-item">Support</router-link>
          <router-link to="/privacy" class="more-item">Privacy Policy</router-link>
          <router-link to="/terms" class="more-item">Terms of Service</router-link>
        </div>
      </div>
      <div class="auth-buttons">
        <router-link to="/signin" class="nav-item signin">Sign In</router-link>
        <router-link to="/signup" class="nav-item signup">Sign Up</router-link>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'

const isMenuOpen = ref(false)
const isMoreMenuOpen = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
  if (!isMenuOpen.value) {
    isMoreMenuOpen.value = false
  }
}

const toggleMoreMenu = () => {
  isMoreMenuOpen.value = !isMoreMenuOpen.value
}
</script>

<style scoped>
.navbar {
  background-color: #2c3e50;
  padding: 1rem 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  margin: 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}

.nav-brand {
  padding-left: 1rem;
}

.nav-brand a {
  color: white;
  text-decoration: none;
  font-size: 1.5rem;
  font-weight: bold;
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
  margin-right: 1rem;
}

.hamburger span {
  width: 100%;
  height: 3px;
  background-color: white;
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
  margin-right: 1rem;
}

.nav-item {
  color: white;
  text-decoration: none;
  font-size: 1rem;
  transition: color 0.3s ease;
}

.nav-item:hover {
  color: #3498db;
}

.auth-buttons {
  display: flex;
  gap: 1rem;
}

.signin {
  color: white;
}

.signup {
  background-color: #3498db;
  padding: 0.5rem 1rem;
  border-radius: 4px;
}

.signup:hover {
  background-color: #2980b9;
  color: white;
}

.more-menu {
  position: relative;
}

.more-button {
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.more-button:hover {
  color: #3498db;
}

.more-dropdown {
  position: absolute;
  top: 100%;
  right: 0;
  background-color: #2c3e50;
  border-radius: 4px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  min-width: 200px;
  z-index: 1000;
}

.more-item {
  display: block;
  padding: 0.75rem 1rem;
  color: white;
  text-decoration: none;
  transition: background-color 0.3s ease;
}

.more-item:hover {
  background-color: #34495e;
  color: #3498db;
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
    background-color: #2c3e50;
    flex-direction: column;
    padding: 80px 1rem 2rem;
    transition: right 0.3s ease;
    z-index: 5;
    margin-right: 0;
  }

  .nav-menu.active {
    right: 0;
  }

  .auth-buttons {
    flex-direction: column;
    width: 100%;
    margin-top: 1rem;
  }

  .signup {
    text-align: center;
  }

  .more-dropdown {
    position: static;
    box-shadow: none;
    background-color: transparent;
    padding-left: 0;
    width: 100%;
  }

  .more-item {
    padding: 0.5rem 0;
  }
}
</style> 