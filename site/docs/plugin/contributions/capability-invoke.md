---
title: 调用形态与占位符
description: command / http / module / host 四种 invoke;占位符分装配期与调用期两批,是整套设计里最容易搞错的一处。
sidebar_position: 2
---

# 调用形态与占位符

`capability.provider` 的 `invoke` 说清「这条候选怎么被真正执行」。四种形态:

## `command`:spawn 一个子进程

```jsonc
"invoke": {
  "kind": "command",
  "program": { "pluginFile": "bin/tts" },
  "args": ["--text-file", "{{input.text@file}}",
           "--model", "{{params.modelPath}}",
           "--out", "{{outputDir}}/tts-{{runId}}.wav"],
  "env": { "ACME_KIT": "{{params.kit}}" },
  "timeoutMs": 600000,
  "result": { "kind": "stdout-json", "okField": "ok", "pathField": "path" }
}
```

- **`args` 恒为数组,永不是 shell 字符串。** 要拼进去的值来自卡与用户正文,里面有引号、换行、`$`——走 shell 字符串,一张恶意卡就能拿下这台机器。替换是整 token 语义、不经 shell:没有 glob、没有管道。
- **`program` 三形态**,安全等级递减:`{ "pluginFile": "bin/x" }`(插件目录内,最安全)/ `{ "setting": "pythonBin", "fallback": "python3" }`(设置值,留空走 PATH 找 fallback)/ `{ "lookup": "ffmpeg" }`(裸名走 PATH,最危险,体检会点名)。
- 不给 `cwd` 时子进程跑在 `~/.channek/plugin-work/<插件id>/`——按插件隔离的稳定工作目录,**不是**调用方的 cwd。
- 实现可以是任何语言。**纯命令型插件可以一行 JS 都没有**——app 全程不知道被调的是什么程序。

## `http`:直接发一个请求

```jsonc
"invoke": {
  "kind": "http", "method": "POST", "url": "{{params.endpoint}}/v1/audio",
  "body": { "kind": "json", "template": { "text": "{{input.text}}" } },
  "result": { "kind": "binary", "saveAs": "{{outputDir}}/tts-{{runId}}.wav" }
}
```

`method` 只收 GET / POST / PUT;`body.kind` ∈ `json` / `form` / `binary`。

## `module` / `host`:离不开 app 的两种

```jsonc
"invoke": { "kind": "module", "requiresApp": true }   // 实现 = 你的 T2 代码
"invoke": { "kind": "host", "op": "…" }                // 实现 = 内核操作,provider 只点名
```

两者的责任方相反(`module` 跑挂了找插件作者,`host` 是内核的事)。它们对**脱机调用方**等于不存在——`offline` 是推出来的:`kind` 是 `command` 或 `http` 才算可脱机。想让能力被命令行与 agent 生态脱机用到,就提供这两种形态之一。

## `result`:怎么算成功

| `kind` | 怎么取产物 |
|---|---|
| `stdout-json` | **stdout 末行一行紧凑 JSON**(`{"ok":true,"path":"…"}`),进度与日志走 stderr。成功判据 = 退出码 0 **且** `ok: true`,两条同时成立 |
| `binary` | 响应体存到 `saveAs` |
| `files-in-outdir` | 按 `glob` 在输出目录里收产物 |

失败时打 `{"ok": false, "error": "人能看懂的一句话"}` 并退非 0。

## 占位符:两批,替换时机不同

:::warning 这是最容易踩的一条

| 批次 | 占位符 | 什么时候被替换 |
|---|---|---|
| **装配期** | `{{params.*}}`(设置值)· `{{pluginDir}}` · `{{workspaceRoot}}` | app 写能力目录那一刻;用户改一次设置就重算一次 |
| **调用期** | `{{input.*}}` · `{{input.*@file}}` · `{{outputDir}}` · `{{runId}}` · `{{tmpDir}}` | 每次调用,由调用方填 |

后果:你的脚本**永远不该**收到 `{{params.xxx}}` 字面量——除非那个设置项没有 `default` 且用户没配过。所以**每个设置项都要写 `default`**。这是插件作者最难自查的一类 bug:你本地配过,永远复现不出来。
:::

另外几条替换规则:认不出的占位符**原样保留**(目录里看到还带花括号的 = 那个设置是空的);只有标量能进命令行(对象 / 数组不替换);模板**没有条件、循环、表达式**——「有 voiceId 才加 `--voice`」这类逻辑由你自己的入口脚本承担。

## 参数从哪来:三层合并

`{{params.*}}` 的值由三层配置合并:**user(机器级)< card(卡 `pluginSettings` 里带的)< workspace(频道侧车)**。

- 只有你在 `ui.settingsSection` 里**声明过的键**会落进 params(白名单,也是隐私闸)。
- **机器级的键在卡层与频道层一律被剔除**——卡可能是导入的,放任它覆盖 `endpoint` 是安全漏洞。
- 被 `program` / `cwd` / `env` 引用的设置键**必须机器级**;`args` 里的可以频道级。这是这套设计里最重要的一条安全不变量:可执行位置与数据分开。

## 自包含铁律

```diff
  "args": [
-   "{{params.script}}",              // ✗ 指向用户机器上别处的脚本——别人装了跑不了
+   "{{pluginDir}}/bin/draw.py",      // ✓ 插件自带实现
```

留给用户填的设置只有三类:解释器 / 工具路径、用户私有资产(模型、参考音)、调参。凡「所有用户都一样」的东西一律进插件包;`default` 与 `program` 是**随插件分发的值**,不许写任何本机路径。产物只写 `{{outputDir}}`,文件名带上 `{{runId}}`(并发不撞、失败可追)。
