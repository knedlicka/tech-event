<script>
import { useUserStore } from '@/stores/user';

export default {
    props: ['time', 'title', 'speaker', 'room', 'id'],
    data() {
        const userStore = useUserStore();
        return {
            userStore: userStore,
            currentUserRegistered: userStore.isRegisteredForTalk(this.title),
        }
    },
    methods: {
        handleRegistration() {
            if (!this.currentUserRegistered) {
                this.userStore.registerForTalk(this.title);
            } else {
                this.userStore.unregisterFromTalk(this.title);
            }
            this.currentUserRegistered = !this.currentUserRegistered;
        }
    }
}
</script>

<template>
    <div class="table-row-container schedule-table-row-container">
        <div class="table-row-content schedule-table-row-content">
            <RouterLink :to="{ name: 'talkDetail', params: { title: this.title } }" class="non-link">
                <div class="row-field">{{ this.time }}</div>
            </RouterLink>
            <RouterLink :to="{ name: 'talkDetail', params: { title: this.title } }" class="non-link">
                <div class="row-field"><i>{{ this.title }}</i></div>
            </RouterLink>
            <RouterLink :to="{ name: 'talkDetail', params: { title: this.title } }" class="non-link">
                <div class="row-field">{{ this.speaker }}</div>
            </RouterLink>
            <RouterLink :to="{ name: 'talkDetail', params: { title: this.title } }" class="non-link">
                <div class="row-field">{{ this.room }}</div>
            </RouterLink>
            <div v-if="this.userStore.isLoggedIn">
                <button v-on:click="handleRegistration()"
                    :class="this.currentUserRegistered ? 'table-button button-register' : 'table-button button-unregister'">
                    {{ this.currentUserRegistered ? 'Unregister' : 'Register' }}
                </button>
            </div>
        </div>
    </div>
</template>

<style>
.schedule-table-row-container {
    min-width: 800px;
}

.schedule-table-row-content {
    grid-template-columns: 15% 35% 25% 15% 10%;
}

.button-register {
    background: orange;
}

.button-unregister {
    background: cyan;
}
</style>