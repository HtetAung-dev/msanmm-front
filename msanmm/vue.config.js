const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      "^/media": {
        target: "http://18.139.245.190:8001/",
        //target: "http://127.0.0.1:8000/",
        changeOrigin: true,
      },
    },
  },
});
