---
title: 就绪度:装了 ≠ 能用
description: 用 plugin.requirement 声明你的插件需要机器上有什么;一条声明,设置页、插件列表、能力目录、卡体检四处同时消费。
sidebar_position: 4
---

# 就绪度:装了 ≠ 能用

一个能力插件装上之后,往往还要机器上有解释器、模型、外部服务。**你的能力需要什么,就声明什么**——宿主与命令行读同一份声明去探测,用户在装之前就知道这台机器缺什么。

```jsonc
"contributes": {
  "plugin.requirement": [{
    "id": "python3",
    "label": "Python 3 解释器",                    // 面向用户的文案——不就绪时显示的就是它
    "description": "插件自带的脚本用它跑,只用标准库。",
    "severity": "required",                        // required(缺省) / optional / byo
    "providers": ["acme.draw-local"],              // 点名 = 只挡这几条候选;不点名 = 作用于全部
    "probe": { "kind": "command",
               "program": { "lookup": "python3" },
               "args": ["-c", "import json"], "timeoutMs": 10000 },
    "remedy": { "kind": "manual",
                "steps": ["macOS:xcode-select --install 或 brew install python"] }
  }]
}
```

一条声明,四处消费:插件设置页的就绪卡 · 插件列表徽章 · `channek caps` 的候选标注 · 卡体检。**在任何消费面自己另写一套「装齐没有」的判断都是违规**——判据分叉正是这套机制要消灭的病。

## `probe`:判据必须可执行

| 形态 | 用在 | 说明 |
|---|---|---|
| `command` | 「装了但功能缺失」 | 缺省判退出码 0;`expect.stdoutContains` 给「命令在但缺特性」用。`program` 与能力调用同一套三形态(`pluginFile` / `setting` / `lookup`) |
| `path` | 「东西在不在那儿」 | `from` 取自设置项、PATH 或插件目录内相对路径 |
| `machine` | 「这台机器扛不扛得住」 | `minMemoryGb` / `minCpuCount` / `arch` / `platform`——声明**下限**,不是推荐值 |

探测不是调用:只问存在性、不产工件、不落盘,超时缺省 8 秒(上限 30 秒)。探测与真实调用**同源**:`{{params.*}}` 用同一份合并设置物化,点名了 `providers` 的前置还会按那条 provider 的声明注入密钥——「就绪卡说有、真跑说没有」的根源就是两处各写一套解析。

## `remedy`:没有时怎么办

| 形态 | 语义 |
|---|---|
| `action` | 插件自己能一键装上(`commandId` 必须是本 manifest 贡献的命令) |
| `setting` | 东西在机器上,只是没告诉 app 在哪(跳到那个设置项) |
| `manual` | 只能人工准备(建 venv、装系统包、训练模型) |

:::warning 别把「服务没起」写成 setting 型补救
`setting` 的意思是「填那一格就能修好」。端点填着、服务没起,指过去是一个填好的框——界面在指一条死路。那种情况用 `manual` 步骤直说「把服务跑起来」。
:::

另有一档宿主替你补的:插件目录里有 `package.json` 依赖时,宿主自动补一条「就地安装 node_modules」的前置(用 app 自带的 node,按你的 `package-lock.json` 逐包校验完整性安装,不跑生命周期脚本)。要覆盖它就自己声明一条 id 为 `channek.node-deps` 的。

## 三态,以及为什么 `unknown` 必须单列

| 状态 | 含义 |
|---|---|
| `ready` | 探过了,通过 |
| `missing` | **确定没满足**——探过没通过,或那个设置项还空着 |
| `unknown` | **问不出答案**——探测超时、探测本身崩了、程序引用解析不出来 |

**「我不知道」和「我知道它在」是两件事。** 任何消费面把 `unknown` 折叠进 `ready`,这套机制就退化成「把声明当能力报」。同理,一条前置都没声明是 `undeclared`,显示为「未验」而不是绿灯——**不声明前置,你的 provider 在所有体检面上都是 `[未验]`**。

## `severity` 的三档

- `required`(缺省):缺了这条候选就是跑不成。点名了 `providers` 时只灰掉那几条候选,插件整体最多降为 `degraded`——别拿 severity 去迁就徽章颜色。
- `optional`:缺了只掉一档(比如没有 GPU 加速仍能跑)。
- `byo`(bring your own):**永远指着用户自己的东西**(自己的脚本、自己训的音色、自己的私有服务)。没接不算异常:候选级仍跳过它,插件级一个色都不染。只有「东西根本不存在于任何人的机器上、除非用户自己造」才配这一档。

## 什么不该做成 requirement

- **凭据不是 requirement**——密钥走 [`credentials` 声明](./credentials.md),要探「这把钥匙能不能用」就写一条点名 provider 的前置,宿主会把密钥注进探测子进程。
- **「所有用户都一样」的东西不是 requirement**——那是插件该自带的。留给用户的只有三类:解释器 / 工具路径、用户私有资产、调参。
- **运行期失败不是 requirement**——前置回答「能不能开始」,不回答「这次跑成了没有」。
