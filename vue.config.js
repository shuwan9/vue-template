/**
 *  reference https://cli.vuejs.org/zh/config/#vue-config-js
 */

module.exports = {
  publicPath: '.',
  configureWebpack: {
    // resolve: {
    //   alias: {
    //     quasar: 'quasar-framework/dist/quasar.mat.esm'
    //   }
    // },
    externals: {
      vue: 'Vue',
      quasar: 'Quasar'
    }
  }
}
