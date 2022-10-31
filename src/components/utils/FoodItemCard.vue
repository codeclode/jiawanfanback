<template>
  <n-modal v-if="role === 'manager'" v-model:show="showModal">
    <n-card style="width: 600px" :title="food.name" :bordered="false" size="huge" role="dialog" aria-modal="true">
      <template #header-extra>
        <n-tag style="margin-right: 10px;">{{ food.type }}</n-tag>
        <n-tag style="margin-right: 10px;" type="primary">价格：{{ food.price }}</n-tag>
        <n-tag type="info">{{ food.shopName }}</n-tag>
      </template>
      {{ food.describe }}
      <template #footer>
        <n-carousel autoplay>
          <img class="carousel-img" :src="'/food/getFoodImage?id=' + img" v-for="img in imgs" :key="img">
        </n-carousel>
      </template>
    </n-card>
  </n-modal>
  <n-card hoverable :title="food.name">
    <n-grid :cols="10" :x-gap="15">
      <n-gi :span="3">
        <img class="image" :src="food.poster" />
      </n-gi>
      <n-gi :span="7">
        <n-tag type="primary" class="tag">{{ food.type }}</n-tag>
        <n-tag :type="food.status === '已上架' ? 'success' : food.status === '审核中' ? 'warning' : 'error'" class="tag">{{
            food.status
        }}</n-tag>
        <n-tag class="tag" :type="food.score >= 4 ? 'success' : food.score >= 3 ? 'warning' : 'error'">{{
            food.score === null ? 3 : food.score
        }}⭐</n-tag>
        <n-tag class="tag" type="success">{{ food.price }}元</n-tag>
        <n-space style="margin-top: 10px;">
          <n-tag class="tag" type="success" v-if="role === 'manager'">商铺：{{ food.shopName }}</n-tag>
          <n-ellipsis :tooltip="false" :line-clamp="3">
            {{ food.describe }}
          </n-ellipsis>
        </n-space>
      </n-gi>
    </n-grid>
    <template #action>
      <n-button block @click="detail">查看详情</n-button>
      <div v-if="role === 'manager'" style="margin-top: 10px;">
        <n-button :loading="loading" v-if="food.status === '审核中'" style="margin-right: 5px;" @click="opt(-1)"
          type="warning">打回申请
        </n-button>
        <n-button :loading="loading" v-if="food.status === '审核中'" style="margin-right: 5px;" @click="opt(-1, false)"
          type="success">申请通过
        </n-button>
        <n-button :loading="loading" v-if="food.status === '已上架'" style="margin-right: 5px;" @click="opt(-1)"
          type="error">强制下架</n-button>
        <n-button v-if="food.status === '已下架'" style="margin-right: 5px;" :disabled="true" type="error">下架商品</n-button>
      </div>
    </template>
  </n-card>
</template>

<script setup>
import { defineProps, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import { getData } from '../../utils/getData';
import { postData } from '../../utils/postData';
import { useMessage } from 'naive-ui';
const msg = useMessage()
const router = useRouter()
const imgs = ref([])
const showModal = ref(false)
watch(showModal, (v) => {
  if (imgs.value.length === 0) {
    getData("food/getFoodImages", {
      id: food.id
    }).then((res) => {
      imgs.value.push(...res.data)
    })
  }
})
onMounted(() => {
})
const props = defineProps({
  food: {
    type: Object,
    required: true
  },
  role: {
    validator(value) {
      // The value must match one of these strings
      return ['cook', 'manager'].includes(value)
    }
  }
})
const food = props.food;
const loading = ref(false)
function detail() {
  if (props.role === 'manager') {
    showModal.value = true;
  } else {
    router.push({
      name: "foodDetail",
      params: {
        foodID: food.id
      }
    })
  }
}
function opt(status, needReview = true) {
  loading.value = true
  postData("food/updateFood", {
    id: food.id,
    status: status,
    needReview: needReview
  }).then(res => {
    if (res.data == true) {
      msg.success("操作成功")
      food.status = status === -1 ? "已下架" : status === 0 ? "审核中" : "已上架"
    } else {
      msg.error("操作失败，请刷新")
    }
  }).catch(e => {
    msg.error("网络出现问题")
  }).finally(() => {
    loading.value = false;
  })
}
</script>

<style scoped>
.image {
  width: 100%;
  aspect-ratio: 1/1;
  height: auto;
  margin: 0 auto;
  display: block;
  border-radius: 10px;
  object-fit: contain;
}

.content {
  display: flex;
  flex-direction: column;
}

.tag {
  margin: 0 5px;
}

.carousel-img {
  width: 100%;
  height: 240px;
  object-fit: contain;
}
</style>