<template>
  <n-card style="width: 60%;margin: 0 auto;">
    <template #header>
      <n-tag :type="foodInfo.status === '已上架' ? 'success' : foodInfo.status === '审核中' ? 'warning' : 'error'">{{
          foodInfo.status
      }}</n-tag>
      <div>PS:审核成功后请记得上架商品哦~~</div>
    </template>
    <n-form ref="formRef" :label-width="80" :model="foodInfo" :rules="rules">
      <n-form-item label="名称" path="name">
        <n-input maxlength="10" show-count clearable :allow-input="noSideSpace" v-model:value="foodInfo.name"
          placeholder="输入姓名" />
      </n-form-item>
      <n-form-item label="简介" path="describe">
        <n-input type="textarea" maxlength="80" show-count :allow-input="noSideSpace" v-model:value="foodInfo.describe"
          placeholder="输入年龄" />
      </n-form-item>
      <n-form-item label="类型" path="type">
        <n-select v-model:value="foodInfo.type" :options="types" placeholder="请选择" />
      </n-form-item>
      <n-form-item label="价格（元/份）" path="price">
        <n-input-number :min="0" v-model:value="foodInfo.price" clearable :precision="2" />
      </n-form-item>
      <div>商品图片</div>
      <n-upload action="https://www.mocky.io/v2/5e4bafc63100007100d8b70f" v-model:file-list="pics"
        list-type="image-card" :max="9" accept=".png,.jpg,.svg">
      </n-upload>
    </n-form>
    <template #action>
      <n-button block type="primary" v-if="foodInfo.status === '已下架'">上架商品</n-button>
      <n-button block type="primary" v-else-if="foodInfo.status === '已上架'">下架商品</n-button>
      <n-button block type="primary" style="margin-top: 10px;" @click="submit">提交审核</n-button>
    </template>
  </n-card>

</template>

<script>
import { defineComponent, onMounted, reactive, ref } from 'vue'
import { useRoute } from 'vue-router';
import PictureUpload from '../../components/utils/PictureUpload.vue';
import { useMessage } from 'naive-ui';
export default defineComponent({
  components: { PictureUpload },
  setup() {
    const message = useMessage()
    const types = ["热菜", "凉菜", "主食", "小吃", "饮品", "汤羹", "西餐", "烘焙"].map((v) => {
      return {
        label: v,
        value: v
      }
    })
    const formRef = ref(null);
    const foodInfo = reactive({
      name: "",
      describe: "",
      type: "",
      price: -1,
      status: "",
    });
    const pics = ref([])
    const rules = {
      name: {
        required: true,
        message: "请输入名称",
        trigger: ["input", "blur"]
      },
      type: {
        required: true,
        message: "请选择类型",
        trigger: ["input", "blur"]
      },
      price: {
        required: true,
        message: "请输入价格",
        type: 'number',
        trigger: ["input", "blur"]
      },
    };
    const route = useRoute();
    const foodID = route.params.foodID;
    onMounted(() => {
      if (foodID != -1) {
        foodInfo.name = "鸡蛋莲花粥"
        foodInfo.describe = "鸡蛋莲花粥"
        foodInfo.type = "凉菜"
        foodInfo.status = "审核中"
        foodInfo.price = 14
        pics.value.push(...[
          {
            id: "c",
            name: "我是自带url的图片.png",
            status: "finished",
            url: "https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
          }])
      }
    })
    return {
      formRef: formRef,
      foodID: foodID,
      foodInfo: foodInfo,
      types: types,
      rules: rules,
      pics: pics,
      noSideSpace: (value) => {
        return !value.startsWith(' ') && !value.endsWith(' ')
      },
      submit: () => {
        if (pics.value.length === 0) {
          message.error("请至少上传一张图片")
        } else {
          formRef.value?.validate((errors) => {
            if (!errors) {
              message.success("Valid");
            } else {
              console.log(errors);
              message.error("Invalid");
            }
          });
        }
      }
    }
  },
})
</script>


<style>

</style>