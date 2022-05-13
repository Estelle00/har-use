import { defineConfigWithTheme } from "vitepress";
export default defineConfigWithTheme({
  title: "har-use",
  lang: "zh-cn",
  themeConfig: {
    docsDir: "src",
    editLinks: true,
    socialLinks: [
      {
        icon: "github",
        link: "https://git.huianrong.com/frontend/har-use"
      }
    ],
    nav: [
      {
        text: "基础工具",
        link: "/useToggle/"
      },
    ]
  }
});
