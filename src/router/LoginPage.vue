<template>
  <n-card>
    <n-tabs class="card-tabs" default-value="signin" size="large" animated style="margin: 0 -4px"
      pane-style="padding-left: 4px; padding-right: 4px; box-sizing: border-box;">
      <n-tab-pane name="signin" tab="工作人员登录">
        <n-form>
          <n-form-item-row label="窗口">
            <n-select v-model:value="windowSelected" filterable placeholder="请选择窗口" :options="options" />
          </n-form-item-row>
          <n-form-item-row label="密码">
            <n-input placeholder="请输入密码" />
          </n-form-item-row>
        </n-form>
        <n-button @click="login('cook')" type="primary" block secondary strong>
          登录
        </n-button>
        <div class="iconWithText addInfo">
          <n-icon :size="30" color="#fadfb4" :component="ChatWarning20Regular" />
          <n-gradient-text type="warning">
            如果您想要注册窗口，请联系对应的食堂经理
          </n-gradient-text>
        </div>
      </n-tab-pane>
      <n-tab-pane name="signup" tab="经理登录">
        <n-form>
          <n-form-item-row label="用户名">
            <n-input placeholder="请输入用户名" />
          </n-form-item-row>
          <n-form-item-row label="密码">
            <n-input placeholder="请输入密码" />
          </n-form-item-row>
        </n-form>
        <n-button @click="login('manager')" type="primary" block secondary strong>
          登录
        </n-button>
        <div class="iconWithText addInfo">
          <n-icon :size="30" color="#fadfb4" :component="ChatWarning20Regular" />
          <n-gradient-text type="warning">
            如果您是新的经理，请联系开发者（右上角）为您创建账号
          </n-gradient-text>
        </div>
      </n-tab-pane>
    </n-tabs>
  </n-card>
</template>
<script setup>
import { ChatWarning20Regular } from "@vicons/fluent"
import { reactive } from "vue"
import { useStore } from 'vuex'
const store = useStore()
const options = reactive([{
  label: "竹园1号",
  value: "竹园1号"
}, {
  label: "丁香2号",
  value: "丁香2号"
}, {
  label: "海棠15号",
  value: "海棠15号"
}, {
  label: "竹园5号",
  value: "竹园5号"
}])
const windowSelected = ref("")

function login(role) {
  store.commit("login/login", { role: role })
}
</script>

<style scoped>
.card-tabs .n-tabs-nav--bar-type {
  padding-left: 4px;
}

.addInfo {
  margin-top: 10px;
}
</style>