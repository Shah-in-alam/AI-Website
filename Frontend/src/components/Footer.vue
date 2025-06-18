<template>
  <footer class="footer">
    <div class="footer-content">
      <div class="footer-grid">
        <div class="footer-brand">
          <h3>AI Website</h3>
          <p>Empowering businesses with cutting-edge AI solutions</p>
          <div class="social-links">
            <a href="#" class="social-link" aria-label="Twitter">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
            </a>
            <a href="#" class="social-link" aria-label="LinkedIn">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            <a href="#" class="social-link" aria-label="GitHub">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
              </svg>
            </a>
          </div>
        </div>

        <div class="footer-links">
          <div class="footer-section">
            <h4>Product</h4>
            <ul>
              <li><a href="#">Features</a></li>
              <li><a href="#">Pricing</a></li>
              <li><a href="#">Enterprise</a></li>
              <li><a href="#">Security</a></li>
            </ul>
          </div>

          <div class="footer-section">
            <h4>Company</h4>
            <ul>
              <li><a href="#">About</a></li>
              <li><a href="#">Blog</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </div>

          <div class="footer-section">
            <h4>Resources</h4>
            <ul>
              <li><a href="#">Documentation</a></li>
              <li><a href="#">Help Center</a></li>
              <li><a href="#">API</a></li>
              <li><a href="#">Status</a></li>
            </ul>
          </div>
        </div>

        <div class="footer-newsletter">
          <h4>Stay Updated</h4>
          <p>Subscribe to our newsletter for the latest updates and insights.</p>
          <form class="newsletter-form" @submit.prevent="handleSubscribe">
            <div class="input-group">
              <input 
                type="email" 
                v-model="email" 
                placeholder="Enter your email"
                required
              >
              <button type="submit">Subscribe</button>
            </div>
          </form>
        </div>
      </div>

      <div class="footer-bottom">
        <div class="footer-legal">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Cookie Policy</a>
        </div>
        <p class="copyright">© {{ new Date().getFullYear() }} AI Website. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref } from 'vue'

const email = ref('')

const handleSubscribe = () => {
  // Handle newsletter subscription
  console.log('Subscribing email:', email.value)
  email.value = ''
}
</script>

<style scoped>
.footer {
  background: linear-gradient(to bottom, #1a1a1a, #2c3e50);
  color: #fff;
  padding: 4rem 0 2rem;
  margin-top: 4rem;
}

.footer-content {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
}

.footer-grid {
  display: grid;
  grid-template-columns: 2fr 3fr 2fr;
  gap: 4rem;
  margin-bottom: 3rem;
}

.footer-brand h3 {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, #3498db, #2ecc71);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.footer-brand p {
  color: #a0aec0;
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

.social-links {
  display: flex;
  gap: 1rem;
}

.social-link {
  color: #a0aec0;
  transition: all 0.3s ease;
  padding: 0.5rem;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.1);
}

.social-link:hover {
  color: #fff;
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
}

.social-link svg {
  width: 20px;
  height: 20px;
}

.footer-links {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

.footer-section h4 {
  color: #fff;
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
}

.footer-section ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-section ul li {
  margin-bottom: 0.75rem;
}

.footer-section ul li a {
  color: #a0aec0;
  text-decoration: none;
  transition: all 0.3s ease;
}

.footer-section ul li a:hover {
  color: #fff;
  padding-left: 5px;
}

.footer-newsletter h4 {
  color: #fff;
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.footer-newsletter p {
  color: #a0aec0;
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

.newsletter-form .input-group {
  display: flex;
  gap: 0.5rem;
}

.newsletter-form input {
  flex: 1;
  padding: 0.75rem 1rem;
  border: none;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  transition: all 0.3s ease;
}

.newsletter-form input:focus {
  outline: none;
  background: rgba(255, 255, 255, 0.15);
}

.newsletter-form input::placeholder {
  color: #a0aec0;
}

.newsletter-form button {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  background: linear-gradient(135deg, #3498db, #2ecc71);
  color: #fff;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.newsletter-form button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(52, 152, 219, 0.3);
}

.footer-bottom {
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.footer-legal {
  display: flex;
  gap: 2rem;
}

.footer-legal a {
  color: #a0aec0;
  text-decoration: none;
  transition: color 0.3s ease;
}

.footer-legal a:hover {
  color: #fff;
}

.copyright {
  color: #a0aec0;
}

@media (max-width: 1024px) {
  .footer-grid {
    grid-template-columns: 1fr 1fr;
    gap: 3rem;
  }

  .footer-newsletter {
    grid-column: span 2;
  }
}

@media (max-width: 768px) {
  .footer-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .footer-newsletter {
    grid-column: span 1;
  }

  .footer-links {
    grid-template-columns: repeat(2, 1fr);
  }

  .footer-bottom {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }

  .footer-legal {
    flex-direction: column;
    gap: 1rem;
  }
}

@media (max-width: 480px) {
  .footer-links {
    grid-template-columns: 1fr;
  }

  .newsletter-form .input-group {
    flex-direction: column;
  }

  .newsletter-form button {
    width: 100%;
  }
}
</style> 