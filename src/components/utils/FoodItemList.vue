<template>
  <n-grid v-if="data.length !== 0" :x-gap="8" :y-gap="8" :cols="3">
    <n-gi v-for="food in data" :key="food.name">
      <food-item-card :food="food"></food-item-card>
    </n-gi>
  </n-grid>
  <n-result v-else status="418" title="你确定你卖这种饭？" description="一切尽在不言中">
    <template #footer>
      <n-button>还是看看雪山吧🏔</n-button>
    </template>
  </n-result>
</template>

<script>
import { computed, defineComponent, reactive } from 'vue'
export default defineComponent({
  props: ['data'],
  setup(props) {
    const data = computed(() => props.data);
    return {
      data: data
    }
  },
})
</script>


<style>

</style>