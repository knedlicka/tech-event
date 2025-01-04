<script>
export default {
    props: ['talks'],
}
</script>

<template>
    <div class="talks-list-container">
        <div class="talks-heading">
            Talks:
        </div>
        <RouterLink v-for="talk in this.talks" :key="talk.title"
            :to="{ name: 'talkDetail', params: { title: talk.title } }" class="non-link">
            <div class="talk-info">
                <span>{{ talk.title }}</span>
            </div>
        </RouterLink>
    </div>
</template>

<style>
.talks-list-container {
    margin-top: 20px;
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    justify-content: center;
}

.talks-heading {
    font-weight: 700;
    font-size: 20px;
}

.talk-info {
    display: flex;
    padding: 12px;
    background: rgb(231, 231, 231);
    border-radius: 10px;
    color: rgb(2, 3, 21);
    opacity: 0.4;
    cursor: pointer;
}

.talk-info:hover {
    background: rgb(215, 215, 215);
}
</style>