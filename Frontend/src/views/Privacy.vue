<template>
  <div class="privacy-modern-bg">
    <div class="privacy-hero">
      <h1 class="privacy-title animate-fade-in">Privacy <span class="gradient-text">Policy</span></h1>
      <p class="privacy-sub animate-slide-up">Your privacy is important to us. Learn how we protect and use your data.</p>
    </div>
    <div class="privacy-content-modern animate-fade-in-delay">
      <section class="privacy-section-modern" v-for="(section, i) in sections" :key="i">
        <h2>{{ section.title }}</h2>
        <p>{{ section.text }}</p>
      </section>
    </div>
  </div>
</template>

<script setup>
const sections = [
  {
    title: '1. Information We Collect',
    text: 'We collect information that you provide directly to us, including when you create an account, make a purchase, or contact us for support.'
  },
  {
    title: '2. How We Use Your Information',
    text: 'We use the information we collect to provide, maintain, and improve our services, to process your transactions, and to communicate with you.'
  },
  {
    title: '3. Information Sharing',
    text: 'We do not share your personal information with third parties except as described in this privacy policy.'
  },
  {
    title: '4. Data Security',
    text: 'We implement appropriate technical and organizational measures to protect your personal information against unauthorized access or disclosure.'
  },
  {
    title: '5. Your Rights',
    text: 'You have the right to access, correct, or delete your personal information. Contact us to exercise these rights.'
  }
]
</script>

<style scoped>
.privacy-modern-bg {
  min-height: 100vh;
  background: linear-gradient(120deg, #6a5acd 0%, #00c6ff 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  overflow-x: hidden;
}
.privacy-hero {
  text-align: center;
  margin-top: 3.5rem;
  margin-bottom: 2.5rem;
}
.privacy-title {
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
.privacy-sub {
  font-size: 1.2rem;
  color: #e0e0e0;
  font-weight: 500;
}
.privacy-content-modern {
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem 1rem 4rem 1rem;
  background: rgba(255,255,255,0.92);
  border-radius: 1.5rem;
  box-shadow: 0 8px 32px rgba(52, 152, 219, 0.18);
  animation: fadeInUp 0.8s cubic-bezier(.39,.575,.56,1) both;
}
.privacy-section-modern {
  margin-bottom: 2.2rem;
  animation: fadeInUp 0.8s cubic-bezier(.39,.575,.56,1) both;
}
.privacy-section-modern h2 {
  color: #2c3e50;
  margin-bottom: 1rem;
  font-size: 1.15rem;
  font-weight: 800;
}
.privacy-section-modern p {
  color: #4a5568;
  line-height: 1.6;
  font-size: 1.08rem;
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
</style> 