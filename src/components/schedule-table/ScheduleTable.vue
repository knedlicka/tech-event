<script>
import { useUserStore } from '@/stores/user';
import ScheduleTableRow from './ScheduleTableRow.vue';

export default {
    components: { ScheduleTableRow },
    props: ['rows'],
    data() {
        const userStore = useUserStore();
        return {
            userStore: userStore,
        }
    },
}
</script>

<template>
    <div class="table-container schedule-table-container">
        <div class="table-header schedule-table-header">
            <div>Time</div>
            <div>Title</div>
            <div>Speaker</div>
            <div>Room</div>
            <div v-if="this.userStore.isLoggedIn">Register</div>
        </div>
        <ScheduleTableRow v-for="(row, index) in this.rows" :key="row.title" :time="row.time" :title="row.title"
            :speaker="row.speaker" :room="row.room" :id="index" />
    </div>
</template>

<style>
.schedule-table-header {
    min-width: 800px;
    grid-template-columns: 15% 35% 25% 15% 10%;
}
</style>