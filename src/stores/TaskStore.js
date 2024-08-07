// Pinia Stores here. 
// Pinia is using for state management. UNtuk mengatur state agar tidak ditulis di main pages.
// Seperti proses menghapus data, masukin keranjang, favorite, etc.
import { defineStore } from "pinia";

export const useTaskStore = defineStore('taskStore', {
    state: () => ({
        tasks: [],
        loading: false
        // name: 'Yoshi' // we can use multiple properties in pinia
    }),
    getters: {
        favs() {
            // filter is returning new array. => means 'Return'.
            // Showing a isFave which the value is True
            return this.tasks.filter(t => t.isFav)
        },
        favCount() {
            return this.tasks.reduce((prev, curr) => {
                return curr.isFav ? prev + 1 : prev // kalo favorite, + 1
            }, 0)
        },
        totalCount: (state) => {
            return state.tasks.length
        }
    },
    actions: {
        async getTasks() {
            this.loading = true
            const response = await fetch('http://localhost:3000/tasks')
            const data = await response.json()
            this.loading = false

            this.tasks = data
        },
        async addTask(newTask) {
            this.tasks.push(newTask)
            const response = await fetch('http://localhost:3000/tasks', {
                method: 'POST',
                // sending data use this below
                body: JSON.stringify(newTask),
                headers: { 'Content-Type': 'application/json' }
            })
            if (response.error) {
                console.log(response.error)
            }
        },
        async deleteTask(id) {
            this.tasks = this.tasks.filter(t => t.id !== id)
            const response = await fetch('http://localhost:3000/tasks/' + id, {
                method: 'DELETE',
            })
            if (response.error) {
                console.log(response.error)
            }
        },
        async toogleFav(id) {
            const task = this.tasks.find(t => t.id === id)
            task.isFav = !task.isFav

            const response = await fetch('http://localhost:3000/tasks/' + id, {
                method: 'PATCH',
                body: JSON.stringify({ isFav: task.isFav }),
                headers: { 'Content-Type': 'application/json' }

            })
            if (response.error) {
                console.log(response.error)
            }
        }
    }
})
// getter can manipulating data before return the value