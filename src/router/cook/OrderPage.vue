<template>
  <div>
    <n-page-header subtitle="嘉晚饭军火展示" title="订单">
      <template #header>
        看看你的订单👀
      </template>
      <template #avatar>
        <n-avatar src="/logo.png" />
      </template>
      <template #extra>
        <n-space>
          <n-button @click="refresh">刷新</n-button>
        </n-space>
      </template>
    </n-page-header>

    <n-tabs type="segment" style="margin-top: 15px;" @update:value="handleUpdateValue">
      <n-tab-pane name="待确认" tab="待确认"></n-tab-pane>
      <n-tab-pane name="进行中" tab="进行中"></n-tab-pane>
      <n-tab-pane name="已结束" tab="已结束"></n-tab-pane>
    </n-tabs>
    <n-data-table :columns="columns" :data="vdata" striped :pagination="pagination" @update:page="handlePageChange" />
  </div>
</template>

<script>
import { defineComponent, ref, h, reactive, onMounted } from 'vue'
import { NButton, useMessage } from 'naive-ui'

const makeButton = (row, fun, text, disabled = false) => {
  return h(
    NButton,
    {
      disabled: disabled,
      strong: true,
      type: "primary",
      style: {
        marginRight: "3px"
      },
      onClick: () => fun(row)
    },
    { default: () => text }
  )
}

const createColumns = ({ refuse, confirm, dispatch, end, dispatching }) => {
  return [
    {
      title: "食品名",
      key: "name"
    },
    {
      title: "配送地址",
      key: "address"
    },
    {
      title: "顾客名",
      key: "username"
    },
    {
      title: "状态",
      key: "status"
    },
    {
      title: "状态改变时间",
      key: "updateTime"
    },
    {
      title: "操作",
      key: "actions",
      render(row) {
        let ret = [];
        if (row.status === "待确认") {
          ret.push(makeButton(row, confirm, "确认"), makeButton(row, refuse, "拒绝"))
        } else if (row.status === "制作中") {
          ret.push(makeButton(row, dispatch, "派送"))
        } else if (row.status === "派送中") {
          ret.push(makeButton(row, dispatching, "派送中"))
        } else if (row.status === "已结束") {
          ret.push(makeButton(row, end, "已结束"))
        }
        return ret;
      }
    }
  ];
};
const getData = (type) => {
  var dates = [{
    name: "翡翠白玉汤",
    username: "李傲松",
    address: "竹园宿舍",
    status: "待确认",
    updateTime: "2022-20-31 10:22"
  }, {
    name: "母鸡汤薄饼",
    username: "李傲松",
    address: "竹园宿舍",
    status: "派送中",
    updateTime: "2022-20-31 10:22"
  }, {
    name: "翡翠白玉汤",
    username: "李傲松",
    address: "竹园宿舍",
    status: "待确认",
    updateTime: "2022-20-31 10:22"
  }, {
    name: "翡翠白玉汤",
    username: "李傲松",
    address: "竹园宿舍",
    status: "待确认",
    updateTime: "2022-20-31 10:22"
  }, {
    name: "翡翠白玉汤",
    username: "李傲松",
    address: "竹园宿舍",
    status: "待确认",
    updateTime: "2022-20-31 10:22"
  }, {
    name: "翡翠白玉汤",
    username: "李傲松",
    address: "竹园宿舍",
    status: "待确认",
    updateTime: "2022-20-31 10:22"
  }, {
    name: "大盘鸡",
    username: "李傲松",
    address: "竹园宿舍",
    status: "已结束",
    updateTime: "2022-20-31 10:22"
  }]
  if (type === "待确认" || type === "已结束") {
    return dates.filter((v) => {
      return v.status === type
    })
  } else {
    return dates.filter((v) => {
      return v.status !== "待确认" && v.status !== "已结束"
    })
  }
};
const data = ref(getData("待确认"))

const count = 51

const vdata = ref([...data.value, ...Array.from({ length: count - 5 }).map(() => {
  return {}
})])
const pagination = reactive({
  page: 1,
  pageSize: 5,
})
export default defineComponent({
  setup() {
    const message = useMessage();
    onMounted(() => {
      data.value = (getData("待确认"))
      vdata.value = ([...data.value, ...Array.from({ length: count - 5 }).map(() => {
        return {}
      })])
    })
    return {
      data: data,
      vdata: vdata,
      pagination: pagination,
      columns: createColumns({
        refuse(row) {
          message.error("拒绝");
        },
        confirm(row) {
          message.success("确认");
        },
        dispatch(row) {
          message.success("派送");
        },
        dispatching(row) {
          message.warning("派送中");
        },
        end(row) {
          message.success("结束");
        },
      }),
      handleUpdateValue(tabName) {
        pagination.page = 1
        data.value = getData(tabName)
        vdata.value = ([...data.value, ...Array.from({ length: count - 5 < 0 ? 0 : (count - 5) }).map(() => {
          return {}
        })])
      },
      handlePageChange(p) {
        pagination.page = p;
        data.value = [
          {
            name: "母鸡汤薄1",
            username: "李傲松",
            address: "竹园宿舍",
            status: "派送中",
            updateTime: "2022-20-31 10:22"
          }
        ]
        let a1 = Array.from({ length: (p * 5 - 5) }).map(() => {
          return {}
        });
        let a2 = Array.from({ length: (count - p * 5) < 5 ? 0 : (count - p * 5) }).map(() => {
          return {}
        });
        vdata.value = [...a1, ...data.value, ...a2]
      },
      refresh() {
        console.log("刷新");
      }
    }
  },
})
</script>
