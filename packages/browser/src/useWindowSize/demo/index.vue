<template>
  <a-space direction="vertical">
    <span>视窗宽度：{{ width }}</span>
    <span>视窗高度：{{ height }}</span>
  </a-space>
</template>

<script setup lang="ts">
import { useWindowSize } from "@har/use";
const { width, height } = useWindowSize();
</script>
