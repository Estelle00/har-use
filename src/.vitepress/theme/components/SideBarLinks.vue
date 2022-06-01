<template>
  <a-menu
    auto-open
    :selected-keys="selectedKeys"
    auto-open-selected
    v-if="items.length > 0"
    class="sidebar-links"
    @menu-item-click="onClick"
  >
    <SideBarLink v-for="item of items" :item="item" />
  </a-menu>
</template>
<script setup lang="ts">
import { useSideBar } from "../composables/sideBar";
import SideBarLink from "./SideBarLink.vue";
import { useData, useRoute, useRouter } from "vitepress";
import { normalize, resolveLink } from "@/.vitepress/theme/utils";
import { computed } from "vue";
const router = useRouter();
const { site } = useData();
function onClick(path: string) {
  router.go(resolveLink(site.value.base, path));
}
const items = useSideBar();
const route = useRoute();
const selectedKeys = computed(() => [normalize(`/${route.data.relativePath}`)]);
</script>
