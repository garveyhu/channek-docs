---
title: 沙箱桥方法全表
description: T1 沙箱插件经 @channek/sandbox-sdk 能调的全部宿主方法,共 31 条,封闭白名单。
sidebar_position: 3
---

# 沙箱桥方法全表(suite 桥 op)

T1 沙箱插件经 `@channek/sandbox-sdk` 的 suite 桥能调的**全部**方法,共 **31** 条。

**这是一张封闭白名单**——不在表里的方法一律拒绝;通用逃逸口(任意路径读文件 / 执行命令 / 转发任意 IPC)永不进表。放行判据是一条:**app 打开这个工作区时本来就已加载、用户已授权的数据与动作**,插件用它 ≡ app 自己用它,不构成新的信任要求。

标 **写** 的方法有副作用(写盘或触发真实操作),需要 `workspace:write` 权限,并按「每个插件 × 每个频道」过一次性同意闸。

## 套件区基础(4)

| op | 干什么 |
|---|---|
| `assets.overview` | 按插件传入的目录扫出素材概览。 |
| `shell.openContent` | 在 app 里打开某条内容。 |
| `shell.openSection` | 切到某个功能区。 |
| `clipboard.writeText` | 写系统剪贴板。 |

## 工作区数据面(5)

| op | 干什么 |
|---|---|
| `workspace.info` | 当前工作区信息。 |
| `content.list` | 内容条目列表。 |
| `content.detail` | 单条内容详情。 |
| `card.active` | 当前频道的频道卡只读投影:`id`(= `card.id`)、`name`、`slug`、`version`(= `card.version`,未声明为 null)、`sections`、`defaultSection`,以及可选的 `docRefs`(作者段里文件型参数的完整键 → 频道内相对路径)。 |
| `card.config` | 按**完整键**(`段 id.短键`,如 `voice.default`、`publish.accounts`)取频道参数;插件段缺的键已按插件声明补上默认值,不给 `keys` 就回整张表。人设、画风、平台这类领域参数都从这里取。 |

## 条目与灯轨(3)

| op | 干什么 |
|---|---|
| `artifact.urls` | 按**工件种类**点名取一条内容的授权地址,回 `{ byKind, files }`。插件说要哪几种(`channek.master`、`channek.covers` …),宿主按卡的布局找文件、铸地址;频道不认识的种类直接报错。 |
| `pipeline.status` | 这条内容的整条灯轨状态。 |
| `content.createEntry` | **写** 新建一条内容。 |

## 主页承载(3)

| op | 干什么 |
|---|---|
| `publish.platforms` | 已注册发布平台目录。 |
| `card.brandAssets` | 频道的头像与横幅;位置由插件从 `card.config` 读出来传入,宿主不按名字读卡。 |
| `card.kickoff` | 卡声明的开工引导数据。 |

## 卡内文档(1)

| op | 干什么 |
|---|---|
| `card.readDoc` | 读一份**卡自己指名过**的文档(`card.active` 的 `docRefs` 列出的那些)。只收卡内相对路径,绝对路径与 `..` 一律拒;读的是这扇窗口所在频道的卡。 |

## 内容步读写(2)

| op | 干什么 |
|---|---|
| `content.readFile` | 读这条内容目录里的一份工件正文。 |
| `content.writeFile` | **写** 把改完的工件存回这条内容目录。 |

## 频道级文本(2)

| op | 干什么 |
|---|---|
| `channel.readFile` | 读频道级的文本数据(选题库、声音库说明这类属于整个频道的东西)。遏制在频道根内,`.channek/`、`.git/` 不可见。 |
| `channel.writeFile` | **写** 存回频道级文本。频道卡与频道插件目录只读;写回带读到的 `revision`,中间被改过就报冲突。 |

## 宿主动作(1)

| op | 干什么 |
|---|---|
| `shell.openArtifact` | 把这条内容的一份产物交给 app 的文件工作台打开(宿主逐条校验实参)。 |

## 场景烘焙(2)

| op | 干什么 |
|---|---|
| `scene.preview` | 为这条内容烘一次场景预览,拿回一次性授权 URL(随工作区释放失效);由哪个提供者烘、产物放哪,全由宿主决定。 |
| `scene.export` | 把这一镜烘成 mp4 并弹**原生保存框**由用户挑位置;用户取消返回 `false`,不是错误。 |

## 能力调用(3)

| op | 干什么 |
|---|---|
| `capability.invoke` | **写** 调一条**已注册能力**——插件间协作的通用通道。三道闸:清单里逐条点名可调的能力(不给通配);文件类入参由宿主按条目解析注入,插件给的值丢弃;提供者的私有参数(端口、密钥、路径)不过桥。 |
| `capability.preview` | **写** 先看再要:跑一次能力,产物不进频道,回一枚预览 URL。文件类入参只能用 `cardRefs` 点名卡内素材。 |
| `capability.adopt` | **写** 把看中的预览落成这条内容的正式工件。只收语义 id + 实例名(如 `channek.covers` + `16x9`),落到哪个文件由卡回答。 |

## 配音工件(2)

| op | 干什么 |
|---|---|
| `artifact.mediaUrl` | 为条目内单个产物懒铸一枚授权 URL(批量口 `artifact.urls` 的逐个兜底)。 |
| `card.updateSoundMeta` | **写** 改当前频道卡声音库里一条音频的说明卡(评分 / 用途 / 说明);卡 id 由宿主注入,写点遏制在声音库目录内、字段白名单。 |

## 灯轨确认(3)

| op | 干什么 |
|---|---|
| `pipeline.acknowledgeStale` | **写** 「这次的过期我认了」——按掉一盏黄灯。 |
| `pipeline.acknowledgeAllStale` | **写** 一键认下整条的过期。 |
| `pipeline.revokeStaleAcknowledgement` | **写** 反悔,恢复黄灯。三条的应答都是重算后的整条灯轨。 |

:::info
31 = 4 + 5 + 3 + 3 + 1 + 2 + 2 + 1 + 2 + 3 + 2 + 3。每条 op 的实参与返回值签名以 `@channek/sandbox-sdk` 的类型定义为准。
:::
