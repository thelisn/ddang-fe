const { defineConfig } = require('@vue/cli-service')

let apiUrl = process.env.VUE_APP_API_URL || "http://localhost:3000"
console.log("API URL: ", apiUrl)

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      "/api": {
        target: apiUrl
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
