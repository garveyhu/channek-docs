---
title: pipeline 流程声明
description: 用有序的步骤数组声明内容怎么做出来——key 与 step 的分工、模板继承、缺步降级与静态体检。
sidebar_position: 3
---

# pipeline 流程声明

`pipeline` 段声明这个频道的内容**怎么一步步做出来**。它是卡最核心的一段:界面的进度灯轨、每步的工作台页面、自动化执行器,读的都是同一份声明。

```jsonc
"pipeline": {
  "template": "channek.explainer-9",   // 可选:继承一个出片模板的步序
  "steps": [                            // 有序数组;给出则整体覆盖 template 的步序
    { "key": "topic",   "step": "acme.topic" },
    { "key": "script",  "step": "acme.script", "config": { "systemPromptRef": "prompts/script.md" } },
    { "key": "review",  "step": "acme.review-gate", "optional": true },
    { "key": "edit",    "step": "channek.edit" },
    { "key": "publish", "step": "acme.publish", "config": { "platforms": ["bilibili"] } }
  ]
}
```

## key 与 step 的分工

| 字段 | 是什么 | 规则 |
|---|---|---|
| `key` | 这一步**在本频道流程里的实例标识** | 频道内唯一;工件归属、进度记录、灯轨锚点都按它记账 |
| `step` | **步骤定义 id**,由插件注册 | 同一个步骤定义可在一条流程里出现多次(不同 `key`) |
| `config` | 本步的配置 | 按步骤定义声明的 config schema 在**保存/导入卡时**静态校验 |
| `optional` | 缺了能不能跳 | `true` 时自动执行器跳过并如实记 `skipped`,否则停在该步等输入 |

## 一步的两面

一个步骤定义可以有**自动化面**(机器执行)和**工作台面**(人工界面)之一或全有。两面全有,就是「AI 自动跑 + 人工精修」的典型形态。系统解析 `step` id 时至少要命中一面。

**步的粒度是创作者的心智单位**:一步的自动化实现内部可以编排多个机械子动作(渲染步内部可能包含烘焙、合成、质检),那些是实现细节;流程声明里的一步,应该是创作者能一句话说清的一件事。

## 模板继承

`template` 引用一个**出片模板**(由插件贡献的预设步序)。三种写法:

- 只写 `template`:整套用模板的步序;
- 只写 `steps`:完全自定义;
- 两个都写:`steps` **整体覆盖**模板步序(不是合并)。

## 缺步降级:流程不因缺件崩溃

`step` id 在本机解析不到(插件没装)时:

- 灯轨**照常显示**该步,工作台位置渲染占位卡:「此步由插件 `<id>` 提供 · 未安装」,附安装引导;
- 自动化执行器:`optional: true` 则跳过记 `skipped`,否则停在该步。

**只降级、不崩溃、绝不静默隐藏**——收卡人永远看得到完整流程的形状,知道缺什么、去哪补。

## 静态体检

保存与导入时,流程 linter 会静态检查(错误在写卡时暴露,不是用户跑到第 5 步才炸):

- `key` 不重复;
- 每步声明的**输入工件**(consumes)被上游的**产出工件**(produces)或条目初始工件覆盖;
- 引用的工件 kind 都已注册;
- `config` 通过步骤定义的 schema;
- 缺步是 **warning** 不是 error(缺步不阻断导入,这是设计而非宽松)。

:::note
步骤的输入输出衔接靠**类型化工件**,不靠步骤间直接对话——这是流程可以随意换步、插步而不牵一发动全身的原因。工件机制见[layout 与工件](./layout-artifacts.md)。
:::

## editor 段:剪辑步的预设

流程里命中内核剪辑步(`channek.edit`)时,新工程按卡的 `editor` 段初始化:

```jsonc
"editor": {
  "trackTemplate": [                     // 新建工程的轨道布局
    { "kind": "video", "name": "V1" },
    { "kind": "caption", "name": "TXT" },
    { "kind": "audio", "name": "旁白" }
  ],
  "macros": ["acme.removeSilences"],     // 默认启用的编辑宏
  "panels": ["acme.mixer"],              // 默认开启的编辑器面板
  "exportPreset": "acme.h264-master"     // 默认导出预设
}
```
