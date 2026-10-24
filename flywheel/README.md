# 飞轮的内部 · 一个频道在 Channek 里怎么运转

把 **飞轮日记** 这个频道在 Channek 架构下的运转拆开摊给你看的滚动叙事单页 ——
解答「一句灵感如何变成一条成片」，以及背后「一张卡 × 九步灯轨 × 一群插件」的分工。

吃品牌冻结 token（孟菲斯撞色 + 薄荷青眼 emo 黑猫），站点本身就是这套设计系统的活样板。
它是文档站（`../site/`，Docusaurus）之外的**独立入口**：文档讲「怎么开发」，这页讲
「一个真实频道跑起来是什么样」。

## 怎么跑

```bash
cd flywheel
npm install      # 首次
npm run dev      # 开发，默认 http://localhost:5173
npm run build    # 生产构建到 dist/（base 固定 /story/）
npm run preview  # 预览构建产物
```

构建产物由文档站的构建脚本整目录拷进 `site/static/story/`，最终以 `/story/` 路径对外。

## 十二章叙事（一条主线滚到底）

| #   | 章节                          | 讲什么                                                                        |
| --- | ----------------------------- | ----------------------------------------------------------------------------- |
| 00  | Hero                          | 一句灵感 → 一条成片，这台机器现在叫 Channek                                   |
| 01  | 壳与卡                        | 内核三层（记 / 出 / 接）不动，频道 = 一个文件夹 + 根目录一份纯数据的频道卡    |
| 02  | 文件夹                        | 整个频道就是一个本地文件夹：频道卡与 sop/ 菜谱 + work/ 下四个私有创作区       |
| 03  | **九步**（signature 交互）    | 卡声明的九步灯轨·滚动驱动令牌穿行 + 工件累积·每步展开「卡 key ↔ 插件 step」   |
| 04  | 插件                          | 内核零创作能力：界面区 / 流程工件 / 生成能力 / 媒体底座 / 出口，全是插件贡献  |
| 05  | 双泳道                        | 创作步等人与 AI 商量，生产步由插件确定性执行                                  |
| 06  | **写数据**（核心架构）        | .channek 纯数据账本 · 唯一写路径 · 有理时间 · 场景烘焙 · 确定性链 · 精确边界  |
| 07  | 工件链                        | 步骤互不相识，一切经语义 kind 的工件衔接；文件叫什么由卡回答                  |
| 08  | 诚实灯轨                      | 进度从磁盘工件的存在性 + 新鲜度推导，不信内存标志                             |
| 09  | 品牌脸                        | 冻结三件套住进卡里：brand 段锁视觉、requires 点名音色、profile 写人设         |
| 10  | 飞轮                          | 复盘反哺选题，为什么越转越省力                                                |
| 11  | 复刻                          | 打包（拷做法不拷作品）→ 导入体检 → 转起来；出口指向 Channek 开发者文档        |

> 全篇按脱敏铁律写（对外可公开）：只讲「工件类型 + 格式」、用 `<...>` 抽象骨架，
> 不出现本机路径 / 真实内容 slug / 真实内容细节。

## 内容导航

右侧悬浮 TOC（`src/components/SectionNav.tsx` + `useScrollSpy`）：全标签常显、scroll-spy
高亮当前节、点击平滑跳转；**首页隐藏、滚进正文才淡入**。章节锚点表在 `workflow.ts` 的
`NAV_SECTIONS`，与各 section 的 `id` 一一对应。

## 内容事实源

讲解文案的单一事实源 = `src/data/workflow.ts`，不在组件里散写。而它讲的东西的事实源是
**飞轮日记频道的频道卡**（`channel.json` 的 pipeline / layout / requires 声明）与它点名的插件
清单——改流程先改卡，这个站只是它的镜子。

## 技术栈

Vite + React 18 + TypeScript（strict）+ Tailwind v4 + framer-motion。
`@/` 别名指向 `src/`。设计 token 在 `src/styles/index.css` 的 `@theme` 块。

## 目录

```
src/
├── data/workflow.ts     # 全站渲染的单一事实源（九步/工件/插件地图/灯色…）
├── styles/index.css     # 冻结 token 派生 + 基础样式 + 孟菲斯硬阴影卡
├── components/          # EmoCat · Flywheel · Section 外壳 · SectionNav · 滚动进度条
├── sections/            # 十二章叙事，每章一个文件
└── pages/PipelineStory.tsx  # 串起全部章节（App 唯一页面）
public/emo/              # emo 黑猫表情资产（拷自品牌套件）
```
