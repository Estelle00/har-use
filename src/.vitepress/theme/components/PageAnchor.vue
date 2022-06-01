<template>
  <a-anchor-link :href="item.link">
    {{ item.text }}
    <template v-if="item.children" #sublist>
      <page-anchor v-for="info in item.children" :key="info.link" :item="info" />
    </template>
  </a-anchor-link>
</template>

<script setup lang="ts">
import { SideBarItem } from "../shared/default-theme";
import { defineComponent } from "vue";
defineComponent({
  name: "PageAnchor",
});
defineProps<{
  item: SideBarItem;
}>();
</script>
