// config/tools.ts
// 工具模块配置与基础数据

// ============ 工具分类（用于工具列表页筛选） ============
export const categories = [
  { slug: 'ai-workbench', name: 'AI智能工作台', description: '文档处理、图片OCR、PDF归纳、代码开发、视频字幕翻译', icon: 'Brain' },
  { slug: 'product-research', name: '选品分析', description: '市场调研、竞品分析、关键词选品', icon: 'Search' },
  { slug: 'risk-management', name: '风险应对', description: '合规检测、风险评估、政策解读', icon: 'Shield' },
  { slug: 'currency-tools', name: '汇率换算', description: '实时汇率、多币种转换、历史查询', icon: 'DollarSign' },
  { slug: 'listing-optimization', name: 'Listing优化', description: '标题优化、关键词分析、字符统计', icon: 'FileText' },
  { slug: 'shipping-calculator', name: '物流运费', description: '运费估算、物流对比、时效查询', icon: 'Truck' },
  { slug: 'data-processing', name: '数据处理', description: 'JSON格式化、Base64编解码、URL处理', icon: 'Database' },
];


// ============ 平台列表（用于社区推荐） ============
export const platforms = [
  { slug: 'mercado-libre', name: 'Mercado Libre 美客多', region: '拉美', description: '拉美最大电商平台', tools: ['rate-converter', 'profit-calculator', 'listing-optimizer'] },
  { slug: 'ozon', name: 'Ozon', region: '俄罗斯&东欧', description: '俄罗斯主流电商平台', tools: ['rate-converter', 'profit-calculator', 'shipping-calculator'] },
  { slug: 'shopee', name: 'Shopee 虾皮', region: '东南亚', description: '东南亚领先电商平台', tools: ['rate-converter', 'profit-calculator', 'listing-optimizer'] },
  { slug: 'amazon', name: 'Amazon 亚马逊', region: '欧美', description: '全球最大电商平台', tools: ['profit-calculator', 'listing-optimizer', 'keyword-research'] },
  { slug: 'tiktok-shop', name: 'TikTok Shop', region: '全球', description: '社交电商新势力', tools: ['listing-optimizer', 'profit-calculator'] },
];

// ============ 汇率基础数据（相对于 1 CNY） ============
// 参考汇率，用于实时汇率换算工具
export const exchangeRates: Record<string, { code: string; name: string; symbol: string; rate: number }> = {
  CNY: { code: 'CNY', name: '人民币', symbol: '¥', rate: 1 },
  USD: { code: 'USD', name: '美元', symbol: '$', rate: 0.138 },
  EUR: { code: 'EUR', name: '欧元', symbol: '€', rate: 0.127 },
  GBP: { code: 'GBP', name: '英镑', symbol: '£', rate: 0.108 },
  JPY: { code: 'JPY', name: '日元', symbol: '¥', rate: 21.5 },
  HKD: { code: 'HKD', name: '港币', symbol: 'HK$', rate: 1.08 },
  KRW: { code: 'KRW', name: '韩元', symbol: '₩', rate: 192.0 },
  AUD: { code: 'AUD', name: '澳元', symbol: 'A$', rate: 0.215 },
  CAD: { code: 'CAD', name: '加元', symbol: 'C$', rate: 0.188 },
  SGD: { code: 'SGD', name: '新加坡元', symbol: 'S$', rate: 0.185 },
  THB: { code: 'THB', name: '泰铢', symbol: '฿', rate: 4.95 },
  MYR: { code: 'MYR', name: '马来西亚林吉特', symbol: 'RM', rate: 0.645 },
  IDR: { code: 'IDR', name: '印尼盾', symbol: 'Rp', rate: 2180 },
  PHP: { code: 'PHP', name: '菲律宾比索', symbol: '₱', rate: 7.85 },
  VND: { code: 'VND', name: '越南盾', symbol: '₫', rate: 3450 },
  MXN: { code: 'MXN', name: '墨西哥比索', symbol: 'Mex$', rate: 2.35 },
  BRL: { code: 'BRL', name: '巴西雷亚尔', symbol: 'R$', rate: 0.685 },
  RUB: { code: 'RUB', name: '俄罗斯卢布', symbol: '₽', rate: 12.8 },
  INR: { code: 'INR', name: '印度卢比', symbol: '₹', rate: 11.5 },
  NOK: { code: 'NOK', name: '挪威克朗', symbol: 'kr', rate: 1.48 },
  SEK: { code: 'SEK', name: '瑞典克朗', symbol: 'kr', rate: 1.52 },
  CHF: { code: 'CHF', name: '瑞士法郎', symbol: 'Fr', rate: 0.124 },
  NZD: { code: 'NZD', name: '新西兰元', symbol: 'NZ$', rate: 0.228 },
  ZAR: { code: 'ZAR', name: '南非兰特', symbol: 'R', rate: 2.45 },
  AED: { code: 'AED', name: '阿联酋迪拉姆', symbol: 'د.إ', rate: 0.506 },
  TRY: { code: 'TRY', name: '土耳其里拉', symbol: '₺', rate: 4.35 },
};

