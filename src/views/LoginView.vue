<script>
import { routePaths } from '@/router';
import MainButton from '@/components/buttons/MainButton.vue';

export default {
    components: { MainButton },
    data() {
        return {
            email: "",
            password: "",
            routerPathInfo: routePaths,
        };
    },
    methods: {
        handleLogin() {
            console.log(`Email: ${this.email} | password: ${this.password}`);
        },
    }
}
</script>

<template>
    <main class="login-container">
        <div class="login-left-part">
            <div class="login-form-with-header-container">
                <div class="heading-section">Log in</div>
                <div>
                    No account yet? <RouterLink :to="routerPathInfo.register.path">Register</RouterLink>.
                </div>
                <form class="login-form">
                    <input type="email" name="email" v-model="this.email" placeholder="Email" class="text-input" />
                    <input type="password" v-model="this.password" placeholder="Password" class="text-input" />
                    <MainButton @click.prevent="this.handleLogin" label="Log in" />
                </form>
            </div>
        </div>
        <div class="login-right-part">

        </div>
    </main>
</template>

<style>
.login-container {
    display: flex;
    width: 100%;
    height: 100%;
    height: calc(100vh - 54px);
    overflow-y: hidden;
}

.login-left-part {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50%;
    height: 100%;
}

.login-form-with-header-container {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.login-right-part {
    width: 50%;
    height: 100%;
    background: url('../assets/images/tech-event-login.jpeg') center/cover no-repeat;
}

@media (max-width: 700px) {
    .login-left-part {
        width: 100%;
    }

    .login-right-part {
        width: 0;
    }
}

.login-form {
    display: flex;
    flex-direction: column;
    max-width: 400px;
    gap: 4px;
}

input {
    height: 20px;
}
</style>
