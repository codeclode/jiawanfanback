<template>
  <div style="text-align: center;">
    <n-gradient-text type="primary" size="35">
      经理列表
    </n-gradient-text>
  </div>
  <n-data-table :columns="columns" :data="data" :pagination="pagination" :bordered="true" :single-line="false" />
  <n-gradient-text type="error">
    如果您只是想修改一下菜品的价格啥的，请直接在商铺管理中修改并等待审核，经理也怕夺命连环call。。。
  </n-gradient-text>
</template>

<script>
import { h, defineComponent } from "vue";
import { NButton, useMessage, NTag } from "naive-ui";
import useClipboard from 'vue-clipboard3'

const createColumns = ({
  copy
}) => {
  return [
    {
      title: "姓名",
      key: "name"
    },
    {
      title: "电话",
      key: "phoneNumber",
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
            default: () => row.phoneNumber
          }
        )
      }
    },
    {
      title: "办公室",
      key: "workPlace"
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

const data = [
  { name: "刘邦", phoneNumber: "13853849013", workPlace: "G336" },
  { name: "刘备", phoneNumber: "19591318465", workPlace: "G334" },
  { name: "吕布", phoneNumber: "15816373345", workPlace: "C202" },
];

export default defineComponent({
  setup() {
    const message = useMessage();
    const { toClipboard } = useClipboard()
    return {
      data,
      columns: createColumns({
        async copy(row) {
          try {
            await toClipboard(row.phoneNumber)
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