export const currencyList = Object.values(exchangeRates);

// ============ 工具列表 ============
export const tools = [
  {
    slug: 'keyword-lab',
    name: '关键词实验室',
    category: 'product-research',
    categoryName: '选品分析',
    icon: '🧪',
    intro: '按各平台真实标题规则生成关键词矩阵、诊断竞品标题缺口词、测算净利与机会分；可接入自有数据源获取真实搜索量。',
    seo: {
      title: '跨境电商关键词实验室 - 关键词矩阵与标题诊断',
      keywords: '关键词研究, 关键词矩阵, 标题优化, 竞品标题分析, 选品分析, keyword research',
      description: '按 Amazon、Shopee、Mercado Libre、Ozon 标题规则生成关键词矩阵，诊断竞品标题缺口，测算真实利润，不编造搜索量。',
      h1Text: '关键词实验室',
    },
    content: {
      intro: '真实可复算的关键词与标题分析：不编造搜索量，不伪造竞争度，所有结论都能自己验算。',
      tutorial: ['输入核心关键词并选择目标平台', '生成关键词矩阵并导出 CSV', '粘贴竞品标题，找出你漏掉的高频词', '用机会测算模型判断值不值得做'],
      faq: [
        { question: '搜索量数据是哪来的？', answer: '工具本身不内置任何付费数据源，因此不会编造搜索量。你可以在「数据源接入」里填入自己购买的 DataForSEO / SerpApi / Rainforest / Keepa 凭据，由服务端代调官方接口获取真实数据。' },
        { question: '不接数据源还能用吗？', answer: '能。关键词矩阵、标题合规校验、竞品标题诊断、利润测算全部只依赖平台规则和你输入的真实数据，不依赖任何外部接口。' },
      ],
    },
  },
  {
    slug: 'product-analysis',
    name: '选品分析工具',
    category: 'product-research',
    categoryName: '选品分析',
    icon: '🔍',
    intro: '一站式市场调研、竞品分析、关键词挖掘、商品潜力评分，适配美客多、亚马逊、Ozon、Shopee、Temu等平台。',
    seo: {
      title: '跨境电商选品分析工具 - GlobalTradeHub',
      keywords: '选品分析, 竞品监控, 关键词挖掘, 商品评分',
      description: '支持美客多、亚马逊、Ozon、Shopee、Temu的市场调研、竞品分析、关键词挖掘与商品潜力评分',
      h1Text: '选品分析工具',
    },
    content: {
      intro: '一站式市场调研、竞品分析、关键词挖掘、商品潜力评分，适配美客多、亚马逊、Ozon、Shopee、Temu等平台。',
      tutorial: ['选择目标平台站点', '查看市场大盘数据与趋势', '分析竞品商品与关键词', '使用AI商品潜力评分', '自有商品对标与备货测算'],
      faq: [
        { question: '支持哪些跨境电商平台？', answer: '支持美客多（墨西哥/巴西/智利）、亚马逊（北美/欧洲）、Ozon、Shopee、Temu。' },
        { question: '数据是否实时更新？', answer: '市场数据每日更新，竞品分析提供实时抓取，AI评分基于综合数据模型。' },
      ],
    },
  },
  {
    slug: 'rate-converter',
    name: '实时汇率换算',
    category: 'currency-tools',
    categoryName: '汇率换算',
    icon: '💱',
    intro: '在线进行多币种汇率转换，帮助跨境电商卖家快速核算成本和利润。',
    seo: {
      title: '实时汇率换算 - GlobalTradeHub',
      keywords: '汇率换算, 多币种转换, 跨境电商',
      description: '支持美元、欧元、英镑、日元等主流币种在线转换',
      h1Text: '实时汇率换算',
    },
    content: {
      intro: '在线进行多币种汇率转换，帮助跨境电商卖家快速核算成本和利润。',
      tutorial: ['选择源币种和目标币种', '输入金额', '点击立即换算'],
      faq: [
        { question: '支持哪些币种？', answer: '支持美元、欧元、英镑、日元、人民币等常见币种。' },
        { question: '汇率数据是否实时更新？', answer: '汇率数据每日更新，确保准确性。' },
      ],
    },
  },
  {
    slug: 'profit-calculator',
    name: '利润计算器',
    category: 'currency-tools',
    categoryName: '汇率换算',
    icon: '💰',
    intro: '快速计算跨境电商产品的利润，支持采购成本、运费、平台佣金等各项费用的综合核算。',
    seo: {
      title: '跨境电商利润计算器 - GlobalTradeHub',
      keywords: '利润计算, 成本核算, 跨境电商',
      description: '帮助卖家快速核算成本和利润',
      h1Text: '利润计算器',
    },
    content: {
      intro: '快速计算跨境电商产品的利润，支持采购成本、运费、平台佣金等各项费用的综合核算。',
      tutorial: ['输入产品采购成本', '填写物流费用和平台佣金', '设置目标利润率', '查看最终定价'],
      faq: [
        { question: '支持哪些平台？', answer: '支持亚马逊、美客多、Shopee、Ozon等主流平台。' },
        { question: '是否支持多币种？', answer: '支持自动换算多币种。' },
      ],
    },
  },
  {
    slug: 'shipping-calculator',
    name: '物流运费计算器',
    category: 'shipping-calculator',
    categoryName: '物流运费',
    icon: '📦',
    intro: '快速估算国际物流运费，支持多种物流渠道对比，帮助卖家选择最优物流方案。',
    seo: {
      title: '物流运费计算器 - GlobalTradeHub',
      keywords: '运费计算, 国际物流, 跨境电商',
      description: '帮助卖家估算国际物流费用',
      h1Text: '物流运费计算器',
    },
    content: {
      intro: '快速估算国际物流运费，支持多种物流渠道对比，帮助卖家选择最优物流方案。',
      tutorial: ['选择发货地和目的地', '输入包裹重量和尺寸', '选择物流渠道', '查看运费估算'],
      faq: [
        { question: '支持哪些物流渠道？', answer: '支持邮政小包、专线物流、商业快递等主流渠道。' },
        { question: '估算结果是否准确？', answer: '为参考价格，实际运费可能因促销活动有所变动。' },
      ],
    },
  },
  {
    slug: 'listing-optimizer',
    name: 'Listing优化工具',
    category: 'listing-optimization',
    categoryName: 'Listing优化',
    icon: '📝',
    intro: '快速检测跨境商品Listing标题、关键词、详情描述匹配度，自动生成优化整改建议，提升搜索排名与曝光。',
    seo: {
      title: 'Listing优化工具 - GlobalTradeHub',
      keywords: 'Listing优化, 标题优化, 关键词分析',
      description: '分析Listing标题和描述，提供关键词密度分析',
      h1Text: 'Listing优化工具',
    },
    content: {
      intro: '分析Listing标题和描述，提供关键词密度分析、字符统计等功能，帮助提升产品曝光率。',
      tutorial: ['输入Listing标题或描述', '点击分析按钮', '查看关键词密度和建议', '优化后复制使用'],
      faq: [
        { question: '支持哪些平台？', answer: '支持美客多、亚马逊、Shopee等多平台。' },
        { question: '关键词分析如何工作？', answer: '基于平台搜索数据和竞品分析提供建议。' },
      ],
    },
  },
  {
    slug: 'keyword-research',
    name: '关键词选品工具',
    category: 'product-research',
    categoryName: '选品分析',
    icon: '🔍',
    intro: '分析搜索热度、竞争度、长尾词挖掘，帮助卖家找到潜力产品和优化关键词策略。',
    seo: {
      title: '关键词选品工具 - GlobalTradeHub',
      keywords: '关键词选品, 市场调研, 跨境电商',
      description: '分析搜索热度、竞争度、长尾词挖掘',
      h1Text: '关键词选品工具',
    },
    content: {
      intro: '分析搜索热度、竞争度、长尾词挖掘，帮助卖家找到潜力产品和优化关键词策略。',
      tutorial: ['输入核心关键词', '设置筛选条件', '查看搜索热度和竞争度', '选择合适的关键词'],
      faq: [
        { question: '支持哪些平台的关键词数据？', answer: '支持美客多、亚马逊、Shopee等平台。' },
        { question: '数据更新频率是多少？', answer: '数据每周更新一次。' },
      ],
    },
  },
  {
    slug: 'json-formatter',
    name: 'JSON格式化工具',
    category: 'data-processing',
    categoryName: '数据处理',
    icon: '{ }',
    intro: '在线JSON格式化工具，支持美化、压缩、校验等功能，帮助开发者处理JSON数据。',
    seo: {
      title: 'JSON格式化工具 - GlobalTradeHub',
      keywords: 'JSON格式化, JSON美化, 代码格式化',
      description: '在线JSON格式化工具，支持美化、压缩和校验',
      h1Text: 'JSON格式化工具',
    },
    content: {
      intro: '在线JSON格式化工具，支持美化、压缩、校验等功能，帮助开发者处理JSON数据。',
      tutorial: ['粘贴JSON数据到输入框', '选择格式化或压缩模式', '点击处理按钮', '复制处理后的结果'],
      faq: [
        { question: '支持大文件处理吗？', answer: '建议不超过10MB的JSON数据。' },
        { question: '数据是否上传服务器？', answer: '所有处理均在浏览器本地完成。' },
      ],
    },
  },
  {
    slug: 'base64-converter',
    name: 'Base64编解码',
    category: 'data-processing',
    categoryName: '数据处理',
    icon: '🔐',
    intro: '在线Base64编码和解码工具，支持文本和图片的Base64转换操作。',
    seo: {
      title: 'Base64编解码工具 - GlobalTradeHub',
      keywords: 'Base64编码, Base64解码, 数据编码',
      description: '支持文本和图片的Base64转换',
      h1Text: 'Base64编解码',
    },
    content: {
      intro: '在线Base64编码和解码工具，支持文本和图片的Base64转换操作。',
      tutorial: ['选择编码或解码模式', '输入或粘贴数据', '点击转换按钮', '复制结果'],
      faq: [
        { question: '支持图片转换吗？', answer: '支持上传图片并转换为Base64编码。' },
        { question: '转换后的数据大小有变化吗？', answer: 'Base64编码后数据体积约增加33%。' },
      ],
    },
  },
  {
    slug: 'url-encoder',
    name: 'URL编码解码',
    category: 'data-processing',
    categoryName: '数据处理',
    icon: '🔗',
    intro: '在线URL编码解码工具，支持URL安全字符转换。',
    seo: {
      title: 'URL编码解码工具 - GlobalTradeHub',
      keywords: 'URL编码, URL解码, 链接处理',
      description: '在线URL编码解码工具',
      h1Text: 'URL编码解码',
    },
    content: {
      intro: '在线URL编码解码工具，支持URL安全字符转换。',
      tutorial: ['输入URL', '选择编码或解码', '点击转换', '复制结果'],
      faq: [
        { question: '支持中文URL吗？', answer: '支持中文URL编码解码。' },
        { question: '是否支持批量处理？', answer: '支持批量处理多个URL。' },
      ],
    },
  },

  { slug: 'ai-document', name: 'AI文档处理', category: 'ai-workbench', categoryName: 'AI智能工作台', icon: '📄', intro: '智能文章撰写、润色、内容精简、逻辑重构,支持多语言内容翻译与优化。', seo: { title: 'AI文档处理 - GlobalTradeHub', keywords: 'AI写作, 文档润色, 内容优化', description: '智能文章撰写、润色、内容精简与逻辑重构', h1Text: 'AI文档处理' }, content: { intro: '智能文章撰写、润色、内容精简、逻辑重构,支持多语言内容翻译与优化。', tutorial: ['上传文档或粘贴文本', '选择处理模式', '设置AI参数', '查看并导出结果'], faq: [{ question: '支持哪些文档格式?', answer: '支持TXT、DOC、DOCX、PDF等常见格式。' }, { question: '内容是否安全?', answer: '所有处理均通过加密通道。' }] } },
  { slug: 'ai-image-ocr', name: '图片OCR识别', category: 'ai-workbench', categoryName: 'AI智能工作台', icon: '🖼️', intro: '智能图片识别、文字OCR提取、图片压缩与格式转换,支持多语言图文解析。', seo: { title: '图片OCR识别 - GlobalTradeHub', keywords: 'OCR识别, 图片处理, 文字提取', description: '智能图片识别、OCR文字提取与格式转换', h1Text: '图片OCR识别' }, content: { intro: '智能图片识别、文字OCR提取、图片压缩与格式转换,支持多语言图文解析。', tutorial: ['上传图片', '选择处理模式', '设置参数', '下载处理结果'], faq: [{ question: '支持哪些图片格式?', answer: '支持JPG、PNG、WEBP、BMP等主流格式。' }, { question: 'OCR支持哪些语言?', answer: '支持中文、英文、西班牙语、葡萄牙语、俄语等多语言。' }] } },
  { slug: 'ai-pdf-summary', name: 'PDF批量AI归纳', category: 'ai-workbench', categoryName: 'AI智能工作台', icon: '📚', intro: '批量上传PDF文档,AI自动解析内容、生成摘要、合并汇总、产出结构化报告。', seo: { title: 'PDF批量AI归纳 - GlobalTradeHub', keywords: 'PDF处理, AI摘要, 文档汇总', description: '批量PDF解析、AI摘要与结构化报告生成', h1Text: 'PDF批量AI归纳' }, content: { intro: '批量上传PDF文档,AI自动解析内容、生成摘要、合并汇总、产出结构化报告。', tutorial: ['批量上传PDF/Word/图片文件', '设置归纳目标', '启动AI处理', '查看并下载结构化报告'], faq: [{ question: '一次能处理多少个文件?', answer: '单次最多支持50个文件,单个文件不超过50MB。' }, { question: '报告支持哪些格式导出?', answer: '支持PDF、Word、Markdown、HTML等多种格式。' }] } },
  { slug: 'ai-code-dev', name: 'AI编程开发助手', category: 'ai-workbench', categoryName: 'AI智能工作台', icon: '💻', intro: '代码生成、错误排查、API接口方案设计、前后端开发辅助,支持多语言编程。', seo: { title: 'AI编程开发助手 - GlobalTradeHub', keywords: '代码生成, AI编程, 接口设计', description: 'AI代码生成、排错与前后端开发辅助', h1Text: 'AI编程开发助手' }, content: { intro: '代码生成、错误排查、API接口方案设计、前后端开发辅助,支持多语言编程。', tutorial: ['输入开发需求或代码问题', '选择编程语言/框架', '查看AI生成的代码或方案', '调试优化并使用'], faq: [{ question: '支持哪些编程语言?', answer: '支持JavaScript、Python、Java、Go、PHP等主流语言。' }, { question: '能调试我的代码吗?', answer: '可以粘贴代码,AI会分析问题并提供修复建议。' }] } },
  { slug: 'ai-video-translate', name: '视频字幕翻译', category: 'ai-workbench', categoryName: 'AI智能工作台', icon: '🎬', intro: '视频语音转文字、自动生成字幕、英/西/葡/俄多语言翻译、SRT字幕文件导出。', seo: { title: '视频字幕翻译 - GlobalTradeHub', keywords: '视频字幕, 语音转文字, 多语言翻译', description: '视频语音转字幕、多语言翻译与SRT导出', h1Text: '视频字幕翻译' }, content: { intro: '视频语音转文字、自动生成字幕、英/西/葡/俄多语言翻译、SRT字幕文件导出。', tutorial: ['上传视频文件', '选择源语言与目标语言', '启动语音识别与翻译', '下载SRT字幕文件'], faq: [{ question: '支持哪些视频格式?', answer: '支持MP4、AVI、MOV、MKV等主流视频格式。' }, { question: '支持哪些目标语言?', answer: '支持英语、西班牙语、葡萄牙语、俄语等跨境主流市场语言。' }] } },

];


// ============ 社区板块 ============
export const communitySections = [
  { slug: 'operation', name: '运营交流', icon: '🎯', intro: '分享日常运营心得、平台规则变化、活动策划经验' },
  { slug: 'product-selection', name: '选品讨论', icon: '🎯', intro: '讨论热门品类、蓝海机会、选品技巧和数据分析' },
  { slug: 'qa', name: '问题求助', icon: '❓', intro: '遇到运营难题、账号问题、物流困扰，在这里寻求帮助' },
  { slug: 'experience', name: '经验分享', icon: '⭐', intro: '分享个人创业故事、成功案例、避坑指南和干货文章' },
];