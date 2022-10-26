<template>
  <n-grid x-gap="12" :cols="2">
    <n-gi>
      <n-card title="开发者信息" class="info" size="huge" :hoverable="true">
        <img class="carousel-img" src="/swiper2.png">
        <div class="infoItem">
          <n-icon size="40">
            <DatabasePerson24Regular />
          </n-icon>
          <span>
            姓名：李傲松
          </span>
        </div>
        <div class="infoItem">
          <n-icon size="40">
            <BowlChopsticks28Regular />
          </n-icon>
          <span>
            职业：顶碗人
          </span>
        </div>
        <div class="infoItem">
          <n-icon size="40">
            <PhonePagination24Regular />
          </n-icon>
          <span>
            电话：13853849013
          </span>
        </div>
        <div class="infoItem">
          <n-icon size="40">
            <Mail48Regular />
          </n-icon>
          <span>
            邮箱：PeterLi12138@aliyun.com
          </span>
        </div>
      </n-card>
    </n-gi>
    <n-gi>
      <n-card title="关于用到的技术" size="huge" :hoverable="true">
        <n-collapse :default-expanded-names="['2', '1']">
          <n-collapse-item title="小程序前台" name="1">
            <div>uniapp</div>
            <div>uView</div>
            <div>官方提供的导航模板</div>
            <div>微信小程序</div>
          </n-collapse-item>
          <n-collapse-item title="浏览器后台" name="2">
            <div>Vue3以及配套路由和状态管理插件</div>
            <div>highcharts</div>
            <div>axios</div>
            <div>Naive UI</div>
            <div>Vite</div>
          </n-collapse-item>
          <n-collapse-item title="后端" name="3">
            <div>springboot</div>
            <div>MySQL</div>
            <div>Mybatis</div>
            <div>Redis</div>
            <div>JWT</div>
          </n-collapse-item>
        </n-collapse>
      </n-card>
    </n-gi>
  </n-grid>
</template>

<script setup>
import {
  DatabasePerson24Regular,
  Mail48Regular,
  PhonePagination24Regular,
  BowlChopsticks28Regular
} from '@vicons/fluent';
</script>

<style scoped>
.carousel-img {
  display: block;
  margin: 0 auto;
  width: 90%;
  object-fit: contain;
  outline: 3px solid rgba(93, 182, 223, 0.9);
  border-radius: 10px;
}


.infoItem {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 10px;
}

.infoItem>span {
  text-indent: 5px;
}
</style>