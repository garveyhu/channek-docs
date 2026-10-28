import type { ReactNode } from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Layout from '@theme/Layout';

import styles from './index.module.css';

interface ModuleEntry {
  title: string;
  desc: string;
  to: string;
  icon: ReactNode;
}

const ICON_PROPS = {
  width: 20,
  height: 20,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.7,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
} as const;

/** 四个文档模块,与顶部导航一一对应——首页只是门厅,不复述内容。 */
const MODULES: ModuleEntry[] = [
  {
    title: '使用指南',
    desc: '第一次打开 Channek:装好、打开一个文件夹、认识频道与工作区,把第一条内容跑起来。',
    to: '/docs/guide/overview',
    icon: (
      <svg {...ICON_PROPS}>
        <path d="M3 5.5c3-1.6 6-1.6 9 0 3-1.6 6-1.6 9 0v13c-3-1.6-6-1.6-9 0-3-1.6-6-1.6-9 0z" />
        <path d="M12 5.5v13" />
      </svg>
    ),
  },
  {
    title: '频道卡',
    desc: '把「这类创作怎么做」写成一张可分发的卡:流程、风格、目录布局与依赖声明。',
    to: '/docs/style-card/overview',
    icon: (
      <svg {...ICON_PROPS}>
        <rect height="16" rx="2.5" width="18" x="3" y="4" />
        <path d="M3 9.5h18" />
        <path d="M7 14h6" />
      </svg>
    ),
  },
  {
    title: '插件开发',
    desc: '给 Channek 加能力:manifest、信任分级、扩展点契约,从第一个插件到打包上架。',
    to: '/docs/plugin/overview',
    icon: (
      <svg {...ICON_PROPS}>
        <path d="M9 3v4.5M15 3v4.5" />
        <path d="M6 7.5h12V12a6 6 0 0 1-12 0z" />
        <path d="M12 18v3" />
      </svg>
    ),
  },
  {
    title: '参考',
    desc: '契约速查:全部贡献键、沙箱桥操作、清单校验规则与主题 token,一页一张表。',
    to: '/docs/reference/overview',
    icon: (
      <svg {...ICON_PROPS}>
        <rect height="16" rx="2.5" width="18" x="3" y="4" />
        <path d="M3 10h18" />
        <path d="M10 4v16" />
      </svg>
    ),
  },
];

/* 代码面板的四类记号:键 / 字符串 / 数字 / 标点 */
function K({ children }: { children: ReactNode }) {
  return <span className={styles.tokKey}>{children}</span>;
}
function S({ children }: { children: ReactNode }) {
  return <span className={styles.tokStr}>{children}</span>;
}
function N({ children }: { children: ReactNode }) {
  return <span className={styles.tokNum}>{children}</span>;
}

