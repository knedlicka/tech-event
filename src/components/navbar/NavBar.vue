<template>
    <nav class="navbar-container">
        <div class="nav-half">
            <div class="logo">
                LOGO
            </div>
        </div>
        <div class="nav-half" v-if="!this.isMobile">
            <div class="menu-link-container" v-for="menuItem of this.menuItems" :key="menuItem.name">
                <RouterLink :class="this.$route.path === menuItem.path ? 'active' : ''" :to="menuItem.path">{{
                    menuItem.name }}</RouterLink>
            </div>
            <div v-if="this.userStore.isLoggedIn" class="menu-link-container" @click="this.handleLogout"><a>Log out</a>
            </div>
        </div>
        <div class="hamburger-menu" v-if="this.isMobile">
            <button @click="this.toggleMenu">
                ☰
            </button>
        </div>
    </nav>
    <div v-if="this.showMenu" class="dropdown-menu">
        <div class="expanded-menu-link-container" v-for="menuItem of this.menuItems" @click="this.hideMenu"
            :key="menuItem.name">
            <RouterLink :to="menuItem.path">{{ menuItem.name }}</RouterLink>
        </div>
        <div v-if="this.userStore.isLoggedIn" class="expanded-menu-link-container" @click="this.handleLogout"><a>Log
                out</a></div>
    </div>
</template>

<script>
import router, { routePaths } from '@/router';
import { useUserStore } from '@/stores/user';

export default {
    data() {
        const userStore = useUserStore();
        const loggedInMenuItems = [routePaths.home, routePaths.program, routePaths.speakers, routePaths.profile];
        const notLoggedInMenuItems = [routePaths.home, routePaths.login];
        return {
            userStore: userStore,
            isMobile: window.innerWidth <= 600,
            showMenu: false,
            loggedInMenuItems: loggedInMenuItems,
            notLoggedInMenuItems: notLoggedInMenuItems,
        };
    },
    computed: {
        menuItems() {
            return this.userStore.isLoggedIn ? this.loggedInMenuItems : this.notLoggedInMenuItems
        },
    },
    methods: {
        handleResize() {
            this.isMobile = window.innerWidth <= 600;
        },
        toggleMenu() {
            this.showMenu = !this.showMenu;
        },
        hideMenu() {
            this.showMenu = false;
        },
        handleLogout() {
            this.userStore.logout();
            router.push(routePaths.home.path);
        },
    },
    mounted() {
        window.addEventListener('resize', this.handleResize);
    },

    unmounted() {
        window.removeEventListener('resize', this.handleResize);
    }
}
</script>


<style>
.navbar-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px;
    color: white;
    background: rgb(30, 25, 25);
    height: 30px;
}

.nav-half {
    display: flex;
    gap: 16px;
    align-items: center;
}

.hamburger-menu button {
    background: none;
    border: none;
    color: white;
    font-size: 24px;
    cursor: pointer;
}

.dropdown-menu {
    display: flex;
    flex-direction: column;
    width: 100%;
    background: rgb(30, 25, 25);
}

.menu-link-container {
    text-transform: capitalize;
    cursor: pointer;
}

.menu-link-container a {
    text-decoration: none;
    color: white;
    opacity: 0.7;
}

.menu-link-container a:hover {
    opacity: 1;
}

.expanded-menu-link-container {
    text-transform: capitalize;
    width: 100%;
    border-top: 1px solid white;
    padding: 16px;
    cursor: pointer;
}

.expanded-menu-link-container a {
    text-decoration: none;
    color: white;
    opacity: 0.7;
}

.expanded-menu-link-container a:hover {
    opacity: 1;
}

.active {
    opacity: 1 !important;
    font-weight: 700;
}
</style>
