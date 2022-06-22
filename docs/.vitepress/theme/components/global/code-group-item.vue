<template>
  <div
    class="code-group-item"
    :class="{ 'code-group-item__active': active }"
    :aria-selected="active"
  >
    <slot />
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "CodeGroupItem",
});
</script>

<script setup lang="ts">
const { active = false } = defineProps<{
  title: string;
  active?: boolean;
}>();
</script>
