// lib/articles-i18n/en.ts
// English bodies for articles 1–10 (source: lib/articles-zh-a.ts / -zh-b.ts)
import type { ArticleBodyPack } from "./types";

export const en: ArticleBodyPack = {
  "1": `
<p>Most product-selection failures are not about missing a trend. They are about not checking, before spending money, whether a product can absorb four cross-border costs: freight, returns, advertising and compliance. This is a filter you can reuse, not a list of hot categories.</p>
<h2>1. Four filters, applied in series</h2>
<p>Gross margin after landed cost, commission, fulfilment, ads and returns. Volumetric weight versus actual weight. Return and after-sales behaviour. And the certification barrier. Run them in order — if one fails, drop the product. A high sales rank never rescues negative unit economics; selling more of a loss-making item only loses money faster.</p>
<h2>2. Turn "this feels doable" into three numbers</h2>
<p>Build a unit-economics model in the <a href="/tools/product-analysis">product analysis calculator</a>: purchase price, inbound freight, marketplace commission, fulfilment fee and ad cost. It returns net profit per unit, net margin and break-even volume. Net margin tells you how many price wars you can survive; break-even volume tells you how much traffic you must generate for free.</p>
<p>Then test demand in the <a href="/tools/keyword-lab">keyword lab</a>: how many long-tail phrases carry clear purchase intent, and how much title space is left (Amazon 200 characters, Mercado Libre 60, Shopee 255 — always confirm in the seller centre). A market with no long-tail variants is usually not a blue ocean; it is a market nobody searches in. Finally, run your packaging dimensions through the <a href="/tool/shipping-calculator">shipping calculator</a> — miscalculated inbound freight is the most common hidden loss for new sellers.</p>
<h2>3. Cheapest verification first</h2>
<ul>
<li><strong>Model first</strong> — costs nothing, eliminates most candidates in ten minutes.</li>
<li><strong>Search intent second</strong> — you want buying intent, not curiosity.</li>
<li><strong>Samples third</strong> — buy one or two competitor units; packaging, manual and finish quality show up instantly in your hand.</li>
<li><strong>Stock last</strong> — first order sized for one replenishment cycle, then scale with real data.</li>
</ul>
<h2>4. Recurring mistakes</h2>
<ul>
<li>Comparing products by revenue instead of net margin.</li>
<li>Ignoring volumetric weight until the freight invoice arrives.</li>
<li>Treating certification as paperwork rather than a cost line.</li>
<li>Judging a category by bestseller lists, which show winners and hide the failure rate.</li>
</ul>
`,
  "2": `
<p>European and American compliance is not one document — it is three separate questions: who collects the tax, who certifies the product, and who is legally responsible if something goes wrong. Sellers who treat them as one item usually get blocked at the category gate, not at customs.</p>
<h2>1. Tax: who collects, who remits</h2>
<p>For EU distance sales, VAT is generally collected by the marketplace on B2C transactions up to the destination country's threshold, and by you above it, or when selling through your own store. IOSS matters for consignments under €150; anything above that is imported normally. In the US, sales tax is state-level and marketplace-facilitated collection is the default on major platforms. The practical rule: keep the registration number, the filing period and the retention requirement in one place, and do not assume the marketplace handled a filing you never checked.</p>
<h2>2. Certification is not one certificate</h2>
<p>CE covers a family of directives — toys, electronics, EMC, machinery, PPE — and each has its own test scope. FCC applies to radio and electronic devices in the US; FDA to food contact, cosmetics and some medical claims. GPSR adds traceability and a named EU responsible person for many product groups; children's products in the US need a CPC. The trap is buying a cheap "CE certificate" for a product whose directive was never tested.</p>
<h2>3. Archive these before you list</h2>
<ul>
<li>Test reports with the directive and standard numbers visible.</li>
<li>Declaration of conformity, signed and dated.</li>
<li>Label artwork: importer name, address, batch and warnings in local language.</li>
<li>Safety data sheets for batteries, liquids and aerosols.</li>
<li>Responsible-person mandate, where the regulation requires one.</li>
</ul>
<h2>4. Common ways sellers get caught</h2>
<p>Using a Chinese test report that lists a standard the EU directive replaced; labelling with the manufacturer only, no importer; shipping a bundle where one component changes the product class. Fix the paperwork before the first container, not after the first complaint.</p>
`,
  "3": `
<p>Freight is not one cost — it is four: origin handling, customs and duty, storage, and last mile. Each is priced on a different basis, so a "cheaper" mode can be more expensive per unit once the other three are added.</p>
<h2>1. Four segments, four billing logics</h2>
<p>Sea freight bills by CBM with a minimum, air by chargeable weight (volumetric weight is length × width × height ÷ 6000 for most carriers), express by actual weight with zone pricing, and last mile by weight band plus distance. Duty depends on HS code and declared value, and storage is billed per pallet-day or per cubic metre per month. If you only compare the headline freight rate, you are comparing one quarter of the bill.</p>
<h2>2. Choosing a mode</h2>
<table><tbody>
<tr><td>Mode</td><td>Best for</td><td>Watch out for</td></tr>
<tr><td>Sea LCL</td><td>Steady sellers, 100–500 kg</td><td>Consolidation delays, port congestion</td></tr>
<tr><td>Sea FCL</td><td>Predictable volume, low unit value</td><td>Working capital tied up for 40+ days</td></tr>
<tr><td>Air</td><td>New SKU testing, restock gaps</td><td>Volumetric weight kills light bulky goods</td></tr>
<tr><td>Overseas warehouse</td><td>Fast delivery promise markets</td><td>Storage fees and slow-moving stock</td></tr>
</tbody></table>
<h2>3. Restock cadence as a calculation</h2>
<p>Safety stock = average daily sales × (lead time + review period) × service factor, minus stock already in transit. Lead time should be measured from payment to shelf-ready, not from departure to arrival — the gap is where stockouts come from. Review the number monthly; a "feels about right" buffer is how sellers end up with both a stockout and dead inventory in the same quarter.</p>
<h2>4. Common errors</h2>
<ul>
<li>Quoting freight per kilogram while ignoring minimum charges.</li>
<li>Forgetting that duty is charged on freight-inclusive value in some markets.</li>
<li>Restocking on gut feel during a promotion instead of on a forecast.</li>
</ul>
`,
  "4": `
<p>Operations problems look like "traffic is expensive", but traffic is rarely the cause. Work the funnel in order — impressions, click-through, add-to-cart, checkout, repeat — and fix the layer where the drop is steepest compared with your own category baseline, not with a guru's screenshot.</p>
<h2>1. Find the leaking layer</h2>
<p>If impressions are low, the problem is keywords, category placement or ad coverage. If impressions are fine and clicks are weak, it is the main image, title and price anchor. If clicks convert to carts poorly, it is the detail page, reviews and shipping promise. If carts abandon, it is checkout friction, payment methods or unexpected cost at the last step.</p>
<h2>2. Title and main image: buy the click</h2>
<p>A title earns its place by matching what people actually type, in the order they type it: core term first, then differentiators, then size or quantity. Put the words that separate you from the other nine results in the first 60 characters, because that is all mobile shows. The main image should survive a thumbnail: one product, high contrast, no text walls, and the scale cue that answers "how big is it".</p>
<h2>3. Detail page and reviews: buy the cart</h2>
<p>Answer the four questions that stop a purchase — will it fit, will it work with what I own, how long does delivery take, what happens if it breaks. Use a comparison block against the obvious alternative, and put shipping and returns above the fold. Reviews are not a score, they are a keyword source: the phrases buyers repeat are the phrases you should be answering.</p>
<h2>4. Repeat purchase is designed, not hoped for</h2>
<p>Insert a card with the consumable or accessory that goes with the product, set a reminder-friendly cycle for repeat items, and make the reorder path one click. Retention is cheaper than acquisition, but only if you build the mechanism.</p>
<h2>5. Recurring mistakes</h2>
<ul>
<li>Raising ad spend when the click-through rate is the real problem.</li>
<li>Rewriting the title without checking which search terms it currently ranks for.</li>
<li>Treating reviews as reputation management instead of product research.</li>
</ul>
`,
  "5": `
<p>Tool lists are easy to write and hard to use. This one is organised by decision, not by vendor: each block names the question you are trying to answer, the tool on this site that answers it, and the data you must bring yourself.</p>
<h2>1. Selection: will this SKU make money?</h2>
<p>Use the <a href="/tools/product-analysis">product analysis calculator</a> to model unit economics, and the <a href="/tool/profit-calculator">profit calculator</a> when you need a fee breakdown per order. Neither can invent your purchase price or your ad cost — those are yours to source from a real quote.</p>
<h2>2. Keywords and listings: being found and being clicked</h2>
<p>The <a href="/tools/keyword-lab">keyword lab</a> expands seed terms into long-tail phrases, measures title coverage and produces a CSV you can work from. Pair it with the <a href="/tool/listing-optimizer">listing optimiser</a> to score a title against character limits and term coverage before you publish. Character limits: Amazon 200, Mercado Libre 60, Shopee 255 — confirm in each seller centre, they change.</p>
<h2>3. Cost and pricing: put the exchange rate in</h2>
<p>The <a href="/tool/rate-converter">currency converter</a> pulls a live rate, and the profit calculator applies fees on top. Do not price from a rate you remember; a two-percent move on a thin margin is the whole profit.</p>
<h2>4. Logistics: get volumetric weight right</h2>
<p>The <a href="/tool/shipping-calculator">shipping calculator</a> compares volumetric and actual weight and shows which one you are billed on. Bulky-light products are almost always billed on volume.</p>
<h2>5. Compliance: archive before listing</h2>
<p>The <a href="/compliance">compliance library</a> lists the documents each market expects. Treat it as a checklist to complete before the first shipment, not after the first takedown.</p>
<h2>6. Three rules for using any tool</h2>
<ul>
<li>Input real numbers or expect fiction. A calculator with guessed inputs is a random number generator.</li>
<li>One decision per tool. If you cannot name the decision, you do not need the tool.</li>
<li>Keep the output. A CSV of keywords or a saved model beats a screenshot you cannot re-run.</li>
</ul>
`,
  "6": `
<p>Latin America is not one market. Mexico and Brazil differ in language, tax identity, payment behaviour and logistics cost, and a product that works in one can fail in the other for reasons that have nothing to do with demand.</p>
<h2>1. Mexico and Brazil are different businesses</h2>
<p>Mexico runs on Spanish, RFC registration, and a logistics network that is workable for cross-border sellers with a US or border warehouse. Brazil runs on Portuguese, a complex tax structure, higher import costs and longer clearance — which pushes you towards local stock or a marketplace fulfilment programme. Budget and timeline should be built per country, not per region.</p>
<h2>2. A 60-character title changes selection logic</h2>
<p>Mercado Libre's title limit forces you to spend characters on the search term, not on marketing adjectives. Practically, this rewards products whose value can be stated in four or five words, and punishes bundles whose value needs explanation. Test your candidate titles at 60 characters before you commit to inventory: if the title cannot carry the core term plus one differentiator, the product will struggle to be found.</p>
<h2>3. Directions worth watching, and their traps</h2>
<ul>
<li><strong>Phone accessories</strong> — steady demand, but price competition is severe and compatibility models multiply.</li>
<li><strong>Home organisation</strong> — bulky, so volumetric weight decides your margin; folding designs help.</li>
<li><strong>Beauty and personal care</strong> — high repeat rate, but registration and labelling requirements are strict.</li>
<li><strong>Auto parts</strong> — fitment data is the moat; wrong fitment produces returns you cannot resell.</li>
</ul>
<h2>4. Price with instalments in mind</h2>
<p>Interest-free instalments are a default expectation in both markets, and the fee is borne by the seller. Build the instalment cost into the price rather than discovering it after the first settlement. Check the current instalment and commission structure in the seller centre — the numbers differ by category and by campaign.</p>
<h2>5. Common errors</h2>
<p>Launching in Brazil with a Mexico playbook; pricing without instalment fees; assuming a 60-character title can carry a bundle; and shipping without checking whether the destination state has a tax or logistics surcharge.</p>
`,
  "7": `
<p>Live selling is not about talking fast. It is a funnel with four numbers in sequence: entry rate, watch time, product click, conversion. Fix them in that order and the room compounds; skip one and the traffic is wasted.</p>
<h2>1. Before you go live: build the product ladder</h2>
<p>Plan a ladder, not a list. Start with a low-price item that solves an obvious problem and gets the first orders, then move to the main product with the real margin, then use a bundle or accessory to raise basket size. Each product needs one demonstration that works without words — the moment the viewer understands the benefit from the video alone, the sale is halfway done.</p>
<h2>2. A reusable script loop</h2>
<p>Roughly every five minutes: hook (what problem this solves), demonstration (show it working), proof (orders, reviews, comparison), objection handling (price, size, delivery), call to action (which button, what happens next). Repeat with a different product. Do not read specifications — demonstrate the outcome.</p>
<h2>3. Review with four numbers only</h2>
<ul>
<li><strong>Entry rate</strong> — is the cover and first three seconds working?</li>
<li><strong>Average watch time</strong> — is the loop pacing right, or are people leaving in the first minute?</li>
<li><strong>Product click rate</strong> — is the demo connected to the pinned product?</li>
<li><strong>Conversion rate</strong> — is the price, stock and delivery promise credible?</li>
</ul>
<h2>4. Connect content to the shelf</h2>
<p>Clips cut from the live session become short videos that feed the product page; the product page then feeds the next live session with reviews and questions. Treat the live room, the clips and the listing as one system rather than three channels.</p>
<h2>5. Common errors</h2>
<p>Opening with the highest-priced product; demonstrating features instead of the outcome; running a two-hour stream with no product rotation; and judging a session by revenue instead of by which funnel number broke.</p>
`,
  "8": `
<p>An overseas warehouse is not a warehouse — it is a delivery-speed accelerator with a rent bill. The decision to use one is a calculation about turnover, not about wanting a faster shipping badge.</p>
<h2>1. Three warehouse models, three cost structures</h2>
<p>Marketplace fulfilment (FBA and equivalents) bundles storage, pick-and-pack and customer service into one fee and gives you the badge. A third-party warehouse bills storage per pallet or cubic metre plus per-order handling, and gives you flexibility. A self-managed warehouse is only rational at volume, because labour and system costs are fixed. Compare them per order at your actual size and weight, not at a headline per-cubic-metre rate.</p>
<h2>2. Inbound: stop errors before the shipment</h2>
<p>Every inbound needs an appointment, an accurate carton and pallet labelling spec, and a unit-level FNSKU or equivalent. The three failures that cost the most are: shipping to the wrong warehouse code, labelling the outer carton correctly but not the unit, and arriving without an appointment. Check the inbound spec again before the container leaves — corrections after arrival cost more than the freight.</p>
<h2>3. Inventory: watch three numbers</h2>
<ul>
<li><strong>Days of cover</strong> — on-hand plus in-transit divided by daily sales.</li>
<li><strong>Sell-through in the first 30 days</strong> — the honest test of whether the SKU deserved the space.</li>
<li><strong>Storage cost as a share of revenue</strong> — the number that quietly eats margin.</li>
</ul>
<h2>4. Last mile: choose by weight band</h2>
<p>Carriers price in bands, and the cheapest option changes at each break. Build a small table of your top three weight bands against three carriers and re-price it quarterly; a single carrier for everything is convenient and expensive.</p>
<h2>5. What should not be pre-positioned</h2>
<p>Slow-moving seasonal goods, fragile items with high return rates, products with short shelf life, and anything whose demand you have not yet proven. Prove the SKU with air freight first, then move it into stock.</p>
`,
  "9": `
<p>Shopee and Lazada look similar from outside and behave differently underneath: onboarding documents, fee structure, logistics programmes and penalty systems each have their own logic. Read the seller centre for current rates — this is about the structure, which changes far less than the numbers.</p>
<h2>1. Onboarding: prepare the file before you apply</h2>
<p>Expect to need a business licence, a legal representative's ID, a bank account in the entity's name, and category-specific permits for cosmetics, food, electronics and children's products. Applications stall on the details: a name mismatch between licence and bank account, a blurred scan, or a category that needs an extra letter of authorisation.</p>
<h2>2. Fees: commission is not the whole bill</h2>
<p>Look at four lines: commission by category, transaction or payment fee, campaign participation cost, and shipping subsidy contribution. A campaign that lifts volume 30 percent while adding 8 points of fee can still be a loss on a thin-margin item. Model the campaign in the profit calculator before you enrol.</p>
<h2>3. Logistics: the metrics are hard constraints</h2>
<p>Late shipment rate, non-shipment rate and cancellation rate are measured, and they feed directly into penalty points and search visibility. Use the platform's logistics programme where it exists: it costs money but it removes a class of shipping-delay penalties you cannot control otherwise.</p>
<h2>4. Penalty points and recovery</h2>
<p>Points accumulate from late fulfilment, cancellations, counterfeit claims and listing violations. Recovery is not instant — it usually takes a clean cycle of on-time shipments. Plan capacity so a promotion does not push you past your daily packing limit; that is the most common self-inflicted penalty.</p>
<h2>5. Lines not to cross</h2>
<ul>
<li>Listing a product in a restricted category without approval.</li>
<li>Using another seller's images or brand terms in the title.</li>
<li>Asking buyers to cancel and reorder to dodge a late-shipment metric.</li>
<li>Shipping a substitute product when stock runs out.</li>
</ul>
`,
  "10": `
<p>Most dashboards are decoration. A useful one answers a question you are about to act on, and nothing else. Five metric groups, three levels of analysis, eight numbers per week — that is enough to run a store.</p>
<h2>1. Five metric groups, each tied to an action</h2>
<table><tbody>
<tr><td>Group</td><td>Metric</td><td>Action it triggers</td></tr>
<tr><td>Traffic</td><td>Impressions, click-through rate</td><td>Adjust keywords, main image, ad bids</td></tr>
<tr><td>Conversion</td><td>Add-to-cart rate, order conversion</td><td>Rewrite detail page, reviews, price</td></tr>
<tr><td>Basket</td><td>Average order value, units per order</td><td>Bundle, threshold offer</td></tr>
<tr><td>Profit</td><td>Net margin per order</td><td>Reprice, renegotiate freight, cut ad waste</td></tr>
<tr><td>Health</td><td>Return rate, late shipment, stock cover</td><td>Fix quality, adjust capacity, reorder</td></tr>
</tbody></table>
<h2>2. Three levels: SKU, store, cash</h2>
<p>At SKU level you decide whether to keep, fix or drop. At store level you decide where the next unit of ad budget goes. At cash level you decide whether the growth is affordable — inventory plus ad spend plus platform payout timing is what actually breaks growing sellers, not margin.</p>
<h2>3. A weekly dashboard of eight numbers</h2>
<ul>
<li>Revenue, net profit, net margin</li>
<li>Impressions, click-through rate</li>
<li>Conversion rate, average order value</li>
<li>Days of stock cover</li>
</ul>
<p>Eight numbers, one page, reviewed on the same day each week. If a number moved, you must be able to name the change you made that caused it; if you cannot, the dashboard is not measuring your decisions.</p>
<h2>4. Using tools without wasting them</h2>
<p>Export data rather than reading it on screen; keep one spreadsheet per quarter; and connect each metric to a decision you actually took. A report nobody acts on is a cost, not an asset.</p>
`,
};
