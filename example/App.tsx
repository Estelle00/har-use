import { defineComponent } from "vue";
import { useRequest, useToggle } from "@har/use";

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
    const [ready, toggle] = useToggle(false);
    const { run, data, loading } = useRequest(testService, {
      ready,
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
