<template>
  <div class="career-hero">
    <div class="hero-content">
      <h1 class="hero-title">Careers at AI Website</h1>
      <p class="hero-subtitle">Shape the future of AI with us. Join a passionate, innovative, and diverse team.</p>
      <img class="hero-illustration" :src="analyticsImg" alt="AI Team" />
    </div>
  </div>
  <div class="career-container">
    <section class="open-positions">
      <h2 class="section-title">Open Positions</h2>
      <div class="positions-grid">
        <div class="position-card" v-for="position in positions" :key="position.title">
          <h3>{{ position.title }}</h3>
          <p>{{ position.description }}</p>
          <button class="apply-button" @click="openModal(position.title)">Apply Now</button>
        </div>
      </div>
    </section>
    <section class="benefits">
      <h2 class="section-title">Benefits & Perks</h2>
      <div class="benefits-grid">
        <div class="benefit-card" v-for="benefit in benefits" :key="benefit.text">
          <span class="benefit-icon">{{ benefit.icon }}</span>
          <span class="benefit-text">{{ benefit.text }}</span>
        </div>
      </div>
    </section>
    <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
      <div class="modal">
        <h2>Apply for {{ selectedPosition }}</h2>
        <input v-model="applicantName" placeholder="Your Name" class="modal-input" />
        <input v-model="applicantEmail" placeholder="Your Email" class="modal-input" />
        <textarea v-model="applicantMessage" placeholder="Why are you a great fit?" class="modal-input"></textarea>
        <button class="submit-btn" @click="submitApplication">Submit Application</button>
        <button class="close-btn" @click="closeModal">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import analyticsImg from '../assets/analytics.svg'

const positions = [
  { title: 'AI Engineer', description: 'Design and implement AI solutions for our clients.' },
  { title: 'Full Stack Developer', description: 'Build and maintain our web applications.' },
  { title: 'Data Scientist', description: 'Analyze data and develop machine learning models.' },
]

const benefits = [
  { icon: '💸', text: 'Competitive salary and equity' },
  { icon: '🦷', text: 'Health, dental, and vision insurance' },
  { icon: '⏰', text: 'Flexible work hours and remote options' },
  { icon: '📚', text: 'Professional development budget' },
  { icon: '🎉', text: 'Regular team events and activities' },
]

const showModal = ref(false)
const selectedPosition = ref('')
const applicantName = ref('')
const applicantEmail = ref('')
const applicantMessage = ref('')

function openModal(position) {
  selectedPosition.value = position
  showModal.value = true
}
function closeModal() {
  showModal.value = false
  applicantName.value = ''
  applicantEmail.value = ''
  applicantMessage.value = ''
}
function submitApplication() {
  // Here you would send the application to your backend
  alert(`Application submitted for ${selectedPosition.value}!`)
  closeModal()
}
</script>

<style scoped>
.career-hero {
  background: linear-gradient(120deg, #6a5acd 0%, #00c6ff 100%);
  padding: 4rem 0 2rem 0;
  text-align: center;
  position: relative;
  overflow: hidden;
}
.hero-content {
  max-width: 700px;
  margin: 0 auto;
  color: #fff;
  position: relative;
  z-index: 2;
}
.hero-title {
  font-size: 3rem;
  font-weight: 900;
  margin-bottom: 1rem;
  letter-spacing: 1px;
}
.hero-subtitle {
  font-size: 1.3rem;
  margin-bottom: 2rem;
  font-weight: 500;
}
.hero-illustration {
  width: 320px;
  max-width: 90vw;
  margin-top: 1.5rem;
  filter: drop-shadow(0 8px 32px rgba(52,152,219,0.18));
}
.career-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem 4rem 1rem;
}
.section-title {
  font-size: 2rem;
  font-weight: 800;
  color: #2c3e50;
  margin-bottom: 2rem;
  letter-spacing: 0.5px;
  text-align: center;
}
.positions-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: center;
}
.position-card {
  background: rgba(255,255,255,0.7);
  border-radius: 1.5rem;
  box-shadow: 0 8px 32px rgba(52, 152, 219, 0.12);
  padding: 2.5rem 2rem 2rem 2rem;
  min-width: 260px;
  max-width: 320px;
  flex: 1 1 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: transform 0.2s, box-shadow 0.2s;
  position: relative;
  backdrop-filter: blur(6px);
  border: 1.5px solid #e0e7ff;
  animation: fadeInUp 0.7s cubic-bezier(.39,.575,.56,1) both;
}
.position-card:hover {
  transform: translateY(-10px) scale(1.04);
  box-shadow: 0 16px 40px rgba(52, 152, 219, 0.18);
}
@keyframes fadeInUp {
  0% { opacity: 0; transform: translateY(40px); }
  100% { opacity: 1; transform: translateY(0); }
}
.position-card h3 {
  color: #2c3e50;
  font-size: 1.4rem;
  font-weight: 700;
  margin-bottom: 1rem;
}
.position-card p {
  color: #4a5568;
  margin-bottom: 1.5rem;
  font-size: 1.05rem;
}
.apply-button {
  background: linear-gradient(90deg, #3498db 0%, #2ecc71 100%);
  color: #fff;
  border: none;
  border-radius: 2rem;
  padding: 0.7rem 2rem;
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 4px 16px rgba(52, 152, 219, 0.12);
  transition: background 0.2s, transform 0.2s;
}
.apply-button:hover {
  background: linear-gradient(90deg, #2ecc71 0%, #3498db 100%);
  transform: translateY(-2px) scale(1.04);
}
.benefits-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  justify-content: center;
  margin-top: 2rem;
}
.benefit-card {
  background: rgba(255,255,255,0.8);
  border-radius: 1rem;
  box-shadow: 0 4px 16px rgba(52, 152, 219, 0.10);
  padding: 1.2rem 2rem;
  min-width: 220px;
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 1.1rem;
  font-weight: 500;
  color: #34495e;
  transition: transform 0.2s, box-shadow 0.2s;
  border: 1.5px solid #e0e7ff;
}
.benefit-icon {
  font-size: 1.7rem;
}
.benefit-card:hover {
  transform: translateY(-6px) scale(1.03);
  box-shadow: 0 8px 24px rgba(52, 152, 219, 0.16);
}
/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(44, 62, 80, 0.25);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
}
.modal {
  background: #fff;
  border-radius: 1.5rem;
  box-shadow: 0 8px 32px rgba(52, 152, 219, 0.18);
  padding: 2.5rem 2rem;
  min-width: 320px;
  max-width: 90vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  animation: fadeInUp 0.5s cubic-bezier(.39,.575,.56,1) both;
}
.modal h2 {
  font-size: 1.5rem;
  margin-bottom: 1.2rem;
  color: #2c3e50;
}
.modal-input {
  width: 100%;
  padding: 0.8rem 1rem;
  border-radius: 0.7rem;
  border: 1.5px solid #e0e7ff;
  margin-bottom: 1rem;
  font-size: 1rem;
  background: #f8fafc;
}
.submit-btn {
  background: linear-gradient(90deg, #3498db 0%, #2ecc71 100%);
  color: #fff;
  border: none;
  border-radius: 2rem;
  padding: 0.7rem 2rem;
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;
  margin-bottom: 0.7rem;
  transition: background 0.2s, transform 0.2s;
}
.submit-btn:hover {
  background: linear-gradient(90deg, #2ecc71 0%, #3498db 100%);
  transform: translateY(-2px) scale(1.04);
}
.close-btn {
  background: none;
  color: #888;
  border: none;
  font-size: 1rem;
  margin-top: 0.2rem;
  cursor: pointer;
  text-decoration: underline;
}
</style> 