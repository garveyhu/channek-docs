---
title: manifest 基础
description: manifest.json 的字段全貌:身份、信任级、入口、权限、激活事件、贡献。
sidebar_position: 3
---

# manifest 基础

`manifest.json` 是插件的说明书:它是什么、跑在哪一级信任、要什么权限、往哪些扩展点贡献什么。宿主装载前会完整校验它,error 级问题直接拒载并在插件列表里逐条列出。

## 字段总表

| 字段 | 必填 | 说明 |
|---|---|---|
| `manifestVersion` | ✅ | 恒为 `1` |
| `id` | ✅ | `<publisher>.<name>`,全小写点分,与目录名一致。**发布后永不改**——卡的依赖、设置与存储都按它建键,改名等于发一个新插件 |
| `name` / `description` | ✅ | 显示名与清单里那一行(见[第一个插件](./first-plugin.md)的写法) |
| `version` | ✅ | semver |
| `minAppVersion` | ✅ | 写你**实测跑通**的最低版本,别往高写——它比宿主版本高,插件就整个装不上 |
| `trust` | ✅ | `declarative`(T0)/ `sandboxed`(T1)/ `privileged`(T2),见[信任分级](../concepts/trust-tiers.md) |
| `apiVersion` | T1/T2 | 当前 `"1"` |
| `entries` | T1/T2 | `{ sandbox?: "dist/ui.html", main?: "dist/main.cjs" }`——沙箱 UI 入口与 T2 逻辑入口 |
| `permissions` | 按需 | 权限清单,见下 |
| `activation` | 可选 | 懒激活事件,见下 |
| `contributes` | 核心 | 各扩展点的贡献声明,键为贡献键(全表见[参考](/docs/reference/contribution-keys)) |
| `dependencies` / `optionalDependencies` | 可选 | 依赖别的插件(`id → 版本区间`) |
| `extensionPoints` | 可选 | **自己开插座**:声明 `<你的id>.*` 扩展点,让别的插件往里插贡献 |
| `background` | T2 | 后台周期任务(`intervalSeconds ≥ 60`,单插件 ≤4 条) |
| `author` / `homepage` / `repository` / `license` / `icon` | 可选 | 详情页展示;`icon` 只收插件目录内路径(断网也要能显示) |
| `marketplace` | 可选 | 商店物料(图标 / 截图,可外链)——与运行时 `icon` 刻意分开 |
| `category` / `order` | 可选 | 设置列表里的分堆与位次,**纯展示** |
| `signature` | 分发 | ed25519 发布签名(商店 / 卡包携带时要求) |

## 权限(`permissions`)

| 权限 | 给什么 |
|---|---|
| `workspace:read` / `workspace:write` | 读 / 写当前频道目录(写另有围栏:`.channek` 工程文件与 `.channek/` 目录**恒不可写**) |
| `project:read` / `project:edit` | 读工程快照 / 提议 `EditTransaction` |
| `clipboard:write`(及 read) | 剪贴板 |
| `shell:openExternal` | 打开外部链接(仅 http/https) |
| `{ "permission": "net:fetch", "hosts": [...] }` | 网络访问,**必须显式列 host**,`*` 不合法 |
| `{ "permission": "capability:invoke", "capabilities": [...] }` | 调用别的插件注册的能力(逐条点名) |
| `ai:control` | 接入 AI 控制面(把工具面交给外部模型——权限清单上最重的一条) |

:::warning 权限的含义按信任级不同
T1 的权限是**硬强制**(宿主替它做事、做之前真的查);T2 的权限是**知情披露**(进程内是完整 Node,技术上拦不住)。所以权限清单在 T2 上的价值是「装之前用户读到了什么」,不是运行时防线。详见[信任分级](../concepts/trust-tiers.md)。
:::

## 激活事件(`activation`)

装 50 个插件不拖慢启动的关键:**装载时只读声明,激活时才跑代码**。

常用事件:`onStartupFinished`、`onWorkspaceOpen`、`workspaceContains:<glob>`、`onCommand:<id>`、`onFileOpen:<ext>`、`onPanel:<id>`、`onBackground:<taskId>`。没写激活事件的贡献在首次被用到时按需激活。

## 校验

manifest 的 JSON Schema 随 `@channek/plugin-kit` 发布(子路径 `schema/plugin-manifest.schema.json`),接到编辑器里写 manifest 就有补全与校验。装载时宿主跑同一套 `validateManifest`,规则编号与报文见[参考 · 清单校验规则](/docs/reference/manifest-rules)。

常见拒载原因:

- T0 带了 `entries` / `permissions`
- `id` 用了 `channek.` 前缀,或与目录名不一致
- 命令 id 没有 `<插件id>.` 前缀
- `net:fetch` 写了 `*`
- `remedy` / `providers` 指向 manifest 里不存在的命令、设置键或 provider
