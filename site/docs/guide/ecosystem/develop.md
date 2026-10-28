---
title: 成为开发者
description: 两条路:自己读手册写,或者装官方 agent skills 让你的 AI 助手替你写——推荐后者,零门槛。
sidebar_position: 2
---

# 成为开发者

Channek 的一切可变能力都长在生态上——你完全可以自己造。有两条路:

- **自己读手册写**:[频道卡开发](/docs/style-card/overview)(纯数据,会写 JSON 就能上手)、
  [插件开发](/docs/plugin/overview)(从零到发布的完整路径)、[契约参考](/docs/reference/overview)。
- **让你的 AI 助手替你写(推荐)**:装官方 agent skills,然后用大白话提需求就行——不需要先看懂
  任何一页手册。下面展开这条路。

## 官方 skills:让你的 AI 懂 Channek

如果你用 Claude Code、Codex 这类 AI 编码助手,装上
[**channek-skills**](https://github.com/garveyhu/channek-skills) 之后,你的 AI 就自带了
Channek 的卡格式、插件协议与全部扩展点契约——不用你把文档一页页粘给它:

| skill | 装了它,你的 AI 就会 |
|---|---|
| `channek-card-dev` | 替你做一个频道:写、改、校验频道卡 `channel.json`,并打包成 `.channel` 分发 |
| `channek-plugin-dev` | 替你开发插件:选形态、写 manifest、实现、调试、打包发布 |

## 安装

以 Claude Code 为例(其它认 `SKILL.md` 约定的助手同理,把目录放进它的 skills 发现目录):

```bash
git clone https://github.com/garveyhu/channek-skills.git
cd channek-skills

# 装进你的项目(推荐)
mkdir -p <你的项目>/.claude/skills
for s in channek-card-dev channek-plugin-dev; do
  ln -s "$(pwd)/$s" <你的项目>/.claude/skills/
done
```

不想用软链就把 skill 目录整个拷过去;以后升级就是一次 `git pull`。

## 装好之后,直接说需求

不用背术语,用你自己的话讲就行:

> 「帮我做一个 Channek 频道:我做美食探店视频,流程是选店、写脚本、实拍粗剪、配音、发布。」
>
> 「我想给 Channek 加一个功能:把成片自动传到我的网盘。」
>
> 「Channek 能不能换皮肤?帮我做一套暗紫色主题。」

你的 AI 会**先问你几个问题**把需求聊清(分几步?给自己用还是发布?要不要碰网络?),
然后给出方案、写出文件,最后告诉你怎么装进 Channek 验证。它被要求说人话——
听不懂随时让它换个讲法。

:::info
skill 内容与本文档站同源维护,契约表随 app 版本更新。发现偏差以 app 内行为为准,欢迎提 issue。
:::
