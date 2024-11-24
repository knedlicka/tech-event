<script>
export default {
    props: ['time', 'title', 'speaker', 'room']
}
</script>

<template>
    <div class="schedule-table-row-container">
        <div class="schedule-row-field">{{ this.time }}</div>
        <div class="schedule-row-field"><i>{{ this.title }}</i></div>
        <div class="schedule-row-field">{{ this.speaker }}</div>
        <div class="schedule-row-field">{{ this.room }}</div>
    </div>
</template>

<style>
.schedule-table-row-container {
    display: grid;
    grid-template-columns: 15% 40% 30% 15%;
    position: relative;
    background: rgb(231, 231, 231);
    padding: 16px 0 16px 0;
}

.schedule-table-row-container:nth-child(2) {
    border-radius: 10px 10px 0 0;
}

.schedule-table-row-container:last-child {
    border-radius: 0 0 10px 10px;
}

.schedule-table-row-container::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1px;
    background-color: rgb(2, 3, 21);
}

.schedule-table-row-container:last-child::after {
    content: none;
}

.schedule-row-field {
    padding-inline: 3px;
}
</style>