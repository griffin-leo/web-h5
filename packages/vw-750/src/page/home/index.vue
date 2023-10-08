<template>
  <div class="page page__bg_theme layout__body-tabbar--bottom">
    <Header left-arrow></Header>
    <MySearch
      background="#50C341"
      content-background="#FFFFFF"
      placeholder="搜索感兴趣的课程或视频"
      readonly
    />
  </div>
</template>
<script setup>
import MySearch from '_com/search/index.vue';
import { watch, onMounted, getCurrentInstance, inject } from 'vue';
import { storeToRefs } from 'pinia';
import { useAppStore } from '@/store/app';

const { appContext } = getCurrentInstance();
const { dayjs } = inject('dayjs');

const appStore = useAppStore();
const { isReadyJsBridge } = storeToRefs(appStore);

watch(
  isReadyJsBridge,
  newVal => {
    // JsBridge桥链接初始化完毕
    if (newVal) {
      const jsBridge = appContext.config.globalProperties.$jsBridge;
      console.log('jsBridge：', jsBridge);
    }
  },
  { immediate: true }
);

onMounted(() => {
  console.log('dayjs：', dayjs().format('YYYY-MM-DD HH:mm:ss'));
});
</script>
<style lang="less" scoped></style>
