// lib/articles-i18n/pt.ts
// Português (BR) — corpo dos artigos 1–10
import type { ArticleBodyPack } from "./types";

export const pt: ArticleBodyPack = {
  "1": `
<p>A maioria dos erros de seleção de produto não vem de não ter visto uma tendência, mas de não verificar, antes de gastar, se o produto absorve quatro custos transfronteiriços: frete, devolução, publicidade e conformidade. Isto é um filtro reutilizável, não uma lista de categorias da moda.</p>
<h2>1. Quatro filtros, em série</h2>
<p>Margem bruta depois de custo aportado, comissão, fulfillment, anúncios e devoluções. Peso cubado contra peso real. Comportamento de devolução e pós-venda. E a barreira de certificação. Aplique em ordem: se um falhar, descarte o produto. Ranking alto não salva economia unitária negativa — vender mais de um item que dá prejuízo só acelera o prejuízo.</p>
<h2>2. Transformar "parece viável" em três números</h2>
<p>Monte o modelo na <a href="/tools/product-analysis">calculadora de análise de produto</a>: preço de compra, frete de entrada, comissão, custo de separação e custo de anúncio. Ela devolve lucro líquido por unidade, margem líquida e volume de equilíbrio. A margem diz quantas guerras de preço você aguenta; o ponto de equilíbrio diz quanto tráfego orgânico você precisa.</p>
<p>Depois valide a demanda no <a href="/tools/keyword-lab">laboratório de palavras-chave</a>: quantas variações longas têm intenção clara de compra e quanto espaço resta no título (Amazon 200 caracteres, Mercado Livre 60, Shopee 255 — confirme no painel do vendedor). Um mercado sem cauda longa quase nunca é oceano azul: é um mercado que ninguém pesquisa. Por fim, passe as medidas na <a href="/tool/shipping-calculator">calculadora de frete</a>: frete de entrada mal calculado é o vazamento de margem mais comum de quem está começando.</p>
<h2>3. Verificar pelo mais barato primeiro</h2>
<ul>
<li><strong>Modelo primeiro</strong> — não custa nada e elimina a maioria dos candidatos em dez minutos.</li>
<li><strong>Intenção de busca depois</strong> — compra, não curiosidade.</li>
<li><strong>Amostra em seguida</strong> — compre uma ou duas unidades do concorrente; embalagem, manual e acabamento aparecem na hora.</li>
<li><strong>Estoque por último</strong> — primeiro pedido dimensionado para um ciclo de reposição, depois escala com dado real.</li>
</ul>
<h2>4. Erros recorrentes</h2>
<ul>
<li>Comparar produtos por faturamento em vez de margem líquida.</li>
<li>Ignorar o peso cubado até a fatura do transitário chegar.</li>
<li>Tratar certificação como papelada e não como linha de custo.</li>
</ul>
`,
  "2": `
<p>Conformidade na Europa e nos Estados Unidos não é um documento: são três perguntas diferentes. Quem recolhe o imposto, quem certifica o produto e quem responde legalmente se algo der errado. Quem trata tudo como um único item costuma travar na categoria, não na alfândega.</p>
<h2>1. Imposto: quem recolhe e quem declara</h2>
<p>Na UE, o IVA de vendas à distância normalmente é recolhido pelo marketplace nas vendas B2C até o limite do país de destino, e por você acima disso ou quando vende na sua própria loja. O IOSS vale para envios abaixo de €150; acima disso a importação é normal. Nos EUA o imposto é estadual e a recolha pela plataforma é o padrão. Regra prática: número de registro, período de apuração e prazo de guarda no mesmo lugar, e nunca supor que a plataforma fez uma declaração que você não conferiu.</p>
<h2>2. Certificação não é um certificado</h2>
<p>CE cobre uma família de diretivas — brinquedos, eletrônicos, compatibilidade eletromagnética, máquinas, EPI — cada uma com seu escopo de ensaio. FCC vale para rádio e eletrônicos nos EUA; FDA para contato com alimentos, cosméticos e certas alegações. O GPSR acrescenta rastreabilidade e responsável na UE para vários grupos; produtos infantis nos EUA exigem CPC. A armadilha é comprar um "certificado CE" barato de um produto cuja diretiva nunca foi ensaiada.</p>
<h2>3. Arquive antes de publicar</h2>
<ul>
<li>Relatórios de ensaio com diretiva e norma visíveis.</li>
<li>Declaração de conformidade assinada e datada.</li>
<li>Arte do rótulo: importador, endereço, lote e advertências no idioma local.</li>
<li>FISPQ para baterias, líquidos e aerossóis.</li>
<li>Mandato de representante, quando a norma exigir.</li>
</ul>
<h2>4. Como os vendedores caem</h2>
<p>Apresentar relatório chinês citando norma revogada; rotular só o fabricante, sem importador; enviar um kit em que um componente muda a classificação do produto. Resolva o papel antes do primeiro contêiner, não depois da primeira reclamação.</p>
`,
  "3": `
<p>Frete não é um custo, são quatro: manuseio na origem, alfândega e imposto, armazenagem e última milha. Cada um é cobrado em base diferente, então um modal "mais barato" pode sair mais caro por unidade quando você soma os outros três.</p>
<h2>1. Quatro trechos, quatro lógicas</h2>
<p>Marítimo cobra por metro cúbico com mínimo; aéreo por peso taxável (peso cubado = comprimento × largura × altura ÷ 6000 na maioria das companhias); expresso por peso real com tarifa por zona; última milha por faixa de peso e distância. O imposto depende do código HS e do valor declarado, e a armazenagem é cobrada por palete-dia ou por metro cúbico ao mês. Comparar só a tarifa principal é comparar um quarto da conta.</p>
<h2>2. Escolher o modal</h2>
<table><tbody>
<tr><td>Modal</td><td>Quando faz sentido</td><td>Atenção</td></tr>
<tr><td>Marítimo LCL</td><td>Vendas estáveis, 100–500 kg</td><td>Atraso de consolidação, congestionamento</td></tr>
<tr><td>Marítimo FCL</td><td>Volume previsível, valor unitário baixo</td><td>Capital parado por 40+ dias</td></tr>
<tr><td>Aéreo</td><td>Teste de SKU novo, ruptura de estoque</td><td>Peso cubado castiga volume leve</td></tr>
<tr><td>Armazém local</td><td>Mercados que exigem entrega rápida</td><td>Custo de armazenagem e giro baixo</td></tr>
</tbody></table>
<h2>3. Reposição como cálculo</h2>
<p>Estoque de segurança = vendas diárias médias × (lead time + período de revisão) × fator de serviço, menos o que já está em trânsito. O lead time deve ser medido do pagamento até o produto pronto na prateleira, não da partida à chegada: é aí que nascem as rupturas. Revise mensalmente; um colchão "que parece suficiente" é como se termina com ruptura e estoque morto no mesmo trimestre.</p>
<h2>4. Erros comuns</h2>
<ul>
<li>Cotar por quilo ignorando as taxas mínimas por envio.</li>
<li>Esquecer que em alguns mercados o imposto incide sobre valor com frete incluído.</li>
<li>Repor por intuição durante promoção em vez de por previsão.</li>
</ul>
`,
  "4": `
<p>Problemas de operação parecem "tráfego caro", mas o tráfego raramente é a causa. Percorra o funil em ordem — impressões, cliques, carrinho, pedido, recompra — e corrija a camada onde a queda é maior em relação à sua própria referência de categoria, não em relação ao print de um guru.</p>
<h2>1. Localizar o vazamento</h2>
<p>Impressões baixas: palavra-chave, posição na categoria ou cobertura de anúncio. Impressões boas e clique fraco: imagem principal, título e ancoragem de preço. Clique que não vira carrinho: página, avaliações e promessa de envio. Carrinho abandonado: atrito no checkout, meios de pagamento ou custo inesperado no fim.</p>
<h2>2. Título e imagem: comprar o clique</h2>
<p>O título ganha lugar casando com o que as pessoas digitam, na ordem em que digitam: termo principal, depois diferenciais, depois medida ou quantidade. Coloque o que separa você dos outros nove resultados nos primeiros 60 caracteres, porque é tudo o que aparece no celular. A imagem principal precisa sobreviver à miniatura: um produto, alto contraste, sem mural de texto e com referência de escala que responda "que tamanho é isso?".</p>
<h2>3. Página e avaliações: comprar o carrinho</h2>
<p>Responda as quatro perguntas que travam a compra: se serve, se funciona com o que já tenho, quanto tempo leva para chegar e o que acontece se quebrar. Inclua um bloco comparativo com a alternativa óbvia e coloque frete e devolução acima da dobra. Avaliações não são nota: são fonte de palavra-chave, e as frases que os compradores repetem são as que você deve responder.</p>
<h2>4. Recompra se desenha</h2>
<p>Inclua um cartão com o consumível ou acessório do produto, defina ciclo de lembrete para itens recorrentes e deixe a recompra a um clique. Retenção é mais barata que aquisição, mas só se você construir o mecanismo.</p>
<h2>5. Erros recorrentes</h2>
<ul>
<li>Aumentar verba de anúncio quando o problema real é o CTR.</li>
<li>Reescrever o título sem checar por quais termos ele posiciona hoje.</li>
<li>Tratar avaliações como gestão de reputação em vez de pesquisa de produto.</li>
</ul>
`,
  "5": `
<p>Listas de ferramentas são fáceis de escrever e difíceis de usar. Esta está organizada por decisão, não por fornecedor: cada bloco nomeia a pergunta que você quer responder, a ferramenta deste site que responde e o dado que só você pode trazer.</p>
<h2>1. Seleção: este SKU dá lucro?</h2>
<p>Use a <a href="/tools/product-analysis">calculadora de análise de produto</a> para modelar a economia unitária e a <a href="/tool/profit-calculator">calculadora de lucro</a> quando precisar do detalhamento de taxas por pedido. Nenhuma delas inventa seu preço de compra ou custo de anúncio: isso vem de cotação real.</p>
<h2>2. Palavras-chave e anúncio: ser achado e ser clicado</h2>
<p>O <a href="/tools/keyword-lab">laboratório de palavras-chave</a> expande termos semente em cauda longa, mede cobertura do título e gera CSV para trabalhar. Combine com o <a href="/tool/listing-optimizer">otimizador de anúncio</a> para pontuar o título contra limites de caractere e cobertura de termos antes de publicar. Limites: Amazon 200, Mercado Livre 60, Shopee 255 — confirme em cada painel, eles mudam.</p>
<h2>3. Custo e preço: inclua o câmbio</h2>
<p>O <a href="/tool/rate-converter">conversor de moedas</a> puxa cotação ao vivo e a calculadora de lucro aplica as taxas em cima. Não precifique com um câmbio de memória: dois pontos percentuais em margem fina são todo o lucro.</p>
<h2>4. Logística: acertar o peso cubado</h2>
<p>A <a href="/tool/shipping-calculator">calculadora de frete</a> compara peso cubado e real e mostra por qual você é cobrado. Produto volumoso e leve quase sempre é cobrado por volume.</p>
<h2>5. Conformidade: arquive antes de publicar</h2>
<p>A <a href="/compliance">biblioteca de conformidade</a> lista os documentos que cada mercado espera. Use como checklist antes do primeiro envio, não depois do primeiro bloqueio.</p>
<h2>6. Três regras para qualquer ferramenta</h2>
<ul>
<li>Informe números reais ou aceite ficção: calculadora com dados chutados é gerador de número aleatório.</li>
<li>Uma decisão por ferramenta. Se você não sabe nomear a decisão, não precisa da ferramenta.</li>
<li>Guarde a saída. Um CSV de palavras-chave ou um modelo salvo vale mais que um print que você não consegue repetir.</li>
</ul>
`,
  "6": `
<p>A América Latina não é um mercado só. México e Brasil diferem em idioma, identidade fiscal, hábito de pagamento e custo logístico, e um produto que funciona em um pode fracassar no outro por razões que nada têm a ver com demanda.</p>
<h2>1. México e Brasil são negócios diferentes</h2>
<p>O México roda em espanhol, com registro RFC e uma malha logística viável para vendedor transfronteiriço com armazém nos EUA ou na fronteira. O Brasil roda em português, com estrutura tributária complexa, custo de importação maior e desembaraço mais lento, o que empurra para estoque local ou programa logístico do marketplace. Orçamento e prazo devem ser construídos por país, não por região.</p>
<h2>2. Título de 60 caracteres muda a lógica de seleção</h2>
<p>O limite do Mercado Livre obriga a gastar caractere no termo de busca, não em adjetivo de marketing. Na prática premia produtos cujo valor se explica em quatro ou cinco palavras e pune kits que precisam de explicação. Teste seus títulos candidatos em 60 caracteres antes de comprometer estoque: se o título não carrega o termo principal mais um diferencial, o produto vai penar para ser encontrado.</p>
<h2>3. Direções a observar e suas armadilhas</h2>
<ul>
<li><strong>Acessórios de celular</strong> — demanda estável, mas concorrência de preço feroz e multiplicação de modelos compatíveis.</li>
<li><strong>Organização da casa</strong> — volumoso, então o peso cubado decide a margem; design dobrável ajuda.</li>
<li><strong>Beleza e cuidados pessoais</strong> — recompra alta, mas registro e rotulagem são rígidos.</li>
<li><strong>Autopeças</strong> — o dado de aplicação é a barreira; aplicação errada gera devolução que não se revende.</li>
</ul>
<h2>4. Precifique pensando no parcelamento</h2>
<p>Parcelamento sem juros é expectativa padrão nos dois mercados e a taxa fica com o vendedor. Inclua esse custo no preço em vez de descobri-lo no primeiro repasse. Confira a estrutura vigente de parcelamento e comissão no painel do vendedor: muda por categoria e por campanha.</p>
<h2>5. Erros comuns</h2>
<p>Lançar no Brasil com o manual do México; precificar sem a taxa de parcelamento; supor que um título de 60 caracteres carrega um kit; e enviar sem checar se o estado de destino aplica acréscimo fiscal ou logístico.</p>
`,
  "7": `
<p>Vender ao vivo não é falar rápido. É um funil com quatro números em sequência: taxa de entrada, tempo de permanência, clique no produto e conversão. Corrija nessa ordem e a sala compõe; pule uma e o tráfego é desperdiçado.</p>
<h2>1. Antes de entrar no ar: monte a escada de produto</h2>
<p>Planeje uma escada, não uma lista. Comece com item de preço baixo que resolve problema óbvio e traz os primeiros pedidos, siga para o produto principal com a margem real e use kit ou acessório para elevar o ticket. Cada produto precisa de uma demonstração que funcione sem palavra: no momento em que o espectador entende o benefício só pelo vídeo, a venda está no meio do caminho.</p>
<h2>2. Um roteiro reutilizável</h2>
<p>A cada cinco minutos, aproximadamente: gancho (que problema resolve), demonstração (mostre funcionando), prova (pedidos, avaliações, comparação), objeção (preço, tamanho, entrega), chamada para ação (qual botão, o que acontece). Repita com outro produto. Não leia especificação: demonstre o resultado.</p>
<h2>3. Revisar com quatro números</h2>
<ul>
<li><strong>Taxa de entrada</strong> — capa e três primeiros segundos funcionam?</li>
<li><strong>Permanência média</strong> — o ritmo do loop está certo ou o público sai no primeiro minuto?</li>
<li><strong>Clique no produto</strong> — a demonstração está conectada ao produto fixado?</li>
<li><strong>Conversão</strong> — preço, estoque e prazo são críveis?</li>
</ul>
<h2>4. Conectar conteúdo e prateleira</h2>
<p>Cortes da live viram vídeos curtos que alimentam a página do produto; a página alimenta a próxima live com avaliações e perguntas. Trate sala, cortes e anúncio como um sistema, não como três canais.</p>
<h2>5. Erros comuns</h2>
<p>Abrir com o produto mais caro; demonstrar característica em vez de resultado; transmitir duas horas sem rodar produto; e julgar a sessão por faturamento em vez de pelo número do funil que quebrou.</p>
`,
  "8": `
<p>Armazém no exterior não é armazém: é acelerador de prazo de entrega com conta de aluguel. Decidir usar é uma conta sobre giro, não sobre querer um selo de envio rápido.</p>
<h2>1. Três modelos, três estruturas de custo</h2>
<p>Fulfillment do marketplace (FBA e equivalentes) junta armazenagem, separação e atendimento em uma tarifa e dá o selo. Armazém de terceiro cobra armazenagem por palete ou metro cúbico mais manuseio por pedido, e dá flexibilidade. Armazém próprio só faz sentido com volume, porque mão de obra e sistema são custo fixo. Compare por pedido com suas medidas e pesos reais, não com tarifa de metro cúbico de manchete.</p>
<h2>2. Entrada: barre o erro antes do envio</h2>
<p>Toda entrada precisa de agendamento, especificação correta de etiqueta de caixa e palete e etiqueta unitária tipo FNSKU. As três falhas mais caras: enviar para o código de armazém errado, etiquetar bem a caixa e não a unidade, e chegar sem agendamento. Confira a especificação de novo antes de o contêiner sair: corrigir na chegada custa mais que o frete.</p>
<h2>3. Estoque: três números</h2>
<ul>
<li><strong>Dias de cobertura</strong> — disponível mais em trânsito dividido por venda diária.</li>
<li><strong>Giro nos primeiros 30 dias</strong> — o teste honesto de se o SKU merecia o espaço.</li>
<li><strong>Armazenagem sobre receita</strong> — o número que come a margem em silêncio.</li>
</ul>
<h2>4. Última milha: escolher por faixa de peso</h2>
<p>Transportadoras cobram por faixa e a opção mais barata muda em cada quebra. Monte uma tabela com suas três faixas principais contra três transportadoras e reprecifique trimestralmente; uma única transportadora para tudo é conveniente e caro.</p>
<h2>5. O que não vale pré-posicionar</h2>
<p>Sazonal de giro lento, frágil com devolução alta, produto de validade curta e qualquer coisa cuja demanda você ainda não provou. Prove o SKU por aéreo e depois leve para estoque.</p>
`,
  "9": `
<p>Shopee e Lazada parecem iguais por fora e se comportam diferente por dentro: documentos de cadastro, estrutura de taxas, programas logísticos e sistemas de pontuação têm lógicas próprias. Consulte as tarifas vigentes no painel do vendedor — aqui falamos da estrutura, que muda muito menos que os números.</p>
<h2>1. Cadastro: prepare o arquivo antes de solicitar</h2>
<p>Conte com licença de atividade, documento do representante legal, conta bancária no nome da empresa e licenças por categoria para cosméticos, alimentos, eletrônicos e infantil. As solicitações travam nos detalhes: nome que não bate entre licença e banco, digitalização ilegível ou categoria que exige carta de autorização adicional.</p>
<h2>2. Taxas: comissão não é a conta inteira</h2>
<p>Olhe quatro linhas: comissão por categoria, taxa de transação ou pagamento, custo de participar de campanha e contribuição ao subsídio de frete. Uma campanha que sobe volume 30% mas adiciona 8 pontos de custo pode continuar dando prejuízo em item de margem fina. Modele a campanha na calculadora de lucro antes de inscrever.</p>
<h2>3. Logística: as métricas são restrição dura</h2>
<p>Taxa de envio atrasado, taxa de não envio e taxa de cancelamento são medidas e alimentam diretamente os pontos de penalidade e a visibilidade na busca. Use o programa logístico da plataforma quando existir: custa dinheiro, mas elimina uma classe de penalidade por atraso que você não controla de outra forma.</p>
<h2>4. Pontos e recuperação</h2>
<p>Os pontos vêm de envio tardio, cancelamento, denúncia de falsificação e infração de anúncio. A recuperação não é imediata: normalmente exige um ciclo limpo de envios no prazo. Planeje capacidade para que uma promoção não empurre você acima do limite diário de separação; é a penalidade mais comum que o vendedor causa a si mesmo.</p>
<h2>5. Linhas que não se cruzam</h2>
<ul>
<li>Publicar em categoria restrita sem aprovação.</li>
<li>Usar imagem ou marca de outro vendedor no título.</li>
<li>Pedir ao comprador que cancele e refaça para driblar a métrica de atraso.</li>
<li>Enviar produto substituto quando o estoque acaba.</li>
</ul>
`,
  "10": `
<p>A maioria dos painéis é decoração. Um painel útil responde a pergunta sobre a qual você vai agir, e nada mais. Cinco grupos de métrica, três níveis de análise e oito números por semana bastam para tocar uma loja.</p>
<h2>1. Cinco grupos, cada um com uma ação</h2>
<table><tbody>
<tr><td>Grupo</td><td>Métrica</td><td>Ação que dispara</td></tr>
<tr><td>Tráfego</td><td>Impressões, CTR</td><td>Ajustar palavra-chave, imagem principal, lance</td></tr>
<tr><td>Conversão</td><td>Taxa de carrinho, conversão de pedido</td><td>Reescrever página, avaliações, preço</td></tr>
<tr><td>Ticket</td><td>Valor médio, unidades por pedido</td><td>Kit, oferta por valor mínimo</td></tr>
<tr><td>Lucro</td><td>Margem líquida por pedido</td><td>Reprecificar, renegociar frete, cortar desperdício de anúncio</td></tr>
<tr><td>Saúde</td><td>Devolução, envio atrasado, cobertura de estoque</td><td>Corrigir qualidade, ajustar capacidade, repor</td></tr>
</tbody></table>
<h2>2. Três níveis: SKU, loja, caixa</h2>
<p>No SKU você decide manter, corrigir ou cortar. Na loja você decide onde vai a próxima unidade de verba. No caixa você decide se o crescimento é pagável: estoque mais anúncio mais o calendário de repasse da plataforma é o que quebra quem cresce, não a margem.</p>
<h2>3. Um painel semanal de oito números</h2>
<ul>
<li>Receita, lucro líquido, margem líquida</li>
<li>Impressões, CTR</li>
<li>Conversão, ticket médio</li>
<li>Dias de cobertura de estoque</li>
</ul>
<p>Oito números, uma página, revisados no mesmo dia toda semana. Se um número mudou, você precisa nomear a mudança que causou; se não consegue, o painel não está medindo suas decisões.</p>
<h2>4. Usar ferramenta sem desperdiçar</h2>
<p>Exporte o dado em vez de ler na tela, mantenha uma planilha por trimestre e conecte cada métrica a uma decisão que você realmente tomou. Relatório que ninguém usa é custo, não ativo.</p>
`,
};
