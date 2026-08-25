import { motion } from 'framer-motion';
import { Section } from '@/components/Section';
import { ARTIFACT_CHAIN, SKELETONS, type CraftKind } from '@/data/workflow';

const KIND: Record<CraftKind, { label: string; cls: string }> = {
  创作: { label: '✍ 创作', cls: 'bg-mint text-ink' },
  生成: { label: '⚙ 生成', cls: 'bg-blue text-paper' },
  半: { label: '半', cls: 'bg-yellow text-ink' },
};

export function ArtifactChain() {
  return (
    <Section
      id="artifacts"
      index="07"
      bg="paper-2"
      kicker="the artifact chain · 步骤间的唯一接口"
      title={
        <>
          步骤互不相识，
          <br />
          一切经<span className="mark-yellow">工件</span>衔接
        </>
      }
      intro={
        <>
          九步之间不直接对话：上一步把工件落盘，下一步从磁盘读走。每种工件是一个
          <b className="text-ink">语义 kind</b>——内核只认 kind id，
          <b className="text-ink">文件叫什么、放哪由卡回答</b>。左边是 kind，右边是这张卡把它落在哪。
          <span className="mark-mint">✍ 创作</span>= 人 / AI 写；
          <span className="mark-yellow">半</span>= 人定夺、机器成形；
          <span className="rounded bg-blue px-1.5 py-0.5 text-paper">⚙ 生成</span>= 确定性产出。
        </>
      }
    >
      {/* 工件链列表 */}
      <div className="mb-12 flex flex-col gap-2">
        {ARTIFACT_CHAIN.map((a, i) => {
          const k = KIND[a.kind];
          return (
            <motion.div
              key={`${a.step}-${a.kindId}`}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.35, delay: Math.min(i, 6) * 0.04 }}
              className="card-hard-sm flex flex-col gap-2 p-4 lg:flex-row lg:items-center"
            >
              <div className="flex shrink-0 items-center gap-3 lg:w-72">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-[2.5px] border-ink bg-paper font-mono text-sm font-bold">
                  {a.step}
                </span>
                <div className="min-w-0">
                  <div className="font-display text-base font-black leading-tight">{a.name}</div>
                  <code className="font-mono text-[11px] text-blue">{a.kindId}</code>
                </div>
              </div>
              <div className="flex shrink-0 flex-wrap items-center gap-2">
                <span className="rounded border-[1.5px] border-ink/30 bg-yellow/40 px-2 py-0.5 font-mono text-[11px] text-ink">
                  {a.cardPath}
                </span>
                <span className="rounded border-[1.5px] border-ink/30 bg-paper-2 px-2 py-0.5 font-mono text-[11px] text-ink/75">
                  {a.format}
                </span>
                <span className={`rounded-full px-2 py-0.5 font-mono text-[10px] font-bold ${k.cls}`}>{k.label}</span>
              </div>
              <p className="text-[13px] leading-snug text-ink/65 lg:ml-auto lg:max-w-sm lg:text-right">{a.role}</p>
            </motion.div>
          );
        })}
      </div>

      {/* 解耦说明 */}
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-12 flex items-start gap-4 border-[2.5px] border-ink bg-ink p-5 shadow-[6px_6px_0_#16C79A]"
      >
        <span className="font-mono text-2xl text-mint">⌥</span>
        <p className="text-[15px] leading-relaxed text-paper/85">
          <strong className="text-paper">工件即接口</strong>：每一步只对工件契约编程——声明自己消费哪些
          kind、产出哪些 kind。换掉任何一步的实现，别的步不知情；换一张目录结构完全不同的卡，
          流程照跑，因为<strong className="text-paper">没有一行代码写死过文件名</strong>。
        </p>
      </motion.div>

      {/* 格式骨架 spotlight */}
      <div className="mb-3 flex items-center gap-3">
        <span className="kicker !text-ink-soft">格式骨架 · 抽象占位（脱敏·非真实内容）</span>
        <span className="h-px flex-1 bg-ink/15" />
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {SKELETONS.map((s, i) => (
          <motion.div
            key={s.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.45, delay: (i % 2) * 0.08 }}
            className="overflow-hidden border-[2.5px] border-ink bg-ink shadow-[5px_5px_0_#1A1A1A]"
          >
            <div className="flex items-center justify-between border-b-[2.5px] border-paper/15 px-4 py-2">
              <span className="font-display text-sm font-black text-paper">{s.name}</span>
              <span className="font-mono text-[10px] text-mint">{s.format}</span>
            </div>
            <pre className="overflow-x-auto px-4 py-3 font-mono text-[11.5px] leading-relaxed text-paper/85">
              <code>{s.code}</code>
            </pre>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
