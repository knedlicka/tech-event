<script>
import MinusIcon from '@/assets/images/svg/minus.svg';
import PlusIcon from '@/assets/images/svg/plus.svg';
import { useNotificationStore } from '@/stores/notification.js'

export default {
    components: { PlusIcon, MinusIcon },
    props: ['notification'],
    data() {
        return {
            notificationStore: useNotificationStore(),
        };
    },
    methods: {
        handleDelete() {
            this.notificationStore.deleteByText(this.notification.text);
        },
    },
}
</script>

<template>
    <div class="table-row-container notifications-table-row-container">
        <div class="table-row-content notifications-table-row-content">
            <div class="row-field">{{ this.notification.type }}</div>
            <div class="row-field">{{ this.notification.text }}</div>
            <button v-on:click="handleDelete()" class="table-button button-remove">
                Delete
            </button>
        </div>
    </div>
</template>

<style scoped>
.notifications-table-row-container {
    min-width: 600px;
    background: rgb(231, 231, 231);
}

.notifications-table-row-content {
    grid-template-columns: 100px 1fr 70px;
    cursor: default;
}

.button-remove {
    background: orange;
    width: auto;
    width: 90%;
}
</style>
