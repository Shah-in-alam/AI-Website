<template>
  <div class="home-modern">
    <section class="hero-modern">
      <div class="hero-bg-anim"></div>
      <div class="hero-content">
        <h1 class="hero-title animate-fade-in">Empower Your Business with <span class="gradient-text">AI</span></h1>
        <p class="hero-sub animate-slide-up">Your one-stop solution for AI-powered services</p>
        <div class="cta-buttons animate-fade-in-delay">
          <router-link to="/services" class="cta-button primary">Explore Services</router-link>
          <router-link to="/plans" class="cta-button secondary">View Plans</router-link>
        </div>
      </div>
    </section>
    <section class="features-modern">
      <h2 class="features-title animate-fade-in">Our Features</h2>
      <div class="feature-grid-modern">
        <div class="feature-card-modern animate-card" v-for="(feature, i) in features" :key="feature.title" :style="{ animationDelay: (0.2 + i * 0.15) + 's' }">
          <div class="feature-icon">{{ feature.icon }}</div>
          <h3>{{ feature.title }}</h3>
          <p>{{ feature.desc }}</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
const features = [
  { icon: '🤖', title: 'AI-Powered Solutions', desc: 'Cutting-edge artificial intelligence technology at your service.' },
  { icon: '⏰', title: '24/7 Support', desc: 'Round-the-clock customer support for all your needs.' },
  { icon: '🔒', title: 'Secure Platform', desc: 'Enterprise-grade security for your peace of mind.' },
  { icon: '⚡', title: 'Fast Integration', desc: 'Seamless and quick onboarding for your business.' },
]
</script>

<style scoped>
.home-modern {
  min-height: 100vh;
  background: linear-gradient(120deg, #6a5acd 0%, #00c6ff 100%);
  overflow-x: hidden;
}
.hero-modern {
  position: relative;
  min-height: 70vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4rem 1rem 2rem 1rem;
  overflow: hidden;
}
.hero-bg-anim {
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
.hero-content {
  position: relative;
  z-index: 2;
  max-width: 700px;
  margin: 0 auto;
  text-align: center;
  color: #fff;
}
.hero-title {
  font-size: 3.2rem;
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
.hero-sub {
  font-size: 1.5rem;
  color: #e0e0e0;
  margin-bottom: 2.5rem;
  font-weight: 500;
}
.cta-buttons {
  display: flex;
  gap: 1.2rem;
  justify-content: center;
  margin-bottom: 2.5rem;
}
.cta-button {
  padding: 0.9rem 2.2rem;
  border-radius: 2rem;
  text-decoration: none;
  font-weight: 700;
  font-size: 1.1rem;
  transition: all 0.3s cubic-bezier(.39,.575,.56,1);
  box-shadow: 0 4px 16px rgba(52, 152, 219, 0.12);
}
.cta-button.primary {
  background: linear-gradient(90deg, #3498db 0%, #2ecc71 100%);
  color: white;
}
.cta-button.primary:hover {
  background: linear-gradient(90deg, #2ecc71 0%, #3498db 100%);
  transform: translateY(-2px) scale(1.04);
}
.cta-button.secondary {
  background: white;
  color: #3498db;
  border: 2px solid #3498db;
}
.cta-button.secondary:hover {
  background: #f7fafc;
  color: #2ecc71;
  border-color: #2ecc71;
  transform: translateY(-2px) scale(1.04);
}
.hero-illustration {
  width: 340px;
  max-width: 90vw;
  margin-top: 2.5rem;
  filter: drop-shadow(0 8px 32px rgba(52,152,219,0.18));
  animation: floatY 3.5s ease-in-out infinite alternate;
}
@keyframes floatY {
  0% { transform: translateY(0); }
  100% { transform: translateY(-18px); }
}
.features-modern {
  padding: 4rem 0 2rem 0;
  background: rgba(255,255,255,0.12);
  border-radius: 2rem 2rem 0 0;
  margin-top: 2rem;
}
.features-title {
  text-align: center;
  font-size: 2.2rem;
  color: #2c3e50;
  margin-bottom: 2.5rem;
  font-weight: 800;
  letter-spacing: 0.5px;
}
.feature-grid-modern {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2.5rem;
  max-width: 1000px;
  margin: 0 auto;
}
.feature-card-modern {
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
.feature-card-modern:hover {
  transform: translateY(-10px) scale(1.04);
  box-shadow: 0 16px 40px rgba(52, 152, 219, 0.18);
}
@keyframes fadeInUp {
  0% { opacity: 0; transform: translateY(40px); }
  100% { opacity: 1; transform: translateY(0); }
}
.feature-icon {
  font-size: 2.5rem;
  margin-bottom: 1.2rem;
  color: #3498db;
  filter: drop-shadow(0 2px 8px rgba(46,204,113,0.10));
}
.feature-card-modern h3 {
  color: #2c3e50;
  font-size: 1.3rem;
  font-weight: 700;
  margin-bottom: 0.7rem;
}
.feature-card-modern p {
  color: #4a5568;
  line-height: 1.6;
  font-size: 1.05rem;
  text-align: center;
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
.animate-card {
  animation: fadeInUp 0.7s cubic-bezier(.39,.575,.56,1) both;
}
</style> 