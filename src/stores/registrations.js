import { defineStore } from 'pinia'

export const useRegistrationsStore = defineStore('registrations', {
  state: () => ({
    usersByEvent: {},
  }),
})
