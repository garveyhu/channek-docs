import { motion } from 'framer-motion';
import { Section } from '@/components/Section';
import { EmoCat } from '@/components/EmoCat';
import { REPLICATE, type BrandColor } from '@/data/workflow';

const CHIP: Record<BrandColor, string> = {
  yellow: 'bg-yellow text-ink',
  blue: 'bg-blue text-paper',
  mint: 'bg-mint text-ink',
  red: 'bg-red text-paper',
  ink: 'bg-ink text-paper',
};

export function Replicate() {
  return (
    <Section
      id="replicate"
      index="11"
      bg="graph"
      kicker="the exit · 这页讲的一切都能带走"
      title={
        <>
          这套流程，
          <br />
          可以被<span className="mark-yellow">复刻</span>
        </>
      }
      intro={
        <>
          前面拆的九步、工件、灯轨、品牌脸——没有一样焊死在这台电脑上：流程与风格在卡里，
          能力在插件里。于是「复制一个频道的做法」第一次成了一个<b className="text-ink">动作</b>，
          而不是一篇教程。
        </>
      }
    >
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {REPLICATE.map((r, i) => (
          <motion.div
            key={r.n}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="card-hard flex flex-col p-6"
          >
            <span className={`mb-3 flex h-10 w-10 items-center justify-center rounded-full border-[2.5px] border-ink font-display text-lg font-black ${CHIP[r.accent]}`}>
              {r.n}
            </span>
            <h3 className="heading-xl mb-2 text-2xl text-ink">{r.title}</h3>
            <p className="text-[14px] leading-relaxed text-ink/75">{r.desc}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mt-10 flex flex-col items-center gap-5 border-[2.5px] border-ink bg-ink p-8 text-center shadow-[8px_8px_0_#FFD12E] md:flex-row md:text-left"
      >
        <EmoCat expr="wink" className="w-24 shrink-0" />
        <div className="flex-1">
          <p className="font-display text-xl font-black leading-relaxed text-paper md:text-2xl">
            想做一张自己的卡，或给 Channek 写一个插件？
          </p>
          <p className="mt-1 text-sm text-paper/60">
            风格卡格式、插件扩展点、打包分发——开发者文档里全都有。
          </p>
        </div>
        <a
          href="/"
          className="shrink-0 border-[2.5px] border-paper bg-paper px-6 py-3 font-display text-base font-bold text-ink shadow-[5px_5px_0_#16C79A] transition-transform hover:-translate-y-0.5"
        >
          ▸ 去 Channek 文档
        </a>
      </motion.div>
    </Section>
  );
}
