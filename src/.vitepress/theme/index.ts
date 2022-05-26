import type { Theme } from "vitepress";
import "./styles/index.less";
import ArcoVue from "@arco-design/web-vue";
// @ts-ignore
import ArcoIcon from "@arco-design/web-vue/lib/icon";
import CellDemo from "./components/cell-demo/index.vue";
import CellCode from "./components/cell-code/index.vue";
import CodeBlock from "./components/code-block/index.vue";
import Layout from "./Layout.vue";
import NotFound from "./NotFound.vue";
const theme: Theme = {
  Layout,
  NotFound,
  enhanceApp({ app }) {
    app.component(CellDemo.name, CellDemo);
    app.component(CellCode.name, CellCode);
    app.component(CodeBlock.name, CodeBlock);
    app.use(ArcoVue);
    app.use(ArcoIcon);
  },
};

export default theme;
