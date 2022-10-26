<template>
  <n-card v-if="logined" style="width: 60%;margin: 0 auto;">
    <template #header>
      <div class="container">
        <picture-upload :disabled="!changing" :max="1" :isAvatar="true"></picture-upload>
      </div>
    </template>
    <template #default>
      <n-form ref="formRef" :disabled="!changing" :model="info" :rules="rules">
        <n-form-item label="用户名" path="name">
          <n-input :disabled="true" v-model:value="info.name" />
        </n-form-item>
        <n-form-item label="职责" path="role">
          <n-input :disabled="true" v-model:value="info.role" />
        </n-form-item>
        <n-form-item label="常驻地点" path="workplace">
          <n-input v-model:value="info.workplace" placeholder="请输入常驻地点" />
        </n-form-item>
        <n-form-item label="电话" path="phoneNumber">
          <n-input v-model:value="info.phoneNumber" placeholder="输入电话" />
        </n-form-item>
      </n-form>
    </template>
    <template #action class="container">
      <n-button block v-if="!changing" @click="() => changing = true" strong type="primary">
        <template #icon>
          <n-icon>
            <ArrowAutofitUp20Filled />
          </n-icon>
        </template>
        修改信息
      </n-button>
      <n-button block v-else @click="() => changing = false" strong type="primary">
        <template #icon>
          <n-icon>
            <ExtendedDock24Regular />
          </n-icon>
        </template>
        提交修改
      </n-button>
    </template>
  </n-card>
  <n-result v-else status="403" title="禁止访问" description="总有些门是对你关闭的">
    <template #footer>
      <n-button @click="login">登陆了吗你</n-button>
    </template>
  </n-result>
</template>

<script>
import { computed, defineComponent, ref } from "vue";
import { useMessage } from "naive-ui";
import { ArrowAutofitUp20Filled, ExtendedDock24Regular } from '@vicons/fluent';
import PictureUpload from "../components/utils/PictureUpload.vue";
import { useStore } from 'vuex'
import { useRouter } from 'vue-router';

export default defineComponent({
  components: {
    ArrowAutofitUp20Filled, ExtendedDock24Regular,
    PictureUpload
  },
  setup() {
    const store = useStore()
    const router = useRouter()
    const logined = computed(() => store.state.login.logined)
    const changing = ref(false);
    const formRef = ref(null);
    const message = useMessage();
    const info = ref({
      name: "李傲松",
      workplace: "",
      phoneNumber: "",
      role: "manager"
    });
    const rules = {
      workplace: {
        required: true,
        validator(rule, value) {
          if (!value) {
            return new Error("请填写常驻地点");
          } else if (value.length > 30) {
            return new Error("超过最大长度");
          }
          return true;
        },
        trigger: ['blur', 'input']
      },
      phoneNumber: {
        required: true,
        validator(rule, value) {
          if (!value) {
            return new Error("请填写电话号码");
          } else if (!/^[1][3,4,5,6,7,8,9][0-9]{9}$/.test(value)) {
            return new Error("请输入正确的手机号");
          }
          return true;
        },
        trigger: ['blur', 'input']
      },
    };

    return {
      info, rules, changing, logined,
      handleValidateClick(e) {
        e.preventDefault();
        formRef.value?.validate((errors) => {
          if (!errors) {
            message.success("Valid");
          } else {
            console.log(errors);
            message.error("Invalid");
          }
        });
      },
      login() {
        router.push({
          name: "login"
        })
      }
    }
  }
})
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>