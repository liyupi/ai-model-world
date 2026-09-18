import type { Continent } from '@/lib/types';

/**
 * 厂商形象注册表。
 *
 * 这是整个「零人工维护」承诺中唯一一处依赖人类常识的地方：机器能从数据里读出
 * DeepSeek 的定价和上下文长度，但读不出「DeepSeek 应该是一头鲸鱼」。
 *
 * 因此这里是一张查表，而不是一段逻辑。未收录的厂商不会导致任何失败，
 * 它们会自动落到 FALLBACK_MOTIF（神秘旅人），大陆归属由总部国家推导。
 * 想让某家新厂商有专属形象，往这张表里加一行即可，加不加系统都能跑。
 */

export interface VendorProfile {
  nameZh: string;
  /** 形象母题，决定角色的种族特征、发色与服装基调。合成管线按此选择 LPC 图层组合。 */
  motif: string;
  /** 家族纹章与服饰主色 */
  accentColor: string;
  /** ISO 3166-1 alpha-2，总部所在国 */
  country: string;
  homepage: string | null;
}

/** 未收录厂商的兜底形象：一位看不清面容的旅人，斗篷颜色由厂商 id 哈希决定。 */
export const FALLBACK_MOTIF = 'wanderer';

/**
 * 「国内」覆盖的国家/地区：总部在中国（含港澳台）的厂商。其余一律归入「国外」。
 *
 * 早期版本按「东方 / 西方」划分，把日韩新印也算进东方——用户的反馈是看不懂。
 * 读者真正关心的只有一个问题：「这是国内的还是国外的？」所以就按这个问题划分。
 * 键名仍沿用 east / west，以免动到管线与已生成的快照。
 */
const EAST_COUNTRIES = new Set(['CN', 'HK', 'MO', 'TW']);

export function continentForCountry(country: string | null | undefined): Continent {
  if (!country) return 'west';
  return EAST_COUNTRIES.has(country.toUpperCase()) ? 'east' : 'west';
}

