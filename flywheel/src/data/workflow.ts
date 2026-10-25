/**
 * 工作流数据 —— 全站渲染的单一事实源。
 * 内容提炼自飞轮日记频道的频道卡（channel.json 的 pipeline / layout / requires 声明）
 * 与它点名的插件清单。改这里 = 改全站讲解；不在组件里散写文案。
 *
 * 脱敏铁律：只讲工件类型 + 格式，骨架用 <...> 抽象；
 * 不出现本机路径、真实内容 slug、真实内容细节。
 */

export type BrandColor = 'yellow' | 'blue' | 'red' | 'mint' | 'ink';

export interface Zone {
  id: string;
  name: string;
  role: string;
  desc: string;
  examples: string[];
  accent: BrandColor;
}

/** 频道文件夹摊开看：根目录一份频道卡 + sop/ 菜谱（可分享）+ work/ 下四个私有创作区（卡 layout 声明的内容目录与辅助区） */
export const ZONES: Zone[] = [
  {
    id: '卡',
    name: 'channel.json + sop/',
    role: '频道卡与菜谱 · 可分享',
    desc: '根目录一份纯数据的频道卡：人设、品牌 token、九步流程、目录结构、依赖清单；sop/ 里是菜谱——流程说明、skill、提示词、质检教训。分享时拷走的就是这一半，作品与人设留在你这儿。',
    examples: ['channel.json', 'AGENTS.md（宪章）', 'brand/', 'sop/'],
    accent: 'yellow',
  },
  {
    id: '情',
    name: '情报库',
    role: '上游弹药 · 私有',
    desc: '要消化才能变现的认知与情报（work/intel/）：雷达、深读、信息差、灵感。它们喂选题，但永不进卡包。',
    examples: ['前沿雷达', '深读笔记', '灵感库'],
    accent: 'blue',
  },
  {
    id: '选',
    name: '选题库',
    role: '立项台账 · 私有',
    desc: '被打磨成「值得做」的题在这里排队（work/inbox/）。复盘的信号也回写到这里——赢家升权、翻车降权。',
    examples: ['选题库索引', '评分', '排期'],
    accent: 'ink',
  },
  {
    id: '台',
    name: '内容工作台',
    role: '流水线工位 · 私有',
    desc: '每条内容一个目录（work/runs/<日期-slug>/）：选题卡、脚本、工程、素材、配音、字幕、母版、分发……九步的全部工件都落在这里，灯轨读的就是这些文件。',
    examples: ['选题卡.md', '脚本.md', '工程/', '母版/'],
    accent: 'mint',
  },
  {
    id: '复',
    name: '运营复盘',
    role: '数据闭环 · 私有',
    desc: '发布后的数据抄回来（work/review/），聚合成看板，反哺下一轮选题。飞轮能越转越省力，靠的是这一区回来的信号。',
    examples: ['台账', '看板', '复盘记录'],
    accent: 'red',
  },
];

export type Lane = 'creative' | 'production';

export interface Stage {
  index: number;
  /** 卡 pipeline.steps 里的实例 key —— 工件归属与灯轨锚点 */
  key: string;
  /** 步定义 id —— 由插件贡献、注册表解析 */
  stepId: string;
  name: string;
  lane: Lane;
  input: string;
  output: string;
  artifact: string;
  oneLiner: string;
  detail: string;
}

/** 九步流水线 —— 卡里 pipeline.template = channek.explainer-9 声明的步序。
 *  每步是「卡声明的 key ↔ 插件贡献的 step 实现」：卡只写数据，干活的是插件。 */
