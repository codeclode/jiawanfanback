<template>
  <n-space vertical>
    <n-layout style="width: 80%; margin: 0 auto;">
      <n-card>
        <n-carousel effect="card" show-arrow prev-slide-style="transform: translateX(-150%) translateZ(-800px);"
          next-slide-style="transform: translateX(50%) translateZ(-800px);" style="height: 240px" :show-dots="false">
          <n-carousel-item :style="{ width: '60%' }">
            <img class="carousel-img" src="/swiper1.png">
          </n-carousel-item>
          <n-carousel-item :style="{ width: '60%' }">
            <img class="carousel-img" src="/swiper2.png">
          </n-carousel-item>
          <n-carousel-item :style="{ width: '60%' }">
            <img class="carousel-img" src="/swiper3.png">
          </n-carousel-item>
        </n-carousel>
      </n-card>
    </n-layout>
    <n-layout style="width: 80%; margin: 0 auto;text-align: center;font-weight: bolder;">
      <n-gradient-text type="info" style="text-align: center;font-weight: bolder;" :size="32"
        :gradient="{from: '#aaf',to: '#f0d2c5'}">
        嘉晚饭餐饮后台管理系统
      </n-gradient-text>
    </n-layout>
    <n-layout style="width: 80%; margin: 0 auto;text-align: center;font-weight: bolder;">
      嗯嗯，就是个占位的首页，李傲松自己也不知道要写啥
      <br />
      关注向晚谢谢喵~
    </n-layout>
  </n-space>
</template>

<style scoped>
.carousel-img {
  margin: 0 auto;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>