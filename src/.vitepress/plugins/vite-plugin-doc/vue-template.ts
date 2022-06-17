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
    <slot />
      <cell-demo>
        <virtual-demo />
      </cell-demo>
      <cell-code>
        123<slot />
      </cell-code>
    </code-block>
</template>
<script setup>
import VirtualDemo from "${virtualPath}";
</script>`;
}
