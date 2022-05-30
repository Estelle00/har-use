<template>
  <a-space>
    <span>Username：</span>
    <span>{{ !loading ? data : "loading..." }}</span>
  </a-space>
</template>

<script setup lang="ts">
import { useRequest } from "@har/use";
function getUsername() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("张三");
    }, 1000);
  });
}
const { data, error, loading } = useRequest(getUsername);
</script>

<style scoped lang="less"></style>
