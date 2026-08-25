---
title: 设置界面:声明,不要画
description: 用 ui.settingsSection 声明字段,宿主渲染;12 种字段类型按数据类型选,值分三层存放。
sidebar_position: 5
---

# 设置界面:声明,不要画

你的插件要让用户配东西,**你不画界面,你声明它**。宿主按声明渲染:主题自动跟随、控件全局一致、值的分层与密钥的去处由宿主统一处理,能力目录与前置探测读的也是同一份声明。

## 最小可用

```jsonc
"contributes": {
  "ui.settingsSection": [{
    "id": "acme.tts.general",
    "label": "语音合成",
    "fields": [
      { "key": "endpoint", "type": "string", "label": "服务地址", "default": "http://127.0.0.1:9880" },
      { "key": "speed", "type": "number", "label": "语速", "default": 1, "min": 0.5, "max": 2, "step": 0.1 },
      { "key": "denoise", "type": "boolean", "label": "降噪", "default": false }
    ]
  }]
}
```

后端经 `{{params.endpoint}}` 占位符拿到值(见[调用形态](../contributions/capability-invoke.md))。

:::warning `default` 是必填的
(除 `secret` / `credentialRef` / `embed` / `action` 外)没有默认值的字段,在用户配置它之前对你的后端是「不存在」——占位符会**原样**传给你的脚本。这是插件作者最难自查的一类 bug:你本地配过,所以永远复现不出来。
:::

## 12 种字段类型,按数据类型选

| type | 用在 |
|---|---|
| `boolean` | 开关 |
| `string` | 短文本 / 地址(可配 `placeholder` / `multiline` / `resolvedFrom`) |
| `number` | 数值(`min` / `max` / `step`) |
| `select` | **闭集**枚举 |
| `dynamicSelect` | **开集**候选:模型名 / 音色名——「那边有什么」只有那边知道,候选由一条命令探出来,拉不到退回可输入 |
| `directory` / `file` | 本机路径,走原生选择框——**禁止让用户手敲绝对路径** |
| `action` | 跑一条本插件命令(有副作用的动作永不许 `runOnOpen`) |
| `embed` | 挂你自己的一页 T1 沙箱页(声明式表达不了时的出口) |
| `secret` / `credentialRef` | 密钥,值不进设置文件,见[密钥](./credentials.md) |

清一色文本框是要被打回的。枚举用 `select`;开集用 `dynamicSelect`(照 `select` 那样「不在表里就打回默认」会在服务停掉那一刻把用户配好的值静默清掉);路径用 `directory` / `file`。

## 能力型插件:双列布局免费拿

声明了 `capability.provider` 的插件,给每个设置段标上 `provider: "<providerId>"`,宿主自动给出双列布局:左边按「本机方案 / 云服务 / 内置方案」分组(由 `invoke.kind` 推出),右边只显示选中那家的字段,每栏顶上自带「设为首选」与「启用 / 关闭这一家」。

- 不标 `provider` 的段 = 插件级配置,选谁都显示。
- **一页 = 一条能力,不是一个插件**:别家为同一条能力提供的供应商会并进这一页(标「来自 X」),所以你的 label 要能独立成立——「本机推理」读得出,「方案 A」读不出。

## 值住在哪(决定能不能随卡分发)

```
生效顺序:user(机器级) < card(卡里带的) < workspace(频道侧车)
```

- 字段 `scope`:`'user'`(缺省,机器级)/ `'workspace'`(频道级)/ `'both'`。**机器级的键在卡层与频道层一律被剔除**——卡可能是导入的,放任它覆盖 `endpoint` 等于让一张卡把本机请求指到别处,这是安全边界不是体验问题。
- **`snapshot: true`** = 允许「存进卡」随卡分发。只该点名非敏感创作参数(语速 / 尺寸 / 画风);机器级键标了也不算。
- 被 `invoke` 的 `program` / `cwd` / `env` 引用的设置键**必须是机器级**(它们是可执行位置);`args` 里的可以是频道级(它们是数据)。

## 与前置探测的接线

设置页只回答「填了什么」,「这台机器上有没有那个东西」由 [`plugin.requirement`](./readiness.md) 回答,渲染在同一页的「环境检测」栏。`remedy: { kind: "setting", key: "modelDir" }` 会摆一个动作直接滚到那一格。

## 嵌入页的样式约定

`embed` / 面板嵌进来的是你的页面,但它长在宿主窗口里:颜色 / 间距 / 圆角 / 字号一律走 `--ck-*` token([全表](/docs/reference/theme-tokens));不要自带字体;尊重 `prefers-reduced-motion`。
