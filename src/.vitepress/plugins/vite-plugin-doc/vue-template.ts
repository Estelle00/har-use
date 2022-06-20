export interface DemoVueType {
  virtualPath: string;
  code: string;
}
export function getDemoVue({
  virtualPath,
  code,
}: DemoVueType) {
  return `<template>
        <virtual-demo />
</template>
<script setup>
import VirtualDemo from "${virtualPath}";
</script>`;
}
