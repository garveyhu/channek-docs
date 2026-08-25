---
title: 主题 token 参考
description: 插件界面可用的全套 --ck-* 设计变量:颜色、字体、间距、圆角、阴影、动效。
sidebar_position: 5
---

# 主题 token 参考

插件的界面(面板、功能区、设置区段等)应一律用 `--ck-*` 变量取色与排版,**不要硬编码颜色与间距字面量**——这样你的界面自动跟随亮 / 暗主题与用户装的第三方主题。

「主题可覆盖 = 是」的 token 允许 `ui.theme` 主题插件重定义;「否」的属于布局与结构常量,主题动不了。

## 颜色

| token | 亮色值 | 暗色值 | 主题可覆盖 |
|---|---|---|---|
| `--ck-canvas` | `#eceef1` | `#15171b` | 是 |
| `--ck-surface` | `#ffffff` | `#1d2026` | 是 |
| `--ck-raised` | `#f6f7f9` | `#252931` | 是 |
| `--ck-sunken` | `#e0e3e8` | `#101216` | 是 |
| `--ck-ink` | `#1a1c20` | `#e8eaed` | 是 |
| `--ck-ink-2` | `#5c626b` | `#a0a6b0` | 是 |
| `--ck-ink-3` | `#8b919b` | `#6d737d` | 是 |
| `--ck-line` | `color-mix(in srgb, var(--ck-ink) 12%, transparent)` | `rgba(255, 255, 255, 0.1)` | 是 |
| `--ck-line-strong` | `color-mix(in srgb, var(--ck-ink) 20%, transparent)` | `rgba(255, 255, 255, 0.18)` | 是 |
| `--ck-accent` | `#3b6ea5` | `#6ea8d8` | 是 |
| `--ck-accent-hover` | `#305d8c` | `#86bce8` | 是 |
| `--ck-accent-soft` | `color-mix(in srgb, var(--ck-accent) 12%, transparent)` | `color-mix(in srgb, var(--ck-accent) 16%, transparent)` | 是 |
| `--ck-accent-contrast` | `#ffffff` | `#0e1a24` | 是 |
| `--ck-cta` | `#1f2937` | `#e8eaed` | 是 |
| `--ck-cta-hover` | `#33404f` | `#ffffff` | 是 |
| `--ck-cta-contrast` | `#f7f9fc` | `#1d2026` | 是 |
| `--ck-warning` | `#b7791f` | `#d6a24a` | 是 |
| `--ck-danger` | `#d92d20` | `#ee7b73` | 是 |
| `--ck-success` | `#12805c` | `#62b896` | 是 |
| `--ck-icon-folder` | `#a9783f` | `#c79a62` | 是 |
| `--ck-icon-doc` | `#496b82` | `#81a7bd` | 是 |
| `--ck-icon-code` | `#71627f` | `#a293b1` | 是 |
| `--ck-icon-image` | `#66805d` | `#8daa82` | 是 |
| `--ck-icon-video` | `#8a5f65` | `#b9868d` | 是 |
| `--ck-icon-audio` | `#9a7048` | `#c39766` | 是 |
| `--ck-icon-data` | `#5f7774` | `#83a09c` | 是 |
| `--ck-glass` | `color-mix(in srgb, var(--ck-surface) 78%, transparent)` | `color-mix(in srgb, var(--ck-surface) 72%, transparent)` | 是 |
| `--ck-glass-highlight` | `rgba(255, 255, 255, 0.7)` | `rgba(255, 255, 255, 0.08)` | 是 |

## 选区与终端 / 播放器(布局常量)

