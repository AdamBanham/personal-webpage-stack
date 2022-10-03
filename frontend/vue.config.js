const PrerenderSPAPlugin = require('prerender-spa-plugin');
const Renderer = PrerenderSPAPlugin.PuppeteerRenderer;


module.exports = {
  devServer: {
    host: "local-ip",
    static: {
      watch: true
    },
    watchFiles: {
      paths: ['src/**/*.vue', 'public/**/*'],
      options: {
        usePolling: true,
      },
    },
  },

  pluginOptions: {
    prerenderSpa: {
      registry: undefined,
      renderRoutes: [
        '/',
        '/contact'
      ],
      useRenderEvent: true,
      headless: true,
      onlyProduction: true,
      customRendererConfig: 
      {
        args: ['--disable-extensions',"--unhandled-rejections=strict", "--auto-open-devtools-for-tabs", '--disable-dev-shm-usage']
      }
    }
  }
};
