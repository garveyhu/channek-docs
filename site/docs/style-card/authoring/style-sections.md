---
title: config 频道参数
description: 频道参数的唯一位置——作者段写字段定义和值,插件段只存值;完整键、八种字段类型、开频道问卷,以及与 pluginSettings 的分工。
sidebar_position: 2
---

# config 频道参数

`config` 是**频道参数的唯一位置**。这个频道是谁(赛道、受众、人设)、产出长什么样(品牌 token、画幅、字幕样式)、听起来什么样(音色)、发到哪里(发布账号)、素材放在哪——全部写在这里。

内核不认识其中任何一个字段。参数分成两种段,一眼就分得开:

| | 作者段 | 插件段 |
|---|---|---|
| 形状 | `{ id, name, group?, hint?, fields }` | `{ id, plugin, values }` |
| 字段定义在哪 | 卡里,字段带值 | **只在插件清单的 `channelConfig` 里**,卡里只存「短键 → 值」 |
| 典型内容 | 频道定位、品牌、质检阈值、素材目录 | 画幅、字幕样式、音色、发布账号 |
| 谁读 | 你自己的 skill 与脚本、AI Agent | 声明这一段的插件(也进 AGENTS.md 给 AI 看) |

```jsonc
"config": {
  "sections": [
    // 作者段:字段定义和值都写在卡里
    {
      "id": "profile",
      "name": "频道定位",
      "fields": [
        { "key": "niche", "name": "赛道", "type": "text", "value": "口播观点频道:单人出镜 / 快节奏剪辑 / 周更" },
        { "key": "persona", "name": "人设", "type": "text",
          "value": "讲清楚一个效率工具只要三分钟的博主",
          "ask": { "example": "三分钟讲透一个效率工具的博主" } }   // 开频道时要问的题
      ]
    },
    {
      "id": "brand",
      "name": "品牌",
      "fields": [
        { "key": "tokens", "name": "设计 token", "type": "fileRef", "value": "brand/tokens.json" }
      ]
    },
    {
      "id": "quality",
      "name": "质检",
      "group": "rules",
      "fields": [
        { "key": "scriptMaxSec", "name": "口播稿时长上限(秒)", "type": "number", "value": 180,
          "hint": "超了就拆成两期,不靠加速念完" }
      ]
    },

    // 插件段:卡里只存值,字段定义在 acme.production 的清单里
    { "id": "captions", "plugin": "acme.production",
      "values": { "maxLines": 2, "stroke": "soft" } },
    { "id": "voice", "plugin": "acme.production",
      "values": { "default": "host", "profiles": "brand/voices.json" } },
    { "id": "publish", "plugin": "acme.publish-platforms",
      "values": { "accounts": ["bilibili", "douyin"] } }
  ]
}
```

## 完整键:段 id + 字段短键

字段里写的是段内短键(`maxLines`),对外的**完整键 = 段 id + `.` + 短键**(`captions.maxLines`、`profile.persona`、`brand.tokens`)。AGENTS.md、插件读值、你的脚本、开频道问卷,统一用完整键。

- 段 id 全卡唯一,完整键也全卡唯一——撞了就会取错值,校验直接报错;
- 段 id 字母开头,可以带点分层(如 `quality.voice`);
- 在命令行里按完整键取值:`channek card captions.maxLines`。

**内核不按名字读任何参数**,没有「起对名字就生效」的特殊键。插件段由声明它的插件读;作者段由你自己的 skill 与脚本读。加一个参数前先问一句:**谁读它?** 说不出读者的参数,写进卡也只是摆设。

## 作者段

作者段是你自己定义的参数,字段定义和值都在卡里:

| 键 | 说明 |
|---|---|
| `id` / `name` | 段 id 与显示名,必填 |
| `group` | 设置页里归到哪一组:`style`(缺省)/ `rules` / `advanced` |
| `hint` | 段的说明,显示在设置页 |
| `fields` | 字段数组,至少一项 |

每个字段都有 `key` / `name` / `type`,可选 `value`、`hint`。字段类型有八种,设置页按类型选控件:

