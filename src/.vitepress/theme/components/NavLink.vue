<script setup lang="ts">
import { toRefs } from "vue";
import type { NavItemWithLink } from "../shared/default-theme";
import { useNavLink } from "../composables/navLink";
import OutboundLink from "./icons/OutboundLink.vue";

const props = defineProps<{
  item: NavItemWithLink;
}>();

const propsRefs = toRefs(props);

const { props: linkProps, isExternal } = useNavLink(propsRefs.item);
</script>

<template>
  <div class="nav-link">
    <a class="item" v-bind="linkProps">
      {{ item.text }} <OutboundLink v-if="isExternal" />
    </a>
  </div>
</template>

<style scoped lang="less">
.item {
  display: block;
  padding: 5px 20px;
  line-height: 36px;
  font-size: 18px;
  font-weight: 600;
  color: var(--c-text);
  white-space: nowrap;
}

.item:hover,
.item.active {
  text-decoration: none;
  color: var(--c-brand);
}

.item.isExternal:hover {
  &:after {
    display: none!important;
  }
}

@media (min-width: 720px) {
  .item {
    padding: 0;
    font-size: 14px;
    font-weight: 500;
    position: relative;
    line-height: 64px;
  }

  .item:hover,
  .item.active {
    &::after {
      content: "";
      position: absolute;
      bottom: 0;
      left: -2px;
      right: -2px;
      height: 2px;
      background-color: #4569d4;
      border-radius: 1px;
    }
  }
}
</style>
