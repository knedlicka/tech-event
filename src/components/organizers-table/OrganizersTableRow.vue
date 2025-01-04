<script>
import { useUserStore } from '@/stores/user';

export default {
    props: ['organizer'],
    data() {
        return {
            userStore: useUserStore(),
        };
    },
    methods: {
        handleDelete() {
            this.userStore.deleteByEmail(this.organizer.email);
        }
    }
}
</script>

<template>
    <div class="table-row-container organizers-table-row-container">
        <div class="table-row-content organizers-table-row-content">
            <div class="row-field">{{ this.organizer.name }}</div>
            <div class="row-field">{{ this.organizer.email }}</div>
            <button v-on:click="handleDelete()" class="table-button button-remove">
                Delete
            </button>
        </div>
    </div>
</template>

<style scoped>
.organizers-table-row-container {
    min-width: 270px;
}

.organizers-table-row-content {
    grid-template-columns: 1fr 1fr 70px;
    cursor: default;
}

.button-remove {
    background: orange;
    width: auto;
}
</style>