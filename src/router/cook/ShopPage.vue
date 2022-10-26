<template>
  <n-card title="商铺信息" style="margin-bottom: 16px">
    <n-tabs type="line" animated>
      <n-tab-pane v-for="t in types" :key="t" :name="t" :tab="t">
        <food-item-list :data="data.filter((v) => t === v.type || t === '全部')"></food-item-list>
      </n-tab-pane>
    </n-tabs>
    <template #header-extra>
      <n-button @click="add" type="primary">添加新菜品</n-button>
    </template>
  </n-card>
</template>
<script>
import { defineComponent, onMounted, reactive } from 'vue'
import { useRouter } from 'vue-router';
const types = ["全部", "热菜", "凉菜", "主食", "小吃", "饮品", "汤羹", "西餐", "烘焙"]
const data = reactive([])
export default defineComponent({
  setup() {
    const router = useRouter()
    onMounted(() => {
      while (data.length) data.pop()
      data.push({
        foodID: 1,
        type: "热菜",
        name: "鸡蛋莲花粥",
        price: 12,
        status: "已下架",
        describe: "有时也会厌烦逆来顺受的自己偶尔也会放空大脑 期待天降的转机海浪带我去哪里 我就去哪里伤人的词语无法传播 水下安静到窒息水母 水母 普通透明的生物 期待委婉的保护",
        poster: "https://i3.meishichina.com/atta/recipe/2022/10/26/20221026166676069561194110667631.JPG?x-oss-process=style/p800",
      }, {
        foodID: 2,
        name: "鸡蛋莲花粥",
        type: "凉菜",
        price: 12,
        status: "审核中",
        describe: "不再 复述 相对失败的酸楚 尝试享受着独处请来一束追光照亮着海底学会人间技巧参与了游戏反正眼泪可以融化在海里散漫自在也被视为你恣意水母 水母 普通透明的生物 期待委婉的保护不再 复述 相对失败的酸楚（？） 尝试享受着独处努力生长了刺 却没学会保护自己",
        poster: "https://i3.meishichina.com/atta/recipe/2022/10/26/20221026166676069561194110667631.JPG?x-oss-process=style/p800",
      }, {
        foodID: 3,
        name: "鸡蛋莲花粥",
        type: "主食",
        price: 12,
        describe: "现在说出愿望讨一个拥抱 来不来得及见不到想见的世界 和尽头的你想过变换姿态 只能反射阳光的色彩水母 水母 普通透明的生物 期待委婉的保护不再 复述 相对失败的酸楚 尝试享受着独处请来一束追光照亮着海底学会人间技巧参与了游戏反正眼泪可以融化在海里散漫自在也被视为你恣意水母 水母 随波逐流的生物 等一个短暂的停驻逐渐 领悟 缓慢弥补的脚步 终会找到 归宿",
        status: "已上架",
        poster: "https://i3.meishichina.com/atta/recipe/2022/10/26/20221026166676069561194110667631.JPG?x-oss-process=style/p800",
      })
    })
    return {
      types: types,
      data: data,
      add() {
        router.push({
          name: "foodDetail",
          params: {
            foodID: -1
          }
        })
      }
    }
  },
})
</script>

<style scoped>
.card-tabs .n-tabs-nav--bar-type {
  padding-left: 4px;
}
</style>