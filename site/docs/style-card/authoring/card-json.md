---
title: channel.json 结构总览
description: 必填只有三个字段,其余全是可选段——卡的身份与频道的身份分开记,段内严校验规则。
sidebar_position: 1
---

# channel.json 结构总览

一张卡的本体是频道根目录的 `channel.json`——只能叫这个名、只能放在频道根。**必填收缩到最小**,只有三个字段;写给别人用的卡再加一个 `card.id`:

```jsonc
{
  "schema": "channek.channel",               // 固定值
  "formatVersion": 1,                         // 固定值
  "name": "口播快剪",                          // 显示名
  "card": { "id": "acme.talkfast", "version": "1.0.0" }   // 卡自己的身份(<发布者>.<名字>)
}
```

**其余全部是可选段。** 没有画风锁的实拍频道、不配音的字幕流频道、只有文字的写作频道,都是合法的卡——不写的段就是没有,系统不会拿默认值替你回答。

## 两个身份别混

| 字段 | 是谁的身份 | 谁来写 |
|---|---|---|
| `card.id` | **卡自己**:`<发布者>.<名字>` 点分小写(`channek.*` 保留给官方)。血缘、市场、「从原卡更新」都认它 | 作者写;写给别人用的卡必须有 |
| 顶层 `id` / `slug` | **这个频道在某台机器上**的身份(`id` 以 `ws_` 开头) | app 首次打开时生成并写回;不用手写,分享时也不带走 |

为什么分成两个:同一张卡可以开出很多个频道(你自己开第二个号、别人拿去用),卡的身份要在所有这些频道之间保持一致,频道的身份要各不相同——塞进一个字段,分享和复刻就一定有一边是错的。

## 分段结构

可选段按职责分层:

| 层 | 段 | 回答什么 |
|---|---|---|
| **这是个什么频道** | `profile` `format` | `profile`:定位、受众、人设、口号、简介;`format`:成片形态的三个枚举(横竖屏 / 出镜方式 / 字幕粒度),写了就三个全写 |
| **style 风格** | `brand` `locks` `voice` `captions` `cover` `audio` `libraries` `generation` `freeze` `docs` `platforms` `publish` | 品牌 token、画风锁、音色档、字幕、封面、混音、素材索引、生成默认、冻结闸、文档挂载 |
| **process 流程** | `pipeline` `layout` `editor` `prompts` `config` | 步序与每步配置、目录布局与工件位置、剪辑台预设、提示词资产索引、卡自声明的可编辑配置面(设置页按它渲染表单) |
| **presentation 呈现** | `presentation` | 频道界面启用哪些功能区、默认落在哪 |

之外还有几个跨层段:

| 段 | 回答什么 | 详见 |
|---|---|---|
| `requires` | 依赖清单:应用版本门、能力与 provider 偏好、全局插件、密钥 | [requires 依赖声明](./requires.md) |
| `plugins` | 住在本频道里的**频道插件**目录(频道根内相对路径,如 `plugins/acme.talkfast-suite`) | [卡与插件的关系](../concepts/card-and-plugins.md) |
| `agent` | 给 AI Agent 的三个入口:`guide` 工作流说明、`skills` skill 目录、`scripts` 脚本目录 | [prompts 与频道知识](./prompts-docs.md) |
| `questions` | 别人用这张卡开频道时问的题(键是本文件的字段路径,如 `profile.persona`) | [打包 .channekcard](../distribution/packaging.md) |
| `runtime` | 「作者用的是什么环境」:端点需求与 provider 绑定展示(**不参与运行时选路**) | [requires 依赖声明](./requires.md) |
| `pluginSettings` | 随卡走的**频道级**插件参数(语速、出图步数这类「频道个性」) | [requires 依赖声明](./requires.md) |
| `meta` | 市场元信息:作者、许可、简介、封面、截图廊 | [meta 与上架物料](../distribution/meta-storefront.md) |
| `bundle` | 分发清单:打包时不带什么(`omit`)、随卡示例内容(`demo`) | [打包 .channekcard](../distribution/packaging.md) |

卡里写的所有路径都是**频道根内的相对路径**(频道卡的卡根就是频道根)——绝对路径与含 `..` 的路径会被校验拒绝。

## 段内严校验

「全段可选」不等于「随便写」:**某段一旦出现,段内必填字段一个都不能少,段内引用必须自洽**,校验器会逐条检查。已定义的规则包括:

- 写了 `format`,`orientation` / `persona` / `captions` 三个枚举都得有;写了 `brand.tokens`,六项都得有;
- `brand.tokens.accent` 必须是 `brand.tokens.colors` 里存在的键;
- `voice.default` 必须指向 `voice.profiles` 里存在的音色档;
- `presentation.sections` 的 id 不许重复,`defaultSection` 必须在 `sections` 里;
- `runtime.endpoints` 的 id 不许重复,且**端点声明里绝不允许出现值键**(`url` / `port` / `apiKey` / `token` 等)——卡只声明「需要哪些端点」,值一律落本机设置;
- `runtime.providers` 每个能力只许绑定一次,`endpoint` 引用必须存在。

「写了某段就必须写全」的完整清单见[频道卡字段速查](/docs/reference/card-schema)。写完用 app 附带的命令行验一遍,它和 app 读卡用的是同一份判据,报错路径就是 `channel.json` 里的字段路径:

```bash
channek check <频道目录>
```

卡不合 schema 时,app 打开这个文件夹会先按普通文件夹打开,顶上一条横幅写明「频道卡没能认出来」和出错的字段——按横幅改完点「改好了,重新读取」即可。

:::warning
端点值禁入卡是红线而不是风格建议:卡是可分发的,写进卡就等于把「这台机器怎么配」焊死在卡里,还会让导出的卡包泄漏本机地址与密钥。
:::

## 未知字段的态度

schema 对未知字段是**宽容的**(不报错、原样保留)——这是「协议只增不改」的另一面:新版软件写进卡的新段,旧版软件读到不炸、保存不丢。但你**不该**依赖未声明的字段做任何事:没写进 schema 的字段等于没对外存在过。
