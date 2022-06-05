import { createRouter, createWebHistory } from "vue-router";
import CombatView from "../views/CombatView.vue";
import WeaponVeiw from "../views/WeaponView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "combat",
      component: CombatView,
    },
    {
      path: "/weapons/",
      name: "weapons",
      component: WeaponVeiw,
    },
  ],
});

export default router;
