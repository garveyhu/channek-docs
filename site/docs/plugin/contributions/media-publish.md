---
title: 生成、媒体与发布
description: 素材生成 provider、场景烘焙器、媒体探测与导出预设、发布平台——媒体链路上的全部贡献位。
sidebar_position: 8
---

# 生成、媒体与发布

## 素材生成:`generation.provider`

给「出图 / 出视频 / 配音 / 封面」供货。多数场景**优先走通用的 [`capability.provider`](./capability.md)**(能被卡、CLI、app 同样调到);`generation.provider` 是生成域在引擎链路上的接入形态,声明 `{ id, label, kinds }` 加运行时实现,能力 id 与偏好链和能力体系同一套语义——卡按「要有 TTS 且优先某家」声明,不锁死实现,跑不通按候选链降级。

## 场景与烘焙:`generation.scene` / `generation.baker` / `generation.preview`

数据可视化片段(程序化生成的幕)进时间轴的路:

- **`generation.baker`**:把 generator 场景**离线烘焙**成普通 footage。铁律:所有 generator 导出前必 bake,导出恒走烘焙产物的解码路径——保证「同一工程 + 同一帧 = 同一像素」。
- **`generation.preview`**:编辑期的**快速预览** bundle(可丢弃)。与 baker 刻意分开——预览要快、烘焙要确定,合成一个点会让两条生命周期互相冒充。
- **`generation.scene`**:原生场景渲染器(图表 / 对比 / 代码演示…),作为外部渲染栈的渐进替代。

典型例子:基于 Remotion 的烘焙器就是一个独立安装的 T2 插件——用 tsx 写的可视化幕经它烘成 footage 喂时间轴。**任何烘焙栈都是可替换的贡献,不是内核依赖**;你可以带自己的渲染栈(bring-your-own runtime),声明 `bringYourOwnRuntime` 并用[前置探测](../concepts/readiness.md)说清机器上要有什么。

## 媒体:`media.analyzer` / `media.importer` / `media.exportPreset`

| 点 | 干什么 | 状态 |
|---|---|---|
| `media.analyzer` | **媒体探测**:按扩展名认领文件,读时长 / 尺寸 / 轨道,导入时跑一次 | ✅ |
| `media.exportPreset` | 导出预设:一档「容器 + 编码 + 码率 + 采样率」的纯数据(T0),喂 WebCodecs 编码器 | ✅ |
| `media.importer` | 把外部素材 / 第三方工程转成初始工程的导入器 | 规划中 |

注意 `media.analyzer`(媒体探测)与 `ai.analyzer`(内容理解)不是一回事:一个按扩展名认领、产尺寸与轨道;另一个按种类解析、产转写 / 静音这类可增量重算的边车数据。

## 转码能力:内核向你索取的四条

内核不带任何转码二进制,这四条按能力 id 向插件索取(参考实现:官方 ffmpeg 插件)——见[能力体系](./capability.md)末尾的硬约定(产物格式、PCM 要求、落点)。这是「一条能力一家供货」的正常形态,不必硬凑第二家。

## 发布平台:`publish.platform`

`{ id, label, platform }` + 运行时平台适配器,让「发到哪」可插拔——B 站、抖音、小红书、YouTube 是内置贡献,你可以加自己的平台。

:::warning 发布类贡献的两条底线
**写操作停在提交前**:预填、传素材、生成文案都可以自动,最终「发布」那一下交回给人——产生外部影响的确认闸是内核行为,任何配置都关不掉它。**登录态归用户**:平台账号凭据走[密钥库](../concepts/credentials.md)或用户自己的浏览器 profile,不进插件存储。
:::

## 运营数据

运营看板、台账这类界面做成一个功能区:第三方功能区要展示自有域数据时,正确姿势是自己的 T2 扫描 + rpc 分页,见[整页功能区](./suite-section.md)。
