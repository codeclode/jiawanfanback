import * as VueRouter from 'vue-router'
import LoginPage from './LoginPage.vue';
import HomePage from './HomePage.vue';
import DeveloperPage from './DeveloperPage.vue';
import NotFoundPage from './NotFoundPage.vue';
import managersInfo from './cook/managersInfo.vue';
import SelfInfoPage from './SelfInfoPage.vue'
import OrderPage from './cook/OrderPage.vue';
import ShopPage from './cook/ShopPage.vue';
import FoodDetail from './cook/FoodDetail.vue';
const routes = [
  { path: '/login', name: "login", component: LoginPage },
  { path: '/home', name: "home", component: HomePage },
  { path: '/developer', name: "developer", component: DeveloperPage },
  { path: '/selfInfo', name: 'selfInfo', component: SelfInfoPage },
  { path: '/managersInfo', name: "manager", component: managersInfo },
  { path: '/orders', name: "orders", component: OrderPage },
  { path: '/shopInfo', name: "shopInfo", component: ShopPage },
  { path: "/foodDetail/:foodID", name: "foodDetail", component: FoodDetail },
  { path: '/', redirect: '/home' },
  { path: '/404', name: "404", component: NotFoundPage },
  { path: '/:catchAll(.*)', redirect: '/404' },
]

export default VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes,
})
