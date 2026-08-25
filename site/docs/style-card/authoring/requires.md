---
title: requires 依赖声明
description: 能力加偏好链而非死绑实现、插件指明去哪拿、密钥从 provider 声明自动推导——「一键复刻」能否成立就看这一段。
sidebar_position: 6
---

# requires 依赖声明

`requires` 段回答:**跑这张卡的流程,需要什么。** 收卡人导入时的体检清单、缺件引导、就绪度徽标,全部从这一段推导——它写得好不好,直接决定你的卡在别人机器上是「一键复刻」还是「一堆报错」。

```jsonc
"requires": {
  "app": ">=0.4.0",                       // 应用版本门
  "providers": [
    {
      "capability": "tts",                 // 要一类能力
      "prefer": ["acme.voxcpm"],           // 有序偏好:优先这家,按序回落
      "fallback": false,                   // 别家顶不顶得上(缺省 true = 顶得上)
      "plugins": ["acme.voice-lab"],       // 装哪个插件能得到上面的 provider
      "reason": "频道音色是用这套引擎训的"
    },
    { "capability": "image", "prefer": ["acme.image-gen"] }
  ],
  "plugins": [                             // 非 provider 类的额外插件依赖
    { "id": "acme.review-gate", "optional": true }
  ],
  "secrets": ["llm.anthropic"]             // 作者显式补充的密钥(见下)
}
```

## provider:按「能力 + 偏好链」,不死绑实现

卡关心的是「要有 TTS,且优先我的音色引擎」,不是锁死某个实现:

- `prefer` 是**有序候选**:第一顺位没配好时按序往下顺;
- 缺省允许回落到未点名的 provider——`fallback: false` 才是硬约束(「宁可这次出不来,也不换一家」),只在换实现会实质改变产出质感时才写;
- `plugins` 指明**去哪拿**:没有它,「点名的 provider 没装」只能报成「本机用别的顶上,效果与作者不同」;写了它,引导就能落到「装这个插件」这个可执行动作上。

:::warning
**声明本机路径没有意义。** 「我的模型在 `/…/models/tts`」这种话在别人机器上是死路径,还泄露你的目录结构。有意义的声明是「要这个能力 + 装这个插件」;机器特定的配置属于**那个插件的本机设置**,不属于卡。
:::

## 密钥:从 provider 声明推导,手写只是补充

「跑这条能力要哪几把钥匙」是 **provider 的知识**,不是卡作者的知识。所以密钥清单的主体不靠你手写,而是自动推导:

```
卡点名的能力 → 提供它的候选 provider → 该 provider 声明的 credentials → 清单
```

`requires.secrets` 的语义是**作者显式补充**——有些钥匙不属于任何 provider(比如你的提示词里要用的某个服务),纯推导会漏。最终清单 = 推导出的 ∪ 手写的。

为什么这样设计:手打的清单与插件实际读什么之间没有任何机制保证一致,漂移出的两种假象里,**假绿灯比报缺更糟**——用户照你写的 id 填了密钥,卡变绿,插件依然读的是别的东西。

## runtime:「作者用的是什么」,展示不选路

`runtime` 段记录作者的实际环境,给卡详情页与导入向导**展示**用:

```jsonc
"runtime": {
  "providers": [                          // 作者实际用的 provider / 模型 / 参数
    { "capability": "image", "prefer": ["acme.image-gen"], "model": "sd3.5", "params": { "steps": 30 } }
  ],
  "endpoints": [                          // 需要收卡人自备的服务端点
    {
      "id": "tts-service",
      "label": "TTS 服务",
      "capability": "tts",
      "setup": {
        "summary": "配音要一个 HTTP TTS 服务,音色是你自己的",
        "difficulty": "proxy",             // hosted(填 key)/proxy(自建服务)/model(自训模型)
        "options": [{ "label": "自建方案 A", "url": "https://example.com/setup" }]
      },
      "example": "http://127.0.0.1:8080"   // 示例形态,不是值
    }
  ]
}
```

两条铁律:

- **运行时选路只认 `requires.providers[].prefer` + 本机设置**,`runtime` 不参与选路——让它参与,等于把作者机器的状态焊进别人的频道;
- **端点声明只说「需要什么」,绝不存值**——`url` / `port` / `apiKey` 等值键出现在 `runtime.endpoints` 里会被校验直接拒绝。

`setup.difficulty` 请如实标注:把一个要自训模型的槽位标成「填个 key」,收卡人装完才发现出不了片,比不标糟得多。

## pluginSettings:随卡走的频道级参数

语速、音色保真度、出图步数这类参数回答的是「这个频道的片子是什么质感」——那是**频道个性**,该随卡走:

```jsonc
"pluginSettings": {
  "acme.voice-lab": { "ttsCfg": 2.5, "headBreath": 0.3 }
}
```

端点、密钥、模型目录**不在此列**(机器特定,导入时按插件声明剔除)。值的形状归插件解释,且只有插件**声明过**的参数键才会被透传——没声明的一律传不下去。