export const STAGES: Stage[] = [
  {
    index: 1,
    key: 'topic',
    stepId: 'channek.topic',
    name: '选题',
    lane: 'creative',
    input: '一句意图 / 情报库缺口',
    output: '选题卡（entry 工件）',
    artifact: '选题卡',
    oneLiner: '把「想做什么」打磨成一个值得做的题，立成这条内容的档案首页。',
    detail:
      '选题卡是每条内容的条目清单工件：标题、角度、钩子写在正文，状态机住在 frontmatter——这条内容走到哪一步、卡在哪，全频道只有这一个真相源。你可以自己写，也可以让 Yan 按卡里的 prompt 资产起草，人来定夺。',
  },
  {
    index: 2,
    key: 'script',
    stepId: 'channek.script',
    name: '脚本',
    lane: 'creative',
    input: '选题卡',
    output: '口播稿',
    artifact: '口播稿',
    oneLiner: '把选题写成一篇考究的口播稿——它同时是旁白与分镜的上游。',
    detail:
      '创作步的工作台由 links.production 插件贡献：左边写稿、右边吃频道的创作宪章（AGENTS.md 手写区）与卡里的 prompt 资产。稿子落成 markdown 工件，下游的分镜、配音、字幕全都从它长出来。',
  },
  {
    index: 3,
    key: 'storyboard',
    stepId: 'channek.storyboard',
    name: '分镜',
    lane: 'creative',
    input: '口播稿',
    output: '生产计划 + 场景数据',
    artifact: '生产计划',
    oneLiner: '把稿子拆成镜：每个概念配什么画面、用哪个场景组件，写成结构化数据。',
    detail:
      '分镜不是在时间线上摆素材，是写一份生产计划（JSON 工件）：逐镜的场景类型、时长意图、画面参数。频道自己打磨的 tsx 场景组件登记在组件注册表里，分镜按名点用——画面为这条片现写，不是套模板换文字。',
  },
  {
    index: 4,
    key: 'asset',
    stepId: 'channek.asset',
    name: '素材',
    lane: 'production',
    input: '生产计划里的素材需求',
    output: '素材库四分区',
    artifact: '素材',
    oneLiner: '按分镜的素材需求自动生图、收真材料，归进素材库。',
    detail:
      '素材库工件分四区：概念动画 / 真材料 / 生图 / 精灵。生图不写死在内核——卡在 requires 里点名 channek.image 能力，由 links.image-gen 插件的即梦 provider 接住；换一个生图后端 = 换一条 provider 声明，流程一个字不改。',
  },
  {
    index: 5,
    key: 'voice',
    stepId: 'channek.voice',
    name: '配音',
    lane: 'production',
    input: '口播稿（逐幕旁白）',
    output: '旁白轨 + 音乐音效',
    artifact: '旁白轨',
    oneLiner: '用频道冻结的音色逐幕合成旁白，再合出一条对齐好的旁白轨。',
    detail:
      '声音是三条能力拼出来的：channek.tts 旁白（links.voice-lab 的本地 voxcpm 音色）、channek.music / channek.sfx 音乐音效（links.sound-gen 本地生成）、合轨与响度（links.ffmpeg）。旁白清单与用音台账都是 JSON 工件——哪句用了哪段声音，账目落盘可查。',
  },
  {
    index: 6,
    key: 'caption',
    stepId: 'channek.caption',
    name: '字幕',
    lane: 'production',
    input: '旁白轨',
    output: '词级字幕 cue',
    artifact: '字幕轨',
    oneLiner: '从旁白轨做词级对齐，产出字幕 cue 数据，交给剪辑与导出。',
    detail:
      '语音识别对齐由 ASR 能力插件接住（links.asr），产出的是 cues.json 数据工件而非「烧死在画面里的字」——字幕样式跟着卡的 captions 段走，换样式不用重做对齐。',
  },
  {
    index: 7,
    key: 'edit',
    stepId: 'channek.edit',
    name: '剪辑',
    lane: 'production',
    input: '素材 + 旁白轨 + 字幕 cue',
    output: '.channek 工程 + 母版',
    artifact: '母版',
    oneLiner: '进多轨剪辑台装配成片——但一切改动只有一条可撤销的笔。',
    detail:
      '剪辑台界面由 links.editor-surface 插件贡献，tsx 场景由 links.remotion 离线烘焙成普通素材喂进时间轴；而工程本体 .channek 是纯数据账本：人拖拽、AI 调工具，改动走同一条可撤销的事务。预览与导出同一套合成——同工程同帧 = 同像素。',
  },
  {
    index: 8,
    key: 'cover',
    stepId: 'channek.cover',
    name: '封面',
    lane: 'production',
    input: '选题卡 / 口播稿',
    output: '多平台封面',
    artifact: '封面',
    oneLiner: '从题目里提炼封面钩子，按卡里的封面锁出各平台尺寸。',
    detail:
      '封面配置与提示词都是工件（cover.json + 提示词 md）：卡的 cover 段锁住版式与品牌元素，生图能力出图，多尺寸落盘。封面不即兴——它是品牌脸的一部分。',
  },
  {
    index: 9,
    key: 'publish',
    stepId: 'channek.publish',
    name: '发布',
    lane: 'production',
    input: '母版 + 切片 + 封面',
    output: '分发包',
    artifact: '分发包',
    oneLiner: '按平台备好元数据与物料；发布确认永远在你手里。',
    detail:
      '发布平台是扩展点（links.publish-platforms 贡献 provider），逐平台的标题、简介、标签落成分发工件。外发这一步的确认闸是内核行为——连卡都关不掉它，「按发布键」永远是你亲自按。',
  },
];

