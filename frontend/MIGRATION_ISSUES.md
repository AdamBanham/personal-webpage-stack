# Vue 3 migration – possible problems

Running list of issues found while finishing the Vue 3 migration on `chore/vue3-finish`.
Items marked **(left as is)** were deliberately not changed. Delete this file once the list is resolved.

## Open – needs a decision

- **Duplicate `removeElements` in the ORM modeler (left as is).**
  `src/views/editors/ORM/editor/modules/modeling/modeler.js`: the second definition overrides the first,
  so the first one's `clearConnection()` handling for role connections never runs. Marked `TODO(vue3-migration)`.
- **Unreachable `'value'` branch in the ORM vscode handler (left as is).**
  `src/views/editors/ORM/editor/modules/vscode/handler.ts`: `'value'` is already handled by the first
  `if`, so the later `else if` is dead. Marked `TODO(vue3-migration)`.
- **`npm run type-check` reports 26 errors (left as is).** They're all in the editor modules
  (`src/views/editors/{ORM,PN}/…`): ORM `model/entities.ts` property overrides, ORM `vscode/handler.ts` uses Node types
  (`process`, `NodeJS`), `renderOptions.ts` imports a missing `../../../ormEditor`, and the PN `importer.ts` redeclares
  `var`s with different types. These were never type-checked before, and they don't affect the build.
  `tsconfig` `strict` stays off until these are fixed.
- **~1,350 lint warnings (left as is).** They're all style rules (`prefer-const`, `no-var`, unused vars, etc.) in the
  diagram-js editor modules under `src/views/editors/{ORM,PN,TS,BPMN}/`. Every `.vue` file is warning-free.
  About two-thirds can be fixed with `npx eslint src --fix`. Do that as a separate commit and re-test the editors.

## Open – pre-existing bugs found during the migration

- **Transition-system states set has a trailing comma (left as is).** `EditorTS.vue#statesML` never sets `added`,
  so `Q` renders as `\{ \text{a}, \text{b},  \}`. The other sets don't do this. Fixing it means setting `added = true`
  in the loop.
- **Blog filters persist but checkboxes reset (left as is, pre-existing).** `src/views/blog/contentManager.js` keeps
  filter state in a module-level `manager`. If you leave `/blog` with filters ticked and come back, the list is still
  filtered but every checkbox shows unticked. Fix by clearing the filters on mount, or by deriving the checkbox state
  from the manager.
- **Process-discovery cards without a year get a random one (left as is, pre-existing).**
  `discovery-data/discoveryData.js` calls `getRandomYear()` for `year == null`, so their timeline position changes on
  every load. This would matter if that page were ever prerendered.
- **CSS typo `trasnform` (left as is).** `src/styles/content.sass:15` has `trasnform: translateX(5%) scale(0) rotateZ(-60deg)`,
  so that keyframe's transform never applies. Fixing it will change how the animation looks.

## Open – deployment (SSG, Phase 3)

- **CloudFront changes needed before prerendering takes effect (manual, AWS).** Distribution `E39RMER8LDSMTX` uses the
  S3 REST origin, which doesn't resolve `<route>/index.html`. Until it's configured, the site works exactly as before,
  but there's one visible side effect: deep links such as `/editor/orm` get the 403/404 → `/index.html` fallback,
  which is now the prerendered home page, so its markup flashes until the app mounts. The fix is to attach
  `infra/cloudfront/index-rewrite.js` and point the error pages at `/spa.html`; steps are in `infra/cloudfront/README.md`.
  **Do this together with the first release from this branch.**
- **vite-ssg ignores `--outDir` on the CLI.** Use `build.outDir` in `vite.config.ts` if the output folder ever needs to change.
- **vite-ssg pinned to 0.24.x.** That's the last line supporting Vite 6. Newer releases need Vite 7 and a newer Node.

## Open – environment / dependencies

- **Node 18 dev container.** Node 18 is end-of-life. Some current deps already declare Node 20+,
  including `didi` (used by diagram-js), `eslint-visitor-keys` and `brace-expansion`. Everything works today,
  but bump the container image when convenient.
- **Lockfile regenerated in Phase 1.** Vuetify moved 3.7.7 → 3.13.6 (within `^3`) and vue to 3.5.x latest.
  Watch for small visual differences in Vuetify components.
- **highlight.js ships every language (~980 kB chunk).** It's pulled in by `@wdns/vue-code-block` with `highlightjs`.
  It's only loaded on blog articles and the discovery page, not on landing. It could be trimmed by registering only
  the languages used, or by using the Prism mode.
- **BPMN import leaves an `<input type="file">` in `<body>`.** `EditorBPMN.vue#handleImport`
  appends a file input every time and never removes it. This is a minor DOM leak.

## Resolved

- Dev server performance: `vite-plugin-vuetify`'s `autoImport` is **build-only** on purpose. In dev, its per-component
  imports (`vuetify/components/VBtn`, ...) can't be seen by Vite's dependency scanner. Every newly visited route
  re-ran pre-bundling and forced a full page reload. Dev now registers all of Vuetify globally
  (`src/plugins/vuetify.ts`, guarded by `import.meta.env.DEV`, so it's dropped from builds), and `optimizeDeps.entries`
  crawls all of `src/` at startup. Don't turn `autoImport` back on for dev. The workspace sits on a Windows drive
  mounted over 9p, so the dev container keeps `node_modules` on a named volume. For the fastest setup, clone the repo
  into the WSL filesystem or use "Dev Containers: Clone Repository in Container Volume".

- Phase 1: Vue CLI residue removed. Type-only imports in JS (`ShapeLike`, `Connection`) that the old
  JS-as-TS esbuild hack hid were turned into JSDoc typedefs. Fixed the missing `getMid` import in the ORM space tool.
  Deleted the unused, broken `PopupMenuProvider.js` stubs (PN, TS).
- Phase 2: the four editors no longer keep diagram-js/bpmn-js instances in reactive `data()`, and they destroy
  them on unmount. The ORM `HelpProvider` now removes its `window` click listener on `diagram.destroy`.
- Phase 3: static prerendering is back via vite-ssg (it had been broken since the move to Vite). This needed
  `"type": "module"` in `package.json` and `ssr.noExternal: ['vuetify']`. The home-page floaters use `Math.random()`,
  but only in `mounted()`, so there's no hydration mismatch. The build also writes `dist/spa.html` (empty app shell for
  non-prerendered routes) and removes the build-only `dist/.vite/` manifest so it isn't published.
- Phase 4a: removed the unused Vuex store; `main`, `router` and `plugins` are now TypeScript. All non-editor components use
  `<script setup lang="ts">`. The duplicated clipboard/share-link code is in `src/composables/useShareLink.ts`.
  Fixed `v-for:=` typos (no `:key`) in the blog filter bar. Removed unused code: `moveTo` in home,
  `moveToBlogs` in ArticleViewer, `lineOffset` in DiscoveryPage. `type-check` is clean outside `views/editors/`.
- Phase 4b: the four editor views use `<script setup lang="ts">`, with the editor instance in a plain non-reactive
  variable. The duplicated MathJax typesetting is in `src/composables/useMathJax.ts`, driven by a post-flush `watch`
  on the LaTeX strings instead of side effects inside computeds. A failed typeset (e.g. MathJax still loading)
  no longer silently stops all later typesets. Removed unused code: `diagramXML`, `getConnectionMid`, PN `findLabel`.
  Removed the `*.vue` type shim (every component is now typed).
