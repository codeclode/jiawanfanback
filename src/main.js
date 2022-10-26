import * as Vue from 'vue'
import './style.css'
import App from './App.vue'
// 通用字体
import 'vfonts/Lato.css'
// 等宽字体
import 'vfonts/FiraCode.css'
import router from './router'
import store from './store'
const app = Vue.createApp({
  render: () => Vue.h(App)
})
//确保 _use_ 路由实例使
//整个应用支持路由。
app.use(router)
app.use(store)

app.mount('#app')

