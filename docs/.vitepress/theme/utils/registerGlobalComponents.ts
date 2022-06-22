import * as GlobalComponents from "../components/global";
import type { App } from "vue";

export function registerGlobalComponents(app: App) {
  Object.keys(GlobalComponents).forEach((key) => {
    app.component(key, GlobalComponents[key]);
  });
}
