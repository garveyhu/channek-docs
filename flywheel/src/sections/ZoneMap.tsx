import { motion } from 'framer-motion';
import { Section } from '@/components/Section';
import { ZONES, type BrandColor } from '@/data/workflow';

const ACCENT: Record<BrandColor, { bg: string; chip: string }> = {
  yellow: { bg: 'bg-yellow', chip: 'bg-yellow' },
  blue: { bg: 'bg-blue', chip: 'bg-blue text-paper' },
  red: { bg: 'bg-red', chip: 'bg-red text-paper' },
  mint: { bg: 'bg-mint', chip: 'bg-mint text-paper' },
  ink: { bg: 'bg-ink', chip: 'bg-ink text-paper' },
};

export function ZoneMap() {
  return (
    <Section
      id="zones"
      index="02"
      bg="graph"
      kicker="one folder · 频道文件夹摊开看"
      title={
        <>
          整个频道，就是
          <br />
          <span className="mark-yellow">一个文件夹</span>
        </>
      }
      intro={
        <>
          Channek 唯一的外部依赖就是它。打开这个文件夹：一张<b className="text-ink">可分发的卡</b>
          管「怎么做」，四个<b className="text-ink">私有创作区</b>装「做出来的一切」——辅助区在哪、
          内容目录叫什么，都是卡的 layout 声明的，不是软件写死的。
        </>
      }
    >
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {ZONES.map((zone, i) => {
          const a = ACCENT[zone.accent];
          return (
            <motion.div
              key={zone.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className={`card-hard flex flex-col p-5 ${zone.id === '台' ? 'md:col-span-2' : ''}`}
            >
              <div className="mb-3 flex items-center gap-3">
                <span className={`flex h-10 w-10 items-center justify-center rounded-full border-[2.5px] border-ink font-display text-lg font-black ${a.chip}`}>
                  {zone.id}
                </span>
                <div>
                  <div className="font-display text-xl font-black leading-none">{zone.name}</div>
                  <div className="kicker mt-1 !text-ink-soft">{zone.role}</div>
                </div>
              </div>
              <p className="mb-4 text-[15px] leading-relaxed text-ink/75">{zone.desc}</p>
              <div className="mt-auto flex flex-wrap gap-1.5">
                {zone.examples.map((ex) => (
                  <span key={ex} className="border-[1.5px] border-ink/40 bg-paper-2 px-2 py-0.5 font-mono text-xs text-ink/70">
                    {ex}
                  </span>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mt-8 flex items-start gap-4 border-l-[5px] border-mint bg-paper-2 p-5"
      >
        <span className="font-display text-3xl font-black text-mint">＂</span>
        <p className="text-lg font-bold leading-relaxed text-ink">
          归区判据一句话：能随卡<span className="mark-yellow">分发给别人复用</span>的（流程 / 品牌 / 画风 / 组件）进风格卡；
          你<span className="mark-mint">私有的认知与产出</span>（情报 / 选题 / 成片 / 复盘）留在内容区。
          文件夹里还有个隐身的 <code className="rounded bg-ink px-1.5 py-0.5 font-mono text-sm text-mint">.channek/</code>
          ——app 的工作区标记，目录自己证明自己是个频道。
        </p>
      </motion.div>
    </Section>
  );
}
