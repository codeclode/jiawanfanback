<template>
  <div>
    <n-page-header subtitle="徒步食堂太难了家人们" title="店铺">
      <template #header>
        <n-icon size="20">
          <BuildingShop20Regular />
        </n-icon>
      </template>
    </n-page-header>
    <n-grid :cols="10" x-gap="12">
      <n-gi :span="2">
        <n-card title="查询条件">
          <n-form :label-width="80">
            <n-form-item label="店铺">
              <n-select v-model:value="searchCondation.shop" filterable :options="shops" />
            </n-form-item>
            <n-form-item label="状态">
              <n-checkbox-group v-model:value="searchCondation.status">
                <n-space item-style="display: flex;">
                  <n-checkbox v-for="s in status" :key="s" :value="s" :label="s" />
                </n-space>
              </n-checkbox-group>
            </n-form-item>
            <n-button @click="search" strong type="primary">
              查询
            </n-button>
          </n-form>
        </n-card>
      </n-gi>
      <n-gi :span="8" style="height: 70vh;overflow: auto; padding-right: 5px;">
        <n-back-top :right="100" :bottom="100" />
        <n-grid :cols="2" x-gap="12" y-gap="12">
          <n-gi :span="2" v-if="foods.length === 0">
            <n-result status="404" title="没有找到也" description="生活总归带点荒谬">
              <template #footer>
                <n-button>也许你可以再查一下</n-button>
              </template>
            </n-result>
          </n-gi>
          <n-gi v-for="food in foods" :key="food.foodID">
            <food-item-card role="manager" :food="food"></food-item-card>
          </n-gi>
        </n-grid>
        <n-button block :loading="loading" :disabled="end" type="primary" secondary @click="loadMore"
          style="margin: 10px 0;">{{ end ? '到底啦' : '加载更多' }}</n-button>
      </n-gi>
    </n-grid>
  </div>
</template>

<script>
import { getData } from '../../utils/getData';
import { defineComponent, onMounted, onUnmounted, reactive, ref } from 'vue'
import { BuildingShop20Regular } from '@vicons/fluent';
import { useMessage } from 'naive-ui';
const foods = ref([])
const shops = ref(["全部"].map((v) => {
  return {
    label: v,
    value: v,
  }
}))

var page = 1;
const pageSize = 20;
const loading = ref(false);
const end = ref(false);
const searchCondation = reactive({
  shop: "全部",
  status: ["审核中", "已下架", "已上架"]
})
const status = ["审核中", "已下架", "已上架"]


function loadMore() {
  loading.value = true;
  getData("food/getFoodShortInfo", {
    page: page,
    pageSize: pageSize,
    status: searchCondation.status.map((v) => {
      return v === "审核中" ? '0' : v === "已下架" ? '-' : '1'
    }).join(""),
    shopName: searchCondation.shop === "全部" ? null : searchCondation.shop
  }).then(res => {
    foods.value.push(...res.data.map((v) => {
      v.status = v.status === -1 ? "已下架" : v.status === 0 ? "审核中" : "已上架";
      v.score = v.score === null ? 3 : v.score;
      return v
    }))
    if (!res.data.length || res.data.length < pageSize) end.value = true;
    page++;
  }).catch(e => {
    handleError()
  }).finally(() => {
    loading.value = false;
  })
}
function loadFirstDate() {
  getData("user/getUserInfo", {
    role: 2
  }).then((res) => {
    shops.value.push(...res.data.map((v) => {
      return {
        label: v.userName,
        value: v.userName,
      }
    }))
  }).catch(e => {
    handleError()
  })
}
export default defineComponent({
  components: {
    BuildingShop20Regular
  },
  setup() {
    const msg = useMessage()
    onMounted(() => {
      loadFirstDate()
      loadMore()
    });
    return {
      shops, searchCondation, status, foods, loadMore, loading, end,
      search() {
        foods.value.splice(0, foods.value.length)
        loading.value = false;
        end.value = false;
        page = 1;
        loadMore();
      },
      handleError() {
        msg.error("出错啦，是不是网络有问题？")
      }
    }
  },
})
</script>

<style>

</style>