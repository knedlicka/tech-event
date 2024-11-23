<script setup>
import { RouterView } from 'vue-router'
import NavBar from './components/navbar/NavBar.vue';
import Footer from './components/footer/Footer.vue';
</script>

<template>
  <NavBar />

  <div>
    <RouterView />
  </div>

  <Footer />
</template>

<style></style>
