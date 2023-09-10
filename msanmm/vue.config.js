const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      "^/media": {
        target: "http://18.139.245.190/",
        changeOrigin: true,
      },
    },
  },
});
