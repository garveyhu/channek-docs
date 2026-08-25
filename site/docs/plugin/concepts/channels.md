---
title: 多频道与作用域
description: 一个 app 多个频道窗口:插件实体全局一份、每频道各自启用与配置;频道身份由调用带来,永远别猜「当前频道」。
sidebar_position: 7
---

# 多频道与作用域

Channek 是**一频道一窗口**:用户可以同时开着几个频道。这带来两件插件作者必须懂的事——你的插件**装一份、按频道启用**;你的代码**永远不许假设「当前频道」是谁**。

## 作用域分层

| 层 | 作用域 | 说明 |
|---|---|---|
| 插件实体 | 机器级一份 | `~/.channek/plugins/<id>@<version>/`,不会每频道复制 |
| 信任决定 | 机器级 | 信任是对代码的,不是对频道的——A 频道信任了,B 频道不再问 |
| 启用清单 | **频道级** | `<频道>/.channek/plugins.json` 只记 `{id, version, enabled}`,频道目录里**永远没有代码** |
| 机器级设置 | 机器级 | 端点 / 模型目录 / 解释器路径(`scope: 'user'`,缺省) |
| 频道级设置 | 频道级 | 音色 / 语速 / 尺寸(`scope: 'workspace'`) |
| 插件存储 | 两层都有 | `ctx.storage` / 桥 storage 按 `scope` 落机器级或频道级,各 5MB 配额 |

「按频道启用」是**真停用**:切频道时不再启用的插件会被 deactivate,不是列表里藏起来。新频道默认:内置插件可用、第三方为空——要用就装,全局库已有时只登记引用、零下载。

## 串台问题:频道身份由调用带来

T1 页面住在**每个窗口自己的渲染进程**里,天然按窗口分开,无需操心。**T2 插件全 app 只有一份实例**,同时服务所有窗口——「这次调用是哪个频道的」必须从调用里拿:

### ① 收下宿主盖的章

```ts
ctx.sandbox.onRequest('acme.listItems', async (payload, context) => {
  return listFor(context.workspaceRoot);   // ← 章在第二参里
});
ctx.commands.register('acme.tool.open', (arg, context) => {
  openFor(context.workspaceRoot);
});
```

沙箱 rpc 与命令的调用来自某个窗口,宿主能从窗口反查频道并盖章——**沙箱伪造不了自己跑在哪个窗口里**。

### ② 干活时把章传下去

```ts
await ctx.workspace.readText('内容/x.md', { workspaceRoot });
await ctx.storage.set('progress', v, { scope: 'workspace', workspaceRoot });
ctx.settings.get<string>('voiceId', { workspaceRoot });
```

设置三层里只有机器层是公用的:`endpoint` 点不点名都一样,而 `voiceId`(频道级)不点名读到的是「最后挂上的那个频道」那份——正是串台 bug 本身。

### ③ 推事件时点名

```ts
ctx.sandbox.emit('acme.progress', payload, { workspaceRoot });
```

不点名 = 广播给所有窗口,一条更新会把别的频道窗口盖掉。点名了但那个频道没开窗口 = 一条都不推,**不退回广播**。

:::warning 两个必错写法
`ctx.workspace.root()` 给的是「最后挂上的那个根」,多窗口下它就是 bug 本身;T2 里的**模块级单例**是跨窗口共享的,按频道分的状态必须以 `workspaceRoot` 键控,不能存在单例字段上。
:::

后台任务(`ctx.background.onRun`)按定义没有发起窗口,拿到的 `workspaceRoot` 恒为 `null`——要为频道干活就自己枚举要处理哪些频道,别指望宿主替你猜。

## 频道的稳定身份

每个频道目录的 `.channek/workspace.json` 里有两个身份字段:`id`(`ws_` 开头,创建时生成、永不变——搬目录、换机器都跟着走)与 `slug`(人读短名,可改)。机器之间传递一律用 `id`;人输入(CLI `--channel`)两者都收。**路径不是身份**——按路径找到目录后仍以目录里的 `id` 为准。
