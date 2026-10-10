// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

// Builds tree-shake Vuetify: vite-plugin-vuetify auto-imports only the components each template uses.
// In dev, auto-import is off (see vite.config.ts) and everything is registered globally, so Vite
// pre-bundles Vuetify once instead of re-optimizing and reloading on every newly visited route.
// import.meta.env.DEV is statically false in builds, so these imports are dropped there.
export default createVuetify({
  ssr: true,
  ...(import.meta.env.DEV ? { components, directives } : {}),
  theme: {
    defaultTheme: 'dark'
  }
})
