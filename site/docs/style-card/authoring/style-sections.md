---
title: style 各段速览
description: 品牌 token、画风锁、音色档、字幕、封面、混音、素材索引、生成默认与冻结闸——逐段说清干嘛用、关键字段是什么。
sidebar_position: 2
---

# style 各段速览

style 层回答「这个频道的产出长什么样、听起来什么样」。每段都可选,按你的频道需要挑着写。

## brand 品牌

品牌的**冻结 token**:色板、字体、描边、圆角、栅格,以及可选的 IP 吉祥物档案。

```jsonc
"brand": {
  "tokens": {
    "colors": { "paper": "#FFF8EE", "ink": "#111111", "mint": "#3FD8C7" },
    "accent": "mint",                       // 必须是 colors 里的键
    "fonts": {
      "display": ["Anton", "sans-serif"],   // 三槽:标题 / 正文 / 等宽
      "body": ["Noto Sans SC", "sans-serif"],
      "mono": ["JetBrains Mono", "monospace"]
    },
    "stroke": 3, "radius": 16, "grid": 8
  },
  "mascot": {                                // 可选:IP 形象档案
    "name": "阿黑",
    "visualPrompt": "…",                     // 生成该形象时的锚定描述
    "assetRef": "brand/ip/阿黑"              // 频道根内相对路径
  }
}
```

## locks 画风与声线锁

**生成一致性的锚**。`visualStyle` 锁视觉(生成后端、种子、风格提示词、负面提示词),`motionSound` 锁声音质感与转场语言。所有生成步都该从这里取锚,而不是各步自己发挥。

```jsonc
"locks": {
  "visualStyle": {
    "backend": "acme.image-gen",     // 首选生成后端(providerKind)
    "imagePrompt": "flat memphis …", // 风格锚提示词
    "negativePrompt": "…",
    "seed": 42                        // 可空
  },
  "motionSound": {
    "sound": { "bgm": { "enabled": true, "genre": "lofi" }, "sfx": { "palette": "soft" } },
    "transitions": ["cut", "whip"]
  }
}
```

## voice 音色档

`default` 指向 `profiles` 里的一档。每档记引擎(providerKind)、参考音、语速等:

```jsonc
"voice": {
  "default": "narrator",
  "profiles": {
    "narrator": {
      "engine": "acme.tts",       // 引用 providerKind,不锁实现路径
      "promptText": "参考音的文本",
      "speedCps": 5.1              // 该音色的整体配速(中文字/秒),写稿估时窗用
    }
  }
}
```

:::warning
`modelPath`(本机模型路径)已弃用:它在别人机器上不存在。模型这类**机器特定资产**属于插件的本机设置,不属于卡;导出时这类字段会被自动剥离。
:::

## captions 字幕 · cover 封面 · audio 混音

- `captions`:是否高亮、最大行数、每行词数、描边风格(`none` / `soft` / `hard` / `pill`);
- `cover`:封面生成配置文件的路径(`config`,相对频道根),规则复杂所以放独立文件;
- `audio`:垫乐(`bed`)、首尾呼吸留白(`headBreath` / `tailBreath`)、TTS 细调参数。

## libraries 素材索引

频道素材库的**索引条目**(声音 / 素材 / 场景 / 复用片段),每条 `{ key, path, kind?, name? }`,路径相对频道根。素材库目录本身在哪,由 `layout.cardAssets.libraries` 声明(见[layout 与工件](./layout-artifacts.md))。

## generation 生成默认

全频道的生成参数缺省:画幅比 `aspect`、帧率 `fps`、画布尺寸 `canvas`、出图尺寸 `imageSize`。步骤 config 没写时落到这里。

## freeze 冻结闸

三个布尔开关:`visualTokens` / `voice` / `visualStyle`。**冻结后,自动流程不得再改动对应资产**——品牌一旦定稿,就不该被某次生成悄悄漂移。`frozenAt` 记冻结时间。

## docs 文档挂载 · platforms 平台

- `docs`:频道章程(`charter`)、IP 简报(`ipBrief`)、品牌规范(`brandSpec`)等文档的路径(相对频道根)——这些会作为「频道知识」提供给 AI 层,让 AI 干活时懂这个频道的口径;
- `platforms`:各发布平台的开关与配置(`{ "<平台键>": { "enabled": true, … } }`),平台清单由发布插件定义,卡不收窄。

:::note
`publish.profileDir`(浏览器登录态目录)是机器特定字段,可以在本机用,但导出时会被剥离——别指望它跟卡走。
:::