export type ProviderTag = 'step' | 'capability' | 'kernel' | 'ai';

export interface StageProvider {
  name: string;
  role: string;
  tag: ProviderTag;
}

/** 每步由谁接住（流水线详情卡展开用）：插件 id / 内核 / Yan */
export const STAGE_PROVIDERS: Record<number, StageProvider[]> = {
  1: [
    { name: 'links.production', role: '选题步工作台 + entry 工件定义', tag: 'step' },
    { name: 'Yan', role: '按卡 prompts 起草，人定夺', tag: 'ai' },
  ],
  2: [
    { name: 'links.production', role: '脚本步工作台', tag: 'step' },
    { name: 'Yan', role: '吃创作宪章与 prompt 资产', tag: 'ai' },
  ],
  3: [
    { name: 'links.production', role: '分镜步工作台 + 计划/注册表工件', tag: 'step' },
    { name: 'Yan', role: '概念 → 场景的设计草案', tag: 'ai' },
  ],
  4: [
    { name: 'links.production', role: '素材步 + 素材库工件', tag: 'step' },
    { name: 'links.image-gen', role: 'channek.image · 即梦生图', tag: 'capability' },
    { name: 'links.video-gen', role: '动态素材生成', tag: 'capability' },
  ],
  5: [
    { name: 'links.voice-lab', role: 'channek.tts · 本地 voxcpm 音色', tag: 'capability' },
    { name: 'links.sound-gen', role: 'channek.music / sfx · 本地生成', tag: 'capability' },
    { name: 'links.ffmpeg', role: '合轨 · 响度 · 封装', tag: 'capability' },
  ],
  6: [
    { name: 'links.asr', role: '词级对齐产 cue', tag: 'capability' },
    { name: 'links.ffmpeg', role: '音频抽取与探测', tag: 'capability' },
  ],
  7: [
    { name: 'links.editor-surface', role: '多轨剪辑台界面', tag: 'step' },
    { name: 'links.remotion', role: 'tsx 场景烘焙成素材', tag: 'capability' },
    { name: '内核引擎', role: '.channek 账本 · 预览=导出', tag: 'kernel' },
  ],
  8: [
    { name: 'links.production', role: '封面步 + 封面工件', tag: 'step' },
    { name: 'links.image-gen', role: '按封面锁出图', tag: 'capability' },
  ],
  9: [
    { name: 'links.publish-platforms', role: '逐平台发布 provider', tag: 'step' },
    { name: '内核确认闸', role: '外发必经人手，卡关不掉', tag: 'kernel' },
  ],
};

