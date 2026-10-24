---
title: 清单校验规则
description: manifest.json 校验的规则编号与含义;清单被拒时报的就是这些编号。
sidebar_position: 4
---

# 清单校验规则

插件安装 / 加载时 `manifest.json` 要过整套校验,被拒时报文带规则编号。下表列出每条规则管什么、典型报文长什么样。

| 规则 | 管什么 | 典型报文(节选) |
|---|---|---|
| `V1` | 清单基本形状:必须是对象、`manifestVersion` 必须等于 1、必填字段必须是非空字符串。 | `manifest must be an object` / `manifestVersion must equal 1` |
| `V2` | 插件 id:格式合法、必须与目录名一致、`channek.*` 官方命名空间保留给内置插件。 | `invalid plugin id` / `official namespace is reserved for builtin plugins` |
| `V3` | 版本号:`version` 与 `minAppVersion` 必须是合法语义化版本。 | `invalid version` / `invalid minAppVersion` |
| `V5` | 声明级(T0)插件不许携带代码类字段。 | `… is forbidden for declarative plugins` |
| `V6` | 代码插件的入口要求:代码插件必须声明 `apiVersion 1`;沙箱级必须有 sandbox 入口;特权级必须声明 apiVersion。 | `sandboxed plugins require a sandbox entry` |
| `V9` | 权限声明:必须是数组、权限名必须已知、网络权限必须合法。 | `unknown permission: …` |
| `V11` | `contributes` 形状:必须是对象、每个键下必须是数组。 | `contributes must be an object` |
| `V12` | 自定义扩展点:必须用自己的命名空间、`declSchema` 必须是数组。 | `custom extension point must use the …. namespace` |
| `V13` | 命令 id 与命令引用必须用插件自己的命名空间。 | `command id must use the …. namespace` |
| `V14` | 依赖声明:形状合法、不许依赖自己、版本区间必须合法。 | `plugins cannot depend on themselves` |

:::info
规则编号并不连续(部分编号预留 / 已合并)。完整报文以 app 实际输出为准——报文里每条都带编号,对着这张表定位即可。
:::
