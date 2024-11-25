<script>
import { routePaths } from '@/router';
import CalendarIcon from '../assets/images/svg/calendar.svg';
import ClickableCard from '@/components/clickable-card/ClickableCard.vue';

export default {
  components: { CalendarIcon, ClickableCard },
  data() {
    return {
      cards: [
        {
          label: "Register",
          path: routePaths.register.path,
        },
        {
          label: "Log in",
          path: routePaths.login.path,
        },
        {
          label: "Program",
          path: routePaths.program.path,
        },
        {
          label: "Speakers",
          path: routePaths.speakers.path,
        },
      ]
    }
  },
  methods: {
    handleCardClick(card) {
      this.$router.push(card.path);
    },
  },
}
</script>

<template>
  <main class="home-container">
    <div class="home-intro">
      <div class="home-main-heading">Annual tech event 2025</div>
      <span class="home-main-description">
        <div class="calendar-icon">
          <CalendarIcon />
        </div>
        <span>January 28th - February 2nd</span>
      </span>
    </div>
    <div class="cards-container">
      <ClickableCard v-for="(card, index) in this.cards" :label="card.label" :key="`card-${index}`"
        @click="() => handleCardClick(card)" />
    </div>
  </main>
</template>

<style>
.home-container {
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  position: relative;
  background: url('../assets/images/tech-event.jpeg') center/cover no-repeat;
  z-index: 1;
  height: 100%;
}

.home-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.75);
  z-index: 0;
}

.home-container>* {
  z-index: 1;
}

.home-intro {
  display: flex;
  flex-direction: column;
  gap: 16px;
  text-align: center;
  margin-top: 40px;
}

.calendar-icon {
  width: 16px;
  height: 16px;
  color: rgb(255, 255, 255);
}

.home-main-heading {
  font-size: 52px;
  text-transform: uppercase;
  font-weight: 900;
  color: rgb(221, 73, 5);
  text-align: center;
  width: 100%;
}

.home-main-description {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  color: rgb(255, 255, 255);
}

.cards-container {
  display: flex;
  flex-wrap: wrap;
  gap: 32px;
  justify-content: space-evenly;
  margin: 64px 0 64px 0;
}
</style>
