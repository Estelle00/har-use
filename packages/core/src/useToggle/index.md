---
title: useToggle
---
## 示例
@import "./demo/index.vue"

## 介绍
设置页面标题
## 使用

<<< @/useToggle/index.ts{2}

```ts
import { useToggle } from "@har/use";
```

## API

### 类型定义

```ts
export declare function useToggle(
  defaultValue: boolean
): [Ref<boolean>, (newValue: boolean) => void];
```

### 参数

| 参数                                       | 说明   | 类型      | 默认值  |
|------------------------------------------| ------ | --------- | ------- |
| defaultValue | 默认值 | _boolean_ | `false` |

### 返回值

| 参数   | 说明             | 类型                           |
| ------ | ---------------- | ------------------------------ |
| state  | 状态值           | _Ref\<boolean>_                |
| toggle | 切换状态值的函数 | _(newValue?: boolean) => void_ |
