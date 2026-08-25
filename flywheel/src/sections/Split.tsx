import { motion } from 'framer-motion';
import { Section } from '@/components/Section';
import { SPLIT } from '@/data/workflow';

const COLUMNS = [
  { ...SPLIT.creative, color: 'mint', tag: '需要判断' },
  { ...SPLIT.mechanical, color: 'blue', tag: '确定性执行' },
] as const;

export function Split() {
  return (
    <Section
      id="split"
      index="05"
      bg="paper-2"
      kicker="two lanes · 人判断 · 插件执行"
      title={
        <>
          前 3 步在<span className="mark-mint">商量</span>，
          <br />
          后 6 步在<span className="mark-yellow">执行</span>
        </>
      }
      intro={<>每一步的泳道是步定义自带的属性：创作步等人，生产步自动跑。这是整条灯轨最聪明的工程切法。</>}
    >
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {COLUMNS.map((col, i) => (
          <motion.div
            key={col.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className={`card-hard relative overflow-hidden p-6 ${i === 0 ? 'bg-mint/10' : 'bg-blue/5'}`}
          >
            <div className={`absolute right-0 top-0 px-3 py-1 font-mono text-xs font-bold text-paper ${i === 0 ? 'bg-mint' : 'bg-blue'}`}>
              {col.tag}
            </div>
            <div className="mb-1 font-mono text-3xl font-bold tracking-widest text-ink">{col.stages}</div>
            <h3 className="heading-xl mb-4 text-2xl text-ink">{col.title}</h3>
            <div className="mb-4 inline-flex items-center gap-2 border-[2px] border-ink bg-paper px-3 py-1.5 text-sm font-bold">
              <span className={`h-2.5 w-2.5 rounded-full ${i === 0 ? 'bg-mint' : 'bg-blue'}`} />
              {col.who}
            </div>
            <p className="mb-4 text-[15px] leading-relaxed text-ink/80">{col.why}</p>
            <p className="border-l-[4px] border-ink/30 pl-3 text-sm italic leading-relaxed text-ink-soft">{col.note}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mt-8 border-[2.5px] border-ink bg-ink p-6 text-center shadow-[6px_6px_0_#FF4D4D]"
      >
        <p className="font-display text-xl font-black leading-relaxed text-paper md:text-2xl">
          你真正在做创意决策的，只有<span className="mark-mint">前半段</span>。
          <br className="hidden md:block" />
          后半段不是你在剪 —— 是<span className="mark-yellow">卡声明的流程</span>驱着插件在跑。
        </p>
      </motion.div>
    </Section>
  );
}
