<template>
  <div class="faq-modern-bg">
    <div class="faq-hero">
      <h1 class="faq-title animate-fade-in">Frequently Asked <span class="gradient-text">Questions</span></h1>
      <p class="faq-sub animate-slide-up">Find answers to common questions about our AI services and platform.</p>
    </div>
    <div class="faq-content-modern animate-fade-in-delay">
      <div class="faq-section-modern">
        <h2>General Questions</h2>
        <div class="faq-item-modern" v-for="(item, index) in generalQuestions" :key="index">
          <button class="faq-question-modern" @click="toggleQuestion(index)">
            {{ item.question }}
            <span class="toggle-icon-modern">{{ isOpen(index) ? '−' : '+' }}</span>
          </button>
          <transition name="fade">
            <div class="faq-answer-modern" v-show="isOpen(index)">
              <p>{{ item.answer }}</p>
            </div>
          </transition>
        </div>
      </div>
      <div class="faq-section-modern">
        <h2>Technical Questions</h2>
        <div class="faq-item-modern" v-for="(item, index) in technicalQuestions" :key="index">
          <button class="faq-question-modern" @click="toggleQuestion(index + generalQuestions.length)">
            {{ item.question }}
            <span class="toggle-icon-modern">{{ isOpen(index + generalQuestions.length) ? '−' : '+' }}</span>
          </button>
          <transition name="fade">
            <div class="faq-answer-modern" v-show="isOpen(index + generalQuestions.length)">
              <p>{{ item.answer }}</p>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const openQuestions = ref(new Set())

const generalQuestions = [
  {
    question: "What services do you offer?",
    answer: "We offer a range of AI-powered services including chatbots, data analysis, and machine learning solutions tailored to your business needs."
  },
  {
    question: "How do I get started?",
    answer: "Getting started is easy! Simply sign up for an account, choose a plan that suits your needs, and you'll have access to our services immediately."
  },
  {
    question: "What are your pricing plans?",
    answer: "We offer various pricing plans to accommodate different business sizes and needs. Visit our Plans page for detailed pricing information."
  }
]

const technicalQuestions = [
  {
    question: "Do I need technical knowledge to use your services?",
    answer: "No technical knowledge is required. Our services are designed to be user-friendly and accessible to everyone."
  },
  {
    question: "How secure is my data?",
    answer: "We take data security very seriously. All data is encrypted, and we follow industry best practices to ensure your information is protected."
  },
  {
    question: "Can I integrate your services with my existing systems?",
    answer: "Yes, our services are designed to be easily integrated with your existing systems through our comprehensive API."
  }
]

const toggleQuestion = (index) => {
  if (openQuestions.value.has(index)) {
    openQuestions.value.delete(index)
  } else {
    openQuestions.value.add(index)
  }
}

const isOpen = (index) => {
  return openQuestions.value.has(index)
}
</script>

<style scoped>
.faq-modern-bg {
  min-height: 100vh;
  background: linear-gradient(120deg, #6a5acd 0%, #00c6ff 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  overflow-x: hidden;
}
.faq-hero {
  text-align: center;
  margin-top: 3.5rem;
  margin-bottom: 2.5rem;
}
.faq-title {
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
.faq-sub {
  font-size: 1.2rem;
  color: #e0e0e0;
  font-weight: 500;
}
.faq-content-modern {
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem 1rem 4rem 1rem;
  background: rgba(255,255,255,0.92);
  border-radius: 1.5rem;
  box-shadow: 0 8px 32px rgba(52, 152, 219, 0.18);
  animation: fadeInUp 0.8s cubic-bezier(.39,.575,.56,1) both;
}
.faq-section-modern {
  margin-bottom: 2.5rem;
}
.faq-section-modern h2 {
  color: #2c3e50;
  margin-bottom: 1.5rem;
  font-size: 1.2rem;
  font-weight: 800;
}
.faq-item-modern {
  margin-bottom: 1rem;
  border: 1.5px solid #e2e8f0;
  border-radius: 0.7rem;
  overflow: hidden;
  background: rgba(255,255,255,0.98);
  box-shadow: 0 2px 8px rgba(52, 152, 219, 0.08);
  transition: box-shadow 0.3s;
}
.faq-item-modern:hover {
  box-shadow: 0 6px 24px rgba(52, 152, 219, 0.13);
}
.faq-question-modern {
  width: 100%;
  padding: 1.1rem 1.2rem;
  background: none;
  border: none;
  text-align: left;
  font-size: 1.08rem;
  font-weight: 600;
  color: #2c3e50;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: background-color 0.3s;
}
.faq-question-modern:hover {
  background-color: #f7fafc;
}
.toggle-icon-modern {
  font-size: 1.5rem;
  color: #3498db;
  margin-left: 1rem;
}
.faq-answer-modern {
  padding: 1.1rem 1.2rem;
  background: #f7fafc;
  color: #4a5568;
  line-height: 1.6;
  font-size: 1.05rem;
  border-top: 1px solid #e2e8f0;
  animation: fadeIn 0.5s;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.4s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
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