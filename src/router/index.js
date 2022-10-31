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
import FeetbackPage from './manager/FeetbackPage.vue';
import StatisticsView from './manager/StatisticsView.vue';
import ShopManage from './manager/ShopManage.vue';
import RiderManage from './manager/RiderManage.vue';
import AddShop from './manager/AddShop.vue';
const routes = [
  { path: '/login', name: "login", component: LoginPage },
  { path: '/home', name: "home", component: HomePage },
  { path: '/developer', name: "developer", component: DeveloperPage },
  { path: '/selfInfo', name: 'selfInfo', component: SelfInfoPage },
  //cook
  { path: '/managersInfo', name: "manager", component: managersInfo },
  { path: '/orders', name: "orders", component: OrderPage },
  { path: '/shopInfo', name: "shopInfo", component: ShopPage },
  { path: "/foodDetail/:foodID", name: "foodDetail", component: FoodDetail },
  //manager
  { path: "/feetback", name: "feetback", component: FeetbackPage },
  { path: "/statistics", name: "statistics", component: StatisticsView },
  { path: "/shopManage", name: "shopManage", component: ShopManage },
  { path: "/riderManage", name: "riderManage", component: RiderManage },
  { path: "/addShop", name: "addShop", component: AddShop },

  //重定向
  { path: '/', redirect: '/home' },
  { path: '/404', name: "404", component: NotFoundPage },
  { path: '/:catchAll(.*)', redirect: '/404' },
]

export default VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes,
})
