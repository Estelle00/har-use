<template>
  <a-form auto-label-width :model="{}">
    <a-form-item label="姓名">
      <a-input v-model="state.name" />
    </a-form-item>
    <a-form-item label="地址">
      <a-input v-model="state.address" />
    </a-form-item>
  </a-form>
  <pre lang="json">{{ state1 }}</pre>
</template>
<script setup lang="ts">
import { useStorage } from "@har/use";
const state = useStorage(
  "use-local-storage",
  {
    name: "张三",
    address: "成都",
  },
  {
    setItem(key, value) {
      localStorage.setItem(key, value);
    },
    getItem(key) {
      return localStorage.getItem(key);
    },
    removeItem(key) {
      localStorage.removeItem(key);
    },
  }
);
const state1 = useStorage(
  "use-local-storage",
  {
    name: "张三",
    address: "成都",
  },
  {
    setItem(key, value) {
      localStorage.setItem(key, value);
    },
    getItem(key) {
      return localStorage.getItem(key);
    },
    removeItem(key) {
      localStorage.removeItem(key);
    },
  }
);
</script>
