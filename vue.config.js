const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      "/api": {
        target: process.env.VUE_APP_API_URL,
      },
    },
  },
  css: {
    loaderOptions: {
      scss: {
        additionalData: `
          @import "@/assets/scss/reset.scss";
          @import "@/assets/scss/base.scss";
        `,
      },
    },
  },
});
