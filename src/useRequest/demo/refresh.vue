<template>
  <a-form :model="{}">
    <a-form-item label="用户名">
      <a-input v-model="formData.username" />
    </a-form-item>
    <a-form-item>
      <a-space>
        <a-button
          :loading="loading"
          type="primary"
          @click="run(formData.username)"
          >提交</a-button
        >
        <a-button :loading="loading" @click="refresh">刷新</a-button>
      </a-space>
    </a-form-item>
  </a-form>
</template>

<script setup lang="ts">
import { useRequest } from "@har/use";
import { shallowReactive } from "vue";
import { Message } from "@arco-design/web-vue";
const formData = shallowReactive({
  username: "",
});
type TData = {
  success: boolean;
};
function getUsername(username: string): Promise<TData> {
  console.log("当前请求内容：", username);
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
const { loading, run, refresh } = useRequest<TData, [string]>(getUsername, {
  manual: true,
  onSuccess(result, params) {
    if (result.success) {
      Message.success(`用户名称成功修改为：${params[0]}`);
    }
  },
  onError(e) {
    Message.error(e.message);
  },
});
</script>
