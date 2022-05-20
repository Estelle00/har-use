<template>
  <a-alert>查看控制台输出</a-alert>
</template>
<script setup lang="ts">
import { useEventListener } from "@har/use";

useEventListener("resize", () => {
  console.log("window resize");
});
useEventListener(
  "click",
  () => {
    console.log("click body");
  },
  {
    target: document.body,
  }
);
</script>
