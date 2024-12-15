import { defineStore } from 'pinia'

export const useTicketStore = defineStore('ticket', {
  state: () => ({
    types: [
      {
        name: 'regular',
        priceEuro: '90',
        extraFeatures: [],
      },
      {
        name: 'vip',
        priceEur: '220',
        extraFeatures: ['meeting speakers', 'all-day catering'],
      },
    ],
  }),
  persist: true,
})
