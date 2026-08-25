---
title: 沙箱桥方法全表
description: T1 沙箱插件经 @channek/sandbox-sdk 能调的全部宿主方法,共 34 条,封闭白名单。
sidebar_position: 3
---

# 沙箱桥方法全表(suite 桥 op)

T1 沙箱插件经 `@channek/sandbox-sdk` 的 suite 桥能调的**全部**方法,共 **34** 条。

**这是一张封闭白名单**——不在表里的方法一律拒绝;通用逃逸口(任意路径读文件 / 执行命令 / 转发任意 IPC)永不进表。放行判据是一条:**app 打开这个工作区时本来就已加载、用户已授权的数据与动作**,插件用它 ≡ app 自己用它,不构成新的信任要求。

标 **写** 的方法有副作用(写盘或触发真实操作),需要 `workspace:write` 权限,并按「每个插件 × 每个频道」过一次性同意闸。

## 套件区基础(7)

| op | 干什么 |
|---|---|
| `assets.overview` | 素材区概览数据。 |
| `operations.snapshot` | 运营区快照数据。 |
| `operations.saveBacklog` | **写** 保存选题池。 |
| `operations.updateField` | **写** 更新运营字段。 |
| `shell.openContent` | 在 app 里打开某条内容。 |
| `shell.openSection` | 切到某个功能区。 |
| `clipboard.writeText` | 写系统剪贴板。 |

## 工作区数据面(7)

| op | 干什么 |
|---|---|
| `workspace.info` | 当前工作区信息。 |
| `content.list` | 内容条目列表。 |
| `content.detail` | 单条内容详情。 |
| `content.createEntry` | **写** 新建一条内容。 |
| `card.active` | 活动风格卡的只读投影。 |
| `artifact.urls` | 条目产物的授权 URL(批量)。 |
| `pipeline.status` | 这条内容的整条灯轨状态。 |

## 主页承载(3)

| op | 干什么 |
|---|---|
| `publish.platforms` | 已注册发布平台目录。 |
| `card.brandAssets` | 卡的品牌资产(封面、色板等)。 |
| `card.kickoff` | 卡声明的开工引导数据。 |

## 内容步读写(2)

| op | 干什么 |
|---|---|
| `content.readFile` | 读这条内容目录里的一份工件正文。 |
| `content.writeFile` | **写** 把改完的工件存回这条内容目录。 |

## 宿主动作(3)

| op | 干什么 |
|---|---|
| `shell.openArtifact` | 把这条内容的一份产物交给 app 的文件工作台打开(宿主逐条校验实参)。 |
| `content.generateImages` | **写** 跑一次画面素材出图。画风锁、尺寸、端点由宿主注入,插件只说「画什么」。 |
| `content.regenerateCover` | **写** 重出三尺寸封面,约束同上。 |

## 场景烘焙(3)

| op | 干什么 |
|---|---|
| `scene.preview` | 为这条内容烘一次场景预览,拿回一次性授权 URL(随工作区释放失效);由哪个提供者烘、产物放哪,全由宿主决定。 |
| `scene.export` | 把这一镜烘成 mp4 并弹**原生保存框**由用户挑位置;用户取消返回 `false`,不是错误。 |
| `scene.bakeClip` | 把这一镜烘成纯净无声 mp4,回一枚可播放的授权 URL(配原生 `<video controls>` 用)。 |

## 发布(3)

| op | 干什么 |
|---|---|
| `shell.openPublishedUrl` | 在系统浏览器打开**这条内容已回填的作品链接**。宿主与自己记录的链接对账,对不上一律拒——不是通用「打开任意 URL」。 |
| `publish.autoFill` | **写** 半自动发布预填:只收 `(itemId, platforms)`,去哪个网站、填什么由平台提供者决定,插件指定不了目的地。 |
| `publish.backfillLinks` | **写** 回填发布链接到条目。 |

## 能力调用(1)

| op | 干什么 |
|---|---|
| `capability.invoke` | 调一条**已注册能力**——插件间协作的通用通道。三道闸:清单里逐条点名可调的能力(不给通配);文件类入参由宿主按条目解析注入,插件给的值丢弃;提供者的私有参数(端口、密钥、路径)不过桥。 |

## 配音工件(2)

| op | 干什么 |
|---|---|
| `artifact.mediaUrl` | 为条目内单个产物懒铸一枚授权 URL(批量口 `artifact.urls` 的逐个兜底)。 |
| `card.updateSoundMeta` | **写** 改活动卡声音库里一条音频的说明卡(评分 / 用途 / 说明);卡 id 由宿主注入,写点遏制在声音库目录内、字段白名单。 |

## 灯轨确认(3)

| op | 干什么 |
|---|---|
| `pipeline.acknowledgeStale` | **写** 「这次的过期我认了」——按掉一盏黄灯。 |
| `pipeline.acknowledgeAllStale` | **写** 一键认下整条的过期。 |
| `pipeline.revokeStaleAcknowledgement` | **写** 反悔,恢复黄灯。三条的应答都是重算后的整条灯轨。 |

:::info
34 = 7 + 7 + 3 + 2 + 3 + 3 + 3 + 1 + 2 + 3。每条 op 的实参与返回值签名以 `@channek/sandbox-sdk` 的类型定义为准。
:::