/** 创作 / 生产 双泳道的解释 */
export const SPLIT = {
  creative: {
    title: '创作泳道 · 人与 AI 商量',
    stages: '① ② ③',
    who: '你 + Yan，在步工作台里',
    why: '选题、稿子、分镜——需要判断的活。流程在这几步会停下来，等产物真的落成工件再往下走。',
    note: '产物写进文件夹的那一刻，下一步的灯才可能亮——不是「点了下一步」它就亮。',
  },
  mechanical: {
    title: '生产泳道 · 插件在跑',
    stages: '④ ⑤ ⑥ ⑦ ⑧ ⑨',
    who: '卡点名的能力插件 + 内核引擎',
    why: '生图、配音、对齐、烘焙、导出——确定性的活。同样的输入走同样的路，可断点续跑。',
    note: '这就是「你不知道它怎么剪出来的」的原因——后半段不是你在剪，是插件在按卡声明的流程跑。',
  },
};

/** 诚实灯轨的三种灯色（从工件推导，不信内存标志） */
export const RAIL_LIGHTS = [
  {
    id: 'dark',
    label: '暗 · 还没有',
    desc: '这一步声明要产出的工件，磁盘上还不存在。没有任何按钮能把它「点亮」——只有把东西真做出来。',
    accent: 'ink' as BrandColor,
  },
  {
    id: 'lit',
    label: '亮 · 在且新',
    desc: '工件存在，且比它的上游新。灯色是从文件的存在性和新鲜度链推导出来的，每次打开都重新推。',
    accent: 'mint' as BrandColor,
  },
  {
    id: 'stale',
    label: '陈旧 · 上游变了',
    desc: '脚本改了第 3 段？配音、字幕、母版立刻标陈旧——不是删掉你的产物，是诚实告诉你它们过时了。',
    accent: 'yellow' as BrandColor,
  },
];

/** 冻结的品牌脸三件套 —— 现在都住在卡里 */
export const BRAND = {
  colors: [
    { name: 'ink 黑墨', value: '#1A1A1A', note: '主色 · 超粗大字 · 粗描边' },
    { name: 'paper 米白', value: '#FFF8EC', note: '纸底 · 手绘温度' },
    { name: 'yellow 活力黄', value: '#FFD12E', note: '孟菲斯主撞色' },
    { name: 'blue 蓝', value: '#2B5BE8', note: '孟菲斯撞色' },
    { name: 'red 红', value: '#FF4D4D', note: '爆点 · 删除线' },
    { name: 'mint 薄荷青', value: '#16C79A', note: 'signature · IP 眼睛色' },
  ],
  signature: 'signature = 薄荷青眼 emo + 黑粗大字 + 撞色背景，一刷就认出',
  voice: '卡在 requires 里点名 channek.tts 能力 → links.voice-lab 的本地克隆音色。换机器、换后端，声音不换。',
  stance: '别做 AI 工具的收藏家，转动你自己的 AI 飞轮、沉淀成体系。',
  persona: '带你抄近道的 AI 实践探索家',
};

/** 飞轮闭环步骤 */
export const FLYWHEEL = [
  { label: '选题', sub: '情报库缺口 → 选题库立项' },
  { label: '生产', sub: '脚本 → 分镜 → 素材，灯一盏盏亮' },
  { label: '成片', sub: '配音 → 剪辑 → 母版落盘' },
  { label: '发布', sub: '分发包备好，按键的是你' },
  { label: '复盘', sub: '数据抄回运营复盘区' },
  { label: '反哺', sub: '赢家升权 · 翻车降权 · 回选题' },
];

export const STAGE_INTRO =
  '卡声明步序（key），插件提供每一步的实现（step id），步骤之间只经磁盘上的类型化工件衔接。滚动看一条内容怎么沿灯轨推进——每一步的产物落盘，下一步才接得住。';

/* ============================================================
   插件地图 —— 这个频道装的贡献生态全貌
   ============================================================ */

export interface AtlasPlugin {
  name: string;
  role: string;
  /** 界面贡献（区 / 页面 / 剪辑台）而非能力 provider */
  surface?: boolean;
}

