<template>
  <a-space>
    <span>username：</span>
    <span v-if="error">{{ error.message }}</span>
    <span v-else-if="loading">loading...</span>
    <span v-else>{{ data }}</span>
  </a-space>
</template>

<script setup lang="ts">
import { useRequest } from "@har/use";
function getUsername() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.5) {
        resolve("张三");
      } else {
        reject(new Error("数据获取失败"));
      }
    }, 1000);
  });
}
const { data, error, loading } = useRequest(getUsername);
</script>
