<script>
import { useMaterialStore } from '@/stores/material'
import { useProgramStore } from '@/stores/program'
import { useUserStore } from '@/stores/user.js'
import { useRoute } from 'vue-router'
import MainButton from '@/components/buttons/MainButton.vue'

export default {
    components: { MainButton },
    data() {
        const route = useRoute()
        const talkTitle = route.params.title
        const programStore = useProgramStore()
        const talk = programStore.getTalk(talkTitle)
        const materialStore = useMaterialStore()
        return {
            userStore: useUserStore(),
            programStore: programStore,
            talk: talk,
            talkTitle: talkTitle,
            videos: materialStore.materials[talkTitle]?.videos ?? [],
            links: materialStore.materials[talkTitle]?.links ?? [],
            talkSpeaker: talk.speaker,
            talkRoom: talk.room
        }
    },
    methods: {
        handleEditTalk() {
            this.programStore.updateTalkByTitle(this.talk.title, this.talkSpeaker, this.talkRoom);
        },
    },
    computed: {
        speaker() {
            return this.programStore.getTalk(this.talkTitle).speaker;
        }
    }
}
</script>

<template>
    <main class="talk-details-container">
        <div v-if="this.userStore.isOrganizer" class="talk-admin-box">
            <form class="edit-talk-form" v-on:submit.prevent="this.handleEditTalk()">
                <div class="input-with-label-container">
                    <label for="speaker">Speaker: </label>
                    <input type="text" name="speaker" v-model="this.talkSpeaker" />
                </div>
                <div class="input-with-label-container">
                    <label for="room">Room: </label>
                    <input type="text" name="room" v-model="this.talkRoom" />
                </div>
                <MainButton class="wide-button" type="secondary" label="Save changes" />
            </form>
        </div>
        <div class="heading-section">
            {{ talk.title }}
        </div>
        <div>
            Talk materials by {{ this.speaker }}
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

.talk-admin-box {
    border: 1px solid white;
    border-radius: 10px;
    padding: 20px;
}

.input-with-label-container {
    display: flex;
    justify-content: space-between;
}

.edit-talk-form {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.wide-button {
    width: 100%;
}
</style>
