const { useCssModule } = require("vue");

module.exports = {
    publicPath: process.env.NODE_ENV === "production"
        ? '/' // cloudfront appends s3 origin so we don't need to change publicPath
        : '/'
}