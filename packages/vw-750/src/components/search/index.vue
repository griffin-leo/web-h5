<template>
  <form :action="action">
    <VanConfigProvider :theme-vars="themeVars">
      <VanSearch
        v-model="searchVal"
        class="my-search"
        name="search"
        :shape="shape"
        :background="background"
        :maxlength="maxlength"
        :placeholder="placeholder"
        :clear-icon="clearIcon"
        :show-action="showAction"
        :autofocus="autofocus"
        :readonly="readonly"
        @update:model-value="onInput"
        @focus="onFocus"
        @blur="onBlur"
        @click-input="onClickInput"
        @search="onSearch"
        @cancel="onCancel"
        @clear="onClear"
      >
        <template #left-icon>
          <i class="fs-icon fs-icon-search"></i>
        </template>
        <template #action>
          <div @click="onClickButton">{{ actionText }}</div>
        </template>
      </VanSearch>
    </VanConfigProvider>
  </form>
</template>

<script setup>
import { ref, computed, nextTick } from 'vue';
import { Search as VanSearch, ConfigProvider as VanConfigProvider } from 'vant';
import clearIcon from '_img/global/icon-close@2x.png';

const action = '/'; // 在 van-search 外层增加 form 标签，且 action 不为空，即可在 iOS 输入法中显示搜索按钮。

const props = defineProps({
  // 当前输入的值
  modelValue: {
    type: [String, Number],
    default: ''
  },
  // 搜索框形状，可选值为 square 默认值为 round
  shape: {
    type: String,
    default: 'round'
  },
  // 搜索框外部背景色
  background: {
    type: String,
    default: '#ffffff'
  },
  // 输入的最大字符数
  maxlength: {
    type: [Number, String],
    default: 100
  },
  // 占位提示文字
  placeholder: {
    type: String,
    default: '请输入搜索关键词'
  },
  // 是否在搜索框右侧显示取消按钮
  showAction: {
    type: Boolean,
    default: false
  },
  // 是否自动聚焦，iOS 系统不支持该属性
  autofocus: {
    type: Boolean,
    default: false
  },
  // 是否将输入框设为只读状态，只读状态下无法输入内容
  readonly: {
    type: Boolean,
    default: false
  },
  // 搜索框内部背景色
  contentBackground: {
    type: String,
    default: 'var(--fs-gray-1)'
  },
  // 搜索框右侧取消按钮的字体颜色
  actionTextColor: {
    type: String,
    default: 'var(--van-text-color)'
  }
});

const emit = defineEmits([
  'update:modelValue',
  'clickInput',
  'search',
  'cancel',
  'clear'
]);

const contentBg = computed(() => props.contentBackground);
const themeVars = ref({
  searchPadding: 'var(--fs-search-padding)',
  searchContentBackground: props.contentBackground,
  searchInputHeight: 'var(--fs-search-input-height)',
  searchLabelPadding: 'var(--fs-search-label-padding)',
  searchLabelColor: 'var(--van-text-color)',
  searchLabelFontSize: 'var(--van-font-size-lg)',
  searchLeftIconColor: 'var(--van-gray-6)',
  searchActionPadding: 'var(--fs-search-action-padding)',
  searchActionTextColor: props.actionTextColor,
  searchActionFontSize: 'var(--van-font-size-lg)'
});

const actionText = ref('取消');
const searchVal = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    actionText.value = value ? '搜索' : '取消';
    emit('update:modelValue', value);
  }
});

// 修复组件的clear事件方法失效问题
const onClick = e => {
  e.stopPropagation();
};
const onInput = val => {
  emit('update:modelValue', val);
  if (val) {
    nextTick(() => {
      document
        .querySelector?.('.my-search .van-field__clear')
        ?.addEventListener?.('click', onClick, false);
    });
  }
};
const onFocus = () => {
  if (searchVal.value) {
    nextTick(() => {
      document
        .querySelector?.('.my-search .van-field__clear')
        ?.addEventListener?.('click', onClick, false);
    });
  }
};
const onBlur = () => {
  if (searchVal.value) {
    document
      .querySelector?.('.my-search .van-field__clear')
      ?.removeEventListener?.('click', onClick);
  }
};
const onClickInput = () => {
  emit('clickInput');
};
const onSearch = val => {
  actionText.value = '取消';
  emit('search', val);
};
const onCancel = () => {
  emit('cancel');
  document
    .querySelector?.('.my-search .van-field__clear')
    ?.removeEventListener?.('click', onClick);
};
const onClear = () => {
  emit('clear');
  document
    .querySelector?.('.my-search .van-field__clear')
    ?.removeEventListener?.('click', onClick);
};
const onClickButton = () => {
  if (searchVal.value && actionText.value == '搜索') {
    onSearch(searchVal.value);
  } else {
    onCancel();
  }
};
</script>

<style lang="less" scoped>
.fs-icon-search {
  display: block;
  width: 32px;
  height: 32px;
  .bg-image('_img/global/icon-search');
}
:deep(.my-search) {
  align-items: center;
}
.my-search :deep(.van-field__control) {
  line-height: 1;
  font-size: 28px;
}
.my-search :deep(.van-field__left-icon) {
  margin-right: 21px;
}
.my-search :deep(.van-field__clear img) {
  width: 36px;
  height: 36px;
}
.my-search :deep(.van-search__action[role='button']:hover) {
  background: transparent;
}
.my-search :deep(.van-search__action[role='button']:focus) {
  background: transparent;
}
.my-search :deep(.van-search__action[role='button']:active) {
  background: transparent;
}
.my-search :deep(input) {
  background: v-bind(contentBg);
}
.my-search :deep(input:-internal-autofill) {
  box-shadow: 0 0 0 2000px v-bind(contentBg) inset !important;
}
.my-search :deep(input:-internal-autofill-previewed) {
  box-shadow: 0 0 0 2000px v-bind(contentBg) inset !important;
}
.my-search :deep(input:-internal-autofill-selected) {
  box-shadow: 0 0 0 2000px v-bind(contentBg) inset !important;
}
</style>
