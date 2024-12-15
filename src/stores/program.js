import { defineStore } from 'pinia'
import { program, speakers } from '@/constants/settings'

export const useProgramStore = defineStore('program', {
  state: () => ({
    program: program,
    speakers: speakers,
  }),
  actions: {
    getTalk(talkTitle) {
      const allTalks = this.program.flatMap((dayInfo) => dayInfo.talks)
      return allTalks.find((talk) => talk.title === talkTitle)
    },
  },
})
