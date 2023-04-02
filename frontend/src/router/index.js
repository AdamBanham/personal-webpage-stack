import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import ContactPage from "@/views/ContactPage.vue"
import NotReady from "@/views/NotReady.vue"
import BlogPage from "@/views/blog/Blog.vue"
import ArticlePage from "@/views/blog/article/ArticleViewer.vue"
import PublicationPage from "@/views/publications/Publications.vue"

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
    path: "/blog/:articleId",
    name: 'blog-article',
    component : ArticlePage,
    props: true
  },
  {
    path: '/pubs',
    name: 'pubs',
    component: PublicationPage
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
