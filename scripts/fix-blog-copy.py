# -*- coding: utf-8 -*-
# 修复 copy-a..d：按语种包分区替换（上一个脚本误把每文件的更新全打在第一个包上）
# - 被污染的包（es/fr/th/hi）：id1-10 标题+摘要全部重写
# - 其余包：id1 换新标题，摘要 1-10 换新，标题 2-10 保留
import io, re, os

BASE = os.path.join(os.path.dirname(__file__), "..", "lib", "blog")
FILES = ["copy-a.ts", "copy-b.ts", "copy-c.ts", "copy-d.ts"]

# 新标题(id1)与新摘要(1-10)
T1 = {
 "es": "Guía de selección de productos para e-commerce transfronterizo: categorías y marco de decisión",
 "pt": "Guia de seleção de produtos para e-commerce transfronteiriço: categorias e critérios de decisão",
 "ru": "Гайд по выбору товаров для трансграничной e-commerce: категории и рамка принятия решений",
 "ar": "دليل اختيار منتجات التجارة الإلكترونية العابرة للحدود: الفئات وإطار القرار",
 "fr": "Guide de sélection de produits pour l'e-commerce transfrontalier : catégories et grille de décision",
 "de": "Produktauswahl im grenzüberschreitenden E-Commerce: Kategorien und Entscheidungsrahmen",
 "ja": "越境EC商品選定ガイド：人気カテゴリーと判断フレームワーク",
 "ko": "국경 간 이커머스 상품 선정 가이드: 인기 카테고리와 판단 프레임워크",
 "th": "คู่มือเลือกสินค้าอีคอมเมิร์ซข้ามพรมแดน: หมวดหมู่ยอดนิยมและกรอบการตัดสินใจ",
 "vi": "Cẩm nang chọn sản phẩm thương mại điện tử xuyên biên giới: ngành hàng và khung ra quyết định",
 "id": "Panduan pemilihan produk e-commerce lintas negara: kategori dan kerangka keputusan",
 "tr": "Sınır ötesi e-ticaret ürün seçimi rehberi: kategoriler ve karar çerçevesi",
 "hi": "क्रॉस-बॉर्डर ई-कॉमर्स प्रोडक्ट चयन गाइड: लोकप्रिय श्रेणियाँ और निर्णय ढाँचा",
 "bn": "ক্রস-বর্ডার ই-কমার্স প্রোডাক্ট নির্বাচন গাইড: জনপ্রিয় ক্যাটাগরি ও সিদ্ধান্তের কাঠামো",
 "ur": "سرحد پار ای کامرس مصنوعات کے انتخاب کی گائیڈ: مقبول اقسام اور فیصلے کا فریم ورک",
 "fa": "راهنمای انتخاب محصول تجارت الکترونیک فرامرزی: دسته‌های پرطرفدار و چارچوب تصمیم‌گیری",
}

