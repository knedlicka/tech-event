import { defineStore } from 'pinia'

// For talk materials
export const useMaterialStore = defineStore('material', {
  state: () => ({
    materials: {
      'Linear Congruence Systems': {
        videos: ['https://youtube.com/embed/tSVNrZlWzIg', 'https://youtube.com/embed/qsOGW61iHj8'],
        links: ['https://www.ikea.com/pt/en/cat/pillows-20533/'],
      },
      'Advancements in Embedded Systems': {
        videos: [],
        links: [],
      },
    },
  }),
  persist: true,
})
