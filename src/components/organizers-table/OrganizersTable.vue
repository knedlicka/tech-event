<script>
import { useUserStore } from '@/stores/user';
import OrganizersTableRow from '@/components/organizers-table/OrganizersTableRow.vue';

export default {
    components: { OrganizersTableRow },
    data() {
        return {
            userStore: useUserStore(),
        };
    },
    computed: {
        organizers() {
            return this.userStore.users.filter((user) => user?.role === 'organizer');
        }
    }
}
</script>

<template>
    <div class="table-container">
        <div class="table-header organizers-table-header">
            <div>Name</div>
            <div>Email</div>
            <div>Remove</div>
        </div>
        <OrganizersTableRow v-for="organizer of organizers" :organizer="organizer" :key="organizer?.email" />
    </div>
</template>

<style scoped>
.organizers-table-header {
    grid-template-columns: 1fr 1fr 70px;
    min-width: 400px;
}
</style>