S = {
"es": {
1:"Sin especulaciones, solo criterios verificables: filtra categorías con cuatro filtros — margen, peso volumétrico, devoluciones y barreras de cumplimiento — y calcula con el modelo de economía unitaria si un SKU gana o pierde dinero.",
2:"Desglosa los tres requisitos que más problemas causan en la UE y EE. UU.: impuestos (IVA/IOSS), certificaciones (CE/FCC/FDA) y seguridad de producto (GPSR/CPC), con la lista de documentos que debes archivar antes de publicar.",
3:"Divide el coste logístico en cuatro tramos — primer tramo, despacho de aduanas, almacenamiento y última milla — entiende la estructura de costes del marítimo, el aéreo y el almacén local, y aprende a calcular el ritmo de reabastecimiento y el stock de seguridad.",
4:"Divide la operación en un embudo de cinco capas — impresiones, clics, carrito, pedidos y recompra — con palancas y acciones priorizadas para cada capa, evitando el «solo pongo anuncios y no toco la ficha».",
5:"Lista de herramientas organizada en cinco grupos — selección, palabras clave y fichas, costes y divisas, logística y cumplimiento — con usos concretos por escenario y una advertencia honesta: qué datos solo son fiables si conectas tus propias fuentes.",
6:"La oportunidad de LATAM no está en la cantidad de gente, sino en la densidad competitiva y los métodos de pago. Diferencias entre México y Brasil en idioma, número fiscal, pago y logística — y cómo filtrar productos con la regla de títulos de 60 caracteres.",
7:"El directo no es entusiasmo ante la cámara, sino subir en orden: entrada, permanencia, clic y conversión. Diseño de la cesta antes de emitir, guiones por bloques y una tabla de repaso tras el directo.",
8:"El almacén local no es un depósito, es un acelerador: citas de entrada y etiquetado, cálculo de rotación de inventario, lógica de elección de última milla y las categorías que no conviene tener en stock anticipado.",
9:"Comparación punto por punto de las dos plataformas principales del Sudeste Asiático: documentos de alta, estructura de comisiones, logística y sistema de sanciones — con un ritmo operativo para no acumular puntos de penalización.",
10:"No acumules métricas: quédate con las que cambian decisiones — tráfico, conversión, ticket, margen y salud de cuenta — con un tablero semanal y el marco de tres niveles SKU-tienda-caja.",
},
"pt": {
1:"Sem achismos, apenas critérios verificáveis: filtre categorias com quatro filtros — margem, peso volumétrico, devoluções e barreiras de conformidade — e calcule pela economia unitária se um SKU dá lucro ou prejuízo.",
2:"Desmonte os três requisitos que mais causam problemas na UE e EUA: impostos (IVA/IOSS), certificações (CE/FCC/FDA) e segurança do produto (GPSR/CPC), com a lista de documentos para arquivar antes de publicar.",
3:"Divida o custo logístico em quatro segmentos — frete inicial, desembaraço aduaneiro, armazenagem e última milha — entenda a estrutura de custos do marítimo, aéreo e armazém local, e aprenda a calcular o ritmo de reposição e o estoque de segurança.",
4:"Divida a operação em um funil de cinco camadas — impressões, cliques, carrinho, pedidos e recompra — com alavancas e ações priorizadas para cada camada, evitando o «só anúncio sem mexer na página».",
5:"Lista de ferramentas em cinco grupos — seleção, palavras-chave e fichas, custos e câmbio, logística e conformidade — com usos concretos por cenário e um aviso honesto: quais dados só são confiáveis quando você conecta suas próprias fontes.",
6:"A oportunidade na LATAM não está no número de pessoas, mas na densidade competitiva e nos métodos de pagamento. Diferenças entre México e Brasil em idioma, número fiscal, pagamento e logística — e como filtrar produtos com a regra de títulos de 60 caracteres.",
7:"A live não é empolgação diante da câmera, mas subir em ordem: entrada, permanência, clique e conversão. Desenho da cesta antes de transmitir, roteiro por blocos e uma tabela de revisão depois.",
8:"O armazém local não é depósito, é acelerador: agendamento de entrada e etiquetagem, cálculo de giro de estoque, lógica de escolha da última milha e as categorias que não valem estoque antecipado.",
9:"Comparação ponto a ponto das duas plataformas principais do Sudeste Asiático: documentos de cadastro, estrutura de comissões, logística e sistema de punições — com um ritmo operacional para não acumular pontos de penalidade.",
10:"Não acumule métricas: fique com as que mudam decisões — tráfego, conversão, ticket, margem e saúde da conta — com um painel semanal e o quadro de três níveis SKU-loja-caixa.",
},
"ru": {
1:"Без эзотерики, только проверяемые критерии: отфильтруйте категории четырьмя фильтрами — маржа, объёмный вес, возвраты и сертификация — и посчитайте юнит-экономику, чтобы понять, зарабатывает SKU или теряет.",
2:"Разбираем три типа требований, на которых чаще всего спотыкаются в ЕС и США: налоги (VAT/IOSS), сертификация (CE/FCC/FDA) и безопасность товара (GPSR/CPC), плюс список документов, которые нужно собрать до публикации.",
3:"Разбиваем логистические затраты на четыре участка — фрахт, таможня, складирование и последняя миля — показываем структуру расходов морских, авиа и складов за рубежом и учим считать ритм пополнения и страховой запас.",
4:"Разбиваем операционку на воронку из пяти слоёв — показы, клики, корзина, заказы, повторные покупки — с рычагами и приоритетными действиями для каждого слоя, без подхода «кручу рекламу, а карточку не трогаю».",
5:"Список инструментов в пяти группах — выбор товара, ключевые слова и карточки, издержки и курсы, логистика и комплаенс — с конкретными сценариями применения и честной оговоркой: какие данные надёжны только при подключении ваших собственных источников.",
6:"Возможность Латинской Америки — не в населении, а в плотности конкуренции и способах оплаты. Различия Мексики и Бразилии в языке, налоговых номерах, платежах и логистике — и как отбирать товары по правилу заголовков в 60 символов.",
7:"Эфир — это не азарт перед камерой, а рост по порядку: вход, удержание, клик, конверсия. Дизайн витрины до эфира, сценарий по блокам и таблица разбора после.",
8:"Зарубежный склад — не хранилище, а ускоритель: запись на приёмку и маркировка, расчёт оборачиваемости, логика выбора последней мили и категории, которые не стоит везти заранее.",
9:"Постраничное сравнение двух главных платформ Юго-Восточной Азии: документы для входа, структура комиссий, логистика и система штрафов — с рабочим ритмом, который не копит штрафные баллы.",
10:"Не копите метрики: оставьте те, что меняют решения — трафик, конверсия, средний чек, маржа и здоровье аккаунта — с недельным дашбордом и рамкой из трёх уровней: SKU-магазин-кэшфлоу.",
},
"ar": {
1:"بلا تخمين، معايير قابلة للتحقق فقط: صفِّ الفئات بأربعة مرشحات — هامش الربح، الوزن الحجمي، المرتجعات وعوائق الاعتماد — ثم احسب الاقتصاد الوحداتي لمعرفة هل الربح حقيقي أم خسارة.",
2:"نفكك ثلاثة أنواع من المتطلبات هي الأكثر سببًا للمشكلات في الاتحاد الأوروبي والولايات المتحدة: الضرائب (VAT/IOSS)، الشهادات (CE/FCC/FDA) وسلامة المنتج (GPSR/CPC)، مع قائمة المستندات الواجب حفظها قبل النشر.",
3:"قسّم تكاليف اللوجستيات إلى أربعة أجزاء — الشحن الأول، التخليص الجمركي، التخزين والميل الأخير — وافهم هيكل تكاليف الشحن البحري والجوي والمستودع المحلي، مع طريقة حساب إيقاع إعادة التوريد ومخزون الأمان.",
4:"قسّم العمليات إلى قمع من خمس طبقات — ظهور، نقرات، سلة، طلبات وإعادة شراء — مع رافعة وإجراءات مرتبة حسب الأولوية لكل طبقة، وتجنّب أسلوب «إعلانات بلا تعديل لصفحة المنتج».",
5:"قائمة أدوات موزعة على خمس مجموعات — اختيار المنتجات، الكلمات المفتاحية والصفحات، التكاليف والعملات، اللوجستيات والامتثال — مع استخدامات محددة لكل حالة وتنبيه صادق: أي البيانات لا تُعتمد إلا بربط مصادرك الخاصة.",
6:"الفرصة في أمريكا اللاتينية ليست في عدد السكان، بل في كثافة المنافسة ووسائل الدفع. فروق المكسيك والبرازيل في اللغة والرقم الضريبي والدفع والشحن — وكيف تنتقي المنتجات بقاعدة العناوين من 60 حرفًا.",
7:"البث المباشر ليس حماسًا أمام الكاميرا، بل تصاعدًا مرتبًا: الدخول، البقاء، النقر، التحويل. تصميم تشكيلة السلع قبل البث، وسكربت مقسم، وجدول مراجعة بعد البث.",
8:"المستودع الخارجي ليس مخزنًا بل مُسرِّع: مواعيد الاستلام والتغليف، حساب دوران المخزون، منطق اختيار الميل الأخير، والفئات التي لا يُنصح بتخزينها مسبقًا.",
9:"مقارنة بندًا ببند للمنصتين الرئيسيتين في جنوب شرق آسيا: مستندات التسجيل، هيكل العمولات، اللوجستيات ونظام العقوبات — مع إيقاع تشغيلي لا يراكم نقاط الخصم.",
10:"لا تكدّس المقاييس: احتفظ بما يغيّر القرارات — الزيارات، التحويل، متوسط السلة، الهامش وصحة الحساب — مع لوحة أسبوعية وإطار من ثلاثة مستويات: المنتج-المتجر-التدفق النقدي.",
},
"fr": {
1:"Pas de recettes magiques, seulement des critères vérifiables : filtrez les catégories avec quatre filtres — marge, poids volumétrique, retours et barrières de conformité — puis calculez l'unit economics pour savoir si un SKU gagne ou perd de l'argent.",
2:"Décortique les trois exigences qui posent le plus de problèmes dans l'UE et aux États-Unis : taxes (TVA/IOSS), certifications (CE/FCC/FDA) et sécurité produit (GPSR/CPC), avec la liste des documents à archiver avant la mise en ligne.",
3:"Découpez le coût logistique en quatre segments — fret amont, dédouanement, stockage et dernier kilomètre — comprenez la structure de coûts du maritime, de l'aérien et de l'entrepôt local, et apprenez à calculer le rythme de réapprovisionnement et le stock de sécurité.",
4:"Découpez l'opération en un tunnel à cinq étages — impressions, clics, panier, commandes et rachat — avec leviers et actions priorisées pour chaque étage, et évitez le « je pousse les pubs sans toucher à la fiche ».",
5:"Liste d'outils en cinq groupes — sélection, mots-clés et fiches, coûts et devises, logistique et conformité — avec des usages concrets par scénario et un avertissement honnête : quelles données ne sont fiables qu'en branchant vos propres sources.",
6:"L'opportunité latino-américaine ne tient pas au nombre d'habitants, mais à la densité concurrentielle et aux moyens de paiement. Différences Mexique/Brésil en langue, numéro fiscal, paiement et logistique — et comment filtrer les produits avec la règle des titres à 60 caractères.",
7:"Le live, ce n'est pas la flamme devant la caméra mais une progression ordonnée : entrée, rétention, clic, conversion. Conception de la vitrine avant l'émission, script par blocs et tableau de débriefing après.",
8:"L'entrepôt local n'est pas un dépôt mais un accélérateur : rendez-vous de réception et étiquetage, calcul de la rotation des stocks, logique du choix du dernier kilomètre et catégories à ne pas stocker en avance.",
9:"Comparaison point par point des deux plateformes phares d'Asie du Sud-Est : documents d'inscription, structure des commissions, logistique et système de sanctions — avec un rythme opérationnel qui n'accumule pas de points de pénalité.",
10:"N'empilez pas les métriques : gardez celles qui changent les décisions — trafic, conversion, panier moyen, marge et santé du compte — avec un tableau hebdomadaire et le cadre à trois niveaux SKU-boutique-cash.",
},
"de": {
1:"Keine Magie, nur überprüfbare Kriterien: Filtern Sie Kategorien mit vier Filtern — Marge, Volumengewicht, Retouren und Zulassungshürden — und rechnen Sie die Unit Economics durch, um zu sehen, ob ein SKU Gewinn oder Verlust bringt.",
2:"Die drei Anforderungsbereiche, an denen es in EU und USA am häufigsten hakt: Steuern (VAT/IOSS), Zertifizierungen (CE/FCC/FDA) und Produktsicherheit (GPSR/CPC) — plus Checkliste der Unterlagen, die vor dem Listing archiviert sein müssen.",
3:"Logistikkosten in vier Abschnitte zerlegen — Hauptlauf, Zollabfertigung, Lagerung und letzte Meile — die Kostenstruktur von See, Luft und Auslandslager verstehen und Nachschubrhythmus sowie Sicherheitsbestand berechnen.",
4:"Zerlegen Sie die Operationsarbeit in einen fünfstufigen Trichter — Impressionen, Klicks, Warenkorb, Bestellungen und Wiederkauf — mit Hebeln und priorisierten Maßnahmen pro Stufe; weg vom «nur Werbung schalten, ohne das Listing anzufassen».",
5:"Werkzeugliste in fünf Gruppen — Produktauswahl, Keywords und Listings, Kosten und Währungen, Logistik und Compliance — mit konkreten Anwendungsfällen pro Szene und einem ehrlichen Hinweis: welche Daten erst mit Ihren eigenen Quellen belastbar sind.",
6:"Die Chance in Lateinamerika liegt nicht in der Bevölkerungszahl, sondern in Wettbewerbsdichte und Zahlungsmethoden. Mexiko vs. Brasilien bei Sprache, Steuernummer, Zahlung und Logistik — und wie Sie mit der 60-Zeichen-Titelregel Produkte filtern.",
7:"Beim Livestream zählt nicht Enthusiasmus vor der Kamera, sondern aufsteigende Reihenfolge: Einstieg, Verweildauer, Klick, Konversion. Sortimentsdesign vor dem Start, Skript in Blöcken und eine Auswertungstabelle danach.",
8:"Das Auslandslager ist kein Depot, sondern ein Beschleuniger: Annahmetermine und Etikettierung, Berechnung der Lagerumschlagshäufigkeit, Auswahllogik der letzten Meile und Kategorien, die sich nicht vorrätig lohnen.",
9:"Punkt-für-Punkt-Vergleich der beiden Hauptplattformen Südostasiens: Anmeldeunterlagen, Kommissionsstruktur, Logistik und Strafsystem — plus ein Betriebsrhythmus, der keine Strafpunkte anhäuft.",
10:"Kein Metrikkarussell: behalten Sie nur die, die Entscheidungen verändern — Traffic, Conversion, Warenkorbwert, Marge und Konto-Gesundheit — mit Wochen-Dashboard und dem dreistufigen Rahmen SKU-Shop-Cashflow.",
},
"ja": {
1:"勘に頼らず、検証できる基準だけを使う：利益率、容積重量、返品率、認証ハードルという4つのフィルターでカテゴリーを絞り込み、ユニットエコノミクスで1つのSKUが本当に黒字かを計算します。",
2:"EUと米国でつまずきやすい3種類の要件を分解して解説：税金（VAT/IOSS）、認証（CE/FCC/FDA）、製品安全（GPSR/CPC）。出品前に揃えておくべき書類チェックリスト付き。",
3:"物流コストを主輸送、通関、保管、ラストマイルの4区間に分解。海運・航空・海外倉庫それぞれのコスト構造を解きほぐし、発注リズムと安全在庫の計算方法までお伝えします。",
4:"運営を表示、クリック、カート、注文、再購入の5層ファネルに分解し、各層ごとの打ち手と優先アクションを提示。「広告だけ出してページを直さない」型の無駄打ちを避けるための整理法です。",
5:"ツールを5分類で整理：選品、キーワードとリスティング、コストと為替、物流、コンプライアンス。それぞれの具体的な使い方に加え、「自分のデータソースをつなぐまでは信頼できないデータ」もはっきり示します。",
6:"ラテンアメリカのチャンスは人口の多さではなく、競合の密度と決済手段にあります。メキシコとブラジルの言語・税番号・決済・物流の違いと、60文字タイトルのルールで商品をふるいにかける方法を解説。",
7:"ライブ配信で大切なのはカメラ前の勢いではなく、流入→滞在→クリック→コンバージョンの順に数字を積み上げること。本番前の品揃え設計、ブロック別のトーク構成、配信後の振り返り表まで揃えています。",
8:"海外倉庫はただの保管庫ではなく加速装置です。入庫予約とラベリング、在庫回転の計算方法、ラストマイル選定の考え方、そして先行在庫を置くべきでないカテゴリーまで整理しました。",
9:"東南アジアの2大プラットフォームを項目別に比較：出店書類、手数料体系、物流スキーム、違反ポイント制度。減点を積まないための運営リズムも提案します。",
10:"指標を山盛りにしない。意思決定を変える5組だけ残す：トラフィック、コンバージョン、客単価、利益、アカウント健全性。週次ダッシュボードと、SKU→ストア→キャッシュフローの3層フレームワークを添えて。",
},
"ko": {
1:"감이 아닌 검증 가능한 기준만 사용하세요. 마진, 부피 무게, 반품률, 인증 장벽이라는 네 가지 필터로 카테고리를 걸러내고, 단위 경제 모델로 SKU 하나가 실제로 수익인지 계산합니다.",
2:"EU와 미국에서 가장 많이 걸리는 세 가지 요구사항을 나눠 설명합니다. 세금(VAT/IOSS), 인증(CE/FCC/FDA), 제품 안전(GPSR/CPC), 그리고 판매 등록 전 준비해야 할 서류 목록까지.",
3:"물류 비용을 첫 구간, 통관, 보관, 라스트 마일 네 구간으로 나누고, 해상·항공·해외창고 각각의 비용 구조를 설명하며, 발주 주기와 안전 재고 계산법까지 다룹니다.",
4:"운영을 노출, 클릭, 장바구니, 주문, 재구매 다섯 층 퍼널로 나누고, 각 층의 개선 지렛대와 우선 액션을 제시합니다. 광고만 돌리고 상세페이지는 안 고치는 식의 낭비를 피하는 정리법입니다.",
5:"도구를 다섯 범주로 정리합니다. 선정, 키워드와 리스팅, 비용과 환율, 물류, 컴플라이언스. 각 시나리오별 구체적 사용법과 함께 '내 데이터 소스를 연결하기 전까지는 믿을 수 없는 데이터'도 솔직하게 짚어줍니다.",
6:"라틴아메리카의 기회는 인구가 아니라 경쟁 밀도와 결제 방식에 있습니다. 멕시코와 브라질의 언어·세금 번호·결제·물류 차이와, 60자 타이틀 규칙으로 상품을 걸러내는 방법까지 다룹니다.",
7:"라이브 방송의 핵심은 카메라 앞 열정이 아니라 유입→체류→클릭→전환 순서로 수치를 쌓는 것입니다. 방송 전 상품 구성 설계, 블록별 톡 구성, 방송 후 복기표까지 다룹니다.",
8:"해외창고는 단순 보관창고가 아니라 가속기입니다. 입고 예약과 라벨링, 재고 회전율 계산법, 라스트 마일 선택 논리, 그리고 선재고를 두지 말아야 할 카테고리까지 정리했습니다.",
9:"동남아 2대 플랫폼을 항목별로 비교합니다. 입점 서류, 수수료 구조, 물류 방안, 위반 점수제. 감점을 쌓지 않는 운영 리듬 제안까지 포함했습니다.",
10:"지표를 잔뜩 모으지 마세요. 의사결정을 바꾸는 다섯 세트만 남깁니다. 트래픽, 전환, 객단가, 마진, 계정 건강도. 주간 대시보드와 SKU→스토어→캐시플로 3층 프레임워크를 함께 담았습니다.",
},
"th": {
1:"ไม่ต้องเดา ใช้เกณฑ์ที่ตรวจสอบได้เท่านั้น: กรองหมวดหมู่ด้วยตัวกรอง 4 ด่าน — อัตรากำไร น้ำหนักตามปริมาตร อัตราคืนสินค้า และข้อกำหนดการรับรอง — แล้วคำนวณเศรษฐศาสตร์ต่อหน่วยว่า SKU หนึ่งชิ้นกำไรจริงหรือขาดทุน",
2:"แยกวิเคราะห์ข้อกำหนด 3 ประเภทที่ทำให้สะดุดบ่อยที่สุดใน EU และสหรัฐฯ: ภาษี (VAT/IOSS) การรับรอง (CE/FCC/FDA) และความปลอดภัยของสินค้า (GPSR/CPC) พร้อมรายการเอกสารที่ต้องจัดเก็บก่อนขึ้นขาย",
3:"แบ่งต้นทุนโลจิสติกส์เป็น 4 ช่วง — ขนส่งต้นทาง พิธีการศุลกากร การจัดเก็บ และไมล์สุดท้าย — เจาะโครงสร้างต้นทุนของเรือ เครื่องบิน และคลังสินค้าต่างประเทศ พร้อมวิธีคำนวณจังหวะเติมสต็อกและสต็อกเพื่อความปลอดภัย",
4:"แบ่งงานดูแลร้านเป็นกระบวนการ 5 ชั้น — การแสดงผล คลิก ตะกร้า ออร์เดอร์ และการซื้อซ้ำ — พร้อมจุดควบคุมและลำดับการลงมือทำของแต่ละชั้น เพื่อเลี่ยงการเทเงินโฆษณาโดยไม่ปรับหน้าสินค้า",
5:"จัดเครื่องมือเป็น 5 กลุ่ม — การเลือกสินค้า คีย์เวิร์ดและหน้าสินค้า ต้นทุนและอัตราแลกเปลี่ยน โลจิสติกส์ และคอมไพลแอนซ์ — พร้อมวิธีใช้จริงในแต่ละสถานการณ์ และสารภาพว่าข้อมูลไหนต้องเชื่อมแหล่งข้อมูลของคุณเองจึงเชื่อถือได้",
6:"โอกาสในละตินอเมริกาไม่ได้อยู่ที่จำนวนคน แต่อยู่ที่ความหนาแน่นของคู่แข่งและวิธีชำระเงิน เจาะความต่างของเม็กซิโกและบราซิลด้านภาษา เลขทะเบียนภาษี การชำระเงิน และโลจิสติกส์ พร้อมวิธีกรองสินค้าด้วยกฎชื่อ 60 ตัวอักษร",
7:"ไลฟ์สตรีมมิ่งไม่ใช่ความมันส์หน้ากล้อง แต่คือการทำตัวเลขตามลำดับ — เข้าถึง อยู่นาน คลิก แปลงเป็นยอดขาย — พร้อมการออกแบบชุดสินค้าก่อนเปิดไลฟ์ โครงสร้างสคริปต์แบ่งบล็อก และตารางทบทวนหลังปิดไลฟ์",
8:"คลังสินค้าต่างประเทศไม่ใช่แค่ที่เก็บ แต่เป็นตัวเร่ง: การนัดรับเข้าคลังและติดฉลาก วิธีคำนวณการหมุนเวียนสต็อก ตรรกะการเลือกไมล์สุดท้าย และหมวดหมู่ที่ไม่ควรเก็บสต็อกล่วงหน้า",
9:"เปรียบเทียบสองแพลตฟอร์มหลักของเอเชียตะวันออกเฉียงใต้รายหัวข้อ — เอกสารสมัคร โครงสร้างค่าธรรมเนียม แผนโลจิสติกส์ และระบบหักคะแนน — พร้อมจังหวะทำงานที่ไม่สะสมคะแนนถูกหัก",
10:"อย่ากองเมตริกมากเกินไป เก็บไว้เฉพาะชุดที่เปลี่ยนการตัดสินใจ — ทราฟฟิก อัตราแปลง มูลค่าต่อออร์เดอร์ กำไร และสุขภาพร้าน — พร้อมดีบอกรายสัปดาห์และกรอบสามชั้น สินค้า-ร้าน-กระแสเงินสด",
},
"vi": {
1:"Không phỏng đoán, chỉ dùng tiêu chí kiểm chứng được: lọc ngành hàng qua bốn màng — biên lợi nhuận, trọng lượng thể tích, tỷ lệ hoàn trả và rào cản chứng nhận — rồi tính kinh tế đơn vị để biết một SKU có thực sự lãi không.",
2:"Phân tích ba nhóm yêu cầu dễ vấp nhất ở EU và Mỹ: thuế (VAT/IOSS), chứng nhận (CE/FCC/FDA) và an toàn sản phẩm (GPSR/CPC), kèm danh mục hồ sơ cần lưu trữ trước khi đăng bán.",
3:"Chia chi phí logistics thành bốn chặng — vận tải đầu, thông quan, lưu kho và chặng cuối — làm rõ cơ cấu chi phí của đường biển, đường hàng không và kho nước ngoài, cùng cách tính nhịp nhập hàng và tồn kho an toàn.",
4:"Chia vận hành thành phễu năm tầng — hiển thị, nhấp chuột, giỏ hàng, đơn hàng và mua lại — kèm đòn bẩy và hành động ưu tiên cho từng tầng, tránh kiểu «đổ tiền quảng cáo mà không sửa trang sản phẩm».",
5:"Danh sách công cụ chia theo năm nhóm — chọn hàng, từ khóa và trang sản phẩm, chi phí và tỷ giá, logistics, tuân thủ — kèm cách dùng cụ thể cho từng tình huống và lưu ý thẳng thắn: dữ liệu nào chỉ đáng tin khi bạn kết nối nguồn của riêng mình.",
6:"Cơ hội ở Mỹ Latinh không nằm ở số dân mà ở mật độ cạnh tranh và phương thức thanh toán. Khác biệt giữa Mexico và Brazil về ngôn ngữ, mã số thuế, thanh toán, logistics — và cách lọc sản phẩm bằng quy tắc tiêu đề 60 ký tự.",
7:"Livestream không phải là sự sôi nổi trước camera mà là xếp số theo thứ tự: vào phòng, ở lại, nhấp chuột, chuyển đổi. Thiết kế giỏ hàng trước buổi live, kịch bản theo khối và bảng tổng kết sau khi tắt máy.",
8:"Kho nước ngoài không phải kho chứa mà là bộ tăng tốc: đặt lịch nhập kho và dán nhãn, cách tính vòng quay tồn kho, logic chọn chặng cuối và các ngành hàng không nên đặt tồn trước.",
9:"So sánh từng mục giữa hai nền tảng chính của Đông Nam Á: hồ sơ đăng ký, cấu trúc phí, phương án vận chuyển và hệ thống trừ điểm — kèm nhịp vận hành tránh tích lũy điểm phạt.",
10:"Đừng chất đống chỉ số: giữ lại những cái đổi được quyết định — lưu lượng, chuyển đổi, giá trị đơn, biên lợi nhuận và sức khỏe tài khoản — cùng bảng theo dõi tuần và khung ba tầng SKU-cửa hàng-dòng tiền.",
},
"id": {
1:"Tanpa mistik, hanya kriteria yang bisa diverifikasi: saring kategori dengan empat saringan — margin, berat volume, tingkat retur, dan hambatan sertifikasi — lalu hitung ekonomi unit untuk tahu apakah satu SKU benar-benar untung.",
2:"Bedah tiga jenis persyaratan yang paling sering jadi masalah di Uni Eropa dan AS: pajak (VAT/IOSS), sertifikasi (CE/FCC/FDA), dan keamanan produk (GPSR/CPC), plus daftar dokumen yang wajib diarsipkan sebelum listing.",
3:"Pecah biaya logistik menjadi empat segmen — pengiriman awal, kepabeanan, penyimpanan, dan mil terakhir — pahami struktur biaya laut, udara, dan gudang luar negeri, serta cara menghitung ritme restock dan stok pengaman.",
4:"Bagi operasional menjadi corong lima lapis — tayangan, klik, keranjang, pesanan, dan pembelian ulang — lengkap dengan tuas dan aksi prioritas tiap lapis, hindari gaya «iklan jalan terus tapi halaman produk tidak pernah diperbaiki».",
5:"Daftar alat dalam lima kelompok — pemilihan produk, kata kunci dan listing, biaya dan kurs, logistik, kepatuhan — dengan cara pakai konkret per skenario dan catatan jujur: data mana yang hanya bisa dipercaya setelah Anda sambungkan sumber sendiri.",
6:"Peluang di Amerika Latin bukan pada jumlah penduduk, melainkan pada kepadatan kompetisi dan metode pembayaran. Perbedaan Meksiko dan Brasil dalam bahasa, nomor pajak, pembayaran, dan logistik — serta cara menyaring produk dengan aturan judul 60 karakter.",
7:"Live streaming bukan semangat di depan kamera, melainkan menaikkan angka secara berurutan: masuk, bertahan, klik, konversi. Desain kurasi produk sebelum mulai, naskah per blok, dan tabel evaluasi setelah selesai.",
8:"Gudang luar negeri bukan sekadar penyimpanan, melainkan akselerator: jadwal penerimaan dan pelabelan, cara menghitung perputaran stok, logika pemilihan mil terakhir, dan kategori yang sebaiknya tidak distok di muka.",
9:"Perbandingan poin per poin dua platform utama Asia Tenggara: dokumen pendaftaran, struktur komisi, skema logistik, dan sistem poin pelanggaran — plus ritme operasional agar poin hukuman tidak menumpuk.",
10:"Jangan menumpuk metrik: simpan hanya yang mengubah keputusan — trafik, konversi, nilai pesanan, margin, dan kesehatan akun — lengkap dengan dasbor mingguan dan kerangka tiga lapis SKU-toko-arus kas.",
},
"tr": {
1:"Falcılık yok, yalnızca doğrulanabilir ölçütler: kategorileri dört filtreyle ele — marj, hacim ağırlığı, iade oranı ve sertifikasyon bariyeri — sonra birim ekonomiyi hesapla; bir SKU gerçekten kâr mı ediyor, görürsün.",
2:"AB ve ABD'de en çok sorun çıkaran üç gerekliliği ayırın: vergiler (VAT/IOSS), sertifikalar (CE/FCC/FDA) ve ürün güvenliği (GPSR/CPC) — listelemeye başlamadan önce arşivlemeniz gereken belge listesiyle.",
3:"Lojistik maliyetini dört parçaya bölün — ana taşıma, gümrük, depolama ve son mil — deniz, hava ve yurtdışı depo maliyet yapısını çözün ve ikmal ritmi ile emniyet stokunu hesaplamayı öğrenin.",
4:"Operasyonu beş katlı bir huniye bölün — gösterim, tıklama, sepet, sipariş ve yeniden satın alma — her kat için kaldıraç ve öncelik sırasına göre aksiyonlar; «sadece reklam verip ürün sayfasına dokunmama» tuzağına düşmeden.",
5:"Araç listesi beş grupta — ürün seçimi, anahtar kelimeler ve listeler, maliyet ve kur, lojistik ve uyum — senaryo başına somut kullanımlar ve dürüst bir uyarıyla: hangi veriler kendi kaynaklarınızı bağlamadan güvenilir olmaz.",
6:"Latin Amerika'daki fırsat nüfusun çokluğunda değil, rekabet yoğunluğu ve ödeme yöntemlerindedir. Meksiko ile Brezilya'nın dil, vergi numarası, ödeme ve lojistik farkları — ve 60 karakterlik başlık kuralıyla ürünü eleme yöntemi.",
7:"Canlı yayın kameraya karşı coşku değil, sırayla sayı yükseltmektir: giriş, kalma, tıklama, dönüşüm. Yayından önce ürün sepeti tasarımı, blok blok senaryo ve yayından sonra değerlendirme tablosu.",
8:"Yurtdışı depo bir ambar değil, hızlandırıcıdır: kabul randevusu ve etiketleme, stok devir hızının hesabı, son mil seçim mantığı ve önceden stoklanmaması gereken kategoriler.",
9:"Güneydoğu Asya'nın iki ana platformunu madde madde karşılaştırın: kayıt belgeleri, komisyon yapısı, lojistik planı ve ceza puanı sistemi — ceza puanı biriktirmeyen iş ritmiyle.",
10:"Metrik yığını yapmayın: kararı değiştirenlere yer açın — trafik, dönüşüm, sepet değeri, marj ve hesap sağlığı — haftalık panel ve SKU-mağaza-nakit akışı üç katlı çerçeveyle.",
},
"hi": {
1:"अंदाज़े नहीं, केवल सत्यापित मापदंड: मार्जिन, वॉल्यूमेट्रिक वज़न, रिटर्न दर और सर्टिफिकेशन बाधा — चार फ़िल्टरों से श्रेणियाँ छानें, फिर यूनिट इकोनॉमिक्स से गणना करें कि एक SKU सच में लाभ देता है या नहीं।",
2:"EU और अमेरिका में सबसे ज़्यादा अटकाव लाने वाली तीन आवश्यकताओं को खोलकर समझें: कर (VAT/IOSS), प्रमाणन (CE/FCC/FDA) और उत्पाद सुरक्षा (GPSR/CPC) — लिस्टिंग से पहले तैयार रखने वाले दस्तावेज़ों की सूची सहित।",
3:"लॉजिस्टिक्स लागत को चार खंडों में बाँटें — मुख्य परिवहन, कस्टम्स, वेयरहाउसिंग और अंतिम मील — समुद्री, हवाई और विदेश वेयरहाउस की लागत संरचना समझें और रीस्टॉक चक्र व सेफ़्टी स्टॉक की गणना सीखें।",
4:"ऑपरेशन को पाँच परतों के फ़नल में बाँटें — इम्प्रेशन, क्लिक, कार्ट, ऑर्डर और रीपरचेज — हर परत के लिए लीवर और प्राथमिकता वाले कदम; «सिर्फ़ विज्ञापन चलाओ, लिस्टिंग नहीं सुधारो» वाली बर्बादी से बचें।",
5:"टूल सूची पाँच समूहों में — प्रोडक्ट चयन, कीवर्ड और लिस्टिंग, लागत और करेंसी, लॉजिस्टिक्स, कंप्लायंस — हर सीन में स्पष्ट उपयोग और ईमानदार चेतावनी के साथ: कौन-सा डेटा तभी भरोसेमंद है जब आप अपने डेटा स्रोत जोड़ें।",
6:"लैटिन अमेरिका का मौका आबादी में नहीं, प्रतिस्पर्धा के घनत्व और पेमेंट तरीकों में है। मेक्सिको और ब्राज़ील के भाषा, टैक्स नंबर, पेमेंट और लॉजिस्टिक्स के अंतर — और 60-अक्षर टाइटल नियम से प्रोडक्ट छानने का तरीका।",
7:"लाइव स्ट्रीम कैमरे के सामने जोश नहीं, बल्कि क्रम से नंबर चढ़ाना है: एंट्री, ठहराव, क्लिक, कन्वर्ज़न। शुरू करने से पहले प्रोडक्ट मिक्स की डिज़ाइन, ब्लॉक-वार स्क्रिप्ट और लाइव के बाद रिव्यू टेबल सहित।",
8:"विदेश वेयरहाउस केवल भंडार नहीं, एक्सेलरेटर है: इनवाउंड अपॉइंटमेंट और लेबलिंग, इन्वेंटरी टर्नओवर की गणना, लास्ट-माइल चयन का लॉजिक और वे श्रेणियाँ जिन पर पहले से स्टॉक रखना ठीक नहीं।",
9:"दक्षिण-पूर्व एशिया के दो मुख्य प्लेटफ़ॉर्म की बिंदु-वार तुलना: रजिस्ट्रेशन दस्तावेज़, कमीशन संरचना, लॉजिस्टिक्स योजना और वायोलेशन पॉइंट सिस्टम — कटौती रोकने वाली ऑपरेटिंग लय सहित।",
10:"मेट्रिक्स का ढेर न लगाएँ: सिर्फ़ वही रखें जो निर्णय बदलें — ट्रैफ़िक, कन्वर्ज़न, ऑर्डर वैल्यू, मार्जिन और अकाउंट हेल्थ — साप्ताहिक डैशबोर्ड और SKU-स्टोर-कैशफ़्लो तीन-स्तरीय ढाँचे के साथ।",
},
"bn": {
1:"অনুমান নয়, শুধু যাচাইযোগ্য মানদণ্ড: মার্জিন, ভলিউমেট্রিক ওজন, রিটার্ন হার ও সার্টিফিকেশন বাধা — চারটি ফিল্টার দিয়ে ক্যাটাগরি ছেঁকে নিন, তারপর ইউনিট ইকোনমিক্স হিসাব করে দেখুন একটি SKU আসলে লাভ দেয় কি না।",
2:"EU ও যুক্তরাষ্ট্রে সবচেয়ে বেশি সমস্যায় ফেলে এমন তিন ধরনের শর্ত আলাদা করে দেখুন: কর (VAT/IOSS), সার্টিফিকেশন (CE/FCC/FDA) ও পণ্য নিরাপত্তা (GPSR/CPC) — লিস্টিংয়ের আগে সংরক্ষণ করা জরুরি কাগজপত্রের তালিকাসহ।",
3:"লজিস্টিক খরচকে চারটি অংশে ভাগ করুন — মূল পরিবহন, কাস্টমস, ওয়্যারহাউসিং ও শেষ মাইল — সমুদ্র, বিমান ও বিদেশি গুদামের খরচের গঠন বুঝুন এবং রিস্টক চক্র ও সেফটি স্টকের হিসাব শিখুন।",
4:"অপারেশনকে পাঁচ স্তরের ফানেলে ভাগ করুন — ইম্প্রেশন, ক্লিক, কার্ট, অর্ডার ও পুনঃক্রয় — প্রতিটি স্তরের লিভার ও অগ্রাধিকার অ্যাকশনসহ; «শুধু বিজ্ঞাপন চালাও, লিস্টিং ঠিক করো না» ধরনের অপচয় এড়িয়ে চলুন।",
5:"টুল তালিকা পাঁচ গোষ্ঠীতে — প্রোডাক্ট নির্বাচন, কিওয়ার্ড ও লিস্টিং, খরচ ও মুদ্রা, লজিস্টিক, কমপ্লায়েন্স — প্রতিটি পরিস্থিতিতে বাস্তব ব্যবহার ও একটি খোলাখুলি সতর্কতা: কোন ডেটা আপনার নিজের সোর্স সংযুক্ত না করলে ভরসাযোগ্য নয়।",
6:"ল্যাটিন আমেরিকার সুযোগ জনসংখ্যায় নয়, প্রতিযোগিতার ঘনত্ব ও পেমেন্ট পদ্ধতিতে। মেক্সিকো ও ব্রাজিলের ভাষা, ট্যাক্স নম্বর, পেমেন্ট ও লজিস্টিক পার্থক্য — এবং ৬০ অক্ষরের টাইটেল নিয়মে প্রোডাক্ট ছাঁকনির পদ্ধতি।",
7:"লাইভ ক্যামেরার সামনে উত্তেজনা নয়, ক্রমানুসারে সংখ্যা ওঠানো: ঢোকা, থেকে যাওয়া, ক্লিক, কনভার্সন। শুরুর আগে প্রোডাক্ট মিক্স ডিজাইন, ব্লক-ভিত্তিক স্ক্রিপ্ট এবং লাইভ শেষে রিভিউ টেবিল।",
8:"বিদেশি গুদাম শুধু ভাণ্ডার নয়, অ্যাক্সেলারেটর: ইনবাউন্ড অ্যাপয়েন্টমেন্ট ও লেবেলিং, ইনভেন্টরি টার্নওভারের হিসাব, লাস্ট-মাইল নির্বাচনের যুক্তি এবং যেসব ক্যাটাগরিতে আগে থেকে স্টক রাখা ঠিক নয়।",
9:"দক্ষিণ-পূর্ব এশিয়ার দুই প্রধান প্ল্যাটফর্মের বিন্দু-ভিত্তিক তুলনা: রেজিস্ট্রেশন ডকুমেন্ট, কমিশন স্ট্রাকচার, লজিস্টিক পরিকল্পনা ও পয়েন্ট কাটা সিস্টেম — কাটা পয়েন্ট জমা না দেওয়ার অপারেটিং ছন্দসহ।",
10:"মেট্রিক্সের স্তূপ নয়: শুধু সেগুলোই রাখুন যেগুলো সিদ্ধান্ত বদলায় — ট্রাফিক, কনভার্সন, অর্ডার ভ্যালু, মার্জিন ও অ্যাকাউন্ট হেল্থ — সাপ্তাহিক ড্যাশবোর্ড ও SKU-স্টোর-ক্যাশফ্লো তিন-স্তরের কাঠামোসহ।",
},
"ur": {
1:"اندازہ نہیں، صرف تصدیق شدہ معیار: مارجن، والیومیٹرک وزن، ریٹرن ریٹ اور تصدیقی رکاوٹیں — چار فلٹروں سے اقسام چھانٹیں، پھر یونٹ اکانومی سے حساب لگائیں کہ ایک SKU واقعی منافع دیتی ہے یا نہیں۔",
2:"EU اور امریکہ میں سب سے زیادہ مسئلہ بننے والی تین قسم کی ضروریات کو الگ الگ سمجھیں: ٹیکس (VAT/IOSS)، سرٹیفیکیشن (CE/FCC/FDA) اور پروڈکٹ سیفٹی (GPSR/CPC) — لسٹنگ سے پہلے محفوظ کرنے والے دستاویزات کی فہرست کے ساتھ۔",
3:"لاجسٹکس اخراجات کو چار حصوں میں تقسیم کریں — بنیادی ٹرانسپورٹ، کسٹمز، ویئر ہاؤسنگ اور آخری میل — سمندری، ہوائی اور بیرون ملک گودام کے اخراجات کی ساخت سمجھیں اور دوبارہ اسٹاک کی رفتار تے سیفٹی اسٹاک کا حساب سیکھیں۔",
4:"آپریشن کو پانچ پرتوں کے فنل میں تقسیم کریں — امپریشن، کلک، کارٹ، آرڈر اور دوبارہ خریداری — ہر پرت کے لیے لیور اور ترجیحی اقدامات کے ساتھ؛ «صرف اشتغال چلاؤ، لسٹنگ نہ سنوارو» والے ضیاع سے بچیں۔",
5:"ٹول لسٹ پانچ گروپس میں — مصنوعات کا انتخاب، کی ورڈ اور لسٹنگ، اخراجات اور کرنسی، لاجسٹکس، کمپلائنس — ہر صورت حال کے لیے واضح استعمال اور ایماندارانہ تنبیہ کے ساتھ: کون سا ڈیٹا آپ کے اپنے ذرائع جوڑنے سے پہلے قابلِ اعتماد نہیں۔",
6:"لاطین امریکہ کا موقع آبادی میں نہیں، مقابلے کی کثافت اور ادائیگی کے طریقوں میں ہے۔ میکسیکو اور برازیل کی زبان، ٹیکس نمبر، ادائیگی اور لاجسٹکس کے فرق — اور 60 حروف کے ٹائٹل کے اصول سے مصنوعات چھانٹنے کا طریقہ۔",
7:"لائیو کیمرے کے سامنے جوش نہیں، ترتیب سے اعداد بڑھانا ہے: داخلہ، قیام، کلک، کنورژن۔ نشر کرنے سے پہلے پروڈکٹ کی ترکیب، بلاک وار اسکرپٹ اور لائیو کے بعد جائزہ جدول۔",
8:"بیرونِ ملک گودام صرف ذخیرہ نہیں، ایکسرریٹر ہے: ان باؤنڈ اپائنٹمنٹ اور لیبلنگ، انوینٹری ٹرن اوور کا حساب، آخری میل کے انتخاب کا منطق اور وہ اقسام جن پر پہلے سے اسٹاک رکھنا مناسب نہیں۔",
9:"جنوبی-مشرقی ایشیا کے دو مرکزی پلیٹ فارمز کا بند در بند موازنہ: رجسٹریشن دستاویزات، کمیشن کی ساخت، لاجسٹکس منصوبہ اور پوائنٹ کٹوتی نظام — کٹوتی جمع ہونے سے روکنے والی آپریٹنگ رفتار کے ساتھ۔",
10:"میٹرکس کا ڈھیر نہ لگائیں: صرف وہی رکھیں جو فیصلے بدلیں — ٹریفک، کنورژن، آرڈر ویلیو، مارجن اور اکاؤنٹ ہیلتھ — ہفتہ وار ڈیش بورڈ اور SKU-اسٹور-کیش فلو تین پرتی فریم ورک کے ساتھ۔",
},
"fa": {
1:"بدون حدس، فقط معیارهای قابل راستی‌آزمایی: دسته‌ها را با چهار صافی — حاشیه سود، وزن حجمی، نرخ مرجوعی و موانع گواهی — غربال کنید، سپس با مدل اقتصاد واحد حساب کنید که یک SKU واقعاً سود می‌دهد یا نه.",
2:"سه دسته الزاماتی که در اتحادیه اروپا و آمریکا بیشترین دردسر را می‌سازند را جدا کنید: مالیات (VAT/IOSS)، گواهی‌ها (CE/FCC/FDA) و ایمنی محصول (GPSR/CPC) — همراه فهرست مدارکی که پیش از ثبت محصول باید بایگانی کنید.",
3:"هزینه لجستیک را به چهار بخش تقسیم کنید — حمل اولیه، ترخیص گمرکی، انبارداری و مایل آخر — ساختار هزینه حمل دریایی، هوایی و انبار خارج از کشور را بشناسید و روش محاسبه ریتم تأمین و موجودی اطمینان را بیاموزید.",
4:"عملیات را به قیفی پنج‌لایه تقسیم کنید — نمایش، کلیک، سبد، سفارش و خرید مجدد — همراه اهرم و اقدامات اولویت‌بندی‌شده هر لایه؛ از مدل «فقط تبلیغات را روشن کن و صفحه محصول را دست نزن» دوری کنید.",
5:"فهرست ابزارها در پنج گروه — انتخاب محصول، کلمات کلیدی و لیستینگ، هزینه و ارز، لجستیک، انطباق — با روش استفاده مشخص در هر سناریو و هشدار صادقانه: کدام داده تا زمانی که منابع خودتان را وصل نکنید قابل اعتماد نیست.",
6:"فرصت آمریکای لاتین در جمعیت نیست، در تراکم رقابت و روش‌های پرداخت است. تفاوت مکزیک و برزیل در زبان، شماره مالیاتی، پرداخت و لجستیک — و روش غربالگری محصول با قانون عنوان ۶۰ کاراکتری.",
7:"لایو استریم هیجان مقابل دوربین نیست، بلکه بالا بردن اعداد به ترتیب است: ورود، ماندن، کلیک، تبدیل. طراحی چیدمان محصول پیش از شروع، سناریوی بخش‌بندی‌شده و جدول مرور پس از پایان.",
8:"انبار خارج از کشور فقط محل نگهداری نیست، شتاب‌دهنده است: وقت‌دهی ورود و برچسب‌زنی، محاسبه گردش موجودی، منطق انتخاب مایل آخر و دسته‌هایی که بهتر است موجودی پیش‌خرید نداشته باشند.",
9:"مقایسه بند به بند دو پلتفرم اصلی جنوب شرق آسیا: مدارک ثبت‌نام، ساختار کمیسیون، طرح لجستیک و سیستم کسر امتیاز — همراه ریتم عملیاتی که امتیاز کسری انباشته نمی‌شود.",
10:"پشته از متریک نسازید: فقط آن‌هایی را نگه دارید که تصمیم را عوض می‌کنند — ترافیک، نرخ تبدیل، ارزش سفارش، حاشیه سود و سلامت حساب — همراه داشبورد هفتگی و چارچوب سه‌لایه محصول-فروشگاه-جریان نقدی.",
},
}

