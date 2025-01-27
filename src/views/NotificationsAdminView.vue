<script>
import MainButton from '@/components/buttons/MainButton.vue';
import NotificationsTable from '@/components/notifications-table/NotificationsTable.vue'
import { useNotificationStore } from '@/stores/notification.js'

export default {
    components: { MainButton, NotificationsTable },
    data() {
        return {
            notificationStore: useNotificationStore(),
            newNotificationText: "",
            newNotificationType: "info",
            error: undefined,
        }
    },
    methods: {
        handleAddNotification() {
            const existingNotification = this.notificationStore.notifications.find(notificationInfo => notificationInfo.text === this.newNotificationText);
            this.error = undefined;
            if (existingNotification) {
                this.error = `A notification with this text already exists`
            } else {
                this.notificationStore.addNotification({
                    type: this.newNotificationType,
                    text: this.newNotificationText,
                })
                this.newNotificationType = "";
                this.newNotificationText = "";
            }
        },
    }
}
</script>

<template>
    <main class="container">
        <div class="inner-container">
            <div class="heading-section">Notifications admin</div>
            <form class="add-notification-form" @submit.prevent="this.handleAddNotification">
                <div v-if="this.error !== undefined" class="error">{{ this.error }}</div>
                <select name="notification-type" required v-model="this.newNotificationType" class="select-input">
                    <option v-for="knownNotificationType of ['success', 'info', 'error']"
                        :value="knownNotificationType">
                        {{ knownNotificationType }}
                    </option>
                </select>
                <input required class="text-input" type="text" v-model="this.newNotificationText"
                    placeholder="Notification text" />
                <MainButton type="secondary" label="Add notification" />
            </form>
            <NotificationsTable />
        </div>
    </main>
</template>

<style scoped>
.container {
    display: flex;
    flex: 1;
    width: 100%;
    justify-content: center;
    background: rgb(2, 3, 21);
    color: white;
}

.inner-container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 32px;
    margin-top: 24px;
    max-width: 100%;
}

.add-notification-form {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    gap: 4px;
    width: 100%;
}

@media (max-width: 700px) {
    .inner-container {
        align-items: center;
    }
}
</style>
