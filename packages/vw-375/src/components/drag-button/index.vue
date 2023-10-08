<template>
  <div
    ref="dragRef"
    class="draggable-button"
    :style="{
      top: `${buttonPosition.top}px`,
      left: `${buttonPosition.left}px`,
      display: show ? 'block' : 'none'
    }"
    @touchstart.passive="startDrag"
    @touchmove.prevent="drag"
    @touchend="endDrag"
    @click.stop="handleBack"
  >
    <i class="back-btn"></i>
  </div>
</template>

<script setup>
import { ref, reactive, watch, nextTick } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const dragRef = ref(null);
const show = ref(false);
const buttonPosition = reactive({
  top: 0,
  left: 0
});
const startPoint = reactive({
  x: 0,
  y: 0
});

// 当路由更改时重置位置信息
watch(
  () => route.name,
  newName => {
    if (['Index', 'Record', ''].includes(newName)) {
      show.value = false;
    } else {
      show.value = true;
    }
    nextTick(() => {
      const elWidth = dragRef.value.offsetWidth;
      buttonPosition.top = window.innerHeight - 214;
      buttonPosition.left = window.innerWidth - (elWidth + 15);
      startPoint.x = 0;
      startPoint.y = 0;
    });
  },
  { immediate: true }
);
const startDrag = event => {
  const touch = event.changedTouches[0];
  startPoint.x = touch.clientX - buttonPosition.left;
  startPoint.y = touch.clientY - buttonPosition.top;
};

const drag = event => {
  const touch = event.changedTouches[0];
  const newLeft = touch.clientX - startPoint.x;
  const newTop = touch.clientY - startPoint.y;

  const pageWidth = window.innerWidth;
  const pageHeight = window.innerHeight;
  const buttonWidth = event.target.offsetWidth;
  const buttonHeight = event.target.offsetHeight;

  const minX = 15; // 按钮左侧到页面左侧最小距离
  const minY = 15; // 按钮顶部到页面顶部最小距离
  const maxX = pageWidth - buttonWidth - 15; // 按钮右侧到页面右侧最大距离
  const maxY = pageHeight - buttonHeight - 15; // 按钮底部到页面底部最大距离

  buttonPosition.left = Math.max(Math.min(newLeft, maxX), minX);
  buttonPosition.top = Math.max(Math.min(newTop, maxY), minY);
};

const endDrag = () => {
  // 拖动结束后的操作，可以进行相应的处理
};

const handleBack = () => {
  router.go(-1);
};
</script>

<style lang="less" scoped>
.draggable-button {
  width: 44px;
  height: 44px;
  position: fixed;
  z-index: 9999;
  .back-btn {
    display: inline-block;
    width: 44px;
    height: 44px;
    .bg-image('_img/global/icon-fh');
  }
}
</style>