| token | 亮色值 | 暗色值 | 主题可覆盖 |
|---|---|---|---|
| `--ck-selection` | `color-mix(in srgb, var(--ck-accent) 22%, transparent)` | `color-mix(in srgb, var(--ck-accent) 30%, transparent)` | 否 |
| `--ck-selection-solid` | `color-mix(in srgb, var(--ck-accent) 22%, var(--ck-surface))` | `color-mix(in srgb, var(--ck-accent) 30%, var(--ck-surface))` | 否 |
| `--ck-term-bg` | `#1d222b` | `#1d222b` | 否 |
| `--ck-term-surface` | `#262c37` | `#262c37` | 否 |
| `--ck-term-line` | `#333b48` | `#333b48` | 否 |
| `--ck-term-ink` | `#e8eaed` | `#e8eaed` | 否 |
| `--ck-term-dim` | `#6b7280` | `#6b7280` | 否 |
| `--ck-term-verb` | `#7dd3c0` | `#7dd3c0` | 否 |
| `--ck-term-id` | `#a9b4ff` | `#a9b4ff` | 否 |
| `--ck-term-key` | `#e0c184` | `#e0c184` | 否 |
| `--ck-term-val` | `#8fc98f` | `#8fc98f` | 否 |
| `--ck-term-flag` | `#8e94a3` | `#8e94a3` | 否 |
| `--ck-player-scrim` | `rgba(18, 16, 13, 0.78)` | `rgba(18, 16, 13, 0.78)` | 否 |
| `--ck-player-ink` | `rgba(255, 253, 247, 0.94)` | `rgba(255, 253, 247, 0.94)` | 否 |
| `--ck-player-ink-dim` | `rgba(255, 253, 247, 0.56)` | `rgba(255, 253, 247, 0.56)` | 否 |
| `--ck-player-track` | `rgba(255, 253, 247, 0.24)` | `rgba(255, 253, 247, 0.24)` | 否 |
| `--ck-player-fill` | `#fffdf7` | `#fffdf7` | 否 |
| `--ck-player-ground` | `#16181c` | `#16181c` | 否 |
| `--ck-player-ground-edge` | `rgba(0, 0, 0, 0.4)` | `rgba(0, 0, 0, 0.4)` | 否 |

## 阴影

| token | 亮色值 | 暗色值 | 主题可覆盖 |
|---|---|---|---|
| `--ck-shadow-sm` | `0 1px 2px color-mix(in srgb, var(--ck-ink) 6%, transparent)` | `0 1px 2px rgba(0, 0, 0, 0.3)` | 是 |
| `--ck-shadow-md` | `0 1px 2px color-mix(in srgb, var(--ck-ink) 5%, transparent), 0 8px 24px color-mix(in srgb, var(--ck-ink) 7%, transparent)` | `0 1px 2px rgba(0, 0, 0, 0.28), 0 8px 24px rgba(0, 0, 0, 0.36)` | 是 |
| `--ck-shadow-lg` | `0 2px 4px color-mix(in srgb, var(--ck-ink) 5%, transparent), 0 18px 48px color-mix(in srgb, var(--ck-ink) 10%, transparent)` | `0 2px 4px rgba(0, 0, 0, 0.3), 0 18px 48px rgba(0, 0, 0, 0.48)` | 是 |
| `--ck-shadow-xl` | `0 4px 10px color-mix(in srgb, var(--ck-ink) 8%, transparent), 0 28px 72px color-mix(in srgb, var(--ck-ink) 20%, transparent)` | `0 4px 10px rgba(0, 0, 0, 0.38), 0 28px 72px rgba(0, 0, 0, 0.62)` | 是 |

## 字体与排版

