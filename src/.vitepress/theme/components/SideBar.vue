
<template>
  <a-layout-sider :collapsed="!open" :collapsed-width="0">
    <div class="sidebar" :class="{ open }">
      <NavLinks class="nav" />
      <slot name="sidebar-top" />

      <SideBarLinks />
      <slot name="sidebar-bottom" />
    </div>
  </a-layout-sider>
</template>
<script setup lang="ts">
import NavLinks from "./NavLinks.vue";
import SideBarLinks from "./SideBarLinks.vue";

defineProps<{ open: boolean }>();
</script>

<style scoped>
.sidebar {
  position: fixed;
  top: var(--header-height);
  bottom: 0;
  left: 0;
  z-index: var(--z-index-sidebar);
  background-color: var(--c-bg);
  overflow-y: auto;
  transform: translateX(-100%);
  transition: transform 0.25s ease;
}
.sidebar.open {
  transform: translateX(0);
}
.nav {
  display: block;
}

@media (min-width: 720px) {
  .nav {
    display: none;
  }
}
</style>
