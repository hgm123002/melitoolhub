// ============================================================================
// 合规政策数据（真实内容，中英双语）
// 说明：内容为跨境卖家实务要点总结，规则会变动，正文内均标注以官方最新公告为准
// ============================================================================

export type ComplianceCategoryId =
  | "amazon"
  | "mercado"
  | "eu"
  | "ru"
  | "sea"
  | "ip";

export interface ComplianceCategory {
  id: ComplianceCategoryId;
  icon: string;
  zh: string;
  en: string;
}

export interface CompliancePolicy {
  id: string;
  category: ComplianceCategoryId;
  icon: string;
  updatedAt: string;
  views: number;
  readMinutes: number;
  zh: { title: string; summary: string; content: string };
  en: { title: string; summary: string; content: string };
}

export const COMPLIANCE_CATEGORIES: ComplianceCategory[] = [
  { id: "amazon", icon: "📦", zh: "亚马逊政策", en: "Amazon Policy" },
  { id: "mercado", icon: "🛒", zh: "美客多 / 拉美", en: "Mercado Libre / LatAm" },
  { id: "eu", icon: "🇪🇺", zh: "欧盟合规", en: "EU Compliance" },
  { id: "ru", icon: "❄️", zh: "俄罗斯 & 东欧", en: "Russia & Eastern Europe" },
  { id: "sea", icon: "🌏", zh: "东南亚", en: "Southeast Asia" },
  { id: "ip", icon: "🛡️", zh: "知识产权 & 安全", en: "IP & Product Safety" },
];

