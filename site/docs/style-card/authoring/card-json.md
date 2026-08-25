---
title: card.json 结构总览
description: 顶层必填只有五个字段,其余全是可选段——四层结构与段内严校验规则。
sidebar_position: 1
---

# card.json 结构总览

一张卡的本体是卡目录里的 `card.json`。**顶层必填收缩到最小**——只有五个字段:

```jsonc
{
  "schema": "channek.stylecard",   // 固定值
  "formatVersion": 2,               // 当前格式版本
  "id": "acme.talking-head",       // 全局唯一 id(<publisher>.<name>)
  "name": "口播快剪",               // 显示名
  "slug": "talking-head"           // 短名(目录/路由用)
}
```

**其余全部是可选段。** 没有画风锁的实拍频道、不配音的字幕流频道,都是合法的卡——不写的段就是没有,系统不会拿默认值替你回答。

## 四层结构

可选段按职责分四层:

| 层 | 段 | 回答什么 |
|---|---|---|
| **identity 身份** | `identity` | 定位、受众、人设、内容形态(横竖屏/是否出镜/字幕粒度) |
| **style 风格** | `brand` `locks` `voice` `captions` `cover` `audio` `libraries` `generation` `freeze` `docs` `platforms` `publish` | 品牌 token、画风锁、音色档、字幕、封面、混音、素材索引、生成默认、冻结闸、文档挂载 |
| **process 流程** | `pipeline` `layout` `editor` `prompts` | 步序与每步配置、目录布局与工件位置、剪辑台预设、提示词资产索引 |
| **presentation 呈现** | `presentation` | 频道界面启用哪些功能区、默认落在哪 |

之外还有几个跨层段:

| 段 | 回答什么 | 详见 |
|---|---|---|
| `requires` | 依赖清单:应用版本门、能力与 provider 偏好、插件、密钥 | [requires 依赖声明](./requires.md) |
| `runtime` | 「作者用的是什么环境」:端点需求与 provider 绑定展示(**不参与运行时选路**) | [requires 依赖声明](./requires.md) |
| `pluginSettings` | 随卡走的**频道级**插件参数(语速、出图步数这类「频道个性」) | [requires 依赖声明](./requires.md) |
| `meta` | 市场元信息:作者、许可、简介、封面、截图廊 | [meta 与上架物料](../distribution/meta-storefront.md) |
| `bundle` | 分发清单:打包时不带什么(`omit`)、随卡示例内容(`demo`) | [打包 .channekcard](../distribution/packaging.md) |
| `config` | 卡自声明的可编辑配置面(设置页按它渲染表单) | — |

## 段内严校验

「全段可选」不等于「随便写」:**某段一旦出现,段内引用完整性必须自洽**,校验器会逐条检查。已定义的规则包括:

- `brand.tokens.accent` 必须是 `brand.tokens.colors` 里存在的键;
- `voice.default` 必须指向 `voice.profiles` 里存在的音色档;
- `presentation.sections` 的 id 不许重复,`defaultSection` 必须在 `sections` 里;
- `runtime.endpoints` 的 id 不许重复,且**端点声明里绝不允许出现值键**(`url` / `port` / `apiKey` / `token` 等)——卡只声明「需要哪些端点」,值一律落本机设置;
- `runtime.providers` 每个能力只许绑定一次,`endpoint` 引用必须存在。

:::warning
端点值禁入卡是红线而不是风格建议:卡是可分发的,写进卡就等于把「这台机器怎么配」焊死在卡里,还会让导出的卡包泄漏本机地址与密钥。
:::

## 未知字段的态度

schema 对未知字段是**宽容的**(不报错、原样保留)——这是「协议只增不改」的另一面:新版软件写进卡的新段,旧版软件读到不炸、保存不丢。但你**不该**依赖未声明的字段做任何事:没写进 schema 的字段等于没对外存在过。
