<script>
import SpeakerOverview from '@/components/speaker-overview/SpeakerOverview.vue';
import { speakers } from '@/constants/settings';

export default {
    components: { SpeakerOverview },
    data() {
        return {
            speakers: speakers,
        }
    },
};
</script>

<template>
    <main class="speakers-container">
        <div class="speakers-inner-container">
            <SpeakerOverview v-for="speaker in this.speakers" :key="speaker.name" :name="speaker.name"
                :country="speaker.country" />
        </div>
    </main>
</template>

<style>
.speakers-container {
    display: flex;
    flex: 1;
    width: 100%;
    padding-bottom: 32px;
    justify-content: center;
    background: rgb(2, 3, 21);
    color: white;
}

.speakers-inner-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    gap: 16px;
}
</style>
