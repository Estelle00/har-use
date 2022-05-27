<script setup lang="ts">
import { ref, computed, onMounted, watchEffect } from "vue";
import { useData } from "vitepress";

const { theme, page } = useData();

const hasLastUpdated = computed(() => {
  return page.value.lastUpdated !== 0;
});
const datetime = ref("");
onMounted(() => {
  watchEffect(() => {
    datetime.value = new Date(page.value.lastUpdated!).toLocaleString();
  });
});
</script>

<template>
  <p v-if="hasLastUpdated" class="last-updated">
    <span class="prefix">最近更新时间:</span>
    <span class="datetime">{{ datetime }}</span>
  </p>
</template>

<style scoped>
.last-updated {
  display: inline-block;
  margin: 0;
  line-height: 1.4;
  font-size: 0.9rem;
  color: var(--c-text-light);
}

@media (min-width: 960px) {
  .last-updated {
    font-size: 1rem;
  }
}

.prefix {
  display: inline-block;
  font-weight: 500;
}

.datetime {
  display: inline-block;
  margin-left: 6px;
  font-weight: 400;
}
</style>
