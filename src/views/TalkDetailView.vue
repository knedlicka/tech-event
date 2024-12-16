<script>
import { useMaterialStore } from '@/stores/material';
import { useProgramStore } from '@/stores/program';
import { useRoute } from 'vue-router';

export default {
    data() {
        const route = useRoute();
        const talkTitle = route.params.title;
        const programStore = useProgramStore();
        const talk = programStore.getTalk(talkTitle);
        const materialStore = useMaterialStore();
        return {
            talk: talk,
            videos: materialStore.materials[talkTitle]?.videos ?? [],
            links: materialStore.materials[talkTitle]?.links ?? [],
        }
    }
};
</script>

<template>
    <main class="talk-details-container">
        <div class="heading-section">
            {{ talk.title }}
        </div>
        <div>
            Talk materials by {{ talk.speaker }}
        </div>
        <div v-if="this.videos.length > 0" class="materials-container">
            <b>Videos:</b>
            <iframe v-for="url of this.videos" class="video-iframe" :src="url" :key="url"></iframe>

            <b>Links:</b>
            <a v-for="link of this.links" :href="link" :key="link">{{ link }}</a>
        </div>
    </main>
</template>

<style>
.talk-details-container {
    display: flex;
    flex-direction: column;
    gap: 8px;
    flex: 1;
    width: 100%;
    align-items: center;
    background: rgb(2, 3, 21);
    color: white;
    padding-top: 20px;
}

.materials-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    margin-bottom: 20px;
}

.video-iframe {
    width: 420px;
    height: 315px;
}

@media (max-width: 460px) {
    .video-iframe {
        width: 210px;
        height: 157px;
    }
}
</style>