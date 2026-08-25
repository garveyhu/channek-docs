---
title: 风格卡字段速查
description: card.json(formatVersion 2)的分层结构与全部段名;顶层必填只有五个。
sidebar_position: 6
---

# 风格卡字段速查

风格卡 `card.json` 是分层的纯数据。**顶层必填收缩到最小,其余全部可选**——没有画风锁的实拍频道、不配音的字幕流频道都是合法卡;但**某段一旦出现,就按该段的 schema 严格校验**。

## 顶层必填(5)

| 字段 | 值 |
|---|---|
| `schema` | 固定 `"channek.stylecard"` |
| `formatVersion` | 固定 `2` |
| `id` | 卡 id(`<发布者>.<名字>`) |
| `name` | 显示名 |
| `slug` | 短名(用于目录等) |

顶层可选元字段:`face` / `cardVersion` / `createdAt` / `modifiedAt`。

## identity 层——这个频道是谁

| 段 | 内容 |
|---|---|
| `identity` | 定位、人设、受众、内容形态。 |

## style 层——风格(全部可选段)

| 段 | 内容 |
|---|---|
| `brand` | 品牌 token(色板、字体;`accent` 必须引用 `colors` 里的键)。 |
| `locks` | 画风锁 / 风格约束。 |
| `voice` | 音色档案(`default` 必须引用 `profiles` 里的键)。 |
| `captions` | 字幕样式。 |
| `cover` | 封面规格。 |
| `audio` | 混音规则。 |
| `libraries` | 素材库索引。 |
| `generation` | 生成默认(画布尺寸等)。 |
| `freeze` | 冻结闸(哪些东西不许再动)。 |
| `docs` | 频道知识文档索引(章程 / QC 清单等)。 |
| `platforms` | 平台档案表。 |
| `publish` | 发布配置。 |
| `secretsNeeded` | 作者显式补充的密钥 id(主清单由能力提供者声明自动推导)。 |

## process 层——流程

| 段 | 内容 |
|---|---|
| `pipeline` | 步序声明:`template`(引用一个出片模板)与 / 或 `steps[]`(每步 `key` + `step` + 可选 `config` / `optional`)。 |
| `layout` | 目录布局:`preset` / `contentDir` / `entryDirName` / `sections` / `artifacts`(按工件 kind 覆盖默认落点)。 |
| `editor` | 剪辑台预设:`trackTemplate` 轨道模板、默认宏 / 面板 / 导出预设。 |
| `prompts` | prompt 资产索引(名字 → 卡内相对路径)。 |
| `config` | 卡自声明的可编辑配置表(驱动设置界面渲染)。 |

## presentation 层——呈现

| 段 | 内容 |
|---|---|
| `presentation` | 频道启用哪些功能区(`sections[]`,数组序 = 导航序)与 `defaultSection`。 |
| `meta` | 市场元信息:`description` / `icon` / `cover` / `preview[]` / `trailer` / `homepage` / `repository` / `license` 等。 |

## needs 层——依赖

| 段 | 内容 |
|---|---|
| `requires` | `app` 版本门、`providers[]` 能力偏好链、`plugins[]` 插件依赖、`secrets[]` 显式补充。 |
| `bundle` | 打包声明(导出 `.channekcard` 时带什么)。 |
| `runtime` | 环境与模型需求声明。**只声明需要哪些端点,绝不存值**——端点的具体地址 / 密钥属于本机插件设置,写进卡会被校验拒绝。 |
| `pluginSettings` | 随卡建议的插件设置。 |
| `metadata` | 自由扩展位(命名空间键)。 |

## 可移植红线

卡内**绝不落**:密钥值、本机绝对路径、机器特定选择。这三样属于本机设置或工作区侧车,写了要么校验拒绝、要么导出时被剥离。原因:卡要在别人机器上活。

:::info
完整的段内字段与校验细节见[风格卡开发](/docs/style-card/overview);此表只作段名速查。契约以 app 附带的卡 schema 为准。
:::
