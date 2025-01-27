import { defineStore } from 'pinia'

export const useNotificationStore = defineStore('notification', {
  state: () => ({
    notifications: [
      {
        type: 'info',
        text: 'Event starting soon!',
      },
      {
        type: 'error',
        text: 'Tickets are sold out!',
      },
      {
        type: 'success',
        text: 'Good job! This is a success notification.',
      },
    ],
  }),
  actions: {
    addNotification(notificationInfo) {
      this.notifications.push(notificationInfo)
    },
    deleteByText(text) {
      this.notifications = this.notifications.filter(
        (notificationInfo) => notificationInfo.text !== text,
      )
    },
  },
  persist: true,
})
