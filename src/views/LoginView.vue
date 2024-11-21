<script>
import { routePaths } from '@/router';

export default {
    data() {
        console.log(JSON.stringify(routePaths?.register?.path, null, 2));
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
        redirectToRegistration() {

        }
    }
}
</script>

<template>
    <main class="login-container">
        <div class="login-left-part">
            <div class="login-form-with-header-container">
                <div class="heading-section">Log in</div>
                <div>
                    Or <RouterLink :to="routerPathInfo.register.path">register</RouterLink>.
                </div>
                <form class="login-form" @submit.prevent="this.handleLogin">
                    <input type="email" name="email" v-model="this.email" placeholder="Email" />
                    <input type="password" v-model="this.password" placeholder="Password" />
                    <input type="submit" value="Log in" />
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
    background: blue;
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
