const PrerenderSPAPlugin = require('prerender-spa-plugin');
const Renderer = PrerenderSPAPlugin.PuppeteerRenderer;


module.exports = {
  devServer: {
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000,
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
        args: ["--auto-open-devtools-for-tabs", '--disable-dev-shm-usage']
      }
    }
  }
};