export interface AtlasLayer {
  layer: string;
  accent: BrandColor;
  note: string;
  plugins: AtlasPlugin[];
}

/** 分层地图：飞轮日记这一个频道点名 / 装上的插件各归各位 */
export const PLUGIN_ATLAS: AtlasLayer[] = [
  {
    layer: '界面区 · 你看到的每一屏',
    accent: 'yellow',
    note: '卡 presentation 声明启用哪些区',
    plugins: [
      { name: 'links.homes', role: '主页区 · 开频道的落点', surface: true },
      { name: 'links.feilun-suite', role: '素材区 + 运营区 + 灯轨富真相', surface: true },
      { name: 'links.content-surface', role: '内容详情页 · 九步灯轨的版面', surface: true },
      { name: 'links.editor-surface', role: '多轨剪辑台', surface: true },
    ],
  },
  {
    layer: '流程与工件',
    accent: 'mint',
    note: '九步 + 二十余种工件的定义',
    plugins: [{ name: 'links.production', role: '九步流程 + 工件 kind 全套声明', surface: true }],
  },
  {
    layer: '生成能力',
    accent: 'blue',
    note: '卡 requires 按能力点名，可整条换后端',
    plugins: [
      { name: 'links.voice-lab', role: 'channek.tts · 本地音色' },
      { name: 'links.sound-gen', role: 'channek.music / sfx · 音乐音效' },
      { name: 'links.image-gen', role: 'channek.image · 即梦生图' },
      { name: 'links.video-gen', role: '动态素材生成' },
    ],
  },
  {
    layer: '媒体底座',
    accent: 'red',
    note: '内核不带任何转码二进制',
    plugins: [
      { name: 'links.ffmpeg', role: '探测 · 合轨 · 封装 · 转码' },
      { name: 'links.asr', role: '语音识别 · 字幕对齐' },
      { name: 'links.remotion', role: 'tsx 场景烘焙成普通素材' },
    ],
  },
  {
    layer: '出口',
    accent: 'ink',
    note: '发布平台也是扩展点',
    plugins: [{ name: 'links.publish-platforms', role: '逐平台发布 provider' }],
  },
];

export const ATLAS_TOTAL = PLUGIN_ATLAS.reduce((n, l) => n + l.plugins.length, 0);
export const ATLAS_SURFACE = PLUGIN_ATLAS.reduce(
  (n, l) => n + l.plugins.filter((p) => p.surface).length,
  0,
);

/* ============================================================
   核心架构：视频被写成数据（.channek 账本 + 场景烘焙）
   脱敏：只讲「工件类型 + 格式」，用 <...> 占位的抽象骨架。
   ============================================================ */

/** 传统剪辑 vs Channek 的做法 */
export const REFRAME = {
  traditional: {
    title: '传统剪辑',
    tag: 'GUI 手工活',
    points: ['在时间线上拖拽像素', '进度记在软件脑子里', 'AI 只能螺栓在旁边', '难复现 · 难 diff · 难协作'],
  },
  programmatic: {
    title: 'Channek 的做法',
    tag: '数据 + 唯一的笔',
    points: ['工程是纯数据账本（.channek）', '人和 AI 用同一条可撤销的笔', '进度从磁盘工件推导', '同工程同帧 = 同像素'],
  },
};

/** 确定性链：从声明到母版 */
export type ChainKind = 'in' | 'build' | 'out';
export const COMPILE_CHAIN: { label: string; sub: string; kind: ChainKind }[] = [
  { label: '稿 + 生产计划', sub: 'md · JSON —— 创作判断落成数据', kind: 'in' },
  { label: '场景烘焙', sub: 'tsx 场景 → 普通素材（links.remotion·离线）', kind: 'build' },
  { label: '.channek 装配', sub: '时间轴纯数据 · 有理时间 · 逐条可撤销事务', kind: 'build' },
  { label: '引擎导出', sub: '预览与导出同一套合成 · 逐帧确定', kind: 'build' },
  { label: 'master.mp4', sub: '同工程 + 同帧 = 同像素', kind: 'out' },
];

