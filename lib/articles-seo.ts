// lib/articles-seo.ts
// SEO 长文内容库（10 篇，面向英文搜索意图，配套内链到对应工具）
// 说明：内容为原创说明性写作，涉及费率/政策的数字均标注"以平台官方为准"，避免误导。

import type { Article } from './articles';

export const seoArticles: Article[] = [
  {
    id: '11',
    title: 'How to Calculate Amazon FBA Profit Margin (Step-by-Step Formula)',
    summary: 'A worked example of Amazon FBA profit margin, including referral fees, FBA fulfillment, inbound freight, ads and returns — plus the exact formula you can reuse.',
    cover: '/blog-covers/en-11.webp',
    category: '工具教程',
    status: 'published',
    views: 0,
    createdAt: '2026-11-10',
    updatedAt: '2026-11-10',
    content: `
<p>Most new Amazon sellers price a product by looking at competitors and adding "a bit of margin". Then the first settlement report arrives and the margin is half of what they expected. The reason is almost always the same: <strong>four cost layers get left out</strong> — referral fee, FBA fulfillment fee, inbound freight, and advertising.</p>

<h2>The formula that actually matches your settlement report</h2>
<p>Work from the sale price down, not from the cost up:</p>
<ul>
<li><strong>Revenue</strong> = sale price (what the customer pays)</li>
<li><strong>− Referral fee</strong>: usually 8–15% of the sale price depending on category (verify in Seller Central for your category)</li>
<li><strong>− FBA fulfillment fee</strong>: size- and weight-based, charged per unit</li>
<li><strong>− Inbound freight per unit</strong>: total shipping + duties ÷ units in the shipment</li>
<li><strong>− Landed cost per unit</strong>: factory price + packaging + QC + domestic freight to port</li>
<li><strong>− Advertising cost per unit</strong>: ad spend ÷ units sold in the same period</li>
<li><strong>− Returns &amp; storage allowance</strong>: typically 2–8% of revenue depending on category</li>
<li><strong>= Net profit per unit</strong></li>
</ul>
<p>Divide net profit by sale price and you have your <strong>true net margin</strong>.</p>

<h2>Worked example: a $19.99 phone case</h2>
<p>Assume: landed cost $2.10, inbound freight $0.45/unit, referral fee 15%, FBA fee $3.06, ad cost $1.80/unit, returns allowance 3%.</p>
<table>
<tbody>
<tr><td>Sale price</td><td>$19.99</td></tr>
<tr><td>Referral fee (15%)</td><td>−$3.00</td></tr>
<tr><td>FBA fulfillment</td><td>−$3.06</td></tr>
<tr><td>Landed cost + freight</td><td>−$2.55</td></tr>
<tr><td>Advertising</td><td>−$1.80</td></tr>
<tr><td>Returns allowance (3%)</td><td>−$0.60</td></tr>
<tr><td><strong>Net profit</strong></td><td><strong>$8.98</strong></td></tr>
<tr><td><strong>Net margin</strong></td><td><strong>44.9%</strong></td></tr>
</tbody>
</table>
<p>Note how the picture changes if you forget ads and returns: you would have booked a 66% margin and made decisions on a number that never existed.</p>

<h2>Three mistakes that quietly destroy margin</h2>
<h3>1. Treating advertising as a fixed monthly cost</h3>
<p>Ad spend must be attributed per unit. If you sell 400 units and spend $720 on ads, that is $1.80 per unit — not "a $720 marketing expense" sitting outside the unit economics.</p>

<h3>2. Ignoring dimensional weight</h3>
<p>FBA fees follow the greater of actual or dimensional weight. A lightweight but bulky item can be charged as a much heavier one. Always confirm the fee tier using the exact packaged dimensions, not the product dimensions.</p>

<h3>3. Pricing before returns</h3>
<p>Categories with high return rates (apparel, shoes, electronics accessories) need a returns allowance built into the price from day one. A 10% return rate on a 35% margin product can put you under water.</p>

<h2>What margin should you target?</h2>
<p>A practical rule for a first product: <strong>30% net margin minimum, 40%+ preferred</strong>. Below 25% you have no room to absorb a price war, a fee increase, or a bad shipment. For heavy or fragile products, target higher because your cost variance is higher.</p>

<h2>Model it before you order</h2>
<p>Run the numbers for several price points and cost scenarios before you place a purchase order. Our <a href="/tool/profit-calculator">profit calculator</a> does this arithmetic in the browser with the same formula above, and you can change one input at a time to see how margin responds.</p>

<h2>FAQ</h2>
<h3>Does the referral fee apply to shipping charged to the customer?</h3>
<p>It depends on the marketplace and whether you use FBA. For FBA orders, the referral fee is calculated on the total sales price including shipping. Always verify the current rule for your category in Seller Central.</p>

<h3>Should I include VAT in the margin calculation?</h3>
<p>No. Calculate margin on the net revenue excluding VAT/GST, and handle tax as a separate cash-flow line. Mixing VAT into margin makes products look unprofitable when they are not.</p>

<h3>How do I account for currency movement?</h3>
<p>If you pay suppliers in CNY and sell in USD or EUR, your margin moves with the exchange rate. Re-check margin at the current rate before each reorder — see the <a href="/tool/rate-converter">rate converter</a>.</p>
`,
  },
  {
    id: '12',
    title: 'Amazon Keyword Research Without Paid Tools: A Realistic Workflow',
    summary: 'How to build a usable keyword list from competitor titles, autocomplete and your own search-term report — and where free data honestly stops being enough.',
    cover: '/blog-covers/en-12.webp',
    category: '选品技巧',
    status: 'published',
    views: 0,
    createdAt: '2026-11-09',
    updatedAt: '2026-11-09',
    content: `
<p>Keyword tools are useful, but they are not the only way to start. If you are validating a product before spending $99/month on software, you can build a genuinely useful keyword list from three free sources: <strong>competitor titles</strong>, <strong>search autocomplete</strong>, and <strong>your own search-term report</strong>.</p>

<h2>Source 1: competitor titles (free, and the most underrated)</h2>
<p>The top 10 organic results for your main keyword are, in effect, a curated keyword document. Sellers have spent months optimizing those titles. Extract them and count words:</p>
<ol>
<li>Copy the titles of the top 10–20 listings for your seed keyword.</li>
<li>Strip filler words (a, the, for, with).</li>
<li>Count how many titles each remaining term appears in. A term in 7 of 10 titles is a strong signal — the market has decided it belongs.</li>
<li>Compare against your own title. Any high-frequency term you are missing is a gap worth closing.</li>
</ol>
<p>Do not copy titles. Use the frequency data to decide which attributes matter, then write your own.</p>

<h2>Source 2: autocomplete and related searches</h2>
<p>Type your seed keyword into Amazon and note the suggestions. Then type the seed plus each letter a–z, and note how the suggestions change. This surfaces real query patterns people type, including language variants ("fundas para celular" vs "funda celular") that paid tools often miss in non-English marketplaces.</p>
<p>The same technique works on Google with a marketplace modifier ("site:amazon.com"), which is often where long-tail informational queries live.</p>

<h2>Source 3: your own search-term report</h2>
<p>If you already sell, this is the highest-value data you have and it is free. In Seller Central, download the search-term report and look for:</p>
<ul>
<li>Terms with impressions but low click-through: your main image or price is the problem, not the keyword</li>
<li>Terms with clicks but no conversions: relevance or review count problem</li>
<li>Terms you never targeted that already convert: add them to the title or backend search terms</li>
</ul>

<h2>Where free data stops being enough</h2>
<p>Be clear-eyed about the limit: <strong>none of the three sources gives you search volume</strong>. They tell you what people type and what competitors consider important — not how many people search it per month. Volume matters for one decision: whether the ceiling is big enough to justify the inventory risk.</p>
<p>That is the point where you either buy a data source or accept a proxy. Honest proxies include:</p>
<ul>
<li>Number of results for the keyword (very high counts usually mean a crowded head term)</li>
<li>Review counts on page one (a page full of 5,000-review listings means a hard entry)</li>
<li>How specific the autocomplete suggestions are (specific long-tails usually mean real niche demand)</li>
</ul>

<h2>Build the matrix, then validate</h2>
<p>A practical sequence for a new product:</p>
<ol>
<li>Generate 100–150 keyword combinations from your seed (modifier + seed, seed + use case, seed + spec).</li>
<li>Keep the 4–6 word phrases — they are specific enough to convert and short enough to fit a title.</li>
<li>Check each against your marketplace's title character limit before you fall in love with it.</li>
<li>Validate the top 20 with real volume data if you have a data source; otherwise validate with a small ad test.</li>
</ol>
<p>Our <a href="/tools/keyword-lab">Keyword Lab</a> does steps 1–3 deterministically, including the per-marketplace title limits (Amazon 200, Mercado Libre 60, Shopee 255), and lets you plug in your own DataForSEO, SerpApi, Rainforest or Keepa credentials when you want real volume. It does not invent numbers when you have not connected a source — that distinction matters more than it sounds.</p>

<h2>FAQ</h2>
<h3>How many keywords should a title contain?</h3>
<p>There is no fixed count. Prioritize the 2–3 highest-intent phrases and let supporting attributes fill the remaining characters. Keyword stuffing hurts readability and click-through.</p>

<h3>Do backend search terms still matter?</h3>
<p>Yes. They are a low-cost place for spelling variants, synonyms and non-English terms that do not fit naturally in the title.</p>

<h3>Is Mercado Libre keyword research different?</h3>
<p>Substantially. The 60-character title limit forces hard prioritization, and Spanish/Portuguese variants matter more than English translations. See the <a href="/platform/mercado-libre">Mercado Libre guide</a>.</p>
`,
  },
  {
    id: '13',
    title: 'Mercado Libre Title Rules: The 60-Character Constraint That Decides Your Traffic',
    summary: 'Mercado Libre caps titles at 60 characters. Here is how to allocate those characters, which attributes to keep, and the mistakes that cost Latin American sellers visibility.',
    cover: '/blog-covers/en-13.webp',
    category: '运营策略',
    status: 'published',
    views: 0,
    createdAt: '2026-11-08',
    updatedAt: '2026-11-08',
    content: `
<p>Amazon gives you 200 characters. Mercado Libre gives you 60. That single difference reshapes how you write titles for Latin America — and it is the most common reason a listing that performs well in the US underperforms in Mexico or Brazil.</p>

<h2>What the 60-character limit really forces</h2>
<p>Sixty characters is roughly eight to ten words in Spanish or Portuguese — and Spanish words are longer than their English equivalents. "Wireless bluetooth earbuds with charging case" is 47 characters. "Auriculares inalámbricos bluetooth con estuche de carga" is 57, before you add the brand or model.</p>
<p>So you must choose, per listing, between three structures:</p>
<ul>
<li><strong>Brand + core product + key spec</strong> — best for branded listings</li>
<li><strong>Core product + differentiator + use case</strong> — best for generic listings</li>
<li><strong>Core product + quantity/pack</strong> — best for consumables and multi-packs</li>
</ul>
<p>You cannot have all three. Trying to squeeze everything in produces truncated titles that Mercado Libre may reject outright.</p>

<h2>Allocation strategy: a practical template</h2>
<p>Assume a 55-character working budget (leaving safety margin):</p>
<ul>
<li>Product noun: 15–22 characters (auriculares, licuadora, mochila)</li>
<li>Primary differentiator: 12–18 characters (inalámbrico, 2 litros, impermeable)</li>
<li>Use case or spec: 10–15 characters (para gym, con estuche, 1200W)</li>
</ul>
<p>Before you design anything, check the actual character count of your Spanish or Portuguese phrase — not the English one. Accented characters (á, ñ, ç) count as single characters, but they change nothing about the limit and everything about search matching for users who type without accents.</p>

<h2>Five mistakes that cost visibility</h2>
<h3>1. Translating the English title word for word</h3>
<p>Direct translations run 15–25% longer and push you over the limit. Write for the local search behaviour instead: Mexican buyers search "audífonos", not "auriculares", in many categories.</p>

<h3>2. Stuffing keywords with pipes and slashes</h3>
<p>"Auriculares | Bluetooth | Inalámbricos | Estuche" burns characters on separators. Each pipe is a character you could spend on a real attribute.</p>

<h3>3. Ignoring the category-specific attribute fields</h3>
<p>Mercado Libre's structured attributes carry more ranking weight than extra words in the title. Fill brand, model, colour, size and material in the attribute fields rather than the title.</p>

<h3>4. Forgetting the pack quantity</h3>
<p>If you sell a 3-pack, the number belongs in the title. Buyers filter by unit count and a missing quantity reads as a single unit.</p>

<h3>5. Not checking the limit before bulk upload</h3>
<p>Bulk templates reject rows over the limit, and a failed row means a listing that never goes live. Validate at scale, not one by one.</p>

<h2>Validate before you upload</h2>
<p>Use the <a href="/tools/keyword-lab">Keyword Lab</a> with the market set to Mercado Libre — it enforces the 60-character ceiling and shows the remaining room for each candidate keyword, so you can see immediately which phrases will not fit. Pair it with the <a href="/platform/mercado-libre">Mercado Libre platform guide</a> for fee and logistics specifics.</p>

<h2>FAQ</h2>
<h3>Is the 60-character limit the same in every Mercado Libre country?</h3>
<p>The limit is consistent across the main sites, but category-level rules and attribute requirements differ. Confirm in the seller centre for your specific category and country.</p>

<h3>Can I use English words in a Spanish title?</h3>
<p>Some English terms are commonly searched in Latin America (bluetooth, gaming, led). Use them where they are genuinely part of local search behaviour, not as a shortcut.</p>

<h3>Do accents affect search matching?</h3>
<p>Mercado Libre's search generally normalizes accents, but buyer behaviour does not — many users type without accents. Include the unaccented form in your attributes or description.</p>
`,
  },
  {
    id: '14',
    title: 'Ozon Seller Fees Explained: What Actually Eats Your Margin in Russia',
    summary: 'A breakdown of the cost layers that matter on Ozon — commission, logistics, last-mile, acquiring and returns — and how to price for a real margin.',
    cover: '/blog-covers/en-14.webp',
    category: '政策解读',
    status: 'published',
    views: 0,
    createdAt: '2026-11-07',
    updatedAt: '2026-11-07',
    content: `
<p>Ozon looks attractive on paper: a large Russian marketplace with less seller saturation than Amazon in many categories. The trap is pricing from the commission rate alone. Commission is one of five cost layers, and in Russia the logistics layers often outweigh it.</p>

<h2>The five cost layers on Ozon</h2>
<ol>
<li><strong>Category commission</strong> — varies widely by category; treat the platform's current rate card as the only source of truth</li>
<li><strong>Fulfillment (FBO) or seller-side shipping (FBS)</strong> — storage, picking, packaging and delivery</li>
<li><strong>Last-mile delivery to the buyer</strong> — often the largest single line for low-ticket items</li>
<li><strong>Acquiring / payment processing</strong> — a percentage of the order value</li>
<li><strong>Returns and non-collection</strong> — Russia has high pickup-point return behaviour in some categories</li>
</ol>

<h2>Why low-ticket items break on Ozon</h2>
<p>If last-mile delivery costs a fixed amount per parcel, then a 500 RUB item and a 5,000 RUB item carry the same delivery cost. On the cheap item, delivery can be 20–30% of revenue; on the expensive one, 2–3%. This is why the same product that works at €25 in Europe can be structurally unprofitable at an equivalent rouble price.</p>
<p>Practical implication: <strong>price for a parcel, not for a unit</strong>. Multi-packs and higher AOV bundles are the standard fix.</p>

<h2>Pricing checklist before you list</h2>
<ul>
<li>Convert your landed cost into RUB at a realistic rate, and add a buffer for currency movement</li>
<li>Add commission for your exact category</li>
<li>Add fulfillment + last mile for the real packaged dimensions and weight</li>
<li>Add acquiring percentage</li>
<li>Add a returns allowance based on category behaviour</li>
<li>Only then compare to competitor prices — if you cannot hit 25–30% net margin, the product is wrong for this market, not the price</li>
</ul>

<h2>Currency is a margin variable, not a detail</h2>
<p>You buy in CNY, sell in RUB, and settle through an intermediary. A 5% rouble move can wipe out a fifth of a 25% margin. Re-check the rate before each replenishment and consider holding a small pricing buffer rather than adjusting prices daily.</p>

<h2>Where sellers get compliance wrong</h2>
<p>Russia requires product documentation and, for many categories, Russian-language labelling and certification (EAC). Missing certification does not just risk a takedown — it can strand inventory in a warehouse you cannot easily recover. Check the requirement per category before you ship.</p>
<p>Use the <a href="/tool/profit-calculator">profit calculator</a> with RUB as your selling currency to model margin, and the <a href="/platform/ozon">Ozon platform guide</a> for onboarding specifics.</p>

<h2>FAQ</h2>
<h3>Is FBO always cheaper than FBS?</h3>
<p>No. FBO trades higher fulfillment fees for better conversion (faster delivery, platform badges). For slow-moving SKUs, storage fees can make FBS cheaper. Model both.</p>

<h3>Do I need a Russian legal entity?</h3>
<p>Many cross-border sellers operate through platform-supported cross-border schemes without a local entity, but the rules change. Confirm the current requirement with the platform and a local advisor.</p>

<h3>How much should I budget for returns?</h3>
<p>Category-dependent. Build the allowance from your own return data as soon as you have a month of sales rather than using a generic number indefinitely.</p>
`,
  },
  {
    id: '15',
    title: 'Shopee vs Lazada Fees: A Seller Cost Comparison for Southeast Asia',
    summary: 'Commission, transaction fees, shipping subsidies and penalty structures compared — plus how to model the same product across both platforms.',
    cover: '/blog-covers/en-15.webp',
    category: '政策解读',
    status: 'published',
    views: 0,
    createdAt: '2026-11-06',
    updatedAt: '2026-11-06',
    content: `
<p>Southeast Asia is rarely a single-market decision. Most sellers end up on both Shopee and Lazada, and the question is not "which is cheaper" but "<strong>which is cheaper for this specific product and this specific country</strong>".</p>

<h2>The cost structure, layer by layer</h2>
<h3>Commission</h3>
<p>Both platforms charge category-based commission, and both have changed rates repeatedly in recent years. Ranges commonly cited sit in the single digits to low teens depending on category and country — but the only reliable number is the current rate card in each seller centre. Do not plan a business on a rate you read in a blog post, including this one.</p>

<h3>Transaction / payment fee</h3>
<p>Both add a payment processing fee on top of commission. This is small per order but compounds on low-ticket items.</p>

<h3>Shipping and subsidies</h3>
<p>This is where the two diverge most. Shopee's model leans heavily on shipping subsidies and free-shipping thresholds, funded partly through seller programmes. Lazada's logistics (LGS) works differently and supports official overseas warehouses. The practical effect: <strong>the same product can have a different effective shipping cost on each platform in the same country</strong>.</p>

<h3>Penalties and service metrics</h3>
<p>Both penalize late shipment, cancellation and non-compliance with documented thresholds. These are not fees you pay — they are visibility you lose, which is worse.</p>

<h2>How to model the same product on both</h2>
<ol>
<li>Pick one SKU and one country. Do not compare across countries.</li>
<li>Fix the landed cost in the local currency at today's rate.</li>
<li>Apply each platform's current commission for your category.</li>
<li>Enter the real packaged weight and dimensions into both shipping calculators.</li>
<li>Add each platform's payment fee.</li>
<li>Add a returns allowance from your own data.</li>
<li>Compare net margin at the same retail price, then at each platform's realistic price point (they will differ).</li>
</ol>

<h2>Where the decision usually lands</h2>
<ul>
<li><strong>Low-ticket, high-frequency items</strong> usually favour the platform with the stronger shipping subsidy in that country</li>
<li><strong>Higher-ticket items</strong> favour whichever has better trust signals and return handling for that category</li>
<li><strong>Brand-led products</strong> often do better where brand stores and official flags carry more weight</li>
</ul>

<h2>Do not forget the operational cost</h2>
<p>Running two platforms means two sets of listings, two inventory pools, two customer-service inboxes. For a small team, the second platform can cost more in labour than it adds in margin. Many sellers launch on one, reach a stable 30% margin, and only then add the second.</p>
<p>Model both scenarios with the <a href="/tool/profit-calculator">profit calculator</a>, and see the <a href="/platform/shopee">Shopee platform guide</a> for onboarding requirements.</p>

<h2>FAQ</h2>
<h3>Which platform has lower total fees?</h3>
<p>There is no fixed answer — it depends on country, category and shipping profile. Model your own SKU rather than relying on a general comparison.</p>

<h3>Can I list the same product at different prices on each?</h3>
<p>Usually yes, but check each platform's price-parity rules and any promotion commitments before you do.</p>

<h3>Do I need a local entity?</h3>
<p>Both operate cross-border seller programmes in most Southeast Asian markets. Requirements differ by country and change; verify before onboarding.</p>
`,
  },
  {
    id: '16',
    title: 'How to Audit Competitor Titles and Find the Keywords You Are Missing',
    summary: 'A repeatable method: collect 20 competitor titles, count term frequency, measure seed coverage, and generate a title that fits your marketplace limit.',
    cover: '/blog-covers/en-16.webp',
    category: '选品技巧',
    status: 'published',
    views: 0,
    createdAt: '2026-11-05',
    updatedAt: '2026-11-05',
    content: `
<p>Title optimization is usually approached backwards. Sellers brainstorm keywords, then force them into a title. The stronger approach starts from data you already have access to for free: <strong>the titles of the listings currently winning your keyword</strong>.</p>

<h2>Step 1: Build the sample</h2>
<p>Collect 10–20 titles. Use the organic top 10 for your main keyword plus the top 10 for one variant. More than 20 adds noise; fewer than 10 is not a sample.</p>
<p>Paste them into a document, one per line. Do not edit them — you want what is actually live, including the awkward phrasing.</p>

<h2>Step 2: Count term frequency</h2>
<p>Split each title into words, drop filler words (a, the, for, with, and, de, para, con), and count how many titles each remaining term appears in. Sort descending.</p>
<p>Read the result like this:</p>
<ul>
<li><strong>Appears in 70%+ of titles</strong> — table stakes. If you are missing it, you are the odd one out</li>
<li><strong>Appears in 30–70%</strong> — a positioning choice. Include it if it is true for your product</li>
<li><strong>Appears in under 30%</strong> — a differentiator. Often the most valuable words on the page, because they separate you</li>
</ul>

<h2>Step 3: Measure seed coverage</h2>
<p>Take your seed phrase (two or three words) and check, word by word, what percentage of competitor titles contain it. If "waterproof" appears in 2 of 20 titles but you consider it essential, that is a positioning bet — make it deliberately, knowing the market disagrees.</p>

<h2>Step 4: Find the gaps</h2>
<p>Now compare the frequency list against your own title. Terms with high frequency that you do not use are your gap words. These are the cheapest improvements available: the market has already validated them, and you are simply absent from that query.</p>

<h2>Step 5: Rebuild within the limit</h2>
<p>Assemble: core product noun → your highest-frequency gap word → key spec → differentiator. Stop when you hit the character limit. Marketplace limits differ sharply:</p>
<ul>
<li>Amazon: 200 characters in most categories</li>
<li>Shopee: 255</li>
<li>Ozon: 200</li>
<li>Mercado Libre: 60</li>
</ul>
<p>If your limit is 60, the audit changes your behaviour: you must choose the single highest-value gap word rather than fitting five.</p>

<h2>What the audit cannot tell you</h2>
<p>Frequency shows what competitors consider important. It does not prove those words convert, and it does not give search volume. Two guards: check that each gap word describes your product truthfully (a false claim in a title drives returns), and validate any volume assumption with real data before you commit inventory.</p>
<p>The <a href="/tools/keyword-lab">Keyword Lab</a> runs steps 2–5 automatically: paste the titles, and it returns frequency, coverage, gaps and a limit-compliant suggested title.</p>

<h2>FAQ</h2>
<h3>Should I copy the top competitor's title structure?</h3>
<p>Copy the structure, never the words. Identical titles compete on price alone and can trigger duplicate-listing checks.</p>

<h3>How often should I re-run the audit?</h3>
<p>Quarterly, or whenever the top 10 for your main keyword changes materially. Title relevance drifts as the market shifts.</p>

<h3>Do these terms belong in bullets too?</h3>
<p>Yes — bullets are indexed and convert better than stuffed titles. Keep the title for the highest-intent phrases and use bullets for supporting detail.</p>
`,
  },
  {
    id: '17',
    title: 'FBA vs FBM: A Cost Breakdown You Can Actually Compare',
    summary: 'Fulfillment fee versus your own warehouse cost, storage, returns handling and cash-flow impact — with a worked comparison for a mid-weight product.',
    cover: '/blog-covers/en-17.webp',
    category: '物流指南',
    status: 'published',
    views: 0,
    createdAt: '2026-11-04',
    updatedAt: '2026-11-04',
    content: `
<p>FBA versus FBM is usually argued as a preference. It is really a cost and conversion comparison, and both sides move depending on the product.</p>

<h2>What FBA actually costs</h2>
<ul>
<li><strong>Fulfillment fee</strong> per unit, based on size tier and shipping weight</li>
<li><strong>Monthly storage fee</strong> per cubic foot, with long-term storage surcharges for aged inventory</li>
<li><strong>Returns processing</strong> — FBA handles customer returns, but the unit may come back unsellable</li>
<li><strong>Removal or disposal fees</strong> if you need inventory returned</li>
<li><strong>Inbound placement</strong> — shipping to multiple fulfilment centres costs more than one</li>
</ul>

<h2>What FBM actually costs</h2>
<ul>
<li><strong>Storage</strong> — rent per pallet or per square metre, plus insurance</li>
<li><strong>Pick and pack labour</strong> per order</li>
<li><strong>Outbound shipping</strong> per parcel, which is where small sellers usually lose to Amazon's rates</li>
<li><strong>Returns labour</strong> — inspection, repackaging, refunds</li>
<li><strong>Your time</strong>, which is a real cost even when it is not on a spreadsheet</li>
</ul>

<h2>Worked comparison: 0.5 kg product, 20 × 15 × 5 cm</h2>
<p>Both options, 500 units/month:</p>
<table>
<tbody>
<tr><td>FBA fulfillment</td><td>per-unit fee at this size tier</td></tr>
<tr><td>FBA storage</td><td>small, but punitive if inventory ages</td></tr>
<tr><td><strong>FBA total</strong></td><td><strong>predictable, scales linearly</strong></td></tr>
<tr><td>FBM pick &amp; pack</td><td>labour cost per order</td></tr>
<tr><td>FBM outbound</td><td>carrier rate per parcel — the decisive line</td></tr>
<tr><td>FBM storage</td><td>fixed monthly rent, so unit cost falls with volume</td></tr>
</tbody>
</table>
<p>The structural insight: <strong>FBM has high fixed costs and low marginal costs; FBA has low fixed costs and high marginal costs.</strong> Below roughly 100 orders a month, FBM's fixed costs dominate. Above a few hundred, FBM can win on unit economics — if you can get carrier rates and pick reliably.</p>

<h2>The conversion factor is not on the spreadsheet</h2>
<p>FBA orders carry Prime badges and faster delivery promises, which measurably lift conversion in most categories. A 10% conversion lift frequently beats a 5% fulfillment cost advantage. Model the revenue effect, not just the cost line.</p>

<h2>Cash flow and risk</h2>
<ul>
<li>FBA ties cash into inventory sitting in Amazon's warehouses, with storage fees accruing</li>
<li>FBM ties cash into your own warehouse and requires you to absorb demand volatility</li>
<li>FBA inventory can be restricted or stranded if a listing is suspended; FBM inventory stays under your control</li>
</ul>

<h2>A practical hybrid</h2>
<p>Many established sellers run FBA for the top 20% of SKUs that turn over fast, and FBM (or a 3PL) for slow movers and oversized items where FBA fees are punitive. That is usually the correct answer, and it requires SKU-level analysis rather than a blanket policy.</p>
<p>Estimate your per-parcel cost with the <a href="/tool/shipping-calculator">shipping calculator</a>, then run both scenarios through the <a href="/tool/profit-calculator">profit calculator</a>.</p>

<h2>FAQ</h2>
<h3>Is FBA always better for conversion?</h3>
<p>Usually, in comparable categories — but not universally. In niches where buyers expect custom or made-to-order items, FBM with a clear lead time can convert fine.</p>

<h3>Can I switch from FBM to FBA later?</h3>
<p>Yes. Inbound a shipment to FBA and switch the listing; keep FBM as a fallback so you do not go out of stock during the transition.</p>

<h3>What size product breaks the FBA model?</h3>
<p>Anything where dimensional weight pushes you into a high fee tier relative to sale price. Oversized, bulky and very heavy items usually belong in FBM or a 3PL.</p>
`,
  },
  {
    id: '18',
    title: 'Cross-Border VAT and GST: What New Sellers Get Wrong',
    summary: 'Registration thresholds, marketplace-facilitated collection, IOSS and the record-keeping that keeps you out of trouble — a practical primer, not tax advice.',
    cover: '/blog-covers/en-18.webp',
    category: '政策解读',
    status: 'published',
    views: 0,
    createdAt: '2026-11-03',
    updatedAt: '2026-11-03',
    content: `
<p>Tax is the area where new cross-border sellers make the most expensive mistakes, usually because they treat it as an admin task rather than a pricing input. This is a practical primer — confirm specifics with a qualified advisor in each jurisdiction.</p>

<h2>The three questions that decide your obligations</h2>
<ol>
<li><strong>Where is the goods located at the point of sale?</strong> Domestic stock creates local tax obligations almost immediately.</li>
<li><strong>Who is the deemed supplier?</strong> Many marketplaces now collect and remit VAT/GST on behalf of sellers for imported goods below a value threshold.</li>
<li><strong>What is your registration threshold?</strong> Thresholds differ per country and per scheme, and they are not interchangeable.</li>
</ol>

<h2>European Union: the marketplace usually collects</h2>
<p>For B2C sales of imported goods under the EU's low-value consignment threshold, the marketplace is generally treated as the deemed supplier and collects VAT at checkout. That does not mean you have no obligations: you still need accurate records, and selling into EU warehouses (FBA pan-EU, for example) creates local registrations and filings that the marketplace will not handle for you.</p>
<p>IOSS matters when you ship from outside the EU and the marketplace is not collecting. Getting the IOSS number wrong on a parcel means the customer is asked to pay VAT on delivery — a reliable source of refused parcels and negative reviews.</p>

<h2>United Kingdom</h2>
<p>The UK operates its own regime post-Brexit. For consignments below the low-value threshold, the marketplace is generally responsible for collecting VAT. Above it, import VAT applies at the border. Registering for UK VAT is required once you hold stock in the UK or exceed the relevant threshold.</p>

<h2>United States: sales tax, not VAT</h2>
<p>The US has no federal VAT. Sales tax is state-level, and economic nexus rules mean you can create an obligation in a state purely through sales volume. Marketplaces collect in most states as marketplace facilitators, but holding your own inventory in a state is a separate consideration.</p>

<h2>Latin America and Asia</h2>
<p>Brazil, Mexico, Chile, Indonesia and Thailand all operate import-tax regimes with different de minimis thresholds and different levels of marketplace facilitation. Two consistent themes: the thresholds are lower than most sellers assume, and under-declaring value is both common and increasingly detected through platform data sharing.</p>

<h2>What actually goes wrong</h2>
<ul>
<li><strong>Pricing ex-VAT and then discovering VAT applies</strong> — margin evaporates</li>
<li><strong>Missing registrations created by holding stock</strong> — penalties accrue from the first day of storage</li>
<li><strong>No audit trail</strong> — marketplace reports plus your own cost records must reconcile</li>
<li><strong>Assuming the marketplace handles everything</strong> — it handles collection, not your registrations</li>
</ul>

<h2>Build the record habit early</h2>
<p>Keep, per order: sale value, tax collected, marketplace fees, landed cost, and shipment reference. Reconcile monthly. Doing this from month one is trivial; reconstructing it a year later is not.</p>
<p>See the <a href="/compliance">compliance library</a> for jurisdiction-specific notes, and factor tax into margin with the <a href="/tool/profit-calculator">profit calculator</a> before setting prices.</p>

<h2>FAQ</h2>
<h3>Do I need a VAT number to sell cross-border?</h3>
<p>Not always. If the marketplace collects on your behalf under a deemed-supplier rule, you may trade without a local registration — until you hold stock locally. Verify per country.</p>

<h3>Is under-declaring customs value worth the risk?</h3>
<p>No. Penalties, seized shipments and platform account risk outweigh the duty saved, and platforms increasingly cross-check declared values against sale prices.</p>

<h3>Can I reclaim import VAT?</h3>
<p>Usually only if you are registered and the import is in your name as the importer of record. This is precisely why many sellers use a fiscal representative or a local entity.</p>
`,
  },
  {
    id: '19',
    title: 'TikTok Shop Product Selection: What Actually Sells vs What Looks Good',
    summary: 'Short-video commerce rewards demonstration over specification. A selection framework built on demonstrability, price band and creator supply.',
    cover: '/blog-covers/en-19.webp',
    category: '选品技巧',
    status: 'published',
    views: 0,
    createdAt: '2026-11-02',
    updatedAt: '2026-11-02',
    content: `
<p>TikTok Shop punishes products that need a paragraph of explanation. If the benefit cannot be shown in three seconds of video, the algorithm will not rescue it. That single constraint should drive selection more than any trend report.</p>

<h2>The three-question filter</h2>
<ol>
<li><strong>Can the result be shown, not described?</strong> Stain removal, hair styling, phone-stand stability — yes. Warranty terms, material certification — no.</li>
<li><strong>Is the price an impulse decision?</strong> Below roughly the local equivalent of $30, buyers decide in the video. Above $60, they leave the app to research.</li>
<li><strong>Is there creator supply?</strong> If no creator can film a compelling demo, you have a listing nobody will promote.</li>
</ol>
<p>A product that fails any one of these is usually not a TikTok Shop product, regardless of how good the margin looks.</p>

<h2>Categories that consistently work</h2>
<ul>
<li><strong>Visual transformation</strong> — cleaning, repair, organization, before/after</li>
<li><strong>Novelty with a clear function</strong> — kitchen gadgets that solve a visible annoyance</li>
<li><strong>Beauty and personal care</strong> — application is inherently filmable</li>
<li><strong>Fashion accessories</strong> — styling content is cheap to produce and repeatable</li>
</ul>

<h2>Categories that consistently fail</h2>
<ul>
<li>Products requiring trust documentation (safety-certified electronics for children)</li>
<li>High-ticket items where buyers compare specifications across sites</li>
<li>Commodity items with no visual differentiator — price war with no content angle</li>
</ul>

<h2>Margin structure is different here</h2>
<p>TikTok Shop economics include platform commission, affiliate commissions to creators (which can be substantial), and the cost of sample seeding. A product with a 30% Amazon margin may have 10% left after creator commissions. Model it explicitly:</p>
<ul>
<li>Sale price − platform commission − creator commission − landed cost − fulfillment − returns</li>
<li>Add the cost of samples sent to creators that produce no video</li>
</ul>
<p>Higher gross margins (50%+) are close to a requirement, because creator commission is a percentage of the sale price, not of your profit.</p>

<h2>The inventory trap</h2>
<p>Short-video demand is spiky. A single video can move a month of inventory in two days and then stop. Build in the ability to restock fast, or accept stockouts. Holding three months of inventory for a trend product is how sellers turn a viral hit into a loss.</p>

<p>Model unit economics in the <a href="/tool/profit-calculator">profit calculator</a> including creator commission as a cost line, and check the <a href="/platform/tiktok-shop">platform guide</a> for current commission tiers.</p>

<h2>FAQ</h2>
<h3>Do I need my own creators?</h3>
<p>Not initially. The affiliate marketplace connects you to creators who take commission. Your own creators give more control and better margins once a product proves itself.</p>

<h3>Is a viral video enough to sustain a product?</h3>
<p>No. Without repeatable content, sales decay quickly. Plan for a content cadence, not a single hit.</p>

<h3>How many SKUs should I test?</h3>
<p>Test narrow. Five to ten well-chosen SKUs with proper content beat fifty unproven ones, because content production is the real bottleneck.</p>
`,
  },
  {
    id: '20',
    title: 'How to Vet a China Supplier Before You Send a Deposit',
    summary: 'Business licence checks, sample protocol, factory versus trading company, payment terms and the QC steps that prevent a five-figure mistake.',
    cover: '/blog-covers/en-20.webp',
    category: '运营策略',
    status: 'published',
    views: 0,
    createdAt: '2026-11-01',
    updatedAt: '2026-11-01',
    content: `
<p>Most sourcing disasters are visible before the deposit is sent. They show up as a supplier who cannot answer a specific question, a business licence that does not match the company name, or a sample that was obviously produced in a different facility. The checks below take a few hours and prevent most of them.</p>

<h2>1. Verify the legal entity</h2>
<ul>
<li>Ask for the business licence (营业执照) and check that the company name matches the bank account name exactly</li>
<li>Check the registered capital, establishment date and business scope — a company registered three months ago with a broad scope is a reseller, not a factory</li>
<li>Cross-check the address against the factory photos and the shipping origin</li>
</ul>
<p>If the bank account name differs from the licence name, stop. That is the single strongest fraud signal in cross-border sourcing.</p>

<h2>2. Factory or trading company?</h2>
<p>Trading companies are not inherently bad — they can consolidate small orders and handle QC. But you should know which you are dealing with, because it changes price expectations and your ability to control quality.</p>
<p>Quick tells: ask what their production capacity is per day, what their main export markets are, and request a video call walking through the production line. A trading company will usually deflect the line walk.</p>

<h2>3. Run a real sample protocol</h2>
<ol>
<li>Order the sample <strong>paid</strong>, at the quoted unit price. Free samples hide cost problems</li>
<li>Request the sample from the production line, not a "golden sample" prepared for you</li>
<li>Test it the way your customer will, including the failure modes that generate returns</li>
<li>Measure and weigh it yourself — packaging dimensions drive your shipping cost</li>
<li>Photograph and keep the sample as your reference standard</li>
</ol>

<h2>4. Nail down the specification in writing</h2>
<p>"Same as sample" is not a specification. Put material, dimensions, weight tolerance, colour reference (Pantone), packaging, labelling and test requirements in the PO. Every ambiguous phrase becomes a dispute later.</p>

<h2>5. Payment terms that limit exposure</h2>
<ul>
<li>30/70 is common; 100% upfront is not acceptable for a first order</li>
<li>Use a payment method with recourse where possible</li>
<li>For larger orders, use inspection-linked payment: deposit → production → third-party inspection → balance</li>
<li>Never pay to a personal account</li>
</ul>

<h2>6. Inspect before the balance</h2>
<p>A third-party pre-shipment inspection typically costs a few hundred dollars and checks quantity, function, packaging and labelling against your spec. On a $10,000 order it is the cheapest insurance available. Inspect at AQL levels appropriate to your category rather than "check a few units".</p>

<h2>7. Plan the second order before the first ships</h2>
<p>Ask about lead time for reorders, MOQ changes, and whether the price holds for 90 days. A supplier who cannot commit to a reorder lead time will cause a stockout at the worst moment — right when your listing starts ranking.</p>

<h2>Red flags worth walking away from</h2>
<ul>
<li>Price far below the market for the stated specification</li>
<li>Refusal to provide a business licence or a video call</li>
<li>Pressure to pay outside the platform or to a personal account</li>
<li>Vague answers on certification for regulated categories</li>
</ul>

<p>If you would rather not manage suppliers directly, our <a href="/purchase">sourcing service</a> handles verification, sampling and inspection with documented reporting at each step.</p>

<h2>FAQ</h2>
<h3>Should I use Alibaba Trade Assurance?</h3>
<p>It adds a dispute mechanism and is worth using where available, but it does not replace inspecting the goods or verifying the entity.</p>

<h3>How much should a sample cost?</h3>
<p>Usually the unit price plus express shipping. If a supplier offers a free sample but quotes a price 20% above market, the sample was not free.</p>

<h3>How many suppliers should I contact?</h3>
<p>Three to five per product. Fewer and you cannot benchmark price and responsiveness; more and you lose time on suppliers you will never use.</p>
`,
  },
];
