<template>
  <a-layout-sider :width="170" v-if="items.length">
  <a-affix :offset-top="100" class="arco-vue-aside">
    <a-anchor line-less>
      <page-anchor v-for="item in items" :key="item.link" :item="item" />
    </a-anchor>
  </a-affix>
  </a-layout-sider>
</template>

<script setup lang="ts">
import { useData, useRoute } from "vitepress";
import { computed } from "vue";
import { Header } from "@/.vitepress/theme/shared/shared";
import {
  HeaderWithChildren,
  SideBarItem,
} from "../shared/default-theme";
import PageAnchor from "./PageAnchor.vue";

const route = useRoute();
const { frontmatter } = useData();
const maxDepth = computed(() => frontmatter.value.sidebarDepth || Infinity);
function groupHeaders(headers: Header[]): HeaderWithChildren[] {
  headers = headers.map((h) => Object.assign({}, h));
  let lastH2: HeaderWithChildren;
  headers.forEach((h) => {
    if (h.level === 2) {
      lastH2 = h;
    } else if (lastH2) {
      (lastH2.children || (lastH2.children = [])).push(h);
    }
  });
  return headers.filter((h) => h.level === 2);
}

function mapHeaders(headers: HeaderWithChildren[], depth = 1): SideBarItem[] {
  return headers.map((header) => ({
    text: header.title,
    link: `#${header.slug}`,
    children:
      depth < maxDepth.value && header.children
        ? mapHeaders(header.children, depth + 1)
        : undefined,
  }));
}
function resolveHeaders(headers: Header[]): SideBarItem[] {
  return mapHeaders(groupHeaders(headers));
}

const items = computed(() => {
  return resolveHeaders(route.data.headers);
});
</script>
<style>
.arco-vue-aside {
  padding-left: 10px;
}
</style>
