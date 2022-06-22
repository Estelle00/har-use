import { defineConfig } from "vitepress";
// @ts-ignore
import pkg from "../../package.json";
import createMarkdown from "./markdown";

export default defineConfig({
  title: "har-use",
  lang: "zh-CN",
  outDir: "../public",
  srcDir: "../packages",
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
        text: "API",
        items: [
          {
            text: "core",
            link: "/core/",
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
      },
    ],
    sidebar: {
      "/core/": [
        {
          text: "core",
          items: [
            // {
            //   text: "useClickAway",
            //   link: "/useClickAway/",
            // },
            // {
            //   text: "useCountDown",
            //   link: "/useCountDown/",
            // },
            // {
            //   text: "useEventBus",
            //   link: "/useEventBus/",
            // },
            // {
            //   text: "useEventListener",
            //   link: "/useEventListener/",
            // },
            // {
            //   text: "useGlobalState",
            //   link: "/useGlobalState/",
            // },
            // {
            //   text: "useRect",
            //   link: "/useRect/",
            // },
            // {
            //   text: "useStorage",
            //   link: "/useStorage/",
            // },
            // {
            //   text: "useTitle",
            //   link: "/useTitle/",
            // },
            {
              text: "useToggle",
              link: "/useToggle/",
            },
            {
              text: "useWindowSize",
              link: "/useWindowSize/",
            },
          ],
        },
        {
          text: "useRequest",
          items: [
            {
              text: "快速上手",
              link: "/useRequest/",
            },
            {
              text: "基础用法",
              link: "/useRequest/basic",
            },
          ],
        },
      ],
    },
  },
});
