import { defineStore } from 'pinia';
import { useAppStore } from './app';
import { useUserStore } from './user';

export const useStore = defineStore('store', () => {
  const appStore = useAppStore();
  const userStore = useUserStore();
  function resetStore() {
    appStore.$reset();
    userStore.$reset();
  }
  return { resetStore };
});
