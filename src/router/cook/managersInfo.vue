<template>
  <div>
    <n-page-header subtitle="你可以在除了办公室以外的任何地方找到他们😄" title="经理们">
    </n-page-header>
    <n-result v-if="error" status="500" title="Shit 看看是不是没网了" description="出错可能说明该雇更多程序员了">
      <template #footer>
        <n-button @click="reload">刷新</n-button>
      </template>
    </n-result>
    <n-data-table v-else :columns="columns" :data="data" :pagination="pagination" :bordered="true"
      :single-line="false" />
    <n-gradient-text type="error">
      如果您只是想修改一下菜品的价格啥的，请直接在商铺管理中修改并等待审核，经理也怕夺命连环call。。。
    </n-gradient-text>
  </div>
</template>

<script>
import { h, defineComponent, onMounted } from "vue";
import { NButton, useMessage, NTag } from "naive-ui";
import useClipboard from 'vue-clipboard3'
import { getData } from "../../utils/getData";

const createColumns = ({
  copy
}) => {
  return [
    {
      title: "姓名",
      key: "userName"
    },
    {
      title: "电话",
      key: "phonenumber",
      render(row) {
        return h(
          NTag,
          {
            style: {
              marginRight: '6px'
            },
            type: 'primary',
            bordered: false
          },
          {
            default: () => row.phonenumber
          }
        )
      }
    },
    {
      title: "办公室",
      key: "address"
    },
    {
      title: "操作",
      key: "actions",
      render(row) {
        return h(
          NButton,
          {
            strong: true,
            tertiary: true,
            size: "small",
            onClick: () => copy(row)
          },
          { default: () => "复制电话号码" }
        );
      }
    }
  ];
};

const data = ref([])

const error = ref(false)

function getManagerData() {
  getData("user/getUserInfo", {
    role: 3
  }).then(res => {
    data.value.push(...res.data);
    error.value = false;
  }).catch(e => {
    error.value = true
  })
}

function reload() {
  error.value = false;
  data.value.splice(0, data.value.length);
  getManagerData()
}

export default defineComponent({

  setup() {
    onMounted(() => {
      reload()
    });
    const message = useMessage();
    const { toClipboard } = useClipboard()
    return {
      data, error, reload,
      columns: createColumns({
        async copy(row) {
          try {
            await toClipboard(row.phonenumber)
            message.success("复制成功")
          } catch (e) {
            console.error(e)
            message.error("复制失败，你是不是用了什么国产垃圾浏览器")
          }
        }
      }),
      pagination: false
    };
  }
});
</script>