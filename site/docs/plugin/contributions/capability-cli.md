---
title: 候选链、能力目录与命令行
description: 装了三家就有三条候选,按规则排队、失败降级、如实记账;channek 命令行让 app 关着也能调到你的能力。
sidebar_position: 3
---

# 候选链、能力目录与命令行

## 能力目录 `capabilities.json`

app 在写盘那一刻把配置合并、选路、路径物化全部算完,产出两份目录:

| 文件 | 语义 |
|---|---|
| `~/.channek/capabilities.json` | 机器级索引:这台机器装了什么能力 |
| `<频道根>/.channek/local/capabilities.json` | 频道解析结果:本频道该用谁、参数是什么、候选链顺序 |

**唯一写者是 app 主进程**,原子替换写入;调用方(CLI、用户的 agent)只读,绝不自己从 manifest 现算——三层合并里有一道安全边界(机器级键剔除),每个调用方各写一遍总会有几份写错,而写错的表现是「能跑」。目录里的密钥只有句柄与存在性,**永远没有值**。

## 候选链怎么排

```
卡与用户点名的在前 → 可脱机的在前 → 密钥齐的在前 → 声明序
```

**只排序,不剔除**:每条候选为什么没用上都要能报出来。三种「不许换人」的强度:

| 手段 | 语义 |
|---|---|
| 卡 `requires.providers[].prefer` | 建议:作者用这家,没装就顺位下一个 |
| `channek invoke --prefer <id>` | 建议:这次排最前,跑不通仍降级 |
| 卡 `fallback: false` / `--only <id>` | 钉死:点名之外不许顶上,跑不了就干净地失败 |

为什么要有钉死这一档:降级换来「跑通了」,代价是产物可能出自另一家——画风锁按某家调优过时,「跑通了但东西不对」比一次干净失败难查得多。

没进候选链的每条都有 reason:`disabled`(插件停用)/ `not-approved`(T2 没过信任门)/ `turned-off`(用户单独关掉这一家)/ `missing-credential`(没挑密钥)——各自的下一步不同,界面与 CLI 都会指路。

## 命令行 `channek`

CLI 随 app 分发(跑在 app 自带的 node 上,用户不需要装 Node),是能力目录的官方消费者——**app 开着或关着都能调**:

```bash
# 发现层
channek channels                # 已知频道
channek caps                    # 本频道有哪些能力、谁提供、现在能不能用
channek cap channek.tts         # 单条能力的参数说明 + 候选链就绪情况
channek doctor                  # 体检:卡要求的东西齐了吗、缺的下一步是什么

# 调用层
channek invoke channek.image prompt=@提示词.md --out ./出图
channek invoke channek.tts text=@稿子.md --place acme.voiceTrack --entry 我的条目
```

`invoke` 的 stdout 末行恒是一行 JSON:

```json
{"ok":true,"path":"/abs/out.wav","backend":"acme.local-tts","catalog":"channel",
 "attempts":[{"backend":"acme.cloud-tts","status":"unavailable","error":"missing-credential:…"}]}
```

`attempts` 如实列出每个候选为什么没用上——回退不掩盖失败。退出码:`0` 成功 / `1` 候选链全败(值得重试)/ `2` 用法错误 / `3` 能力不可用(装配问题,重试没用)。

几条对插件作者有直接影响的:

- **`channek cap <id>` 是 AI 与脚本问参数的地基**——你的 `inputs[].description` 写得好,别人不读你源码也能调对。给插件配套的用法说明(skill)里别写死参数,写「先 `channek cap` 看参数」。
- **`--place <语义id>`** 把产物按卡声明的落点归位——它读的是卡,不是能力;凡产出交付物的调用都该带上它。
- 就绪徽章来自你声明的[前置](../concepts/readiness.md);不声明,你这家在 `caps` 里恒是 `[未验]`。

## 插件的用法说明(skill)跟着插件走

给 agent 读的用法说明放在**插件根的 `skills/` 目录**,随插件分发。打开频道时 app 只汇集**已启用**插件的 skill——停用插件,它的说明同时消失,不会出现「说明说能调、能力根本没有 provider」的错位。频道特有的流程说明则跟着卡走,同名时卡优先。
