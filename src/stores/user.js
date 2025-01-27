import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    currentUser: undefined,
    users: [
      {
        name: 'Joseph Koch',
        email: 'joseph.koch@gmail.com',
        password: '123',
        ticketName: 'no_ticket',
        pointsClaimedOn: [],
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
        pointsClaimedOn: [],
        talkTitles: ['Optimizing Embedded Linux', 'Digital Privacy in 2024'],
        role: 'participant',
      },
      {
        name: 'Valibucent Hroch',
        email: 'valibucent.hroch@gmail.com',
        password: '123',
        ticketName: 'no_ticket',
        pointsClaimedOn: [],
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
        ticketName: 'no_ticket',
        pointsClaimedOn: [],
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
        ticketName: 'no_ticket',
        pointsClaimedOn: [],
        talkTitles: [
          'Machine Learning Interpretability',
          'Big-O Complexity Demystified',
          'Prolog for Logical Problem Solving',
          'Server-Side Rendering with Next.js',
          'Cloud-Native CI/CD Pipelines',
        ],
        role: 'organizer',
      },
      {
        name: 'Organizer First',
        email: 'organizer.first@gmail.com',
        password: '123',
        ticketName: 'no_ticket',
        pointsClaimedOn: [],
        talkTitles: [],
        role: 'organizer',
      },
      {
        name: 'Organizer Second',
        email: 'organizer.second@gmail.com',
        password: '123',
        ticketName: 'no_ticket',
        pointsClaimedOn: [],
        talkTitles: [],
        role: 'organizer',
      },
    ],
  }),
  getters: {
    isLoggedIn: (state) => state.currentUser !== undefined,
    isOrganizer: (state) => state.currentUser?.role === 'organizer',
  },
  actions: {
    getByEmail(email) {
      return this.users.find((user) => user.email === email)
    },
    getByLoginCredentials(email, password) {
      return this.users.find((user) => user.email === email && user.password === password)
    },
    deleteByEmail(email) {
      this.users = this.users.filter((user) => user.email !== email)
    },
    setTicket(ticketType) {
      this.currentUser.ticketName = ticketType
      this.users.forEach((user) => {
        if (user.email === this.currentUser.email) {
          user.ticketName = ticketType
        }
      })
    },
    returnTicket() {
      this.currentUser.ticketName = 'no_ticket'
      this.users.forEach((user) => {
        if (user.email === this.currentUser.email) {
          user.ticketName = 'no_ticket'
        }
      })
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
        ticketName: 'no_ticket',
        role,
        talkTitles: [],
      }
      this.users = [...this.users, newUser]
    },
    registerForTalk(talkTitle) {
      if (this.currentUser) {
        this.currentUser.talkTitles = [...this.currentUser.talkTitles, talkTitle]
        this.users = this.users.map((user) => {
          if (user.email === this.currentUser.email && !user.talkTitles.includes(talkTitle)) {
            return {
              ...user,
              talkTitles: [...user.talkTitles, talkTitle],
            }
          }
          return user
        })
      }
    },
    unregisterFromTalk(talkTitle) {
      if (this.currentUser) {
        this.currentUser.talkTitles = this.currentUser.talkTitles.filter(
          (title) => title !== talkTitle,
        )
        this.users = this.users.map((user) => {
          if (user.email === this.currentUser.email) {
            return this.currentUser
          }
          return user
        })
      }
    },
    isRegisteredForTalk(talkTitle) {
      return (this.currentUser?.talkTitles ?? []).includes(talkTitle)
    },
    claimPoints() {
      const todaysDateStr = new Date().toJSON().slice(0, 10)
      this.currentUser.pointsClaimedOn.push(todaysDateStr)
      this.users = this.users.map((userInfo) => {
        if (userInfo.email === this.currentUser.email) {
          return {
            ...userInfo,
            pointsClaimedOn: [...userInfo.pointsClaimedOn, todaysDateStr],
          }
        }
        return userInfo
      })
    },
  },
  persist: true,
})
