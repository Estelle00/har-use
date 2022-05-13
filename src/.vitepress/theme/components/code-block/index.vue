<template>
  <section class="code-block">
    <slot />
  </section>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "CodeBlock",
});
</script>
<style scoped lang="less">
.code-block {
  ::v-deep(p) {
    line-height: 1.5;
  }
}
</style>
