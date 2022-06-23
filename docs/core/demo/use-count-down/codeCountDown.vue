<template>
  <a-input class="input">
    <template #append>
      <a-button type="primary" @click="getCode">{{ text }}</a-button>
    </template>
  </a-input>
</template>

<script setup lang="ts">
import { useCountDown } from "@har-use/core";
import { computed } from "vue";
import { Message } from "@arco-design/web-vue";
const remain = 10000;
const { start, current, reset } = useCountDown({
  // 倒计时 24 小时
  time: remain,
});
const status = computed(() => current.value.total < remain);
const text = computed(() => {
  return !status.value
    ? "获取验证码"
    : Math.ceil(current.value.total / 1000) + "S后重新获取";
});
function ajax() {
  return new Promise<void>((resolve, reject) => {
    setTimeout(() => {
      const random = Math.floor(Math.random() * 10);
      random % 2 === 1 ? resolve() : reject("请求失败");
    }, 2000);
  });
}
async function getCode() {
  if (status.value) return;
  try {
    start();
    await ajax();
  } catch (e) {
    Message.error(e as string);
    reset();
  }
}
</script>
<style scoped lang="less">
.input {
  :deep(.arco-input-append) {
    padding: 0;
  }
}
</style>
