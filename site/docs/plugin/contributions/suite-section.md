---
title: 整页功能区
description: ui.suiteSection 让你给 app 贡献一整页界面——挂进左缘导航、由频道卡决定启不启用,纯 T1 就能做完整功能区。
sidebar_position: 6
---

# 整页功能区(`ui.suiteSection`)

功能区是挂在 app 左缘导航上的**一整页界面**(素材库、运营台、粉丝看板……)。这是「开发者能给 app 开发完整前端」的实证形态——官方自己的频道套件也以同样的第三方形态实现,第一方无特权。

## 插件形状

```
acme.fan-ops/
├── manifest.json
├── dist/assets.html|js|css        # 全自包含 bundle:无外部 host、无内联 script/style
└── dist/operations.html|js|css
```

```json
{
  "manifestVersion": 1,
  "id": "acme.fan-ops",
  "name": "粉丝运营",
  "version": "1.0.0",
  "description": "素材与运营两个整页区",
  "minAppVersion": "0.1.0",
  "trust": "sandboxed",
  "apiVersion": "1",
  "entries": { "sandbox": "dist/assets.html" },
  "permissions": ["workspace:read", "clipboard:write", "shell:openExternal"],
  "contributes": {
    "ui.suiteSection": [
      { "id": "acme.fan-ops.assets", "label": "素材", "icon": "assets",
        "entry": "dist/assets.html", "declaredOnly": true },
      { "id": "acme.fan-ops.operations", "label": "运营", "icon": "operations",
        "entry": "dist/operations.html", "declaredOnly": true }
    ]
  }
}
```

- **`trust: "sandboxed"`(T1)足够做完整功能区**——数据面走 suite 桥白名单;只有真需要后台逻辑(重扫描 / 网络 / 长任务)才升 `privileged`(UI 仍在沙箱,逻辑在 host 经 rpc 相连)。
- 区 id 用点分小写命名空间(≥2 段);`<插件id>.<区名>` 是防撞车的推荐约定。单区插件可省 decl 的 `entry`(回落 `entries.sandbox`);多区插件各指各的入口——**入口即身份**。
- 权限最小化:读数据 `workspace:read`、复制 `clipboard:write`、外链 `shell:openExternal`;要写台账再加 `workspace:write`(首次写入宿主还会按频道弹一次同意,见下)。

## 区什么时候出现:卡说了算

哪些区启用、顺序、默认区由**当前频道卡的 `presentation.sections`** 决定(数组序 = 导航序):

```json
{ "presentation": { "sections": [{ "id": "homes" }, { "id": "acme.fan-ops.assets" }],
                    "defaultSection": "homes" } }
```

- `declaredOnly: true` 的区**只在卡点名时出现**;缺省 false 的进「无 presentation 默认链」。
- 卡点名了但插件未装 / 停用 / 待信任 → 区**不消失**,降级为缺区落地页(说清谁提供、为什么不可用、下一步去哪)。卡声明永不静默失真。

## 页内代码

```ts
import { createSandboxSdk, suiteContextFromInit } from '@channek/sandbox-sdk';

const sdk = createSandboxSdk();
sdk.onInit(async init => {
  const context = suiteContextFromInit(init);        // null = 非 suite 承载面
  const overview = await sdk.suite.assetsOverview(); // 白名单 op
  render(overview);
});
```

数据、导航、剪贴板全部走 suite 桥的 typed 白名单 op(读素材概览 / 运营快照 / 内容条目 / 卡声明 / 管线状态;导航 `shell.openContent` / `shell.openSection`;写 `operations.saveBacklog` / `operations.updateField`——[全表见参考](/docs/reference/suite-bridge-ops))。要点:

- **读应答 ≤1MB**,超限明确报错并提示分页;大清单在 iframe 内自己虚拟滚动。
- **媒体不过桥**:应答里的 `channek-media:` 能力 URL 直接给 `<img>` / `<video>`(沙箱 CSP 已放行);URL 不可外携,插件停用即失效。
- **写 op 过双重闸**:`workspace:write` 权限 + 每(插件, 频道)一次性同意。未同意的写立即得机械码 `consent-required`,宿主同时弹一次确认,允许后重试即成功;revision 冲突原样回人类可读错误——刷新快照重试。
- UI 技术栈自选(Preact / vanilla / React 皆可),唯一契约是线协议;DTO 类型从 `@channek/ipc-contract` 的**类型层**引入,运行时零依赖。

## 存储:原生够用,跨频道分身才需要装

沙箱页有自己的 origin,`localStorage` / `IndexedDB` **原生可用**。SDK 的 `installWebStorage` 只解决一件原生给不了的事:**按频道分身**(`{ scope: 'workspace' }`——同一插件在不同频道各存一份)。只需要「每插件一份」就别装它。要更大量或更强一致性,用 `sdk.storage.get/set`(直达插件存储);再大就走「T2 侧持有 + rpc 分页」。

## 后台 tab 与状态复原

后台区 tab 的 iframe 可能被卸载,重挂时经 `init.restoredState` 复原滚动 / 折叠等视图状态——用 `setState` 随手存,别依赖页面常驻。
