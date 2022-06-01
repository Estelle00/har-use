<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { useRoute, useData } from "vitepress";
import { isSideBarEmpty, getSideBarConfig } from "./support/sideBar";

// components
import Home from "./components/Home.vue";
import PageAnchors from "./components/PageAnchors.vue";
import NavBar from "./components/NavBar.vue";
import SideBar from "./components/SideBar.vue";
import Page from "./components/Page.vue";
import { useMediaQuery } from "@har/use";
// generic state
const route = useRoute();
const { site, page, theme, frontmatter } = useData();

// custom layout
const isCustomLayout = computed(() => !!frontmatter.value.customLayout);
// home
const enableHome = computed(() => !!frontmatter.value.home);
// navbar
const showNavbar = computed(() => {
  const themeConfig = theme.value;
  if (frontmatter.value.navbar === false || themeConfig.navbar === false) {
    return false;
  }
  return (
    site.value.title || themeConfig.logo || themeConfig.repo || themeConfig.nav
  );
});

// sidebar
const openSideBar = ref(false);
const isLargeScreen = useMediaQuery({
  minWidth: 720
});
const showSidebar = computed(() => {
  if (frontmatter.value.home || frontmatter.value.sidebar === false) {
    return false;
  }

  return !isSideBarEmpty(
    getSideBarConfig(theme.value.sidebar, route.data.relativePath)
  );
});

const toggleSidebar = (to?: boolean) => {
  openSideBar.value = typeof to === "boolean" ? to : !openSideBar.value;
};

const hideSidebar = toggleSidebar.bind(null, false);
// close the sidebar when navigating to a different location
watch(route, hideSidebar);
// TODO: route only changes when the pathname changes
// listening to hashchange does nothing because it's prevented in router
</script>

<template>
  <a-layout class="theme">
    <NavBar v-if="showNavbar" @toggle="toggleSidebar" />
    <a-layout class="theme-layout" :has-sider="showSidebar">
      <template v-if="showNavbar">
        <a-layout-sider v-if="isLargeScreen" >
          <SideBar fixed/>
        </a-layout-sider>
        <a-drawer :closable="false" v-else v-model:visible="openSideBar" placement="left" :fixed="false" :footer="false">
          <SideBar />
        </a-drawer>
      </template>
      <a-layout-content>
        <Content v-if="isCustomLayout" />

        <template v-else-if="enableHome">
          <!-- A slot for customizing the entire homepage easily -->
          <slot name="home">
            <Home>
              <template #hero>
                <slot name="home-hero" />
              </template>
              <template #features>
                <slot name="home-features" />
              </template>
              <template #footer>
                <slot name="home-footer" />
              </template>
            </Home>
          </slot>
        </template>

        <Page v-else>
          <template #top>
            <slot name="page-top" />
          </template>
          <template #bottom>
            <slot name="page-bottom" />
          </template>
        </Page>
      </a-layout-content>
      <page-anchors v-if="showNavbar && isLargeScreen"/>
    </a-layout>
  </a-layout>
  <Debug />
</template>
<style scoped>
.theme {
  height: 100vh;
}
</style>
