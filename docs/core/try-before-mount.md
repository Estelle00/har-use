## 介绍
用于组件 `onBeforeMount` 时尝试触发回调事件。


## API

### 类型定义

```ts
export declare function tryOnBeforeMount(fn: () => void, sync = true): void;
```

### 参数

| 参数   | 说明 | 类型           | 默认值  |
|------|--|--------------|------|
| fn   | 回调方法 | `() => void` |      |
| sync | 当回调事件未在实例组件中时，是否立即回调 | `boolean`    | true |