# 被污染包的 2-10 号标题重建（按中文原题翻译）
RESTORE_TITLES = {
"es": {
2:"Normativas de cumplimiento en Europa y EE. UU.: IVA, certificación CE y seguridad de producto",
3:"Optimización de costes logísticos internacionales: marítimo, aéreo y almacén local",
4:"Operación de tiendas transfronterizas: tráfico, conversión y retención de clientes",
5:"Herramientas imprescindibles para el comercio transfronterizo: de la selección a la operación",
6:"Oportunidades 2026 en Latinoamérica: categorías calientes en México y Brasil",
7:"TikTok Shop en directo de cero a uno: cómo montar una sala de ventas ganadora",
8:"Manual del almacén en el exterior: entrada, inventario y última milla",
9:"Políticas de plataformas del Sudeste Asiático: alta y operación conforme en Shopee y Lazada",
10:"Analítica de datos para e-commerce: decisiones más rápidas y mejor informadas",
},
"fr": {
2:"Conformité en Europe et aux États-Unis : TVA, marquage CE et sécurité des produits",
3:"Optimisation des coûts logistiques internationaux : maritime, aérien et entrepôt local",
4:"Gestion d'une boutique transfrontalière : trafic, conversion et fidélisation",
5:"Les outils indispensables du e-commerce transfrontalier : de la sélection à l'opération",
6:"Opportunités 2026 en Amérique latine : catégories phares au Mexique et au Brésil",
7:"TikTok Shop en direct de zéro à un : bâtir une salle de live qui convertit",
8:"Guide de l'entrepôt à l'étranger : réception, stocks et livraison du dernier kilomètre",
9:"Politiques des plateformes d'Asie du Sud-Est : inscription et conformité sur Shopee et Lazada",
10:"Analyse de données e-commerce : décider plus vite et mieux",
},
"th": {
2:"ข้อกำหนดด้านคอมไพลแอนซ์ในยุโรปและสหรัฐฯ: VAT การรับรอง CE และความปลอดภัยของสินค้า",
3:"การเพิ่มประสิทธิภาพต้นทุนโลจิสติกส์ระหว่างประเทศ: เรือ เครื่องบิน และการเลือกคลังสินค้าต่างประเทศ",
4:"เทคนิคดูแลร้านค้าข้ามพรมแดน: ทราฟฟิก การแปลงเป็นยอดขาย และการรักษาลูกค้า",
5:"ชุดเครื่องมือจำเป็นสำหรับอีคอมเมิร์ซข้ามพรมแดน: จากเลือกสินค้าถึงการดูแลร้าน",
6:"โอกาสเลือกสินค้าในละตินอเมริกาปี 2026: หมวดหมู่ยอดนิยมในเม็กซิโกและบราซิล",
7:"สูตรครบเครื่องการขายแบบไลฟ์บน TikTok Shop: สร้างห้องไลฟ์ที่ทำยอดจากศูนย์",
8:"คู่มือคลังสินค้าต่างประเทศ: เข้าคลัง จัดการสต็อก และการจัดส่งไมล์สุดท้าย",
9:"นโยบายแพลตฟอร์มเอเชียตะวันออกเฉียงใต้: สมัครและทำตามกฎ Shopee และ Lazada",
10:"เครื่องมือวิเคราะห์ข้อมูลอีคอมเมิร์ซ: ตัดสินใจได้เร็วและแม่นขึ้น",
},
"hi": {
2:"यूरोप और अमेरिका की कंप्लायंस नीतियाँ: VAT, CE सर्टिफिकेशन और प्रोडक्ट सेफ्टी",
3:"अंतरराष्ट्रीय लॉजिस्टिक्स लागत अनुकूलन: समुद्री, हवाई और विदेश वेयरहाउस का चयन",
4:"क्रॉस-बॉर्डर स्टोर ऑपरेशन: ट्रैफ़िक, कन्वर्ज़न और ग्राहक रिटेंशन के उपाय",
5:"क्रॉस-बॉर्डर ई-कॉमर्स के ज़रूरी टूल: चयन से ऑपरेशन तक एक ही जगह",
6:"2026 में लैटिन अमेरिका में प्रोडक्ट अवसर: मेक्सिको और ब्राज़ील की लोकप्रिय श्रेणियाँ",
7:"TikTok Shop लाइव सेलिंग की संपूर्ण गाइड: शून्य से हिट लाइव रूम बनाना",
8:"विदेश वेयरहाउस ऑपरेशन गाइड: इनबाउंड, इन्वेंटरी मैनेजमेंट और लास्ट-माइल डिलीवरी",
9:"दक्षिण-पूर्व एशिया प्लेटफ़ॉर्म नीतियाँ: Shopee और Lazada में प्रवेश व अनुपालन",
10:"ई-कॉमर्स डेटा एनालिटिक्स टूरियल: तेज़ और बेहतर निर्णय के लिए",
},
}

