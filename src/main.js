import Vue from "vue";
import App from "./App.vue";
import router from "@/router";
import Chartkick from "vue-chartkick";
import Chart from "chart.js";
import { VueSpinners } from "@saeris/vue-spinners";

import "@/assets/css/tailwind.css";

Vue.config.productionTip = false;
Vue.use(VueSpinners);
Vue.use(Chartkick.use(Chart));

new Vue({
  router: router,
  render: h => h(App)
}).$mount("#app");