/** 真实的卡形状(与文档示例同源),不是装饰性假代码。 */
function CardSnippet() {
  return (
    <figure className={styles.codePanel}>
      <figcaption className={styles.codePanelBar}>
        <span className={styles.codePanelFile}>channel.json</span>
        <span className={styles.codePanelHint}>放在频道根,一张卡描述一个频道</span>
      </figcaption>
      <pre className={styles.codePanelBody}>
        <code>
          {'{\n'}
          {'  '}<K>"schema"</K>: <S>"channek.channel"</S>,{'\n'}
          {'  '}<K>"formatVersion"</K>: <N>2</N>,{'\n'}
          {'  '}<K>"name"</K>: <S>"口播快剪"</S>,{'\n'}
          {'  '}<K>"card"</K>: {'{ '}<K>"id"</K>: <S>"acme.talkfast"</S>{' },\n'}
          {'\n'}
          {'  '}<K>"pipeline"</K>: {'{\n'}
          {'    '}<K>"steps"</K>: [{'\n'}
          {'      '}{'{ '}<K>"key"</K>: <S>"topic"</S>, <K>"step"</K>: <S>"acme.topic"</S>{' },\n'}
          {'      '}{'{ '}<K>"key"</K>: <S>"script"</S>, <K>"step"</K>: <S>"acme.script"</S>{' },\n'}
          {'      '}{'{ '}<K>"key"</K>: <S>"voice"</S>, <K>"step"</K>: <S>"acme.tts-take"</S>{' },\n'}
          {'      '}{'{ '}<K>"key"</K>: <S>"edit"</S>, <K>"step"</K>: <S>"channek.edit"</S>{' },\n'}
          {'      '}{'{ '}<K>"key"</K>: <S>"publish"</S>, <K>"step"</K>: <S>"acme.publish"</S>{' }\n'}
          {'    ]\n'}
          {'  },\n'}
          {'\n'}
          {'  '}<K>"requires"</K>: {'{\n'}
          {'    '}<K>"providers"</K>: [{'\n'}
          {'      '}{'{ '}<K>"capability"</K>: <S>"channek.tts"</S>, <K>"prefer"</K>: [<S>"acme.tts"</S>]{' }\n'}
          {'    ]\n'}
          {'  }\n'}
          {'}'}
        </code>
      </pre>
    </figure>
  );
}

export default function Home() {
  return (
    <Layout
      description="Channek 开发者文档:频道卡与插件开发的完整指南——流程写在卡里,能力来自插件。"
      title="频道卡与插件开发指南"
    >
      <main className={styles.page}>
        <header className={styles.hero}>
          <div className={styles.heroText}>
            <p className={styles.kicker}>Channek Developer Docs</p>
            <h1 className={styles.title}>
              流程写在<span className={styles.mark}>卡</span>里,
              <br />
              能力来自<span className={styles.mark}>插件</span>。
            </h1>
            <p className={styles.sub}>
              Channek
              打开一个文件夹,把创作从想法管到发布。「怎么做」写在可分发的频道卡里,能力由插件贡献——这里是把两者做出来的全部文档。
            </p>
            <div className={styles.ctaRow}>
              <Link className={styles.ctaPrimary} to="/docs/guide/overview">
                进入使用指南
              </Link>
              <Link className={styles.ctaSecondary} to="/docs/plugin/overview">
                开发插件
              </Link>
            </div>
            <p className={styles.metaLine}>58 篇文档 · 40 个贡献键 · 34 条沙箱桥操作</p>
          </div>
          <CardSnippet />
        </header>

        <section aria-label="文档模块" className={styles.moduleGrid}>
          {MODULES.map(m => (
            <Link className={styles.moduleCard} key={m.to} to={m.to}>
              <div className={styles.moduleHead}>
                <span aria-hidden className={styles.moduleIcon}>
                  {m.icon}
                </span>
                <h2 className={styles.moduleTitle}>{m.title}</h2>
                <span aria-hidden className={styles.moduleArrow}>
                  →
                </span>
              </div>
              <p className={styles.moduleDesc}>{m.desc}</p>
            </Link>
          ))}
        </section>

        <section aria-label="快速入口" className={styles.quickRow}>
          <Link
            className={styles.quickCard}
            to="/docs/plugin/getting-started/first-plugin"
          >
            <p className={styles.quickKicker}>教程</p>
            <h2 className={styles.quickTitle}>十分钟,第一个插件</h2>
            <p className={styles.quickDesc}>
              一份 manifest、一个目录、启用即生效——从零代码的 T0 主题插件开始,认识整条装载链路。
            </p>
          </Link>
          <Link className={styles.quickCard} to="/docs/guide/ecosystem/develop">
            <p className={styles.quickKicker}>官方 Skills</p>
            <h2 className={styles.quickTitle}>让你的 AI 替你开发</h2>
            <p className={styles.quickDesc}>
              装上 channek-skills,对你的 Claude Code / Codex
              说句大白话,它就会替你写出一张能过校验的卡、一个能装上就跑的插件。
            </p>
          </Link>
        </section>

        <section aria-label="飞轮的内部" className={styles.storyRow}>
          <Link className={styles.storyCard} href="pathname:///story/">
            <div className={styles.storyText}>
              <h2 className={styles.storyTitle}>飞轮的内部</h2>
              <p className={styles.storyDesc}>
                一篇独立的滚动叙事:以「飞轮日记」频道为样本,拆开看一句灵感怎么变成一条成片——卡声明流程,插件供给能力,工件链一路留痕。风格与正文文档刻意不同,值得单独一读。
              </p>
              <span className={styles.storyCta}>
                进去看看 <span aria-hidden>→</span>
              </span>
            </div>
            <img
              alt=""
              className={styles.storyCat}
              height={132}
              src={useBaseUrl('/img/emo-wink.png')}
              width={132}
            />
          </Link>
        </section>
      </main>
    </Layout>
  );
}
