# Channek 开发者文档

面向 Channek 生态开发者(风格卡作者 / 插件作者)的文档站,外加一篇整体保留的滚动叙事《飞轮的内部》。

## 仓库结构

```
├── site/          # 文档站本体(Docusaurus 3 + TypeScript)
│   ├── docs/      #   内容:guide / style-card / plugin / reference 四个模块
│   ├── src/       #   首页与主题定制(token 在 src/css/custom.css)
│   └── static/story/  # 构建时从 flywheel/dist 同步进来(生成物,不进 git)
└── flywheel/      # 《飞轮的内部》滚动叙事页(独立 Vite + React 应用,挂在 /story/)
```

两个应用各自装依赖、各自构建;文档站在构建时把 flywheel 的产物收进 `static/story/`,
所以线上是**一个站**:`/` 文档,`/story/` 叙事页。

## 常用命令(仓库根)

```bash
npm --prefix site install      # 首次:装文档站依赖
npm --prefix flywheel install  # 首次:装叙事页依赖

npm run dev:site      # 开发文档站(默认 http://localhost:3000)
npm run dev:story     # 开发叙事页(默认 http://localhost:5173)
npm run build         # 全量构建:flywheel → site/static/story → site/build
npm run serve         # 本地预览构建产物
```

## 内容怎么改

- 文档正文都是 Markdown,在 `site/docs/<模块>/` 下;排序用 frontmatter 的
  `sidebar_position` 与目录里的 `_category_.json`,侧栏由目录结构自动生成,不手维护清单。
- 视觉 token 冻结在 `site/src/css/custom.css` 顶部,改色先改那里,别在页面里散写。
- 《飞轮的内部》的讲解文案在 `flywheel/src/data/workflow.ts`,视觉组件在 `flywheel/src/`。
- 契约类参考页(贡献键 / 桥操作 / 校验规则)的事实源是 Channek 主仓库的生成物
  (`docs/plugin/reference/`),主仓库契约变更后同步更新 `site/docs/reference/`。
