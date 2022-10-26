<template>
  <n-result status="404" title="404 资源不存在（也可能铸币作者忘了配置路由了）" size="huge" description="生活总归带点荒谬，也许🐽向晚可以让你开心一下">
    <template #footer>
      <n-button @click="liu">去溜一下小向晚吧</n-button>
    </template>
  </n-result>
</template>

<script setup>
function liu() {
  window.open("https://search.bilibili.com/all?keyword=%E5%90%91%E6%99%9A", "__blank")
}
</script>

<style>

</style>