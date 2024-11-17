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

  <div class="router-view-container">
    <div></div>
    <RouterView />
    <div></div>
  </div>
</template>

<style>
.router-view-container {
  display: grid;
  grid-template-columns: 20% 60% 20%;
}

@media (max-width: 400px) {
  .router-view-container {
    grid-template-columns: 0 100% 0%;
  }
}

@media (max-width: 600px) {
  .router-view-container {
    grid-template-columns: 5% 90% 5%;
  }
}

@media (max-width: 1200px) {
  .router-view-container {
    grid-template-columns: 10% 80% 10%;
  }
}
</style>
