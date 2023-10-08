import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useAppStore = defineStore('app', () => {
  const navTitle = ref('');
  function setNavTitle(res) {
    navTitle.value = res;
  }

  const tabBarHeight = ref(49);
  function setTabBarHeight(res) {
    tabBarHeight.value = res;
  }

  const isReadyJsBridge = ref(false);
  function setIsReadyJsBridge(res) {
    isReadyJsBridge.value = res;
  }
  return {
    navTitle,
    setNavTitle,
    tabBarHeight,
    setTabBarHeight,
    isReadyJsBridge,
    setIsReadyJsBridge
  };
});
