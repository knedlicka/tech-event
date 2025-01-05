<script>
import { useUserStore } from '@/stores/user';

export default {
    props: ['participant'],
    data() {
        return {
            userStore: useUserStore(),
        };
    },
    methods: {
        handleDelete() {
            this.userStore.deleteByEmail(this.participant.email);
        }
    }
}
</script>

<template>
    <div class="table-row-container participants-table-row-container">
        <div class="table-row-content participants-table-row-content">
            <div class="row-field">{{ this.participant.name }}</div>
            <div class="row-field">{{ this.participant.email }}</div>
            <div class="row-field">{{ this.participant.ticketName }}</div>
            <button v-on:click="handleDelete()" class="table-button button-remove">
                Delete
            </button>
        </div>
    </div>
</template>

<style scoped>
.participants-table-row-container {
    min-width: 600px;
}

.participants-table-row-content {
    grid-template-columns: 35% 35% 15% 15%;
    cursor: default;
}

.button-remove {
    background: orange;
    width: auto;
    width: 90%;
}
</style>