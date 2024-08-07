<template>
    <div class="task">
        <h3>{{ item.title }}</h3>
        <div class="icons">
            <i class="material-icons" @click="taskStore.deleteTask(item.id)">delete</i>
            <i :class="{ active: item.isFav }" class="material-icons" @click="taskStore.toogleFav(item.id)">favorite</i>
        </div>
    </div>
</template>

<script setup>
import { useTaskStore } from '../stores/TaskStore.js'
const props = defineProps(["item"]); // item is the name of the props that has been sending from home. defined the props type (string,etc)
const taskStore = useTaskStore();
</script>

<style lang="scss" scoped></style>
