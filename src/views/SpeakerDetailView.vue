<script>
import { useProgramStore } from '@/stores/program'
import { useRoute } from 'vue-router'
import TalksList from '@/components/talks-list/TalksList.vue'
import MainButton from '@/components/buttons/MainButton.vue'
import { useUserStore } from '@/stores/user.js'


export default {
    components: { MainButton, TalksList },
    data() {
        const route = useRoute()
        const programStore = useProgramStore()
        const speaker = programStore.getSpeakerByName(route.params.name)
        const talks = programStore.getTalksBySpeakerName(route.params.name)
        return {
            speaker: speaker,
            talks: talks,
            userStore: useUserStore(),
            programStore: programStore,
            speakerBio: speaker.bio,
            speakerName: route.params.name,
        }
    },
    methods: {
        handleEditSpeaker() {
            this.programStore.updateSpeakerByName(this.speakerName, this.speakerBio);
        },
    },
    computed: {
        computedBio() {
            const speaker = this.programStore.getSpeakerByName(this.speakerName);
            return speaker.bio;
        }
    }
}
</script>

<template>
    <main class="speaker-detail-container">
        <div class="speaker-detail-info">
            <div v-if="this.userStore.isOrganizer" class="speaker-admin-box">
                <form class="edit-speaker-form" v-on:submit.prevent="this.handleEditSpeaker()">
                    <div class="input-with-label-container">
                        <label for="bio">Bio: </label>
                        <input type="text" name="bio" v-model="this.speakerBio" />
                    </div>
                    <MainButton class="wide-button" type="secondary" label="Save changes" />
                </form>
            </div>
            <div class="heading-section">{{ this.speaker.name }} {{ this.speaker.country }}</div>
            <div>{{ this.computedBio }}</div>
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

.speaker-admin-box {
    border: 1px solid white;
    border-radius: 10px;
    padding: 20px;
}

.input-with-label-container {
    display: flex;
    justify-content: space-between;
}

.edit-speaker-form {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.wide-button {
    width: 100%;
}
</style>
