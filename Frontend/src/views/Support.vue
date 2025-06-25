<template>
  <div class="support-modern-bg">
    <div class="support-hero">
      <h1 class="support-title animate-fade-in">Support <span class="gradient-text">Center</span></h1>
      <p class="support-sub animate-slide-up">How can we help you? Explore resources or contact our team.</p>
    </div>
    <div class="support-content-modern animate-fade-in-delay">
      <section class="support-options-modern">
        <h2>How can we help you?</h2>
        <div class="options-grid-modern">
          <div class="support-card-modern animate-card" v-for="option in supportOptions" :key="option.title">
            <div class="support-icon">{{ option.icon }}</div>
            <h3>{{ option.title }}</h3>
            <p>{{ option.desc }}</p>
            <button class="support-button-modern">{{ option.button }}</button>
          </div>
        </div>
      </section>
      <section class="quick-links-modern">
        <h2>Quick Links</h2>
        <div class="links-grid-modern">
          <router-link to="/faq" class="quick-link-modern">FAQ</router-link>
          <router-link to="/blog" class="quick-link-modern">Blog</router-link>
          <router-link to="/contact" class="quick-link-modern">Contact</router-link>
          <router-link to="/privacy" class="quick-link-modern">Privacy Policy</router-link>
        </div>
      </section>
      <section class="support-hours-modern">
        <h2>Support Hours</h2>
        <div class="hours-info-modern">
          <p>Our support team is available:</p>
          <ul>
            <li>Monday - Friday: 9:00 AM - 6:00 PM EST</li>
            <li>Saturday: 10:00 AM - 4:00 PM EST</li>
            <li>Sunday: Closed</li>
          </ul>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
const supportOptions = [
  { icon: '📚', title: 'Documentation', desc: 'Browse our comprehensive documentation and guides', button: 'View Docs' },
  { icon: '✉️', title: 'Contact Support', desc: 'Get in touch with our support team', button: 'Contact Us' },
  { icon: '💬', title: 'Community Forum', desc: 'Join our community and get help from other users', button: 'Visit Forum' },
]
</script>

<style scoped>
.support-modern-bg {
  min-height: 100vh;
  background: linear-gradient(120deg, #6a5acd 0%, #00c6ff 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  overflow-x: hidden;
}
.support-hero {
  text-align: center;
  margin-top: 3.5rem;
  margin-bottom: 2.5rem;
}
.support-title {
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
.support-sub {
  font-size: 1.2rem;
  color: #e0e0e0;
  font-weight: 500;
}
.support-content-modern {
  max-width: 1100px;
  margin: 0 auto;
  padding: 2rem 1rem 4rem 1rem;
  background: rgba(255,255,255,0.92);
  border-radius: 1.5rem;
  box-shadow: 0 8px 32px rgba(52, 152, 219, 0.18);
  animation: fadeInUp 0.8s cubic-bezier(.39,.575,.56,1) both;
}
.support-options-modern {
  text-align: center;
  margin-bottom: 3rem;
}
.options-grid-modern {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}
.support-card-modern {
  background: rgba(255,255,255,0.98);
  border-radius: 1.5rem;
  box-shadow: 0 8px 32px rgba(52, 152, 219, 0.12);
  padding: 2.2rem 1.5rem 2rem 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: transform 0.3s, box-shadow 0.3s;
  position: relative;
  animation: fadeInUp 0.7s cubic-bezier(.39,.575,.56,1) both;
}
.support-card-modern:hover {
  transform: translateY(-10px) scale(1.04);
  box-shadow: 0 16px 40px rgba(52, 152, 219, 0.18);
}
.support-icon {
  font-size: 2.5rem;
  margin-bottom: 1.2rem;
  color: #3498db;
  filter: drop-shadow(0 2px 8px rgba(46,204,113,0.10));
}
.support-card-modern h3 {
  color: #2c3e50;
  font-size: 1.3rem;
  font-weight: 700;
  margin-bottom: 0.7rem;
}
.support-card-modern p {
  color: #4a5568;
  line-height: 1.6;
  font-size: 1.05rem;
  text-align: center;
}
.support-button-modern {
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
  margin-top: 1rem;
}
.support-button-modern:hover {
  background: linear-gradient(90deg, #2ecc71 0%, #3498db 100%);
  transform: translateY(-2px) scale(1.04);
}
.quick-links-modern {
  margin-bottom: 2.5rem;
}
.links-grid-modern {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
}
.quick-link-modern {
  color: #3498db;
  text-decoration: none;
  padding: 0.5rem;
  border-radius: 1rem;
  font-weight: 600;
  font-size: 1.05rem;
  background: rgba(52, 152, 219, 0.07);
  transition: background 0.3s, color 0.3s;
  display: block;
  text-align: center;
}
.quick-link-modern:hover {
  background: #2ecc71;
  color: #fff;
}
.support-hours-modern {
  margin-bottom: 0;
}
.hours-info-modern {
  background: rgba(255,255,255,0.98);
  padding: 2rem;
  border-radius: 1.5rem;
  box-shadow: 0 8px 32px rgba(52, 152, 219, 0.12);
  margin-top: 1rem;
}
.hours-info-modern ul {
  list-style-type: none;
  padding: 0;
  margin-top: 1rem;
}
.hours-info-modern li {
  color: #4a5568;
  margin-bottom: 0.5rem;
  padding-left: 1.5rem;
  position: relative;
}
.hours-info-modern li::before {
  content: "•";
  color: #3498db;
  position: absolute;
  left: 0;
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
@keyframes fadeInUp {
  0% { opacity: 0; transform: translateY(40px); }
  100% { opacity: 1; transform: translateY(0); }
}
.animate-slide-up {
  animation: slideUp 1.2s cubic-bezier(.39,.575,.56,1) both;
}
@keyframes slideUp {
  0% { opacity: 0; transform: translateY(40px); }
  100% { opacity: 1; transform: translateY(0); }
}
.animate-card {
  animation: fadeInUp 0.7s cubic-bezier(.39,.575,.56,1) both;
}
</style> 