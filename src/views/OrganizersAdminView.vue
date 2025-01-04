<script>
import MainButton from '@/components/buttons/MainButton.vue';
import OrganizersTable from '@/components/organizers-table/OrganizersTable.vue';
import { useUserStore } from '@/stores/user';

export default {
    components: { MainButton, OrganizersTable },
    data() {
        return {
            userStore: useUserStore(),
            newOrganizerName: "",
            newOrganizerEmail: "",
            newOrganizerPassword: "",
            error: undefined,
        }
    },
    methods: {
        handleInvite() {
            this.error = undefined;
            const user = this.userStore.getByEmail(this.newOrganizerEmail);
            if (user !== undefined) {
                this.error = "The user with this email address already exists";
            } else {
                this.userStore.users.push({
                    name: this.newOrganizerName,
                    email: this.newOrganizerEmail,
                    password: this.newOrganizerPassword,
                    ticketName: 'regular',
                    talkTitles: [],
                    role: 'organizer',
                })
            }
        },
    }
}
</script>

<template>
    <main class="container">
        <div class="inner-container">
            <div class="heading-section">Organizers admin</div>
            <form class="invite-organizer-form">
                <div v-if="this.error !== undefined" class="error">{{ this.error }}</div>
                <input required class="text-input" type="text" v-model="this.newOrganizerName" placeholder="Name" />
                <input required class="text-input" type="email" v-model="this.newOrganizerEmail" placeholder="Email" />
                <input required class="text-input" type="password" v-model="this.newOrganizerPassword"
                    placeholder="Password" />
                <MainButton type="secondary" @click="this.handleInvite" label="Invite organizer" />
            </form>
            <OrganizersTable />
        </div>
    </main>
</template>

<style scoped>
.container {
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
    align-items: flex-start;
    gap: 32px;
    margin-top: 24px;
}

.invite-organizer-form {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
}

@media (max-width: 700px) {
    .inner-container {
        align-items: center;
    }

    .invite-organizer-form {
        width: 100%;
        flex-direction: column;
    }
}
</style>