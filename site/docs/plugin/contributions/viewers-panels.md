---
title: 查看器与面板
description: ui.fileViewer 让一种文件有自己的查看 / 编辑器;ui.panel 挂进左栏;两者的第三方形态都跑在 T1 沙箱里。
sidebar_position: 5
---

# 查看器与面板

## `ui.fileViewer`:文件查看器 / 编辑器

让某类文件在文件工作台里有自己的打开方式:

```jsonc
"ui.fileViewer": [{
  "id": "acme.csv-view",
  "label": "表格查看",
  "matches": { "extensions": ["csv", "tsv"] },   // 也支持 filenames / mediaTypes
  "priority": 10,
  "capabilities": { "edit": true },              // 声明可编辑才拿得到写通道
  "entry": "dist/viewer.html"                    // 第三方 viewer = T1 沙箱入口
}]
```

- 匹配规则是 T0 声明;**UI 是代码,第三方一律走 T1 沙箱 entry**(内置 viewer 走同一套声明,第一方无特权)。
- 沙箱 viewer 经桥拿文件:`file:read` **没有路径参数**——只能读宿主指定的那一个文件;写回走 `file:write`(需 `workspace:write`)。要读任意文件,配自己的 T2 经 rpc。
- 同一文件多个 viewer 命中时按 `priority` 解析;贡献它的插件被停用后,宿主自动落到下一候选并提示,零候选显错误卡——**卡声明与用户预期永不静默失真**。
- `capabilities.edit: true` 才有脏标记(`dirty`)、保存请求(`save:request`)这套编辑生命周期。

## `ui.panel`:左栏面板

```jsonc
"ui.panel": [{ "id": "acme.outline", "label": "大纲", "slot": "rail", "order": 20 }]
```

面板挂在左缘窄条(与目录树同栏),点击开合。第三方面板同样是 T1 沙箱承载,经 `resize` 消息上报自适应高度。

## 载体裁决:三选一,只降级不崩

查看器、功能区、内容步这些「有界面的贡献」共用同一条装配裁决:

```
内置 React 实现(第一方) → T1 沙箱 entry(第三方唯一形态) → 降级占位
```

**渲染进程主文档永不执行插件代码**——第三方 React 组件直接挂进主文档在构造上被禁。降级占位有五档原因(未装 / 停用 / 待信任 / 加载失败 / 条件不满足),每档给不同的下一步指引。

## 页面样式三条硬约定

1. 颜色 / 间距 / 圆角 / 字号一律走宿主注入的 `--ck-*` token(init 与 `theme:changed` 下发),不写字面量——写死 `#fff` 的页面在暗色主题下就是一块白斑。
2. 不要自带正文字体,继承宿主的。
3. 尊重 `prefers-reduced-motion`。

`@channek/sandbox-sdk` 附带自动隐藏滚动条与 tooltip 等沙箱里自己造一遍很烦的小件。
