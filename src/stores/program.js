import { defineStore } from 'pinia'
import { program, speakers } from '@/constants/settings'

export const useProgramStore = defineStore('program', {
  state: () => ({
    program: [...program],
    speakers: [...speakers],
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
    updateTalkByTitle(title, speaker, room) {
      const updatedProgram = []
      for (const dayInfo of this.program) {
        const updatedTalks = dayInfo.talks.map((talkDetails) => {
          if (talkDetails.title === title) {
            return {
              ...talkDetails,
              speaker: speaker,
              room: room,
            }
          }
          return talkDetails
        })
        updatedProgram.push({
          dayTitle: dayInfo.dayTitle,
          talks: updatedTalks,
        })
      }
      this.program = updatedProgram
    },
    updateSpeakerByName(name, bio) {
      const updatedSpeakers = this.speakers.map((speakerInfo) => {
        if (speakerInfo.name === name) {
          return {
            ...speakerInfo,
            bio: bio,
          }
        }
        return speakerInfo
      })
      this.speakers = updatedSpeakers
    },
  },
  persist: true,
})
