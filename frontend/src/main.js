import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import 'roboto-fontface/css/roboto/roboto-fontface.css'

createApp(App)
  .use(router)
  .use(store)
  .use(vuetify)
  .mount('#app')
