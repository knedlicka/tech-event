<script>
import { useUserStore } from '@/stores/user';
import { useProgramStore } from '@/stores/program';
import TalksList from '@/components/talks-list/TalksList.vue';
import MainButton from '@/components/buttons/MainButton.vue';
import { pointsPerDay } from '@/constants/settings.js';

export default {
    components: { TalksList, MainButton },
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
    methods: {
        pointsPerDay() {
            return pointsPerDay;
        },
        handleReturnTicket() {
            this.userStore.returnTicket();
            alert('You returned the ticket successfully. You money will be refunded in 7 days.');
        },
    },
}
</script>

<template>
    <main class="profile-view-container">
        <div v-if="userStore?.currentUser" class="inner-container">
            <p></p>
            <div class="heading-section">Your profile</div>
            <p></p>
            <div class="info-container">
                <div v-for="fieldInfo in displayFields" class="info-entry">
                    <b>{{ fieldInfo.label }}:</b> {{ this.userStore.currentUser[fieldInfo.key] }}
                </div>
                <div>
                    <b>Points:</b> {{ this.userStore.currentUser.pointsClaimedOn.length * pointsPerDay() }}
                </div>
                <div v-if="this.userStore.currentUser.ticketName !== 'no_ticket'">
                    <MainButton @click.prevent="this.handleReturnTicket" label="Return ticket" />
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
