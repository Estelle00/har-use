import { useRequest, useToggle } from "@har/use";
import { defineComponent } from "vue-demi";

function testService() {
  return new Promise<string>((resolve) => {
    console.log(111);
    setTimeout(() => {
      resolve("success");
    }, 5000);
  });
}

export default defineComponent({
  name: "App",
  setup() {
    const [ready, toggle] = useToggle(true);
    const { run, data, loading } = useRequest(testService, {
      ready,
      cacheKey: "test",
      staleTime: 200000,
    });
    const temp1 = useRequest(testService, {
      ready,
      cacheKey: "test",
      staleTime: 200000,
    });
    console.log(temp1);
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
