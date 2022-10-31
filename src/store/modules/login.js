const state = () => ({
  logined: false,
  role: "",
  username: "",
})

const getters = {
}

const mutations = {
  login: function (state, payload) {
    state.logined = true;
    state.role = payload.role;
    state.username = payload.username;
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