import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const isAuthenticated = ref(false)
  const userData = ref(null)
  const token = ref(localStorage.getItem('token'))

  const setAuth = (data) => {
    isAuthenticated.value = true
    userData.value = data.user
    token.value = data.token
    localStorage.setItem('token', data.token)
    localStorage.setItem('userData', JSON.stringify(data.user))
  }

  const logout = (router) => {
    isAuthenticated.value = false
    userData.value = null
    token.value = null
    localStorage.removeItem('token')
    localStorage.removeItem('userData')
    if (router) router.push('/signin')
  }

  const checkAuth = () => {
    const storedToken = localStorage.getItem('token')
    const storedUserData = localStorage.getItem('userData')

    if (
      storedToken &&
      storedUserData &&
      storedUserData !== 'undefined'
    ) {
      try {
        isAuthenticated.value = true
        userData.value = JSON.parse(storedUserData)
        token.value = storedToken
        return true
      } catch (e) {
        // If parsing fails, clear the bad value
        localStorage.removeItem('userData')
      }
    }

    isAuthenticated.value = false
    userData.value = null
    token.value = null
    return false
  }

  // Check auth status on store initialization
  checkAuth()

  return {
    isAuthenticated,
    userData,
    token,
    setAuth,
    logout,
    checkAuth
  }
}) 