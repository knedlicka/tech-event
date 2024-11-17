<script setup>
import { RouterLink, RouterView } from 'vue-router'
import NavBar from './components/NavBar/NavBar.vue';
</script>

<template>
  <header>
    <div class="wrapper">
      <NavBar />
    </div>
  </header>

  <RouterView />
</template>

<style scoped></style>
