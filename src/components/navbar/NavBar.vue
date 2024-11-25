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
    </div>
</template>

<script>
import { routePaths } from '@/router';

export default {
    data() {
        return {
            isMobile: window.innerWidth <= 600,
            showMenu: false,
            menuItems: [routePaths.home, routePaths.program, routePaths.speakers, routePaths.login],
        };
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
