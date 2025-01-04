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
    <div class="schedule-table-container">
        <div class="schedule-table-header">
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
.schedule-table-container {
    display: flex;
    flex-direction: column;
    opacity: 0.5;
    color: black;
    overflow-x: scroll;
}

.schedule-table-header {
    display: grid;
    grid-template-columns: 15% 35% 25% 15% 10%;
    font-weight: 700;
    text-transform: uppercase;
    color: white;
    min-width: 800px;
}

@media (max-width: 700px) {
    .schedule-table-header {
        font-size: 12px;
    }
}
</style>