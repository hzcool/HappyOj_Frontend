import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-fromurlencodeed'
Vue.use(Vuex)
const moduleUser= { 
  state : {
    username : "",
    isLogin : false,
  },
  mutations :{
    Login(state,username) {
      state.username = username
      state.isLogin = true
    },
    Logout(state) {
      state.isLogin = false
    },
  },
}
export default new Vuex.Store({
  modules: {
    usr : moduleUser,
  }
})
