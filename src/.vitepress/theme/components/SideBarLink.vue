<template>
  <a-sub-menu v-if="item.children" :key="item.link" selectable>
    <template #title>
      {{ item.text }}
    </template>
    <side-bar-link
      v-for="(child, index) in item.children"
      :item="child"
      :key="index"
    />
  </a-sub-menu>
  <a-menu-item :key="item.link" v-else
    >{{ item.text }}</a-menu-item
  >
</template>
<script setup lang="ts">
import { computed, defineComponent } from "vue";
import { SideBarItem } from "../shared/default-theme";
import { joinUrl } from "../utils";
import { useData } from "vitepress";
defineComponent({
  name: "SideBarLink",
});

const props = defineProps<{
  item: SideBarItem;
}>();
const { site } = useData();
function resolveLink(base: string, path?: string): string | undefined {
  if (path === undefined) {
    return path;
  }
  // keep relative hash to the same page
  if (path.startsWith("#")) {
    return path;
  }

  return joinUrl(base, path);
}
const link = computed(() => {
  return resolveLink(site.value.base, props.item.link);
});
</script>
