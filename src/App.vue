<script setup>
import { RouterView } from 'vue-router'
import NavBar from './components/NavBar/NavBar.vue';
</script>

<template>
  <header>
    <div class="wrapper">
      <NavBar />
    </div>
  </header>

  <div>
    <RouterView />
  </div>
</template>

<style></style>
