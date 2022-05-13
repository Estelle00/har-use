import type { Theme } from "vitepress";
import DefaultTheme from "vitepress/theme";
import "@arco-design/web-vue/dist/arco.less";
import "prismjs/themes/prism-tomorrow.css";
import ArcoVue from "@arco-design/web-vue";
import ArcoIcon from "@arco-design/web-vue/es/icon";
import CellDemo from "./components/cell-demo/index.vue";
import CellCode from "./components/cell-code/index.vue";
import CodeBlock from "./components/code-block/index.vue";
const theme: Theme = {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.component(CellDemo.name, CellDemo);
    app.component(CellCode.name, CellCode);
    app.component(CodeBlock.name, CodeBlock);
    app.use(ArcoVue);
    app.use(ArcoIcon);
  },
};

export default theme;
