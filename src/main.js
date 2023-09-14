import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import * as echarts from "echarts";
// import './mock.js'
import jquery from 'jquery'
import axios from 'axios'
import "@/assets/style/common.less"
Vue.prototype.$echarts = echarts
Vue.prototype.$axios = axios
Vue.prototype.$ = jquery

Vue.config.productionTip = false;
Vue.use(ElementUi);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
