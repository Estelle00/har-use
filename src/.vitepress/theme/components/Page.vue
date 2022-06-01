<template>
  <main class="page">
    <div class="container">
      <slot name="top" />
      <h1 v-if="frontmatter.title">{{ frontmatter.title }}</h1>
      <p v-if="frontmatter.description">{{ frontmatter.description }}</p>
      <Content class="content" />
      <PageFooter />
      <NextAndPrevLinks />
      <slot name="bottom" />
    </div>
  </main>
</template>
<script setup lang="ts">
import PageFooter from "./PageFooter.vue";
import NextAndPrevLinks from "./NextAndPrevLinks.vue";
import { useData } from "vitepress";
const { frontmatter } = useData();
</script>

<style scoped>
.container {
  margin: 0 auto;
  padding: 0 1.5rem 4rem;
  max-width: 48rem;
}

.content {
  padding-bottom: 1.5rem;
}

@media (max-width: 420px) {
  .content {
    /* fix carbon ads display */
    clear: both;
  }
}
</style>