export const VENDOR_REGISTRY: Record<string, VendorProfile> = {
  // ── 国外 ──────────────────────────────────────────────────
  openai: {
    nameZh: 'OpenAI',
    motif: 'blossom', // 品牌标记是六重对称的花结，形象取「花结精灵」
    accentColor: '#10a37f',
    country: 'US',
    homepage: 'https://openai.com',
  },
  anthropic: {
    nameZh: 'Anthropic',
    motif: 'origami', // 暖橙折纸使者
    accentColor: '#d97757',
    country: 'US',
    homepage: 'https://anthropic.com',
  },
  google: {
    nameZh: '谷歌',
    motif: 'gemini', // Gemini 即双子座，形象取「双子星」
    accentColor: '#4285f4',
    country: 'US',
    homepage: 'https://deepmind.google',
  },
  meta: {
    nameZh: 'Meta',
    motif: 'llama', // Llama 羊驼
    accentColor: '#0866ff',
    country: 'US',
    homepage: 'https://ai.meta.com',
  },
  xai: {
    nameZh: 'xAI',
    motif: 'voidx', // 黑白星空中的 X
    accentColor: '#1d1d1f',
    country: 'US',
    homepage: 'https://x.ai',
  },
  mistral: {
    nameZh: 'Mistral',
    motif: 'wind', // mistral 本义是法国南部的强风
    accentColor: '#fa520f',
    country: 'FR',
    homepage: 'https://mistral.ai',
  },
  cohere: {
    nameZh: 'Cohere',
    motif: 'ring',
    accentColor: '#39594d',
    country: 'CA',
    homepage: 'https://cohere.com',
  },
  microsoft: {
    nameZh: '微软',
    motif: 'windowpane', // 四色窗格
    accentColor: '#00a4ef',
    country: 'US',
    homepage: 'https://microsoft.com/ai',
  },
  amazon: {
    nameZh: '亚马逊',
    motif: 'quiver', // 箭袋，取自品牌的箭形标记
    accentColor: '#ff9900',
    country: 'US',
    homepage: 'https://aws.amazon.com/bedrock',
  },
  nvidia: {
    nameZh: '英伟达',
    motif: 'greeneye',
    accentColor: '#76b900',
    country: 'US',
    homepage: 'https://nvidia.com',
  },
  ai21: {
    nameZh: 'AI21',
    motif: 'scribe', // 书记官
    accentColor: '#e7457a',
    country: 'IL',
    homepage: 'https://ai21.com',
  },
  allenai: {
    nameZh: 'Allen AI',
    motif: 'owl', // 学术机构，取猫头鹰
    accentColor: '#0fcb8c',
    country: 'US',
    homepage: 'https://allenai.org',
  },
  perplexity: {
    nameZh: 'Perplexity',
    motif: 'comet',
    accentColor: '#20808d',
    country: 'US',
    homepage: 'https://perplexity.ai',
  },
  reka: {
    nameZh: 'Reka',
    motif: 'prism',
    accentColor: '#5b5bd6',
    country: 'US',
    homepage: 'https://reka.ai',
  },
  writer: {
    nameZh: 'Writer',
    motif: 'quill', // 羽毛笔，Palmyra 系列取名自棕榈，书写意象一脉相承
    accentColor: '#1e293b',
    country: 'US',
    homepage: 'https://writer.com',
  },
  liquid: {
    nameZh: 'Liquid AI',
    motif: 'droplet',
    accentColor: '#0f6fff',
    country: 'US',
    homepage: 'https://liquid.ai',
  },
  ibm: {
    nameZh: 'IBM',
    motif: 'granite', // Granite 系列，取「花岗岩」
    accentColor: '#0f62fe',
    country: 'US',
    homepage: 'https://ibm.com/granite',
  },
  tii: {
    nameZh: 'TII',
    motif: 'falcon', // Falcon 猎鹰
    accentColor: '#1b3a6b',
    country: 'AE',
    homepage: 'https://falconllm.tii.ae',
  },
  thinkingmachines: {
    nameZh: 'Thinking Machines',
    motif: 'gear',
    accentColor: '#9b8cff',
    country: 'US',
    homepage: 'https://thinkingmachines.ai',
  },
  nousresearch: {
    nameZh: 'Nous Research',
    motif: 'compass',
    accentColor: '#e0b341',
    country: 'US',
    homepage: 'https://nousresearch.com',
  },
  'arcee-ai': {
    nameZh: 'Arcee AI',
    motif: 'arc',
    accentColor: '#5f4bff',
    country: 'US',
    homepage: 'https://arcee.ai',
  },
  poolside: {
    nameZh: 'Poolside',
    motif: 'wave',
    accentColor: '#00b4d8',
    country: 'US',
    homepage: 'https://poolside.ai',
  },
  inception: {
    nameZh: 'Inception',
    motif: 'ripple', // Mercury 系列是扩散语言模型，取涟漪
    accentColor: '#7c3aed',
    country: 'US',
    homepage: 'https://inceptionlabs.ai',
  },
  morph: {
    nameZh: 'Morph',
    motif: 'shift',
    accentColor: '#22c55e',
    country: 'US',
    homepage: 'https://morphllm.com',
  },
  'swiss-ai': {
    nameZh: 'Swiss AI',
    motif: 'alps', // Apertus，取阿尔卑斯
    accentColor: '#d52b1e',
    country: 'CH',
    homepage: 'https://swiss-ai.org',
  },
  sdaia: {
    nameZh: 'SDAIA',
    motif: 'dune', // ALLaM 系列
    accentColor: '#006c35',
    country: 'SA',
    homepage: 'https://sdaia.gov.sa',
  },
  trendyol: {
    nameZh: 'Trendyol',
    motif: 'tulip', // 郁金香是土耳其的象征
    accentColor: '#f27a1a',
    country: 'TR',
    homepage: 'https://trendyol.com',
  },
  deepreinforce: {
    nameZh: 'Deep Reinforce',
    motif: 'loop',
    accentColor: '#14b8a6',
    country: 'US',
    homepage: null,
  },

  // ── 国内 ──────────────────────────────────────────────────
  deepseek: {
    nameZh: '深度求索',
    motif: 'whale', // 品牌标记就是一头鲸
    accentColor: '#4d6bfe',
    country: 'CN',
    homepage: 'https://deepseek.com',
  },
  alibaba: {
    nameZh: '阿里通义',
    motif: 'qilin', // 通义千问，取瑞兽麒麟
    accentColor: '#615ced',
    country: 'CN',
    homepage: 'https://qwen.ai',
  },
  moonshotai: {
    nameZh: '月之暗面',
    motif: 'moonrabbit', // 月之暗面，取月兔
    accentColor: '#0d1117',
    country: 'CN',
    homepage: 'https://moonshot.cn',
  },
  zhipuai: {
    nameZh: '智谱',
    motif: 'sage', // 智谱清言，取智者
    accentColor: '#3859ff',
    country: 'CN',
    homepage: 'https://z.ai',
  },
  minimax: {
    nameZh: 'MiniMax',
    motif: 'conch', // 旗下产品线名为「海螺」
    accentColor: '#ff5a3c',
    country: 'CN',
    homepage: 'https://minimax.io',
  },
  'bytedance-seed': {
    nameZh: '字节豆包',
    motif: 'bean', // 豆包
    accentColor: '#325ffe',
    country: 'CN',
    homepage: 'https://volcengine.com',
  },
  xiaomi: {
    nameZh: '小米',
    motif: 'millet', // 小米即粟
    accentColor: '#ff6900',
    country: 'CN',
    homepage: 'https://xiaomi.com',
  },
  kwaipilot: {
    nameZh: '快手',
    motif: 'shutter', // 短视频，取快门
    accentColor: '#ff5000',
    country: 'CN',
    homepage: 'https://kwaipilot.github.io',
  },
  aisingapore: {
    nameZh: 'AI Singapore',
    motif: 'merlion', // 鱼尾狮
    accentColor: '#d7263d',
    country: 'SG',
    homepage: 'https://aisingapore.org',
  },
  sarvam: {
    nameZh: 'Sarvam AI',
    motif: 'lotus',
    accentColor: '#ff8c1a',
    country: 'IN',
    homepage: 'https://sarvam.ai',
  },
  tencent: {
    nameZh: '腾讯混元',
    motif: 'penguin', // 企鹅
    accentColor: '#0052d9',
    country: 'CN',
    homepage: 'https://hunyuan.tencent.com',
  },
  baidu: {
    nameZh: '百度文心',
    motif: 'bearpaw', // 百度熊掌
    accentColor: '#2932e1',
    country: 'CN',
    homepage: 'https://yiyan.baidu.com',
  },
  '01-ai': {
    nameZh: '零一万物',
    motif: 'zeroone', // 0 与 1 的符文
    accentColor: '#0ea5e9',
    country: 'CN',
    homepage: 'https://01.ai',
  },
  stepfun: {
    nameZh: '阶跃星辰',
    motif: 'stair', // 阶跃
    accentColor: '#1a56db',
    country: 'CN',
    homepage: 'https://stepfun.com',
  },
  meituan: {
    nameZh: '美团龙猫',
    motif: 'cat', // LongCat
    accentColor: '#ffd100',
    country: 'CN',
    homepage: 'https://longcat.chat',
  },
  inclusionai: {
    nameZh: '蚂蚁百灵',
    motif: 'ant', // 蚂蚁集团
    accentColor: '#1677ff',
    country: 'CN',
    homepage: 'https://ling.tbox.cn',
  },
  iflytek: {
    nameZh: '科大讯飞',
    motif: 'spark', // 星火
    accentColor: '#1f6fff',
    country: 'CN',
    homepage: 'https://xinghuo.xfyun.cn',
  },
  sensetime: {
    nameZh: '商汤',
    motif: 'sunrise', // 日日新
    accentColor: '#eb2f2f',
    country: 'CN',
    homepage: 'https://sensetime.com',
  },
  skywork: {
    nameZh: '昆仑万维',
    motif: 'kunlun', // 昆仑山
    accentColor: '#2f6bff',
    country: 'CN',
    homepage: 'https://skywork.ai',
  },
  sakana: {
    nameZh: 'Sakana AI',
    motif: 'fish', // sakana 即日语「魚」
    accentColor: '#ef4444',
    country: 'JP',
    homepage: 'https://sakana.ai',
  },
  upstage: {
    nameZh: 'Upstage',
    motif: 'sun', // Solar 系列
    accentColor: '#8b5cf6',
    country: 'KR',
    homepage: 'https://upstage.ai',
  },
  openbmb: {
    nameZh: 'OpenBMB',
    motif: 'brick', // 大模型「积木」：开源社区把基座模型做成可拼装的构件
    accentColor: '#2563eb',
    country: 'CN',
    homepage: 'https://www.openbmb.ai',
  },
  naver: {
    nameZh: 'NAVER',
    motif: 'hyperclova',
    accentColor: '#03c75a',
    country: 'KR',
    homepage: 'https://clova.ai',
  },
};

