<template>
  <a-space>
    <a-typography-text>状态:</a-typography-text>
    <a-button type="primary" @click="toggle()">切换</a-button>
    <a-switch v-model="show" />
    <a-tag v-if="show" color="arcoblue">Tag</a-tag>
  </a-space>
</template>
<script setup lang="ts">
import { useToggle } from "@har/use";
const [show, toggle] = useToggle(false);
</script>
