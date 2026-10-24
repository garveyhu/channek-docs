---
title: 出片流程:步、工件与卡
description: 一「步」= 工作台面(ui.contentStep)+ 自动化面(production.step),同 id 关联;步骤之间不直接对话,一切经类型化工件衔接;流程本身写在频道卡里。
sidebar_position: 7
---

# 出片流程:步、工件与卡

Channek 的出片流程**不是内核写死的**:用哪些步、什么顺序、每步什么配置,由频道卡 `pipeline` 段声明;每一步的实现由插件贡献。你可以给流程加一步(审稿闸、合规检查、翻译)、替换一步,或提供一整套流程模板。

## 一步的两面

一「步」= 可选的**工作台面**(`ui.contentStep`,人在里面干活的界面)+ 可选的**自动化面**(`production.step`,自动跑的 `run(ctx)`)。两个扩展点**同 id 关联**,至少命中一面;两面全有 = 「AI 自动跑 + 人工精修」步。

```ts
// ui.contentStep 的声明(要点)
{
  id: 'acme.review-gate',
  label: '审稿',
  kind: 'creative' | 'production',   // 泳道:创意步 / 机械步
  consumes: ['channek.script'],      // 硬依赖的工件类型(缺 = 上游漏产,导卡时静态报错)
  consumesOptional: [...],           // 有则用、无则跳
  produces: ['acme.review-note'],    // 产出的工件类型 = 写权限白名单
  entry: 'dist/step.html',           // 第三方步的 T1 沙箱工作台
  configSchema: { ... }              // 卡内本步 config 的静态校验
}
```

- **步序真相 = 卡的 `pipeline.steps` 数组**,decl 不决定顺序。同一步定义可在一条流程里出现多次(不同 key)。
- **缺步不崩**:卡引用的步没装时,进度灯轨照常显示该步 + 工作台位置渲染占位卡(「此步由插件 X 提供 · 未安装」),流程只诚实降级。
- 剪辑步(`channek.edit`)是内核步,永远可用、不可被第三方替换。

## 工件:步骤解耦的骨架

**步骤之间不直接对话,一切经类型化工件衔接。** 每种工件由 `workspace.artifactKind` 声明:

```ts
{ kind: 'acme.shotlist', label: '分镜清单',
  storage: { pattern: '分镜/shotlist.json', format: 'json' },
  schema: { ... } }
```

- 内核只自带两个与创作域无关的 kind(条目清单 `channek.entry`、工程 `channek.project`);「口播稿 / 旁白轨 / 母版 / 封面」这些视频域的 kind 由贡献对应步骤的插件带。
- `pattern` 只是默认落点,**卡的 `layout.artifacts` 可以覆盖**——内核不认识任何具体文件名,按语义 id 解析路径。
- **写权限 = 声明即边界**:步的读集 ⊆ `consumes ∪ produces`,写仅限 `produces` 解析出的路径;`.channek` 工程文件恒不在任何步的可写集里(改工程只能提议 `EditTransaction`)。
- **进度灯轨从工件推导**:每步灯色来自工件的存在性与新鲜度链,不信内存标志——「诚实灯轨」的通用机制。想要更富的灯态判定,贡献一个 `production.analyzer`。

## 流程模板与卡

- `production.template`:一组预设步序 + 默认参数(比如「知识科普 9 步」「口播快剪 6 步」),卡的 `pipeline.template` 引用之;卡自己给出 `steps` 时整体覆盖模板。
- `workspace.styleCard`:T0 插件可以**携带频道卡模板**——装上插件,你的频道模板就出现在「新建频道」向导里(官方模板库与社区频道包走这条)。
- `workspace.layout`:目录布局 preset(内容目录在哪、条目怎么命名、工件落点),让「换一个目录结构完全不同的频道」也能被正确扫描。

**卡与插件的分工**一句话:**卡是配置,插件是能力**。卡只声明「用哪些步、要哪些能力、目录长什么样」,不含代码;能力做成插件、可复用,任何卡都能点名它。要理解卡本身怎么写,见[频道卡模块](/docs/style-card/overview)。

## 实现状态

:::note 按现状写插件
`ui.contentStep` 的声明面与 T1 沙箱承载已可用(沙箱步的 init 收到步 / 条目 / 工件路径等纯数据,后续数据走 suite 桥);`production.step` 自动化面、`production.template`、`workspace.artifactKind` / `workspace.layout` 的第三方贡献链路仍在推进中——契约以本页描述的形状冻结方向,落地前以 app 当前版本的校验为准。拿不准就先做工作台面(T1),自动化面等扩展点开闸。
:::
