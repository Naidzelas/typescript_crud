import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import PrimeVue from "primevue/config";
import Aura from "@primeuix/themes/aura";
import StyleClass from "primevue/styleclass";
import {i18n} from "./i18n";
import router from "./router";

const app = createApp(App);

app.use(PrimeVue, {
  theme: {
    preset: Aura,
  },
});

app.use(i18n);
app.use(router);
app.directive("styleclass", StyleClass);
app.mount("#app");
