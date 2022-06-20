export interface DemoVueType {
  virtualPath: string;
  code: string;
}
export function getDemoVue({
  virtualPath,
  code,
}: DemoVueType) {
  return `<template>
    <code-block>
      <cell-demo>
        <virtual-demo />
      </cell-demo>
      <cell-code>
        <slot />
      </cell-code>
    </code-block>
</template>
<script setup>
import VirtualDemo from "${virtualPath}";
</script>`;
}
