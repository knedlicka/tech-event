<script>
import { rng } from '@/utils/common';

const RANDOM_PHOTOS_COUNT = 9;

export default {
    props: ['name', 'country'],
    data() {
        return {
            photoPath: `/src/assets/images/profile-photo-${rng(1, RANDOM_PHOTOS_COUNT)}.jpeg`,
        }
    },
}
</script>

<template>
    <div class="speaker-overview-container">
        <img class="speaker-overview-photo" :src="this.photoPath" :alt="this.name" />
        <div>{{ this.name }} ({{ this.country }})</div>
    </div>
</template>

<style>
.speaker-overview-container {
    display: flex;
    flex-direction: column;
    gap: 4px;
    width: 150px;
    height: 200px;
    border: 1px solid red;
}

.speaker-overview-photo {
    width: 150px;
    height: 150px;
}
</style>