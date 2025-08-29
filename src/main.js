import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index";
import store from "./store/index";
import config from "./config"; // centralized config

// 👇 Import Toastification
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

const app = createApp(App);

// ✅ Inject config globally
app.config.globalProperties.$config = config;

// ✅ Register toast plugin
app.use(Toast, {
  position: "top-right",
  timeout: 3000,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  hideProgressBar: false,
});

app.use(router).use(store).mount("#app");
