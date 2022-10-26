import { createStore, createLogger } from 'vuex'

const debug = process.env.NODE_ENV !== 'production'
import login from './modules/login'
export default createStore({
  modules: {
    login
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})