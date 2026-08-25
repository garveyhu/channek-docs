---
title: 密钥:声明,别自己存
description: 密钥库一处存、多处引,值永不出特权侧;插件声明要哪把钥匙、注到哪儿,从头到尾拿不到值。
sidebar_position: 6
---

# 密钥:声明,别自己存

调付费云服务要 API key,连自建服务要 token。规矩只有一条:**密钥的值永远不进你的插件设置(那是明文 JSON),也不由你保管。**

## 密钥库的三个概念

| 概念 | 是什么 | 谁定义 |
|---|---|---|
| **密钥型号** `credential.kind` | 一种密钥长什么样(有哪些字段、哪些是秘密) | 内核自带三个通用型号(单把 API 密钥 / AK+SK / 用户名密码)+ 插件可贡献自己的 |
| **密钥** | 一份具体的值 | 用户在「设置 → 密钥」里填 |
| **引用** `credentialRef` | 插件设置里指向某份密钥的 id | 你声明字段、用户挑 |

贡献一种型号:

```jsonc
"credential.kind": [{
  "id": "acme.volc-aksk",
  "label": "火山引擎 AK/SK",
  "fields": [
    { "key": "accessKeyId",     "label": "Access Key ID",     "secret": false },
    { "key": "secretAccessKey", "label": "Secret Access Key", "secret": true  },
    { "key": "region",          "label": "地域", "secret": false, "default": "cn-beijing" }
  ]
}]
```

`secret` 必填不给默认——「这个字段要不要进钥匙串」是安全决定,不能悄悄当成 false。秘密字段进 OS 钥匙串;非秘密字段(region / endpoint)明文存放,方便备份与排查。

## 在插件里用

① 设置里放一个引用字段:

```jsonc
{ "key": "myCredential", "type": "credentialRef", "kind": "channek.apiKey", "label": "密钥" }
```

② 在 provider 上声明「要哪把、注到哪」:

```jsonc
"credentials": [{
  "kind": "app-secret",
  "secretId": "credential.{{params.myCredential}}",
  "label": "我的服务密钥",
  "as": { "env": "ACME_TOKEN" }          // command 形态注环境变量
  // http 形态:{ "header": "Authorization", "scheme": "Bearer" }
}]
```

用户在密钥库建一份、在你的设置里挑中它;调用那一刻宿主把真值注进子进程环境变量或请求头。**你的脚本读环境变量就行,从头到尾拿不到钥匙串。**

三种来源(`kind`):`app-secret`(OS 钥匙串,保护最高)/ `env`(调用方 shell 环境)/ `file`(普通文件)。后两种是显式声明的降级,给「让 app 之外的进程也调得动」的场景用。

## 四条铁律

1. **不给 `as` = 只是存在性声明**,宿主不注入——声明了密钥却不写注入点,表现为「跑通了但没带 key、回 401」,这正是要消灭的症状。注入点与调用形态要匹配(`env` 只对 `command`、`header` 只对 `http`),写反了校验直接报错。
2. **别把密钥填进普通 `string` 设置再拼进 `env`**——校验期直接拒(接收方键名形如 `*_KEY` / `*TOKEN` / `*SECRET` / `Authorization` 且值带 `{{` 即报错)。那样能跑通,代价是 key 被明文物化进能力目录文件。
3. **值永不落盘、永不回读**:能力目录里只有句柄与「在不在」(`present`);界面上的密钥框天然是空的。
4. **密钥不随卡分发、不进 git**——它是本机状态。卡只声明「要哪类钥匙」,收卡人自己填自己的。

删除密钥前宿主会查引用关系并摊开给人看;引用方在密钥没了之后表现为「未配置」,不是崩溃。
