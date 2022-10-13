import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

// 引入小仓库
import login from './login'
import xsskc from './xsskc'

export default new Vuex.Store({
  namespace: true,
  modules: {
    login,
    xsskc
  }
})
