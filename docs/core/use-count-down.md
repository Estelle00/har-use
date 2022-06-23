---
title: useCountDown
---
## 介绍
提供倒计时管理能力。

## 代码演示

### 基本用法

@[preview](./demo/use-count-down/index.vue)

### 毫秒级渲染

倒计时默认每秒渲染一次，设置 millisecond 选项可以开启毫秒级渲染。

@[preview](./demo/use-count-down/millisecond.vue)

### 验证码倒计时
@[preview](./demo/use-count-down/codeCountDown.vue)

## API

### 参数

| 参数 | 说明 | 类型                                    | 默认值 |
| --- | --- |---------------------------------------| --- |
| time | 倒计时时长，单位毫秒 | _number_                              | - |
| millisecond | 是否开启毫秒级渲染 | _boolean_                             | `false` |
| onChange | 倒计时改变时触发的回调函数 | _(current: [CurrentTime](#currenttime-格式)) => void_ | - |
| onFinish | 倒计时结束时触发的回调函数 | -                                     |

### 返回值

| 参数    | 说明                               | 类型                    |
| ------- | ---------------------------------- | ----------------------- |
| current | 当前剩余的时间                     | _[CurrentTime](#currenttime-格式)_           |
| start   | 开始倒计时                         | _() => void_            |
| pause   | 暂停倒计时                         | _() => void_            |
| reset   | 重置倒计时，支持传入新的倒计时时长 | _(time?: number): void_ |

### CurrentTime 格式

| 名称         | 说明                   | 类型     |
| ------------ | ---------------------- | -------- |
| total        | 剩余总时间（单位毫秒） | _number_ |
| days         | 剩余天数               | _number_ |
| hours        | 剩余小时               | _number_ |
| minutes      | 剩余分钟               | _number_ |
| seconds      | 剩余秒数               | _number_ |
| milliseconds | 剩余毫秒               | _number_ |

