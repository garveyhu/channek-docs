<div align="center">

<h1><img src="https://cdn.archeruuu.com/images/channek/logo-triad.png" height="40" align="top" />&nbsp; Channek Docs</h1>

**A protocol isn't open until you can build from it.**

**English** · [简体中文](README.zh-CN.md)

![Docusaurus](https://img.shields.io/badge/docusaurus-3-333333?style=flat-square)
![Modules](https://img.shields.io/badge/modules-guide%20%C2%B7%20card%20%C2%B7%20plugin%20%C2%B7%20reference-555555?style=flat-square)
![Search](https://img.shields.io/badge/search-zh%20local%20index-005A9C?style=flat-square)
![Live](https://img.shields.io/badge/live-docs.channek.com-1A1A1A?style=flat-square)

</div>

---

> ### The written-down half of the open surface
> [Channek](https://www.channek.com) keeps its kernel closed and its **formats and
> protocols public** — the card format, the plugin manifest, every extension-point contract.
> This repository is where that public surface gets written down for humans: how to author a
> style card, how to build a plugin, and every contract table you'd ever look up.
> Live at **[docs.channek.com](https://docs.channek.com)**; the AI-facing counterpart is
> [channek-skills](https://github.com/garveyhu/channek-skills).

## Why two apps in one site

```
site/          # the docs proper — Docusaurus 3, white, precise, searchable
flywheel/      # "Inside the Flywheel" — a scroll narrative with its own Memphis visual system
```

The docs want to be paper-white and invisible; the narrative page wants hard shadows, dot grids
and a winking black cat. Grafting either onto the other would cost both, so **they build
separately and ship as one site**: the docs at `/`, the narrative mounted at `/story/`
(its build output lands in `site/static/story/` at build time, linked with `pathname://` so the
SPA router stays out of the way).

## What's here

| Surface | What it covers |
|---|---|
| **User guide** (10 pages) | Install, open a folder, meet channels and workspaces, ship the first piece |
| **Channel cards** (15 pages) | `channel.json` at the channel root layer by layer, pipeline / layout / presentation / requires, portability red lines, sharing as `.channel` |
| **Plugin development** (25 pages) | Trust tiers, sandbox runtime, manifest, every contribution domain, pack & publish |
| **Reference** (8 pages) | All 40 contribution keys, all 34 bridge ops, manifest rules, card schema, glossary |
| **Inside the Flywheel** (`/story/`) | How one real channel runs on Channek — card-declared steps, plugin-supplied abilities, an honest progress rail |

## Editing content

- Docs are plain Markdown under `site/docs/<module>/`; the sidebar is **generated from the
  directory tree** (frontmatter `sidebar_position` + `_category_.json`), never hand-maintained.
- Design tokens are frozen at the top of `site/src/css/custom.css` — change colors there,
  never inline in pages.
- The narrative's copy lives in `flywheel/src/data/workflow.ts`; components only consume data.
- Reference tables (contribution keys / bridge ops / validation rules) mirror the app
  repository's **generated** files — when a kernel contract changes, this repo follows.
  The docs never invent a contract: when unsure, they say less.

## Running it

```bash
npm --prefix site install && npm --prefix flywheel install   # first time

npm run dev:site      # docs at http://localhost:3000
npm run dev:story     # narrative at http://localhost:5173
npm run build         # flywheel → site/static/story → site/build
npm run serve         # preview the production build
```

The build is a plain static directory — syncing `site/build/` to the origin server *is* the
release.

## Where this sits

Channek's moat is the engine; its ecosystem grows on **public formats and protocols**. Three
things carry that surface: the app validates it, this site explains it to people, and
[channek-skills](https://github.com/garveyhu/channek-skills) compiles it for coding agents.
Same source, three readers — when they disagree, the app's validator is the one that's right.
