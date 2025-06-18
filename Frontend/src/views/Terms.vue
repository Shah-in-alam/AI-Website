<template>
  <div class="terms-modern-bg">
    <div class="terms-glass-card animate-fade-in">
      <h1 class="terms-title">Terms of <span class="gradient-text">Service</span></h1>
      <div class="terms-content">
        <section class="animate-section" v-for="(section, idx) in sections" :key="idx">
          <h2>{{ section.title }}</h2>
          <p>{{ section.text }}</p>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup>
const sections = [
  {
    title: '1. Acceptance of Terms',
    text: `By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.`
  },
  {
    title: '2. Use License',
    text: `Permission is granted to temporarily download one copy of the materials (information or software) on AI Website's website for personal, non-commercial transitory viewing only.`
  },
  {
    title: '3. Disclaimer',
    text: `The materials on AI Website's website are provided on an 'as is' basis. AI Website makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.`
  },
  {
    title: '4. Limitations',
    text: `In no event shall AI Website or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on AI Website's website.`
  },
  {
    title: '5. Revisions and Errata',
    text: `The materials appearing on AI Website's website could include technical, typographical, or photographic errors. AI Website does not warrant that any of the materials on its website are accurate, complete, or current.`
  },
  {
    title: '6. Links',
    text: `AI Website has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by AI Website of the site.`
  },
  {
    title: '7. Modifications',
    text: `AI Website may revise these terms of service for its website at any time without notice. By using this website, you are agreeing to be bound by the then current version of these terms of service.`
  }
]
</script>

<style scoped>
.terms-modern-bg {
  min-height: 100vh;
  background: linear-gradient(120deg, #6a5acd 0%, #00c6ff 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3vw 1vw;
}
.terms-glass-card {
  max-width: 800px;
  width: 100%;
  background: rgba(255,255,255,0.92);
  border-radius: 2rem;
  box-shadow: 0 8px 32px rgba(52, 152, 219, 0.18);
  padding: 3rem 2.5rem 2.5rem 2.5rem;
  margin: 3rem 0;
  animation: fadeInUp 0.8s cubic-bezier(.39,.575,.56,1) both;
}
.terms-title {
  font-size: 2.4rem;
  font-weight: 900;
  color: #2c3e50;
  margin-bottom: 2.2rem;
  letter-spacing: 1px;
  text-align: center;
}
.gradient-text {
  background: linear-gradient(90deg, #3498db, #2ecc71);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.terms-content {
  margin-top: 0.5rem;
}
.animate-section {
  margin-bottom: 2.5rem;
  background: rgba(255,255,255,0.85);
  border-radius: 1.2rem;
  box-shadow: 0 2px 8px rgba(52, 152, 219, 0.08);
  padding: 1.5rem 1.2rem 1.2rem 1.2rem;
  animation: fadeInUp 0.7s cubic-bezier(.39,.575,.56,1) both;
  transition: box-shadow 0.2s, transform 0.2s;
}
.animate-section:hover {
  box-shadow: 0 6px 24px rgba(52, 152, 219, 0.18);
  transform: translateY(-2px) scale(1.01);
}
h2 {
  color: #3498db;
  margin-bottom: 1rem;
  font-size: 1.25rem;
  font-weight: 800;
}
p {
  color: #4a5568;
  line-height: 1.7;
  font-size: 1.08rem;
  margin-bottom: 0;
}
/* Animations */
.animate-fade-in {
  animation: fadeIn 1.1s cubic-bezier(.39,.575,.56,1) both;
}
@keyframes fadeIn {
  0% { opacity: 0; transform: translateY(20px); }
  100% { opacity: 1; transform: translateY(0); }
}
@keyframes fadeInUp {
  0% { opacity: 0; transform: translateY(40px); }
  100% { opacity: 1; transform: translateY(0); }
}
</style> 