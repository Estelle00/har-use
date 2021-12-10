import { useRequest, useToggle } from "@har/use";
import { defineComponent } from "vue-demi";

function testService() {
  return new Promise<string>((resolve) => {
    setTimeout(() => {
      resolve("success");
    }, 1000);
  });
}

export default defineComponent({
  name: "App",
  setup() {
    const [ready, toggle] = useToggle(true);
    const { run, data, loading } = useRequest(testService, {
      ready,
      debounceWait: 2000,
    });
    console.log(data, loading);
    return () => (
      <div>
        <button onClick={() => run()}>run</button>
        <button onClick={() => toggle()}>toggle</button>
        <br />
        {loading.value ? "loading..." : data.value}
      </div>
    );
  },
});
