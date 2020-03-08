import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import req from './common/common.js'

import VueCodemirror from 'vue-codemirror'
import 'codemirror/lib/codemirror.css'
import VueClipboard from 'vue-clipboard2'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import VueHighlightJS from 'vue-highlightjs'
import  './iview'
import echarts from "./echarts";
Vue.use(VueHighlightJS)
Vue.use(mavonEditor)
Vue.use(VueClipboard)
Vue.use(VueCodemirror)
Vue.prototype.$echarts = echarts

Vue.use(VueAxios, axios)
Vue.use(req)
Vue.config.productionTip = false
axios.defaults.baseURL = "/api"
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
