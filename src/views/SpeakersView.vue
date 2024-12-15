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
            <div class="speakers-introduction-container">
                <div class="speakers-main-heading">
                    Speakers
                </div>
                <div class="speakers-introduction-text">
                    More than 60 speakers from all around the world. Industry experts with multiple
                    <b>lifetimes of experience</b> combined.
                </div>
            </div>
            <RouterLink v-for="(speaker, index) in this.speakers" :key="speaker.name"
                :to="{ name: 'speakerDetail', params: { name: speaker.name } }" class="non-link">
                <SpeakerOverview :name="speaker.name" :country="speaker.country" :photoPath="speaker.photoPath" />
            </RouterLink>
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
    max-width: 80%;
}

@media (max-width: 700px) {
    .speakers-inner-container {
        max-width: 100%;
    }
}

.speakers-main-heading {
    font-size: 46px;
    color: rgb(221, 73, 5);
    text-transform: uppercase;
    font-weight: 700;
}

.speakers-introduction-container {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;

    gap: 16px;
    flex-direction: column;
    margin-top: 32px;
    margin-bottom: 32px;
    width: 100%;
}

.speakers-introduction-text {
    max-width: 600px;
    font-style: italic;
}
</style>
