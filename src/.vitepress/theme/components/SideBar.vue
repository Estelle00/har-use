<script setup lang="ts">
import NavLinks from "./NavLinks.vue";
import SideBarLinks from "./SideBarLinks.vue";

defineProps<{ open: boolean }>();
</script>

<template>
  <a-layout-sider :class="{ open }">
      <div class="sidebar">
        <slot name="sidebar-top" />
        <SideBarLinks />
        <slot name="sidebar-bottom" />
      </div>
  </a-layout-sider>
</template>

<style scoped>
.sidebar {
  //border-right: 1px solid var(--c-divider);
  //background-color: var(--c-bg);
  //overflow-y: auto;
  //transition: transform 0.25s ease;
  //height: calc(100vh - var(--header-height));
}
.nav {
  display: block;
}

</style>
