---
title: 贡献键全表
description: 插件在 manifest.json 的 contributes 里可用的全部扩展点键,共 40 个,按域分组。
sidebar_position: 2
---

# 贡献键全表(扩展点)

插件在 `manifest.json` 的 `contributes` 里按这些键贡献东西,共 **40** 个。这张表是**声明面**的全集;每个键的契约类型以 app 附带的插件 SDK 类型定义为准。

## ui —— 界面贡献(13)

| 贡献键 | 它是什么 |
|---|---|
| `ui.command` | 一条用户可触发的操作。按钮、菜单、快捷键与 AI 调用都是它的触发器。 |
| `ui.contentStep` | 内容流程里一「步」的人工工作台界面(与 `production.step` 同 id 关联)。 |
| `ui.contentSurface` | 一条内容的详情页由谁承载。 |
| `ui.fileViewer` | 文件工作台里某类文件的预览器。 |
| `ui.iconTheme` | 图标主题。 |
| `ui.keybinding` | 快捷键绑定。 |
| `ui.menu` | 菜单项(挂到既有菜单槽位)。 |
| `ui.panel` | 侧栏面板(活动栏面板类)。 |
| `ui.settingsSection` | 设置页里的一个区段。 |
| `ui.submenu` | 一个二级子菜单节点(顶层显示为「标题 ▸」)。 |
| `ui.suiteSection` | 一个功能区(主区舞台的整页区,由卡的 `presentation` 声明启用)。 |
| `ui.theme` | 颜色主题。 |
| `ui.viewerAction` | 文件预览器上的操作按钮。 |

## production —— 出片流程(3)

| 贡献键 | 它是什么 |
|---|---|
| `production.step` | 一步的自动化实现(与 `ui.contentStep` 同 id 关联,两面至少有其一)。 |
| `production.template` | 出片模板 = 一组预设步序;用它开新频道时展开一次,写进新卡的 `pipeline.steps`。 |
| `production.analyzer` | 进度真相模型:从工件推导每步灯色的分析器。 |

## generation —— 素材生成(4)

| 贡献键 | 它是什么 |
|---|---|
| `generation.provider` | 生成能力提供者(出图 / TTS / 视频生成等)。 |
| `generation.baker` | 把程序化场景烘焙成普通素材(footage)的烘焙器。 |
| `generation.preview` | 编辑期场景预览 bundle 能力;与离线烘焙分开,避免两条生命周期互相冒充。 |
| `generation.scene` | 场景渲染器(某种 `generatorKind` 的认领者)。 |

## publish —— 发布(1)

| 贡献键 | 它是什么 |
|---|---|
| `publish.platform` | 一个发布平台的对接实现。 |

## media —— 媒体管线(3)

| 贡献键 | 它是什么 |
|---|---|
| `media.importer` | 外部素材 / 第三方工程 → 初始 `.channek` 工程的导入器。 |
| `media.analyzer` | 「探一个媒体文件是什么」的探测器。 |
| `media.exportPreset` | 导出预设 = 一档「容器 + 编码 + 码率 + 采样率」的纯数据声明。 |

## ai —— AI 层(4)

| 贡献键 | 它是什么 |
|---|---|
| `ai.tool` | AI 可调用的工具。 |
| `ai.macro` | AI 宏(一串预编排的操作)。 |
| `ai.analyzer` | 内容理解分析器(转写 / 静音 / 口头禅 / 镜头等)。 |
| `ai.delegate` | 一个能接受托任务的贡献者(内核只发「受托执行」信封,谁接活由它回答)。 |

## editor —— 剪辑台扩展面(5)

| 贡献键 | 它是什么 |
|---|---|
| `editor.panel` | 剪辑台可停靠面板(左 / 右 / 底)。 |
| `editor.inspector` | 检查器区段,按选中对象类型匹配。 |
| `editor.assetSource` | 素材面板的来源页签(本地 / 频道素材池 / 云素材库等)。 |
| `editor.timelineBadge` | 时间轴 clip 上的声明式装饰(插件给数据、内核渲染)。 |
| `editor.surface` | 整个剪辑工作台由谁承载的声明面。 |

## workspace —— 频道与卡(3)

| 贡献键 | 它是什么 |
|---|---|
| `workspace.styleCard` | 随插件分发的频道卡模板(出现在「新建频道」向导里)。 |
| `workspace.artifactKind` | 一种类型化工件——步骤间唯一的数据衔接契约。 |
| `workspace.layout` | 频道目录布局 preset(目录探测与脚手架的数据源)。 |

## capability / credential / developer(4)

| 贡献键 | 它是什么 |
|---|---|
| `capability.definition` | 一条能力**吃什么、吐什么**的接口定义——接口归能力,不归提供者。 |
| `capability.provider` | 一条能力的具体提供者实现。 |
| `credential.kind` | 一种密钥长什么样(字段、校验、指引)。 |
| `developer.terminal` | 内置终端的一种终端档案。 |

:::info
40 = ui 13 + production 3 + generation 4 + publish 1 + media 3 + ai 4 + editor 5 + workspace 3 + capability/credential/developer 4。列在表里不等于每个点当前都已有消费方;某个点有没有人读它,以 app 版本说明为准。
:::
