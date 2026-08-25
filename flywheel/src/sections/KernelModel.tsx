import { motion } from 'framer-motion';
import { Section } from '@/components/Section';

/** 内核三层（纵轴·创作域无关·不动的壳子） */
const LAYERS = [
  {
    n: '①',
    name: '格式层',
    path: '.channek',
    verb: '记',
    role: '时间轴的纯数据账本：唯一真相源 · 有理时间 · 一切修改走可撤销事务',
    form: '纯数据 schema',
    feed: '卡喂目录与工件',
    accent: 'yellow' as const,
  },
  {
    n: '②',
    name: '引擎层',
    path: 'engine',
    verb: '出',
    role: '播放 / 合成 / 导出——预览与导出同一套合成，同工程同帧 = 同像素',
    form: '确定性引擎',
    feed: '卡喂品牌与预设',
    accent: 'blue' as const,
  },
  {
    n: '③',
    name: '宿主层',
    path: 'plugin host',
    verb: '接',
    role: '插件宿主 + 几十个扩展点：界面区 / 步骤 / 生成能力 / 发布平台，全从这里挂上来',
    form: '扩展点注册表',
    feed: '卡点名要哪些手',
    accent: 'mint' as const,
    socket: true,
  },
];

const FEED_BG: Record<string, string> = {
  yellow: 'bg-yellow text-ink',
  mint: 'bg-mint text-paper',
  blue: 'bg-blue text-paper',
};

export function KernelModel() {
  return (
    <Section
      id="kernel"
      index="01"
      bg="paper-2"
      kicker="shell and card · 壳子的骨架"
      title={
        <>
          一个<span className="mark-mint">薄壳子</span>，
          <br />
          插一张<span className="mark-yellow">可换的卡</span>
        </>
      }
      intro={
        <>
          Channek 就两根轴：<b className="text-ink">纵轴</b>是创作域无关的内核（三层·守规矩、不长业务），
          <b className="text-ink">横轴</b>是一张可换的风格卡（纯数据·横着喂三层）。看懂这张图，就看懂了原理。
        </>
      }
    >
      {/* ============ 纵轴：内核三层 ============ */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.5 }}
        className="card-hard p-5 md:p-7"
      >
        <div className="mb-4 flex items-center gap-3">
          <span className="rounded-full bg-ink px-3 py-1 font-mono text-xs font-bold text-paper">
            纵轴
          </span>
          <span className="font-display text-lg font-black md:text-xl">
            内核 · 创作域无关 · 装什么频道都一样
          </span>
        </div>

        <div className="flex flex-col gap-3">
          {LAYERS.map((l, i) => (
            <motion.div
              key={l.name}
              initial={{ opacity: 0, x: -18 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.1 + i * 0.1 }}
              className="relative grid grid-cols-[auto_1fr_auto] items-center gap-4 border-[2.5px] border-ink bg-paper p-4"
            >
              {/* 层号 + 动词 */}
              <div className="flex flex-col items-center">
                <span className="font-display text-3xl font-black leading-none">{l.n}</span>
                <span
                  className={`mt-1 flex h-7 w-7 items-center justify-center rounded-full border-[2px] border-ink font-display text-sm font-black ${FEED_BG[l.accent]}`}
                >
                  {l.verb}
                </span>
              </div>
              {/* 名称 + 职责 */}
              <div>
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <span className="font-display text-xl font-black md:text-2xl">{l.name}</span>
                  <code className="bg-paper-2 px-1.5 py-0.5 font-mono text-xs text-ink/70">{l.path}</code>
                </div>
                <p className="mt-1 text-[14px] leading-snug text-ink/75">{l.role}</p>
              </div>
              {/* 形态 + 插槽 */}
              <div className="flex flex-col items-end gap-1.5">
                <span className="kicker !text-ink-soft">{l.form}</span>
                {l.socket && (
                  <span className="flex items-center gap-1 border-[2px] border-dashed border-ink bg-red/10 px-2 py-0.5 font-mono text-[11px] font-bold text-red">
                    ⟜ 扩展点
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* ============ 喂养箭头（横轴喂纵轴） ============ */}
        <div className="mt-5 grid grid-cols-3 gap-3">
          {LAYERS.map((l) => (
            <div key={l.feed} className="flex flex-col items-center gap-1">
              <span className="font-mono text-lg leading-none text-ink/50">▲</span>
              <span className={`rounded-full px-2.5 py-1 text-center font-mono text-[11px] font-bold ${FEED_BG[l.accent]}`}>
                {l.feed}
              </span>
            </div>
          ))}
        </div>

        {/* ============ 横轴：频道（可换的卡） ============ */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-3 border-[2.5px] border-ink bg-ink p-5 text-paper"
        >
          <div className="mb-3 flex items-center gap-3">
            <span className="rounded-full bg-mint px-3 py-1 font-mono text-xs font-bold text-paper">横轴</span>
            <span className="font-display text-lg font-black md:text-xl">
              频道 = 工作区文件夹 × 一张<span className="mark-yellow">纯数据</span>的卡
            </span>
          </div>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <div className="border-[2px] border-paper/30 bg-paper/5 p-4">
              <div className="kicker !text-mint">风格卡 · 可分发 · 恒为纯数据</div>
              <p className="mt-1.5 text-[14px] leading-relaxed text-paper/85">
                <code className="font-mono text-yellow">card.json</code>
                声明四件事：<b className="text-paper">流程</b>（九步的步序）、<b className="text-paper">结构</b>
                （目录与工件落点）、<b className="text-paper">风格</b>（品牌 / 音色 / 封面锁）、
                <b className="text-paper">依赖</b>（要哪些插件与能力）。
                <b className="text-paper"> 换一张卡 = 换一套工作方式，壳子不动。</b>
              </p>
              <div className="mt-3 flex items-center gap-2 border-l-[3px] border-red pl-3">
                <code className="font-mono text-[12px] text-red">卡内无代码</code>
                <span className="text-[12px] text-paper/70">导入一张卡 ≠ 执行谁的代码——代码走插件的信任门</span>
              </div>
            </div>
            <div className="border-[2px] border-paper/30 bg-paper/5 p-4">
              <div className="kicker" style={{ color: '#9DB4FF' }}>插件 · 被卡点名的手</div>
              <p className="mt-1.5 text-[14px] leading-relaxed text-paper/85">
                界面区、步骤实现、生图配音、发布平台——全是插件在扩展点上挂的贡献。
                卡只写「我要 <code className="font-mono text-mint">channek.tts</code>」，谁来干由装了什么决定。
              </p>
              <div className="mt-3 flex items-center gap-2 border-l-[3px] border-mint pl-3">
                <code className="font-mono text-[12px] text-mint">第一方无特权</code>
                <span className="text-[12px] text-paper/70">官方插件与第三方走同一条校验 / 启停路径</span>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* ============ 记忆锚 ============ */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mt-8 flex items-start gap-4 border-l-[5px] border-mint bg-paper p-5 card-hard-sm"
      >
        <span className="font-display text-3xl font-black text-mint">＂</span>
        <p className="text-lg font-bold leading-relaxed text-ink">
          内核是不动的<span className="mark-yellow">壳子</span>（记 / 出 / 接）；卡是纯数据的
          <span className="mark-yellow">描述符</span>；插件是被卡点名、从扩展点插进壳子的
          <span className="mark-mint">手</span>——卸光插件，Channek 就只是个带 AI 的资源管理器。
        </p>
      </motion.div>
    </Section>
  );
}
