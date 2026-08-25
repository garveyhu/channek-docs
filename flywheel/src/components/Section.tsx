import { type ReactNode } from 'react';
import { motion } from 'framer-motion';

type Bg = 'paper' | 'paper-2' | 'graph';

interface SectionProps {
  id: string;
  index: string;
  kicker: string;
  title: ReactNode;
  intro?: ReactNode;
  children: ReactNode;
  bg?: Bg;
}

const BG_CLASS: Record<Bg, string> = {
  paper: 'bg-paper',
  'paper-2': 'bg-paper-2',
  graph: 'bg-paper bg-graph',
};

/** 章节外壳：全宽背景层 + 居中内容 + 统一序号/kicker/超粗标题 + 进场揭示 */
export function Section({ id, index, kicker, title, intro, children, bg = 'paper' }: SectionProps) {
  return (
    <section id={id} className={`relative w-full ${BG_CLASS[bg]}`}>
      <div className="mx-auto w-full max-w-6xl px-6 py-24 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="mb-3 flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-full border-[2.5px] border-ink bg-ink font-mono text-sm font-bold text-mint">
              {index}
            </span>
            <span className="kicker">{kicker}</span>
          </div>
          <h2 className="heading-xl mb-6 text-4xl text-ink md:text-6xl">{title}</h2>
          {intro && <div className="mb-12 max-w-2xl text-lg leading-relaxed text-ink-soft md:text-xl">{intro}</div>}
        </motion.div>
        {children}
      </div>
    </section>
  );
}
