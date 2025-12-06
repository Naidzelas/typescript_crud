import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import PrimeVue from "primevue/config";
import Aura from "@primeuix/themes/aura";
import StyleClass from "primevue/styleclass";
import ToastService from "primevue/toastservice";

const app = createApp(App);

app.use(PrimeVue, {
  theme: {
    preset: Aura,
  },
});

app.use(ToastService);
app.directive("styleclass", StyleClass);
app.mount("#app");
