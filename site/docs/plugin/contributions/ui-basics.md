---
title: 界面贡献:主题、图标、命令、菜单
description: T0 就能做的界面贡献:配色主题、文件图标集、命令(AI 与用户走同一条通道)、右键菜单、快捷键。
sidebar_position: 4
---

# 界面贡献:主题、图标、命令、菜单

## `ui.theme`:配色主题(T0)

一条主题贡献 = `{ id, label, base: 'light'|'dark', tokens, fonts?, preview }`。能力面 = **白名单 token + 自带字体(woff2)**,没有自由 CSS——这是防钓鱼层与点击劫持的刻意设计。token 值有语法校验(颜色 / 长度 / 阴影),非法值直接拒;间距、字号、行高、动效节奏不可覆盖。可覆盖 token 全表见[参考](/docs/reference/theme-tokens)。完整上手见[五分钟第一个插件](../getting-started/first-plugin.md)。

## `ui.iconTheme`:文件图标集(T0)

`{ id, label, defs: { folder, folderOpen, file, … } }`。第三方图标一律以 svg 文件引用(经 `<img>` / CSS mask 渲染),不内联。

## `ui.command`:命令(核心中的核心)

**凡用户可触发的操作,必须以命令承载**——按钮、菜单项、快捷键只是它的触发器。这条规矩的理由不是整洁:**AI 与用户走同一条命令通道**,没有命令的操作就是 Yan(内置 AI)够不着的死角。

```jsonc
"ui.command": [{
  "id": "acme.notes.export",           // 必须 <插件id>. 前缀
  "title": "导出笔记",                  // 菜单项:短,给正在用鼠标找它的人
  "description": "把当前频道的全部笔记合并导出成一份 markdown。",  // 给模型读 + 进搜索索引
  "keywords": ["合并", "汇总", "备份"],  // 用户会怎么说这件事(title 里已有的词不用重复)
  "category": "笔记",
  "danger": false
}]
```

:::tip `description` 与 `keywords` 决定 AI 找不找得到你
Yan 按「用户的说法」搜命令,而 `title` 是菜单措辞,两者天然对不上。不写这两位,你的命令照常工作——但用户对 AI 说「帮我备份笔记」时,它会回答「我做不了」,而能力就在目录里。这种失败是安静的。
:::

实现侧:T2 在 `activate` 里 `ctx.commands.register(id, fn)`(只收 manifest 声明过的 id);T1 页面经 SDK 的 `executeCommand` 触发自己声明的命令。插件调命令时宿主会盖「来自插件 X」的调用章——身份由宿主认,不认自报。

## `ui.menu` / `ui.submenu`:挂进右键菜单

```jsonc
"ui.menu": [{ "menu": "filetree/context", "command": "acme.notes.export", "group": "export", "order": 10 }]
```

`menu` 位置:`filetree/context` / `tab/context` / `editor/context` / `palette` / `styleCard/row` / `plugin/row`(设置里卡与插件列表的行末菜单,命令会收到 `{cardId}` / `{pluginId}` 点名那一行)。二级菜单用 `ui.submenu` 声明节点,菜单项经 `submenu` 字段挂进去。

## `ui.keybinding`:快捷键

```jsonc
"ui.keybinding": [{ "command": "acme.notes.export", "key": "mod+shift+e" }]
```

与内置冲突时内置优先(防冒充劫持)。工作区来源的插件不允许贡献键位——克隆一个仓库不等于同意改绑 ⌘S。

## `ui.viewerAction`:查看器头部动作钮

`{ id, command, icon?, when? }`——在文件查看器头部加一颗动作按钮(比如「切换编辑模式」),点下去执行你的命令。

## `when` 条件

多数 UI 声明支持 `when` 表达式,按上下文控制显隐。解析失败一律 fail-closed(当 false 处理),不会因为写错一个条件把贡献意外常显。
