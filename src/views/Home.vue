<template>
  <main>
    <header>
      <img src="@/assets/pinia-logo.svg" alt="">
      <h1>Pinia Tasks</h1>
    </header>

    <!-- New task form -->
    <div class="new-task-form">
      <TaskForm />
    </div>

    <!-- efilter -->
    <nav class="filter">
      <button @click="filter = 'all'">All Task</button>
      <button @click="filter = 'favs'">Favorite Task</button>
    </nav>
    <!-- Loading -->
    <div class="loading" v-if="loading">Loading ...</div>

    <!-- Task List -->
    <div class="task-list" v-if="filter === 'all'">
      <p>You have {{ totalCount }} Task</p>
      <div v-for="item in tasks">
        <!-- Sending a props into taskdetails component -->
        <TaskDetails :item></TaskDetails>
      </div>
    </div>
    <div class="task-list" v-if="filter === 'favs'">
      <p>You have {{ favCount }} Fav Task</p>
      <div v-for="item in favs">
        <!-- Sending a props into taskdetails component -->
        <TaskDetails :item></TaskDetails>
      </div>
    </div>
    <!-- This button reset the state . $reset is the function from pinia-->
    <div class="reset">
      <button @click="taskStore.$reset">Reset state</button>
    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue'
import { useTaskStore } from '../stores/TaskStore'
import TaskDetails from '../components/TaskDetails.vue' // must add .vue
import TaskForm from '../components/TaskForm.vue' // must add .vue
import { storeToRefs } from 'pinia'
const taskStore = useTaskStore()
const filter = ref('all')

const { tasks, loading, favs, favCount, totalCount } = storeToRefs(taskStore)
// Grab fetching data from pinia 
taskStore.getTasks()
</script>