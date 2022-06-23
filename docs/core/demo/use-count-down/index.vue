<template>
  <a-space direction="vertical">
    <span>总时间：{{ current.total }}</span>
    <span>剩余天数：{{ current.days }}</span>
    <span>剩余小时：{{ current.hours }}</span>
    <span>剩余分钟：{{ current.minutes }}</span>
    <span>剩余秒数：{{ current.seconds }}</span>
    <span>剩余毫秒：{{ current.milliseconds }}</span>
  </a-space>
</template>

<script setup lang="ts">
import { useCountDown } from "@har-use/core";

const { start, current } = useCountDown({
  // 倒计时 24 小时
  time: 24 * 60 * 60 * 1000,
});
// 开始倒计时
start();
</script>
