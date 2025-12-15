import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import PrimeVue from "primevue/config";
import Aura from "@primeuix/themes/aura";
import StyleClass from "primevue/styleclass";
import { i18n } from "../../../src/i18n";

const app = createApp(App);

app.use(PrimeVue, {
  theme: {
    preset: Aura,
  },
});

app.use(i18n);
app.directive("styleclass", StyleClass);
app.mount("#app");
