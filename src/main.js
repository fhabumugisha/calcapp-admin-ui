import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import VueCurrencyFilter from "vue-currency-filter";

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
  render: h => h(App)
}).$mount("#app");
