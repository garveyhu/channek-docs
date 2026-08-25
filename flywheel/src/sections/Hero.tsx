import { motion } from 'framer-motion';
import { EmoCat } from '@/components/EmoCat';

const fade = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
});

export function Hero() {
  return (
    <header id="top" className="relative flex min-h-screen items-center overflow-hidden bg-yellow">
      <div className="bg-dotgrid absolute inset-0 opacity-[0.35]" />
      {/* 孟菲斯几何点缀 */}
      <div className="absolute -left-10 top-24 h-40 w-40 rotate-12 border-[3px] border-ink bg-blue/90 shadow-[8px_8px_0_#1A1A1A]" />
      <div className="absolute bottom-16 left-1/3 h-16 w-16 rounded-full border-[3px] border-ink bg-red" />
      <div className="absolute right-12 top-1/4 h-24 w-24 rotate-45 border-[3px] border-ink bg-mint" />

      {/* 回文档站 —— 低调融入，不抢戏 */}
      <motion.a
        {...fade(0.4)}
        href="/"
        className="absolute left-5 top-5 z-10 inline-flex items-center gap-1.5 border-[2px] border-ink bg-paper px-3 py-1.5 font-mono text-xs font-bold text-ink shadow-[3px_3px_0_#1A1A1A] transition-transform hover:-translate-y-0.5"
      >
        ← Channek 文档
      </motion.a>

      <div className="relative mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-8 px-6 md:grid-cols-[1.4fr_1fr]">
        <div>
          <motion.div {...fade(0)} className="mb-6 inline-flex items-center gap-2 border-[2.5px] border-ink bg-paper px-3 py-1.5 shadow-[3px_3px_0_#1A1A1A]">
            <span className="h-2.5 w-2.5 rounded-full bg-mint" />
            <span className="kicker !text-ink">飞轮的内部 · Channek 架构拆解</span>
          </motion.div>

          <motion.h1 {...fade(0.08)} className="heading-xl text-ink">
            <span className="block text-5xl md:text-7xl">一句灵感</span>
            <span className="my-2 flex items-center gap-4">
              <svg width="120" height="40" viewBox="0 0 120 40" className="shrink-0">
                <line x1="2" y1="20" x2="100" y2="20" stroke="#1A1A1A" strokeWidth="5" />
                <path d="M96 8 L118 20 L96 32 Z" fill="#1A1A1A" />
              </svg>
            </span>
            <span className="block text-5xl md:text-7xl">
              一条<span className="mark-mint">成片</span>
            </span>
          </motion.h1>

          <motion.p {...fade(0.16)} className="mt-8 max-w-xl text-lg leading-relaxed text-ink/80 md:text-xl">
            「飞轮日记」这个频道，如今整个住在 Channek 里——一个打开<strong>本地文件夹</strong>的创作管理
            App。这个站把它拆开摊给你看：频道怎么被<strong>一张卡</strong>描述、九步怎么被
            <strong>插件</strong>接住、进度为什么<strong>诚实</strong>。
          </motion.p>

          <motion.div {...fade(0.24)} className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#pipeline"
              className="border-[2.5px] border-ink bg-ink px-6 py-3 font-display text-base font-bold text-paper shadow-[5px_5px_0_#16C79A] transition-transform hover:-translate-y-0.5"
            >
              ▸ 看九步怎么跑
            </a>
            <span className="font-mono text-sm text-ink/60">1 个文件夹 · 1 张卡 · 9 步 · N 个插件</span>
          </motion.div>
        </div>

        <motion.div {...fade(0.2)} className="relative flex justify-center">
          <EmoCat expr="grin" float className="w-64 drop-shadow-[6px_8px_0_rgba(26,26,26,0.18)] md:w-80" />
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap border-[2.5px] border-ink bg-paper px-4 py-1.5 font-display text-sm font-bold shadow-[3px_3px_0_#1A1A1A]">
            emo · 频道的脸
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center"
      >
        <div className="kicker !text-ink/70">向下滚动</div>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.6, repeat: Infinity }} className="mt-1 text-2xl text-ink">
          ↓
        </motion.div>
      </motion.div>
    </header>
  );
}
