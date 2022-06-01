---
title: 基础用法
---

## 默认用法
useRequest 的第一个参数是一个异步函数，在组件初次加载时，会自动触发该函数执行。同时自动管理该异步函数的 `loading` , `data` , `error` 等状态。

@import "./demo/index.vue"

## 手动触发
如果设置 `options.manual = true` ，则 useRequest 不会默认执行，需要通过 `run` 或者 `runAsync` 来触发执行。
`run` 与 `runAsync` 的区别在于：
- `run` 是一个普通同步函数，我们会自动捕获异常，你可以通过 `options.onError` 来处理异常时的行为。
- `runAsync` 是一个返回 `Promise` 的异步函数，如果使用 `runAsync` 来调用，则意味着你需要自己捕获异常。
```typescript
runAsync().then((data) => {
  console.log(data);
}).catch((error) => {
  console.log(error);
})
```
在如下例子中，我们通过 `run(formData)` 来修改用户名，通过 `onSuccess` 和 `onError` 来处理成功和失败。

@import "./demo/manual.vue"

在如下例子中，我们通过 `runAsync(formData)` 来修改用户名，此时必须通过 `catch` 来自行处理异常。

@import "./demo/runAsync.vue"

## 生命周期
`useRequest` 提供了以下几个生命周期配置项，供你在异步函数的不同阶段做一些处理。
- `onBefore`：请求之前触发
- `onSuccess`：请求成功触发
- `onError`：请求失败触发
- `onFinally`：请求完成触发

 @import "./demo/lifeCycle.vue"

### 刷新（重复上一次请求）

