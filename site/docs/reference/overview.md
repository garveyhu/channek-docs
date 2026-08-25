---
title: 参考区说明
description: 契约速查表:贡献键、沙箱桥方法、清单校验规则、主题 token、格式规范与术语表。
sidebar_position: 1
---

# 参考区说明

这一区是**速查表**,不是教程——按表找答案,讲解去[风格卡开发](/docs/style-card/overview)与[插件开发](/docs/plugin/overview)。

| 表 | 查什么 |
|---|---|
| [贡献键全表](/docs/reference/contribution-keys) | 插件能在 `contributes` 里声明的全部扩展点(41 个) |
| [沙箱桥方法全表](/docs/reference/suite-bridge-ops) | T1 沙箱插件能调的全部宿主方法(34 条,封闭白名单) |
| [清单校验规则](/docs/reference/manifest-rules) | `manifest.json` 被拒时的规则编号与含义 |
| [主题 token](/docs/reference/theme-tokens) | 插件界面可用的全套 `--ck-*` 设计变量 |
| [风格卡字段速查](/docs/reference/card-schema) | 卡 `card.json` 的分层与全部段名 |
| [.channek 工程格式](/docs/reference/project-format) | 时间轴工程文件的公开规范要点 |
| [术语表](/docs/reference/glossary) | 全站名词的一句话定义 |

:::warning 版本口径
这些表随 app 版本更新,**以你安装的 app 内契约为准**;文档站可能滞后于最新发布。契约遵循「只增不改」:已发布的键与字段不会被删除或改义,只会追加。
:::
