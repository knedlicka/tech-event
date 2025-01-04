<script>
import { useProgramStore } from '@/stores/program';
import { useRoute } from 'vue-router';
import TalksList from '@/components/talks-list/TalksList.vue';


export default {
    components: { TalksList },
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
            <TalksList :talks="this.talks" />
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