<script>
import router, { routePaths } from '@/router';
import MainButton from '@/components/buttons/MainButton.vue';
import { useUserStore } from '@/stores/user';

export default {
    components: { MainButton },
    data() {
        return {
            userStore: useUserStore(),
            email: "",
            password: "",
            fullName: "",
            role: "participant",
            routerPathInfo: routePaths,
            error: undefined,
        };
    },
    methods: {
        handleRegister() {
            const maybeRegisterError = this.userStore.register(this.email, this.password, this.fullName, this.role);
            this.error = maybeRegisterError;
            router.push(routePaths.login.path);
        },
    }
}
</script>

<template>
    <main class="register-container">
        <div class="register-inner-container">
            <div class="register-left-part">
                <div class="register-form-with-header-container">
                    <div class="heading-section">Register</div>
                    <div>
                        Already have an account? <RouterLink class="white-link" :to="routerPathInfo.login.path">Log in
                        </RouterLink>.
                    </div>
                    <div v-if="this.error !== undefined" class="error">{{ this.error }}</div>
                    <form class="register-form">
                        <input required type="text" name="full-name" v-model="this.fullName" placeholder="Full Name"
                            class="text-input" />
                        <!-- <select required v-model="this.role" class="select-input">
                            <option disabled value="">Select role</option>
                            <option value="organizer">Organizer</option>
                            <option value="participant">Participant</option>
                        </select> -->
                        <input required type="email" name="email" v-model="this.email" placeholder="Email"
                            class="text-input" />
                        <input required type="password" v-model="this.password" placeholder="Password"
                            class="text-input" />
                        <MainButton @click.prevent="this.handleRegister" label="Register" />
                    </form>
                </div>
            </div>
            <div class="register-right-part"></div>
        </div>
    </main>
</template>

<style>
.register-container {
    display: flex;
    flex-direction: column;
    flex: 1;
    width: 100%;
    background: rgb(2, 3, 21);
    color: white;
}

.register-inner-container {
    display: flex;
    flex: 1;
    width: 100%;
}

.register-left-part {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50%;
}

.register-form-with-header-container {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.register-right-part {
    width: 50%;
    background: url('../assets/images/tech-event-registration.jpeg') center/cover no-repeat;
}

@media (max-width: 700px) {
    .register-left-part {
        width: 100%;
    }

    .register-right-part {
        width: 0;
    }
}

.register-form {
    display: flex;
    flex-direction: column;
    max-width: 400px;
    gap: 4px;
}

input {
    height: 20px;
}
</style>
