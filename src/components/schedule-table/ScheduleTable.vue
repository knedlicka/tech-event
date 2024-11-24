<script>
import ScheduleTableRow from './ScheduleTableRow.vue';

export default {
    components: { ScheduleTableRow },
    props: ['rows'],
}
</script>

<template>
    <div class="schedule-table-container">
        <div class="schedule-table-header">
            <div>Time</div>
            <div>Title</div>
            <div>Speaker</div>
            <div>Room</div>
        </div>
        <ScheduleTableRow v-for="row in this.rows" :key="row.title" :time="row.time" :title="row.title"
            :speaker="row.speaker" :room="row.room" />
    </div>
</template>

<style>
.schedule-table-container {
    display: flex;
    flex-direction: column;
    opacity: 0.5;
    color: black;
}

.schedule-table-header {
    display: grid;
    grid-template-columns: 15% 40% 30% 15%;
    font-weight: 700;
    text-transform: uppercase;
    color: white;
}

@media (max-width: 700px) {
    .schedule-table-header {
        font-size: 12px;
    }
}
</style>