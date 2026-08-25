---
title: 能力体系:定义与供货
description: 「能力」是一张共享词汇表——channek.image 不属于任何插件,谁都可以实现它;卡与命令行按名字要东西,宿主排候选链。
sidebar_position: 1
---

# 能力体系:定义与供货

把「出图 / 配音 / 转写 / 推理」做成一条**能被卡、被 app、被命令行同样调到**的能力,是今天最常见的插件形态。

## 一条「能力」是什么

**能力 id 是一张共享词汇表。** `channek.image` 不属于任何插件——谁都可以实现它。调用方按这个名字要东西,宿主按这个名字排一条候选链:装了三个出图插件就有三条候选,按序逐条试,每条为什么没用上都如实记账。

由此推出三条:

- **接口归能力,不归 provider。** 换一家 provider 不换参数名,否则候选链是假的。所以定义(`capability.definition`)与供货(`capability.provider`)是两个扩展点。
- **调用方拿到的是已经算完的答案。** 配置合并、选路、路径解析发生在 app 写盘那一刻,产物是能力目录 `capabilities.json`——读它的人不需要认识插件、配置分层或钥匙串。
- **一条能力必须有至少两个实现塞得进去**,否则那是你插件的私有命令,用 `ui.command` 就够了。

## 第一个决定:供货还是开新能力

- **给已有能力供货**(多数情况):只写 `capability.provider`,能力 id 用现成的(`channek.image` / `channek.tts` / `channek.asr` …)。
- **开一条新能力**(少数情况):加写 `capability.definition`。**别去重定义别人已经定义的能力**——多方定义同一 id 不是错,但签名分叉会被记成 `definitionConflicts` 摆在体检里。

## 定义:`capability.definition`

```jsonc
"capability.definition": [{
  "id": "acme.subtitle-translate",
  "label": "字幕翻译",
  "inputs": [
    { "key": "cues", "type": "file", "required": true,
      "description": "字幕 cue 文件(json)。" },
    { "key": "targetLang", "type": "string", "required": true,
      "sample": "en", "description": "目标语言代码,如 en / ja。" }
  ],
  "output": { "type": "json", "formats": ["json"] },
  "turnaround": "brief"
}]
```

要点:

- `id` 用 `<域>.<能力>` 全小写点分;`channek.*` 保留给内核,第三方不得占用。
- `inputs[].type` ∈ `text` / `string` / `number` / `boolean` / `file`。`as: "inline|file"` 表示长文本可由调用方落成临时文件传路径(三千字的稿子直接上命令行会撞参数长度上限)。注意 `type: 'file'`(值本来就是路径)与 `as: 'file'`(值是正文、替我落成文件)不是一回事。
- `turnaround`:`brief`(调完就返回、等得起)/ `extended`(几十秒到几分钟起,缺省)。**不声明不等于快**——一次性等待的调用方(比如 AI 工具)只调 `brief` 的。
- `sample` / `sampleFile` 喂详情页的「用样例」按钮与 CLI 示例命令,见[详情页](../concepts/detail-page.md)。
- **inputs 与 params 的分界**:每次调用会变的 → `inputs`;装的人配一次的 → `params`(设置)。拿不准放 `params`——`params` 挪进 `inputs` 是加字段(安全),反向是破坏性变更。接口薄,换一家才塞得进来。

## 供货:`capability.provider`

```jsonc
"capability.provider": [{
  "id": "acme.local-tts",
  "label": "本机推理",
  "capabilities": ["channek.tts"],
  "invoke": { "kind": "command", "…": "见「调用形态」一页" },
  "credentials": [ /* 见「密钥」 */ ],
  "traits": { "runsLocally": true, "languages": ["zh", "en"] }
}]
```

- `id` 会被卡的 `prefer`、命令行的 `--prefer` / `--only`、设置页的归属引用——**用带前缀的形态**,一条能力的设置页会并排显示别家的供应商。
- 一条 provider 可同时提供多种能力(一个网关既出图又出视频是常态);一个插件声明多条 provider 也是常态(本机一条、云端一条)。
- `traits` 是静态筛选与展示用(内核只做存在性与相等比较,不做运行时协商)。`runsLocally` 与 `needsNetwork` 两个轴分开声明——见[详情页](../concepts/detail-page.md)。
- **信任级**:`kind: 'command'` 的 provider 让调用方 spawn 本机命令,威胁面是 T2 的,契约要求 `trust: "privileged"`;只发 HTTP 的能力用 `kind: 'http'` 可留在更低信任级——**能不上 T2 就不上**。

## 内核自己也在索取能力

内核不带任何转码二进制,媒体侧的活按能力 id 向插件索取——做这些 provider 时逐条对齐约定的输出格式:

| 能力 id | 内核用它干什么 | 产出 |
|---|---|---|
| `channek.media-thumbnail` | 素材导入出缩略图 | png |
| `channek.media-preview` | 悬停动图预览 | webp |
| `channek.audio-decode` | 静音判定 / 转写的抽音轨 | wav(裸 16-bit PCM,按 inputs 给的采样率与声道) |
| `channek.media-trim` | 导出收尾收容器时长 | mp4 |

装零个插件时它们一条都不可用,内核如实报「这台机器没有这本事」——这正是能力体系「壳子 + 贡献」的日常形态。

接下来:[调用形态与占位符](./capability-invoke.md) → [候选链与命令行](./capability-cli.md)。
