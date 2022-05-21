import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import ContactPage from "@/views/ContactPage.vue"
import NotReady from "@/views/NotReady.vue"

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/blog',
    name: 'blog',
    component: NotReady
  },
  {
    path: '/pubs',
    name: 'pubs',
    component: NotReady
  },
  {
    path: '/code',
    name: 'code',
    component: NotReady
  },
  {
    path: '/contact',
    name: 'contact',
    component: ContactPage
  },
  {
    // catch all back to home
    path:"/:pathMatch(.*)",
    name:"fallback-home",
    component: Home
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
