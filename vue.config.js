const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      "/api": {
        target: "http://localhost:3000"
      }
    },
    allowedHosts: "all"
  },
  css : {
    loaderOptions : {
      scss : {
        additionalData: `
          @import "@/assets/scss/reset.scss";
          @import "@/assets/scss/base.scss";
        `
      }
    }
  }
})
