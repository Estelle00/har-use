import {defineComponent} from "vue";
import {useRequest} from "@har/use";

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
    const { run, data, loading } = useRequest(testService);
    console.log(data, loading);
    return () => (
      <div>
        <button onClick={() => run()}>run</button>
        <br />
        {loading.value ? "loading..." : data.value}
      </div>
    );
  },
});