PACK_ORDER = {"copy-a.ts": ["es","pt","ru","ar"], "copy-b.ts": ["fr","de","ja","ko"],
              "copy-c.ts": ["th","vi","id","tr"], "copy-d.ts": ["hi","bn","ur","fa"]}

for fname, langs in PACK_ORDER.items():
    p = os.path.join(BASE, fname)
    s = io.open(p, encoding="utf-8").read()
    for lang in langs:
        # 定位该语种包的区块边界
        m_start = re.search(r'export const %s: BlogPack = \{' % lang, s)
        assert m_start, (fname, lang)
        nxt = re.search(r'export const \w+: BlogPack = \{', s[m_start.end():])
        end = m_start.end() + nxt.start() if nxt else len(s)
        section = s[m_start.start():end]
        for i in range(1, 11):
            m = re.search(r'  "%d": \{ title: "(.*?)", summary: "(.*?)" \},' % i, section)
            assert m, (fname, lang, i)
            old_title = m.group(1)
            if lang in RESTORE_TITLES:
                title = T1[lang] if i == 1 else RESTORE_TITLES[lang][i]
            else:
                title = T1[lang] if i == 1 else old_title
            new_line = '  "%d": { title: "%s", summary: "%s" },' % (i, title, S[lang][i])
            section = section[:m.start()] + new_line + section[m.end():]
        s = s[:m_start.start()] + section + s[end:]
    io.open(p, "w", encoding="utf-8").write(s)
    print("repaired", fname)

# 终检：每个包的 id1 标题必须等于 T1[lang]
ok = True
for fname, langs in PACK_ORDER.items():
    s = io.open(os.path.join(BASE, fname), encoding="utf-8").read()
    for lang in langs:
        m = re.search(r'export const %s: BlogPack = \{(?:.|\n)*?  "1": \{ title: "(.*?)",' % lang, s)
        if m.group(1) != T1[lang]:
            ok = False; print("MISMATCH", lang, m.group(1)[:40])
print("verify:", "PASS" if ok else "FAIL")
