import { defineStore } from 'pinia'

export const useProgramStore = defineStore('program', {
  state: () => ({
    events: [],
    speakers: [],
  }),
})
