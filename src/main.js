import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import VueCurrencyFilter from "vue-currency-filter";
import store from "@/store";

import ApiService from "@/services/api.service";

// Set the base URL of the API
ApiService.init(process.env.VUE_APP_API);

// If token exists set header
/* if (TokenService.getToken()) {
  ApiService.setHeader()
} */

Vue.config.productionTip = false;
Vue.use(require("vue-moment"));

Vue.use(VueCurrencyFilter, {
  symbol: "€",
  thousandsSeparator: ".",
  fractionCount: 2,
  fractionSeparator: ",",
  symbolPosition: "after",
  symbolSpacing: true
});

new Vue({
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount("#app");
