<template>
  <n-upload :disabled="disabled" action="https://www.mocky.io/v2/5e4bafc63100007100d8b70f"
    :default-file-list="previewFileList" list-type="image-card" :file-list-style="isAvatar ? avatarStyle : undefined"
    :class="{ 'avatar': isAvatar }" @preview="handlePreview" :max="max">
  </n-upload>
  <n-modal v-model:show="showModal" preset="card" style="width: 600px" :title="isAvatar ? '你的头像' : '一张很酷的图片'">
    <img :src="previewImageUrl" style="width: 100%">
  </n-modal>
</template>

<script>
import { computed, defineComponent, ref } from "vue";
export default defineComponent({
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    max: {
      type: Number,
      default: 9
    },
    isAvatar: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const showModalRef = ref(false);
    const previewImageUrlRef = ref("");
    const max = ref(props.max);
    const disabled = computed(() => {
      return props.disabled
    });
    const isAvatar = ref(props.isAvatar);
    const avatarStyle = {
      justifyContent: "center",
      alignItems: "center",
      borderRadius: "50%",
      width: "100%",
      display: "flex"
    };
    function handlePreview(file) {
      const { url } = file;
      previewImageUrlRef.value = url;
      showModalRef.value = true;
    }
    return {
      max, isAvatar, avatarStyle, disabled,
      handlePreview,
      showModal: showModalRef,
      previewImageUrl: previewImageUrlRef,
      previewFileList: ref([
        {
          id: "react",
          name: "我是react.png",
          status: "finished",
          url: "https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
        }
      ])
    };
  }
});
</script>

<style scoped>
.avatar {
  justify-content: center;
  align-items: center;
}
</style>