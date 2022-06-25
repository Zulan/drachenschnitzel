import { createRouter, createWebHistory } from "vue-router";
import CombatView from "../views/CombatView.vue";
import WeaponView from "../views/WeaponView.vue";
import MonsterView from "../views/MonsterView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "🎲 Dice",
      component: CombatView,
    },
    {
      path: "/weapons",
      name: "🗡 Weapons",
      component: WeaponView,
    },
    {
      path: "/monsters",
      name: "🐉 Monsters",
      component: MonsterView,
    },
  ],
});

export default router;
