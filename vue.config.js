const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      "/fzyapi": {
        target: "https://fzy.pan233.com/",
        changeOrigin: true, 
        pathRewrite: {
          // "^/fzyapi": ""
        },
        logLevel: "debug"
      }
    }
  }
})
