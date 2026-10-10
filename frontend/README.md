# frontend

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run dev
```

### Compiles and minifies for production
```
npm run build
```
Uses [vite-ssg](https://github.com/antfu-collective/vite-ssg) to prerender the static pages listed in
`ssgOptions.includedRoutes` (`vite.config.ts`) to `dist/<route>/index.html`; every other route is a
client-rendered SPA page served from `dist/index.html`.

### Previews the production build
```
npm run preview
```

### Lints files
```
npm run lint
```

### Type-checks files
```
npm run type-check
```

### Customize configuration
See the [Vite configuration reference](https://vite.dev/config/).
