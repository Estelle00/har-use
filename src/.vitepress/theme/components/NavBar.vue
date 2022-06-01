<script setup lang="ts">
import NavBarTitle from "./NavBarTitle.vue";
import NavLinks from "./NavLinks.vue";
import ToggleSideBarButton from "./ToggleSideBarButton.vue";

defineEmits(["toggle"]);
</script>

<template>
  <a-layout-header>
    <div class="nav-bar">
      <ToggleSideBarButton @toggle="$emit('toggle')" />
      <NavBarTitle />
      <div class="flex-grow" />
      <div class="nav">
        <NavLinks />
      </div>
    </div>
    <div style="height: 64px"></div>
  </a-layout-header>
</template>

<style scoped>
.nav-bar {
  z-index: var(--z-index-navbar);
  display: flex;
  justify-content: space-between;
  align-items: center;
  white-space: nowrap;
  background: #fff;
  box-shadow: 0 8px 24px -2px rgb(0 0 0 / 5%);
  height: 64px;
  padding: 0 48px;
}

@media (min-width: 720px) {
  .nav-bar {
    position: fixed;
    width: 100%;
    padding: 0 20px;
    top: 0;
    left: 0;
    z-index: 999;
  }
}

.flex-grow {
  flex-grow: 1;
}

.nav {
  display: none;
}

@media (min-width: 720px) {
  .nav {
    display: block;
  }
}
</style>
