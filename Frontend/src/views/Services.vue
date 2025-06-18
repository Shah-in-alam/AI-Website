<template>
  <div class="services-modern">
    <section class="services-hero">
      <div class="services-hero-bg"></div>
      <div class="services-hero-content">
        <h1 class="services-title animate-fade-in">Our <span class="gradient-text">AI Services</span></h1>
        <p class="services-sub animate-slide-up">Unlock the power of artificial intelligence for your business.</p>
      </div>
    </section>
    <section class="services-list-section">
      <div class="services-grid-modern">
        <div class="service-card-modern animate-card" v-for="(service, i) in services" :key="service.title" :style="{ animationDelay: (0.2 + i * 0.15) + 's' }">
          <div class="service-icon">{{ service.icon }}</div>
          <h3>{{ service.title }}</h3>
          <p>{{ service.desc }}</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
const services = [
  { icon: '💬', title: 'AI Chatbot', desc: 'Intelligent chatbot solutions for customer service and support.' },
  { icon: '📊', title: 'Data Analysis', desc: 'Advanced data analysis and visualization tools.' },
  { icon: '🤖', title: 'Machine Learning', desc: 'Custom machine learning models for your business needs.' },
  { icon: '🔍', title: 'AI Search', desc: 'Smart search and recommendation systems.' },
  { icon: '🛡️', title: 'Fraud Detection', desc: 'AI-powered fraud detection and prevention.' },
]
</script>

<style scoped>
.services-modern {
  min-height: 100vh;
  background: linear-gradient(120deg, #6a5acd 0%, #00c6ff 100%);
  overflow-x: hidden;
}
.services-hero {
  position: relative;
  min-height: 40vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4rem 1rem 2rem 1rem;
  overflow: hidden;
}
.services-hero-bg {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background: radial-gradient(circle at 60% 40%, #b0c4de 0%, transparent 60%),
              radial-gradient(circle at 20% 80%, #87ceeb 0%, transparent 70%),
              radial-gradient(circle at 80% 80%, #6a5acd 0%, transparent 70%);
  z-index: 1;
  animation: bgMove 12s linear infinite alternate;
}
@keyframes bgMove {
  0% { background-position: 60% 40%, 20% 80%, 80% 80%; }
  100% { background-position: 50% 30%, 30% 90%, 70% 70%; }
}
.services-hero-content {
  position: relative;
  z-index: 2;
  max-width: 700px;
  margin: 0 auto;
  text-align: center;
  color: #fff;
}
.services-title {
  font-size: 2.8rem;
  font-weight: 900;
  margin-bottom: 1.2rem;
  letter-spacing: 1px;
  line-height: 1.1;
}
.gradient-text {
  background: linear-gradient(90deg, #3498db, #2ecc71);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.services-sub {
  font-size: 1.3rem;
  color: #e0e0e0;
  margin-bottom: 2.5rem;
  font-weight: 500;
}
.services-list-section {
  padding: 2rem 0 4rem 0;
  background: rgba(255,255,255,0.12);
  border-radius: 2rem 2rem 0 0;
  margin-top: 2rem;
}
.services-grid-modern {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2.5rem;
  max-width: 1000px;
  margin: 0 auto;
}
.service-card-modern {
  background: rgba(255,255,255,0.85);
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
.service-card-modern:hover {
  transform: translateY(-10px) scale(1.04);
  box-shadow: 0 16px 40px rgba(52, 152, 219, 0.18);
}
@keyframes fadeInUp {
  0% { opacity: 0; transform: translateY(40px); }
  100% { opacity: 1; transform: translateY(0); }
}
.service-icon {
  font-size: 2.5rem;
  margin-bottom: 1.2rem;
  color: #3498db;
  filter: drop-shadow(0 2px 8px rgba(46,204,113,0.10));
}
.service-card-modern h3 {
  color: #2c3e50;
  font-size: 1.3rem;
  font-weight: 700;
  margin-bottom: 0.7rem;
}
.service-card-modern p {
  color: #4a5568;
  line-height: 1.6;
  font-size: 1.05rem;
  text-align: center;
}
/* Animations */
.animate-fade-in {
  animation: fadeIn 1.1s cubic-bezier(.39,.575,.56,1) both;
}
.animate-slide-up {
  animation: slideUp 1.2s cubic-bezier(.39,.575,.56,1) both;
}
@keyframes fadeIn {
  0% { opacity: 0; transform: translateY(20px); }
  100% { opacity: 1; transform: translateY(0); }
}
@keyframes slideUp {
  0% { opacity: 0; transform: translateY(40px); }
  100% { opacity: 1; transform: translateY(0); }
}
.animate-card {
  animation: fadeInUp 0.7s cubic-bezier(.39,.575,.56,1) both;
}
</style> 