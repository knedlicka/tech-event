import { defineStore } from 'pinia'
import { program, speakers } from '@/constants/settings'

export const useProgramStore = defineStore('program', {
  state: () => ({
    program: program,
    speakers: speakers,
  }),
  actions: {
    getAllTalks() {
      const allTalks = this.program.flatMap((dayInfo) => dayInfo.talks)
      return allTalks
    },
    getTalk(talkTitle) {
      return this.getAllTalks().find((talk) => talk.title === talkTitle)
    },
    getSpeakerByName(name) {
      return this.speakers.find((speaker) => speaker.name === name)
    },
    getTalksBySpeakerName(speakerName) {
      return this.getAllTalks().filter((talk) => talk.speaker === speakerName)
    },
  },
  persist: true,
})
