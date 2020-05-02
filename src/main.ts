import Vue from "vue";
import axios from "axios";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import UserModule from "./UserModule";

Vue.config.productionTip = false;
axios.defaults.baseURL = "http://localhost:3000";
if (UserModule.logged) {
  axios.defaults.headers = { Authorization: `Bearer ${UserModule.token}` };
}

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount("#app");
