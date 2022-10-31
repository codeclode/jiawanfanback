<template>
  <div>
    <n-page-header subtitle="用户今天骂什么" title="反馈">
      <template #header>
        抗压王来辣✨🎉✨
      </template>
      <template #avatar>
        <n-avatar src="/logo.png" />
      </template>
      <template #extra>
        <n-space>
          <n-button @click="search">查询</n-button>
        </n-space>
      </template>
    </n-page-header>
    <n-list style="padding: 20px;">
      <template #header>
        <n-form>
          <n-form-item path="age" :label="'分数区间' + Math.min(...scoreRange) + '~' + Math.max(...scoreRange)">
            <n-slider v-model:value="scoreRange" range :step="0.5" :max="5" :min="0" />
          </n-form-item>
        </n-form>
      </template>
      <template #footer>
        <n-button block @click="loadMore" :loading="loading">加载更多</n-button>
      </template>
      <TransitionGroup name="list" tag="n-list-item">
        <n-list-item v-for="feetback in feetbacks.filter((v) => !v.read)" :key="feetback.id">
          <template #suffix>
            <n-button @click="read(feetback)" type="info">已读</n-button>
            <n-button @click="showReply(feetback)" type="primary" style="margin-top: 10px;">回复</n-button>
          </template>
          <n-thing :title="'商品：' + feetback.title">
            <template #header-extra>
              <n-tag class="tag" type="success" v-if="feetback.rider">骑手名：{{
                  feetback.rider.name
              }}</n-tag>
              <n-tag class="tag" type="info" v-if="feetback.rider">骑手联系方式：{{
                  feetback.rider.phoneNumber
              }}</n-tag>
              <n-tag class="tag" type="warning" v-if="feetback.shop">商铺名：{{
                  feetback.shop.name
              }}</n-tag>
              <n-tag class="tag" type="primary" v-if="feetback.shop">商铺联系方式：{{
                  feetback.shop.phoneNumber
              }}</n-tag>
            </template>
            <template #description>
              <n-rate readonly :default-value="feetback.score" allow-half />
            </template>
            来自客户 {{ feetback.user.username }}
            <br />
            {{ feetback.describe }}
            <n-modal v-model:show="feetback.showModal">
              <n-card style="width: 600px" :title="'回复：' + feetback.user.username" :bordered="false" size="huge"
                role="dialog" aria-modal="true">
                <template #header-extra>
                  {{ feetback.describe }}
                </template>
                <n-input maxlength="100" show-count clearable v-model:value="replyContent" />
                <template #footer>
                  <n-button block @click="reply(feetback)">回复</n-button>
                </template>
              </n-card>
            </n-modal>
          </n-thing>
        </n-list-item>
      </TransitionGroup>
    </n-list>
    <n-back-top :right="100" />
  </div>
</template>

<script>
import { defineComponent, reactive, ref } from 'vue'


const vd = () => {
  return Array.from({ length: 5 }).map(() => {
    return {
      id: Math.floor(Math.random() * 100000),
      title: `${Math.floor(Math.random() * 100000)}`,
      score: Math.floor(Math.random() * 5),
      describe: "ajsdnaocssan",
      read: false,
      rider: {
        name: "看",
        phoneNumber: 19566843157
      },
      shop: {
        name: "竹园1号",
        phoneNumber: 13853849013
      },
      user: {
        id: 1,
        username: "李傲松",
      },
      showModal: false
    }
  })
}

const replyContent = ref("")
const feetbacks = ref(vd())
const loading = ref(false)
const scoreRange = ref([0, 5])
export default defineComponent({
  setup() {
    return {
      loading: loading,
      scoreRange: scoreRange,
      feetbacks: feetbacks,
      replyContent: replyContent,
      async loadMore() {
        loading.value = true;
        setTimeout(() => {
          feetbacks.value.push(...vd())
          loading.value = false;
        }, 1000);
      },
      search() {
        let n1 = Math.min(...scoreRange.value)
        let n2 = Math.max(...scoreRange.value)
        // feetbacks.value = feetbacks.value.filter((v) => {
        //   return v.score >= n1 && v.score <= n2 || v.score >= n2 && v.score <= n1
        // })
        //后端获取取件数值
        console.log(n1, n2)
      },
      read(feetback) {
        feetback.read = true;
      },
      showReply(feetback) {
        feetback.showModal = true
      },
      reply(feetback) {
        console.log(feetback.user.id);
        console.log(replyContent.value);
        replyContent.value = ''
        feetback.showModal = false;
        feetback.read = true;
      }
    }
  }
})
</script>


<style scoped>
.tag {
  margin-left: 10px;
}

.list-move,
/* 对移动中的元素应用的过渡 */
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(100%);
}

.list-leave-active {
  position: absolute;
}
</style>