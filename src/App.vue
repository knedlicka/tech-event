<script setup>
import { RouterView } from 'vue-router'
import NavBar from './components/navbar/NavBar.vue';
import Footer from './components/footer/Footer.vue';
</script>

<template>
  <div class="page-container">
    <NavBar />

    <div class="content-container">
      <RouterView />
    </div>

    <Footer />
  </div>
</template>

<style>
.page-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.content-container {
  display: flex;
  flex-direction: column;
  flex: 1;
}
</style>
