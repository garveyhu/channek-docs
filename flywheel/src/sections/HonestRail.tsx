import { motion } from 'framer-motion';
import { Section } from '@/components/Section';
import { RAIL_LIGHTS, type BrandColor } from '@/data/workflow';

const LIGHT: Record<BrandColor, { dot: string; ring: string }> = {
  ink: { dot: 'bg-ink/20', ring: 'border-ink/30' },
  mint: { dot: 'bg-mint', ring: 'border-mint' },
  yellow: { dot: 'bg-yellow', ring: 'border-yellow' },
  blue: { dot: 'bg-blue', ring: 'border-blue' },
  red: { dot: 'bg-red', ring: 'border-red' },
};

export function HonestRail() {
  return (
    <Section
      id="rail"
      index="08"
      kicker="the honest rail · 进度不许说谎"
      title={
        <>
          灯轨为什么
          <br />
          <span className="mark-mint">诚实</span>
        </>
      }
      intro={
        <>
          大多数软件的进度是<b className="text-ink">记在内存里的标志位</b>——点过按钮就算完成。
          Channek 反过来：进度是<b className="text-ink">从磁盘工件推导出来的结论</b>，每次打开都重新推。
        </>
      }
    >
      {/* 旧 vs 新 对比 */}
      <div className="mb-12 grid grid-cols-1 gap-5 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="card-hard-sm relative p-5 opacity-80"
        >
          <div className="kicker mb-2 !text-red">✕ 内存里的进度条</div>
          <p className="text-[15px] leading-relaxed text-ink/70">
            「已完成」是个布尔值：跑完函数就置 true，<strong className="text-red">重启就丢、崩溃就骗</strong>。
            文件早被你手动删了，界面还亮着绿灯——它汇报的是软件的记忆，不是世界的现状。
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="card-hard relative p-5 shadow-[6px_6px_0_#16C79A]"
        >
          <div className="kicker mb-2 !text-mint">✓ 诚实灯轨</div>
          <p className="text-[15px] leading-relaxed text-ink/80">
            每步的灯色只从两件事推导：声明的工件<strong className="text-mint">在不在磁盘上</strong>、
            比它的上游<strong className="text-mint">新不新</strong>。
            不信任何内存标志——你在 app 外面改了文件，灯轨照样如实变色。
          </p>
        </motion.div>
      </div>

      {/* 三种灯色 */}
      <div className="mb-4 flex items-center gap-3">
        <span className="kicker !text-ink-soft">三种灯色</span>
        <span className="h-px flex-1 bg-ink/15" />
        <span className="font-mono text-xs text-ink-soft">存在性 × 新鲜度链</span>
      </div>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        {RAIL_LIGHTS.map((l, i) => {
          const c = LIGHT[l.accent];
          return (
            <motion.div
              key={l.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="card-hard-sm flex flex-col gap-3 p-5"
            >
              <div className="flex items-center gap-3">
                <span className={`flex h-9 w-9 items-center justify-center rounded-full border-[2.5px] ${c.ring} bg-paper`}>
                  <motion.span
                    className={`h-4 w-4 rounded-full ${c.dot}`}
                    animate={l.id === 'lit' ? { opacity: [1, 0.55, 1] } : {}}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </span>
                <span className="font-display text-lg font-black">{l.label}</span>
              </div>
              <p className="text-[13.5px] leading-relaxed text-ink/70">{l.desc}</p>
            </motion.div>
          );
        })}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mt-8 text-center text-base font-bold text-ink-soft"
      >
        换台电脑打开同一个文件夹，灯轨<span className="mark-mint">一模一样</span>——
        因为它只读磁盘。<span className="mark-yellow">文件夹在哪，真相就在哪。</span>
      </motion.p>
    </Section>
  );
}
