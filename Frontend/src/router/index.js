import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import SignIn from '../views/SignIn.vue'
import SignUp from '../views/SignUp.vue'
import Plans from '../views/Plans.vue'
import Services from '../views/Services.vue'
import About from '../views/About.vue'
import Contact from '../views/Contact.vue'
import Career from '../views/Career.vue'
import Blog from '../views/Blog.vue'
import Privacy from '../views/Privacy.vue'
import Terms from '../views/Terms.vue'
import FAQ from '../views/FAQ.vue'
import Support from '../views/Support.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/signin',
      name: 'signin',
      component: SignIn
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUp
    },
    {
      path: '/plans',
      name: 'plans',
      component: Plans
    },
    {
      path: '/services',
      name: 'services',
      component: Services
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/contact',
      name: 'contact',
      component: Contact
    },
    {
      path: '/career',
      name: 'career',
      component: Career
    },
    {
      path: '/blog',
      name: 'blog',
      component: Blog
    },
    {
      path: '/privacy',
      name: 'privacy',
      component: Privacy
    },
    {
      path: '/terms',
      name: 'terms',
      component: Terms
    },
    {
      path: '/faq',
      name: 'faq',
      component: FAQ
    },
    {
      path: '/support',
      name: 'support',
      component: Support
    },
    {
      path: '/payment',
      name: 'Payment',
      component: () => import('../views/Payment.vue')
    }
  ]
})

export default router 