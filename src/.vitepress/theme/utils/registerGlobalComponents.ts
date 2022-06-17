import * as GlobalComponents from "../components/global";
import type { App } from "vue";
export function registerGlobalComponents(app: App<any>) {
  Object.keys(GlobalComponents).forEach(key => {
    app.component(key, GlobalComponents[key])
  })
}