| token | 值 | 主题可覆盖 |
|---|---|---|
| `--ck-font-sans` | `'IBM Plex Sans', 'Avenir Next', 'PingFang SC', 'Source Han Sans SC', sans-serif` | 是 |
| `--ck-font-display` | `'IBM Plex Sans Condensed', 'IBM Plex Sans', 'PingFang SC', sans-serif` | 是 |
| `--ck-font-mono` | `'JetBrains Mono', 'SF Mono', ui-monospace, monospace` | 是 |
| `--ck-text-2xs` | `10px` | 否 |
| `--ck-text-xs` | `11px` | 否 |
| `--ck-text-sm` | `12px` | 否 |
| `--ck-text-base` | `13px` | 否 |
| `--ck-text-md` | `14px` | 否 |
| `--ck-text-lg` | `16px` | 否 |
| `--ck-text-xl` | `20px` | 否 |
| `--ck-text-2xl` | `26px` | 否 |
| `--ck-text-3xl` | `34px` | 否 |
| `--ck-text-display` | `clamp(34px, 3.5vw, 48px)` | 否 |
| `--ck-text-reading` | `16px` | 否 |
| `--ck-text-reading-lg` | `18px` | 否 |
| `--ck-reading-fs-sm` | `14px` | 否 |
| `--ck-reading-fs-md` | `15px` | 否 |
| `--ck-reading-fs-base` | `16px` | 否 |
| `--ck-reading-fs-lg` | `18px` | 否 |
| `--ck-reading-fs-xl` | `20px` | 否 |
| `--ck-reading-measure-comfort` | `clamp(44ch, 72%, 116ch)` | 否 |
| `--ck-leading-tight` | `1.15` | 否 |
| `--ck-leading-snug` | `1.35` | 否 |
| `--ck-leading-normal` | `1.6` | 否 |
| `--ck-weight-regular` | `400` | 否 |
| `--ck-weight-medium` | `500` | 否 |
| `--ck-weight-semibold` | `600` | 否 |
| `--ck-weight-bold` | `700` | 否 |

## 间距

| token | 值 | 主题可覆盖 |
|---|---|---|
| `--ck-space-0-5` | `2px` | 否 |
| `--ck-space-1` | `4px` | 否 |
| `--ck-space-1-5` | `6px` | 否 |
| `--ck-space-2` | `8px` | 否 |
| `--ck-space-2-5` | `10px` | 否 |
| `--ck-space-3` | `12px` | 否 |
| `--ck-space-4` | `16px` | 否 |
| `--ck-space-5` | `20px` | 否 |
| `--ck-space-6` | `24px` | 否 |
| `--ck-space-8` | `32px` | 否 |
| `--ck-space-10` | `40px` | 否 |
| `--ck-space-12` | `48px` | 否 |
| `--ck-space-16` | `64px` | 否 |
| `--ck-space-20` | `80px` | 否 |

## 圆角

| token | 值 | 主题可覆盖 |
|---|---|---|
| `--ck-radius-xs` | `4px` | 是 |
| `--ck-radius-sm` | `6px` | 是 |
| `--ck-radius-md` | `10px` | 是 |
| `--ck-radius-lg` | `14px` | 是 |
| `--ck-radius-xl` | `18px` | 是 |
| `--ck-radius-2xl` | `24px` | 是 |
| `--ck-radius-full` | `999px` | 是 |

## 动效与层级

| token | 亮色值 | 暗色值 | 主题可覆盖 |
|---|---|---|---|
| `--ck-ease-out` | `cubic-bezier(0.16, 1, 0.3, 1)` | `cubic-bezier(0.16, 1, 0.3, 1)` | 否 |
| `--ck-ease-snap` | `cubic-bezier(0.25, 1, 0.5, 1)` | `cubic-bezier(0.25, 1, 0.5, 1)` | 否 |
| `--ck-dur-fast` | `160ms` | `0ms` | 否 |
| `--ck-dur-base` | `240ms` | `0ms` | 否 |
| `--ck-dur-slow` | `420ms` | `0ms` | 否 |
| `--ck-z-dock` | `10` | `10` | 否 |
| `--ck-z-sticky` | `20` | `20` | 否 |
| `--ck-z-overlay` | `100` | `100` | 否 |
| `--ck-z-modal` | `200` | `200` | 否 |
| `--ck-z-toast` | `300` | `300` | 否 |
| `--ck-z-popover` | `250` | `250` | 否 |
