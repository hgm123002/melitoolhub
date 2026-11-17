// lib/policies.ts
"use client";

// 政策分类（按平台和主题划分）
export const POLICY_CATEGORIES = [
  '拉美平台政策',
  '俄罗斯 & 东欧平台政策',
  '东南亚平台政策',
  '欧美平台政策',
  '内容 & 全托管平台政策',
  'B2B平台政策',
  '税务合规',
  '知识产权',
] as const;

export type PolicyCategory = typeof POLICY_CATEGORIES[number];

// 政策状态
export type PolicyStatus = 'published' | 'draft';

// 政策类型
export interface Policy {
  id: string;
  title: string;            // 如 "美客多政策"
  summary: string;          // 摘要
  content: string;          // 正文（HTML）
  category: PolicyCategory; // 所属分类
  status: PolicyStatus;     // 发布状态
  views: number;            // 浏览量
  createdAt: string;
  updatedAt: string;
  publishAt?: string;       // 定时发布时间
  icon?: string;            // 图标 emoji
}

const STORAGE_KEY = 'gth_policies';

// 种子数据（每个分类1-2篇默认政策）
const seedPolicies: Policy[] = [
  // 拉美平台政策
  {
    id: 'seed-policy-ml-1',
    title: '美客多政策',
    summary: '汇总美客多（Mercado Libre）的详细政策内容，包括最新规则、合规要求和注意事项。',
    content: '<h2>一、平台入驻要求</h2><p>卖家需提供企业营业执照、法人身份证、跨境收款账户等资料。部分国家站点对企业注册年限有要求（如墨西哥要求满1年）。</p><h2>二、产品合规标准</h2><ul><li>电子产品需提供当地认证（如墨西哥 NOM 认证）</li><li>医疗器械和药品受限品类，需申请特殊资质</li><li>食品和保健品需符合当地食品药品监管局要求</li></ul><h2>三、订单履约规则</h2><p>订单需在72小时内处理发货。超过时效会影响店铺健康分。多次延迟发货可能导致店铺被限制或关闭。</p><h2>四、退款与售后</h2><p>买家收货后7天内可无理由退货。卖家需在收到退货后48小时内处理退款。</p>',
    category: '拉美平台政策',
    status: 'published',
    views: 1280,
    createdAt: '2026-06-15',
    updatedAt: '2026-06-22',
  },
  {
    id: 'seed-policy-ml-2',
    title: 'Americanas政策',
    summary: '汇总巴西 Americanas 平台的详细政策内容，包括最新规则、合规要求和注意事项。',
    content: '<h2>一、平台入驻</h2><p>Americanas 是巴西最大电商之一。卖家需提供巴西本地税号（CNPJ）或通过巴西代理公司入驻。</p><h2>二、产品合规</h2><p>电子产品需提供 INMETRO 认证。婴幼儿产品需额外安全检测。</p><h2>三、物流要求</h2><p>建议使用平台官方物流 Correios 或 Parcel 以保障时效。</p>',
    category: '拉美平台政策',
    status: 'published',
    views: 642,
    createdAt: '2026-06-14',
    updatedAt: '2026-06-22',
  },
  // 俄罗斯 & 东欧
  {
    id: 'seed-policy-ru-1',
    title: 'Ozon政策',
    summary: 'Ozon作为俄罗斯头部电商平台，有其独特的政策要求。本文详细介绍入驻、产品、物流和合规相关规则。',
    content: '<h2>一、入驻条件</h2><p>需要企业营业执照（不限国家）、品牌授权书（如有品牌）、俄语客服能力、产品信息俄语翻译。</p><h2>二、FBO/FBS 两种模式</h2><p><strong>FBO（Ozon仓储）：</strong>将货物提前发至 Ozon 俄罗斯仓库，由平台负责发货。<br><strong>FBS（卖家自发货）：</strong>卖家在俄罗斯本地仓库发货，使用 Ozon 物流标签。</p><h2>三、俄语命名要求</h2><p>产品标题、描述、属性必须使用俄语。机器翻译可作为辅助，但需人工审核确保准确。</p><h2>四、税务与清关</h2><p>发往俄罗斯的包裹超过200欧元需缴纳关税。建议使用合规清关通道。</p>',
    category: '俄罗斯 & 东欧平台政策',
    status: 'published',
    views: 985,
    createdAt: '2026-06-13',
    updatedAt: '2026-06-22',
  },
  {
    id: 'seed-policy-ru-2',
    title: 'Wildberries政策',
    summary: 'Wildberries是俄罗斯最大的本土电商平台，有严格的运营规则。本文介绍入驻、品控、物流和罚款机制。',
    content: '<h2>一、入驻流程</h2><p>Wildberries 采用邀请制入驻，需通过平台官方申请通道提交企业资料。</p><h2>二、品控要求</h2><p>商品首次入仓需通过品质检查。不合格商品会被拒收并产生退货运费和罚款。</p><h2>三、罚款机制</h2><p>Wildberries 对超卖、延迟发货、商品描述不符等问题有明确的罚款规则。建议卖家关注每日店铺健康分。</p>',
    category: '俄罗斯 & 东欧平台政策',
    status: 'published',
    views: 874,
    createdAt: '2026-06-12',
    updatedAt: '2026-06-22',
  },
  {
    id: 'seed-policy-ru-3',
    title: 'Yandex Market政策',
    summary: 'Yandex Market 的详细政策内容，包括最新规则、合规要求和注意事项。',
    content: '<h2>一、平台简介</h2><p>Yandex Market 是俄罗斯搜索引擎公司 Yandex 旗下电商平台，流量优质。</p><h2>二、入驻条件</h2><p>需要企业主体、产品俄语资料、品牌授权等。</p>',
    category: '俄罗斯 & 东欧平台政策',
    status: 'published',
    views: 512,
    createdAt: '2026-06-11',
    updatedAt: '2026-06-22',
  },
  // 东南亚平台政策
  {
    id: 'seed-policy-sea-1',
    title: 'Shopee政策',
    summary: 'Shopee 平台完整运营规则，包括店铺设置、产品上架、物流发货、促销活动和评价管理。',
    content: '<h2>一、店铺初始设置</h2><p>新店铺需完成：店铺装修、分类设置、轮播图、店铺介绍。建议先上架至少50个SKU再开启流量。</p><h2>二、产品上架规范</h2><p>禁止侵权商品（如假冒品牌、未授权IP衍生产品）。价格需与市场价相符，禁止价格锚定。</p><h2>三、物流发货</h2><p>Shopee 自有物流 SLS 覆盖大多数站点。建议使用官方物流保障买家体验。</p><h2>四、活动报名</h2><p>平台大促（如11.11、12.12、生日大促）需要提前报名。活动期间折扣力度大但流量翻倍。</p>',
    category: '东南亚平台政策',
    status: 'published',
    views: 1520,
    createdAt: '2026-06-10',
    updatedAt: '2026-06-22',
  },
  {
    id: 'seed-policy-sea-2',
    title: 'Lazada政策',
    summary: 'Lazada覆盖东南亚6国（马来西亚、菲律宾、泰国、印尼、越南、新加坡）。详细了解各站点政策差异。',
    content: '<h2>一、六国政策差异</h2><p>Lazada各站点有不同的税务和合规要求。<strong>马来西亚</strong>需SST税务登记，<strong>泰国</strong>需FDA食品认证，<strong>印尼</strong>需SNI产品认证。</p><h2>二、物流体系</h2><p>Lazada 官方物流 LGS（Lazada Global Shipping）覆盖全部六国，提供一站式跨境物流。</p><h2>三、店铺健康分</h2><p>健康分受回复响应时间、订单取消率、差评率影响。低于阈值店铺会被限制参与活动。</p>',
    category: '东南亚平台政策',
    status: 'published',
    views: 1180,
    createdAt: '2026-06-09',
    updatedAt: '2026-06-22',
  },
  {
    id: 'seed-policy-sea-3',
    title: 'Tokopedia政策',
    summary: '印尼 Tokopedia 平台政策，包括入驻条件、产品合规、交易费率和运营规则。',
    content: '<h2>一、平台定位</h2><p>Tokopedia 是印尼本土最大的 C2C/B2C 电商平台。已与 GoJek 合并为 GoTo 集团。</p><h2>二、入驻条件</h2><p>跨境卖家需通过官方招商渠道申请，提供企业资质。</p>',
    category: '东南亚平台政策',
    status: 'published',
    views: 780,
    createdAt: '2026-06-08',
    updatedAt: '2026-06-22',
  },
  {
    id: 'seed-policy-sea-4',
    title: 'Tiki政策',
    summary: '越南 Tiki 平台的详细政策。',
    content: '<h2>一、Tiki平台简介</h2><p>Tiki 是越南本土第二大电商平台，以 B2C 模式为主。</p><h2>二、入驻要求</h2><p>需企业营业执照、产品资料越南语翻译。</p>',
    category: '东南亚平台政策',
    status: 'published',
    views: 420,
    createdAt: '2026-06-07',
    updatedAt: '2026-06-22',
  },
  {
    id: 'seed-policy-sea-5',
    title: 'Akulaku政策',
    summary: 'Akulaku（京东印尼）的政策详情。',
    content: '<h2>一、平台背景</h2><p>Akulaku 由京东投资，是印尼主流电商平台之一。</p><h2>二、运营要求</h2><p>同京东体系，有严格的产品质量和客服标准。</p>',
    category: '东南亚平台政策',
    status: 'published',
    views: 360,
    createdAt: '2026-06-06',
    updatedAt: '2026-06-22',
  },
  // 欧美平台政策
  {
    id: 'seed-policy-us-1',
    title: '亚马逊政策',
    summary: '亚马逊平台核心规则，涵盖卖家账户、产品合规、A-to-Z 保障、绩效指标和账户健康。',
    content: '<h2>一、卖家账户类型</h2><p><strong>个人卖家（Individual）：</strong>按件收费，无月租，适合少量SKU卖家。<br><strong>专业卖家（Professional）：</strong>$39.99/月，支持批量操作和高级功能。</p><h2>二、产品合规</h2><ul><li>电子产品需 FCC/CE/ROHS 等认证</li><li>儿童产品需 CPC 认证和测试报告</li><li>医疗产品需 FDA 注册</li></ul><h2>三、绩效指标（Account Health）</h2><ul><li><strong>订单缺陷率（ODR）：</strong>需 < 1%</li><li><strong>迟发率（LSR）：</strong>需 < 4%</li><li><strong>取消率（CR）：</strong>需 < 2.5%</li></ul><h2>四、A-to-Z 保障</h2><p>买家可对未收到货或货不对版的订单发起 A-to-Z 索赔。多次索赔会影响账户健康。</p>',
    category: '欧美平台政策',
    status: 'published',
    views: 2140,
    createdAt: '2026-06-05',
    updatedAt: '2026-06-22',
  },
  {
    id: 'seed-policy-us-2',
    title: '沃尔玛政策',
    summary: 'Walmart.com 美国站跨境卖家规则，包括申请入驻、产品合规、发货时效和价格要求。',
    content: '<h2>一、入驻申请</h2><p>沃尔玛采用申请制。需提供美国公司主体、EIN税号、美国仓库地址、至少500个SKU、品牌备案。</p><h2>二、产品合规</h2><p>产品需符合美国联邦和州法规。受限品类需额外申请审核。</p><h2>三、发货要求</h2><p>订单必须在24小时内处理，预计送达日不可超过10天。迟发率超过5%会被限制。</p>',
    category: '欧美平台政策',
    status: 'published',
    views: 980,
    createdAt: '2026-06-04',
    updatedAt: '2026-06-22',
  },
  {
    id: 'seed-policy-us-3',
    title: 'eBay政策',
    summary: 'eBay 平台完整规则，包括拍卖、一口价、店铺费用、VAT 税务和买家保障。',
    content: '<h2>一、费用结构</h2><p>eBay 采用刊登费（Insertion Fee）+ 成交费（Final Value Fee）。店铺订阅可降低单费。</p><h2>二、VAT税务</h2><p>2021年起欧盟VAT规则重大调整。销售额超过阈值需在各站点注册VAT。</p><h2>三、买家保障</h2><p>eBay Money Back Guarantee 保障买家权益。卖家需如实描述商品并按时发货。</p>',
    category: '欧美平台政策',
    status: 'published',
    views: 820,
    createdAt: '2026-06-03',
    updatedAt: '2026-06-22',
  },
  // 内容 & 全托管
  {
    id: 'seed-policy-ct-1',
    title: 'TikTok Shop政策',
    summary: 'TikTok Shop 跨境电商规则，包括店铺开设、产品发布、短视频带货、直播规范和活动要求。',
    content: '<h2>一、店铺入驻</h2><p>跨境店铺：需企业营业执照、品牌或授权、产品资料。个人店铺门槛较低但限制更多。</p><h2>二、短视频规则</h2><p>视频内容禁止虚假宣传、禁止使用医疗健康类关键词、必须使用TikTok Music版权音乐或自有版权音乐。</p><h2>三、直播规范</h2><p>直播间需保证商品真实性、禁止诱导线下交易、违禁品禁止直播展示。</p><h2>四、活动要求</h2><p>平台大促（如双月大促）需提前1-2个月报名。活动期间价格折扣、库存深度和发货时效有明确要求。</p>',
    category: '内容 & 全托管平台政策',
    status: 'published',
    views: 1750,
    createdAt: '2026-06-02',
    updatedAt: '2026-06-22',
  },
  {
    id: 'seed-policy-ct-2',
    title: '速卖通政策',
    summary: '速卖通（AliExpress）平台规则，包括全托管模式、平台佣金、物流发货和买家保护。',
    content: '<h2>一、全托管模式（AliExpress Choice）</h2><p>卖家将货发至官方仓，平台负责定价、营销、发货和售后。卖家只供货。适合供应链强但运营资源少的卖家。</p><h2>二、平台佣金</h2><p>佣金比例根据品类不同，通常在5%-8%。大促期间有特殊佣金返还政策。</p><h2>三、物流体系</h2><p>菜鸟物流（Cainiao）是官方物流合作伙伴。提供无忧物流、超级经济物流等多种方案。</p>',
    category: '内容 & 全托管平台政策',
    status: 'published',
    views: 1380,
    createdAt: '2026-06-01',
    updatedAt: '2026-06-22',
  },
  {
    id: 'seed-policy-ct-3',
    title: 'TEMU政策',
    summary: '拼多多旗下 TEMU 全托管模式规则。了解商品提报、定价、备货和结算。',
    content: '<h2>一、全托管模式</h2><p>TEMU 采用全托管模式。卖家只需供货，平台负责：定价、营销、客户服务、退换货。</p><h2>二、商品提报</h2><p>卖家在后台提报 SKU，附产品信息、图片和供货价。平台审核通过后发备货指令。</p><h2>三、定价</h2><p>由平台根据市场情况自动定价。卖家只关注供货价是否能盈利。</p><h2>四、结算</h2><p>T+1 结算周期。货款根据实际出库数量×供货价结算。</p>',
    category: '内容 & 全托管平台政策',
    status: 'published',
    views: 1620,
    createdAt: '2026-05-31',
    updatedAt: '2026-06-22',
  },
  {
    id: 'seed-policy-ct-4',
    title: 'SHEIN政策',
    summary: 'SHEIN 平台供应商规则，包括供应商申请、产品开发、质量标准和合作模式。',
    content: '<h2>一、供应商申请</h2><p>SHEIN 采用邀请制+申请制。供应商需提供样品、报价和生产能力。</p><h2>二、产品开发</h2><p>SHEIN以快速上新著称。供应商需配合每周多次上新、小单快反的节奏。</p><h2>三、质量标准</h2><p>SHEIN有严格的品控标准。供应商需在面料、工艺、包装等方面达到要求。</p>',
    category: '内容 & 全托管平台政策',
    status: 'published',
    views: 1100,
    createdAt: '2026-05-30',
    updatedAt: '2026-06-22',
  },
  // B2B平台政策
  {
    id: 'seed-policy-b2b-1',
    title: '阿里国际站政策',
    summary: '阿里巴巴国际站（Alibaba.com）B2B外贸平台规则，包括会员服务、RFQ报价、信用保障订单和产品合规。',
    content: '<h2>一、会员服务</h2><p><strong>出口通（Gold Supplier）：</strong>基础年费会员，提供店铺、RFQ报价、询盘等基础功能。<br><strong>金品诚企（Verified）：</strong>高级会员，附加验厂认证、专属页面、优先进驻。</p><h2>二、RFQ报价</h2><p>每日有免费报价额度。会员可购买额外报价权益。报价转化率是核心KPI。</p><h2>三、信用保障订单（Trade Assurance）</h2><p>平台担保买卖双方交易安全。订单金额越大，保障等级越高。</p>',
    category: 'B2B平台政策',
    status: 'published',
    views: 890,
    createdAt: '2026-05-29',
    updatedAt: '2026-06-22',
  },
  {
    id: 'seed-policy-b2b-2',
    title: '敦煌网政策',
    summary: '敦煌网（DHgate）是中国老牌B2B跨境电商平台。了解入驻、产品发布和交易规则。',
    content: '<h2>一、平台定位</h2><p>DHgate 主打小额批发跨境 B2B，买家主要是海外小B买家和电商卖家。</p><h2>二、入驻条件</h2><p>企业入驻需营业执照。年费+佣金模式。</p>',
    category: 'B2B平台政策',
    status: 'published',
    views: 430,
    createdAt: '2026-05-28',
    updatedAt: '2026-06-22',
  },
  {
    id: 'seed-policy-b2b-3',
    title: '中国制造网政策',
    summary: '中国制造网（Made-in-China.com）B2B平台规则，包括会员等级、产品发布和询盘系统。',
    content: '<h2>一、会员体系</h2><p>标准会员（Basic）和高级会员（Premium）。年费不同，获得的询盘资源和排名权重不同。</p><h2>二、产品发布</h2><p>产品标题包含关键词，描述有产品参数、图片高清。平台定期优化SEO。</p>',
    category: 'B2B平台政策',
    status: 'published',
    views: 520,
    createdAt: '2026-05-27',
    updatedAt: '2026-06-22',
  },
  // 税务合规
  {
    id: 'seed-policy-tax-1',
    title: 'VAT申报',
    summary: '跨境电商增值税（VAT）申报指南，包括英国、德国、法国、意大利、西班牙、阿联酋、沙特等主要站点。',
    content: '<h2>一、什么是 VAT</h2><p>VAT（Value Added Tax）是欧盟和英国等地区的增值税制度。跨境卖家在当地有库存或超过销售额阈值时需要注册和申报VAT。</p><h2>二、主要站点 VAT 注册阈值</h2><ul><li>英国：85,000英镑</li><li>德国：22,000欧元（使用FBA需立即注册）</li><li>法国：35,000欧元</li><li>意大利：70,000欧元</li><li>西班牙：10,000欧元</li><li>阿联酋：385,000迪拉姆</li><li>沙特阿拉伯：375,000里亚尔</li></ul><h2>三、申报周期</h2><p>大多数国家按季度申报。英国可选择月度或季度。逾期申报会产生罚款和滞纳金。</p><h2>四、建议</h2><p>建议使用专业税务代理服务处理VAT注册和申报。每月及时导出数据提交给会计师。</p>',
    category: '税务合规',
    status: 'published',
    views: 1960,
    createdAt: '2026-05-26',
    updatedAt: '2026-06-22',
  },
  {
    id: 'seed-policy-tax-2',
    title: '关税政策',
    summary: '各国海关关税政策汇总，包括商品HS编码、关税税率查询、原产地证和自由贸易协定利用。',
    content: '<h2>一、HS编码系统</h2><p>HS编码（Harmonized System）是国际统一的商品分类编码系统。前6位全球统一，后2-4位由各国自行扩展。确定正确的HS编码是计算关税的前提。</p><h2>二、关税查询方式</h2><ul><li>美国：HTS Code，通过 USITC 官网查询</li><li>欧盟：TARIC 系统查询</li><li>英国：UK Trade Tariff</li><li>日本：JCT 税号</li></ul><h2>三、自由贸易协定（FTA）</h2><p>中澳FTA、中瑞FTA、RCEP等协定可降低甚至免除特定产品关税。需提供原产地证书（Form A / Form B / 原产地声明等）。</p>',
    category: '税务合规',
    status: 'published',
    views: 1420,
    createdAt: '2026-05-25',
    updatedAt: '2026-06-22',
  },
  {
    id: 'seed-policy-tax-3',
    title: '进口税',
    summary: '各国进口税费计算方法和注意事项，帮助卖家估算商品真实成本。',
    content: '<h2>一、进口税费构成</h2><p>通常包含：关税（Duty）+ 增值税/消费税（VAT/GST）+ 其他费用（如海关处理费、保险费）。</p><h2>二、美国 Section 321</h2><p>美国对价值800美元以下的个人包裹免征关税（De Minimis Rule）。这是跨境小包发货的重要优势。</p><h2>三、欧盟 IOSS / OSS</h2><p>IOSS（一站式进口VAT）：适用于价值150欧元以下商品的进口VAT申报。OSS适用于欧盟内部跨境B2C销售VAT申报。</p>',
    category: '税务合规',
    status: 'published',
    views: 1180,
    createdAt: '2026-05-24',
    updatedAt: '2026-06-22',
  },
  // 知识产权
  {
    id: 'seed-policy-ip-1',
    title: '商标注册',
    summary: '跨境电商商标注册指南，包括马德里体系、各国商标局（USPTO/IPO/OHIM）、申请流程和品牌备案。',
    content: '<h2>一、为什么注册海外商标</h2><p>1. 防止他人抢注<br>2. 亚马逊品牌备案（Brand Registry）必备条件<br>3. 保护产品在平台不被侵权投诉<br>4. 提升品牌公信力</p><h2>二、主要商标注册路径</h2><ul><li><strong>美国 USPTO：</strong>约6-12个月。需美国律师代理。</li><li><strong>欧盟 EUIPO：</strong>一次申请覆盖27国。约4-6个月。</li><li><strong>英国 UK IPO：</strong>脱欧后独立申请。约4个月。</li><li><strong>马德里体系：</strong>通过中国商标局提交，可指定上百个国家/地区。</li></ul><h2>三、亚马逊 Brand Registry</h2><p>品牌成功注册（R标）后可在亚马逊备案，获得：品牌分析、自动侵权保护、A+内容、品牌旗舰店等高级功能。</p>',
    category: '知识产权',
    status: 'published',
    views: 2080,
    createdAt: '2026-05-23',
    updatedAt: '2026-06-22',
  },
  {
    id: 'seed-policy-ip-2',
    title: '版权保护',
    summary: '跨境电商版权保护方法，包括图片文字版权、版权登记、侵权投诉和应对。',
    content: '<h2>一、版权保护对象</h2><p>产品图片、描述文案、视频、设计图等都属于版权保护对象。版权在创作完成时自动产生，无需注册。</p><h2>二、平台投诉机制</h2><p>亚马逊等平台提供侵权投诉通道（Report a Violation）。需要提供版权归属证明和侵权链接。</p><h2>三、避免侵权</h2><p>所有产品图建议实拍或委托专业拍摄。不使用竞争对手图片。不抄别人的五点描述。</p>',
    category: '知识产权',
    status: 'published',
    views: 980,
    createdAt: '2026-05-22',
    updatedAt: '2026-06-22',
  },
  {
    id: 'seed-policy-ip-3',
    title: '专利申请',
    summary: '海外专利申请基础知识，包括发明专利、外观设计专利、实用新型专利的区别和申请策略。',
    content: '<h2>一、专利类型</h2><ul><li><strong>发明专利（Utility Patent）：</strong>保护产品结构、功能、工艺</li><li><strong>外观设计专利（Design Patent）：</strong>保护产品外观造型</li><li><strong>实用新型（Utility Model）：</strong>部分国家特有的小专利类型</li></ul><h2>二、申请时机</h2><p>建议产品正式发布前申请专利。美国有一年宽限期，其他国家多为绝对新颖性。</p>',
    category: '知识产权',
    status: 'published',
    views: 860,
    createdAt: '2026-05-21',
    updatedAt: '2026-06-22',
  },
];

