<script>
import MainButton from '@/components/buttons/MainButton.vue';
import ParticipantsTable from '@/components/participants-table/ParticipantsTable.vue';

export default {
    components: { MainButton, ParticipantsTable },
}
</script>

<template>
    <main class="container">
        <div class="inner-container">
            <div class="heading-section">Participants admin</div>
            <ParticipantsTable />
        </div>
    </main>
</template>

<style scoped>
.container {
    display: flex;
    flex: 1;
    width: 100%;
    justify-content: center;
    background: rgb(2, 3, 21);
    color: white;
}

.inner-container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 32px;
    margin-top: 24px;
    max-width: 100%;
}

@media (max-width: 700px) {
    .inner-container {
        align-items: center;
    }
}
</style>