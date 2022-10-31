<template>
  <div>
    <n-page-header style="margin-bottom: 10px;" subtitle="看看今天怎么计算能让利益最大。。。如果你认为人是数据的话">
      <template #title>
        <n-icon size="20">
          <BuildingShop20Regular />
        </n-icon>
      </template>
      <template #avatar>
        <n-avatar src="/logo.png" />
      </template>
    </n-page-header>
    <n-card title="商铺信息" style="margin-bottom: 16px">
      <n-back-top :right="100" :bottom="100" />
      <n-tabs type="line" animated>
        <n-tab-pane v-for="t in types" :key="t" :name="t" :tab="t">
          <n-result v-if="error" status="500" title="Shit 看看是不是没网了" description="出错可能说明该雇更多程序员了">
            <template #footer>
              <n-button @click="reload">刷新</n-button>
            </template>
          </n-result>
          <food-item-list v-else :data="data.filter((v) => t === v.type || t === '全部')"></food-item-list>
        </n-tab-pane>
      </n-tabs>
      <template #header-extra>
        <n-button @click="add" type="primary">添加新菜品</n-button>
      </template>
    </n-card>
  </div>
</template>
<script>
import { defineComponent, onMounted, reactive } from 'vue'
import { useRouter } from 'vue-router';
import { BuildingShop20Regular } from '@vicons/fluent';
import { getData } from '../../utils/getData';
import { useStore } from 'vuex';

const types = ["全部", "热菜", "凉菜", "主食", "小吃", "饮品", "汤羹", "西餐", "烘焙"]
const data = reactive([])
export default defineComponent({
  components: {
    BuildingShop20Regular
  },
  setup() {
    const error = ref(false)
    const store = useStore()
    const router = useRouter()
    function getFoodsData() {
      getData("food/getFoodShortInfo", {
        page: -1,
        pageSize: -1,
        shopName: store.state.login.username,
        status: "-10"
      }).then(res => {
        data.push(...res.data.map(v => {
          v.status = v.status === -1 ? "已下架" : v.status === 0 ? "审核中" : "已上架"
          return v
        }))
      }).catch(e => {
        error.value = true;
      })
    }
    onMounted(() => {
      reload()
    })
    function reload() {
      while (data.length) data.pop();
      getFoodsData()
    }
    return {
      types: types,
      data: data,
      reload, error,
      add() {
        router.push({
          name: "foodDetail",
          params: {
            foodID: -1
          }
        })
      },
    }
  },
})
</script>

<style scoped>
.card-tabs .n-tabs-nav--bar-type {
  padding-left: 4px;
}
</style>