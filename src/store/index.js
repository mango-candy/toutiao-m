import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from '@/utils/storage'

Vue.use(Vuex)

const TOKEN_KEY = 'TOUTIAO_USER'

export default new Vuex.Store({
  state: {
    // 一个对象，存储当前登录用户信息（token等数据）
    // user: null
    // user: JSON.parse(window.localStorage.getItem(TOKEN_KEY)) // JSON.parse（）将一个 JSON 字符串转换为对象。
    user: getItem(TOKEN_KEY)
  },
  mutations: {
    setUser (state, data) {
      state.user = data

      // 为了防止刷新丢失，我们需要将数据备份到本地存储
      // window.localStorage.setItem(TOKEN_KEY, JSON.stringify(state.user)) // JSON.stringify将数据转换为字符串形式
      setItem(TOKEN_KEY, state.user)
    }
  },
  actions: {
  },
  modules: {
  }
})
