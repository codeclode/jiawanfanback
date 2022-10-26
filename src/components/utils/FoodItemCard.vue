<template>
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
        <n-tag class="tag" type="success">{{ food.price }}元</n-tag>
        <n-space style="margin-top: 10px;">
          <n-ellipsis :tooltip="false" :line-clamp="3">
            {{ food.describe }}
          </n-ellipsis>
        </n-space>
      </n-gi>
    </n-grid>
    <template #action>
      <n-button block @click="detail">查看详情</n-button>
    </template>
  </n-card>
</template>

<script setup>
import { defineProps } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter()
const props = defineProps(['food'])
const food = props.food;
function detail() {
  router.push({
    name: "foodDetail",
    params: {
      foodID: food.foodID
    }
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
</style>