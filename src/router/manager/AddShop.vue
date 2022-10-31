<template>
  <div>
    <n-page-header subtitle="新~~~" title="注册新店铺">
    </n-page-header>
    <n-card>
      <n-form ref="formRef" :model="model" :rules="rules">
        <n-form-item path="name" label="名称">
          <n-input :allow-input="noSideSpace" v-model:value="model.name" placeholder="请输入店铺名" />
        </n-form-item>
        <n-form-item path="password" label="密码">
          <n-input :allow-input="noSideSpace" v-model:value="model.password" type="password"
            @input="handlePasswordInput" placeholder="请输入密码" />
        </n-form-item>
        <n-form-item ref="rPasswordFormItemRef" first path="reenteredPassword" label="重复密码">
          <n-input :allow-input="noSideSpace" v-model:value="model.reenteredPassword" :disabled="!model.password"
            type="password" placeholder="请重复密码" />
        </n-form-item>
        <n-form-item path="phoneNumber" label="电话">
          <n-input :allow-input="noSideSpace" v-model:value="model.phoneNumber" placeholder="请输入电话" />
        </n-form-item>
        <n-form-item path="address" label="联系地址">
          <n-input :allow-input="noSideSpace" v-model:value="model.address" placeholder="请输入常驻地点" />
        </n-form-item>
        <n-row :gutter="[0, 24]">
          <n-col :span="24">
            <div style="display: flex; justify-content: flex-end">
              <n-button :loading="loading" round type="primary" @click="handleValidateButtonClick">
                注册
              </n-button>
            </div>
          </n-col>
        </n-row>
      </n-form>
    </n-card>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import {
  useMessage
} from "naive-ui";
import { postData } from "../../utils/postData";
import { useRouter } from 'vue-router';


export default defineComponent({
  setup() {
    const router = useRouter()
    const loading = ref(false)
    const formRef = ref(null);
    const rPasswordFormItemRef = ref(null);
    const message = useMessage();
    const modelRef = ref({
      name: null,
      password: null,
      reenteredPassword: null,
      phoneNumber: "",
      address: ""
    });
    function validatePasswordStartWith(rule, value) {
      return !!modelRef.value.password && modelRef.value.password.startsWith(value) && modelRef.value.password.length >= value.length;
    }
    function validatePasswordSame(rule, value) {
      return value === modelRef.value.password;
    }
    const rules = {
      name: [
        {
          required: true,
          validator(rule, value) {
            if (!value) {
              return new Error("需要名称");
            }
            return true;
          },
          trigger: ["input", "blur"]
        }
      ],
      password: [
        {
          required: true,
          validator(rule, value) {
            if (value.length === 0) {
              return new Error("密码未填写");
            } else if (value.length < 6 || value.length > 15) {
              return new Error("密码长度再6~15之间");
            }
            return true;
          },
          trigger: ['blur', 'input']
        }
      ],
      reenteredPassword: [
        {
          required: true,
          message: "请再次输入密码",
          trigger: ["input", "blur"]
        },
        {
          validator: validatePasswordStartWith,
          message: "两次密码输入不一致",
          trigger: "input"
        },
        {
          validator: validatePasswordSame,
          message: "两次密码输入不一致",
          trigger: ["blur", "password-input"]
        }
      ],
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
      address: {
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
    };
    return {
      formRef, loading,
      rPasswordFormItemRef,
      model: modelRef,
      rules,
      handlePasswordInput() {
        if (modelRef.value.reenteredPassword) {
          rPasswordFormItemRef.value?.validate({ trigger: "password-input" });
        }
      },
      handleValidateButtonClick(e) {
        e.preventDefault();
        formRef.value?.validate((errors) => {
          if (!errors) {
            loading.value = true;
            postData("user/register", {
              userName: modelRef.value.name,
              password: modelRef.value.password,
              phonenumber: modelRef.value.phoneNumber,
              role: 2,
              address: modelRef.value.address,
            }).then((res) => {
              if (res.data == true) {
                message.success("注册成功");
                router.replace({
                  name: "home"
                })
              } else {
                message.error("信息有误，请查看用户名是否重复");
              }
            }).catch(() => {
              message.error("网络错误");
            }).finally(() => {
              loading.value = false;
            })
          } else {
            message.error("信息待调整");
          }
        });
      },
      noSideSpace: (value) => {
        return !value.startsWith(' ') && !value.endsWith(' ')
      },
    };
  }
});
</script>