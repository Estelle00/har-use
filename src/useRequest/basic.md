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
runAsync()
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.log(error);
  });
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

## 刷新（重复上一次请求）

> 必须执行 `run` 或者 `runAsync` 后才可调用。

`useRequest` 提供了 `refresh` 和 `refreshAsync` 方法，使我们可以使用上一次的参数，重新发起请求。
::: warning
如果请求参数为响应式对象，则刷新时依然会使用最新的参数内容。
:::

@import "./demo/refresh.vue"

`refresh` 和 `refreshAsync` 的区别于 `run` 和 `runAsync` 是一致的。

## 立即变更数据

`useRequest` 提供了 `mutate`，支持立即修改 `useRequest` 返回的 `data` 参数。
我们修改了用户名，但是我们不希望等编辑接口调用成功之后，才给用户反馈。而是直接修改页面数据，同时在背后去调用修改接口，等修改接口返回之后，另外提供反馈。

@import "./demo/mutate.vue"

## 取消请求

`useRequest` 提供了 `cancel` 函数，可以取消当前正在进行的请求。同时 `useRequest` 会在以下时机自动取消当前请求：

- 组件卸载时，取消正在进行的请求
- 竞态取消，当上一次请求还没返回时，又发起了下一次请求，则会取消上一次请求

@import "./demo/cancel.vue"

## 参数管理

`useRequest` 返回的 `params` 会记录当次调用 `service` 的参数数组。比如你触发了 `run(1, 2, 3)`，则 `params` 等于 `[1, 2, 3]` 。

如果我们设置了 `options.manual = false`，则首次调用 `service` 的参数可以通过 `options.defaultParams` 来设置。

@import "./demo/params.vue"

## API

```typescript
const {
  loading: Ref<boolean>,
  data?: ShallowRef<TData>,
  error?: shallowRef<Error>,
  params: Ref<TParams>,
  run: (...params: TParams) => void,
  runAsync: (...params: TParams) => Promise<TData>,
  refresh: () => void,
  refreshAsync: () => Promise<TData>,
  mutate: (data?: TData | ((oldData?: TData) => (TData | undefined))) => void,
  cancel: () => void,
} = useRequest<TData, TParams>(
  service: (...args: TParams) => Promise<TData>,
  {
    manual?: boolean,
    defaultParams?: TParams,
    formatResult?: (data: any) => TData;
    onBefore?: (params: TParams) => void,
    onSuccess?: (data: TData, params: TParams) => void,
    onError?: (e: Error, params: TParams) => void,
    onFinally?: (params: TParams, data?: TData, e?: Error) => void,
  }
);
```

### Result

| 参数           | 说明                                                                               | 类型                                                                    |
|--------------|----------------------------------------------------------------------------------|-----------------------------------------------------------------------|
| data         | service 返回的数据                                                                    | `TData` \                                                             | `undefined`                                                |
| error        | service 抛出的异常                                                                    | `Error` \                                                             | `undefined`                                                |
| loading      | service 是否正在执行                                                                   | `boolean`                                                             |
| params       | 当次执行的 service 的参数数组。比如你触发了 `run(1, 2, 3)`，则 params 等于 `[1, 2, 3]`                | `TParams` \                                                           | `[]`                                                     |
| run          | <ul><li> 手动触发 service 执行，参数会传递给 service</li><li>异常自动处理，通过 `onError` 反馈</li></ul> | `(...params: TParams) => void`                                        |
| runAsync     | 与 `run` 用法一致，但返回的是 Promise，需要自行处理异常。                                             | `(...params: TParams) => Promise<TData>`                              |
| refresh      | 使用上一次的 params，重新调用 `run`                                                         | `() => void`                                                          |
| refreshAsync | 使用上一次的 params，重新调用 `runAsync`                                                    | `() => Promise<TData>`                                                |
| mutate       | 直接修改 `data`                                                                      | `(data?: TData / ((oldData?: TData) => (TData / undefined))) => void` |
| cancel       | 取消当前正在进行的请求                                                                      | `() => void`                                                          |

### Options

| 参数            | 说明                                                                                                        | 类型                                                   | 默认值     |
|---------------|-----------------------------------------------------------------------------------------------------------|------------------------------------------------------|---------|
| manual        | <ul><li> 默认 `false`。 即在初始化时自动执行 service。</li><li>如果设置为 `true`，则需要手动调用 `run` 或 `runAsync` 触发执行。 </li></ul> | `boolean`                                            | `false` |
| defaultParams | 首次默认执行时，传递给 service 的参数                                                                                   | `TParams`                                            | -       |
| onBefore      | service 执行前触发                                                                                             | `(params: TParams) => void`                          | -       |
| onSuccess     | service resolve 时触发                                                                                       | `(data: TData, params: TParams) => void`             | -       |
| onError       | service reject 时触发                                                                                        | `(e: Error, params: TParams) => void`                | -       |
| onFinally     | service 执行完成时触发                                                                                           | `(params: TParams, data?: TData, e?: Error) => void` | -       |
