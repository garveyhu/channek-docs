import { motion } from 'framer-motion';
import { Section } from '@/components/Section';
import { PLUGIN_ATLAS, ATLAS_TOTAL, ATLAS_SURFACE, type BrandColor } from '@/data/workflow';

const HEAD: Record<BrandColor, string> = {
  yellow: 'bg-yellow text-ink',
  blue: 'bg-blue text-paper',
  red: 'bg-red text-paper',
  mint: 'bg-mint text-ink',
  ink: 'bg-ink text-paper',
};

const capabilityCount = ATLAS_TOTAL - ATLAS_SURFACE;

export function PluginAtlas() {
  return (
    <Section
      id="atlas"
      index="04"
      bg="paper-2"
      kicker="the contribution map · 能力从哪来"
      title={
        <>
          内核零创作能力，
          <br />
          <span className="mark-yellow">{ATLAS_TOTAL} 个插件</span>撑起这个频道
        </>
      }
      intro={
        <>
          主页、详情页、剪辑台、九步、生图、配音、发布……在 Channek 里全不是内核硬编码，
          是插件挂在<b className="text-ink">扩展点</b>上的贡献。这是飞轮日记的卡实际点名 / 装上的全貌——
          卸光它们，Channek 就退回一个带 AI 的资源管理器。
        </>
      }
    >
      {/* 统计条 */}
      <div className="mb-8 flex flex-wrap gap-3">
        <div className="card-hard flex items-baseline gap-2 px-5 py-3">
          <span className="heading-xl text-4xl text-ink">{ATLAS_TOTAL}</span>
          <span className="text-sm font-bold text-ink-soft">个插件服务这一个频道</span>
        </div>
        <div className="card-hard-sm flex items-center gap-2 px-4 py-3">
          <span className="h-3 w-3 rounded-full bg-mint" />
          <span className="text-sm">
            <strong>{ATLAS_SURFACE}</strong> 个贡献界面与流程
            <span className="ml-1 font-mono text-[11px] text-ink-soft">区 / 页面 / 步骤</span>
          </span>
        </div>
        <div className="card-hard-sm flex items-center gap-2 px-4 py-3">
          <span className="h-3 w-3 rounded-full border-[2px] border-blue bg-paper" />
          <span className="text-sm">
            <strong>{capabilityCount}</strong> 个贡献能力
            <span className="ml-1 font-mono text-[11px] text-ink-soft">生成 / 媒体 / 发布</span>
          </span>
        </div>
      </div>

      {/* 分层地图 */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {PLUGIN_ATLAS.map((layer, i) => (
          <motion.div
            key={layer.layer}
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.45, delay: (i % 2) * 0.06 }}
            className={`card-hard flex flex-col overflow-hidden p-0 ${layer.plugins.length > 3 ? 'md:col-span-2' : ''}`}
          >
            <div className={`flex items-center justify-between px-4 py-2 ${HEAD[layer.accent]}`}>
              <span className="font-display text-lg font-black">{layer.layer}</span>
              <span className="font-mono text-[11px] opacity-80">{layer.note}</span>
            </div>
            <div
              className={`grid gap-x-4 gap-y-1.5 p-4 ${
                layer.plugins.length > 3 ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1'
              }`}
            >
              {layer.plugins.map((p) => (
                <div key={p.name} className="flex items-baseline gap-2">
                  <span
                    className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${
                      p.surface ? 'bg-mint' : 'border-[2px] border-blue bg-paper'
                    }`}
                  />
                  <code className="shrink-0 font-mono text-[13px] font-bold text-ink">{p.name}</code>
                  <span className="truncate text-xs text-ink/60">{p.role}</span>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mt-8 text-center text-sm text-ink-soft"
      >
        实心点 <span className="mx-1 inline-block h-2 w-2 translate-y-px rounded-full bg-mint" /> = 界面与流程贡献 ·
        空心点 <span className="mx-1 inline-block h-2 w-2 translate-y-px rounded-full border-[2px] border-blue bg-paper" /> =
        能力 provider。<strong className="text-ink">第一方无特权</strong>——这些插件走与任何第三方完全相同的安装 / 校验 / 启停路径。
      </motion.p>
    </Section>
  );
}
