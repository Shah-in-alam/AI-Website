<template>
  <div class="blog-modern-bg">
    <div class="blog-hero">
      <h1 class="blog-title animate-fade-in">Developer <span class="gradient-text">Blogs</span></h1>
      <p class="blog-sub animate-slide-up">Read insights from our AI experts and share your own thoughts!</p>
    </div>
    <div class="blog-content-modern animate-fade-in-delay">
      <div class="blog-list-section">
        <h2 class="blog-list-title">Latest Blogs</h2>
        <div v-if="blogs.length" class="blog-list">
          <div class="blog-card-fb" v-for="blog in blogs" :key="blog.id">
            <div class="blog-header-fb">
              <div class="blog-author-avatar">
                <span>{{ blog.author[0] }}</span>
              </div>
              <div>
                <h3>{{ blog.title }}</h3>
                <span class="blog-author">by {{ blog.author }}</span>
                <div class="blog-meta">{{ blog.date }}</div>
              </div>
            </div>
            <p class="blog-body">{{ blog.content }}</p>
            <div class="blog-actions">
              <button class="like-btn" :class="{ liked: blog.liked }" @click="toggleLike(blog)">
                <span v-if="blog.liked">❤️</span>
                <span v-else>🤍</span>
                <span class="like-count">{{ blog.likes }}</span>
              </button>
              <div class="rating-group">
                <span v-for="star in 5" :key="star" class="star" :class="{ filled: star <= blog.rating }" @click="rateBlog(blog, star)">★</span>
                <span class="rating-value">({{ blog.rating }})</span>
              </div>
              <button class="comment-btn" @click="blog.showComments = !blog.showComments">
                💬 <span class="comment-count">{{ blog.comments.length }}</span>
              </button>
            </div>
            <transition name="fade">
              <div v-if="blog.showComments" class="comments-section">
                <div v-if="blog.comments.length" class="comments-list">
                  <div class="comment-item" v-for="(comment, idx) in blog.comments" :key="idx">
                    <span class="comment-author">{{ comment.author }}:</span>
                    <span class="comment-text">{{ comment.text }}</span>
                  </div>
                </div>
                <form class="comment-form" @submit.prevent="addComment(blog)">
                  <input v-model="blog.newComment" placeholder="Write a comment..." class="input-anim" />
                  <button type="submit" class="send-comment-btn">Send</button>
                </form>
              </div>
            </transition>
          </div>
        </div>
        <div v-else class="no-blogs">No blogs yet. Be the first to post!</div>
      </div>
      <div class="blog-post-section">
        <h2 class="blog-post-title">Post a Blog</h2>
        <form v-if="showPostForm" class="blog-post-form" @submit.prevent="handlePostBlog">
          <div class="form-group-modern">
            <label for="blogTitle">Title</label>
            <input id="blogTitle" v-model="newBlog.title" required class="input-anim" />
          </div>
          <div class="form-group-modern">
            <label for="blogContent">Content</label>
            <textarea id="blogContent" v-model="newBlog.content" rows="5" required class="input-anim"></textarea>
          </div>
          <button type="submit" class="blog-post-btn">Post Blog</button>
        </form>
        <div v-else class="subscribe-prompt">
          <p>You need a subscription to post a blog.</p>
          <router-link to="/plans" class="subscribe-link">Subscribe Now</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'

const router = useRouter()
const authStore = useAuthStore()

// Mock: Replace with real API calls
const blogs = ref([
  { id: 1, title: 'The Future of AI', author: 'Alice', content: 'AI is transforming industries...', date: '2024-06-18', likes: 2, liked: false, rating: 4, comments: [ { author: 'Bob', text: 'Great post!' } ], newComment: '', showComments: false },
  { id: 2, title: 'How to Build a Chatbot', author: 'Bob', content: 'Step-by-step guide to building chatbots...', date: '2024-06-17', likes: 1, liked: false, rating: 5, comments: [], newComment: '', showComments: false },
])

const newBlog = ref({ title: '', content: '' })

// Mock: Replace with real subscription check
const isSubscribed = computed(() => authStore.isAuthenticated && authStore.userData && authStore.userData.subscriptionActive)

const showPostForm = computed(() => isSubscribed.value)

function handlePostBlog() {
  if (!newBlog.value.title || !newBlog.value.content) return
  blogs.value.unshift({
    id: Date.now(),
    title: newBlog.value.title,
    author: authStore.userData?.username || 'Anonymous',
    content: newBlog.value.content,
    date: new Date().toISOString().slice(0, 10),
    likes: 0,
    liked: false,
    rating: 0,
    comments: [],
    newComment: '',
    showComments: false
  })
  newBlog.value.title = ''
  newBlog.value.content = ''
}

