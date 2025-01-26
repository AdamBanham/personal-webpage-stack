import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import ContactPage from "@/views/ContactPage.vue"
import NotReady from "@/views/NotReady.vue"
import BlogPage from "@/views/blog/Blog.vue"
import ArticlePage from "@/views/blog/article/ArticleViewer.vue"
import PublicationPage from "@/views/publications/Publications.vue"
import PMDiscoveryPage from "@/views/process-mining/DiscoveryPage.vue"
import EditorTS from "@/views/editors/EditorTS.vue"
import EditorPN from "@/views/editors/PN/EditorPN.vue"

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
    path: '/process-mining/discovery',
    name: 'pm-discovery',
    component: PMDiscoveryPage
  },
  {
    path: '/process-mining/conformance',
    name: 'pm-conformance',
    component: NotReady
  },
  {
    path: '/process-mining/enhancement',
    name: 'pm-enhancement',
    component: NotReady
  },
  {
    path: '/code',
    name: 'code',
    component: NotReady
  },
  {
    path: '/editor/pn',
    name: 'editor-pn',
    component: EditorPN
  },
  {
    path: '/editor/orm',
    name: 'editor-orm',
    component: NotReady
  },
  {
    path: '/editor/ts',
    name: 'editor-ts',
    component: EditorTS
  },
  {
    path: '/editor/bpmn',
    name: 'editor-bpmn',
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
  scrollBehavior: function(to, from, savedPosition) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
      }
    }
  },
  routes
})

export default router
