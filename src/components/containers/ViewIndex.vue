<template>
  <Transition name="fade">
    <RouterView></RouterView>
  </Transition>
</template>

<script setup>
import { RouterView } from 'vue-router';
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 1s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>