/**
 * 同一家厂商在不同上游源里有不同写法。管线内已做归一，
 * 这里再兜一层，是因为上游随时可能换写法，而注册表查不到就等于形象丢失。
 */
const ALIASES: Record<string, string> = {
  'z-ai': 'zhipuai',
  zhipu: 'zhipuai',
  glm: 'zhipuai',
  bytedance: 'bytedance-seed',
  doubao: 'bytedance-seed',
  seed: 'bytedance-seed',
  qwen: 'alibaba',
  'alibaba-cloud': 'alibaba',
  moonshot: 'moonshotai',
  kimi: 'moonshotai',
  'google-deepmind': 'google',
  deepmind: 'google',
  'meta-llama': 'meta',
  llama: 'meta',
  rekaai: 'reka',
  'x-ai': 'xai',
  '01-ai': '01-ai',
  '01ai': '01-ai',
  yi: '01-ai',
  ant: 'inclusionai',
  antgroup: 'inclusionai',
  ling: 'inclusionai',
  hunyuan: 'tencent',
  ernie: 'baidu',
  longcat: 'meituan',
  'allen-ai': 'allenai',
  ai2: 'allenai',
};

export function canonicalVendorId(vendorId: string): string {
  const id = vendorId.toLowerCase().trim();
  return ALIASES[id] ?? id;
}

export function profileFor(vendorId: string): VendorProfile {
  const id = canonicalVendorId(vendorId);
  return (
    VENDOR_REGISTRY[id] ?? {
      nameZh: vendorId,
      motif: FALLBACK_MOTIF,
      accentColor: '#8a8a8a',
      country: '',
      homepage: null,
    }
  );
}
