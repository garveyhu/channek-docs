<div align="center">

<h1><img src="https://cdn.archeruuu.com/images/channek/logo-triad.png" height="40" align="top" />&nbsp; Channek Docs</h1>

**协议公开到能照着做，才算公开。**

[English](README.md) · **简体中文**

![Docusaurus](https://img.shields.io/badge/docusaurus-3-333333?style=flat-square)
![Modules](https://img.shields.io/badge/modules-guide%20%C2%B7%20card%20%C2%B7%20plugin%20%C2%B7%20reference-555555?style=flat-square)
![Search](https://img.shields.io/badge/search-zh%20local%20index-005A9C?style=flat-square)
![Live](https://img.shields.io/badge/live-docs.channek.com-1A1A1A?style=flat-square)

</div>

---

> ### 开放面被写下来的那一半
> [Channek](https://www.channek.com) 内核闭源，**格式与协议规范公开**——卡格式、
> 插件 manifest、每一个扩展点契约。这个仓库就是把那份开放面写给人读的地方：怎么写一张风格卡、
> 怎么造一个插件、以及所有你会想查的契约表。
> 线上在 **[docs.channek.com](https://docs.channek.com)**；写给 AI 的另一册是
> [channek-skills](https://github.com/garveyhu/channek-skills)。

## 为什么一个站里住着两个应用

```
site/          # 文档本体——Docusaurus 3，白纸、精密、可搜索
flywheel/      # 《飞轮的内部》——自带孟菲斯视觉系统的滚动叙事页
```

文档要白到隐形，叙事页要硬阴影、网点底和一只眨眼的黑猫。把任何一边硬揉进另一边都是两败俱伤，
所以**各自构建、合成一个站**：文档在 `/`，叙事页挂在 `/story/`（构建时其产物落进
`site/static/story/`，站内用 `pathname://` 链接，绕开 SPA 路由）。

## 都有什么

| 面 | 讲什么 |
|---|---|
| **使用指南**（10 篇） | 安装、打开一个文件夹、认识频道与工作区、把第一条内容跑起来 |
| **风格卡**（15 篇） | `card.json` 逐层过、pipeline / layout / presentation / requires、可移植红线、打包 `.channekcard` |
| **插件开发**（25 篇） | 信任分级、沙箱运行时、manifest、各贡献域、打包与发布 |
| **参考**（8 篇） | 全部 41 个贡献键、34 条桥操作、清单校验规则、卡 schema、术语表 |
| **飞轮的内部**（`/story/`） | 一个真实频道在 Channek 上怎么运转——卡声明流程、插件供给能力、诚实灯轨 |

## 内容怎么改

- 正文都是 Markdown，在 `site/docs/<模块>/` 下；侧栏**由目录结构自动生成**
  （frontmatter `sidebar_position` + `_category_.json`），不手维护清单。
- 视觉 token 冻结在 `site/src/css/custom.css` 顶部——改色去那里，别在页面里散写。
- 叙事页的讲解文案单一落在 `flywheel/src/data/workflow.ts`，组件只吃数据。
- 契约参考表（贡献键 / 桥操作 / 校验规则）镜像自 app 仓库的**生成物**——内核契约变了，
  这边跟着改。**文档从不发明契约：拿不准就少写。**

## 跑起来

```bash
npm --prefix site install && npm --prefix flywheel install   # 首次

npm run dev:site      # 文档站 http://localhost:3000
npm run dev:story     # 叙事页 http://localhost:5173
npm run build         # flywheel → site/static/story → site/build
npm run serve         # 预览生产构建
```

构建产物是纯静态目录——把 `site/build/` 同步到源站，**就是发版本身**。

## 它在整盘棋里的位置

Channek 的护城河是引擎，生态长在**公开的格式与协议**上。承载这份开放面的有三样东西：
app 负责校验它，本站负责讲给人听，[channek-skills](https://github.com/garveyhu/channek-skills)
负责编给 coding agent 用。同一个事实源、三种读者——三边说法打架时，**app 的校验器才是对的那个**。
