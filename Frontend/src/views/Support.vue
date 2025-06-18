<template>
  <div class="support-container">
    <h1>Support Center</h1>
    <div class="support-content">
      <section class="support-options">
        <h2>How can we help you?</h2>
        <div class="options-grid">
          <div class="support-card">
            <h3>Documentation</h3>
            <p>Browse our comprehensive documentation and guides</p>
            <button class="support-button">View Docs</button>
          </div>
          <div class="support-card">
            <h3>Contact Support</h3>
            <p>Get in touch with our support team</p>
            <button class="support-button">Contact Us</button>
          </div>
          <div class="support-card">
            <h3>Community Forum</h3>
            <p>Join our community and get help from other users</p>
            <button class="support-button">Visit Forum</button>
          </div>
        </div>
      </section>

      <section class="quick-links">
        <h2>Quick Links</h2>
        <div class="links-grid">
          <router-link to="/faq" class="quick-link">FAQ</router-link>
          <router-link to="/blog" class="quick-link">Blog</router-link>
          <router-link to="/contact" class="quick-link">Contact</router-link>
          <router-link to="/privacy" class="quick-link">Privacy Policy</router-link>
        </div>
      </section>

      <section class="support-hours">
        <h2>Support Hours</h2>
        <div class="hours-info">
          <p>Our support team is available:</p>
          <ul>
            <li>Monday - Friday: 9:00 AM - 6:00 PM EST</li>
            <li>Saturday: 10:00 AM - 4:00 PM EST</li>
            <li>Sunday: Closed</li>
          </ul>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
// Support component logic will be added later
</script>

<style scoped>
.support-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.support-content {
  margin-top: 2rem;
}

section {
  margin-bottom: 4rem;
}

.support-options {
  text-align: center;
}

.options-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.support-card {
  background: white;
  padding: 2rem;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.support-card:hover {
  transform: translateY(-5px);
}

.support-card h3 {
  color: #2c3e50;
  margin-bottom: 1rem;
}

.support-card p {
  color: #4a5568;
  margin-bottom: 1.5rem;
}

.support-button {
  background: #3498db;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.support-button:hover {
  background: #2980b9;
}

.links-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
}

.quick-link {
  color: #3498db;
  text-decoration: none;
  padding: 0.5rem;
  border-radius: 0.25rem;
  transition: background-color 0.3s ease;
}

.quick-link:hover {
  background-color: #f7fafc;
}

.hours-info {
  background: white;
  padding: 2rem;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.hours-info ul {
  list-style-type: none;
  padding: 0;
  margin-top: 1rem;
}

.hours-info li {
  color: #4a5568;
  margin-bottom: 0.5rem;
  padding-left: 1.5rem;
  position: relative;
}

.hours-info li::before {
  content: "•";
  color: #3498db;
  position: absolute;
  left: 0;
}
</style> 