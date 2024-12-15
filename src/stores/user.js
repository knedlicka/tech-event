import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    currentUser: undefined,
    users: [
      {
        name: 'Joseph Koch',
        email: 'joseph.koch@gmail.com',
        password: '123',
        ticketName: 'regular',
        talkTitles: [
          'Machine Learning Interpretability',
          'Big-O Complexity Demystified',
          'Prolog for Logical Problem Solving',
          'Server-Side Rendering with Next.js',
          'Cloud-Native CI/CD Pipelines',
        ],
        role: 'participant',
      },
      {
        name: 'Miliana Rubent',
        email: 'miliana.rubent@gmail.com',
        password: '123',
        ticketName: 'vip',
        talkTitles: ['Optimizing Embedded Linux', 'Digital Privacy in 2024'],
        role: 'participant',
      },
      {
        name: 'Valibucent Hroch',
        email: 'valibucent.hroch@gmail.com',
        password: '123',
        ticketName: 'regular',
        talkTitles: [
          'Introduction to Rust Programming',
          'Serverless Architecture Explained',
          'The Future of AI Chips',
        ],
        role: 'participant',
      },
      {
        name: 'Halalaj Lopuch',
        email: 'halalaj@lopu.ch',
        password: '123',
        ticketName: 'regular',
        talkTitles: [
          'Linear Congruence Systems',
          'Cryptography in the Age of AI',
          'Concurrency Challenges in Embedded C',
        ],
        role: 'participant',
      },
      {
        name: 'test',
        email: 'test@test.com',
        password: '123',
        ticketName: 'regular',
        talkTitles: [
          'Machine Learning Interpretability',
          'Big-O Complexity Demystified',
          'Prolog for Logical Problem Solving',
          'Server-Side Rendering with Next.js',
          'Cloud-Native CI/CD Pipelines',
        ],
        role: 'participant',
      },
    ],
  }),
  getters: {
    isLoggedIn: (state) => state.currentUser !== undefined,
  },
  actions: {
    getByLoginCredentials(email, password) {
      return this.users.find((user) => user.email === email && user.password === password)
    },
    logout() {
      this.currentUser = undefined
    },
    register(email, password, fullName, role) {
      const existingUser = this.users.find((user) => user.email === email)
      if (existingUser) {
        return 'A user with this email already exists'
      }
      const newUser = {
        name: fullName,
        email,
        password,
        ticketName: 'regular',
        role,
      }
      this.users = [...this.users, newUser]
    },
  },
  persist: true,
})
