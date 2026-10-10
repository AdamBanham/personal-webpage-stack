import { ViteSSG } from 'vite-ssg'
import App from './App.vue'
import { routes, scrollBehavior } from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import 'roboto-fontface/css/roboto/roboto-fontface.css'

// vite-ssg prerenders the routes listed in vite.config.ts (ssgOptions) at build time,
// and mounts/hydrates the app in the browser.
export const createApp = ViteSSG(
  App,
  { routes, scrollBehavior },
  ({ app }) => {
    app.use(store)
    app.use(vuetify)
  }
)
