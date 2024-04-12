import { sidebar } from "vuepress-theme-hope";

// 精选图标：https://theme-hope.vuejs.press/zh/guide/interface/icon.html#iconfont-%E7%B2%BE%E9%80%89%E5%9B%BE%E6%A0%87
export default sidebar({
    "": [

        // 指定显示页面
        {
            text: "🧑‍💻zigbee",
            icon: "zigbee",
            prefix: "/protocol/ZigBee",
            collapsible: true,
            children: ["zigbee-table.md", "zigbee-routing.md"],
        },

        // 指定显示页面
        {
            text: "LTE",
            icon: "lte",
            prefix: "/protocol/LTE",
            collapsible: false,
            children: ["sim.md", "network.md", "lte_physical.md", "oper_name.md"],
        },
    ],
    // 专题区
    "/apps/topic/": "structure",
});
