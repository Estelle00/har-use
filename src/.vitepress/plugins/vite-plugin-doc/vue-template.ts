export interface MainVueType {
  content: string;
  imports: string[];
}
export function getMainVue({ content, imports }: MainVueType) {
  return `${content}
<script setup>
	${imports.join(";\n")}
</script>`;
}
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
      ${code}
    </cell-code>
  </code-block>
</template>
<script setup>
import VirtualDemo from "${virtualPath}";
</script>`;
}
