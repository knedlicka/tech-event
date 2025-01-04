<script>
import { useUserStore } from '@/stores/user';
import { useProgramStore } from '@/stores/program';
import TalksList from '@/components/talks-list/TalksList.vue';

export default {
    components: { TalksList },
    data() {
        return {
            userStore: useUserStore(),
            programStore: useProgramStore(),
            canEditProfile: true,
            displayFields: [
                { key: 'name', label: 'Name' },
                { key: 'email', label: 'Email' },
                { key: 'ticketName', label: 'Ticket' },
            ],
        };
    },
}
</script>

<template>
    <main class="profile-view-container">
        <div class="inner-container">
            <p></p>
            <div class="heading-section">Your profile</div>
            <p></p>
            <div class="info-container">
                <div v-for="fieldInfo in displayFields" class="info-entry">
                    <b>{{ fieldInfo.label }}:</b> {{ userStore.currentUser[fieldInfo.key] }}
                </div>
            </div>
            <TalksList :talks="userStore.currentUser.talkTitles.map(talkTitle => programStore.getTalk(talkTitle))" />
        </div>
    </main>
</template>

<style scoped>
.profile-view-container {
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
}

.info-container {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    gap: 8px;
}
</style>