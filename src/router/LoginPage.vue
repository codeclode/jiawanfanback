<template>
  <n-card>
    <n-tabs class="card-tabs" default-value="signin" size="large" animated style="margin: 0 -4px"
      pane-style="padding-left: 4px; padding-right: 4px; box-sizing: border-box;">
      <n-tab-pane name="signin" tab="工作人员登录">
        <n-form ref="formRef1" :label-width="80" :model="cookInfo" :rules="rules">
          <n-form-item-row label="窗口" path="username">
            <n-select v-model:value="cookInfo.username" filterable placeholder="请选择窗口" :options="options" />
          </n-form-item-row>
          <n-form-item-row label="密码" path="password">
            <n-input placeholder="请输入密码" v-model:value="cookInfo.password" />
          </n-form-item-row>
        </n-form>
        <n-button :loading="loading" @click="login('cook')" type="primary" block secondary strong>
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
        <n-form ref="formRef2" :label-width="80" :model="managerInfo" :rules="rules">
          <n-form-item-row label="用户名" path="username">
            <n-input placeholder="请输入用户名" v-model:value="managerInfo.username" />
          </n-form-item-row>
          <n-form-item-row label="密码" path="password">
            <n-input placeholder="请输入密码" v-model:value="managerInfo.password" />
          </n-form-item-row>
        </n-form>
        <n-button :loading="loading" @click="login('manager')" type="primary" block secondary strong>
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
import { onMounted, onUnmounted, reactive, ref } from "vue"
import { useStore } from 'vuex'
import { getData } from "../utils/getData"
import { useMessage } from 'naive-ui';
import { postData } from "../utils/postData";
const cookInfo = reactive({
  username: "",
  password: ""
})

const managerInfo = reactive({
  username: "",
  password: ""
})

const formRef1 = ref(null);
const formRef2 = ref(null);
const rules = {
  username: {
    required: true,
    message: '请输入用户名',
    trigger: ['input']
  },
  password: {
    required: true,
    validator(rule, value) {
      if (value.length === 0) {
        return new Error("密码未填写");
      } else if (value.length < 6 || value.length > 15) {
        return new Error("密码长度再6~15之间");
      }
      return true;
    },
    trigger: ['input']
  }
}
const msg = useMessage()
const store = useStore()
const loading = ref(false)
const options = ref([])
const windowSelected = ref("")
onMounted(() => {
  getData("user/getUserInfo", {
    role: 2
  }).then((res) => {
    options.value.push(...res.data.map((v) => {
      return {
        label: v.userName,
        value: v.userName,
      }
    }))
  }).catch(e => {
    msg.error("网络错误")
  })
})

onUnmounted(() => {
  options.value.splice(0, options.value.length);
})
function login(role) {
  let r = role === 'cook' ? formRef1 : formRef2;
  let rn = role === 'cook' ? 2 : 3;
  let u = role === 'cook' ? cookInfo : managerInfo;
  console.log(r);
  r.value?.validate((errors) => {
    loading.value = true;
    if (!errors) {
      postData("user/login", {
        userName: u.username,
        password: u.password,
        role: rn
      }).then((res) => {
        if (res.data) {
          msg.success("验证成功");
          store.commit("login/login", {
            role: role,
            username: u.username
          })
        } else {
          msg.error("网络或信息错误")
        }
      }).catch(() => {
        msg.error("网络错误")
      }).finally(() => {
        loading.value = false;
      })
    } else {
      loading.value = false;
      msg.error("验证失败");
    }
  });
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