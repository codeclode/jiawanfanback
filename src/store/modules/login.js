const state = () => ({
  logined: false,
  role: "cook"
})

const getters = {
}

const mutations = {
  login: function (state, payload) {
    state.logined = true;
    state.role = payload.role
  },

  logout: function (state) {
    state.logined = false
  }
}
export default {
  namespaced: true,
  getters,
  mutations,
  state,
}