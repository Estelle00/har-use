<template>
  <a-space>
    <a-input v-model="formData.text" />
    <a-button @click="publish">发布</a-button>
    <a-button @click="add" type="primary">添加一个订阅</a-button>
    <a-button @click="remove" type="primary" status="danger"
      >删除一个订阅</a-button
    >
  </a-space>
</template>

<script setup lang="ts">
import { EventHookOff, useEventHook } from "@har/use";
import { reactive } from "vue";
const formData = reactive({
  text: "111",
});
const { on, trigger } = useEventHook<typeof formData>();
function publish() {
  trigger(formData);
}
const listeners: EventHookOff[] = [];
function add() {
  const index = listeners.length;
  const listener = on((t) => {
    console.log("当前下标" + index + "订阅数据为：", t);
  });
  listeners.push(listener);
}
function remove() {
  if (listeners.length > 0) {
    const listener = listeners.pop()!;
    listener();
  }
}
</script>
