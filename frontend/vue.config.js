const path = require('path') 
const PrerenderSPAPlugin = require('prerender-spa-plugin')
const Renderer = PrerenderSPAPlugin.PuppeteerRenderer

module.exports = {
    devServer: {
      watchOptions: {
        aggregateTimeout: 300,
        poll: 1000,
      },
    },
    configureWebpack: {
      plugins: [
        new PrerenderSPAPlugin({
          staticDir: path.join(__dirname, 'dist'),
          routes: [ '/', '/contact' ],
    
          renderer: new Renderer({
            inject: {
              foo: 'bar'
            },
            headless: true,
            renderAfterDocumentEvent: 'render-event'
          })
        })
      ]
    }
    // configureWebpack: {
    //   plugins: [
    //     new PrerenderSPAPlugin({
    //       staticDir: path.join(__dirname, 'dist'),
    //       // Required - Routes to render.
    //       routes: [ '/', '/contact', ],
    //     })
    //   ]
    //  }
  };