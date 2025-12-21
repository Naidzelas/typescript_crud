import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";
import Canias from "./../microfrontends/canias/src/App.vue";

const routes: RouteRecordRaw[] = [
  { path: "/canias", name: "Canias", component: Canias, children: [] },
  // Add more routes here
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;