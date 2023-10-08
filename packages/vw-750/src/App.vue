<template>
  <div class="app">
    <router-view v-slot="{ Component, route }">
      <keep-alive>
        <component
          :is="Component"
          v-if="route.meta.keepAlive"
          :key="route.path"
        ></component>
      </keep-alive>
      <component :is="Component" v-if="!route.meta.keepAlive"></component>
    </router-view>
    <MyTabbar />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import MyTabbar from '_com/tabbar/index.vue';
import { isIOS } from '@/utils/common';

const flag = ref(false);
const myFunction = ref(null);
onMounted(() => {
  if (isIOS()) {
    document.body.addEventListener('focusin', () => focusinHandler());
    document.body.addEventListener('focusout', () => focusoutHandler());
  }
});

onUnmounted(() => {
  if (isIOS()) {
    document.body.removeEventListener('focusin', () => focusinHandler());
    document.body.removeEventListener('focusout', () => focusoutHandler());
  }
});

const focusinHandler = () => {
  //软键盘弹起事件
  flag.value = true;
  myFunction.value && clearTimeout(myFunction.value);
};

const focusoutHandler = () => {
  //软键盘关闭事件
  flag.value = false;
  if (!flag.value) {
    myFunction.value = setTimeout(function () {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' }); //重点  =======当键盘收起的时候让页面回到原始位置(这里的top可以根据你们个人的需求改变，并不一定要回到页面顶部)
    }, 200);
  }
};
</script>

<style>
@import '_css/configProvider.css';
</style>
<style lang="less">
html {
  height: 100%;
}
body {
  height: 100%;
}
#app {
  width: 100vw;
  height: 100vh;
}
.app {
  width: 100vw;
  height: 100vh;
}
.loading-wrap {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 900;
}
</style>
