import { createApp } from "vue";
import "./style.css";
import "primeicons/primeicons.css";
import { router } from "./router/route";
import App from "./App.vue";
import Toast from "vue-toast-notification";
import "vue-toast-notification/dist/theme-bootstrap.css";

const app = createApp(App);

app.use(Toast);

app.use(router);

app.mount("#app");
