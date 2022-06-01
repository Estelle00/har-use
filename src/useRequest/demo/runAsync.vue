<template>
  <a-form :model="{}">
    <a-form-item label="用户名">
      <a-input v-model="formData.username" />
    </a-form-item>
    <a-form-item>
      <a-button :loading="loading" @click="onClick">提交</a-button>
    </a-form-item>
  </a-form>
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
type TData = {
  success: boolean;
};
function getUsername(): Promise<TData> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.5) {
        resolve({ success: true });
      } else {
        reject(new Error("修改失败！"));
      }
    }, 1000);
  });
}
const { loading, runAsync } = useRequest<TData, [FormDataType]>(getUsername, {
  manual: true,
});
async function onClick() {
  try {
    const result = await runAsync(formData);
    if (result.success) {
      Message.success(`用户名称成功修改为：${formData.username}`);
    }
  } catch (e) {
    Message.error((e as Error).message);
  }
}
</script>
