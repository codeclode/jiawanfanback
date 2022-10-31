<template>
  <n-card style="width: 60%;margin: 0 auto;">
    <template #header>
      <n-tag v-if="foodID != -1"
        :type="foodInfo.status === '已上架' ? 'success' : foodInfo.status === '审核中' ? 'warning' : 'error'">{{
            foodInfo.status
        }}</n-tag>
      <div>PS:审核成功后请记得上架商品哦~~</div>
    </template>
    <n-form ref="formRef" :label-width="80" :model="foodInfo" :rules="rules">
      <n-form-item label="名称" path="name">
        <n-input maxlength="10" show-count clearable :allow-input="noSideSpace" v-model:value="foodInfo.name"
          placeholder="输入名称" />
      </n-form-item>
      <n-form-item label="简介" path="describe">
        <n-input type="textarea" maxlength="80" show-count :allow-input="noSideSpace" v-model:value="foodInfo.describe"
          placeholder="输入简介" />
      </n-form-item>
      <n-form-item label="类型" path="type">
        <n-select v-model:value="foodInfo.type" :options="types" placeholder="请选择" />
      </n-form-item>
      <n-form-item label="价格（元/份）" path="price">
        <n-input-number :min="0" v-model:value="foodInfo.price" clearable :precision="2" />
      </n-form-item>
      <div>商品图片</div>
      <n-upload :custom-request="customRequest" @remove="remove" @before-upload="handlerUploadBefore"
        action="food/uploadImage" v-model:file-list="pics" list-type="image-card" :max="6" accept=".png,.jpg,.svg">
      </n-upload>
    </n-form>
    <template #action>
      <n-button :loading="loading" block type="primary"
        v-if="foodInfo.status === '已下架' && foodInfo.needReview === false" @click="submit(1)">上架商品</n-button>
      <n-button :loading="loading" block type="primary" v-else-if="foodInfo.status === '已上架'" @click="submit(-1)">下架商品
      </n-button>
      <n-button :loading="loading" block type="primary" style="margin-top: 10px;" @click="submit(0)">提交审核</n-button>
    </template>
  </n-card>

</template>

<script>
import { defineComponent, onMounted, onUnmounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router';
import PictureUpload from '../../components/utils/PictureUpload.vue';
import { useMessage } from 'naive-ui';
import axios from 'axios';
import { postData } from '../../utils/postData';
import { getData } from '../../utils/getData';
import { useStore } from 'vuex';
export default defineComponent({
  components: { PictureUpload },
  setup() {
    const loading = ref(false)
    const router = useRouter()
    const store = useStore()
    const message = useMessage()
    const types = ["热菜", "凉菜", "主食", "小吃", "饮品", "汤羹", "西餐", "烘焙"].map((v) => {
      return {
        label: v,
        value: v
      }
    })
    const imgID = ref([])
    const formRef = ref(null);
    const foodInfo = reactive({
      name: "",
      describe: "",
      type: "",
      price: -1,
      status: "",
      needReview: true
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
    const delectPics = []
    onUnmounted(() => {
      delectPics.forEach(async (v) => {
        await getData("food/removeImageByID", {
          id: v
        })
      })
    })
    onMounted(async () => {
      loading.value = true;
      if (foodID != -1) {
        await getData("food/getFoodByID", {
          id: foodID
        }).then(res => {
          if (res.data !== null) {
            foodInfo.name = res.data.name;
            foodInfo.type = res.data.type;
            foodInfo.describe = res.data.describe === null ? "" : res.data.describe;
            foodInfo.price = res.data.price;
            foodInfo.needReview = res.data.needReview;
            foodInfo.status = res.data.status;
            foodInfo.status = foodInfo.status === -1 ? "已下架" : foodInfo.status === 0 ? "审核中" : "已上架";
          }
        }).catch(e => {
          message.error("网络错误")
        })
        await getData("food/getFoodImages", {
          id: foodID
        }).then((res) => {
          res.data.forEach((v) => {
            pics.value.push({
              id: v,
              url: "food/getFoodImage?id=" + v,
              status: "finished"
            })
            imgID.value.push({
              id: v
            })
          })
        }).catch(() => {
          message.error("网络错误")
        })
      }
      loading.value = false;
    })
    return {
      formRef: formRef,
      foodID: foodID,
      foodInfo: foodInfo,
      types: types,
      rules: rules,
      pics: pics,
      imgID, loading,
      noSideSpace: (value) => {
        return !value.startsWith(' ') && !value.endsWith(' ')
      },
      submit: async (status) => {
        if (pics.value.length === 0) {
          message.error("请至少上传一张图片")
        } else {
          formRef.value?.validate(async (errors) => {
            if (!errors) {
              loading.value = true;
              await postData("food/addOrUpdateFood", {
                food: {
                  id: foodID == -1 ? null : foodID,
                  name: foodInfo.name,
                  describe: foodInfo.describe,
                  type: foodInfo.type,
                  price: foodInfo.price,
                  shopName: store.state.login.username,
                  status: status,
                  needReview: true
                },
                images: imgID.value.map((v) => {
                  return v.id
                })
              }).catch(() => {
                message.error("网络错误")
              })
              await delectPics.forEach(async (v) => {
                await getData("food/removeImageByID", {
                  id: v
                })
              })
              loading.value = false;
              router.replace({
                name: "shopInfo"
              })
            } else {
              message.error("请检查表单");
            }
          });
        }
      },
      handlerUploadBefore: (e) => {
        if (e.file.file.size > 2 * 1024 * 1024) {
          message.error("上传图片请勿大于2M")
          return false
        }
        return true
      },
      remove: (e) => {
        var i = imgID.value.find((v) => {
          return v.name === e.file.batchId || v.id === e.file.id;
        })
        if (i !== undefined) {
          imgID.value.splice(imgID.value.indexOf(i), 1);
          delectPics.push(i.id)
          console.log(delectPics);
        }
      },
      finish: (e) => {
        message.success("上传成功")
      },
      customRequest: ({
        file,
        data,
        headers,
        withCredentials,
        action,
        onFinish,
        onError,
        onProgress
      }) => {
        let i = imgID.value.find((v) => {
          return v.name === file.batchId;
        })
        if (i !== undefined)
          return;
        const formData = new FormData();
        formData.append('file', file.file);
        axios.post(action, formData, {
          'Content-type': 'multipart/form-data'
        }).then(res => {
          imgID.value.push({ name: file.batchId, id: res.data });
        }).catch(() => {
          message.error("网络错误")
        })
      }
    }
  },
})
</script>


<style>

</style>