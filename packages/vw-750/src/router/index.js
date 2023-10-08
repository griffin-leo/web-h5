import { createRouter, createWebHashHistory } from 'vue-router';

const modules = {
  Home: () => import('_page/home/index.vue'),
  Mine: () => import('_page/mine/index.vue')
};

const routes = [
  {
    path: '/',
    name: 'Root',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: modules.Home,
    meta: {
      title: '首页',
      keepAlive: true
    }
  },
  {
    path: '/mine',
    name: 'Mine',
    component: modules.Mine,
    meta: {
      title: '我的',
      keepAlive: true
    }
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior: (to, from, savedPosition) => {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  }
});

// 路由跳转处理逻辑
router.beforeEach(async (to, from, next) => {
  // 页面导航栏标题
  if (to?.meta?.title) {
    document.title = to.meta.title; // 设置网页标题
    if (to?.query?.navTitle) {
      // setNavTitle(to.query.navTitle);
    } else {
      // setNavTitle(to.meta.title);
    }
  } else {
    document.title = 'demo'; // 设置网页标题
  }
  const queryToken = to?.query?.token; // 单点跳转的用户token
  const no_check_login = []; //不需要登录页面
  // 单点登录跳转
  if (queryToken) {
    // setUserInfo({ token: queryToken });
  }
  if (queryToken && !no_check_login.includes(to.path)) {
    // 获取用户信息
    next();
  } else {
    //不需要登录页面
    if (no_check_login.includes(to.path)) {
      next();
    } else {
      // const userToken = userInfo.value ? userInfo.value.token : '';
      // if (!userToken || userToken === '') {
      //   next({
      //     path: '/index'
      //   });
      // } else {
      next();
      // }
    }
  }
});

export default router;
