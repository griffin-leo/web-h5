<template>
  <div v-show="!hideNav" ref="header" class="page__header">
    <ConfigProvider :theme-vars="themeVars">
      <NavBar
        :left-arrow="leftArrow"
        :left-text="leftText"
        :title="getNavTitle"
        :right-text="rightText"
        :border="border"
        :fixed="fixed"
        :placeholder="placeholder"
        :z-index="zIndex"
        :safe-area-inset-top="safeAreaInsetTop"
        @click-left="onClickLeft"
        @click-right="onClickRight"
      >
        <template #left>
          <template v-if="leftArrow">
            <i class="icon-left-arrow"></i>
          </template>
          <template v-else>
            <slot name="left"></slot>
          </template>
        </template>
        <template #right>
          <slot name="right"></slot>
        </template>
      </NavBar>
    </ConfigProvider>
  </div>
</template>

<script>
export default {
  name: 'Header'
};
</script>

<script setup>
import { ref, computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import { useAppStore } from '@/store/app';
import { NavBar, ConfigProvider } from 'vant';
import { isApp, isWx } from '@/utils/common';

const props = defineProps({
  // 标题
  title: {
    type: String,
    default: ''
  },
  // left-text
  // 左侧文案
  leftText: {
    type: String,
    default: ''
  },
  // right-text
  // 右侧文案
  rightText: {
    type: String,
    default: ''
  },
  // left-arrow
  // 是否显示左侧箭头
  leftArrow: {
    type: Boolean,
    default: false
  },
  // 是否显示下边框
  border: {
    type: Boolean,
    default: false
  },
  // 是否固定在顶部
  fixed: {
    type: Boolean,
    default: true
  },
  // 固定在顶部时，是否在标签位置生成一个等高的占位元素
  placeholder: {
    type: Boolean,
    default: false
  },
  // 导航栏 z-index
  zIndex: {
    type: Number || String,
    default: 1000
  },
  // safe-area-inset-top
  // 是否开启顶部安全区适配
  safeAreaInsetTop: {
    type: Boolean,
    default: false
  },
  // handle-back
  // 是否开启手动添加返回
  handleBack: {
    type: Boolean,
    default: false
  },
  // background-color
  backgroundColor: {
    type: String,
    default: 'var(--fs-bg-white)'
  }
});

const emit = defineEmits(['clickLeft', 'clickRight']);

const appStore = useAppStore();
const { navTitle } = storeToRefs(appStore);

const router = useRouter();

const header = ref(null);

const hideNav = computed(() => isApp() || isWx());

const themeVars = ref({
  navBarBackgroundColor: props.backgroundColor,
  navBarHeight: 'var(--fs-nav-bar-height)',
  navBarTitleFontSize: 'var(--fs-nav-bar-title-font-size)',
  navBarTitleTextColor: 'var(--van-black-1)'
});
const getNavTitle = computed(() => {
  if (props.title) {
    return props.title;
  } else {
    return navTitle.value;
  }
});
const onClickLeft = () => {
  if (props.handleBack) {
    emit('clickLeft');
  } else {
    router.go(-1);
  }
};
const onClickRight = () => emit('clickRight');

defineExpose({
  header
});
</script>

<style scoped lang="less">
@fs-nav-bar-height: 88px;
@fs-nav-bar-title-font-size: 34px;
.icon-left-arrow {
  display: block;
  width: 20px;
  height: 34px;
  .bg-image('_img/global/icon-back');
}
</style>
