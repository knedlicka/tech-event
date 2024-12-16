<script>
import { useProgramStore } from '@/stores/program';
import { useRoute } from 'vue-router';


export default {
    data() {
        const route = useRoute();
        const programStore = useProgramStore();
        const speaker = programStore.getSpeakerByName(route.params.name);
        const talks = programStore.getTalksBySpeakerName(route.params.name);
        return {
            speaker: speaker,
            talks: talks,
        }
    }
};
</script>

<template>
    <main class="speaker-detail-container">
        <div class="speaker-detail-info">
            <div class="heading-section">{{ this.speaker.name }} {{ this.speaker.country }}</div>
            <div>{{ this.speaker.bio }}</div>
            <div class="talks-list-container">
                <div class="talks-heading">
                    Talks:
                </div>
                <div v-for="talk in this.talks" :key="talk.title" class="talk-info">
                    <span>{{ talk.title }}</span>
                </div>
            </div>
        </div>
        <div class="speaker-detail-photo-container">
            <img :src="this.speaker.photoPath" class="speaker-detail-photo" />
        </div>
    </main>
</template>

<style>
.speaker-detail-container {
    display: flex;
    flex: 1;
    width: 100%;
    justify-content: center;
    align-items: center;
    background: rgb(2, 3, 21);
    color: white;
}

.speaker-detail-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 16px;
    width: 50%;
    text-align: center;
    padding-inline: 30px;
}

.speaker-detail-photo-container {
    width: 50%;
    right: 0;
}

.speaker-detail-photo {
    width: 100%;
}

.talks-list-container {
    margin-top: 20px;
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    justify-content: center;
}

.talks-heading {
    font-weight: 700;
    font-size: 20px;
}

.talk-info {
    display: flex;
    padding: 12px;
    background: rgb(231, 231, 231);
    border-radius: 10px;
    color: rgb(2, 3, 21);
    opacity: 0.4;
}

@media (max-width: 460px) {
    .speaker-detail-container {
        flex-direction: column;
    }

    .speaker-detail-info {
        width: 100%;
    }

    .speaker-detail-photo-container {
        width: 100%;
    }
}
</style>