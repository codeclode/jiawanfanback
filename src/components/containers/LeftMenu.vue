<template>
  <n-space class="panel">
    <n-layout has-sider class="leftContainer">
      <n-layout-sider bordered collapse-mode="width" :collapsed-width="64" :width="64" :collapsed="true">
        <n-menu v-model:value="activeKey" :collapsed="true" :collapsed-width="64" :collapsed-icon-size="30"
          :options="menuOptions" />
      </n-layout-sider>
    </n-layout>
    <n-layout class="viewContainer">
      <view-index></view-index>
    </n-layout>
  </n-space>
</template>

<script setup>
import { computed, defineComponent, h, ref, watch } from "vue";
import { NIcon } from "naive-ui";
import {
  BuildingShop24Regular,
  Home28Regular,
  Channel24Regular,
  AlignSpaceEvenlyHorizontal20Regular,
  AppGeneric20Regular,
  Mail28Regular,
  CheckmarkLock16Regular,
  Send24Regular,
  FoodPizza24Regular
} from "@vicons/fluent";
import { RouterLink, useRouter } from "vue-router";
import { useStore } from 'vuex'
const router = useRouter()
const store = useStore()

function renderIcon(icon) {
  return () => h(NIcon, null, { default: () => h(icon) });
}

function renderRouter(router, text) {
  return () => h(RouterLink, router, {
    default: () => text
  })
}

const loginOptions = [{
  label: "首页",
  key: "home",
  icon: renderIcon(Home28Regular)
}, {
  label: "登录",
  key: "login",
  icon: renderIcon(CheckmarkLock16Regular)
}]

const cookOptions = [
  {
    label: "首页",
    key: "home",
    icon: renderIcon(Home28Regular)
  },
  {
    label: "订单",
    key: "orders",
    icon: renderIcon(AppGeneric20Regular),
  },
  {
    label: "商铺信息",
    key: "shopInfo",
    icon: renderIcon(BuildingShop24Regular)
  },
  {
    label: "联系经理",
    key: "manager",
    icon: renderIcon(Mail28Regular)
  }
];

const managerOptions = [
  {
    label: "首页",
    key: "home",
    icon: renderIcon(Home28Regular)
  },
  {
    label: "用户反馈",
    key: "feetback",
    icon: renderIcon(Channel24Regular),
  },
  {
    label: "菜品管理",
    key: "shopManage",
    icon: renderIcon(FoodPizza24Regular)
  },
  {
    label: "骑手管理",
    key: "riderManage",
    icon: renderIcon(Send24Regular)
  },
  {
    label: "增加店铺",
    key: "addShop",
    icon: renderIcon(BuildingShop24Regular)
  },
  {
    label: "统计信息",
    key: "statistics",
    icon: renderIcon(AlignSpaceEvenlyHorizontal20Regular)
  },
];

const activeKey = computed({
  get() {
    return router.currentRoute ? router.currentRoute.value.name : null;
  },
  set(name) {
    try {
      router.push({
        name: name
      })
    } catch (e) {
      router.push(name)
    }
  }
});
const menuOptions = computed(() => {
  return store.state.login.logined ? store.state.login.role === "cook" ? cookOptions : managerOptions : loginOptions
})
</script>

<style scoped>
.viewContainer {
  margin: 10px 0;
  width: calc(95vw - 86px);
  height: 85vh;
  box-shadow: 0px 2px 6px 0px #aaaaff9a;
  border: #aaaaff9a 1px solid;
  border-radius: 12px;
  overflow: hidden;
  padding: 10px;
}

.leftContainer {
  margin: 10px 10px 0px 2.5vw;
  width: 64px;
  height: 85vh;
  box-shadow: 0px 2px 6px 0px #aaaaff9a;
  border: #aaaaff9a 1px solid;
  border-radius: 12px;
  overflow: hidden;
}
</style>