<template>
  <div class="plans-container">
    <h1 class="plans-title">Choose Your Plan</h1>
    <div class="plans-grid">
      <div
        v-for="(plan, idx) in plans"
        :key="plan.name"
        class="plan-card"
        :class="plan.class"
      >
        <h2>{{ plan.name }}</h2>
        <div class="plan-price">
          <span class="currency">€</span>{{ plan.price }}<span class="period">/{{ plan.period }}</span>
        </div>
        <div v-if="plan.savings" class="savings-badge">{{ plan.savings }}</div>
        <ul class="plan-features">
          <li v-for="(feature, i) in plan.features" :key="i">{{ feature }}</li>
        </ul>
        <button class="subscribe-btn" @click="subscribe(plan)">Subscribe</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const plans = [
  {
    name: 'Monthly',
    price: 99,
    period: 'month',
    features: ['All AI features', 'Priority support', 'Cancel anytime'],
    class: 'premium',
    savings: ''
  },
  {
    name: 'Yearly',
    price: 1099,
    period: 'year',
    features: ['All AI features', 'Priority support', '2 months free'],
    class: 'elite',
    savings: 'Save €89/year'
  }
]

function subscribe(plan) {
  if (!authStore.isAuthenticated) {
    router.push('/signin')
    return
  }
  router.push({
    name: 'Payment',
    query: {
      planName: plan.name,
      price: plan.price,
      period: plan.period
    }
  })
}
</script>

<style scoped>
.plans-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 3rem 1rem;
  text-align: center;
}
.plans-title {
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 2.5rem;
  color: #2c3e50;
  letter-spacing: 1px;
}
.plans-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: center;
}
.plan-card {
  background: linear-gradient(135deg, #f8fafc 60%, #e0e7ff 100%);
  border-radius: 1.5rem;
  box-shadow: 0 8px 32px rgba(52, 152, 219, 0.12);
  padding: 2.5rem 2rem 2rem 2rem;
  min-width: 280px;
  max-width: 340px;
  flex: 1 1 320px;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: transform 0.2s, box-shadow 0.2s;
  position: relative;
}
.plan-card.premium {
  border: 2px solid #3498db;
}
.plan-card.elite {
  border: 2px solid #2ecc71;
}
.plan-card:hover {
  transform: translateY(-8px) scale(1.03);
  box-shadow: 0 16px 40px rgba(52, 152, 219, 0.18);
}
.plan-card h2 {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1.2rem;
  color: #2c3e50;
}
.plan-price {
  font-size: 2.5rem;
  font-weight: 800;
  color: #3498db;
  margin-bottom: 1.2rem;
  display: flex;
  align-items: flex-end;
  gap: 0.2rem;
}
.plan-card.elite .plan-price {
  color: #2ecc71;
}
.currency {
  font-size: 1.3rem;
  font-weight: 600;
  vertical-align: super;
}
.period {
  font-size: 1.1rem;
  font-weight: 500;
  color: #888;
  margin-left: 0.2rem;
}
.plan-features {
  list-style: none;
  padding: 0;
  margin: 1.5rem 0 2rem 0;
  text-align: left;
}
.plan-features li {
  font-size: 1.1rem;
  color: #34495e;
  margin-bottom: 0.7rem;
  padding-left: 1.2rem;
  position: relative;
}
.plan-features li::before {
  content: '✔';
  color: #2ecc71;
  position: absolute;
  left: 0;
  font-size: 1.1rem;
}
.subscribe-btn {
  background: linear-gradient(90deg, #3498db 0%, #2ecc71 100%);
  color: #fff;
  border: none;
  border-radius: 2rem;
  padding: 0.9rem 2.5rem;
  font-size: 1.2rem;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 4px 16px rgba(52, 152, 219, 0.12);
  transition: background 0.2s, transform 0.2s;
}
.subscribe-btn:hover {
  background: linear-gradient(90deg, #2ecc71 0%, #3498db 100%);
  transform: translateY(-2px) scale(1.04);
}
.savings-badge {
  background: linear-gradient(90deg, #2ecc71 0%, #3498db 100%);
  color: #fff;
  font-weight: 700;
  border-radius: 1rem;
  padding: 0.4rem 1.2rem;
  margin-bottom: 1rem;
  font-size: 1.1rem;
  display: inline-block;
  box-shadow: 0 2px 8px rgba(46, 204, 113, 0.12);
  letter-spacing: 0.5px;
}
</style>
