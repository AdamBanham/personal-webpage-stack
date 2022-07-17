import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import ContactPage from "@/views/ContactPage.vue"
import NotReady from "@/views/NotReady.vue"
import BlogPage from "@/views/blog/Blog.vue"

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/blog',
    name: 'blog',
    component: BlogPage
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
  history: createWebHistory(),
  routes
})

export default router