/** 软件类比 */
export const ANALOGY = [
  { from: '口播稿', to: 'spec 规格' },
  { from: '.channek 工程', to: '源代码' },
  { from: '合成引擎', to: '编译器' },
  { from: 'master.mp4', to: '编译出的二进制' },
];

/** 别 overclaim：精确边界 */
export const BOUNDARIES = [
  {
    claim: '不是「写份 md 就凭空出片」',
    detail:
      'md 是设计意图，不是可编译的源语言。选题、稿子、分镜这三步站着真正的创作判断——流程只是保证判断一旦落成数据，后面每一步都接得住。',
  },
  {
    claim: '卡不含一行代码',
    detail:
      '卡是纯数据的编排声明：要哪些步、什么顺序、要什么能力。干活的代码全在插件里，各过各的信任门。所以卡可以放心分享——导入一张卡不等于执行谁的代码。',
  },
  {
    claim: '价值不在「省掉创作」',
    detail:
      '而在把机械的活交给确定性的链（烘焙 / 合成 / 导出），把一切改动收进一条可撤销、可审计的笔——创作只剩下值得人做的那部分。',
  },
];

/** 工件链：从想法到成片·逐站 kind 与格式（✍创作 / ⚙生成 / 半） */
export type CraftKind = '创作' | '生成' | '半';
export interface Artifact {
  step: string;
  name: string;
  /** 语义 kind id —— 内核只认它，不认文件名 */
  kindId: string;
  /** 这张卡把它落在哪（layout.artifacts 覆盖） */
  cardPath: string;
  format: string;
  kind: CraftKind;
  role: string;
}

export const ARTIFACT_CHAIN: Artifact[] = [
  {
    step: '1',
    name: '选题卡',
    kindId: 'channek.entry',
    cardPath: '选题卡.md',
    format: 'md + YAML',
    kind: '创作',
    role: '条目清单工件：状态机住 frontmatter，这条内容走到哪全看它',
  },
  {
    step: '2',
    name: '口播稿',
    kindId: 'channek.script',
    cardPath: '脚本.md',
    format: 'md',
    kind: '创作',
    role: '成片旁白 + 下游一切的上游',
  },
  {
    step: '3',
    name: '生产计划',
    kindId: 'channek.storyboard',
    cardPath: '工程/scenes.json',
    format: 'JSON',
    kind: '半',
    role: '逐镜场景数据：人与 AI 定设计，结构由 schema 钉死',
  },
  {
    step: '4',
    name: '素材库',
    kindId: 'channek.assets',
    cardPath: '素材/',
    format: 'directory',
    kind: '半',
    role: '概念动画 / 真材料 / 生图 / 精灵四分区，生图由能力插件回填',
  },
  {
    step: '5',
    name: '旁白轨',
    kindId: 'channek.voiceTrack',
    cardPath: '配音/voiceover-track.wav',
    format: 'wav',
    kind: '生成',
    role: '冻结音色逐幕合成、合轨、响度归一',
  },
  {
    step: '6',
    name: '字幕轨',
    kindId: 'channek.captionCues',
    cardPath: '字幕/cues.json',
    format: 'JSON',
    kind: '生成',
    role: '词级对齐的 cue 数据，样式跟卡走',
  },
  {
    step: '7',
    name: '工程',
    kindId: 'channek.project',
    cardPath: '工程/<slug>.channek',
    format: '.channek',
    kind: '半',
    role: '时间轴纯数据账本：人拖拽、AI 调工具，同一条可撤销的笔',
  },
  {
    step: '7',
    name: '母版',
    kindId: 'channek.master',
    cardPath: '母版/master.mp4',
    format: 'mp4',
    kind: '生成',
    role: '唯一横屏交付物：预览与导出同一套合成',
  },
  {
    step: '8',
    name: '封面',
    kindId: 'channek.covers',
    cardPath: '封面/封面-*.png',
    format: 'png ×N',
    kind: '半',
    role: '封面配置 + 提示词是工件，多尺寸按卡的封面锁出图',
  },
  {
    step: '9',
    name: '分发包',
    kindId: 'channek.delivery',
    cardPath: '分发/发布/',
    format: 'md + 物料',
    kind: '生成',
    role: '逐平台元数据与物料；外发确认永远在人手里',
  },
];

