import { Fragment } from 'react';
import { motion } from 'framer-motion';
import { Section } from '@/components/Section';
import { REFRAME, COMPILE_CHAIN, ANALOGY, BOUNDARIES, type ChainKind } from '@/data/workflow';

const CHAIN_STYLE: Record<ChainKind, string> = {
  in: 'bg-yellow text-ink border-ink',
  build: 'bg-ink text-paper border-ink',
  out: 'bg-mint text-ink border-ink',
};

export function VideoAsText() {
  return (
    <Section
      id="video-as-text"
      index="06"
      kicker="video as data · 核心架构"
      title={
        <>
          视频，被写成了
          <br />
          <span className="mark-mint">数据</span>
        </>
      }
      intro={
        <>
          Channek 的时间轴不是「给人拖拽的画布」，是一本<strong>纯数据的账</strong>：工程文件
          .channek 里没有一个像素，只有结构化的轨道与剪辑。数据是 AI 的母语——于是人与 AI
          第一次能用<strong>同一条笔</strong>剪同一条片。
        </>
      }
    >
      {/* 传统 vs Channek */}
      <div className="mb-12 grid grid-cols-1 gap-5 md:grid-cols-[1fr_auto_1fr]">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="card-hard-sm p-5 opacity-80"
        >
          <div className="mb-3 flex items-center justify-between">
            <span className="font-display text-xl font-black text-ink/70">{REFRAME.traditional.title}</span>
            <span className="rounded-full border-[1.5px] border-red px-2 py-0.5 font-mono text-[10px] font-bold text-red">
              {REFRAME.traditional.tag}
            </span>
          </div>
          <ul className="flex flex-col gap-2">
            {REFRAME.traditional.points.map((p) => (
              <li key={p} className="flex items-start gap-2 text-sm text-ink/65">
                <span className="mt-1 text-red">✕</span>
                {p}
              </li>
            ))}
          </ul>
        </motion.div>

        <div className="flex items-center justify-center">
          <span className="font-display text-2xl font-black text-ink-soft">→</span>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="card-hard p-5 shadow-[6px_6px_0_#16C79A]"
        >
          <div className="mb-3 flex items-center justify-between">
            <span className="font-display text-xl font-black">{REFRAME.programmatic.title}</span>
            <span className="rounded-full bg-mint px-2 py-0.5 font-mono text-[10px] font-bold text-ink">
              {REFRAME.programmatic.tag}
            </span>
          </div>
          <ul className="flex flex-col gap-2">
            {REFRAME.programmatic.points.map((p) => (
              <li key={p} className="flex items-start gap-2 text-sm text-ink/80">
                <span className="mt-0.5 text-mint">✓</span>
                {p}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      {/* 两条支柱 */}
      <div className="mb-12">
        <div className="mb-4 flex items-center gap-3">
          <span className="kicker !text-ink-soft">这句话立得住，靠两条支柱</span>
          <span className="h-px flex-1 bg-ink/15" />
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="card-hard-sm flex items-center gap-3 p-4">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-[2.5px] border-ink bg-blue font-display font-black text-paper">
              ①
            </span>
            <div>
              <div className="font-display font-black">唯一的笔 · EditTransaction</div>
              <div className="font-mono text-[11px] text-ink-soft">人拖拽 / AI 调工具 → 同一条可撤销的事务</div>
            </div>
          </div>
          <div className="card-hard-sm flex items-center gap-3 p-4">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-[2.5px] border-ink bg-mint font-display font-black text-ink">
              ②
            </span>
            <div>
              <div className="font-display font-black">有理时间 · 永不漂移</div>
              <div className="font-mono text-[11px] text-ink-soft">时间全是整数分数，工程里绝无浮点秒</div>
            </div>
          </div>
        </div>
        <p className="mt-3 text-sm text-ink-soft">
          改动只有一条路进账本，每一笔都<strong className="text-ink">可撤销、可审计</strong>；时间不用浮点数，
          seek 一万次也<strong className="text-ink">不会差一帧</strong>。这两条是产品定义，不是实现细节。
        </p>

        <p className="mt-6 border-l-[5px] border-mint bg-paper-2 p-4 text-[15px] leading-relaxed text-ink">
          频道打磨的 <strong>tsx 场景组件</strong>呢？它们不进内核——由烘焙插件（
          <code className="rounded bg-ink px-1.5 py-0.5 font-mono text-xs text-mint">links.remotion</code>
          ）离线渲成<strong>普通素材</strong>喂给时间轴，不碰播放热路径。
          <strong className="mark-mint">画笔可以换，账本永远只有一本。</strong>
        </p>
      </div>

      {/* 确定性链 */}
      <div className="mb-12 border-[2.5px] border-ink bg-ink p-6">
        <div className="mb-5 flex flex-wrap items-baseline justify-between gap-2">
          <span className="font-display text-lg font-black text-paper">从声明到母版，是一条确定性的链</span>
          <span className="font-mono text-[11px] text-paper/50">同输入同输出 · 可复现</span>
        </div>
        <div className="flex flex-col gap-2 md:flex-row md:items-stretch">
          {COMPILE_CHAIN.map((node, i) => (
            <Fragment key={node.label}>
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className={`relative rounded border-[2.5px] p-3 md:flex-1 ${CHAIN_STYLE[node.kind]}`}
              >
                {node.kind === 'build' && (
                  <motion.span
                    className="absolute right-2 top-2 h-2 w-2 rounded-full bg-mint"
                    animate={{ opacity: [1, 0.2, 1] }}
                    transition={{ duration: 1.4, repeat: Infinity, delay: i * 0.2 }}
                  />
                )}
                <div className="font-mono text-[13px] font-bold leading-tight">{node.label}</div>
                <div className={`mt-1 text-[11px] leading-snug ${node.kind === 'build' ? 'text-paper/60' : 'text-ink/70'}`}>
                  {node.sub}
                </div>
              </motion.div>
              {i < COMPILE_CHAIN.length - 1 && (
                <span className="flex shrink-0 items-center justify-center font-mono text-mint">
                  <span className="md:hidden">↓</span>
                  <span className="hidden md:inline">→</span>
                </span>
              )}
            </Fragment>
          ))}
        </div>
        <p className="mt-4 text-[13px] leading-relaxed text-paper/55">
          预览与导出跑同一套合成代码，只是喂的时钟不同——所以你在剪辑台看到的，就是导出后的每一帧。
        </p>
      </div>

      {/* 软件类比 */}
      <div className="mb-12">
        <div className="mb-4 flex items-center gap-3">
          <span className="kicker !text-ink-soft">同一件事，软件人最懂的说法</span>
          <span className="h-px flex-1 bg-ink/15" />
        </div>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {ANALOGY.map((a, i) => (
            <motion.div
              key={a.from}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="card-hard-sm p-4"
            >
              <div className="font-display text-sm font-black text-ink">{a.from}</div>
              <div className="my-1 font-mono text-mint">≈</div>
              <div className="font-mono text-[13px] font-bold text-blue">{a.to}</div>
            </motion.div>
          ))}
        </div>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-5 border-l-[5px] border-mint bg-paper-2 p-4 text-lg font-bold leading-relaxed text-ink"
        >
          「工程是数据」 ≈ 「代码是文本」——
          <span className="text-ink-soft">正因为是文本，才有版本、diff、review 与协作；视频也一样。</span>
        </motion.p>
      </div>

      {/* 别 overclaim */}
      <div>
        <div className="mb-4 flex items-center gap-3">
          <span className="kicker !text-red">别 overclaim · 精确边界</span>
          <span className="h-px flex-1 bg-red/20" />
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {BOUNDARIES.map((b, i) => (
            <motion.div
              key={b.claim}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="card-hard-sm border-t-[5px] border-t-red p-5"
            >
              <div className="mb-2 font-display text-base font-black leading-snug text-ink">{b.claim}</div>
              <p className="text-[13px] leading-relaxed text-ink/70">{b.detail}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
