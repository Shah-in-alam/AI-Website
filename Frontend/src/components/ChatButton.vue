<template>
  <button 
    v-show="isVisible" 
    class="chat-float-btn" 
    @click="goToContact" 
    aria-label="Chat with us"
  >
    <svg class="chat-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
    </svg>
    <span class="chat-label">Chat with us</span>
  </button>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const isVisible = ref(true)
let hideTimer = null
let showTimer = null

const goToContact = () => {
  router.push('/contact')
}

const startHideShowCycle = () => {
  // Hide after 50 seconds
  hideTimer = setTimeout(() => {
    isVisible.value = false
    
    // Show again after 2 minutes
    showTimer = setTimeout(() => {
      isVisible.value = true
      startHideShowCycle() // Restart the cycle
    }, 120000) // 2 minutes
  }, 50000) // 50 seconds
}

onMounted(() => {
  startHideShowCycle()
})

onUnmounted(() => {
  // Clear timers when component is destroyed
  if (hideTimer) clearTimeout(hideTimer)
  if (showTimer) clearTimeout(showTimer)
})
</script>

<style scoped>
.chat-float-btn {
  position: fixed;
  right: 2rem;
  bottom: 2rem;
  z-index: 2000;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background: linear-gradient(135deg, #3498db, #2ecc71);
  color: #fff;
  border: none;
  border-radius: 50px;
  padding: 0.75rem 1.5rem;
  box-shadow: 0 4px 24px rgba(52, 152, 219, 0.2);
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s, opacity 0.3s ease;
}
.chat-float-btn:hover {
  transform: translateY(-4px) scale(1.05);
  box-shadow: 0 8px 32px rgba(52, 152, 219, 0.3);
}
.chat-icon {
  width: 1.5em;
  height: 1.5em;
  stroke: #fff;
}
.chat-label {
  display: block;
}
@media (max-width: 600px) {
  .chat-float-btn {
    right: 1rem;
    bottom: 1rem;
    padding: 0.75rem 1rem;
    font-size: 1rem;
  }
  .chat-label {
    display: none;
  }
}
</style> 