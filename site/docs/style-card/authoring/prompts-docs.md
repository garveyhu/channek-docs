---
title: prompts 与频道知识
description: 提示词是频道品味的可迁移载体;章程与规范文档让 AI 干活时懂这个频道——两者都随卡分发。
sidebar_position: 7
---

# prompts 与频道知识

一个频道真正值钱的,往往不是目录结构,而是**打磨过的提示词与成文的口径**——写稿的系统提示词、分镜的风格指引、审稿标准、创作宪章。卡为这些「品味资产」提供了三个归位:

## prompts:提示词资产索引

```jsonc
"prompts": {
  "script": "prompts/script.md",       // 名字 → 卡内相对路径
  "storyboard": "prompts/storyboard.md",
  "review": "prompts/review.md"
}
```

提示词是**纯文本文件**,住卡目录里。流程步骤的 `config` 用引用指向它们:

```jsonc
{ "key": "script", "step": "acme.script", "config": { "systemPromptRef": "prompts/script.md" } }
```

为什么用引用而不是把提示词内联进 `card.json`:提示词会长、会频繁改,独立成文件才好维护、好 diff;而索引进卡,才能随卡打包分发。

## docs:频道知识挂载

`docs` 段(以及 `layout.cardAssets.docs`)把频道的成文口径挂进系统:

```jsonc
"docs": {
  "charter": "创作宪章.md",      // 频道章程:选题口径、不可越线的约束
  "brandSpec": "品牌规范.md",
  "readme": "README.md"
}
```

这些文档会作为**频道知识**注入 AI 层的上下文——AI 帮你写稿、剪辑、审片时,「懂这个频道」的依据就是它们。写卡时把口径写成文档,比指望每次对话现讲一遍可靠得多。

:::note
注入 AI 上下文的卡内文档**带来源标注、用户可见可关**——这是系统对「数据也有行为面」的防线,不是对作者的不信任。写文档时按「会被完整读到」的标准写即可。
:::

## skills:给 AI Agent 的方法论

`layout.cardAssets.libraries.skills` 声明的目录存放**频道专属 skill**——「这个频道怎么写稿 / 怎么做封面 / 怎么发布」的操作方法论,格式面向 AI Agent(每个 skill 一个目录,内含说明文档)。

打开频道时,应用把它们(连同已启用插件自带的 skill)摆到频道根的 `.claude/skills/` 下,**由用户自己的 AI Agent 读取执行**——应用本身不执行 skill。同名时卡里的优先。

三者的分工一句话:**prompts 喂给流程里的某一步,docs 喂给整个 AI 层,skills 喂给用户自己的 Agent。**

## 写这些资产时的边界

- 全部用**卡内相对路径**,不写绝对路径(schema 与导出都会拦);
- 提示词与文档里别写死本机信息(路径、端口、账号)——它们会原样随卡出门;
- 大体积媒体(参考视频、模板工程)慎入:分发体积直接决定你的卡装不装得动,见[打包 .channekcard](../distribution/packaging.md) 的瘦身原则。
