<script>
export default {
    props: ['time', 'title', 'speaker', 'room', 'id']
}
</script>

<template>
    <div class="schedule-table-row-container">
        <RouterLink :to="{ name: 'talkDetail', params: { id: this.id } }" class="non-link">
            <div class="schedule-table-row-content">
                <div class="schedule-row-field">{{ this.time }}</div>
                <div class="schedule-row-field"><i>{{ this.title }}</i></div>
                <div class="schedule-row-field">{{ this.speaker }}</div>
                <div class="schedule-row-field">{{ this.room }}</div>
            </div>
        </RouterLink>
    </div>
</template>

<style>
.schedule-table-row-container {
    position: relative;
}

.schedule-table-row-content {
    display: grid;
    grid-template-columns: 15% 40% 30% 15%;
    background: rgb(231, 231, 231);
    padding: 16px 0 16px 0;
    cursor: pointer;
}

.schedule-table-row-content:hover {
    background: rgb(215, 215, 215);
}

.schedule-table-row-container:nth-child(2) {
    border-radius: 10px 10px 0 0;
    overflow: hidden;
}

.schedule-table-row-container:last-child {
    border-radius: 0 0 10px 10px;
    overflow: hidden;
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