import theme from "vitepress/theme";
import "./styles/index.less";
import ArcoVue from "@arco-design/web-vue";
// @ts-ignore
import ArcoIcon from "@arco-design/web-vue/lib/icon";
import type { Theme } from "vitepress";
import { registerGlobalComponents } from "./utils/registerGlobalComponents";
export default {
  ...theme,
  enhanceApp({ app }) {
    registerGlobalComponents(app);
    app.use(ArcoVue);
    app.use(ArcoIcon);
      const node = window?.document.querySelector("html");
      if (node) {
        new MutationObserver((mutationRecord) => {
          const classList = (mutationRecord[0].target as HTMLElement).classList;
          if (classList.contains("dark")) {
            document.body.setAttribute("arco-theme", "dark");
          } else {
            document.body.removeAttribute("arco-theme");
          }
        }).observe(node, {
          attributes: true,
          attributeFilter: ["class"],
        });
      }
  },
} as Theme;
