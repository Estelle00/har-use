---
title: useClickAway
---
## 介绍

监听点击元素外部的事件。

::: warning
不可挂载到自定义组件
:::

## 代码演示

### 基本用法

@[preview](./demo/index.vue)

### 自定义事件

通过 `eventName` 选项可以自定义需要监听的事件类型。

@[preview](./demo/customizeEvent.vue)

## API

### 参数

| 参数     | 说明                     | 类型                     | 默认值 |
| -------- | ------------------------ | ---------------------- | ------ |
| target   | 绑定事件的元素           | _Element \| Ref\<Element>_ | -      |
| listener | 点击外部时触发的回调函数 | EventListener          | -      |
| options  | 可选的配置项             | Options                | 见下表 |

### Options

| 参数      | 说明           | 类型     | 默认值  |
| --------- | -------------- | -------- | ------- |
| eventName | 监听的事件类型 | _string_ | `click` |

<script setup></script>
