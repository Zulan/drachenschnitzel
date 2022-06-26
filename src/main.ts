import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import "bootstrap";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";

const app = createApp(App);

app.use(createPinia());
app.use(router);

library.add(fas);
app.component("font-awesome-icon", FontAwesomeIcon);

app.mount("#app");
