<template>
  <a-form :model="{}">
    <a-form-item label="form1text">
      <a-input v-model="form1.text" />
    </a-form-item>
    <a-form-item label="form2text">
      <a-input v-model="form2.text" />
    </a-form-item>
  </a-form>
</template>
<script setup lang="ts">
import { useGlobalState } from "@har-use/core";
import { reactive } from "vue";
const useState = useGlobalState(() => {
  return reactive({
    text: "",
  });
});
const form1 = useState();
const form2 = useState();
</script>
