<script>
import ScheduleTable from '@/components/schedule-table/ScheduleTable.vue';
import { useProgramStore } from '@/stores/program.js'


export default {
    components: { ScheduleTable },
    data() {
        const programStore = useProgramStore();
        return {
            programByDays: programStore.program,
        }
    }
};
</script>

<template>
    <main class="program-container">
        <div class="program-inner-container">
            <div class="program-introduction">
                <div class="program-main-heading">Schedule</div>
                <div class="program-intro-text">
                    Be prepared for deep-dives into the newest innovations in the tech space.
                    From embedded systems to web development, everybody will find interesting talks.
                </div>
            </div>
            <div class="day-schedule-container" v-for="dayProgram in this.programByDays">
                <div class="day-schedule-title">{{ dayProgram.dayTitle }}</div>
                <ScheduleTable :rows="dayProgram.talks" />
            </div>
        </div>
    </main>
</template>

<style>
.program-container {
    display: flex;
    flex: 1;
    width: 100%;
    padding-bottom: 32px;
    justify-content: center;
    background: rgb(2, 3, 21);
    color: white;
}

.program-inner-container {
    display: flex;
    flex: 1;
    max-width: 70%;
    justify-content: center;
    flex-direction: column;
    gap: 32px;
}

@media (max-width: 1200px) {
    .program-inner-container {
        max-width: 85%;
    }
}

@media (max-width: 700px) {
    .program-inner-container {
        max-width: 100%;
    }
}

.program-introduction {
    display: flex;
    gap: 16px;
    flex-direction: column;
    align-items: center;
    margin-top: 32px;
}

.program-main-heading {
    font-size: 46px;
    color: rgb(221, 73, 5);
    text-transform: uppercase;
    font-weight: 700;
}

.program-intro-text {
    text-align: center;
    max-width: 600px;
    font-style: italic;
}

.day-schedule-container {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.day-schedule-title {
    font-size: 26px;
    font-weight: 650;
    color: rgb(221, 73, 5);
}
</style>
