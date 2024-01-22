import { createRouter, createWebHistory } from 'vue-router'
import Landing from '../components/Landing.vue'
import Lobby from '../components/Lobby.vue'
import Chat from '../components/Chat.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'landing',
      component: Landing
    },
    {
      path: '/lobby',
      name: 'Lobby',
      component: Lobby
    },
    {
      path: '/chat',
      name: 'Chat',
      component: Chat
    }
  ]
})

export default router
