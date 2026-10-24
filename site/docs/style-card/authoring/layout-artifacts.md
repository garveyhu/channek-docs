---
title: layout 与工件
description: 目录结构不是硬编码——工件按语义 id 解析,路径由卡回答;layout 段声明内容在哪、产物落哪、频道里的资源摆在哪。
sidebar_position: 4
---

# layout 与工件

## 内核不认识文件名,只认语义 id

Channek 内核里**没有任何具体的工件文件名**。凡「找某类产物在哪」,系统只写**工件 kind**(如 `channek.entry`、`acme.script`),实际路径按这条链解析:

```
kind 的默认 pattern(注册该 kind 的插件声明)
  → 被卡 layout.artifacts 逐 kind 覆盖
  → 相对条目目录解析出真实路径
```

这意味着:**换一套目录结构 = 换一段声明**,不用改任何代码。你的频道想把母版放 `master/final.mp4` 而不是默认位置,写一行覆盖就行。

内核只自带两个与创作域无关的 kind:

| kind | 默认 pattern | 承载 |
|---|---|---|
| `channek.entry` | `entry.md` | 条目清单:一条内容的状态机(状态/所在步/阻塞原因) |
| `channek.project` | `project/{slug}.channek` | 剪辑工程文件 |

其余工件 kind(口播稿、分镜、旁白轨、母版、封面……)**由贡献对应步骤的插件注册**——它们是具体创作域的知识,不同频道用的完全不同。

## layout 段

```jsonc
"layout": {
  "preset": "channek.default",              // 布局骨架(内核默认:contentDir 'content')
  "contentDir": "work/runs",                 // 条目容器目录(相对频道根)
  "entryDirName": "{date}-{slug}",           // 新条目目录命名模板
  "sections": [                              // 辅助区(情报/选题库/复盘…)
    { "id": "intel", "path": "work/intel", "index": "index.md" },
    { "id": "qc", "path": "sop/lessons", "recipe": true }   // 标了 recipe = 菜谱,随卡分享
  ],
  "artifacts": {                             // 逐 kind 覆盖默认 pattern(唯一写位置)
    "acme.master": "master/final.mp4"
  },
  "artifactAlsoRead": {                      // 读时也认的备用位置(不影响写)
    "acme.script": ["脚本*.md"]
  },
  "detect": { "anyOf": ["work/runs"] }       // 「这个目录像不像本卡的频道」的探测线索
}
```

关键规则:

- **写位置永远只有一个**(`artifacts` 的 pattern);`artifactAlsoRead` 只扩大**读**的范围——多个写位置意味着产物落哪不确定,那比少认一个位置严重得多;
- `artifacts` / `artifactAlsoRead` 的语义都是**替换不是追加**:卡说了就完全按卡说的算;
- `contentDir` 与 `sections` 默认是**做出来的东西**(菜),分享时不进包;质检教训这类属于做法的区,标 `recipe: true` 就随卡走、算卡文件;
- 新建频道时按 layout 搭目录骨架(`contentDir` + `sections` + 资源目录),打开根目录没有频道卡的目录时按 `detect` 探测。

## cardAssets:频道里的资源摆在哪

内容目录之外,频道里**做法那一半**的资源约定也归 layout 声明(频道卡的卡根就是频道根,下面的路径都相对频道根):

```jsonc
"layout": {
  "cardAssets": {
    "libraries": {
      "sound": "brand/素材库/声音",  // 声音库目录(频道根内相对路径)
      "asset": "brand/素材库/图形",
      "scenes": "brand/素材库/场景",
      "skills": "sop/skills",       // 频道专属 skill 目录(给用户的 AI Agent 读;卡写了 agent.skills 时以它为准)
      "fonts": "fonts"              // 卡自带字型目录
    },
    "docs": { "docs.charter": "channel.md" },    // 文档挂载:卡字段 → 频道根内路径
    "brandAssets": {
      "root": "brand",
      "avatar": ["头像/main.png", "头像/fallback.png"]   // 有序候选,按序回落
    }
  }
}
```

**内核对 cardAssets 没有默认值**——素材库、品牌套件叫什么是创作域知识,卡没声明就是没有,系统一个目录都不会去猜。

:::warning
`cardAssets` 里的库路径必须是**遏制在频道根内的相对路径**——绝对路径、盘符、含 `..` 的逃根路径都会被 schema 直接拒绝。这些路径会被拼在频道根后面直接上盘,放行逃根等于让导入的卡把软链指到频道外,那是路径逃逸漏洞,不是配置自由。
:::

## 诚实进度:灯轨从工件推导

进度灯轨的灯色**从工件的存在性与新鲜度链推导**,不信内存标志——产物在就是在,不在就是不在,上游更新了下游就显示过期。`layout.progressAnalyzer` 可以为这套布局指定一个进度分析器(语义 id,只在已注册的分析器里选);不写或认不出,落到通用的「如实报产物在不在」。
