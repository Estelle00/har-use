# useRequest

`useRequset` 由 [ahooks](https://ahooks.js.org/zh-CN/hooks/use-request/index) 中的 useRequest 移植过来的，但是不完全一致。

目前已有能力包括：
- 自动请求/手动请求
- 防抖
- 节流
- loading delay
- 轮询
- 依赖刷新
- 错误重试
- 缓存

### 默认用法
useRequest 的第一个参数是一个异步函数，在组件初次加载时，会自动触发该函数执行。同时自动管理该异步函数的 `loading` , `data` , `error` 等状态。

@import "./demo/index.vue"

### 手动触发
如果设置 `options.manual = true` ，则 useRequest 不会默认执行，需要通过 `run` 来触发执行。

@import "./demo/manual.vue"
