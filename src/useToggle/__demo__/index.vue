<template>
  <div>{{ show }}</div>
  <a-button type="primary" @click="toggle()">切换</a-button>
</template>
<script setup lang="ts">
import { useToggle } from "@har/use";
const [show, toggle] = useToggle(false);
</script>