export const COMPLIANCE_POLICIES: CompliancePolicy[] = [
  {
    id: "amazon-account-health",
    category: "amazon",
    icon: "📊",
    updatedAt: "2026-06-15",
    views: 3421,
    readMinutes: 7,
    zh: {
      title: "亚马逊账户健康指标：ODR、A-to-z 与政策警告怎么不踩线",
      summary:
        "订单缺陷率、迟发率、取消率三条红线，加上政策警告的申诉逻辑，一篇讲清账户被停用前的所有预警信号。",
      content: `
<h2>一、先搞清：哪些指标会真正导致停用</h2>
<p>亚马逊的账户健康（Account Health）不是"打分制"，而是<b>阈值制</b>——超过阈值就有被停用的风险。三个核心指标及其通行阈值：</p>
<table>
<thead><tr><th>指标</th><th>含义</th><th>亚马逊公布的目标值</th></tr></thead>
<tbody>
<tr><td>订单缺陷率 ODR</td><td>差评 + A-to-z 索赔 + 信用卡拒付，占订单比例</td><td>低于 1%</td></tr>
<tr><td>迟发率 LSR</td><td>未在承诺时间发货的订单比例</td><td>低于 4%</td></tr>
<tr><td>预配送取消率 CR</td><td>发货前由卖家主动取消的订单比例</td><td>低于 2.5%</td></tr>
</tbody>
</table>
<p>注意：ODR 是按<b>滚动 60 天</b>统计的。这意味着一次批量差评会跟着你两个月，别指望"过几天就恢复"。</p>

<h2>二、A-to-z 索赔为什么最容易踩雷</h2>
<p>A-to-z Guarantee Claim（交易保障索赔）只要买家发起，无论最终判给谁，<b>都会计入 ODR</b>。降低它的关键不在申诉，而在源头：</p>
<ul>
<li><b>物流可追踪</b>：使用带有效追踪号的配送方式，且承运商能被亚马逊识别；无追踪的订单在索赔中几乎必败</li>
<li><b>妥投时间留余量</b>：承诺时效比实际能力多留 1–2 天，尤其是自发货（FBM）</li>
<li><b>主动沟通</b>：买家发起索赔前通常先联系卖家，48 小时内回复能拦下大部分升级</li>
<li><b>描述一致</b>：尺寸、颜色、套装数量不符是索赔高发原因，Listing 图实物对比要严谨</li>
</ul>

<h2>三、政策警告（Policy Warning）与申诉</h2>
<p>政策警告比绩效指标更危险——它往往是<b>停用前最后一次提醒</b>。常见类型：知识产权投诉、商品真实性（假货）投诉、商品安全投诉、变体滥用、刷评。</p>
<p>收到警告的正确处理顺序：</p>
<ul>
<li><b>不要急着提交申诉</b>：先确认根因，提交一份"我不知道为什么"的申诉只会消耗申诉机会</li>
<li><b>准备三件套</b>：根因说明（Root Cause）、已采取的纠正措施（Immediate Actions）、防止再发生的系统性措施（Preventive Measures）</li>
<li><b>附证据</b>：供应商发票（近 365 天内、含品牌与数量）、品牌授权书、检测报告、整改后的 Listing 截图</li>
<li><b>涉及真伪投诉</b>：必须能证明供应链合法来源，仅有采购合同不够，通常需要增值税发票</li>
</ul>

<h2>四、自查清单（每月一次）</h2>
<ul>
<li>账户健康页三大指标是否全部"良好"，有无单项逼近阈值</li>
<li>是否有未读的政策警告邮件（含垃圾邮件箱）</li>
<li>退款率异常的商品是否已下架排查</li>
<li>FBM 订单的承运商是否仍在亚马逊认可的承运商列表内</li>
<li>变体关系是否存在"父子体不相关"的滥用情形</li>
</ul>
<p class="text-sm text-gray-500">本文为实务总结，具体阈值与政策以亚马逊卖家中心 Account Health 页面及官方政策公告为准。</p>
`,
    },
    en: {
      title: "Amazon Account Health: ODR, A-to-z Claims and Policy Warnings",
      summary:
        "The three performance thresholds that trigger suspension, plus how policy warnings and appeals actually work.",
      content: `
<h2>1. What actually gets your account suspended</h2>
<p>Amazon Account Health is a <b>threshold system</b>, not a score. The three metrics that matter most:</p>
<table>
<thead><tr><th>Metric</th><th>What it measures</th><th>Amazon's target</th></tr></thead>
<tbody>
<tr><td>Order Defect Rate (ODR)</td><td>Negative feedback + A-to-z claims + chargebacks, as a share of orders</td><td>Below 1%</td></tr>
<tr><td>Late Shipment Rate (LSR)</td><td>Orders shipped after the promised date</td><td>Below 4%</td></tr>
<tr><td>Pre-fulfilment Cancel Rate</td><td>Orders cancelled by the seller before shipping</td><td>Below 2.5%</td></tr>
</tbody>
</table>
<p>ODR runs on a <b>rolling 60-day window</b>. A bad batch of reviews follows you for two months — it does not "reset in a few days".</p>

<h2>2. Why A-to-z claims hurt the most</h2>
<p>Any A-to-z Guarantee claim counts toward ODR <b>even if you win the case</b>. Prevention beats appeals:</p>
<ul>
<li><b>Trackable shipping</b>: use carriers Amazon recognises; untracked orders almost always lose claims</li>
<li><b>Buffer your handling time</b>: promise 1–2 days more than you can actually deliver, especially for FBM</li>
<li><b>Reply within 48 hours</b>: most buyers contact the seller before filing — fast replies stop escalation</li>
<li><b>Description accuracy</b>: size, colour and pack-count mismatches are the top claim drivers</li>
</ul>

<h2>3. Policy warnings and appeals</h2>
<p>Policy warnings are more dangerous than metrics — they are usually the <b>last notice before suspension</b>. Common types: IP complaints, authenticity complaints, product safety, variation abuse, review manipulation.</p>
<ul>
<li>Do not submit a vague appeal — confirm the root cause first</li>
<li>Structure every appeal as: root cause, immediate corrective actions, preventive systemic actions</li>
<li>Attach evidence: supplier invoices within 365 days showing brand and quantity, brand authorisation, test reports</li>
<li>For authenticity complaints, purchase contracts alone are usually insufficient — VAT invoices are expected</li>
</ul>

<h2>4. Monthly self-audit</h2>
<ul>
<li>All three metrics "healthy", none trending toward the threshold</li>
<li>No unread policy warning emails (check spam folder)</li>
<li>Abnormally high refund-rate ASINs pulled and investigated</li>
<li>FBM carriers still on Amazon's approved list</li>
<li>No unrelated parent-child variation relationships</li>
</ul>
<p class="text-sm text-gray-500">Practical summary only; always verify against Seller Central Account Health and Amazon's official policy announcements.</p>
`,
    },
  },
  {
    id: "amazon-eu-epr",
    category: "amazon",
    icon: "♻️",
    updatedAt: "2026-06-08",
    views: 2891,
    readMinutes: 8,
    zh: {
      title: "亚马逊欧洲站 EPR 合规：包装法、WEEE 与电池法怎么注册申报",
      summary:
        "德国 LUCID、法国 UIN、意大利/西班牙 EPR——没有注册号，亚马逊会直接下架你的 ASIN。",
      content: `
<h2>一、EPR 是什么，为什么会影响卖货</h2>
<p>EPR（Extended Producer Responsibility，生产者责任延伸）要求"把产品投放到某国市场的一方"为该产品的废弃物回收买单。亚马逊作为市场平台被欧盟法规要求核验卖家的 EPR 注册号，<b>未提供有效号码的商品会被停售</b>，不是罚款了事。</p>

<h2>二、四大类目，对应不同注册体系</h2>
<table>
<thead><tr><th>类目</th><th>覆盖商品</th><th>德国</th><th>法国</th></tr></thead>
<tbody>
<tr><td>包装</td><td>几乎所有带包装的商品</td><td>LUCID 包装登记</td><td>UIN（包装）</td></tr>
<tr><td>电气电子</td><td>含电路的产品</td><td>WEEE 注册号（WEEE-Reg.-Nr.）</td><td>UIN（DEEE）</td></tr>
<tr><td>电池</td><td>含电池或随附电池</td><td>BattG 电池登记</td><td>UIN（ piles et batteries）</td></tr>
<tr><td>一次性塑料</td><td>特定一次性塑料制品</td><td>—</td><td>UIN（塑料）</td></tr>
</tbody>
</table>

<h2>三、德国包装法（VerpackG / LUCID）实操路径</h2>
<ul>
<li><b>第 1 步</b>：在德国包装登记门户 LUCID 注册，取得 LUCID 注册号（Registration number）</li>
<li><b>第 2 步</b>：与一家双轨制回收系统（如 Der Grüne Punkt、Lizenzero 等）签订合同，按包装材质与重量购买许可</li>
<li><b>第 3 步</b>：把 LUCID 号提交到卖家平台的 EPR 合规门户</li>
<li><b>第 4 步</b>：每年申报实际投放的包装量，数据要与回收系统合同量匹配</li>
</ul>
<p>常见踩坑：只在 LUCID 注册但<b>没有签回收系统合同</b>——号码无效，平台核验会失败；或者申报量与采购包装量严重不符，被追溯补缴。</p>

<h2>四、法国 UIN 的特殊之处</h2>
<p>法国把 EPR 拆成多个独立品类（包装、电子、电池、家具、纺织品、轮胎等），每个品类由不同生态组织（如 Citeo、Eco-systèmes）管理，最终汇总为一个 <b>UIN 唯一识别号</b>。法国还要求提供 <b>Triman 标识</b>与法文回收说明，包装上缺失会被视为不合规。</p>

<h2>五、自查与时间线</h2>
<ul>
<li>列出所有销售国 × 所有品类，交叉确认是否需要注册（很多卖家漏掉"电池"品类）</li>
<li>注册周期通常 2–8 周，旺季前 3 个月启动</li>
<li>每年 1–3 月是申报高峰，逾期申报可能被生态组织罚款</li>
<li>换包装材质/重量后，及时更新回收系统合同与申报数据</li>
</ul>
<p class="text-sm text-gray-500">各国 EPR 规则与费用每年调整，请以各国官方登记机构与平台合规门户的最新要求为准。</p>
`,
    },
    en: {
      title: "Amazon Europe EPR Compliance: Packaging, WEEE and Batteries",
      summary:
        "German LUCID, French UIN, Italian and Spanish EPR — without a valid registration number, Amazon delists your ASINs.",
      content: `
<h2>1. What EPR is and why it blocks sales</h2>
<p>Extended Producer Responsibility makes whoever places a product on a national market pay for its end-of-life collection. Marketplaces are legally required to verify seller EPR numbers — <b>listings without a valid number are blocked</b>, not merely fined.</p>

<h2>2. Four categories, four registries</h2>
<table>
<thead><tr><th>Category</th><th>Covers</th><th>Germany</th><th>France</th></tr></thead>
<tbody>
<tr><td>Packaging</td><td>Almost all packaged goods</td><td>LUCID registration</td><td>UIN (packaging)</td></tr>
<tr><td>Electrical & electronic</td><td>Products with circuitry</td><td>WEEE-Reg.-Nr.</td><td>UIN (DEEE)</td></tr>
<tr><td>Batteries</td><td>Products containing or shipped with batteries</td><td>BattG registration</td><td>UIN (batteries)</td></tr>
<tr><td>Single-use plastic</td><td>Specific SUP items</td><td>—</td><td>UIN (plastic)</td></tr>
</tbody>
</table>

<h2>3. German packaging law in practice</h2>
<ul>
<li>Register at LUCID and obtain a registration number</li>
<li>Contract a dual system (Der Grüne Punkt, Lizenzero, etc.) and licence your packaging by material and weight</li>
<li>Submit the LUCID number to the marketplace compliance portal</li>
<li>File annual volume reports matching your licensed volumes</li>
</ul>
<p>Most common failure: registering with LUCID but <b>never signing a dual-system contract</b> — the number fails verification. Second most common: reported volumes far below actual packaging purchased, triggering retroactive fees.</p>

<h2>4. France's UIN</h2>
<p>France splits EPR into separate streams (packaging, electronics, batteries, furniture, textiles, tyres), each run by a different eco-organisation, consolidated into one <b>UIN</b>. France also mandates the <b>Triman</b> logo and French recycling instructions on packaging.</p>

<h2>5. Checklist</h2>
<ul>
<li>Map every country × category — batteries are the most commonly missed</li>
<li>Registration takes 2–8 weeks; start three months before peak season</li>
<li>January–March is filing season; late filings can incur eco-organisation penalties</li>
<li>Re-license whenever packaging material or weight changes</li>
</ul>
<p class="text-sm text-gray-500">EPR rules and fees change annually; verify with national registries and the marketplace compliance portal.</p>
`,
    },
  },
  {
    id: "mercado-libre-mexico-tax",
    category: "mercado",
    icon: "🇲🇽",
    updatedAt: "2026-06-10",
    views: 1823,
    readMinutes: 6,
    zh: {
      title: "美客多墨西哥站：RFC 税号、发票与进口清关合规",
      summary:
        "没有 RFC 会被限制销售与结算；墨西哥的 CFDI 电子发票、进口关税与原产地规则怎么处理。",
      content: `
<h2>一、RFC 是墨西哥的"经营身份证"</h2>
<p>RFC（Registro Federal de Contribuyentes）是墨西哥税务登记号。以跨境卖家身份在美客多墨西哥站销售，RFC 直接影响三件事：</p>
<ul>
<li><b>能否开具 CFDI 发票</b>：墨西哥买家（尤其企业买家）普遍要求发票，无 RFC 无法开票，直接丢失 B2B 订单</li>
<li><b>平台代扣税比例</b>：未登记 RFC 的卖家，平台通常按更高的比例代扣 ISR（所得税）与 IVA（增值税）</li>
<li><b>账户权限</b>：部分类目与促销资源要求完成税务信息补全</li>
</ul>

<h2>二、CFDI 发票的基本规则</h2>
<p>CFDI（Comprobante Fiscal Digital por Internet）是墨西哥税务局认证的电子发票，必须通过 PAC（授权认证服务商）开具，包含：</p>
<ul>
<li>买卖双方 RFC、公司名称、税制代码（Régimen Fiscal）</li>
<li>商品/服务的 SAT 产品代码（ClaveProdServ）与单位代码</li>
<li>IVA 税率（一般为 16%，边境地区有优惠税率）</li>
<li>UUID 与数字签章</li>
</ul>
<p>作废发票有时限（通常为开具当月内），跨月作废需要走替开发票流程，账务处理更复杂。</p>

<h2>三、进口清关：三种常见模式的合规差异</h2>
<table>
<thead><tr><th>模式</th><th>谁做进口商</th><th>合规要点</th></tr></thead>
<tbody>
<tr><td>美客多代清关（FULL/跨境）</td><td>平台或其合作方</td><td>需提供准确 HS 编码与申报价值，低报会被查验</td></tr>
<tr><td>卖家自有进口商</td><td>卖家或本地代理</td><td>需要 RFC 与进口商登记（Padrón de Importadores）</td></tr>
<tr><td>本地仓发货</td><td>已完成清关的本地主体</td><td>重点转向本地税务与发票合规</td></tr>
</tbody>
</table>

<h2>四、NOM 认证：常被忽略的准入门槛</h2>
<p>墨西哥的 NOM（Normas Oficiales Mexicanas）是强制性技术标准，涉及电子电器、玩具、纺织品、食品接触材料等。没有 NOM 证书，商品可能被海关扣留或平台下架。<b>不是所有类目都需要，但需要的一定要有</b>，上架前先查清品类。</p>

<h2>五、合规自查</h2>
<ul>
<li>RFC 与公司主体、银行收款账户名称是否一致</li>
<li>CFDI 开具流程是否打通（买家索要发票时能否 24 小时内响应）</li>
<li>申报价值与售价是否明显偏离（低报是查验高发原因）</li>
<li>目标品类是否需要 NOM，证书是否在有效期内</li>
</ul>
<p class="text-sm text-gray-500">墨西哥税制与平台代扣规则会调整，具体请以 SAT 官方规定与美客多卖家后台通知为准。</p>
`,
    },
    en: {
      title: "Mercado Libre Mexico: RFC, CFDI Invoicing and Import Clearance",
      summary:
        "Without an RFC your payouts and invoicing are restricted. Here is how CFDI, import duties and NOM certification fit together.",
      content: `
<h2>1. RFC is your operating identity in Mexico</h2>
<p>RFC (Registro Federal de Contribuyentes) is the Mexican tax registration number. Selling on Mercado Libre Mexico, it affects three things:</p>
<ul>
<li><b>Invoicing</b>: business buyers require CFDI invoices; without an RFC you cannot issue them and lose B2B orders</li>
<li><b>Withholding rates</b>: marketplaces typically withhold higher ISR (income tax) and IVA (VAT) from sellers without an RFC</li>
<li><b>Account access</b>: certain categories and promotional programmes require completed tax data</li>
</ul>

<h2>2. How CFDI works</h2>
<p>CFDI is a tax-authority-certified e-invoice issued through an authorised PAC provider. It must include both parties' RFC, legal names, tax regime, SAT product and unit codes, IVA (generally 16%, with border-region rates), plus UUID and digital seal.</p>

<h2>3. Import models and their compliance differences</h2>
<table>
<thead><tr><th>Model</th><th>Importer of record</th><th>Key requirements</th></tr></thead>
<tbody>
<tr><td>Platform-managed cross-border</td><td>Platform or partner</td><td>Accurate HS codes and declared values; under-declaration triggers inspection</td></tr>
<tr><td>Seller's own importer</td><td>Seller or local agent</td><td>RFC plus Padrón de Importadores registration</td></tr>
<tr><td>Local warehouse</td><td>Already-cleared local entity</td><td>Focus shifts to local tax and invoicing</td></tr>
</tbody>
</table>

<h2>4. NOM certification — the overlooked gate</h2>
<p>NOM (Normas Oficiales Mexicanas) are mandatory technical standards covering electronics, toys, textiles and food-contact materials. Missing certificates can mean customs detention or delisting. Not every category needs one — but the ones that do cannot ship without it.</p>

<h2>5. Self-audit</h2>
<ul>
<li>RFC matches the legal entity and payout account name</li>
<li>CFDI issuing is operational (24-hour turnaround when buyers request invoices)</li>
<li>Declared values are consistent with selling prices</li>
<li>NOM certificates valid for all applicable categories</li>
</ul>
<p class="text-sm text-gray-500">Mexican tax rules and marketplace withholding change; verify with SAT and Mercado Libre seller announcements.</p>
`,
    },
  },
  {
    id: "eu-gpsr",
    category: "eu",
    icon: "🇪🇺",
    updatedAt: "2026-06-05",
    views: 4102,
    readMinutes: 9,
    zh: {
      title: "欧盟 GPSR 通用产品安全法规：中国卖家必须做的 5 件事",
      summary:
        "2024 年 12 月 13 日起适用的 GPSR 要求欧盟境内责任人、可追溯信息与安全警示，不合规商品会被平台下架。",
      content: `
<h2>一、GPSR 是什么</h2>
<p>GPSR（General Product Safety Regulation, (EU) 2023/988）自 <b>2024 年 12 月 13 日</b>起在欧盟全面适用，取代原《通用产品安全指令》2001/95/EC。它管的是"所有面向消费者的产品"——不只是带电的、也不只是有 CE 要求的品类，<b>没有专门法规覆盖的普通消费品也在范围内</b>。</p>

<h2>二、五个必做动作</h2>
<h3>1. 指定欧盟境内责任人</h3>
<p>必须有在欧盟境内设立的责任人（Responsible Person），其名称、通信地址、邮箱（或网址）要<b>印在产品或包装上</b>，并在 Listing 中展示。可以是进口商、授权代表或履约服务商，但必须真实可联系——平台会抽查。</p>
<h3>2. 建立可追溯信息</h3>
<p>产品上需能识别：制造商名称与地址、批次/序列号或其他可追溯标识。对多批次混发的卖家，这意味着包装标识要能区分批次。</p>
<h3>3. 做安全风险评估并留存技术文件</h3>
<p>即使不需要 CE，也要能做出一份"产品安全评估"：预期用途、可预见误用、风险点与缓解措施。文件需在监管机构要求时 10 天内提供。</p>
<h3>4. 完善警示与说明</h3>
<p>警示语必须使用<b>销售目的国的官方语言</b>。多国销售时，不能只放英文。</p>
<h3>5. 建立事故与召回流程</h3>
<p>发生安全事故需通过 Safety Business Gateway 通报，并具备召回能力（能定位到买家、能通知、能回收）。</p>

<h2>三、线上 Listing 的展示要求</h2>
<table>
<thead><tr><th>信息项</th><th>要求</th></tr></thead>
<tbody>
<tr><td>制造商信息</td><td>名称、注册商号或商标、邮政地址、电子联系方式</td></tr>
<tr><td>欧盟责任人</td><td>同上，且必须位于欧盟境内</td></tr>
<tr><td>产品标识</td><td>型号、批次或序列号等可追溯信息</td></tr>
<tr><td>警示与安全信息</td><td>目标市场语言，清晰可读</td></tr>
</tbody>
</table>

<h2>四、最容易出问题的三类商品</h2>
<ul>
<li><b>儿童用品与玩具</b>：除 GPSR 还叠加玩具安全指令，警示语与年龄标识要求严格</li>
<li><b>含电池产品</b>：电池法规 + 运输法规双重约束，误标容量/电压是常见投诉点</li>
<li><b>化妆品与食品接触材料</b>：成分披露与迁移测试报告必须齐全</li>
</ul>

<h2>五、落地检查清单</h2>
<ul>
<li>每个 EU 在售 SKU 都对应一个欧盟责任人，且授权文件齐全</li>
<li>产品标签已加印责任人信息与批次号</li>
<li>Listing 五要素齐全（制造商、责任人、标识、警示、语言）</li>
<li>技术文件（含风险评估）可按 SKU 调取</li>
<li>有事故通报与召回的执行流程和责任人</li>
</ul>
<p class="text-sm text-gray-500">GPSR 实施细则与各国执法口径仍在演进，请以欧盟官方文本与各国市场监管机构公告为准。</p>
`,
    },
    en: {
      title: "EU GPSR: Five Things Every Non-EU Seller Must Do",
      summary:
        "In force since 13 December 2024, GPSR requires an EU responsible person, traceability and safety warnings — non-compliant listings get removed.",
      content: `
<h2>1. What GPSR is</h2>
<p>The General Product Safety Regulation (EU) 2023/988 has applied since <b>13 December 2024</b>, replacing Directive 2001/95/EC. It covers <b>all consumer products</b> — not just electronics or CE-marked goods. Ordinary consumer items without a dedicated product directive are in scope.</p>

<h2>2. Five mandatory actions</h2>
<h3>1. Appoint an EU responsible person</h3>
<p>A responsible person established in the EU must be identified with name, postal address and email (or URL) <b>on the product or its packaging</b>, and shown in the listing. Importers, authorised representatives or fulfilment providers can serve — but they must be genuinely contactable; marketplaces audit this.</p>
<h3>2. Provide traceability information</h3>
<p>Products must identify the manufacturer (name, address) plus a batch, serial or other traceability identifier. If you ship mixed batches, packaging must distinguish them.</p>
<h3>3. Carry out a safety assessment and keep technical documentation</h3>
<p>Even without CE marking, you need a documented risk assessment: intended use, foreseeable misuse, hazards and mitigation. It must be producible to authorities within 10 days.</p>
<h3>4. Publish warnings in the right language</h3>
<p>Warnings must be in the <b>official language of each country of sale</b> — English-only does not satisfy this.</p>
<h3>5. Set up incident and recall procedures</h3>
<p>Serious incidents must be notified via the Safety Business Gateway, and you need a workable recall capability: locate buyers, notify them, recover product.</p>

<h2>3. What your listing must show</h2>
<table>
<thead><tr><th>Item</th><th>Requirement</th></tr></thead>
<tbody>
<tr><td>Manufacturer</td><td>Name, registered trade name or mark, postal address, electronic contact</td></tr>
<tr><td>EU responsible person</td><td>Same details, established in the EU</td></tr>
<tr><td>Product identification</td><td>Model, batch or serial number</td></tr>
<tr><td>Warnings and safety info</td><td>In the language of the destination market</td></tr>
</tbody>
</table>

<h2>4. Highest-risk categories</h2>
<ul>
<li><b>Children's products and toys</b>: additional Toy Safety Directive obligations and strict age labelling</li>
<li><b>Battery products</b>: battery regulation plus transport rules; capacity/voltage mislabeling is a frequent complaint</li>
<li><b>Cosmetics and food-contact materials</b>: ingredient disclosure and migration test reports are mandatory</li>
</ul>

<h2>5. Go-live checklist</h2>
<ul>
<li>Every EU-facing SKU mapped to an EU responsible person with signed mandate</li>
<li>Labels reprinted with responsible person details and batch codes</li>
<li>Listings carry all four data points</li>
<li>Technical file (including risk assessment) retrievable per SKU</li>
<li>Incident notification and recall process assigned to a named owner</li>
</ul>
<p class="text-sm text-gray-500">Implementation guidance and national enforcement are still evolving; verify against the official EU text and market surveillance authority notices.</p>
`,
    },
  },
  {
    id: "eu-vat-ioss",
    category: "eu",
    icon: "🧾",
    updatedAt: "2026-05-28",
    views: 3765,
    readMinutes: 7,
    zh: {
      title: "欧盟 VAT 与 IOSS：150 欧元门槛到底怎么用",
      summary:
        "B2C 包裹 150 欧元以下走 IOSS 在销售环节收 VAT，超过 150 欧元走进口 VAT——判断错一步就是双重征税或漏税。",
      content: `
<h2>一、核心规则：150 欧元这条线</h2>
<p>欧盟把 B2C 进口货物按<b>内在价值 150 欧元</b>分两条路径处理：</p>
<table>
<thead><tr><th>货值</th><th>VAT 征收环节</th><th>谁能用</th></tr></thead>
<tbody>
<tr><td>≤ 150 欧元</td><td>销售时收取（IOSS 或平台代收代缴）</td><td>IOSS 注册卖家 / 被视为供应商的平台</td></tr>
<tr><td>&gt; 150 欧元</td><td>进口时由进口商缴纳（进口 VAT）</td><td>进口商或其报关代理</td></tr>
</tbody>
</table>
<p>注意两点：货值按<b>不含运费与保险</b>的商品内在价值判断；<b>关税起征与 VAT 规则不同</b>，150 欧元以下免关税是另一条独立规则，不要混为一谈。</p>

<h2>二、IOSS 的实际作用</h2>
<p>IOSS（Import One-Stop Shop）让卖家在销售环节向买家收取 VAT，并通过一个季度申报覆盖所有欧盟成员国，货物入境时不再被征收进口 VAT，清关更快、买家不会被二次收费。</p>
<ul>
<li><b>必须提供</b>：IOSS 号要在包裹与电子数据中申报，缺失会被按进口 VAT 处理</li>
<li><b>申报周期</b>：按月申报（可季度），覆盖所有 EU 目的国</li>
<li><b>不能覆盖</b>：超过 150 欧元的订单，必须走进口清关路径</li>
</ul>

<h2>三、平台代收代缴 vs 自己注册</h2>
<p>通过亚马逊、eBay、Temu 等平台销售时，平台通常被"视为供应商"，由平台代收代缴 VAT，此时<b>不需要自己注册 IOSS</b>。但两种情况必须自己处理：</p>
<ul>
<li>独立站（自建站）销售，没有平台介入</li>
<li>平台未覆盖的情形，例如卖家自发货但平台未承担视为供应商义务</li>
</ul>

<h2>四、常见错误</h2>
<ul>
<li><b>把 150 欧元理解为"含运费"</b>：判断口径错误会导致该走 IOSS 的订单被按进口处理</li>
<li><b>拆单规避</b>：为压到 150 欧元以下把一单拆成多单，被认定为滥用，风险极高</li>
<li><b>IOSS 号未随包裹传递</b>：号码注册了但清关数据里没有，等于没注册</li>
<li><b>OSS 与 IOSS 混淆</b>：OSS 用于欧盟境内 B2C 远程销售（如从德国仓发往法国），IOSS 只针对进口</li>
</ul>

<h2>五、自查清单</h2>
<ul>
<li>销售的每个 EU 国家是否已确定 VAT 处理路径（平台代缴 / IOSS / 本地注册）</li>
<li>包裹与电子数据中是否正确传递 IOSS 号</li>
<li>申报金额与实际订单是否一致（差异是稽查重点）</li>
<li>欧盟境内仓发货的部分是否已在 OSS 或当地申报中体现</li>
</ul>
<p class="text-sm text-gray-500">VAT 规则与门槛以欧盟及各成员国税务机关最新规定为准，建议就具体业务咨询税务顾问。</p>
`,
    },
    en: {
      title: "EU VAT and IOSS: How the €150 Threshold Really Works",
      summary:
        "B2C parcels under €150 use IOSS at the point of sale; above €150 import VAT applies. Get this wrong and you double-tax or under-declare.",
      content: `
<h2>1. The €150 dividing line</h2>
<p>The EU treats B2C imports of goods by <b>intrinsic value of €150</b> in two ways:</p>
<table>
<thead><tr><th>Value</th><th>Where VAT is collected</th><th>Who can use it</th></tr></thead>
<tbody>
<tr><td>≤ €150</td><td>At the point of sale (IOSS or marketplace collection)</td><td>IOSS-registered sellers / deemed supplier platforms</td></tr>
<tr><td>&gt; €150</td><td>At import by the importer</td><td>Importer or customs agent</td></tr>
</tbody>
</table>
<p>Two traps: value is judged on the <b>goods only</b> (excluding transport and insurance), and <b>customs duty relief is a separate rule</b> from VAT — do not conflate them.</p>

<h2>2. What IOSS actually does</h2>
<p>IOSS lets you charge VAT at checkout and report it through one quarterly return covering all member states. Goods enter without import VAT, clearance is faster, and buyers avoid surprise fees.</p>
<ul>
<li>The IOSS number must be transmitted in the parcel data — missing it means import VAT is charged</li>
<li>Monthly (or quarterly) returns cover all EU destination countries</li>
<li>Orders above €150 cannot use IOSS</li>
</ul>

<h2>3. Marketplace collection vs your own registration</h2>
<p>Selling via Amazon, eBay or Temu usually makes the marketplace the "deemed supplier", which collects VAT for you — no IOSS registration needed. You must handle it yourself when:</p>
<ul>
<li>Selling through your own store with no marketplace involvement</li>
<li>The marketplace does not assume deemed-supplier obligations for your shipment model</li>
</ul>

<h2>4. Common mistakes</h2>
<ul>
<li>Treating €150 as including shipping</li>
<li>Splitting one order into several to stay under the threshold — treated as abuse</li>
<li>Registering an IOSS number but never passing it in clearance data</li>
<li>Confusing OSS (intra-EU B2C distance sales) with IOSS (imports only)</li>
</ul>

<h2>5. Self-audit</h2>
<ul>
<li>Every EU country of sale has a defined VAT route</li>
<li>IOSS number present in parcel and electronic data</li>
<li>Declared amounts match actual orders</li>
<li>EU-warehouse sales reflected in OSS or local returns</li>
</ul>
<p class="text-sm text-gray-500">Thresholds and rules are set by the EU and national tax authorities; consult a tax adviser for your specific model.</p>
`,
    },
  },
  {
    id: "russia-eac",
    category: "ru",
    icon: "📜",
    updatedAt: "2026-05-30",
    views: 2140,
    readMinutes: 6,
    zh: {
      title: "俄罗斯 EAC 认证：哪些品类必须有，怎么办",
      summary:
        "EAC 是欧亚经济联盟的强制准入标识。没有证书，货物在清关环节就会被拦，Ozon 与 Wildberries 也会要求提供。",
      content: `
<h2>一、EAC 是什么</h2>
<p>EAC（Eurasian Conformity）是欧亚经济联盟（EAEU，成员包括俄罗斯、白俄罗斯、哈萨克斯坦、亚美尼亚、吉尔吉斯斯坦）的强制性产品认证标识。通过 TR CU（技术法规）体系实施，<b>一份证书在五个成员国通用</b>。</p>

<h2>二、两种形式，别搞混</h2>
<table>
<thead><tr><th>形式</th><th>适用</th><th>责任主体</th></tr></thead>
<tbody>
<tr><td>EAC 符合性声明（Declaration）</td><td>风险较低的品类，如部分纺织品、包装、家具</td><td>可由联盟境内注册主体自行声明</td></tr>
<tr><td>EAC 证书（Certificate）</td><td>风险较高的品类，如电器、儿童用品、个人防护</td><td>需经 accredited 认证机构签发，通常涉及样品测试与工厂审核</td></tr>
</tbody>
</table>

<h2>三、常见需要 EAC 的品类</h2>
<ul>
<li>家用与商用电器、电子设备（TR CU 004/2011、020/2011）</li>
<li>儿童用品与玩具（TR CU 007/2011、008/2011）</li>
<li>个人防护设备（TR CU 019/2011）</li>
<li>食品接触材料与包装（TR CU 005/2011）</li>
<li>化妆品（TR CU 009/2011）</li>
<li>机械设备（TR CU 010/2011）</li>
</ul>
<p>不在上述范围的普通品类通常不需要 EAC，但仍需符合标签与消费者信息要求。</p>

<h2>四、EAC 标识的使用规范</h2>
<ul>
<li>标识由三个字母 EAC 组成，比例与最小尺寸有规定（通常不小于 5 mm）</li>
<li>必须贴在产品或最小销售包装上，清晰可辨、不可擦除</li>
<li>证书编号与签发机构信息需能追溯</li>
<li>标识旁通常需附俄文的制造商、进口商与产品信息</li>
</ul>

<h2>五、实操路径与坑</h2>
<ul>
<li><b>申请主体</b>：境外卖家通常需要一家 EAEU 境内注册的公司作为申请人，可通过代理安排</li>
<li><b>周期与费用</b>：声明类约 2–4 周；证书类含测试与审核，1–3 个月不等</li>
<li><b>测试报告</b>：部分品类可接受已认可实验室的测试报告，但必须是 EAEU 认可范围</li>
<li><b>常见坑 1</b>：用一份证书覆盖多个型号，但证书上型号未列全，清关被拒</li>
<li><b>常见坑 2</b>：产品改款后未更新证书，属于无效证书</li>
<li><b>常见坑 3</b>：只有英文标签，没有俄文消费者信息，被要求整改</li>
</ul>

<h2>六、平台侧要求</h2>
<p>Ozon 与 Wildberries 在特定类目会要求上传证书/声明编号，未提供的商品会被限制销售。建议在选品阶段就确认认证可行性，而不是等到备货后。</p>
<p class="text-sm text-gray-500">TR CU 技术法规会更新，具体品类与要求请以 EAEU 官方公布的技术法规清单及认证机构意见为准。</p>
`,
    },
    en: {
      title: "Russia EAC Certification: Which Categories Need It and How to Get It",
      summary:
        "EAC is the Eurasian Economic Union's mandatory conformity mark. Without it, goods are stopped at customs and marketplaces block listings.",
      content: `
<h2>1. What EAC is</h2>
<p>EAC (Eurasian Conformity) is the mandatory certification mark of the Eurasian Economic Union — Russia, Belarus, Kazakhstan, Armenia and Kyrgyzstan. It operates through the TR CU technical regulation system, and <b>one certificate is valid across all five member states</b>.</p>

<h2>2. Two forms — do not confuse them</h2>
<table>
<thead><tr><th>Form</th><th>Applies to</th><th>Who issues</th></tr></thead>
<tbody>
<tr><td>EAC declaration</td><td>Lower-risk goods: some textiles, packaging, furniture</td><td>An entity registered in the EAEU may declare</td></tr>
<tr><td>EAC certificate</td><td>Higher-risk goods: electricals, children's products, PPE</td><td>Accredited certification body, usually with sample testing</td></tr>
</tbody>
</table>

<h2>3. Categories commonly requiring EAC</h2>
<ul>
<li>Household and commercial electrical appliances (TR CU 004/2011, 020/2011)</li>
<li>Children's products and toys (TR CU 007/2011, 008/2011)</li>
<li>Personal protective equipment (TR CU 019/2011)</li>
<li>Food-contact materials and packaging (TR CU 005/2011)</li>
<li>Cosmetics (TR CU 009/2011)</li>
<li>Machinery (TR CU 010/2011)</li>
</ul>

<h2>4. Marking rules</h2>
<ul>
<li>The EAC mark must meet prescribed proportions and minimum size (typically ≥ 5 mm)</li>
<li>Applied to the product or smallest retail packaging, legible and durable</li>
<li>Certificate number and issuing body must be traceable</li>
<li>Russian-language manufacturer, importer and product information is normally required alongside it</li>
</ul>

<h2>5. Practical path and pitfalls</h2>
<ul>
<li><b>Applicant</b>: foreign sellers usually need an EAEU-registered entity; agents can provide this</li>
<li><b>Timeline</b>: declarations 2–4 weeks; certificates 1–3 months including testing</li>
<li><b>Pitfall 1</b>: one certificate covering several models that are not all listed — customs rejects the shipment</li>
<li><b>Pitfall 2</b>: product revisions without certificate updates render it invalid</li>
<li><b>Pitfall 3</b>: English-only labelling with no Russian consumer information</li>
</ul>

<h2>6. Marketplace requirements</h2>
<p>Ozon and Wildberries require certificate or declaration numbers for certain categories and restrict listings without them. Confirm certification feasibility during product selection, not after stocking.</p>
<p class="text-sm text-gray-500">TR CU regulations are updated periodically; verify against the official EAEU list and your certification body.</p>
`,
    },
  },
  {
    id: "sea-import-tax",
    category: "sea",
    icon: "🌏",
    updatedAt: "2026-05-25",
    views: 1980,
    readMinutes: 6,
    zh: {
      title: "东南亚跨境合规：低价值包裹免税时代结束后的应对",
      summary:
        "印尼、越南、泰国、马来西亚陆续收紧低价值进口免税，跨境小包的成本结构与定价逻辑正在被改写。",
      content: `
<h2>一、趋势：低价值包裹不再免税</h2>
<p>过去东南亚多国对低于一定金额的进口包裹免征关税与 VAT，这是跨境小包模式的基础。近年这一空间持续收窄：</p>
<ul>
<li><b>印尼</b>：大幅下调免税门槛，并对特定品类（如纺织品、鞋类、化妆品）加征进口税</li>
<li><b>越南</b>：取消低价值进口商品的增值税免税，电商进口包裹开始纳入 VAT 征收</li>
<li><b>泰国、马来西亚</b>：对低价值进口商品引入或强化 VAT/销售税征收，并要求平台代收</li>
</ul>
<p>共同特征：<b>由平台或物流商在销售/清关环节代收</b>，卖家需要提供准确的申报数据。</p>

<h2>二、对卖家的三个直接影响</h2>
<table>
<thead><tr><th>影响</th><th>说明</th></tr></thead>
<tbody>
<tr><td>到手成本上升</td><td>原本免税的低价商品加税后，价格优势被削弱</td></tr>
<tr><td>定价必须含税</td><td>若仍按不含税价格展示，买家结账时看到额外费用，转化率下降</td></tr>
<tr><td>申报合规压力</td><td>低报货值规避税费会被查验并处罚，且平台会追责</td></tr>
</tbody>
</table>

<h2>三、应对策略</h2>
<ul>
<li><b>重新算利润模型</b>：把目的国 VAT/进口税作为固定成本项进入定价公式，而不是当作偶发费用</li>
<li><b>调整品类结构</b>：低单价、高重量比的商品受冲击最大，可转向客单价更高、税率更优的品类</li>
<li><b>用本地仓对冲</b>：批量清关 + 本地履约可以摊薄单件清关成本，同时提升时效</li>
<li><b>确保申报一致</b>：商品名、HS 编码、申报价值三者一致，且与实际订单相符</li>
<li><b>关注平台代收规则</b>：不同平台代收范围不同，结算单里要能核对被代收的税额</li>
</ul>

<h2>四、各国侧重点（概要）</h2>
<ul>
<li><b>印尼</b>：本地进口商资质（API）与 SNI 强制认证是硬门槛，部分品类需本地备案</li>
<li><b>越南</b>：注意进口标签规定，需有越南语标签与溯源信息</li>
<li><b>泰国</b>：TISI 认证对电器、玩具等品类强制，FDA 管化妆品与食品接触</li>
<li><b>马来西亚</b>：SIRIM 认证对电气产品强制，注意马来语标签要求</li>
<li><b>菲律宾</b>：部分品类需 BPS 认证，注意平台白名单要求</li>
</ul>

<h2>五、自查清单</h2>
<ul>
<li>每个目的国的税负是否已计入定价</li>
<li>HS 编码是否准确（错编码既可能多缴税也可能被查）</li>
<li>标签是否满足当地语言与认证标识要求</li>
<li>平台结算单中的代收税额是否与实际销售匹配</li>
</ul>
<p class="text-sm text-gray-500">东南亚各国税制调整频繁，具体税率与门槛请以当地海关与税务机关最新公告为准。</p>
`,
    },
    en: {
      title: "Southeast Asia Compliance: Selling After the Low-Value Exemption Ends",
      summary:
        "Indonesia, Vietnam, Thailand and Malaysia are tightening low-value import relief — cross-border parcel economics are being rewritten.",
      content: `
<h2>1. The trend: no more duty-free parcels</h2>
<p>Several Southeast Asian markets historically exempted low-value imports from duty and VAT, which underpinned the cross-border parcel model. That space is closing:</p>
<ul>
<li><b>Indonesia</b>: sharply lowered the de minimis threshold and added import duties on specific categories such as textiles, footwear and cosmetics</li>
<li><b>Vietnam</b>: removed VAT exemption for low-value imports, bringing e-commerce parcels into VAT scope</li>
<li><b>Thailand and Malaysia</b>: introduced or tightened VAT/sales tax on low-value imports, with marketplaces collecting</li>
</ul>
<p>Common pattern: <b>collection shifts to the platform or logistics provider</b>, so accurate declaration data becomes the seller's responsibility.</p>

<h2>2. Three direct impacts</h2>
<table>
<thead><tr><th>Impact</th><th>What it means</th></tr></thead>
<tbody>
<tr><td>Landed cost rises</td><td>Previously exempt low-price goods lose their price advantage</td></tr>
<tr><td>Pricing must be tax-inclusive</td><td>Displaying tax-exclusive prices produces checkout surprises and lower conversion</td></tr>
<tr><td>Declaration scrutiny</td><td>Under-declaring to avoid tax triggers inspection, penalties and platform action</td></tr>
</tbody>
</table>

<h2>3. How to respond</h2>
<ul>
<li><b>Rebuild the margin model</b>: treat destination VAT/import duty as a fixed cost line, not an occasional expense</li>
<li><b>Shift the category mix</b>: low-ticket, heavy items suffer most — move toward higher AOV, better duty profiles</li>
<li><b>Use local warehousing</b>: bulk clearance plus local fulfilment dilutes per-unit clearance cost and improves delivery time</li>
<li><b>Keep declarations consistent</b>: product name, HS code and declared value must match each other and the actual order</li>
<li><b>Track marketplace collection</b>: reconcile withheld tax against settlement reports</li>
</ul>

<h2>4. Country notes (summary)</h2>
<ul>
<li><b>Indonesia</b>: importer licence (API) and mandatory SNI certification are hard gates</li>
<li><b>Vietnam</b>: Vietnamese-language labelling and traceability information required</li>
<li><b>Thailand</b>: TISI mandatory for electricals and toys; Thai FDA for cosmetics and food contact</li>
<li><b>Malaysia</b>: SIRIM certification for electrical products; Malay labelling requirements</li>
<li><b>Philippines</b>: BPS certification for certain categories</li>
</ul>

<h2>5. Self-audit</h2>
<ul>
<li>Destination tax burden included in pricing</li>
<li>HS codes accurate</li>
<li>Labels meet local language and certification mark rules</li>
<li>Withheld tax in settlements reconciles with sales</li>
</ul>
<p class="text-sm text-gray-500">Tax regimes in the region change frequently; confirm rates and thresholds with local customs and tax authorities.</p>
`,
    },
  },
  {
    id: "ip-takedown",
    category: "ip",
    icon: "⚖️",
    updatedAt: "2026-06-01",
    views: 5640,
    readMinutes: 8,
    zh: {
      title: "知识产权投诉与申诉：商标、专利、版权三条线的正确应对",
      summary:
        "收到侵权投诉不要急着删链接。先分清投诉类型，再判断是和解、申诉还是反通知，步骤错了会扩大损失。",
      content: `
<h2>一、先分清三类投诉</h2>
<table>
<thead><tr><th>类型</th><th>典型情形</th><th>抗辩空间</th></tr></thead>
<tbody>
<tr><td>商标（Trademark）</td><td>标题/图片中使用他人品牌词，售卖仿品</td><td>正品可举证；描述性合理使用可抗辩</td></tr>
<tr><td>专利（Patent）</td><td>外观设计或实用新型相似</td><td>可主张不落入权利范围或专利无效</td></tr>
<tr><td>版权（Copyright）</td><td>盗用主图、A+ 图、文案、卡通形象</td><td>可举证原创或合法授权</td></tr>
</tbody>
</table>
<p>不同平台处理路径不同：亚马逊走 IP 投诉（Report a Violation）与账户健康申诉；TikTok Shop、Temu 有独立的侵权工单；独立站则可能直接收到律师函。</p>

<h2>二、收到投诉后的 48 小时动作</h2>
<ul>
<li><b>不要重复提交申诉</b>：第一次申诉最有分量，模板化申诉基本无效</li>
<li><b>确认投诉范围</b>：是单个 ASIN、整个店铺，还是资金冻结</li>
<li><b>判断是否真侵权</b>：把对方权利号（商标注册号/专利号）在官方数据库核对，确认权利有效性与保护范围</li>
<li><b>准备证据包</b>：采购发票（含品牌、数量、日期）、品牌授权链、原创设计文件与时间戳、检测/合规文件</li>
</ul>

<h2>三、三种处理路径的选择</h2>
<h3>1. 确实侵权 → 和解或整改</h3>
<p>下架侵权链接、清点库存、与权利人和解（部分权利方接受一次性授权费）。整改后提交 POA（行动计划），说明下架范围、库存处理与预防机制。</p>
<h3>2. 不构成侵权 → 申诉</h3>
<p>提交"不侵权理由 + 证据"。商标类常见有效抗辩：正品平行进口（需完整链路凭证）、描述性使用、权利范围不覆盖该商品。</p>
<h3>3. 投诉方滥用 → 反通知</h3>
<p>美国 DMCA 体系下可提交 Counter-Notice；欧盟与部分平台也有反通知机制。注意：反通知会把自己的联系方式披露给投诉方，可能引发诉讼，需评估风险。</p>

<h2>四、预防：把风险挡在上架前</h2>
<ul>
<li><b>商标检索</b>：上架前在目标国商标数据库（USPTO、EUIPO、INPI 等）检索核心词</li>
<li><b>专利检索</b>：外观设计类产品（家居、饰品、玩具）重点查设计专利</li>
<li><b>图片自制</b>：主图、场景图、A+ 素材自行拍摄或购买授权，不要用供应商图片</li>
<li><b>品牌备案</b>：有自有品牌就做平台品牌备案（如 Amazon Brand Registry），获得主动保护与举报优先权</li>
<li><b>供应链留痕</b>：每批次保留增值税发票，这是真伪投诉唯一有效的自证材料</li>
</ul>

<h2>五、账户层面的连带风险</h2>
<p>多次侵权投诉会累计为"重复侵权者"，平台可能直接停用账户且不再给申诉机会。因此<b>第一起投诉就要认真处理</b>，不要用"先扛过去"的心态。</p>
<p class="text-sm text-gray-500">本文为流程与实务说明，不构成法律意见。涉及诉讼或高额索赔时请委托当地律师。</p>
`,
    },
    en: {
      title: "IP Complaints and Appeals: Trademark, Patent and Copyright",
      summary:
        "Do not delete the listing in a panic. Identify the complaint type first, then choose between settlement, appeal and counter-notice.",
      content: `
<h2>1. Identify the complaint type</h2>
<table>
<thead><tr><th>Type</th><th>Typical situation</th><th>Room to defend</th></tr></thead>
<tbody>
<tr><td>Trademark</td><td>Brand terms in title/images, counterfeit goods</td><td>Genuine goods with evidence; descriptive fair use</td></tr>
<tr><td>Patent</td><td>Similar design or utility model</td><td>Non-infringement or invalidity arguments</td></tr>
<tr><td>Copyright</td><td>Copied main images, A+ content, copy, characters</td><td>Proof of original creation or licence</td></tr>
</tbody>
</table>
<p>Routes differ by platform: Amazon uses Report a Violation plus Account Health appeals; TikTok Shop and Temu run separate IP ticketing; standalone stores often receive lawyer letters directly.</p>

<h2>2. The first 48 hours</h2>
<ul>
<li><b>Do not send repeated appeals</b> — the first one carries the most weight</li>
<li>Establish the scope: single ASIN, whole store, or frozen funds</li>
<li>Verify the claimed right (trademark or patent number) in the official registry for validity and scope</li>
<li>Assemble evidence: invoices showing brand and quantity, authorisation chain, original design files with timestamps, test reports</li>
</ul>

<h2>3. Three paths</h2>
<h3>1. You are infringing → settle or remediate</h3>
<p>Delist, quarantine stock, negotiate with the rights holder, then submit a plan of action covering delisting scope, inventory disposal and preventive controls.</p>
<h3>2. You are not infringing → appeal</h3>
<p>Submit reasoning plus evidence. Strong trademark defences include genuine parallel imports with a complete chain of title, descriptive use, and rights that do not cover your goods.</p>
<h3>3. The complaint is abusive → counter-notice</h3>
<p>Under US DMCA you may file a Counter-Notice; the EU and some platforms offer similar mechanisms. Note that a counter-notice discloses your details to the complainant and can invite litigation.</p>

<h2>4. Prevention before listing</h2>
<ul>
<li>Search core keywords in destination trademark registries (USPTO, EUIPO, INPI)</li>
<li>Search design patents for home, jewellery and toy products</li>
<li>Shoot or license your own images — never reuse supplier assets</li>
<li>Enrol your own brand in platform brand protection programmes</li>
<li>Keep VAT invoices for every batch: the only reliable proof in authenticity disputes</li>
</ul>

<h2>5. Account-level risk</h2>
<p>Repeated complaints accumulate into "repeat infringer" status, which can lead to permanent account deactivation with no appeal. Treat the <b>first</b> complaint seriously.</p>
<p class="text-sm text-gray-500">Process guidance, not legal advice. Engage local counsel for litigation or large claims.</p>
`,
    },
  },
  {
    id: "battery-dangerous-goods",
    category: "ip",
    icon: "🔋",
    updatedAt: "2026-05-20",
    views: 2740,
    readMinutes: 6,
    zh: {
      title: "含电池产品合规：UN38.3、MSDS 与运输标签要求",
      summary:
        "锂电产品是跨境物流拒收率最高的品类。UN38.3 报告、MSDS、锂电池标签三者缺一，货就走不了。",
      content: `
<h2>一、为什么电池产品被重点监管</h2>
<p>锂电池在航空运输中被列为第 9 类危险品（UN3480/UN3481 等）。航空货运与快递对锂电池有独立的收运规则（依据 IATA 危险品规则），<b>不是"普通货物加个标签"就能发</b>。</p>

<h2>二、三份必备文件</h2>
<table>
<thead><tr><th>文件</th><th>作用</th><th>有效期/要点</th></tr></thead>
<tbody>
<tr><td>UN38.3 测试报告</td><td>证明电池通过 8 项运输安全测试（高度模拟、温度、振动、冲击、短路等）</td><td>按型号，型号变更需重测</td></tr>
<tr><td>MSDS/SDS</td><td>化学品安全技术说明书，承运商收运依据</td><td>通常 3 年更新</td></tr>
<tr><td>锂电池运输标签</td><td>标识电池类型与包装等级</td><td>按 UN 编号与包装说明选用</td></tr>
</tbody>
</table>

<h2>三、常见运输情形与要求差异</h2>
<ul>
<li><b>电池单独运输（UN3480）</b>：要求最严，多数快递只接受货机运输且需鉴定报告</li>
<li><b>电池与设备同包装（UN3481）</b>：要求相对宽松，但仍需 UN38.3 与标签</li>
<li><b>电池装在设备内（UN3481）</b>：最常见的形式，需防意外启动措施</li>
<li><b>配套电池（随货但不装在设备里）</b>：按包装说明 II 处理，通常限制单件数量</li>
</ul>

<h2>四、目的地法规叠加</h2>
<ul>
<li><b>欧盟</b>：电池法规（EU）2023/1542 对标识、回收、碳足迹提出新要求，逐步替代原电池指令</li>
<li><b>美国</b>：需符合 DOT 49 CFR 相关规定，部分州另有回收要求</li>
<li><b>中东/南美部分国家</b>：对锂电进口有额外许可或限制，需提前确认</li>
</ul>

<h2>五、上架与页面合规</h2>
<ul>
<li>Listing 中需明确电池类型（锂离子/锂金属）、容量（Wh）、是否可拆卸</li>
<li>平台可能要求上传 UN38.3 与 MSDS 才能开通该类目</li>
<li>夸大续航或容量是投诉高发点，实测数据与页面标注必须一致</li>
</ul>

<h2>六、自查清单</h2>
<ul>
<li>UN38.3 报告是否覆盖在售所有电池型号</li>
<li>MSDS 版本是否在有效期内</li>
<li>外箱标签与包装说明是否匹配实际运输方式</li>
<li>承运商是否接受该类电池（不是所有渠道都收）</li>
<li>页面电池参数与实际产品是否一致</li>
</ul>
<p class="text-sm text-gray-500">危险品运输规则随 IATA 版本与各国法规更新，请以承运商与主管机关最新要求为准。</p>
`,
    },
    en: {
      title: "Battery Products: UN38.3, MSDS and Transport Labelling",
      summary:
        "Lithium batteries are the most frequently rejected category in cross-border logistics. Missing UN38.3, MSDS or labels stops the shipment.",
      content: `
<h2>1. Why batteries are regulated</h2>
<p>Lithium batteries are Class 9 dangerous goods in air transport (UN3480/UN3481). Air cargo and express carriers apply specific acceptance rules under the IATA Dangerous Goods Regulations — <b>a label on a normal parcel is not enough</b>.</p>

<h2>2. Three required documents</h2>
<table>
<thead><tr><th>Document</th><th>Purpose</th><th>Validity / notes</th></tr></thead>
<tbody>
<tr><td>UN38.3 test report</td><td>Proves the cell passed eight transport safety tests</td><td>Per model; retest after model changes</td></tr>
<tr><td>MSDS/SDS</td><td>Safety data sheet required for carrier acceptance</td><td>Usually refreshed every three years</td></tr>
<tr><td>Lithium battery mark</td><td>Identifies battery type and packing instruction</td><td>Selected by UN number and packing instruction</td></tr>
</tbody>
</table>

<h2>3. Shipping scenarios</h2>
<ul>
<li><b>Batteries alone (UN3480)</b>: strictest; many carriers accept cargo aircraft only with a test summary</li>
<li><b>Batteries packed with equipment (UN3481)</b>: more permissive, still needs UN38.3 and marking</li>
<li><b>Batteries contained in equipment (UN3481)</b>: most common; requires protection against accidental activation</li>
<li><b>Batteries shipped alongside equipment</b>: packing instruction II, per-package quantity limits apply</li>
</ul>

<h2>4. Destination-specific layers</h2>
<ul>
<li><b>EU</b>: Batteries Regulation (EU) 2023/1542 adds labelling, collection and carbon-footprint obligations</li>
<li><b>US</b>: DOT 49 CFR requirements, with state-level recycling rules in some cases</li>
<li><b>Parts of the Middle East and South America</b>: additional import permits or restrictions</li>
</ul>

<h2>5. Listing compliance</h2>
<ul>
<li>State battery type (Li-ion/Li-metal), capacity in Wh and whether it is removable</li>
<li>Marketplaces may require UN38.3 and MSDS before category approval</li>
<li>Overstated runtime or capacity is a frequent complaint source</li>
</ul>

<h2>6. Self-audit</h2>
<ul>
<li>UN38.3 covers every battery model you sell</li>
<li>MSDS current</li>
<li>Carton marks match the actual mode of transport</li>
<li>Carrier accepts that battery class on your lane</li>
<li>Listing specifications match the physical product</li>
</ul>
<p class="text-sm text-gray-500">Dangerous goods rules follow IATA editions and national regulations; confirm with your carrier and competent authority.</p>
`,
    },
  },
];

/** 按 id 取政策 */
export const getCompliancePolicy = (id: string): CompliancePolicy | undefined =>
  COMPLIANCE_POLICIES.find((p) => p.id === id);

/** 按分类取政策 */
export const policiesByCategory = (category: ComplianceCategoryId): CompliancePolicy[] =>
  COMPLIANCE_POLICIES.filter((p) => p.category === category);

/** 取本地化字段（未知语言回退英文） */
export const localizePolicy = (p: CompliancePolicy, locale: string) =>
  locale === "zh-CN" || locale === "zh-TW" ? p.zh : p.en;

export const localizeCategory = (c: ComplianceCategory, locale: string) =>
  locale === "zh-CN" || locale === "zh-TW" ? c.zh : c.en;
