<template>
  <a-space direction="vertical">
    <a-space>
      <span>username：</span>
      <span>{{ data?.username }}</span>
    </a-space>
    <a-input v-model="formData.username" placeholder="编辑username" />
    <a-button :loading="loading" @click="onChange">修改</a-button>
  </a-space>
</template>

<script setup lang="ts">
import { useRequest } from "@har/use";
import { shallowReactive } from "vue";
import { Message } from "@arco-design/web-vue";
type FormDataType = {
  username: string;
};
const formData = shallowReactive<FormDataType>({
  username: "",
});
function getUsername(username: string): Promise<FormDataType> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ username });
    }, 1000);
  });
}
const { loading, run, data } = useRequest<FormDataType, string[]>(getUsername, {
  defaultParams: ["默认名称"],
  onError(e) {
    Message.error(e.message);
  },
});
function onChange() {
  run(formData.username);
}
</script>
