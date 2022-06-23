import { defineConfig } from "vitepress";
// @ts-ignore
import pkg from "../../package.json";
import createMarkdown from "./markdown";
import type { DefaultTheme } from "vitepress";

function getRouterConfig(
  router: Array<DefaultTheme.SidebarGroup | DefaultTheme.SidebarItem>,
  prefix
) {
  return router.map((item) => {
    let link = prefix;
    if ("link" in item) {
      link += item.link;
    }
    let items;
    if ("items" in item) {
      items = getRouterConfig(item.items, link);
    }
    return {
      ...item,
      link,
      items,
    };
  });
}

export default defineConfig({
  title: "har-use",
  lang: "zh-CN",
  outDir: "../public",
  base: "/har-use/",
  vue: {
    reactivityTransform: true,
  },
  vite: {
    server: {
      fs: {
        allow: [".."],
      },
    },
  },
  markdown: {
    config: (md) => {
      createMarkdown(md);
    },
  },
  lastUpdated: true,
  themeConfig: {
    outlineTitle: " ",
    lastUpdatedText: "最近更新时间",
    editLink: {
      pattern: "https://git.huianrong.com/frontend/har-use/packages/:path",
      text: "编辑这个文档",
    },
    socialLinks: [
      {
        icon: "github",
        link: pkg.repository.url,
      },
    ],
    nav: [
      {
        text: "core",
        link: "/core/use-toggle",
        activeMatch: "/core/",
      },
      {
        text: "browser",
        link: "/browser",
      },
      {
        text: "uni-app",
        link: "/uni",
      },
    ],
    sidebar: {
      "/core/": getRouterConfig(
        [
          {
            text: "core",
            items: [
              {
                text: "tryOnBeforeMount",
                link: "try-before-mount",
              },
              {
                text: "onMountedOrActivated",
                link: "mounted-or-activated",
              },
              {
                text: "useToggle",
                link: "use-toggle",
              },
              {
                text: "useCountDown",
                link: "use-count-down",
              },
            ],
          },
        ],
        "/core/"
      ),
      // "/core/": [
      //   {
      //     text: "core",
      //     items: [
      //       // {
      //       //   text: "useClickAway",
      //       //   link: "/useClickAway/",
      //       // },
      //       // {
      //       //   text: "useCountDown",
      //       //   link: "/useCountDown/",
      //       // },
      //       // {
      //       //   text: "useEventBus",
      //       //   link: "/useEventBus/",
      //       // },
      //       // {
      //       //   text: "useEventListener",
      //       //   link: "/useEventListener/",
      //       // },
      //       // {
      //       //   text: "useGlobalState",
      //       //   link: "/useGlobalState/",
      //       // },
      //       // {
      //       //   text: "useRect",
      //       //   link: "/useRect/",
      //       // },
      //       // {
      //       //   text: "useStorage",
      //       //   link: "/useStorage/",
      //       // },
      //       // {
      //       //   text: "useTitle",
      //       //   link: "/useTitle/",
      //       // },
      //       {
      //         text: "useToggle",
      //         link: "use-toggle",
      //       },
      //       {
      //         text: "useWindowSize",
      //         link: "/useWindowSize/",
      //       },
      //     ],
      //   },
      //   {
      //     text: "useRequest",
      //     items: [
      //       {
      //         text: "快速上手",
      //         link: "/useRequest/",
      //       },
      //       {
      //         text: "基础用法",
      //         link: "/useRequest/basic",
      //       },
      //     ],
      //   },
      // ],
    },
  },
});
