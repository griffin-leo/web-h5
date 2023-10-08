<template>
  <VanConfigProvider :theme-vars="themeVars">
    <VanTabbar
      v-show="ifTabShow"
      id="tabBarRef"
      v-model="active"
      class="tabbar-shadow"
      active-color="#333333"
      inactive-color="#B4B4B4"
      :border="false"
      safe-area-inset-bottom
      route
    >
      <VanTabbarItem to="/home">
        <span>首页</span>
        <template #icon="props">
          <i
            class="tabbar-item-icon"
            :class="[props.active ? 'icon-index-active' : 'icon-index']"
          ></i>
        </template>
      </VanTabbarItem>
      <VanTabbarItem to="/mine">
        <span>我的</span>
        <template #icon="props">
          <i
            class="tabbar-item-icon"
            :class="[props.active ? 'icon-study-active' : 'icon-study']"
          ></i>
        </template>
      </VanTabbarItem>
    </VanTabbar>
  </VanConfigProvider>
</template>

<script setup>
import { ref, computed, nextTick, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useAppStore } from '@/store/app';
import {
  Tabbar as VanTabbar,
  TabbarItem as VanTabbarItem,
  ConfigProvider as VanConfigProvider
} from 'vant';
const route = useRoute();
const store = useAppStore();
const { setTabBarHeight } = store;

const ifTabShow = computed(() => {
  let iftabshow = false;
  if (['Home', 'Mine'].includes(route.name)) {
    iftabshow = true;
  }
  return iftabshow;
});
const active = ref(0);
const themeVars = {};
watch(ifTabShow, val => {
  val &&
    nextTick(() => {
      const tabBarRef = document.getElementById('tabBarRef');
      if (tabBarRef) {
        const tabBarRefHeight = tabBarRef.getBoundingClientRect().height;
        tabBarRefHeight && setTabBarHeight(tabBarRefHeight);
      }
    });
});
</script>

<style lang="less" scoped>
.van-tabbar {
  height: 98px !important;
  .van-tabbar-item {
    margin-top: 8px;
  }
  .van-tabbar-item .van-tabbar-item__text {
    transform: scale(0.83);
  }
}
.tabbar-shadow {
  box-shadow: 0px 0px 30px 0px rgba(51, 51, 51, 0.1);
  .van-tabbar-item__icon {
    display: flex;
    justify-content: center;
    align-items: flex-end;
  }
  .tabbar-item-icon {
    display: inline-block;
    width: 44px;
    height: 44px;
    &.icon-index {
      .bg-image('_img/global/icon-sy-h');
    }
    &.icon-index-active {
      .bg-image('_img/global/icon-sy');
    }
    &.icon-study {
      .bg-image('_img/global/icon-jl-h');
    }
    &.icon-study-active {
      .bg-image('_img/global/icon-jl-y');
    }
  }
}
</style>
