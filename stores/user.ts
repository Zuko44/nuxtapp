import { defineStore } from 'pinia'
import type { User } from '~/types/User'
import MD5 from 'crypto-js/md5'

export const useUserStore = defineStore('user', () => {
  const isLoggedIn = ref(false)
  const currentUser = ref<User | null>(null)

  const login = async (username: string, password: string): Promise<boolean> => {
    const hash = await hashPassword(password)
    const users = await $fetch<User[]>('/data/users.json')

    const user = users.find(u =>
      u.credentials.username === username && u.credentials.passphrase === hash
    )

    if (user) {
      localStorage.setItem('userSession', JSON.stringify(user))
      currentUser.value = user
      isLoggedIn.value = true
      return true
    }

    return false
  }

  const restoreSession = () => {
    const session = localStorage.getItem('userSession')
    if (session) {
      try {
        const user = JSON.parse(session) as User
        currentUser.value = user
        isLoggedIn.value = true
      } catch (err) {
        console.error('[RESTORE] ошибка при разборе сессии:', err)
      }
    }
  }

  const logout = () => {
    localStorage.removeItem('userSession')
    currentUser.value = null
    isLoggedIn.value = false
  }

  return { isLoggedIn, currentUser, login, logout, restoreSession }
})

async function hashPassword(password: string): Promise<string> {
  return MD5(password).toString()
}