/** 格式骨架 spotlight（抽象占位·脱敏） */
export const SKELETONS: { name: string; format: string; code: string }[] = [
  {
    name: '选题卡（entry 工件）',
    format: 'md + YAML frontmatter',
    code: `---
title: <标题>
status: <idea|producing|ready|published>
step:  <当前步 key>          # 状态机真相源
angle: <角度>   hook: <钩子>
---
# 一句话 / 核心结构 / 制作记录`,
  },
  {
    name: '卡的 pipeline 段',
    format: 'channel.json · 纯数据声明',
    code: `"pipeline": {
  "template": "channek.explainer-9",
  "steps": [
    { "key": "topic",  "step": "channek.topic" },
    { "key": "script", "step": "channek.script" },
    ...
    { "key": "edit",    "step": "channek.edit" },
    { "key": "publish", "step": "channek.publish" }
  ]
}   // key = 卡里的实例名；step = 插件贡献的实现`,
  },
  {
    name: '卡的 layout.artifacts 覆盖',
    format: 'channel.json · kind → 落点',
    code: `"layout": {
  "contentDir": "<内容目录>",
  "artifacts": {
    "channek.entry":  "选题卡.md",
    "channek.script": "脚本.md",
    "channek.master": "母版/master.mp4"
  }
}   // 内核只认 kind 语义 id；
    // 文件叫什么、放哪，由卡回答`,
  },
  {
    name: '.channek 工程',
    format: 'JSON · 时间轴纯数据',
    code: `{ "tracks": [ { "kind": "video", "clips": [ {
    "start":    { "value": <int>, "rate": <int> },
    "duration": { "value": <int>, "rate": <int> }
  } ] } ] }
// 有理时间：整数分数，永不出现浮点秒
// 一切修改 = 一条可撤销的 EditTransaction`,
  },
];

/** 出口章：这套流程怎么被复刻 */
export const REPLICATE = [
  {
    n: '①',
    title: '打包',
    desc: '频道导出成一个组合包（.channekcard）：拷走的是做法——频道卡、菜谱、频道插件，可随包携带配套插件；作品与人设留在你这儿。卡里绝无密钥、绝无机器路径——它在谁的电脑上都活。',
    accent: 'yellow' as BrandColor,
  },
  {
    n: '②',
    title: '导入体检',
    desc: '别人拖进 Channek：先安检，再体检——缺哪个插件、缺哪条能力、缺哪把密钥，三张清单摆在明面上，装一件亮一格。',
    accent: 'blue' as BrandColor,
  },
  {
    n: '③',
    title: '转起来',
    desc: '做法拷进一个新文件夹，填几道人设题，按卡的 layout 搭好骨架，同一套九步灯轨在他的机器上开始转——这页讲的一切，他都拿到了。',
    accent: 'mint' as BrandColor,
  },
];

/** 右侧导航 · 章节锚点（id 与各 section 的 id 一一对应） */
export const NAV_SECTIONS = [
  { id: 'top', num: '00', label: '首页' },
  { id: 'kernel', num: '01', label: '壳与卡' },
  { id: 'zones', num: '02', label: '文件夹' },
  { id: 'pipeline', num: '03', label: '九步' },
  { id: 'atlas', num: '04', label: '插件' },
  { id: 'split', num: '05', label: '双泳道' },
  { id: 'video-as-text', num: '06', label: '写数据' },
  { id: 'artifacts', num: '07', label: '工件链' },
  { id: 'rail', num: '08', label: '诚实灯轨' },
  { id: 'brand', num: '09', label: '品牌脸' },
  { id: 'flywheel', num: '10', label: '飞轮' },
  { id: 'replicate', num: '11', label: '复刻' },
];
