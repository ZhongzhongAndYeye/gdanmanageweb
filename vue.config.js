const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  devServer: {
    // publicPath:"./", // 部署上线nginx所需添加的配置
    proxy: {
      '/paijuserver': {
        target: 'http://172.20.12.188:1234',
        pathRewrite: { '^/paijuserver': '' }
      }
    }
  },
  transpileDependencies: true,
  lintOnSave: false
})