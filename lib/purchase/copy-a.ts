import type { PurchaseCopy } from "./types";

// 中文 / 英文 / 西班牙文 / 葡萄牙文
export const COPY_A: Record<string, PurchaseCopy> = {
  "zh-CN": {
    metaTitle: "中国采购代发服务｜源头工厂直采，已服务 486 家跨境卖家",
    metaDesc:
      "GlobalTradeHub 提供中国源头工厂代采购、验货质检、仓储打包与全球直发。已帮助 486 家跨境卖家平均降低 30% 采购成本，出厂前 100% 全检，24 小时内报价。",
    crumb: "采购代发",
    heroBadge: "中国源头工厂直采 · 一站式代采购",
    heroTitle: "把中国工厂的货，直接交到你手上",
    heroSub:
      "从找厂、比价、打样、验货到打包出海，我们替你把中国这一段跑完。已服务 486 家跨境卖家，平均节省 30% 采购成本，每一批货出厂前必过质检。",
    heroNote: "无需预付定金 · 24 小时内给出报价 · 中英双语对接",
    ctaPrimary: "免费获取报价",
    ctaSecondary: "查看服务流程",
    stats: [
      ["486+", "服务的跨境卖家"],
      ["30%", "平均采购成本节省"],
      ["7-15 天", "打样到出货"],
      ["100%", "出厂前全检"],
    ],
    whyTitle: "为什么卖家把采购交给我们",
    whyLead: "我们不是加价的中间商，而是你在中国的采购与质检团队。",
    why: [
      [
        "源头工厂，砍掉中间差价",
        "直连义乌、广州、深圳、宁波等产业带工厂与 1688 一级供应商，同款产品平均比贸易商报价低 30%。",
      ],
      [
        "品质由我们把关",
        "每批货出厂前全检，提供验货照片与视频，抽检标准可按你的要求从 AQL 2.5 加严到 1.0。不合格直接退回工厂。",
      ],
      [
        "一个窗口，全程跟进",
        "中英双语客户经理 1 对 1，从询价到清关单据全程一个对接人，不用你同时催五个供应商。",
      ],
      [
        "小单也接，先试再放量",
        "50 件起可做，先小批量空运测试市场，跑通了再海运放量，降低你的库存风险。",
      ],
    ],
    flowTitle: "四步走完，你只需要确认",
    flowLead: "从提交需求到货物入仓，平均 2-3 周。",
    flow: [
      [
        "提交需求",
        "告诉我们产品、数量与目标售价，附图片或链接更佳。24 小时内给出工厂报价与采购方案。",
      ],
      [
        "找厂比价",
        "3-5 家匹配工厂同步报价，提供样品价与大货价，并给出建议方案与风险提示。",
      ],
      [
        "验货质检",
        "打样确认后安排生产，出厂前全检并拍摄验货视频，不合格不发货。",
      ],
      [
        "打包直发",
        "按你的渠道要求打包贴标，安排空运、海运或快递，提供全套清关单据。",
      ],
    ],
    advTitle: "能替你省下的，不只是钱",
    advLead: "采购、质检、仓储、物流，一个团队全包。",
    adv: [
      ["成本透明", "报价单列明工厂价、服务费与运费，没有隐藏加价。"],
      ["品质把关", "出厂全检 + 验货视频，AQL 2.5 起步，可按你的要求加严至 1.0。"],
      ["仓储代发", "义乌、深圳仓免费存放 30 天，支持一件代发与换标贴标。"],
      ["合规单据", "提供商业发票、装箱单与原产地证，配合你的清关与平台审核。"],
    ],
    faqTitle: "常见问题",
    faq: [
      [
        "最低起订量是多少？",
        "常规品类 50 件起可做，部分定制品类需 200 件起。建议先小批量空运试单，跑通后再放量。",
      ],
      [
        "怎么付款，资金安全吗？",
        "常规为 30% 定金 + 70% 出货前付清。验货视频确认后再付尾款，大额订单可走对公账户或第三方担保交易。",
      ],
      [
        "你们怎么保证节省 30% 的成本？",
        "我们直接对接工厂与一级批发，只收明码标价的服务费，不赚贸易差价。首次合作我们可以先做一轮免费比价，你自己对比结果。",
      ],
    ],
    formTitle: "告诉我们你要采购什么",
    formLead: "提交后 24 小时内，你的专属采购顾问会带着报价方案联系你。",
    fName: "姓名",
    fNamePh: "怎么称呼你",
    fEmail: "邮箱",
    fEmailPh: "you@company.com",
    fPhone: "电话 / WhatsApp",
    fPhonePh: "含国家区号，如 +52 55 1234 5678",
    fProduct: "产品与数量",
    fProductPh: "如：宠物饮水机 500 件，或直接贴 1688 / 亚马逊链接",
    fMessage: "补充说明",
    fMessagePh: "目标售价、包装要求、认证需求、期望到货时间…",
    fSubmit: "提交采购需求",
    fSending: "提交中…",
    fOkTitle: "已收到你的需求",
    fOkDesc:
      "采购顾问会在 24 小时内（工作日）联系你，并附上 3 家工厂的对比报价。如超时未收到回复，请直接邮件至 hgm1230002@outlook.com。",
    fErr: "提交失败，请稍后重试，或直接邮件联系我们。",
    fPrivacy: "我们仅将你的信息用于本次采购报价，不会分享给第三方。",
    contactTitle: "也可以直接联系我们",
    contactLead: "工作时间内通常 2 小时内回复。",
    ctaTitle: "先做一次免费比价，再决定是否合作",
    ctaLead:
      "把产品链接发给我们，24 小时内给你工厂直采价，和你现在的采购成本对比一下。",
  },

  en: {
    metaTitle:
      "China Sourcing Agent Service | Factory-Direct Pricing, 486 Sellers Served",
    metaDesc:
      "GlobalTradeHub sources directly from Chinese factories: agent purchasing, inspection, warehousing, repacking and worldwide shipping. 486 cross-border sellers served, average 30% procurement cost saved, 100% pre-shipment inspection, quote within 24 hours.",
    crumb: "Sourcing",
    heroBadge: "Factory-direct from China · Full-service sourcing agent",
    heroTitle: "Get goods straight from the Chinese factory floor",
    heroSub:
      "Supplier hunting, price comparison, sampling, inspection, packing and export — we handle the entire China side for you. 486 sellers served, 30% average cost saving, and every batch inspected before it ships.",
    heroNote:
      "No upfront deposit · Quote within 24 hours · English & Chinese support",
    ctaPrimary: "Get a free quote",
    ctaSecondary: "See how it works",
    stats: [
      ["486+", "sellers served"],
      ["30%", "average cost saving"],
      ["7-15 days", "sampling to shipment"],
      ["100%", "pre-shipment inspection"],
    ],
    whyTitle: "Why sellers hand sourcing over to us",
    whyLead:
      "We are not a markup middleman — we are your procurement and QC team on the ground in China.",
    why: [
      [
        "Factory-direct, no middleman markup",
        "We work directly with factories in Yiwu, Guangzhou, Shenzhen and Ningbo and with first-tier 1688 suppliers. Same product, typically 30% below trader quotes.",
      ],
      [
        "Quality checked by us, not by promise",
        "Every batch is fully inspected before shipment, with photo and video evidence. Inspection standard can be tightened from AQL 2.5 to 1.0 on request. Failed goods go back to the factory.",
      ],
      [
        "One contact for the whole chain",
        "A bilingual account manager from first quote to customs documents. One person to talk to instead of chasing five suppliers.",
      ],
      [
        "Small orders welcome — test first, scale later",
        "From 50 units. Ship a small air batch to test the market, then move to sea freight once it sells. Lower inventory risk.",
      ],
    ],
    flowTitle: "Four steps — you only approve",
    flowLead:
      "On average 2-3 weeks from brief to goods arriving at your warehouse.",
    flow: [
      [
        "Send your brief",
        "Tell us the product, quantity and target selling price. Photos or links help. Factory quotes and a sourcing plan within 24 hours.",
      ],
      [
        "We compare factories",
        "3-5 matched factories quote in parallel. You get sample pricing, bulk pricing, and our recommendation with risk notes.",
      ],
      [
        "Sampling & inspection",
        "Production starts after sample approval. Full inspection with video before shipment — nothing ships if it fails.",
      ],
      [
        "Packing & dispatch",
        "Packed and labelled to your channel requirements, shipped by air, sea or express, with full customs documentation.",
      ],
    ],
    advTitle: "What you save is more than money",
    advLead: "Sourcing, inspection, warehousing and logistics in one team.",
    adv: [
      [
        "Transparent costing",
        "Quotes break down factory price, service fee and freight. No hidden markup.",
      ],
      [
        "Quality gate",
        "Full inspection plus video evidence. AQL 2.5 as standard, tightenable to 1.0.",
      ],
      [
        "Warehouse & fulfilment",
        "30 days free storage in Yiwu and Shenzhen, with pick-pack-ship and relabelling.",
      ],
      [
        "Compliant paperwork",
        "Commercial invoice, packing list and certificate of origin for your customs and marketplace checks.",
      ],
    ],
    faqTitle: "Frequently asked questions",
    faq: [
      [
        "What is the minimum order quantity?",
        "50 units for most categories, 200 units for some customised items. We recommend a small air shipment first, then scaling up.",
      ],
      [
        "How do payments work? Is it safe?",
        "Standard terms are 30% deposit and 70% before shipment. The balance is due after you approve the inspection video. Large orders can go through a corporate account or escrow.",
      ],
      [
        "How can you guarantee a 30% saving?",
        "We buy direct from factories and first-tier wholesalers and charge a published service fee instead of a trading margin. On a first project we will run a free price comparison so you can check the numbers yourself.",
      ],
    ],
    formTitle: "Tell us what you need to source",
    formLead:
      "Within 24 hours your dedicated sourcing advisor will come back with a quote.",
    fName: "Name",
    fNamePh: "How should we address you",
    fEmail: "Email",
    fEmailPh: "you@company.com",
    fPhone: "Phone / WhatsApp",
    fPhonePh: "With country code, e.g. +1 415 555 0132",
    fProduct: "Product & quantity",
    fProductPh:
      "e.g. pet water fountain, 500 units — or paste a 1688 / Amazon link",
    fMessage: "Anything else",
    fMessagePh:
      "Target selling price, packaging, certifications, required delivery date…",
    fSubmit: "Send sourcing request",
    fSending: "Sending…",
    fOkTitle: "Request received",
    fOkDesc:
      "Your sourcing advisor will reply within 24 hours (business days) with quotes from 3 factories. If you do not hear from us, email hgm1230002@outlook.com directly.",
    fErr: "Something went wrong. Please retry, or email us directly.",
    fPrivacy:
      "Your details are used only to prepare this quote and are never shared with third parties.",
    contactTitle: "Or reach us directly",
    contactLead: "We usually reply within 2 hours during business hours.",
    ctaTitle: "Run a free price comparison before you commit",
    ctaLead:
      "Send us a product link. Within 24 hours you get the factory-direct price — compare it with what you pay today.",
  },

  es: {
    metaTitle:
      "Servicio de compras en China | Precio directo de fábrica, 486 vendedores atendidos",
    metaDesc:
      "GlobalTradeHub compra directamente en fábricas chinas: compra por encargo, inspección, almacenaje, reempaque y envío mundial. 486 vendedores transfronterizos atendidos, 30% de ahorro medio, inspección 100% antes del envío y cotización en 24 horas.",
    crumb: "Compras",
    heroBadge: "Directo de fábrica en China · Agencia de compras integral",
    heroTitle: "Recibe la mercancía directamente de la fábrica china",
    heroSub:
      "Búsqueda de proveedores, comparación de precios, muestras, inspección, embalaje y exportación: cubrimos toda la parte china por ti. 486 vendedores atendidos, 30% de ahorro medio y cada lote inspeccionado antes de salir.",
    heroNote:
      "Sin depósito inicial · Cotización en 24 horas · Atención en español, inglés y chino",
    ctaPrimary: "Solicitar cotización gratis",
    ctaSecondary: "Ver cómo funciona",
    stats: [
      ["486+", "vendedores atendidos"],
      ["30%", "ahorro medio en compras"],
      ["7-15 días", "de muestra a embarque"],
      ["100%", "inspección antes de enviar"],
    ],
    whyTitle: "Por qué los vendedores nos confían sus compras",
    whyLead:
      "No somos un intermediario que infla el precio: somos tu equipo de compras y control de calidad en China.",
    why: [
      [
        "Directo de fábrica, sin margen de intermediario",
        "Trabajamos directamente con fábricas de Yiwu, Cantón, Shenzhen y Ningbo y con proveedores de primer nivel de 1688. El mismo producto, normalmente 30% más barato que la cotización de un trader.",
      ],
      [
        "La calidad la controlamos nosotros",
        "Cada lote se inspecciona por completo antes del envío, con fotos y vídeo. La norma puede endurecerse de AQL 2.5 a 1.0 según tu exigencia. Lo que no pasa, vuelve a la fábrica.",
      ],
      [
        "Un solo contacto para toda la cadena",
        "Un gestor de cuenta bilingüe desde la primera cotización hasta los documentos de aduana. Una persona en lugar de perseguir a cinco proveedores.",
      ],
      [
        "Pedidos pequeños también: prueba y luego escala",
        "Desde 50 unidades. Envía un lote pequeño por aire para probar el mercado y pasa al marítimo cuando funcione. Menos riesgo de inventario.",
      ],
    ],
    flowTitle: "Cuatro pasos: tú solo apruebas",
    flowLead:
      "De media, 2-3 semanas desde el briefing hasta la llegada a tu almacén.",
    flow: [
      [
        "Envíanos tu briefing",
        "Producto, cantidad y precio de venta objetivo. Las fotos o enlaces ayudan. Cotización de fábrica y plan de compra en 24 horas.",
      ],
      [
        "Comparamos fábricas",
        "3-5 fábricas preseleccionadas cotizan en paralelo. Recibes precio de muestra, precio de volumen y nuestra recomendación con notas de riesgo.",
      ],
      [
        "Muestra e inspección",
        "La producción empieza tras aprobar la muestra. Inspección completa con vídeo antes del envío: si falla, no sale.",
      ],
      [
        "Embalaje y despacho",
        "Embalado y etiquetado según tu canal, enviado por aire, mar o express, con documentación aduanera completa.",
      ],
    ],
    advTitle: "Lo que ahorras va más allá del dinero",
    advLead:
      "Compras, inspección, almacenaje y logística en un solo equipo.",
    adv: [
      [
        "Costes transparentes",
        "La cotización detalla precio de fábrica, honorarios y flete. Sin recargos ocultos.",
      ],
      [
        "Control de calidad",
        "Inspección completa y vídeo de verificación. AQL 2.5 de serie, ajustable a 1.0.",
      ],
      [
        "Almacén y fulfillment",
        "30 días de almacenaje gratis en Yiwu y Shenzhen, con picking, packing y reetiquetado.",
      ],
      [
        "Documentos conformes",
        "Factura comercial, packing list y certificado de origen para tu aduana y las plataformas.",
      ],
    ],
    faqTitle: "Preguntas frecuentes",
    faq: [
      [
        "¿Cuál es el pedido mínimo?",
        "50 unidades en la mayoría de categorías y 200 en artículos personalizados. Recomendamos un primer envío aéreo pequeño y luego escalar.",
      ],
      [
        "¿Cómo se paga? ¿Es seguro?",
        "Lo habitual es 30% de anticipo y 70% antes del envío. El saldo se paga tras aprobar el vídeo de inspección. Los pedidos grandes pueden ir por cuenta corporativa o escrow.",
      ],
      [
        "¿Cómo garantizan el 30% de ahorro?",
        "Compramos directo a fábrica y mayoristas de primer nivel, y cobramos una tarifa de servicio publicada en lugar de un margen comercial. En el primer proyecto hacemos una comparación de precios gratuita para que lo verifiques tú mismo.",
      ],
    ],
    formTitle: "Cuéntanos qué necesitas comprar",
    formLead:
      "En 24 horas tu asesor de compras te enviará una cotización.",
    fName: "Nombre",
    fNamePh: "¿Cómo te llamamos?",
    fEmail: "Correo electrónico",
    fEmailPh: "tu@empresa.com",
    fPhone: "Teléfono / WhatsApp",
    fPhonePh: "Con código de país, ej. +52 55 1234 5678",
    fProduct: "Producto y cantidad",
    fProductPh:
      "Ej.: fuente de agua para mascotas, 500 unidades, o pega un enlace de 1688 / Amazon",
    fMessage: "Información adicional",
    fMessagePh:
      "Precio de venta objetivo, embalaje, certificaciones, fecha de entrega…",
    fSubmit: "Enviar solicitud",
    fSending: "Enviando…",
    fOkTitle: "Solicitud recibida",
    fOkDesc:
      "Tu asesor responderá en 24 horas (días laborables) con cotizaciones de 3 fábricas. Si no recibes respuesta, escribe a hgm1230002@outlook.com.",
    fErr: "No se pudo enviar. Inténtalo de nuevo o escríbenos por correo.",
    fPrivacy:
      "Usamos tus datos solo para preparar esta cotización y no los compartimos con terceros.",
    contactTitle: "También puedes contactarnos directamente",
    contactLead:
      "Normalmente respondemos en 2 horas dentro del horario laboral.",
    ctaTitle: "Compara precios gratis antes de decidir",
    ctaLead:
      "Envíanos un enlace del producto. En 24 horas tendrás el precio directo de fábrica para compararlo con lo que pagas hoy.",
  },

  pt: {
    metaTitle:
      "Serviço de compras na China | Preço direto de fábrica, 486 vendedores atendidos",
    metaDesc:
      "A GlobalTradeHub compra direto de fábricas chinesas: compra por encomenda, inspeção, armazenagem, reembalagem e envio mundial. 486 vendedores atendidos, 30% de economia média, inspeção 100% antes do embarque e cotação em 24 horas.",
    crumb: "Compras",
    heroBadge: "Direto da fábrica na China · Assessoria de compras completa",
    heroTitle: "Receba a mercadoria direto da fábrica chinesa",
    heroSub:
      "Busca de fornecedores, comparação de preços, amostras, inspeção, embalagem e exportação: cuidamos de toda a parte chinesa para você. 486 vendedores atendidos, 30% de economia média e cada lote inspecionado antes de embarcar.",
    heroNote:
      "Sem depósito antecipado · Cotação em 24 horas · Atendimento em português, inglês e chinês",
    ctaPrimary: "Pedir cotação grátis",
    ctaSecondary: "Ver como funciona",
    stats: [
      ["486+", "vendedores atendidos"],
      ["30%", "economia média em compras"],
      ["7-15 dias", "da amostra ao embarque"],
      ["100%", "inspeção antes do envio"],
    ],
    whyTitle: "Por que os vendedores confiam as compras a nós",
    whyLead:
      "Não somos um intermediário que infla o preço: somos o seu time de compras e controle de qualidade na China.",
    why: [
      [
        "Direto da fábrica, sem margem de intermediário",
        "Falamos direto com fábricas de Yiwu, Cantão, Shenzhen e Ningbo e com fornecedores de primeira linha do 1688. O mesmo produto, normalmente 30% abaixo da cotação de um trader.",
      ],
      [
        "A qualidade é verificada por nós",
        "Cada lote é inspecionado por completo antes do embarque, com fotos e vídeo. O padrão pode ser elevado de AQL 2.5 para 1.0 conforme a sua exigência. O que não passa volta para a fábrica.",
      ],
      [
        "Um único contato em toda a cadeia",
        "Um gestor de contas bilíngue da primeira cotação aos documentos de alfândega. Uma pessoa em vez de cinco fornecedores para cobrar.",
      ],
      [
        "Pedidos pequenos também: teste e depois escale",
        "A partir de 50 unidades. Envie um lote pequeno por via aérea para testar o mercado e passe para o marítimo quando vender. Menos risco de estoque.",
      ],
    ],
    flowTitle: "Quatro passos: você só aprova",
    flowLead:
      "Em média, 2-3 semanas do briefing até a chegada ao seu armazém.",
    flow: [
      [
        "Envie o briefing",
        "Produto, quantidade e preço de venda desejado. Fotos ou links ajudam. Cotação de fábrica e plano de compra em 24 horas.",
      ],
      [
        "Comparamos fábricas",
        "3-5 fábricas pré-selecionadas cotam em paralelo. Você recebe preço de amostra, preço de volume e nossa recomendação com notas de risco.",
      ],
      [
        "Amostra e inspeção",
        "A produção começa após a aprovação da amostra. Inspeção completa com vídeo antes do embarque: se reprovar, não sai.",
      ],
      [
        "Embalagem e envio",
        "Embalado e etiquetado conforme o seu canal, enviado por aéreo, marítimo ou expresso, com documentação aduaneira completa.",
      ],
    ],
    advTitle: "O que você economiza vai além do dinheiro",
    advLead: "Compras, inspeção, armazenagem e logística em um só time.",
    adv: [
      [
        "Custo transparente",
        "A cotação detalha preço de fábrica, taxa de serviço e frete. Sem acréscimos ocultos.",
      ],
      [
        "Controle de qualidade",
        "Inspeção completa e vídeo de verificação. AQL 2.5 como padrão, ajustável para 1.0.",
      ],
      [
        "Armazém e fulfillment",
        "30 dias de armazenagem grátis em Yiwu e Shenzhen, com separação, embalagem e reetiquetagem.",
      ],
      [
        "Documentos em conformidade",
        "Fatura comercial, packing list e certificado de origem para a sua alfândega e as plataformas.",
      ],
    ],
    faqTitle: "Perguntas frequentes",
    faq: [
      [
        "Qual é o pedido mínimo?",
        "50 unidades na maioria das categorias e 200 em itens personalizados. Recomendamos um primeiro envio aéreo pequeno e depois escalar.",
      ],
      [
        "Como funciona o pagamento? É seguro?",
        "O padrão é 30% de sinal e 70% antes do embarque. O saldo é pago após aprovar o vídeo de inspeção. Pedidos grandes podem ir por conta corporativa ou escrow.",
      ],
      [
        "Como vocês garantem 30% de economia?",
        "Compramos direto de fábricas e atacadistas de primeira linha e cobramos uma taxa de serviço publicada em vez de margem comercial. No primeiro projeto fazemos uma comparação de preços gratuita para você conferir.",
      ],
    ],
    formTitle: "Conte o que você precisa comprar",
    formLead:
      "Em 24 horas o seu consultor de compras envia uma cotação.",
    fName: "Nome",
    fNamePh: "Como podemos te chamar",
    fEmail: "E-mail",
    fEmailPh: "voce@empresa.com",
    fPhone: "Telefone / WhatsApp",
    fPhonePh: "Com código do país, ex. +55 11 91234 5678",
    fProduct: "Produto e quantidade",
    fProductPh:
      "Ex.: bebedouro para pets, 500 unidades, ou cole um link do 1688 / Amazon",
    fMessage: "Informações adicionais",
    fMessagePh:
      "Preço de venda desejado, embalagem, certificações, prazo de entrega…",
    fSubmit: "Enviar solicitação",
    fSending: "Enviando…",
    fOkTitle: "Solicitação recebida",
    fOkDesc:
      "Seu consultor responderá em 24 horas (dias úteis) com cotações de 3 fábricas. Se não receber resposta, escreva para hgm1230002@outlook.com.",
    fErr: "Não foi possível enviar. Tente novamente ou fale por e-mail.",
    fPrivacy:
      "Usamos seus dados apenas para preparar esta cotação e não os compartilhamos com terceiros.",
    contactTitle: "Você também pode falar direto com a gente",
    contactLead:
      "Normalmente respondemos em 2 horas dentro do horário comercial.",
    ctaTitle: "Compare preços grátis antes de decidir",
    ctaLead:
      "Envie o link do produto. Em 24 horas você recebe o preço direto de fábrica para comparar com o que paga hoje.",
  },
};
