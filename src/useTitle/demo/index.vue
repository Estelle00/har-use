<template>
  <a-input v-model="title" />
</template>
<script setup lang="ts">
import { useTitle } from "@har/use";
const title = useTitle();
</script>
