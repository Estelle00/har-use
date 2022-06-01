---
title: useStorage
---
### 介绍
本地存储数据响应式
::: warning
不可直接存储复杂对象，对象中数字类型会被强制转换为`string`
:::
## 代码演示

### 基本用法
@import "./demo/index.vue"

## API

### 类型定义

```ts
export interface Serializer<T> {
  read: (v: string) => T;
  write: (v: T) => string;
}
export interface StorageOptions<T> {
  deep?: boolean;
  serializer?: Serializer<T>;
}
export declare function useStorage<T extends string | number | boolean | object | null>(
  key: string,
  initialValue: MayBeRef<T>,
  storage: StorageLike,
  options: StorageOptions<T> = {}
): Ref<T>;
```

### 参数

| 参数     | 说明            | 类型      |
|--------|---------------|---------|
| key    | 本地存储的name     | string  |
| initialValue | 初始化存储数据内容     | any     |
| storage    | 本地存储方法        | StorageLike |
| options   | 可选的配置项 | Options |

### Options

| 参数 | 说明             | 类型 | 默认值 |
| --- |-----------------| -- | --- |
| deep | 数据深度监听     | boolean | true |
| serializer | 自定义数据序列化 |Serializer\<any\> | - |
