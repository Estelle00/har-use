<template>
  <div class="sidebar" :class="{ fixed }">
    <NavLinks class="nav" />
    <slot name="sidebar-top" />
    <SideBarLinks />
    <slot name="sidebar-bottom" />
  </div>
</template>
<script setup lang="ts">
import NavLinks from "./NavLinks.vue";
import SideBarLinks from "./SideBarLinks.vue";
const { fixed = false } = defineProps<{ fixed: boolean }>();
</script>

<style scoped lang="less">
.sidebar {
  width: 200px;
  background-color: var(--c-bg);
  overflow-y: auto;
  &.fixed {
    position: fixed;
    top: var(--header-height);
    bottom: 0;
    left: 0;
    z-index: var(--z-index-sidebar);
  }
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
