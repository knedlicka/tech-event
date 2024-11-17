<script>
import CalendarIcon from '../assets/images/svg/calendar.svg';
export default {
  components: { CalendarIcon }
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
    <!-- <ProgramTiles /> TODO add tiles such as program, about, speakers, registration etc to homepage. Add cool 3d effects to them or smth -->
  </main>
</template>

<style>
.home-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  background: url('../assets/images/tech-event.jpeg') center/cover no-repeat;
  z-index: 1;
  height: 100vh;
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
</style>
