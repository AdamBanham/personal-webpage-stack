const path = require('path') 
const PrerenderSPAPlugin = require('prerender-spa-plugin');
const Renderer = PrerenderSPAPlugin.PuppeteerRenderer;


module.exports = {
    devServer: {
      watchOptions: {
        aggregateTimeout: 300,
        poll: 1000,
      },
    }
};