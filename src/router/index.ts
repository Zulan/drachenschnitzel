import { createRouter, createWebHistory } from "vue-router";
import CombatView from "../views/CombatView.vue";
import WeaponView from "../views/WeaponView.vue";
import MonsterView from "../views/MonsterView.vue";
import ItemView from "../views/ItemView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/dice",
      name: "🎲 Dice",
      component: CombatView,
    },
    {
      path: "/items",
      name: "🛡️ Items",
      component: ItemView,
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
