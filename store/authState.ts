import axios from 'axios'
import create from 'zustand'
import { persist } from 'zustand/middleware'

const authStore = (set: any) => ({
  userProfile: null,
  allUsers: [],

  addUser: (user: any) => set({ userProfile: user }),
  removeUser: () => set({ userProfile: null }),

  fetchAllUsers: async () => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users`)
    
    set({ allUsers: res.data })
  },
})

// Make sure user still logged in when page reload
const useAuthStore = create(
  persist(authStore, {
    name: 'auth',
  })
)

export default useAuthStore