| `type` | 值 | 类型专属的键 |
|---|---|---|
| `text` | 字符串 | `placeholder` · `multiline` · `suggestions` |
| `number` | 数值 | `min` · `max` · `step` · `unit` |
| `boolean` | `true` / `false` | — |
| `select` | `options` 里某一项的 `value` | `options`(必填,`[{ value, label }]`)· `allowUnset` |
| `color` | hex 颜色,如 `#3FD8C7` | — |
| `fileRef` | 频道根内的相对路径(文件或目录) | `accept` |
| `directory` | **没有值**——本机目录永不入卡,只存在本机 | — |
| `list` | 字符串数组 | `suggestions` |

另外几个通用的键:

- `valueFrom`:长文本放到频道里的一个文件,这里写它的相对路径;与 `value` 二选一,不能同时写;
- `brief: false`:这个参数只在设置页里出现,不写进 AGENTS.md;
- `ask: { example? }`:开频道时要问的题,见下文。

## 插件段

插件段的字段名、类型、选项与默认值**只在插件清单的 `channelConfig` 里有一份**,卡里只回答「这个频道取什么值」:

- 段 `id` 必须是那个插件声明过的段 id,`plugin` 写插件 id;
- 插件已装:按插件的声明校验类型、选项与范围,声明之外的键给出警告;没写的键按插件声明的默认值补上(只在内存里补,不写回卡);
- 插件没装:设置页把这一段**按值只读显示**,标明缺少哪个插件;AGENTS.md 照常收录这些值;
- 用到的插件同时写进 `requires.plugins`,收卡人才知道要装它(见 [requires 依赖声明](./requires.md))。

为什么插件段在卡里只存值:字段定义要是在卡里也抄一份,插件一升级,两份定义必然漂开。插件加一个字段,设置页就自动长出一格,没有第二份手写的字段表要维护。

## 频道定位与开频道问卷

频道定位(赛道、受众、人设、口号……)写成一个作者段,惯例 id 是 `profile`。其中「换个人就该换」的字段挂上 `ask`:

- **导出时**:带 `ask` 的字段撤下你的原值,原值改作那道题的示例(题里已经写了 `example` 就不覆盖);
- **开频道时**:只问这几道题,不答就留空——而不是让新频道悄悄顶着你的人设开工;收卡人不能借问卷改卡的其它字段。

回答按文本写回,所以问卷字段用 `text`。撤值与回填只作用于作者段;插件段要不要问,由插件在自己的清单里声明、自己处理。

## 结构化的大块数据放文件

设计 token、音色档、平台矩阵、封面套件这类嵌套数据,放在频道里的一份 JSON 文件,卡里只用 `fileRef` 记路径:

- 设计 token 惯例放 `brand/tokens.json`,用作者段字段 `brand.tokens` 指过去;
- 音色档这类由插件读的文件,路径写进那个插件段的值(如 `voice.profiles`)。

素材库、声音库这类**目录位置也是参数**,惯例写成 `library` 段(`library.asset`、`library.sound`),见 [layout 与工件](./layout-artifacts.md)。卡只校验这些路径在频道根内;文件内容由读它的插件校验。

## config 与 pluginSettings 的分工

| | `config` 里的插件段 | `pluginSettings` |
|---|---|---|
| 装什么 | 频道的事实与规范:画幅、音色、字幕规范、发布账号 | 插件内部的调参:采样步数、CFG、呼吸时长 |
| 谁读 | AI Agent、频道脚本、多个插件 | 只有那一个插件 |
| 进 AGENTS.md | 进 | 不进 |
| 在哪改 | 设置 › 本频道 › 参数 | 设置 › 插件 › 那个插件 |

判据:**AI 或别的插件需要知道的,进 `config`;只有这个插件自己关心的,进 `pluginSettings`。** `pluginSettings` 的写法见 [requires 依赖声明](./requires.md)。

:::note
发布用的浏览器接线(登录态目录、调试端口)是这台机器的事,住频道的本机状态目录 `.channek/`,不进卡;「这个频道在哪些平台有号」是创作事实,写成发布插件段里的值(如 `publish.accounts`)。
:::
