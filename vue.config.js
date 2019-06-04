/**
 *   https://cli.vuejs.org/zh/config/#vue-config-js
 */

const path = require("path")
const resolve = src => {
  return path.join(__dirname, src)
}

module.exports = {
  publicPath: ".",
  configureWebpack: {
    resolve: {
      alias: {
        "@": resolve("src")
      }
    },
    externals: {
      vue: "Vue",
      "vue-router": "VueRouter",
      vuex: "Vuex",
      axios: "axios",
      "element-ui": "ELEMENT"
    }
  }
}
