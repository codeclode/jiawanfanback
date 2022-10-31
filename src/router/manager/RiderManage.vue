<template>
  <div>
    <n-page-header subtitle="看看远处的骑手吧家人们" title="骑手">
      <template #header>
        <n-icon size="20">
          <VehicleBicycle20Regular />
        </n-icon>
      </template>
    </n-page-header>
    <n-card>
      <n-grid ref="containerRef" :cols="10" x-gap="12">
        <n-gi :span="2">
          <n-card title="查询条件">
            <n-form :label-width="80">
              <n-form-item label="姓名">
                <n-input v-model:value="keyWord" placeholder="用户名查询" :maxlength="10" />
              </n-form-item>
              <n-form-item label="分数区间">
                <n-slider v-model:value="scoreRange" range :step="1" />
              </n-form-item>
              <n-button @click="search" strong type="primary">
                查询
              </n-button>
            </n-form>
          </n-card>
        </n-gi>
        <n-gi :span="8" style="height: 65vh;overflow: auto; padding-right: 5px;">
          <n-back-top :right="100" :bottom="100" />
          <n-grid :cols="4" x-gap="12" y-gap="12">
            <n-gi v-for="rider in riders" :key="rider.id">
              <n-thing class="riderCard">
                <template #avatar>
                  <img style="width: 60px; height: 60px;" :src="rider.avatar" />
                </template>
                <template #header>
                  {{ rider.name }}
                </template>
                <template #description>
                  当前评分{{ rider.score }}
                </template>
                <div>
                  分数操作
                  <n-input-number v-model:value="rider.optNumber" :precision="0" placeholder="负数减分，正数加分" :min="-5"
                    :max="5" />
                </div>
                <template #action>
                  <n-button type="error" @click="dismissal(rider)" ghost block class="btn">直接撤职</n-button>
                  <n-button type="warning" @click="submit(rider)" ghost block class="btn">提交操作</n-button>
                </template>
              </n-thing>
            </n-gi>
          </n-grid>
          <n-button block type="primary" secondary @click="loadMore" style="margin: 10px 0;">加载更多</n-button>
        </n-gi>
      </n-grid>
    </n-card>
  </div>
</template>

<script>
import { defineComponent, onMounted, onUnmounted, reactive, ref } from 'vue'
import { VehicleBicycle20Regular } from '@vicons/fluent';
const riders = ref([]);
const scoreRange = ref([0, 100]);
const keyWord = ref("")
const containerRef = ref(void 0)
export default defineComponent({
  components: {
    VehicleBicycle20Regular
  },
  setup() {
    function getDate() {
      riders.value.push(...Array.from({ length: 20 }).map(() => {
        return reactive({
          name: "1",
          id: Math.random() * 1000000,
          score: Math.round(Math.random() * 100),
          avatar: "/logo.png",
          optNumber: 0
        })
      }))
    }
    onMounted(() => {
      getDate();
    })
    onUnmounted(() => {
      while (riders.value.length) riders.value.pop()
    })
    return {
      riders, scoreRange, keyWord, containerRef,
      dismissal(r) {
        console.log(r.id);
      },
      submit(r) {
        console.log(r.optNumber);
      },
      search() {
        let searchCondition = {
          keyWord: keyWord.value,
          min: Math.min(...scoreRange.value),
          max: Math.max(...scoreRange.value),
        }
        console.log(searchCondition)
      },
      loadMore() {
        console.log("加载更多")
      }
    }
  },
})
</script>

<style scoped>
.riderCard {
  border: 1px solid rgba(184, 184, 184, 0.589);
  border-radius: 5px;
}

.btn {
  margin: 10px auto;
}
</style>