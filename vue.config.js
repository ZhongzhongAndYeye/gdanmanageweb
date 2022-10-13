const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  devServer: {
    proxy: {
      '/paijuserver': {
        target: 'http://localhost:1234',
        pathRewrite: { '^/paijuserver': '' }
      }
    }
  },
  transpileDependencies: true,
  lintOnSave: false
})