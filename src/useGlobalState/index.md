---
title: useGlobalState
---

### 介绍

创建一个全局作用域的状态，以便在vue实例中重复使用。

## 代码演示

### 基本用法
@import "./demo/index.vue"
## API

### 类型定义
```typescript
export declare function useGlobalState<T>(factory: () => T): () => T
```
### 源文件
::: details
<<< @/useGlobalState/index.ts
:::
