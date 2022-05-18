import { useGlobalState } from "../index";
import { ref } from "vue";
describe("useGlobalState", () => {
  it("should be defined", () => {
    expect(useGlobalState).toBeDefined();
  });
  it("初始化", () => {
    // const hook = useTest();
    // expect(hook.value).toBeFalsy();
  });
  it("测试多次use内容不变", () => {
    const useTest = useGlobalState(() => {
      const counter = ref(1);
      return {
        counter,
      };
    });
    const hook = useTest();
    const hook1 = useTest();
    expect(hook === hook1).toBeTruthy();
  });
  // it("test on change toggle", () => {
  //   const [state, toggle] = useToggle();
  //   expect(state.value).toBeFalsy();
  //   toggle();
  //   expect(state.value).toBeTruthy();
  //   toggle(false);
  //   expect(state.value).toBeFalsy();
  // });
});
