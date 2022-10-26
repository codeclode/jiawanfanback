<template>
  <div class="headerContainer">
    <n-grid x-gap="12" :cols="24" class="grid">
      <n-gi :span="4" class="itemContainer">
        <n-avatar round :size="50" src="/logo.png" />
        <n-gradient-text type="primary" size="28" style="font-weight: bolder;">
          嘉晚饭
        </n-gradient-text>
      </n-gi>
      <n-gi :span="4" class="itemContainer">
        <n-gradient-text type="info" size="28" style="font-weight: bolder;">
          <span v-if="logined">职责：{{ role }}</span>
          <span v-else>尚未登陆</span>
        </n-gradient-text>
      </n-gi>
      <n-gi :span="8" class="itemContainer">
        <n-gradient-text type="info" size="28">
          {{ time }}
        </n-gradient-text>
      </n-gi>
      <n-gi :span="4" class="itemContainer">
        <n-avatar round :size="50" src="/logo.png" />
        <n-gradient-text type="info" size="28">
          李傲松
        </n-gradient-text>
      </n-gi>
      <n-gi :span="4" class="itemContainer">
        <n-popover trigger="hover">
          <template #trigger>
            <n-icon-wrapper @click="selfInfo" :size="40" :border-radius="20" class="icon">
              <n-icon :size="30" :component="PersonInfo16Regular" />
            </n-icon-wrapper>
          </template>
          <span>个人信息</span>
        </n-popover>
        <n-popover trigger="hover">
          <template #trigger>
            <n-icon-wrapper @click="developer" :size="40" :border-radius="20" class="icon">
              <n-icon :size="30" :component="AlertUrgent16Regular" />
            </n-icon-wrapper>
          </template>
          <span>联系开发者</span>
        </n-popover>
        <n-popover trigger="hover">
          <template #trigger>
            <n-icon-wrapper @click="logInOut" :size="40" :border-radius="20" class="icon">
              <n-icon :size="30" :component="logined ? IosLogOut : IosLogIn" />
            </n-icon-wrapper>
          </template>
          <span>{{ logined ? '登出' : "登入" }}</span>
        </n-popover>
      </n-gi>
    </n-grid>
  </div>
</template>

<script setup>
import { computed, defineComponent, ref } from "@vue/runtime-core";
import { IosLogOut, IosLogIn } from '@vicons/ionicons4'
import { AlertUrgent16Regular, PersonInfo16Regular } from '@vicons/fluent';
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
const store = useStore()
const router = useRouter()
const time = ref("")
const logined = computed(() => store.state.login.logined)
const role = computed(() => store.state.login.role === "cook" ? "员工" : "经理")
setInterval(() => {
  let t = new Date();
  time.value = `${t.getFullYear()}-${t.getMonth() + 1}-${t.getDate()}
  ${t.getHours()}:${t.getMinutes()}:${t.getSeconds()}`
}, 1000);
function selfInfo() {
  router.push({ name: 'selfInfo' })
}

function logInOut() {
  if (logined.value) {
    store.commit("login/logout")
  } else {
    router.push({ name: 'login' })
  }
}
function developer() {
  router.push({ name: 'developer' })
}
</script>

<style scoped>
.headerContainer {
  margin: 10px auto 0;
  width: 95vw;
  box-shadow: 0px 2px 6px 0px #aaaaff9a;
  border: #aaaaff9a 1px solid;
  height: 60px;
  border-radius: 12px;
  overflow: hidden;
}

.grid {
  height: 100%;
}

.itemContainer {
  display: flex;
  justify-content: center;
  align-items: center;
}

.icon {
  margin: 0% 2%;
  cursor: pointer;
}
</style>