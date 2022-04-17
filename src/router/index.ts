import { createRouter, createWebHistory } from "vue-router";
import CombatView from "../views/CombatView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "combat",
      component: CombatView,
    },
  ],
});

export default router;
