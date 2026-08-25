import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { STAGES, STAGE_INTRO, STAGE_PROVIDERS, type ProviderTag } from '@/data/workflow';

const TAG_DOT: Record<ProviderTag, string> = {
  step: 'bg-mint',
  capability: 'bg-blue',
  kernel: 'bg-yellow',
  ai: 'bg-red',
};

export function Pipeline() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const [active, setActive] = useState(0);

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const idx = Math.min(STAGES.length - 1, Math.max(0, Math.floor(v * STAGES.length * 0.999)));
    setActive(idx);
  });

  const fillWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const stage = STAGES[active];
  const isCreative = stage.lane === 'creative';

  return (
    <section ref={ref} id="pipeline" className="relative bg-ink" style={{ height: '460vh' }}>
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden px-6 py-8">
        <div className="bg-dotgrid absolute inset-0 opacity-[0.06]" />

        <div className="relative mx-auto w-full max-w-6xl">
          {/* 标题 */}
          <div className="mb-2 flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-full border-[2.5px] border-mint bg-mint font-mono text-sm font-bold text-ink">
              03
            </span>
            <span className="kicker !text-paper/60">the light rail · 卡声明的九步</span>
          </div>
          <h2 className="heading-xl mb-3 text-3xl text-paper md:text-5xl">
            一条内容，沿<span className="mark-mint">灯轨</span>走九步
          </h2>
          <p className="mb-8 max-w-3xl text-sm leading-relaxed text-paper/60 md:text-base">{STAGE_INTRO}</p>

          {/* 流水线轨道 */}
          <div className="relative mb-10 px-2">
            {/* 创作 / 生产 泳道标 */}
            <div className="mb-4 flex text-center font-mono text-[11px] tracking-wider">
              <div className="flex-[3] border-b-2 border-dashed border-mint pb-1 text-mint">创作泳道 · 人与 AI ①–③</div>
              <div className="w-4" />
              <div className="flex-[6] border-b-2 border-dashed border-blue pb-1 text-blue">生产泳道 · 插件在跑 ④–⑨</div>
            </div>

            {/* 灯轨线 + 进度填充 */}
            <div className="relative h-1.5 w-full rounded-full bg-paper/15">
              <motion.div className="absolute left-0 top-0 h-full rounded-full bg-mint" style={{ width: fillWidth }} />
              {/* 移动的内容令牌 */}
              <motion.div
                className="absolute top-1/2 z-20 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center"
                style={{ left: fillWidth }}
              >
                <div className="flex h-7 w-7 items-center justify-center rounded-full border-[2.5px] border-ink bg-yellow shadow-[0_0_0_4px_rgba(255,209,46,0.25)]">
                  <span className="font-display text-[13px] font-black leading-none text-ink">片</span>
                </div>
                <span className="mt-1 whitespace-nowrap rounded bg-yellow px-1.5 font-mono text-[9px] font-bold text-ink">
                  一条内容
                </span>
              </motion.div>
            </div>

            {/* 9 个节点 */}
            <div className="mt-3 flex justify-between">
              {STAGES.map((s, i) => {
                const isActive = i === active;
                const isPast = i < active;
                const creative = s.lane === 'creative';
                const dotColor = creative ? 'border-mint' : 'border-blue';
                let dotClass: string;
                if (isActive) {
                  dotClass = creative ? 'scale-125 bg-mint border-ink text-ink' : 'scale-125 bg-blue border-ink text-paper';
                } else if (isPast) {
                  dotClass = `${dotColor} bg-paper/90 text-ink`;
                } else {
                  dotClass = `${dotColor} bg-transparent text-paper/50`;
                }
                return (
                  <div key={s.key} className="flex flex-1 flex-col items-center">
                    <div
                      className={`flex h-9 w-9 items-center justify-center rounded-full border-[2.5px] font-mono text-sm font-bold transition-all duration-300 ${dotClass}`}
                    >
                      {s.index}
                    </div>
                    <span
                      className={`mt-2 text-center text-[11px] font-bold transition-colors md:text-xs ${
                        isActive ? 'text-paper' : 'text-paper/40'
                      }`}
                    >
                      {s.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 当前阶段详情 + 产物累积 */}
          <div className="grid grid-cols-1 gap-5 md:grid-cols-[1.6fr_1fr]">
            <motion.div
                key={active}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="card-hard p-6"
              >
                <div className="mb-3 flex flex-wrap items-center gap-2">
                  <span className={`rounded-full border-[2px] border-ink px-2.5 py-0.5 font-mono text-xs font-bold ${isCreative ? 'bg-mint text-ink' : 'bg-blue text-paper'}`}>
                    {isCreative ? '创作泳道 · 人与 AI' : '生产泳道 · 插件在跑'}
                  </span>
                  <span className="rounded-full border-[2px] border-ink bg-paper-2 px-2.5 py-0.5 font-mono text-xs">
                    key: {stage.key}
                  </span>
                  <span className="rounded-full border-[2px] border-ink bg-paper-2 px-2.5 py-0.5 font-mono text-xs">
                    step: {stage.stepId}
                  </span>
                </div>
                <h3 className="heading-xl mb-1 text-3xl text-ink">
                  <span className="text-ink-soft">{stage.index} · </span>
                  {stage.name}
                </h3>
                <p className="mb-2 text-base font-bold leading-snug text-ink">{stage.oneLiner}</p>
                <p className="mb-4 text-[13px] leading-relaxed text-ink/65">{stage.detail}</p>
                <div className="mb-3 flex flex-wrap items-center gap-2 font-mono text-xs">
                  <span className="rounded bg-paper-2 px-2 py-1 text-ink/70">{stage.input}</span>
                  <span className="text-mint">→</span>
                  <span className="rounded border-[1.5px] border-ink bg-yellow px-2 py-1 font-bold text-ink">{stage.output}</span>
                </div>
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="kicker mr-1 !text-ink-soft">谁接住这一步</span>
                  {STAGE_PROVIDERS[stage.index].map((s) => (
                    <span
                      key={s.name}
                      title={s.role}
                      className="inline-flex items-center gap-1 rounded border-[1.5px] border-ink/25 bg-paper py-0.5 pl-1.5 pr-2"
                    >
                      <span className={`h-2 w-2 shrink-0 rounded-full ${TAG_DOT[s.tag]}`} />
                      <code className="font-mono text-[11px] font-bold text-ink">{s.name}</code>
                    </span>
                  ))}
                </div>
              </motion.div>

            <div className="card-hard-sm flex flex-col bg-paper/95 p-5">
              <div className="kicker mb-3 !text-ink-soft">工件累积 · {active + 1}/{STAGES.length}</div>
              <div className="flex flex-col gap-1.5">
                {STAGES.map((s, i) => {
                  const collected = i <= active;
                  return (
                    <motion.div
                      key={s.key}
                      animate={{ opacity: collected ? 1 : 0.25, x: collected ? 0 : -4 }}
                      transition={{ duration: 0.3 }}
                      className="flex items-center gap-2"
                    >
                      <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold ${collected ? 'bg-mint text-ink' : 'bg-paper-2 text-ink/40'}`}>
                        {collected ? '✓' : s.index}
                      </span>
                      <span className={`font-mono text-xs ${collected ? 'text-ink' : 'text-ink/40'}`}>{s.artifact}</span>
                    </motion.div>
                  );
                })}
              </div>
              <p className="mt-auto pt-3 text-[11px] leading-relaxed text-ink/45">
                每个 ✓ 都是磁盘上一份真实文件——灯轨读的是它们，不是内存里的进度条。
              </p>
            </div>
          </div>

          <p className="mt-6 text-center font-mono text-[11px] text-paper/35">滚动推进流水线 · 黄色令牌 = 正在推进的一条内容</p>
        </div>
      </div>
    </section>
  );
}
