<script setup>
import { NConfigProvider, NMessageProvider } from 'naive-ui'
import BackApp from './components/BackApp.vue';
/**
 * js 文件下使用这个做类型提示
 * @type import('naive-ui').GlobalThemeOverrides
 */
const themeOverrides = {
  "common": {
    "primaryColor": "#AAAAFFFF",
    "primaryColorHover": "#B2B2E1FF",
    "primaryColorPressed": "#7070EEFF",
    "primaryColorSuppl": "#A1A1D3FF",
    "infoColor": "#cc657bFF",
    "infoColorHover": "#edb7a1FF",
    "infoColorPressed": "#EDA1B2FF",
    "infoColorSuppl": "#eda1d7FF"
  }
}
  // ...
</script>

<template>
  <n-config-provider :theme-overrides="themeOverrides">
    <n-message-provider>
      <back-app />
    </n-message-provider>
  </n-config-provider>
</template>