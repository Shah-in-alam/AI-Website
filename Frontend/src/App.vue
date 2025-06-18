<script setup>
import HelloWorld from './components/HelloWorld.vue'
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
import ChatButton from './components/ChatButton.vue'
</script>

<template>
  <div class="app">
    <Navbar />
    <main class="main-content">
      <router-view />
    </main>
    <Footer />
    <ChatButton />
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

@keyframes gradientAnimation {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

html,
body {
  overflow-x: hidden;
  height: 100vh;
  width: 100vw;
  background: linear-gradient(270deg, #b0c4de, #87ceeb, #6a5acd, #483d8b);
  background-size: 800% 800%;
  animation: gradientAnimation 15s ease infinite;
  scroll-behavior: smooth;
}

#app {
  height: 100%;
  width: 100%;
  position: relative;
  top: 0;
  left: 0;
  overflow-x: hidden;
}

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  line-height: 1.6;
  min-height: 100vh;
  overflow-x: hidden;
}

.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
  padding-top: 70px; /* Same as navbar height */
}

/* Modern form styles */
input, textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
  background-color: #ffffff;
}

input:focus, textarea:focus {
  outline: none;
  border-color: #4CAF50;
  box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.1);
}

button {
  cursor: pointer;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  transition: all 0.3s ease;
  background-color: #4CAF50;
  color: white;
}

button:hover {
  background-color: #45a049;
  transform: translateY(-1px);
}

button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
  transform: none;
}

/* Card styles */
.card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  margin: 1rem;
}

/* Container styles */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

/* Add custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
