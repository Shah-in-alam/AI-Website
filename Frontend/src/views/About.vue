<template>
  <div class="about-modern-bg">
    <div class="about-hero">
      <h1 class="about-title animate-fade-in">About <span class="gradient-text">AI Website</span></h1>
      <p class="about-sub animate-slide-up">Empowering the world with accessible, ethical, and innovative AI solutions.</p>
      <img class="about-ai-image animate-fade-in-delay" src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80" alt="AI Generated Team" />
    </div>
    <div class="about-content-modern animate-fade-in-delay">
      <section class="mission-modern">
        <h2>Our Mission</h2>
        <p>To make artificial intelligence accessible and beneficial for everyone through innovative solutions and services.</p>
      </section>
      <section class="team-modern">
        <h2>Our Team</h2>
        <p>We are a team of passionate AI experts, developers, and designers working together to create the future of technology.</p>
        <div class="team-cards">
          <div class="team-card">
            <img class="team-img" src="https://randomuser.me/api/portraits/men/32.jpg" alt="CEO" />
            <h3 class="team-name">Alex Johnson</h3>
            <div class="team-role">Chief Executive Officer (CEO)</div>
            <div class="team-edu">Ph.D. in Computer Science, MIT</div>
          </div>
          <div class="team-card">
            <img class="team-img" src="https://randomuser.me/api/portraits/men/45.jpg" alt="Founder" />
            <h3 class="team-name">Michael Lee</h3>
            <div class="team-role">Founder</div>
            <div class="team-edu">MSc in Artificial Intelligence, Stanford</div>
          </div>
          <div class="team-card">
            <img class="team-img" src="https://randomuser.me/api/portraits/women/65.jpg" alt="Co-Founder" />
            <h3 class="team-name">Sophia Martinez</h3>
            <div class="team-role">Co-Founder</div>
            <div class="team-edu">MEng in Data Science, Cambridge</div>
          </div>
        </div>
      </section>
      <section class="values-modern">
        <h2>Our Values</h2>
        <ul>
          <li><span class="value-icon">💡</span> Innovation in AI technology</li>
          <li><span class="value-icon">🤝</span> Customer satisfaction</li>
          <li><span class="value-icon">🤖</span> Ethical AI development</li>
          <li><span class="value-icon">📚</span> Continuous learning and improvement</li>
        </ul>
      </section>
    </div>
  </div>
</template>

<script setup>
// About component logic will be added later
</script>

<style scoped>
.about-modern-bg {
  min-height: 100vh;
  background: linear-gradient(120deg, #6a5acd 0%, #00c6ff 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  overflow-x: hidden;
}
.about-hero {
  text-align: center;
  margin-top: 3.5rem;
  margin-bottom: 2.5rem;
}
.about-title {
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
.about-sub {
  font-size: 1.2rem;
  color: #e0e0e0;
  font-weight: 500;
  margin-bottom: 2.2rem;
}
.about-ai-image {
  width: 340px;
  max-width: 90vw;
  border-radius: 1.5rem;
  box-shadow: 0 8px 32px rgba(52, 152, 219, 0.18);
  margin: 0 auto 2.5rem auto;
  display: block;
  object-fit: cover;
  animation: floatY 3.5s ease-in-out infinite alternate;
}
@keyframes floatY {
  0% { transform: translateY(0); }
  100% { transform: translateY(-18px); }
}
.about-content-modern {
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem 1rem 4rem 1rem;
  background: rgba(255,255,255,0.92);
  border-radius: 1.5rem;
  box-shadow: 0 8px 32px rgba(52, 152, 219, 0.18);
  animation: fadeInUp 0.8s cubic-bezier(.39,.575,.56,1) both;
}
.mission-modern, .team-modern, .values-modern {
  margin-bottom: 2.5rem;
  animation: fadeInUp 0.8s cubic-bezier(.39,.575,.56,1) both;
}
.mission-modern h2, .team-modern h2, .values-modern h2 {
  color: #2c3e50;
  margin-bottom: 1rem;
  font-size: 1.3rem;
  font-weight: 800;
}
.mission-modern p, .team-modern p {
  color: #4a5568;
  line-height: 1.6;
  font-size: 1.08rem;
}
.values-modern ul {
  list-style-type: none;
  padding: 0;
}
.values-modern li {
  color: #4a5568;
  margin-bottom: 0.7rem;
  padding-left: 0.5rem;
  font-size: 1.08rem;
  display: flex;
  align-items: center;
  gap: 0.7rem;
}
.value-icon {
  font-size: 1.3rem;
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
.team-cards {
  display: flex;
  gap: 2.5rem;
  justify-content: center;
  margin-top: 2.2rem;
  flex-wrap: wrap;
}
.team-card {
  background: rgba(255,255,255,0.98);
  border-radius: 1.2rem;
  box-shadow: 0 2px 12px rgba(52, 152, 219, 0.13);
  padding: 2rem 1.5rem 1.5rem 1.5rem;
  min-width: 220px;
  max-width: 260px;
  text-align: center;
  transition: box-shadow 0.2s, transform 0.2s;
  animation: fadeInUp 0.7s cubic-bezier(.39,.575,.56,1) both;
  margin-bottom: 1.5rem;
}
.team-card:hover {
  box-shadow: 0 8px 32px rgba(52, 152, 219, 0.18);
  transform: translateY(-4px) scale(1.03);
}
.team-img {
  width: 90px;
  height: 90px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 1rem;
  box-shadow: 0 2px 8px rgba(52, 152, 219, 0.13);
  border: 3px solid #6a5acd33;
}
.team-name {
  font-size: 1.18rem;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 0.3rem;
}
.team-role {
  color: #3498db;
  font-size: 1.02rem;
  font-weight: 600;
  margin-bottom: 0.2rem;
}
.team-edu {
  color: #4a5568;
  font-size: 0.98rem;
  margin-bottom: 0.2rem;
}
</style> 