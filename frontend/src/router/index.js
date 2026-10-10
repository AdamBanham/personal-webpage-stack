import Home from '../views/Home.vue'

// lazy-loaded so heavy pages (diagram-js/bpmn-js editors) stay out of the landing bundle
const ContactPage = () => import("@/views/ContactPage.vue")
const NotReady = () => import("@/views/NotReady.vue")
const BlogPage = () => import("@/views/blog/Blog.vue")
const ArticlePage = () => import("@/views/blog/article/ArticleViewer.vue")
const PublicationPage = () => import("@/views/publications/Publications.vue")
const PMDiscoveryPage = () => import("@/views/process-mining/DiscoveryPage.vue")
const EditorTS = () => import("@/views/editors/EditorTS.vue")
const EditorPN = () => import("@/views/editors/EditorPN.vue")
const EditorORM = () => import("@/views/editors/EditorORM.vue")
const EditorBPMN = () => import("@/views/editors/EditorBPMN.vue")

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
    component: EditorORM
  },
  {
    path: '/editor/ts',
    name: 'editor-ts',
    component: EditorTS
  },
  {
    path: '/editor/bpmn',
    name: 'editor-bpmn',
    component: EditorBPMN
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

export function scrollBehavior(to) {
  if (to.hash) {
    return {
      el: to.hash,
      behavior: 'smooth',
    }
  }
}

// vite-ssg creates the router itself (memory history while prerendering, web history in the browser)
export { routes }