// 初始化数据 + 自动迁移
const initStorage = () => {
  if (typeof window === 'undefined') return;
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(seedPolicies));
    return;
  }
};

const savePolicies = (policies: Policy[]) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(policies));
};

// 获取所有政策（自动检查并发布到期文章）
export const getPolicies = (): Policy[] => {
  if (typeof window === 'undefined') return seedPolicies;
  initStorage();
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return seedPolicies;
  try {
    const policies: Policy[] = JSON.parse(raw);
    // 检查定时发布
    let changed = false;
    const now = new Date();
    policies.forEach((p) => {
      if (p.status === 'draft' && p.publishAt) {
        if (new Date(p.publishAt) <= now) {
          p.status = 'published';
          p.updatedAt = new Date().toISOString().split('T')[0];
          p.publishAt = undefined;
          changed = true;
        }
      }
    });
    if (changed) savePolicies(policies);
    return policies;
  } catch {
    return seedPolicies;
  }
};

export const getPolicyById = (id: string): Policy | null => {
  const policies = getPolicies();
  return policies.find((p) => p.id === id) || null;
};

export const createPolicy = (data: Omit<Policy, 'id' | 'createdAt' | 'updatedAt' | 'views'>): Policy => {
  const policies = getPolicies();
  const today = new Date().toISOString().split('T')[0];
  const newPolicy: Policy = {
    ...data,
    id: 'policy-' + Date.now(),
    views: 0,
    createdAt: today,
    updatedAt: today,
  };
  policies.unshift(newPolicy);
  savePolicies(policies);
  return newPolicy;
};

export const updatePolicy = (id: string, data: Partial<Omit<Policy, 'id' | 'createdAt'>>): Policy | null => {
  const policies = getPolicies();
  const idx = policies.findIndex((p) => p.id === id);
  if (idx === -1) return null;
  const today = new Date().toISOString().split('T')[0];
  policies[idx] = { ...policies[idx], ...data, updatedAt: today };
  savePolicies(policies);
  return policies[idx];
};

export const deletePolicy = (id: string): boolean => {
  const policies = getPolicies();
  const filtered = policies.filter((p) => p.id !== id);
  if (filtered.length === policies.length) return false;
  savePolicies(filtered);
  return true;
};

export const togglePolicyStatus = (id: string): Policy | null => {
  const policies = getPolicies();
  const idx = policies.findIndex((p) => p.id === id);
  if (idx === -1) return null;
  policies[idx].status = policies[idx].status === 'published' ? 'draft' : 'published';
  policies[idx].updatedAt = new Date().toISOString().split('T')[0];
  savePolicies(policies);
  return policies[idx];
};

export const incrementPolicyViews = (id: string): void => {
  const policies = getPolicies();
  const policy = policies.find((p) => p.id === id);
  if (policy) {
    policy.views += 1;
    savePolicies(policies);
  }
};