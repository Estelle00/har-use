<template>
  <div class="demo" ref="demo">
    <div ref="btn">
      <a-button type="primary">按钮</a-button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useClickAway } from "@har/use";
import { ref } from "vue";
const btn = ref<Element>();
const demo = ref<Element>();
useClickAway(
  btn,
  (event) => {
    if (demo.value!.contains(event.target as Node)) {
      console.log("contextmenu outside!");
      event.preventDefault();
    }
  },
  {
    eventName: "contextmenu",
  }
);
</script>
<style scoped lang="less">
.demo {
  padding: 50px;
}
</style>
