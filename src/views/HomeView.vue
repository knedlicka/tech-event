<script>
import { routePaths } from '@/router';
import CalendarIcon from '../assets/images/svg/calendar.svg';
import ClickableCard from '@/components/clickable-card/ClickableCard.vue';
import TicketsBox from '@/components/tickets-box/TicketsBox.vue';
import { useUserStore } from '@/stores/user';
import MainButton from '@/components/buttons/MainButton.vue'

export default {
  components: { MainButton, CalendarIcon, ClickableCard, TicketsBox },
  data() {
    return {
      userStore: useUserStore(),
      cards: [
        {
          label: "Program",
          path: routePaths.program.path,
        },
        {
          label: "Speakers",
          path: routePaths.speakers.path,
        },
      ],
      startDate: Date.parse("28 Jan 2025"),
      timeLeft: 0,
      timer: null,
    }
  },
  methods: {
    handleCardClick(card) {
      this.$router.push(card.path);
    },
    updateCountdown() {
      this.timeLeft = this.startDate - new Date();

      if (this.timeLeft <= 0) {
        clearInterval(this.timer);
        this.timeLeft = 0;
      }
    },
  },
  computed: {
    days() {
      return Math.floor(this.timeLeft / (1000 * 60 * 60 * 24));
    },
    hours() {
      return Math.floor((this.timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    },
    minutes() {
      return Math.floor((this.timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    },
    seconds() {
      return Math.floor((this.timeLeft % (1000 * 60)) / 1000);
    },
    canClaimPoints() {
      const currentUser = this.userStore.currentUser;
      if (!currentUser) {
        return false;
      }
      const todayDateStr = new Date().toJSON().slice(0, 10);
      return !currentUser.pointsClaimedOn.includes(todayDateStr);
    }
  },
  mounted() {
    this.updateCountdown();
    this.timer = setInterval(this.updateCountdown, 1000);
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer);
    }
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
    <div class="countdown">
      <div v-if="timeLeft > 0">
        {{ days }}d {{ hours }}h {{ minutes }}m {{ seconds }}s
      </div>
    </div>
    <div v-if="this.userStore.isLoggedIn" class="claim-area">
      <MainButton :disabled="!this.canClaimPoints" type="secondary" v-on:click="this.userStore.claimPoints()"
        :label="`${this.canClaimPoints ? 'Claim today\'s points' : 'Return tomorrow'}`" />
    </div>
    <div class="cards-container">
      <ClickableCard v-for="(card, index) in this.cards" :label="card.label" :key="`card-${index}`"
        @click="() => handleCardClick(card)" />
    </div>
    <TicketsBox v-if="this.userStore.isLoggedIn && !this.userStore.isOrganizer" />
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

.claim-area {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 60px;
}

.claim-area>button {
  width: 200px;
  height: 60px;
  font-size: 18px;
  font-weight: 600;
}

.countdown {
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  margin-top: 60px;
  font-size: 48px;
  font-weight: 600;
}
</style>
