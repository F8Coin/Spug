

import Vue from "vue"
import Vuex from "vuex"
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    user_token: false
  },
  getters: {

  },
  mutations: {
    login_api(state){
      state.user_token = true;
    }
  },
  actions: {

  },
  modules: {

  }
})

export default store