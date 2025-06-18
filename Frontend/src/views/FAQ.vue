<template>
  <div class="faq-container">
    <h1>Frequently Asked Questions</h1>
    <div class="faq-content">
      <div class="faq-section">
        <h2>General Questions</h2>
        <div class="faq-item" v-for="(item, index) in generalQuestions" :key="index">
          <button class="faq-question" @click="toggleQuestion(index)">
            {{ item.question }}
            <span class="toggle-icon">{{ isOpen(index) ? '−' : '+' }}</span>
          </button>
          <div class="faq-answer" v-show="isOpen(index)">
            <p>{{ item.answer }}</p>
          </div>
        </div>
      </div>

      <div class="faq-section">
        <h2>Technical Questions</h2>
        <div class="faq-item" v-for="(item, index) in technicalQuestions" :key="index">
          <button class="faq-question" @click="toggleQuestion(index + generalQuestions.length)">
            {{ item.question }}
            <span class="toggle-icon">{{ isOpen(index + generalQuestions.length) ? '−' : '+' }}</span>
          </button>
          <div class="faq-answer" v-show="isOpen(index + generalQuestions.length)">
            <p>{{ item.answer }}</p>
          </div>
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
.faq-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.faq-content {
  margin-top: 2rem;
}

.faq-section {
  margin-bottom: 3rem;
}

.faq-section h2 {
  color: #2c3e50;
  margin-bottom: 1.5rem;
}

.faq-item {
  margin-bottom: 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  overflow: hidden;
}

.faq-question {
  width: 100%;
  padding: 1rem;
  background: white;
  border: none;
  text-align: left;
  font-size: 1rem;
  font-weight: 500;
  color: #2c3e50;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: background-color 0.3s ease;
}

.faq-question:hover {
  background-color: #f7fafc;
}

.toggle-icon {
  font-size: 1.5rem;
  color: #3498db;
}

.faq-answer {
  padding: 1rem;
  background: #f7fafc;
  color: #4a5568;
  line-height: 1.6;
}

.faq-answer p {
  margin: 0;
}
</style> 