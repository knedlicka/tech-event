import { defineStore } from 'pinia'

export const useTicketStore = defineStore('ticket', {
  state: () => ({
    types: [
      {
        name: 'no_ticket',
        priceUsd: '0',
        extraFeatures: [],
      },
      {
        name: 'regular',
        priceUsd: '90',
        extraFeatures: [],
      },
      {
        name: 'vip',
        priceUsd: '220',
        extraFeatures: ['meeting speakers', 'all-day catering'],
      },
    ],
  }),
  getters: {
    paidTypes: (state) => state.types.filter((ticketInfo) => ticketInfo.priceUsd !== '0'),
  },
  actions: {
    addTicket(ticketInfo) {
      this.types.push(ticketInfo)
    },
    deleteByName(name) {
      this.types = this.types.filter((ticketInfo) => ticketInfo.name !== name)
    },
  },
  persist: true,
})
