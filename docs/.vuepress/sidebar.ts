import { sidebar } from "vuepress-theme-hope";

// 精选图标：https://theme-hope.vuejs.press/zh/guide/interface/icon.html#iconfont-%E7%B2%BE%E9%80%89%E5%9B%BE%E6%A0%87
export default sidebar({
  "": [

    // 指定显示页面
    {
        text: "🧑‍💻协议积累",
        icon: "",
        prefix: "/protocol/",
        collapsible: true,
        children: [
          "README.md",
        ],
      },
  ],
  // 专题区
  "/apps/topic/": "structure",
});
