const path = require('path') 
const PrerenderSPAPlugin = require('prerender-spa-plugin')

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
          // Required - Routes to render.
          routes: [ '/', '/contact', ],
        })
      ]
     }
  };