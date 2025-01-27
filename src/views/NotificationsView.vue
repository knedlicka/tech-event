<script>
import MainButton from '@/components/buttons/MainButton.vue';
import { useNotificationStore } from '@/stores/notification.js'
import NotificationEntry from '@/components/notifications/NotificationEntry.vue'

export default {
    components: { MainButton, NotificationEntry },
    data() {
        return {
            notificationStore: useNotificationStore(),
        }
    },
}
</script>

<template>
    <main class="container">
        <div class="inner-container">
            <div class="heading-section">Notifications</div>
            <NotificationEntry v-for="notification in this.notificationStore.notifications" :type="notification.type"
                :text="notification.text" />
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
    gap: 8px;
    margin-top: 24px;
    width: 90%;
}

@media (max-width: 700px) {
    .inner-container {
        align-items: center;
    }
}
</style>
