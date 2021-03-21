const { useCssModule } = require("vue");

module.exports = {
    publicPath: process.env.NODE_ENV === "production"
        ? '/adambanham.io/'
        : '/'
}