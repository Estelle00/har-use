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
  console.log(arguments);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ username });
    }, 1000);
  });
}
const { loading, run, data, mutate } = useRequest<FormDataType, string[]>(
  getUsername,
  {
    manual: true,
    onSuccess(result) {
      console.log(result);
      Message.success(`用户名称成功修改为：${result.username}`);
    },
    onError(e) {
      Message.error(e.message);
    },
  }
);
function onChange() {
  mutate(formData);
  run(formData.username);
}
</script>
