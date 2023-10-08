import { createApp, defineAsyncComponent } from 'vue';
import App from './App.vue';
import { pinia } from './store/pinia';
import { useAppStore } from './store/app';
import router from './router';
import dayjs from 'dayjs';
import Bridge from './plugins/jsBridge/Bridge';
import '@vant/touch-emulator';
import { Lazyload, Toast } from 'vant';
import 'vant/lib/index.css';
import 'vant/es/toast/style';
import 'vant/es/dialog/style';
import 'vant/es/notify/style';
import 'vant/es/image-preview/style';

const Header = defineAsyncComponent(() => import('_com/header/index.vue'));

const app = createApp(App);
app.provide('dayjs', { dayjs }); // 全局使用dayjs
app.use(pinia);
app.use(router);
app.use(Bridge, {
  ready() {
    console.log('桥链接初始化完毕', '<<<--- ');
    const appStore = useAppStore(pinia);
    const { setIsReadyJsBridge } = appStore;
    setIsReadyJsBridge(true);
  }
});
app.use(Lazyload, {
  lazyComponent: true
});
app.use(Toast);
app.component('Header', Header);
app.mount('#app');