function toggleLike(blog) {
  blog.liked = !blog.liked
  blog.likes += blog.liked ? 1 : -1
}

function rateBlog(blog, star) {
  blog.rating = star
}

function addComment(blog) {
  if (blog.newComment && blog.newComment.trim()) {
    blog.comments.push({
      author: authStore.userData?.username || 'Anonymous',
      text: blog.newComment.trim()
    })
    blog.newComment = ''
  }
}
</script>

<style scoped>
.blog-modern-bg {
  min-height: 100vh;
  background: linear-gradient(120deg, #6a5acd 0%, #00c6ff 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  overflow-x: hidden;
}
.blog-hero {
  text-align: center;
  margin-top: 3.5rem;
  margin-bottom: 2.5rem;
}
.blog-title {
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
.blog-sub {
  font-size: 1.2rem;
  color: #e0e0e0;
  font-weight: 500;
}
.blog-content-modern {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2.5rem 1.5rem 4rem 1.5rem;
  background: rgba(255,255,255,0.92);
  border-radius: 1.5rem;
  box-shadow: 0 8px 32px rgba(52, 152, 219, 0.18);
  animation: fadeInUp 0.8s cubic-bezier(.39,.575,.56,1) both;
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
}
.blog-list-section {
  margin-bottom: 1.5rem;
  width: 100%;
  max-width: 1100px;
  margin-left: auto;
  margin-right: auto;
}
.blog-list-title {
  color: #2c3e50;
  font-size: 1.3rem;
  font-weight: 800;
  margin-bottom: 1.2rem;
}
.blog-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
}
.blog-card-fb {
  background: #fff;
  border-radius: 1.2rem;
  box-shadow: 0 2px 12px rgba(52, 152, 219, 0.13);
  padding: 1.5rem 1.2rem 1.2rem 1.2rem;
  animation: fadeInUp 0.7s cubic-bezier(.39,.575,.56,1) both;
  margin-bottom: 1.2rem;
  transition: box-shadow 0.2s, transform 0.2s;
  position: relative;
}
.blog-card-fb:hover {
  box-shadow: 0 6px 24px rgba(52, 152, 219, 0.18);
  transform: translateY(-2px) scale(1.01);
}
.blog-header-fb {
  display: flex;
  align-items: center;
  gap: 1.1rem;
  margin-bottom: 0.7rem;
}
.blog-author-avatar {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: linear-gradient(135deg, #6a5acd 60%, #2ecc71 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 1.5rem;
  font-weight: 700;
  box-shadow: 0 2px 8px rgba(52, 152, 219, 0.13);
}
.blog-card-fb h3 {
  color: #2c3e50;
  font-size: 1.15rem;
  font-weight: 700;
  margin-bottom: 2px;
}
.blog-author {
  color: #2ecc71;
  font-size: 0.98rem;
  font-weight: 600;
}
.blog-body {
  color: #4a5568;
  font-size: 1.05rem;
  margin-bottom: 0.7rem;
  margin-top: 0.5rem;
}
.blog-meta {
  color: #888;
  font-size: 0.92rem;
  margin-top: 2px;
}
.blog-actions {
  display: flex;
  align-items: center;
  gap: 1.2rem;
  margin-top: 0.7rem;
  margin-bottom: 0.5rem;
}
.like-btn {
  background: none;
  border: none;
  font-size: 1.25rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.3rem;
  color: #888;
  transition: color 0.2s;
}
.like-btn.liked {
  color: #e74c3c;
  font-weight: bold;
}
.like-count {
  font-size: 1.05rem;
  margin-left: 2px;
}
.rating-group {
  display: flex;
  align-items: center;
  gap: 0.1rem;
}
.star {
  font-size: 1.2rem;
  color: #bbb;
  cursor: pointer;
  transition: color 0.2s, transform 0.2s;
}
.star.filled {
  color: #f1c40f;
  transform: scale(1.15);
}
.rating-value {
  font-size: 0.98rem;
  color: #888;
  margin-left: 0.3rem;
}
.comment-btn {
  background: none;
  border: none;
  font-size: 1.15rem;
  cursor: pointer;
  color: #888;
  display: flex;
  align-items: center;
  gap: 0.2rem;
  transition: color 0.2s;
}
.comment-btn:hover {
  color: #3498db;
}
.comment-count {
  font-size: 1.05rem;
  margin-left: 2px;
}
.comments-section {
  background: #f7fafd;
  border-radius: 0.8rem;
  padding: 1rem 1rem 0.7rem 1rem;
  margin-top: 0.7rem;
  box-shadow: 0 1px 4px rgba(52, 152, 219, 0.07);
  animation: fadeIn 0.5s;
}
.comments-list {
  margin-bottom: 0.7rem;
}
.comment-item {
  margin-bottom: 0.5rem;
  font-size: 0.98rem;
  color: #333;
}
.comment-author {
  font-weight: 700;
  color: #2ecc71;
  margin-right: 0.3rem;
}
.comment-form {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}
.send-comment-btn {
  background: linear-gradient(90deg, #3498db 0%, #2ecc71 100%);
  color: #fff;
  border: none;
  border-radius: 1.2rem;
  padding: 0.4rem 1.2rem;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.2s, transform 0.2s;
}
.send-comment-btn:hover {
  background: linear-gradient(90deg, #2ecc71 0%, #3498db 100%);
  transform: translateY(-1px) scale(1.04);
}
.no-blogs {
  color: #888;
  text-align: center;
  font-size: 1.1rem;
  margin: 2rem 0;
}
.blog-post-section {
  margin-top: 2.5rem;
}
.blog-post-title {
  color: #2c3e50;
  font-size: 1.15rem;
  font-weight: 800;
  margin-bottom: 1.2rem;
}
.blog-post-form {
  background: rgba(255,255,255,0.98);
  border-radius: 1.2rem;
  box-shadow: 0 2px 8px rgba(52, 152, 219, 0.08);
  padding: 1.5rem 1.2rem 1.2rem 1.2rem;
  animation: fadeInUp 0.7s cubic-bezier(.39,.575,.56,1) both;
}
.form-group-modern {
  margin-bottom: 22px;
  text-align: left;
}
label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
  color: #555;
  font-size: 15px;
}
.input-anim {
  width: 100%;
  padding: 13px 16px;
  border: 1.5px solid #ddd;
  border-radius: 10px;
  font-size: 16px;
  box-sizing: border-box;
  background-color: #fcfcfc;
  color: #333;
  transition: border-color 0.3s, box-shadow 0.3s, background 0.3s;
  animation: fadeIn 1.1s cubic-bezier(.39,.575,.56,1) both;
}
.input-anim:focus {
  outline: none;
  border-color: #6a5acd;
  box-shadow: 0 0 0 3px rgba(106, 90, 205, 0.13);
  background: #f4f8ff;
}
.blog-post-btn {
  background: linear-gradient(90deg, #3498db 0%, #2ecc71 100%);
  color: #fff;
  border: none;
  border-radius: 2rem;
  padding: 0.9rem 2.5rem;
  font-size: 1.2rem;
  font-weight: 700;
  cursor: pointer;
  width: 100%;
  margin-top: 10px;
  box-shadow: 0 4px 16px rgba(52, 152, 219, 0.12);
  transition: background 0.2s, transform 0.2s;
}
.blog-post-btn:hover {
  background: linear-gradient(90deg, #2ecc71 0%, #3498db 100%);
  transform: translateY(-2px) scale(1.04);
}
.subscribe-prompt {
  background: rgba(255,255,255,0.98);
  border-radius: 1.2rem;
  box-shadow: 0 2px 8px rgba(52, 152, 219, 0.08);
  padding: 1.5rem 1.2rem 1.2rem 1.2rem;
  text-align: center;
  color: #2c3e50;
  font-size: 1.08rem;
}
.subscribe-link {
  display: inline-block;
  margin-top: 1rem;
  background: linear-gradient(90deg, #3498db 0%, #2ecc71 100%);
  color: #fff;
  border-radius: 2rem;
  padding: 0.6rem 2rem;
  font-weight: 700;
  text-decoration: none;
  transition: background 0.2s, transform 0.2s;
}
.subscribe-link:hover {
  background: linear-gradient(90deg, #2ecc71 0%, #3498db 100%);
  transform: translateY(-2px) scale(1.04);
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
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
@media (max-width: 1300px) {
  .blog-content-modern {
    max-width: 98vw;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
  }
  .blog-list-section {
    max-width: 98vw;
  }
}
@media (max-width: 900px) {
  .blog-content-modern {
    max-width: 100vw;
    padding-left: 0.2rem;
    padding-right: 0.2rem;
  }
  .blog-list-section {
    max-width: 100vw;
  }
}
</style>
