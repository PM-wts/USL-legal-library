import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index";
import store from "./store/index";
import config from "./config"; // 👈 import centralized config

const app = createApp(App);

// ✅ Inject config globally so all components can use `$config`
app.config.globalProperties.$config = config;

app.use(router).use(store).mount("#app");

// Debug log
console.log("Running in:", config.env);
console.log("API URL:", config.apiUrl);
