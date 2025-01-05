<script>
import { useUserStore } from '@/stores/user';
import ParticipantsTableRow from '@/components/participants-table/ParticipantsTableRow.vue';

export default {
    components: { ParticipantsTableRow },
    data() {
        return {
            userStore: useUserStore(),
        };
    },
    computed: {
        participants() {
            return this.userStore.users.filter((user) => user?.role === 'participant');
        }
    }
}
</script>

<template>
    <div class="table-container">
        <div class="table-header participants-table-header">
            <div>Name</div>
            <div>Email</div>
            <div>Ticket</div>
            <div>Remove</div>
        </div>
        <ParticipantsTableRow v-for="participant of this.participants" :participant="participant"
            :key="participant?.email" />
    </div>
</template>

<style scoped>
.participants-table-header {
    grid-template-columns: 35% 35% 15% 15%;
    min-width: 600px;
}
</style>