<script setup lang="ts">
import { RouterLink, RouterView, useRouter } from "vue-router";
import { computed } from "vue";

const router = useRouter();
const routes = computed(() => {
  const r = router.getRoutes();
  console.log(r);
  return r;
});
</script>

<template>
  <header>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container">
        <a class="navbar-brand" href="#">🐉 Drachenschnitzel</a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item" v-for="route in routes" :key="route.path">
              <router-link
                :to="route.path"
                active-class="active"
                class="nav-link"
                aria-current="page"
                >{{ route.name }}</router-link
              >
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
  <div class="container">
    <RouterView />
  </div>
</template>

<style>
@import "@/assets/base.css";
</style>
