---
title: 环境与发现目录
description: 插件住在哪、app 怎么发现它、开发期怎么热重载。
sidebar_position: 1
---

# 环境与发现目录

一个 Channek 插件就是**一个文件夹**:里面有一份 `manifest.json`,加上它声明要用到的资源或代码。不需要注册中心账号,不需要构建服务——把文件夹放对地方,app 就能发现它。

## 插件放在哪

| 来源(scope) | 位置 | 允许的信任级 |
|---|---|---|
| 内置 `builtin` | 随 app 分发 | 全部 |
| 用户 `user` | `~/.channek/plugins/<插件id>/` | 全部(T1/T2 过各自信任门) |
| 工作区 `workspace` | `<频道目录>/.channek/plugins/<插件id>/` | **永远仅 T0**,且默认不装载、先过工作区信任门 |

`~/.channek/` 是用户插件资产根。目录名必须与 manifest 里的 `id` 一致。

:::note 为什么工作区来源只许 T0
频道文件夹可能来自网盘、git、别人发来的压缩包——克隆一个仓库不等于同意执行里面的代码。所以跟着工作区走的只能是纯数据(主题 / 图标 / 预设 / 风格卡),代码插件一律装到用户目录、逐个过信任门。
:::

## 开发期工作流

**软链是一等公民**:

```bash
ln -s ~/dev/acme.my-plugin ~/.channek/plugins/acme.my-plugin
```

然后在 app 里:**设置 → 第三方插件 → 重新扫描 → 启用**。

- manifest 与资源改动**自动热重载**(watch);没动静时点「重新扫描」。
- 插件目录顶层可以是 symlink(宿主对插件根做 realpath 后登记),但插件**内部**的 symlink 逃逸会被拒——所有资源必须真的落在插件目录内。

## 排错速查

| 症状 | 去哪看 |
|---|---|
| 插件没出现在列表 | 确认目录名 = manifest 的 `id`、`manifest.json` 是合法 JSON;再点「重新扫描」 |
| 红标 error | 点开看逐条校验错误(id 不合法 / T0 带了代码入口 / token 超白名单…) |
| 灰态 incompatible | `minAppVersion` 高于当前 app 版本,或在工作区 scope 声明了 T1/T2 |
| 灰态 unresolved | 缺少 `dependencies` 声明的插件,或它被停用了 |
| 行为不对 | 插件详情页「日志」区(每插件最近 200 条)+ 权限拒绝计数;报障点「复制诊断信息」 |

下一步:[五分钟写第一个插件](./first-plugin.md)。
