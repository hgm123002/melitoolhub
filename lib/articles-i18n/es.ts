// lib/articles-i18n/es.ts
// Español — cuerpo de los artículos 1–10
import type { ArticleBodyPack } from "./types";

export const es: ArticleBodyPack = {
  "1": `
<p>La mayoría de los fracasos en selección de producto no vienen de no haber visto una tendencia, sino de no comprobar antes de invertir si el producto puede absorber cuatro costes transfronterizos: flete, devoluciones, publicidad y cumplimiento. Esto es un filtro reutilizable, no una lista de categorías de moda.</p>
<h2>1. Cuatro filtros, en serie</h2>
<p>Margen bruto después de coste aterrizado, comisión, logística, publicidad y devoluciones. Peso volumétrico frente a peso real. Comportamiento de devoluciones y posventa. Y la barrera de certificación. Se aplican en orden: si uno falla, se descarta el producto. Un buen ranking de ventas no salva una economía unitaria negativa; vender más de un artículo que pierde dinero solo acelera la pérdida.</p>
<h2>2. Convertir "parece viable" en tres números</h2>
<p>Construye el modelo con la <a href="/tools/product-analysis">calculadora de análisis de producto</a>: precio de compra, flete de entrada, comisión, coste de preparación de pedido y coste publicitario. Devuelve beneficio neto por unidad, margen neto y volumen de equilibrio. El margen neto indica cuántas guerras de precios puedes resistir; el punto de equilibrio, cuánto tráfico orgánico necesitas.</p>
<p>Después valida la demanda en el <a href="/tools/keyword-lab">laboratorio de palabras clave</a>: cuántas variantes largas tienen intención de compra clara y cuánto espacio queda en el título (Amazon 200 caracteres, Mercado Libre 60, Shopee 255 — confirma siempre en el panel del vendedor). Un mercado sin variantes largas casi nunca es un océano azul: es un mercado que nadie busca. Por último, pasa tus medidas por la <a href="/tool/shipping-calculator">calculadora de envíos</a>: el flete de entrada mal calculado es la fuga de margen más habitual del principiante.</p>
<h2>3. Verificar empezando por lo más barato</h2>
<ul>
<li><strong>Primero el modelo</strong> — no cuesta nada y descarta la mayoría de candidatos en diez minutos.</li>
<li><strong>Después la intención de búsqueda</strong> — compra, no curiosidad.</li>
<li><strong>Luego la muestra</strong> — compra una o dos unidades de la competencia; el embalaje, el manual y los acabados se ven al instante.</li>
<li><strong>El stock al final</strong> — primer pedido dimensionado para un ciclo de reposición, y luego escala con datos reales.</li>
</ul>
<h2>4. Errores recurrentes</h2>
<ul>
<li>Comparar productos por facturación en lugar de por margen neto.</li>
<li>Ignorar el peso volumétrico hasta que llega la factura del transitario.</li>
<li>Tratar la certificación como un trámite y no como una línea de coste.</li>
</ul>
`,
  "2": `
<p>El cumplimiento en Europa y Estados Unidos no es un documento: son tres preguntas distintas. Quién recauda el impuesto, quién certifica el producto y quién responde legalmente si algo falla. Quien las trata como un solo trámite suele quedarse bloqueado en la categoría, no en la aduana.</p>
<h2>1. Impuestos: quién recauda y quién declara</h2>
<p>En la UE, el IVA de las ventas a distancia lo suele recaudar el marketplace en las operaciones B2C hasta el umbral del país de destino, y tú por encima de ese umbral o cuando vendes en tu propia tienda. El IOSS aplica a envíos de menos de 150 €; por encima se importa de forma ordinaria. En EE. UU. el impuesto es estatal y la recaudación por plataforma es la norma. Regla práctica: número de registro, periodo de declaración y plazo de conservación en un mismo lugar, y no dar por hecho una declaración que nunca revisaste.</p>
<h2>2. La certificación no es un certificado</h2>
<p>CE agrupa varias directivas — juguetes, electrónica, compatibilidad electromagnética, maquinaria, equipos de protección — y cada una tiene su alcance de ensayo. FCC aplica a dispositivos de radio y electrónicos en EE. UU.; FDA a contacto alimentario, cosmética y determinadas declaraciones sanitarias. GPSR añade trazabilidad y un responsable en la UE para muchos grupos de producto; los artículos infantiles en EE. UU. requieren CPC. La trampa es comprar un "certificado CE" barato de un producto cuya directiva nunca se ensayó.</p>
<h2>3. Archiva esto antes de publicar</h2>
<ul>
<li>Informes de ensayo con directiva y norma visibles.</li>
<li>Declaración de conformidad firmada y fechada.</li>
<li>Arte de etiqueta: importador, dirección, lote y advertencias en idioma local.</li>
<li>Fichas de datos de seguridad para baterías, líquidos y aerosoles.</li>
<li>Mandato de representante, cuando la norma lo exija.</li>
</ul>
<h2>4. Cómo se cae la gente</h2>
<p>Presentar un informe chino que cita una norma derogada; etiquetar solo al fabricante sin importador; enviar un pack donde un componente cambia la clasificación del producto. Arregla el papel antes del primer contenedor, no después de la primera reclamación.</p>
`,
  "3": `
<p>El flete no es un coste, son cuatro: manipulación en origen, aduana y aranceles, almacenaje y última milla. Cada uno se factura con una base distinta, así que un modo "más barato" puede salir más caro por unidad al sumar los otros tres.</p>
<h2>1. Cuatro tramos, cuatro lógicas de facturación</h2>
<p>Marítimo factura por metro cúbico con mínimo; aéreo por peso facturable (peso volumétrico = largo × ancho × alto ÷ 6000 en la mayoría de transportistas); exprés por peso real con tarifas por zona; última milla por tramo de peso más distancia. El arancel depende del código HS y del valor declarado, y el almacenaje se cobra por palé-día o por metro cúbico al mes. Comparar solo la tarifa principal es comparar una cuarta parte de la factura.</p>
<h2>2. Elegir modo</h2>
<table><tbody>
<tr><td>Modo</td><td>Cuándo conviene</td><td>Ojo con</td></tr>
<tr><td>Marítimo LCL</td><td>Ventas estables, 100–500 kg</td><td>Retrasos de consolidación, congestión portuaria</td></tr>
<tr><td>Marítimo FCL</td><td>Volumen previsible, valor unitario bajo</td><td>Capital inmovilizado 40+ días</td></tr>
<tr><td>Aéreo</td><td>Prueba de SKU nuevo, roturas de stock</td><td>El peso volumétrico castiga lo voluminoso y ligero</td></tr>
<tr><td>Almacén local</td><td>Mercados que exigen entrega rápida</td><td>Coste de almacenaje y stock de baja rotación</td></tr>
</tbody></table>
<h2>3. La reposición como cálculo</h2>
<p>Stock de seguridad = ventas diarias medias × (plazo de entrega + periodo de revisión) × factor de servicio, menos lo que ya está en tránsito. El plazo debe medirse desde el pago hasta que el producto está listo en estantería, no desde la salida hasta la llegada: ahí es donde nacen las roturas. Revísalo cada mes; un colchón "que parece suficiente" es cómo se acaba con rotura y stock muerto en el mismo trimestre.</p>
<h2>4. Errores habituales</h2>
<ul>
<li>Cotizar por kilo ignorando los mínimos por envío.</li>
<li>Olvidar que en algunos mercados el arancel se calcula sobre valor con flete incluido.</li>
<li>Reponer por intuición en plena campaña en lugar de por previsión.</li>
</ul>
`,
  "4": `
<p>Los problemas de operación parecen "el tráfico es caro", pero el tráfico rara vez es la causa. Recorre el embudo en orden — impresiones, clics, carrito, compra, recompra — y arregla la capa donde la caída es más pronunciada frente a tu propia referencia de categoría, no frente a la captura de un gurú.</p>
<h2>1. Localizar la fuga</h2>
<p>Si las impresiones son bajas, el problema es palabra clave, ubicación en categoría o cobertura de anuncios. Si las impresiones están bien y el clic es débil, es imagen principal, título y anclaje de precio. Si el clic no llega al carrito, es ficha, reseñas y promesa de envío. Si el carrito se abandona, es fricción de pago, métodos disponibles o coste inesperado al final.</p>
<h2>2. Título e imagen: comprar el clic</h2>
<p>El título gana su lugar coincidiendo con lo que la gente escribe, en el orden en que lo escribe: término principal, luego diferenciales, luego medida o cantidad. Pon lo que te separa de los otros nueve resultados en los primeros 60 caracteres, porque es todo lo que se ve en móvil. La imagen principal debe sobrevivir a una miniatura: un producto, alto contraste, sin muros de texto, y la referencia de escala que responde "¿de qué tamaño es?".</p>
<h2>3. Ficha y reseñas: comprar el carrito</h2>
<p>Responde las cuatro preguntas que frenan la compra: si encaja, si funciona con lo que ya tengo, cuánto tarda en llegar y qué pasa si se rompe. Añade un bloque comparativo contra la alternativa obvia y sube envío y devoluciones por encima del pliegue. Las reseñas no son una nota: son una fuente de palabras clave, y las frases que repiten los compradores son las que debes responder.</p>
<h2>4. La recompra se diseña</h2>
<p>Incluye una tarjeta con el consumible o accesorio del producto, define un ciclo de recordatorio para artículos recurrentes y deja la recompra a un clic. Retener es más barato que captar, pero solo si construyes el mecanismo.</p>
<h2>5. Errores recurrentes</h2>
<ul>
<li>Subir la inversión publicitaria cuando el problema real es el CTR.</li>
<li>Reescribir el título sin comprobar por qué términos posiciona hoy.</li>
<li>Tratar las reseñas como gestión de reputación en lugar de investigación de producto.</li>
</ul>
`,
  "5": `
<p>Las listas de herramientas son fáciles de escribir y difíciles de usar. Esta está ordenada por decisión, no por proveedor: cada bloque nombra la pregunta que intentas responder, la herramienta de este sitio que la responde y el dato que debes aportar tú.</p>
<h2>1. Selección: ¿este SKU gana dinero?</h2>
<p>Usa la <a href="/tools/product-analysis">calculadora de análisis de producto</a> para modelar la economía unitaria y la <a href="/tool/profit-calculator">calculadora de beneficio</a> cuando necesites el desglose de comisiones por pedido. Ninguna puede inventar tu precio de compra ni tu coste publicitario: eso sale de una cotización real.</p>
<h2>2. Palabras clave y fichas: que te encuentren y te abran</h2>
<p>El <a href="/tools/keyword-lab">laboratorio de palabras clave</a> expande términos semilla en variantes largas, mide la cobertura del título y genera un CSV con el que trabajar. Combínalo con el <a href="/tool/listing-optimizer">optimizador de fichas</a> para puntuar el título frente a límites de caracteres y cobertura de términos antes de publicar. Límites: Amazon 200, Mercado Libre 60, Shopee 255 — confírmalos en cada panel, cambian.</p>
<h2>3. Coste y precio: incluye el tipo de cambio</h2>
<p>El <a href="/tool/rate-converter">conversor de divisas</a> toma un tipo en vivo y la calculadora de beneficio aplica las comisiones encima. No pongas precio con un tipo que recuerdas: dos puntos porcentuales en un margen fino son todo el beneficio.</p>
<h2>4. Logística: acertar con el peso volumétrico</h2>
<p>La <a href="/tool/shipping-calculator">calculadora de envíos</a> compara peso volumétrico y real y muestra por cuál te facturan. Los productos voluminosos y ligeros casi siempre se facturan por volumen.</p>
<h2>5. Cumplimiento: archiva antes de publicar</h2>
<p>La <a href="/compliance">biblioteca de cumplimiento</a> recoge los documentos que espera cada mercado. Úsala como lista de verificación antes del primer envío, no después del primer bloqueo.</p>
<h2>6. Tres reglas para cualquier herramienta</h2>
<ul>
<li>Introduce números reales o acepta ficción: una calculadora con datos inventados es un generador de números aleatorios.</li>
<li>Una decisión por herramienta. Si no puedes nombrar la decisión, no necesitas la herramienta.</li>
<li>Guarda la salida. Un CSV de palabras clave o un modelo guardado vale más que una captura que no puedes repetir.</li>
</ul>
`,
  "6": `
<p>América Latina no es un solo mercado. México y Brasil difieren en idioma, identidad fiscal, hábitos de pago y coste logístico, y un producto que funciona en uno puede fracasar en el otro por razones que no tienen nada que ver con la demanda.</p>
<h2>1. México y Brasil son negocios distintos</h2>
<p>México funciona en español, con registro RFC y una red logística viable para vendedor transfronterizo con almacén en EE. UU. o en frontera. Brasil funciona en portugués, con estructura fiscal compleja, costes de importación más altos y despachos más lentos, lo que empuja hacia stock local o un programa de logística del marketplace. Presupuesto y calendario deben construirse por país, no por región.</p>
<h2>2. Un título de 60 caracteres cambia la lógica de selección</h2>
<p>El límite de Mercado Libre te obliga a gastar caracteres en el término de búsqueda, no en adjetivos de marketing. En la práctica premia productos cuyo valor se explica en cuatro o cinco palabras y castiga los packs que necesitan explicación. Prueba tus títulos candidatos a 60 caracteres antes de comprometer inventario: si el título no cabe el término principal más un diferencial, el producto tendrá problemas para ser encontrado.</p>
<h2>3. Direcciones a vigilar y sus trampas</h2>
<ul>
<li><strong>Accesorios de móvil</strong> — demanda estable, pero competencia de precio feroz y multiplicación de modelos compatibles.</li>
<li><strong>Organización del hogar</strong> — voluminoso, así que el peso volumétrico decide el margen; los diseños plegables ayudan.</li>
<li><strong>Belleza y cuidado personal</strong> — alta recompra, pero registro y etiquetado son estrictos.</li>
<li><strong>Repuestos de automoción</strong> — el dato de compatibilidad es la barrera; un ajuste erróneo genera devoluciones que no puedes revender.</li>
</ul>
<h2>4. Precia pensando en las cuotas</h2>
<p>Las cuotas sin interés son expectativa por defecto en ambos mercados y la comisión la asume el vendedor. Incluye ese coste en el precio en lugar de descubrirlo en la primera liquidación. Consulta la estructura vigente de cuotas y comisiones en el panel del vendedor: cambia por categoría y por campaña.</p>
<h2>5. Errores habituales</h2>
<p>Lanzar en Brasil con el manual de México; poner precio sin la comisión de cuotas; asumir que un título de 60 caracteres puede cargar un pack; y enviar sin comprobar si el estado de destino aplica recargo fiscal o logístico.</p>
`,
  "7": `
<p>Vender en directo no va de hablar rápido. Es un embudo con cuatro números en secuencia: tasa de entrada, tiempo de permanencia, clic en producto y conversión. Arréglalos en ese orden y la sala se multiplica; sáltate uno y el tráfico se desperdicia.</p>
<h2>1. Antes de emitir: monta la escalera de producto</h2>
<p>Planifica una escalera, no una lista. Empieza con un artículo de precio bajo que resuelva un problema obvio y traiga los primeros pedidos, pasa al producto principal con el margen real y usa un pack o accesorio para subir el ticket. Cada producto necesita una demostración que funcione sin palabras: en el momento en que el espectador entiende el beneficio solo con el vídeo, la venta está a medio camino.</p>
<h2>2. Un guion reutilizable</h2>
<p>Aproximadamente cada cinco minutos: gancho (qué problema resuelve), demostración (que se vea funcionando), prueba (pedidos, reseñas, comparación), objeciones (precio, talla, entrega), llamada a la acción (qué botón, qué pasa después). Repite con otro producto. No leas especificaciones: demuestra el resultado.</p>
<h2>3. Revisar con cuatro números</h2>
<ul>
<li><strong>Tasa de entrada</strong> — ¿funcionan la portada y los tres primeros segundos?</li>
<li><strong>Permanencia media</strong> — ¿el ritmo del bucle es correcto o se van en el primer minuto?</li>
<li><strong>Clic en producto</strong> — ¿está conectada la demostración con el producto fijado?</li>
<li><strong>Conversión</strong> — ¿son creíbles precio, stock y plazo de entrega?</li>
</ul>
<h2>4. Conectar contenido y estantería</h2>
<p>Los clips cortados de la emisión se convierten en vídeos cortos que alimentan la ficha de producto; la ficha alimenta la siguiente emisión con reseñas y preguntas. Trata sala, clips y ficha como un sistema, no como tres canales.</p>
<h2>5. Errores habituales</h2>
<p>Abrir con el producto más caro; demostrar características en lugar del resultado; emitir dos horas sin rotar producto; y juzgar la sesión por facturación en lugar de por el número del embudo que se rompió.</p>
`,
  "8": `
<p>Un almacén en el extranjero no es un almacén: es un acelerador de velocidad de entrega con factura de alquiler. Decidir usarlo es un cálculo sobre rotación, no sobre querer una insignia de envío rápido.</p>
<h2>1. Tres modelos, tres estructuras de coste</h2>
<p>La logística del marketplace (FBA y equivalentes) agrupa almacenaje, preparación y atención al cliente en una tarifa y te da la insignia. Un almacén de terceros cobra almacenaje por palé o metro cúbico más manipulación por pedido, y da flexibilidad. Un almacén propio solo tiene sentido con volumen, porque mano de obra y sistemas son costes fijos. Compáralos por pedido con tus medidas y pesos reales, no con una tarifa de metro cúbico de titular.</p>
<h2>2. Entrada: bloquea el error antes del envío</h2>
<p>Toda entrada necesita cita, especificación correcta de etiquetado de caja y palé, y etiqueta unitaria tipo FNSKU. Los tres fallos más caros: enviar al código de almacén equivocado, etiquetar bien la caja pero no la unidad, y llegar sin cita. Revisa la especificación otra vez antes de que salga el contenedor: corregir al llegar cuesta más que el flete.</p>
<h2>3. Inventario: tres números</h2>
<ul>
<li><strong>Días de cobertura</strong> — disponible más en tránsito dividido por ventas diarias.</li>
<li><strong>Rotación en los primeros 30 días</strong> — la prueba honesta de si el SKU merecía el espacio.</li>
<li><strong>Coste de almacenaje sobre ingresos</strong> — el número que se come el margen en silencio.</li>
</ul>
<h2>4. Última milla: elegir por tramo de peso</h2>
<p>Los transportistas tarifan por tramos y la opción más barata cambia en cada salto. Haz una tabla con tus tres tramos principales frente a tres transportistas y revísala cada trimestre; un solo transportista para todo es cómodo y caro.</p>
<h2>5. Qué no conviene preposicionar</h2>
<p>Estacional de baja rotación, frágil con devolución alta, productos con vida corta y cualquier cosa cuya demanda no hayas probado. Prueba el SKU por aéreo y luego llévalo a stock.</p>
`,
  "9": `
<p>Shopee y Lazada se parecen desde fuera y se comportan distinto por dentro: documentos de alta, estructura de comisiones, programas logísticos y sistemas de puntos tienen cada uno su lógica. Consulta las tarifas vigentes en el panel del vendedor — aquí hablamos de la estructura, que cambia mucho menos que los números.</p>
<h2>1. Alta: prepara el archivo antes de solicitar</h2>
<p>Cuenta con licencia de actividad, documento del representante legal, cuenta bancaria a nombre de la entidad y permisos por categoría para cosmética, alimentación, electrónica e infantil. Las solicitudes se atascan en los detalles: nombre que no coincide entre licencia y banco, escaneo borroso o una categoría que exige carta de autorización adicional.</p>
<h2>2. Comisiones: la comisión no es toda la factura</h2>
<p>Mira cuatro líneas: comisión por categoría, comisión de transacción o pago, coste de participar en campaña y aportación al subsidio de envío. Una campaña que sube volumen un 30 % pero añade 8 puntos de coste puede seguir siendo pérdida en un artículo de margen fino. Modela la campaña en la calculadora de beneficio antes de inscribirte.</p>
<h2>3. Logística: las métricas son restricciones duras</h2>
<p>Tasa de envío tardío, tasa de no envío y tasa de cancelación se miden y alimentan directamente los puntos de penalización y la visibilidad en búsqueda. Usa el programa logístico de la plataforma cuando exista: cuesta dinero, pero elimina una clase de penalizaciones por retraso que no puedes controlar de otro modo.</p>
<h2>4. Puntos y recuperación</h2>
<p>Los puntos se acumulan por envíos tardíos, cancelaciones, reclamaciones por falsificación e infracciones de ficha. La recuperación no es inmediata: normalmente exige un ciclo limpio de envíos a tiempo. Planifica capacidad para que una promoción no te empuje por encima de tu límite diario de preparación; es la penalización más habitual que uno se causa a sí mismo.</p>
<h2>5. Líneas que no se cruzan</h2>
<ul>
<li>Publicar en categoría restringida sin aprobación.</li>
<li>Usar imágenes o marcas de otro vendedor en el título.</li>
<li>Pedir al comprador que cancele y vuelva a pedir para esquivar la métrica de envío tardío.</li>
<li>Enviar un producto sustituto cuando se acaba el stock.</li>
</ul>
`,
  "10": `
<p>La mayoría de los paneles son decoración. Uno útil responde la pregunta sobre la que vas a actuar, y nada más. Cinco grupos de métricas, tres niveles de análisis y ocho números por semana bastan para llevar una tienda.</p>
<h2>1. Cinco grupos, cada uno con una acción</h2>
<table><tbody>
<tr><td>Grupo</td><td>Métrica</td><td>Acción que dispara</td></tr>
<tr><td>Tráfico</td><td>Impresiones, CTR</td><td>Ajustar palabras clave, imagen principal, pujas</td></tr>
<tr><td>Conversión</td><td>Tasa de carrito, conversión de pedido</td><td>Reescribir ficha, reseñas, precio</td></tr>
<tr><td>Ticket</td><td>Valor medio, unidades por pedido</td><td>Pack, oferta por umbral</td></tr>
<tr><td>Beneficio</td><td>Margen neto por pedido</td><td>Reprecio, renegociar flete, cortar gasto publicitario</td></tr>
<tr><td>Salud</td><td>Devoluciones, envío tardío, cobertura de stock</td><td>Corregir calidad, ajustar capacidad, reponer</td></tr>
</tbody></table>
<h2>2. Tres niveles: SKU, tienda, caja</h2>
<p>En el SKU decides mantener, arreglar o retirar. En la tienda decides dónde va la siguiente unidad de presupuesto publicitario. En la caja decides si el crecimiento es pagable: inventario más publicidad más el calendario de liquidación de la plataforma es lo que rompe a los vendedores que crecen, no el margen.</p>
<h2>3. Un panel semanal de ocho números</h2>
<ul>
<li>Ingresos, beneficio neto, margen neto</li>
<li>Impresiones, CTR</li>
<li>Conversión, valor medio de pedido</li>
<li>Días de cobertura de stock</li>
</ul>
<p>Ocho números, una página, revisados el mismo día cada semana. Si un número se movió, debes poder nombrar el cambio que lo causó; si no puedes, el panel no está midiendo tus decisiones.</p>
<h2>4. Usar herramientas sin desperdiciarlas</h2>
<p>Exporta los datos en lugar de leerlos en pantalla, mantén una hoja por trimestre y conecta cada métrica con una decisión que tomaste de verdad. Un informe que nadie usa es un coste, no un activo.</p>
`,
};
