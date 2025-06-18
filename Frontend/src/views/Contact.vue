<template>
  <div class="contact-modern-bg">
    <div class="contact-hero">
      <h1 class="contact-title animate-fade-in">Contact <span class="gradient-text">AI Website</span></h1>
      <p class="contact-sub animate-slide-up">We'd love to hear from you. Reach out and our team will get back to you soon!</p>
    </div>
    <div class="contact-content-modern animate-fade-in-delay">
      <div class="contact-info-modern">
        <h2 class="info-title">Get in Touch</h2>
        <p class="info-desc">Have questions? Send us a message and we'll respond as soon as possible.</p>
        <div class="contact-details-modern">
          <div class="contact-item-modern">
            <span class="contact-icon">📧</span>
            <div>
              <h3>Email</h3>
              <p>support@aiwebsite.com</p>
            </div>
          </div>
          <div class="contact-item-modern">
            <span class="contact-icon">📞</span>
            <div>
              <h3>Phone</h3>
              <p>+1 (555) 123-4567</p>
            </div>
          </div>
          <div class="contact-item-modern">
            <span class="contact-icon">🏢</span>
            <div>
              <h3>Address</h3>
              <p>123 AI Street, Tech City, TC 12345</p>
            </div>
          </div>
        </div>
      </div>
      <form class="contact-form-modern" @submit.prevent="handleSubmit">
        <div class="form-group-modern">
          <label for="name">Name</label>
          <input type="text" id="name" v-model="form.name" required class="input-anim" />
        </div>
        <div class="form-group-modern">
          <label for="email">Email</label>
          <input type="email" id="email" v-model="form.email" required class="input-anim" />
        </div>
        <div class="form-group-modern">
          <label for="message">Message</label>
          <textarea id="message" v-model="form.message" rows="5" required class="input-anim"></textarea>
        </div>
        <button type="submit" class="submit-btn-modern">Send Message</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'

const form = reactive({
  name: '',
  email: '',
  message: ''
})

const handleSubmit = () => {
  // Form submission logic will be added later
  console.log('Form submitted:', form)
}
</script>

<style scoped>
.contact-modern-bg {
  min-height: 100vh;
  background: linear-gradient(120deg, #6a5acd 0%, #00c6ff 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  overflow-x: hidden;
}
.contact-hero {
  text-align: center;
  margin-top: 3.5rem;
  margin-bottom: 2.5rem;
}
.contact-title {
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
.contact-sub {
  font-size: 1.2rem;
  color: #e0e0e0;
  font-weight: 500;
}
.contact-content-modern {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3.5rem;
  margin-top: 2rem;
  width: 100%;
  max-width: 1100px;
  padding: 0 1rem 3rem 1rem;
}
.contact-info-modern {
  background: rgba(255,255,255,0.92);
  border-radius: 1.5rem;
  box-shadow: 0 8px 32px rgba(52, 152, 219, 0.18);
  padding: 2.5rem 2rem 2rem 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  animation: fadeInUp 0.8s cubic-bezier(.39,.575,.56,1) both;
}
.info-title {
  font-size: 1.5rem;
  font-weight: 800;
  color: #2c3e50;
  margin-bottom: 1rem;
}
.info-desc {
  color: #4a5568;
  margin-bottom: 2rem;
}
.contact-details-modern {
  margin-top: 1.5rem;
}
.contact-item-modern {
  display: flex;
  align-items: flex-start;
  gap: 1.1rem;
  margin-bottom: 1.5rem;
}
.contact-icon {
  font-size: 2rem;
  margin-top: 0.2rem;
}
.contact-item-modern h3 {
  color: #2c3e50;
  margin-bottom: 0.2rem;
  font-size: 1.1rem;
}
.contact-item-modern p {
  color: #4a5568;
  font-size: 1rem;
}
.contact-form-modern {
  background: rgba(255,255,255,0.92);
  border-radius: 1.5rem;
  box-shadow: 0 8px 32px rgba(52, 152, 219, 0.18);
  padding: 2.5rem 2rem 2rem 2rem;
  animation: fadeInUp 0.8s cubic-bezier(.39,.575,.56,1) both;
  display: flex;
  flex-direction: column;
  justify-content: center;
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
.submit-btn-modern {
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
.submit-btn-modern:hover {
  background: linear-gradient(90deg, #2ecc71 0%, #3498db 100%);
  transform: translateY(-2px) scale(1.04);
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
@media (max-width: 900px) {
  .contact-content-modern {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
}
</style> 