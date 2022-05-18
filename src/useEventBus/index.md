# useEventBus

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
export type EventBusOff = () => void;
export type EventBusOn<T = unknown> = (
  fn: Listener<T>
) => EventBusOff;
type EventBusTrigger<T = unknown> = (params?: T) => void;
interface EventBus<T = unknown> {
  on: EventBusOn<T>;
  trigger: EventBusTrigger<T>;
}
function useEventBus<T = unknown>(): EventBus<T>;
```
### 返回值

| 参数      | 说明 | 类型                    |
|---------|--| ----------------------- |
| on      | 订阅事件，返回关闭当前订阅方法 | (Fn) => () => void   |
| trigger | 发布事件 | (param?: T) => void    |
