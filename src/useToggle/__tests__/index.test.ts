import { useToggle } from "../index";
describe("useToggle", () => {
  it("should be defined", () => {
    expect(useToggle).toBeDefined();
  });
  it("test on init", () => {
    const hook = useToggle();
    expect(hook[0].value).toBeFalsy();
  });
  it("test on change default value", () => {
    const hook = useToggle(true);
    expect(hook[0].value).toBeTruthy();
  });
  it("test on change toggle", () => {
    const [state, toggle] = useToggle();
    expect(state.value).toBeFalsy();
    toggle();
    expect(state.value).toBeTruthy();
    toggle(false);
    expect(state.value).toBeFalsy();
  });
});
