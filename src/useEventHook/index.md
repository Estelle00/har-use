# useEventHook

### 介绍
提供简单的事件发布订阅。
::: tip
兼容uni-app
:::

## 代码演示

### 基本用法
@import "./demo/index.vue"

## API
### 类型定义

```ts
type Listener<T> = (p?: T) => void;
export type EventHookOff = () => void;
export type EventHookOn<T = unknown> = (
  fn: Listener<T>
) => EventHookOff;
type EventHookTrigger<T = unknown> = (params?: T) => void;
interface EventHook<T = unknown> {
  on: EventHookOn<T>;
  trigger: EventHookTrigger<T>;
}
function useEventHook<T = unknown>(): EventHook<T>;
```
### 返回值

| 参数      | 说明 | 类型                    |
|---------|--| ----------------------- |
| on      | 订阅事件，返回关闭当前订阅方法 | (Fn) => () => void   |
| trigger | 发布事件 | (param?: T) => void    |
