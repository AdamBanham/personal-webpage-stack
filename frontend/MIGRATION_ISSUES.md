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
- **`npm run type-check` reports 26 errors (left as is).** They're all in the editor internals:
  ORM `model/entities.ts` property overrides, ORM `vscode/handler.ts` uses Node types (`process`, `NodeJS`),
  `renderOptions.ts` imports a missing `../../../ormEditor`, and the PN `importer.ts` redeclares
  `var`s with different types. These were never type-checked before, and they don't affect the build.
- **~1,500 lint warnings (left as is; ~1,000 auto-fixable with `eslint --fix`).** These are style rules (`prefer-const`, `no-var`, unused vars, etc.)
  that were downgraded to warnings. Most will go away as components are converted in Phase 4.

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

- Phase 1: Vue CLI residue removed. Type-only imports in JS (`ShapeLike`, `Connection`) that the old
  JS-as-TS esbuild hack hid were turned into JSDoc typedefs. Fixed the missing `getMid` import in the ORM space tool.
  Deleted the unused, broken `PopupMenuProvider.js` stubs (PN, TS).
- Phase 2: the four editors no longer keep diagram-js/bpmn-js instances in reactive `data()`, and they destroy
  them on unmount. The ORM `HelpProvider` now removes its `window` click listener on `diagram.destroy`.
- Phase 3: static prerendering is back via vite-ssg (it had been broken since the move to Vite). This needed
  `"type": "module"` in `package.json` and `ssr.noExternal: ['vuetify']`. The home-page floaters use `Math.random()`,
  but only in `mounted()`, so there's no hydration mismatch. The build also writes `dist/spa.html` (empty app shell for
  non-prerendered routes) and removes the build-only `dist/.vite/` manifest so it isn't published.
