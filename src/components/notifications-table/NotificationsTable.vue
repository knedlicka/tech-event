<script>
import NotificationsTableRow from '@/components/notifications-table/NotificationsTableRow.vue'
import { useNotificationStore } from '@/stores/notification.js'

export default {
    components: { NotificationsTableRow },
    data() {
        return {
            notificationStore: useNotificationStore(),
        };
    },
}
</script>

<template>
    <div class="table-container notifications-table-container">
        <div class="table-header notifications-table-header">
            <div>Type</div>
            <div>Text</div>
            <div>Remove</div>
        </div>
        <NotificationsTableRow v-for="notification of this.notificationStore.notifications" :notification="notification"
            :key="notification?.text" />
    </div>
</template>

<style scoped>
.notifications-table-container {
    margin-bottom: 20px;
}

.notifications-table-header {
    grid-template-columns: 100px 1fr 70px;
    min-width: 400px;
}
</style>
