<template>
  <footer class="footer">
    <div class="footer-content">
      <div class="footer-section">
        <h3>AI Website</h3>
        <p>Empowering the future with artificial intelligence solutions.</p>
      </div>
      <div class="footer-section">
        <h4>Quick Links</h4>
        <ul>
          <li><router-link to="/">Home</router-link></li>
          <li><router-link to="/signin">Sign In</router-link></li>
          <li><router-link to="/signup">Sign Up</router-link></li>
        </ul>
      </div>
      <div class="footer-section">
        <h4>Contact</h4>
        <ul>
          <li>Email: <a href="mailto:contact@aiwebsite.com">contact@aiwebsite.com</a></li>
          <li>Phone: <a href="tel:+1234567890">+1 234 567 890</a></li>
          <li>Address: 123 AI Street, Tech City</li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <p>&copy; {{ new Date().getFullYear() }} <span class="footer-brand">AI Website</span>. All rights reserved.</p>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  width: 100%;
  background-color: #2c3e50; /* Darker, distinct color */
  color: #fff;
  margin-top: auto;
  box-shadow: 0 -2px 8px rgba(0,0,0,0.05);
  position: relative;
  z-index: 10;
  left: 0;
  right: 0;
}

.footer-content {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  gap: 2rem;
  padding: 3rem 1rem; /* Adjusted for full width background but with inner content padding */
  max-width: 1200px; /* Limit content width */
  margin: 0 auto; /* Center content */
  border-bottom: 1px solid rgba(255,255,255,0.1);
}

.footer-section {
  flex: 1;
  min-width: 250px;
  max-width: 350px;
  text-align: center;
}

.footer-section h3 {
  color: #fff;
  font-size: 1.5rem;
  margin-bottom: 1rem;
  letter-spacing: 1px;
}

.footer-section h4 {
  color: #e0ffe0;
  font-size: 1.1rem;
  margin-bottom: 1rem;
  letter-spacing: 0.5px;
}

.footer-section p {
  color: #e0e0e0;
  line-height: 1.6;
  font-size: 1rem;
}

.footer-section ul {
  list-style: none;
  padding: 0;
}

.footer-section ul li {
  margin-bottom: 0.8rem;
  font-size: 1rem;
}

.footer-section ul li a {
  color: #e0ffe0;
  text-decoration: none;
  transition: color 0.3s;
}

.footer-section ul li a:hover {
  color: #fff;
  text-decoration: underline;
}

.footer-bottom {
  text-align: center;
  padding: 1.5rem 1rem; /* Adjusted for full width background but with inner content padding */
  background-color: rgba(0, 0, 0, 0.3); /* Slightly transparent dark for bottom part */
  color: #e0e0e0;
  font-size: 0.95rem;
  max-width: 1200px; /* Limit content width */
  margin: 0 auto; /* Center content */
}

.footer-brand {
  color: #fff;
  font-weight: 700;
  letter-spacing: 1px;
}

@media (max-width: 768px) {
  .footer-content {
    flex-direction: column;
    align-items: center;
    gap: 2rem;
    padding: 2rem 1rem;
  }

  .footer-section {
    width: 100%;
    max-width: 100%;
  }
}
</style> 