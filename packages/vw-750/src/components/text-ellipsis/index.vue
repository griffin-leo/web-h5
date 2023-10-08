<template>
  <div ref="textOverflow" class="text-overflow" :style="boxStyle">
    <span ref="overEllipsis">{{ realText }}</span>
    <span v-if="showSlotNode" ref="slotRef" class="slot-box">
      <slot :click-toggle="toggle" :expanded="expanded"></slot>
    </span>
  </div>
</template>

<script setup>
import { onMounted, ref, computed, nextTick } from 'vue';
let props = defineProps({
  text: { type: String, default: '' },
  maxLines: {
    type: Number,
    default: 2
  },
  width: {
    type: Number,
    default: 0
  }
});

let offset = ref(props.text.length);
let expanded = ref(false);
let slotBoxWidth = ref(0);
let textBoxWidth = ref(props.width);
let showSlotNode = ref(false);
let overEllipsis = ref();
let slotRef = ref();
let textOverflow = ref();
let boxStyle = computed(() => {
  //   if (props.width) {
  //     return {
  //       width: props.width + 'px'
  //     };
  //   } else {
  //     return {};
  //   }
  return {
    width: '100%'
  };
});
let realText = computed(() => {
  const isCutOut = offset.value !== props.text.length;
  let realText = props.text;
  if (isCutOut && !expanded.value) {
    realText = props.text.slice(0, offset.value) + '...';
  }
  return realText;
});
const getLines = () => {
  const clientRects = overEllipsis.value.getClientRects();
  return {
    len: clientRects.length,
    lastWidth: clientRects[clientRects.length - 1].width
  };
};
const isOverflow = () => {
  const { len, lastWidth } = getLines();
  if (len < props.maxLines) {
    return false;
  }
  if (props.maxLines) {
    // 超出部分 行数 > 最大行数 或则  已经是最大行数但最后一行宽度 + 后面内容超出正常宽度
    const lastLineOver = !!(
      len === props.maxLines &&
      lastWidth + slotBoxWidth.value > textBoxWidth.value
    );
    if (len > props.maxLines || lastLineOver) {
      return true;
    }
  }
  return false;
};
const calculateOffset = (from, to) => {
  nextTick(() => {
    if (Math.abs(from - to) <= 1) return;
    if (isOverflow()) {
      to = offset.value;
    } else {
      from = offset.value;
    }
    offset.value = Math.floor((from + to) / 2);
    calculateOffset(from, to);
  });
};

const toggle = () => {
  expanded.value = !expanded.value;
};

onMounted(() => {
  const { len } = getLines();
  if (len > props.maxLines) {
    showSlotNode.value = true;
    nextTick(() => {
      slotBoxWidth.value = slotRef.value.clientWidth;
      textBoxWidth.value = textOverflow.value.clientWidth;
      calculateOffset(0, props.text.length);
    });
  }
});
</script>

<style lang="less" scoped>
.slot-box {
  display: inline-block;
  text-indent: 0;
  /* color: #3333; */
}
</style>
