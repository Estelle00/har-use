## 介绍
用于在 `true` 和 `false` 之间进行切换。

## 代码演示
@[preview](./demo/index.vue)


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
| defaultValue | 默认值 | `boolean` | `false` |

### 返回值

| 参数   | 说明             | 类型                           |
| ------ | ---------------- | ---------------------------- |
| state  | 状态值           | `Ref<boolean>`               |
| toggle | 切换状态值的函数 | `(newValue?: boolean) => void` |
