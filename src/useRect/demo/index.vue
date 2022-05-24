<template>
  <div ref="btn">
    <a-button type="primary" @click="getRect">获取当前元素信息</a-button>
  </div>
  {{ rect }}
</template>
<script setup lang="ts">
import { useRect } from "@har/use";
import { ref } from "vue";
const rect = ref<DOMRect>();
const btn = ref();
function getRect() {
  rect.value = useRect(btn);
}
</script>
