import { motion } from 'framer-motion';
import { Section } from '@/components/Section';
import { EmoCat } from '@/components/EmoCat';
import { BRAND } from '@/data/workflow';

const EXPRESSIONS = ['main', 'think', 'happy', 'grin', 'wow', 'love'] as const;

export function BrandFace() {
  return (
    <Section
      id="brand"
      index="09"
      bg="paper-2"
      kicker="frozen identity · 品牌住在卡里"
      title={
        <>
          无人设 ≠ 无识别，
          <br />
          靠<span className="mark-mint">冻结三件套</span>
        </>
      }
      intro={
        <>
          不出真人镜头，识别就交给三样必须冻结、跨内容一致的东西：视觉、声音、认知签名。
          它们如今全住在卡里——<b className="text-ink">config 里的品牌 token 锁视觉、requires 点名音色、频道定位段写人设</b>，
          所以「频道的脸」跟着卡走，可分享、可复刻——人设还能改成一道问题，让拿卡的人填自己的。
        </>
      }
    >
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        {/* 视觉 · 色板 */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="card-hard p-5 lg:col-span-2"
        >
          <div className="kicker mb-3 !text-ink-soft">① 视觉 · 卡 brand.tokens · 孟菲斯撞色 5 色板</div>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {BRAND.colors.map((c) => (
              <div key={c.value} className="flex items-center gap-2 border-[1.5px] border-ink/20 p-2">
                <span className="h-9 w-9 shrink-0 rounded border-[2px] border-ink" style={{ background: c.value }} />
                <div className="min-w-0">
                  <div className="truncate font-display text-sm font-bold">{c.name}</div>
                  <div className="font-mono text-[10px] text-ink-soft">{c.value}</div>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-3 border-l-[4px] border-mint pl-3 text-sm font-bold leading-snug text-ink">{BRAND.signature}</p>
        </motion.div>

        {/* emo IP 表情 */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="card-hard flex flex-col bg-paper-2 p-5"
        >
          <div className="kicker mb-3 !text-ink-soft">手绘 emo · 一张脸贯穿全频道</div>
          <div className="grid flex-1 grid-cols-3 place-items-center gap-1">
            {EXPRESSIONS.map((e) => (
              <EmoCat key={e} expr={e} className="w-16" />
            ))}
          </div>
        </motion.div>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
        {/* 声音 */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="card-hard flex items-center gap-4 p-5"
        >
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-[2.5px] border-ink bg-blue text-2xl text-paper">
            ♪
          </span>
          <div>
            <div className="kicker mb-1 !text-ink-soft">② 声音 · 卡点名的 TTS 能力</div>
            <p className="text-[15px] font-bold leading-snug text-ink">{BRAND.voice}</p>
          </div>
        </motion.div>

        {/* 认知签名 */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="relative overflow-hidden border-[2.5px] border-ink bg-yellow p-5 shadow-[6px_6px_0_#1A1A1A]"
        >
          <div className="kicker mb-1 !text-ink/70">③ 认知签名 · 卡 profile.persona · {BRAND.persona}</div>
          <p className="font-display text-lg font-black leading-tight text-ink">「{BRAND.stance}」</p>
        </motion.div>
      </div>
    </Section>
  );
}
