import { motion } from 'framer-motion';
import { Section } from '@/components/Section';
import { Flywheel } from '@/components/Flywheel';
import { FLYWHEEL } from '@/data/workflow';

export function FlywheelSection() {
  return (
    <Section
      id="flywheel"
      index="10"
      kicker="the loop · 越转越省力"
      title={
        <>
          它叫飞轮，
          <br />
          因为它<span className="mark-mint">转回来</span>
        </>
      }
      intro={<>九步出片只是「转一圈」。真正让它成为飞轮的，是复盘数据反哺选题，外加一张永不变的脸。</>}
    >
      <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1fr_1.1fr]">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="flex justify-center"
        >
          <Flywheel size={400} spin />
        </motion.div>

        <div>
          <div className="mb-6 flex flex-col gap-2.5">
            {FLYWHEEL.map((step, i) => (
              <motion.div
                key={step.label}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="flex items-center gap-3"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-[2.5px] border-ink bg-paper font-mono text-xs font-bold">
                  {i + 1}
                </span>
                <span className="w-16 shrink-0 font-display text-lg font-black">{step.label}</span>
                <span className="text-sm text-ink-soft">{step.sub}</span>
                {i === FLYWHEEL.length - 1 && (
                  <span className="ml-auto whitespace-nowrap rounded-full bg-mint px-2 py-0.5 font-mono text-[10px] font-bold text-ink">
                    → 回 ①
                  </span>
                )}
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="border-[2.5px] border-ink bg-paper-2 p-5"
          >
            <div className="kicker mb-2 !text-ink-soft">反哺机制 · 为什么越转越省力</div>
            <p className="text-[15px] leading-relaxed text-ink/80">
              发布后的数据抄回运营复盘区 → 提炼信号喂回选题库：
              <span className="mark-mint">赢家升权 / 复刻</span>，
              <span className="mark-yellow">翻车降权</span>。
              每转一圈，选题的命中率就更高一点 —— 这就是飞轮，不是循环。
              而这一切都是文件夹里的文件，换台电脑、换个 AI，账都还在。
            </p>
          </motion.div>
        </div>
      </div>
    </Section>
  );
}
