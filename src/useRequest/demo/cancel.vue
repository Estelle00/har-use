<template>
  <a-space>
    <a-input v-model="formData.username" placeholder="编辑username" />
    <a-button type="primary" :loading="loading" @click="run(formData)"
      >修改</a-button
    >
    <a-button @click="cancel">取消</a-button>
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
function getUsername(data: FormDataType): Promise<FormDataType> {
  console.log(arguments);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ username: data.username });
    }, 1000);
  });
}
const { loading, run, cancel } = useRequest<FormDataType, FormDataType[]>(
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
</script>
