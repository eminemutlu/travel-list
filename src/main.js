// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from "vuex";
import App from './App'
import axios from 'axios';
Vue.prototype.$http = axios;
import './assets/tailwind.css'

Vue.use(Vuex);

Vue.config.productionTip = false
import store from "./store/index";

new Vue({
  render: (h) => h(App),
  store,
}).$mount("#app");