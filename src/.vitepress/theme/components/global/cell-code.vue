<template>
  <div class="cell-code">
    <div class="cell-code-operation">
      <a-tooltip :content="showCode ? '收起代码' : '展开代码'">
        <a-button
          :class="[
            'cell-code-operation-btn',
            {
              ['cell-code-operation-btn-active']: showCode,
            },
          ]"
          shape="circle"
          size="small"
          @click="handleClick"
        >
          <template #icon>
            <icon-code />
          </template>
        </a-button>
      </a-tooltip>
      <a-tooltip content="复制代码">
        <a-button
          class="cell-code-operation-btn"
          shape="circle"
          size="small"
          @click="handleClickCopy"
        >
          <icon-copy />
        </a-button>
      </a-tooltip>
      <!--      <a-tooltip content="在CodeSandbox打开">-->
      <!--        <a-button-->
      <!--          class="cell-code-operation-btn"-->
      <!--          shape="circle"-->
      <!--          size="small"-->
      <!--          @click="handleClickCodeSandbox"-->
      <!--        >-->
      <!--          <icon-code-sandbox />-->
      <!--        </a-button>-->
      <!--      </a-tooltip>-->
    </div>
    <div ref="contentRef" class="cell-code-content" :style="style">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "CellCode",
});
</script>
<script setup lang="ts">
import { computed, CSSProperties, ref } from "vue";
import copy from "../../utils/clipboard";
import { Message } from "@arco-design/web-vue";
const showCode = ref(false);
const contentRef = ref<HTMLElement>();
const style = computed<CSSProperties>(() => {
  if (showCode.value) {
    const height = contentRef.value?.firstElementChild?.clientHeight;
    return {
      height: height ? height + "px" : "auto",
    };
  }
  return { height: 0, marginTop: 0 };
});
function handleClick() {
  showCode.value = !showCode.value;
}
const textContext = computed(() => contentRef.value?.textContent);
// function handleClickCodeSandbox() {
//   if (textContext.value) {
//     openCodeSandbox(textContext.value)
//   }
// }
function handleClickCopy() {
  if (textContext.value) {
    copy(textContext.value)
      .then(() => Message.success("复制成功！"))
      .catch(() => Message.error("复制失败，请重试！"));
  }
}
</script>
<style scoped lang="less">
.cell-code {
  margin-top: 10px;
  &-content {
    margin-top: 10px;
    overflow-y: hidden;
    transition: all 200ms;
    :slotted(div[class*='language-']) {
      margin: 0;
    }
  }

  &-operation {
    display: flex;
    justify-content: flex-end;

    & &-btn {
      margin-left: 8px;
      background-color: var(--color-bg-4);
      border: 1px solid var(--color-fill-3);

      &:hover {
        color: rgb(var(--primary-6));
        border-color: rgb(var(--primary-6));
      }

      &-active {
        color: rgb(var(--gray-1));
        background-color: rgb(var(--gray-10));
        border-color: rgb(var(--gray-1));

        &:hover {
          color: rgb(var(--gray-1));
          background-color: rgb(var(--gray-10));
          border-color: rgb(var(--gray-1));
        }
      }
    }
  }
}
</style>
