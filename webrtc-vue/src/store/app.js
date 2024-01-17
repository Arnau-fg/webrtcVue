import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
export const useAppStore = defineStore('app', {
  state: () => ({
    name: '',
    users: [],
  }),
  actions: {
    setName(name) {
      this.name = name;
    },
    getName() {
      return this.name;
    },
    setUsers(users) {
      this.users = users;
    },
    getUsers() {
      return this.users;
    },
  },
})
