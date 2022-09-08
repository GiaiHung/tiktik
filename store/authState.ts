import create from 'zustand'
import { persist } from 'zustand/middleware'

const authStore = (set: any) => ({
  userProfile: null,
  addUser: (user: any) => set({ userProfile: user }),
})

// Make sure user still logged in when page reload
const useAuthStore = create(
  persist(authStore, {
    name: 'auth',
  })
)

export default useAuthStore
