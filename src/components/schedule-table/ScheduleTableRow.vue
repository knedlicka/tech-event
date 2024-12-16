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
            if (this.currentUserRegistered) {
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
    <div class="schedule-table-row-container">
        <div class="schedule-table-row-content">
            <RouterLink :to="{ name: 'talkDetail', params: { title: this.title } }" class="non-link">
                <div class="schedule-row-field">{{ this.time }}</div>
            </RouterLink>
            <RouterLink :to="{ name: 'talkDetail', params: { title: this.title } }" class="non-link">
                <div class="schedule-row-field"><i>{{ this.title }}</i></div>
            </RouterLink>
            <RouterLink :to="{ name: 'talkDetail', params: { title: this.title } }" class="non-link">
                <div class="schedule-row-field">{{ this.speaker }}</div>
            </RouterLink>
            <RouterLink :to="{ name: 'talkDetail', params: { title: this.title } }" class="non-link">
                <div class="schedule-row-field">{{ this.room }}</div>
            </RouterLink>
            <div>
                <button v-on:click="handleRegistration()"
                    :class="this.currentUserRegistered ? 'reg-button button-register' : 'reg-button button-unregister'">
                    {{ this.currentUserRegistered ? 'Unregister' : 'Register' }}
                </button>
            </div>
        </div>
    </div>
</template>

<style>
.schedule-table-row-container {
    position: relative;
}

.schedule-table-row-content {
    display: grid;
    grid-template-columns: 15% 35% 25% 15% 10%;
    background: rgb(231, 231, 231);
    padding: 16px 0 16px 0;
    cursor: pointer;
}

.schedule-table-row-content:hover {
    background: rgb(215, 215, 215);
}

.schedule-table-row-container:nth-child(2) {
    border-radius: 10px 10px 0 0;
    overflow: hidden;
}

.schedule-table-row-container:last-child {
    border-radius: 0 0 10px 10px;
    overflow: hidden;
}

.schedule-table-row-container::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1px;
    background-color: rgb(2, 3, 21);
}

.schedule-table-row-container:last-child::after {
    content: none;
}

.schedule-row-field {
    padding-inline: 3px;
}

.reg-button {
    border-radius: 6px;
    cursor: pointer;
}

.reg-button:hover {
    transform: translate(1px, 1px);
}

.button-register {
    background: orange;
}

.button-unregister {
    background: cyan;
}
</style>