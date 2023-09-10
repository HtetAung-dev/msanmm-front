import { createApp } from "vue";
import App from "./App.vue";
import router from "./Routes/index";
import axios from "axios";
import "@/main.css";
import store from "./store";
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

const vuetify = createVuetify({
  components,
  directives,
});

axios.defaults.baseURL = "http://18.139.245.190/";
createApp(App).use(router).use(store).use(vuetify).mount("#app");
