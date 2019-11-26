import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI, { size: "mini", zIndex: 3000 });
Vue.config.productionTip = false;
console.log(process.env);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
