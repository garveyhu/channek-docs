---
title: 五分钟写第一个插件
description: 最小可用的 T0 主题插件:一份 manifest.json,装上即生效,改了自动热重载。
sidebar_position: 2
---

# 五分钟写第一个插件

最快能看到效果的插件形态是 **T0 主题**——零代码,一个文件。

## 目录

```
~/.channek/plugins/acme.warm-night/
└── manifest.json        # 就这一个文件(可选再加 fonts/ 自带字体)
```

## manifest.json

```json
{
  "manifestVersion": 1,
  "id": "acme.warm-night",
  "name": "暖夜",
  "version": "1.0.0",
  "description": "更深的暖砂暗色主题",
  "author": { "name": "acme" },
  "minAppVersion": "0.1.0",
  "trust": "declarative",
  "contributes": {
    "ui.theme": [{
      "id": "night",
      "label": "暖夜 · 暗",
      "base": "dark",
      "tokens": {
        "--ck-surface": "#17150f",
        "--ck-accent": "#8a9b6e"
      },
      "preview": { "surface": "#17150f", "ink": "#e8e2d4", "accent": "#8a9b6e" }
    }]
  }
}
```

放好后:**设置 → 第三方插件 → 重新扫描 → 启用 → 外观页选中它**。之后改 manifest 里的 token 值会**自动生效**(热重载)。

## 五个要点

- `id` 必须是 `<作者>.<名字>` 全小写点分——它是全局唯一主键,`channek.` 前缀保留给官方,第三方用了会被拒载。
- `trust: "declarative"`(T0)的 manifest 里**不能**出现 `entries` / `permissions`——出现即校验失败。
- **主题没有自由 CSS**:能力 = 白名单 token + 可选 `fonts` 自带字体(woff2)。这是刻意的安全设计(防钓鱼层与点击劫持),写错 token 名时校验错误会提示最相近的合法 token。可覆盖 token 全表见[参考 · 主题 token](/docs/reference/theme-tokens)。
- 间距 / 字号 / 行高动不了——布局节奏是产品工艺,不外包给皮肤。
- 建议一次交付亮、暗两条 `ui.theme` 贡献,分别挂在 `base: "light"` 与 `base: "dark"` 上。

## `description` 是清单里那一行,不是注释

它出现在插件列表里,一行灰色小字,回答一个问题:**「装了它我能做什么」**。

```jsonc
// 好
"description": "把音视频转成带词级时间戳的文稿,本机与云端服务可换。"
// 坏:把详情页搬进了列表,且装一家新的就过期
"description": "一条 channek.asr 能力,四家供应商:whisper.cpp、faster-whisper、…"
```

三条规矩:一句话、中文 40 字上下;说能做什么,不说怎么实现(信任级已由徽章说了);**不枚举会变的东西**(供应商家数、平台名单——详情页自己会列)。

## 然后呢

- 想做一条真能干活的能力(出图 / 配音 / 转写)→ [能力体系](../contributions/capability.md)
- 想做一整页界面 → [整页功能区](../contributions/suite-section.md)
- 先把 manifest 各字段搞清楚 → [manifest 基础](./manifest.md)
