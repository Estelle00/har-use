export interface DemoVueType {
  virtualPath: string;
  code: string;
}
export function getDemoVue({
  virtualPath,
  code,
}: DemoVueType) {
  return `<template>
  <client-only>
    <code-block>
      <cell-demo>
        <virtual-demo />
      </cell-demo>
      <cell-code>
        ${code}
      </cell-code>
    </code-block>
  </client-only>
</template>
<script setup>
import VirtualDemo from "${virtualPath}";
</script>`;
}
