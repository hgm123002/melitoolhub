// lib/articles-i18n/fr.ts
// Français — corps des articles 1 à 10
import type { ArticleBodyPack } from "./types";

export const fr: ArticleBodyPack = {
  "1": `
<p>La plupart des échecs de sélection produit ne viennent pas d'une tendance manquée, mais de l'absence de vérification, avant d'engager de l'argent, de la capacité du produit à absorber quatre coûts transfrontaliers : fret, retours, publicité et conformité. Il s'agit d'un filtre réutilisable, pas d'une liste de catégories à la mode.</p>
<h2>1. Quatre filtres, en série</h2>
<p>Marge brute après coût rendu, commission, préparation de commande, publicité et retours. Poids volumétrique contre poids réel. Comportement de retour et de service après-vente. Et la barrière de certification. On les applique dans l'ordre : si un filtre casse, le produit est écarté. Un bon classement de ventes ne sauve jamais une économie unitaire négative — vendre plus d'un article qui perd de l'argent ne fait qu'accélérer la perte.</p>
<h2>2. Transformer « ça a l'air faisable » en trois chiffres</h2>
<p>Construisez le modèle dans le <a href="/tools/product-analysis">calculateur d'analyse produit</a> : prix d'achat, fret entrant, commission, frais de préparation et coût publicitaire. Il renvoie le bénéfice net unitaire, la marge nette et le volume d'équilibre. La marge nette indique combien de guerres de prix vous survivez ; le point d'équilibre, combien de trafic organique il vous faut.</p>
<p>Validez ensuite la demande dans le <a href="/tools/keyword-lab">laboratoire de mots-clés</a> : combien de variantes longues portent une intention d'achat claire, et combien de caractères de titre il reste (Amazon 200, Mercado Libre 60, Shopee 255 — à confirmer dans chaque espace vendeur). Un marché sans longue traîne n'est presque jamais un océan bleu : c'est un marché où personne ne cherche. Enfin, passez vos dimensions dans le <a href="/tool/shipping-calculator">calculateur d'expédition</a> : un fret entrant mal calculé est la fuite de marge la plus fréquente chez les nouveaux vendeurs.</p>
<h2>3. Vérifier en commençant par le moins cher</h2>
<ul>
<li><strong>Le modèle d'abord</strong> — gratuit, et il élimine la majorité des candidats en dix minutes.</li>
<li><strong>L'intention de recherche ensuite</strong> — achat, pas curiosité.</li>
<li><strong>L'échantillon après</strong> — achetez une ou deux unités concurrentes ; emballage, notice et finitions se voient immédiatement.</li>
<li><strong>Le stock en dernier</strong> — première commande dimensionnée pour un cycle de réassort, puis on monte en puissance avec de vraies données.</li>
</ul>
<h2>4. Erreurs récurrentes</h2>
<ul>
<li>Comparer les produits au chiffre d'affaires au lieu de la marge nette.</li>
<li>Ignorer le poids volumétrique jusqu'à la facture du transitaire.</li>
<li>Traiter la certification comme de la paperasse et non comme une ligne de coût.</li>
</ul>
`,
  "2": `
<p>La conformité en Europe et aux États-Unis n'est pas un document : ce sont trois questions distinctes. Qui collecte la taxe, qui certifie le produit, et qui répond juridiquement en cas de problème. Ceux qui les traitent comme une seule formalité bloquent en général à la catégorie, pas à la douane.</p>
<h2>1. Taxe : qui collecte, qui déclare</h2>
<p>Dans l'UE, la TVA des ventes à distance est généralement collectée par la marketplace sur les ventes B2C jusqu'au seuil du pays de destination, et par vous au-delà, ou lorsque vous vendez via votre propre boutique. L'IOSS concerne les envois sous 150 € ; au-delà, l'importation est normale. Aux États-Unis, la taxe est au niveau de l'État et la collecte par la plateforme est la norme. Règle pratique : numéro d'enregistrement, période de déclaration et durée de conservation au même endroit, et ne supposez jamais qu'une déclaration que vous n'avez pas vérifiée a été faite.</p>
<h2>2. La certification n'est pas un certificat</h2>
<p>Le CE recouvre une famille de directives — jouets, électronique, compatibilité électromagnétique, machines, EPI — chacune avec son périmètre d'essai. La FCC s'applique aux appareils radio et électroniques aux États-Unis, la FDA aux contacts alimentaires, cosmétiques et certaines allégations santé. Le GPSR ajoute traçabilité et responsable établi dans l'UE pour de nombreux groupes ; les produits enfants aux États-Unis exigent un CPC. Le piège : acheter un « certificat CE » bon marché pour un produit dont la directive n'a jamais été testée.</p>
<h2>3. À archiver avant la mise en ligne</h2>
<ul>
<li>Rapports d'essai avec directive et norme visibles.</li>
<li>Déclaration de conformité signée et datée.</li>
<li>Maquette d'étiquette : importateur, adresse, lot, avertissements en langue locale.</li>
<li>Fiches de données de sécurité pour batteries, liquides et aérosols.</li>
<li>Mandat de représentant, lorsque la réglementation l'exige.</li>
</ul>
<h2>4. Comment on se fait prendre</h2>
<p>Présenter un rapport chinois citant une norme remplacée ; étiqueter au nom du seul fabricant, sans importateur ; expédier un lot où un composant change la classe du produit. Réglez les papiers avant le premier conteneur, pas après la première réclamation.</p>
`,
  "3": `
<p>Le fret n'est pas un coût mais quatre : manutention à l'origine, douane et droits, stockage, dernier kilomètre. Chacun est facturé sur une base différente, donc un mode « moins cher » peut coûter plus par unité une fois les trois autres ajoutés.</p>
<h2>1. Quatre segments, quatre logiques</h2>
<p>Le maritime facture au mètre cube avec minimum, l'aérien au poids taxable (poids volumétrique = L × l × H ÷ 6000 chez la plupart des transporteurs), l'express au poids réel avec tarifs par zone, le dernier kilomètre par tranche de poids et distance. Les droits dépendent du code SH et de la valeur déclarée, le stockage se facture à la palette-jour ou au mètre cube mensuel. Comparer le seul tarif principal revient à comparer un quart de la facture.</p>
<h2>2. Choisir un mode</h2>
<table><tbody>
<tr><td>Mode</td><td>Adapté à</td><td>Attention</td></tr>
<tr><td>Maritime LCL</td><td>Ventes régulières, 100–500 kg</td><td>Délais de groupage, congestion portuaire</td></tr>
<tr><td>Maritime FCL</td><td>Volume prévisible, faible valeur unitaire</td><td>Trésorerie immobilisée 40+ jours</td></tr>
<tr><td>Aérien</td><td>Test de nouveau SKU, rupture de stock</td><td>Le poids volumétrique pénalise le volumineux léger</td></tr>
<tr><td>Entrepôt local</td><td>Marchés avec promesse de livraison rapide</td><td>Frais de stockage et rotation lente</td></tr>
</tbody></table>
<h2>3. Le réassort comme un calcul</h2>
<p>Stock de sécurité = ventes journalières moyennes × (délai + période de revue) × coefficient de service, moins ce qui est déjà en transit. Le délai se mesure du paiement à la mise en rayon, pas du départ à l'arrivée : c'est là que naissent les ruptures. À revoir chaque mois ; un coussin « qui semble suffisant » est la façon dont on finit avec une rupture et du stock mort dans le même trimestre.</p>
<h2>4. Erreurs fréquentes</h2>
<ul>
<li>Chiffrer au kilo en oubliant les minimums par envoi.</li>
<li>Oublier que dans certains marchés les droits se calculent sur une valeur fret inclus.</li>
<li>Réapprovisionner à l'intuition pendant une promo au lieu d'un prévisionnel.</li>
</ul>
`,
  "4": `
<p>Les problèmes d'exploitation ressemblent à « le trafic coûte cher », mais le trafic est rarement la cause. Parcourez l'entonnoir dans l'ordre — impressions, clics, panier, commande, rachat — et réparez la couche où la chute est la plus forte par rapport à votre propre référence de catégorie, pas par rapport à la capture d'un gourou.</p>
<h2>1. Localiser la fuite</h2>
<p>Impressions faibles : mot-clé, placement de catégorie ou couverture publicitaire. Impressions correctes et clics faibles : image principale, titre et ancrage de prix. Peu de paniers : fiche, avis et promesse de livraison. Paniers abandonnés : friction au paiement, moyens disponibles ou coût surprise à la fin.</p>
<h2>2. Titre et image : acheter le clic</h2>
<p>Un titre gagne sa place en collant à ce que les gens tapent, dans leur ordre : terme principal, puis différenciateurs, puis taille ou quantité. Placez ce qui vous sépare des neuf autres résultats dans les 60 premiers caractères, car c'est tout ce que le mobile affiche. L'image principale doit survivre à la vignette : un produit, fort contraste, pas de mur de texte, et un repère d'échelle qui répond à « quelle taille ? ».</p>
<h2>3. Fiche et avis : acheter le panier</h2>
<p>Répondez aux quatre questions qui bloquent l'achat : est-ce que ça ira, est-ce compatible avec ce que j'ai, quel délai de livraison, et que se passe-t-il en cas de casse. Ajoutez un bloc comparatif face à l'alternative évidente et mettez livraison et retours au-dessus de la ligne de flottaison. Les avis ne sont pas une note mais une source de mots-clés : les formulations répétées par les acheteurs sont celles auxquelles il faut répondre.</p>
<h2>4. Le rachat se conçoit</h2>
<p>Insérez une carte avec le consommable ou l'accessoire associé, définissez un cycle de rappel pour les articles récurrents et rendez la recommande en un clic. Retenir coûte moins cher qu'acquérir, mais seulement si le mécanisme existe.</p>
<h2>5. Erreurs récurrentes</h2>
<ul>
<li>Augmenter le budget publicitaire quand le vrai problème est le taux de clic.</li>
<li>Réécrire le titre sans vérifier sur quels termes il se positionne aujourd'hui.</li>
<li>Traiter les avis comme de la réputation au lieu d'une recherche produit.</li>
</ul>
`,
  "5": `
<p>Les listes d'outils sont faciles à écrire et difficiles à utiliser. Celle-ci est organisée par décision, pas par fournisseur : chaque bloc nomme la question, l'outil de ce site qui y répond, et la donnée que vous seul pouvez apporter.</p>
<h2>1. Sélection : ce SKU rapporte-t-il ?</h2>
<p>Utilisez le <a href="/tools/product-analysis">calculateur d'analyse produit</a> pour l'économie unitaire et le <a href="/tool/profit-calculator">calculateur de bénéfice</a> pour le détail des frais par commande. Aucun n'invente votre prix d'achat ni votre coût publicitaire : cela vient d'un devis réel.</p>
<h2>2. Mots-clés et fiche : être trouvé et être cliqué</h2>
<p>Le <a href="/tools/keyword-lab">laboratoire de mots-clés</a> développe les termes racines en longue traîne, mesure la couverture du titre et produit un CSV exploitable. Complétez avec l'<a href="/tool/listing-optimizer">optimiseur de fiche</a> pour noter le titre face aux limites de caractères et à la couverture avant publication. Limites : Amazon 200, Mercado Libre 60, Shopee 255 — à confirmer, elles changent.</p>
<h2>3. Coût et prix : intégrer le taux de change</h2>
<p>Le <a href="/tool/rate-converter">convertisseur de devises</a> prend un taux en direct et le calculateur de bénéfice applique les frais par-dessus. Ne fixez pas vos prix sur un taux mémorisé : deux points sur une marge mince, c'est tout le bénéfice.</p>
<h2>4. Logistique : viser juste sur le poids volumétrique</h2>
<p>Le <a href="/tool/shipping-calculator">calculateur d'expédition</a> compare poids volumétrique et réel et indique la base de facturation. Les produits volumineux et légers sont presque toujours facturés au volume.</p>
<h2>5. Conformité : archiver avant de publier</h2>
<p>La <a href="/compliance">bibliothèque de conformité</a> recense les documents attendus par marché. Servez-vous-en comme d'une checklist avant la première expédition, pas après le premier blocage.</p>
<h2>6. Trois règles pour tout outil</h2>
<ul>
<li>Saisissez de vrais chiffres, sinon vous obtenez de la fiction : un calculateur nourri d'estimations est un générateur aléatoire.</li>
<li>Une décision par outil. Si vous ne pouvez pas nommer la décision, vous n'avez pas besoin de l'outil.</li>
<li>Conservez la sortie. Un CSV de mots-clés ou un modèle sauvegardé vaut mieux qu'une capture impossible à rejouer.</li>
</ul>
`,
  "6": `
<p>L'Amérique latine n'est pas un marché. Le Mexique et le Brésil diffèrent par la langue, l'identité fiscale, les habitudes de paiement et le coût logistique — un produit qui marche dans l'un peut échouer dans l'autre pour des raisons sans rapport avec la demande.</p>
<h2>1. Mexique et Brésil sont deux métiers</h2>
<p>Le Mexique fonctionne en espagnol, avec immatriculation RFC et un réseau logistique viable pour un vendeur transfrontalier disposant d'un entrepôt aux États-Unis ou à la frontière. Le Brésil fonctionne en portugais, avec une structure fiscale complexe, des coûts d'importation plus élevés et des dédouanements plus longs — ce qui pousse vers du stock local ou un programme logistique de la marketplace. Budget et calendrier se construisent par pays, pas par région.</p>
<h2>2. Un titre de 60 caractères change la logique de sélection</h2>
<p>La limite de Mercado Libre oblige à dépenser des caractères sur le terme de recherche, pas sur des adjectifs marketing. En pratique, cela récompense les produits dont la valeur tient en quatre ou cinq mots et pénalise les lots qui demandent une explication. Testez vos titres candidats à 60 caractères avant d'engager du stock : si le titre ne peut pas porter le terme principal plus un différenciateur, le produit sera difficile à trouver.</p>
<h2>3. Des pistes et leurs pièges</h2>
<ul>
<li><strong>Accessoires téléphone</strong> — demande stable, mais concurrence prix féroce et multiplication des modèles compatibles.</li>
<li><strong>Rangement maison</strong> — volumineux, donc le poids volumétrique décide de la marge ; les formes pliables aident.</li>
<li><strong>Beauté et soin</strong> — rachat élevé, mais enregistrement et étiquetage stricts.</li>
<li><strong>Pièces auto</strong> — la donnée de compatibilité est la barrière ; une mauvaise application produit des retours invendables.</li>
</ul>
<h2>4. Prix : penser en versements</h2>
<p>Le paiement échelonné sans frais est une attente par défaut sur les deux marchés et la commission est portée par le vendeur. Intégrez ce coût au prix plutôt que de le découvrir au premier versement. Vérifiez la structure en vigueur dans l'espace vendeur : elle varie selon la catégorie et la campagne.</p>
<h2>5. Erreurs fréquentes</h2>
<p>Lancer au Brésil avec le manuel mexicain ; tarifer sans commission d'échelonnement ; supposer qu'un titre de 60 caractères porte un lot ; expédier sans vérifier les surcharges fiscales ou logistiques de l'État de destination.</p>
`,
  "7": `
<p>Vendre en direct, ce n'est pas parler vite. C'est un entonnoir à quatre chiffres en séquence : taux d'entrée, temps de visionnage, clic produit, conversion. Réparez-les dans cet ordre et la salle compose ; sautez-en un et le trafic est perdu.</p>
<h2>1. Avant d'ouvrir : construire l'échelle produit</h2>
<p>Prévoyez une échelle, pas une liste. Commencez par un article bon marché qui résout un problème évident et apporte les premières commandes, passez au produit principal à vraie marge, puis utilisez un lot ou un accessoire pour monter le panier. Chaque produit a besoin d'une démonstration qui fonctionne sans paroles : au moment où le spectateur comprend le bénéfice par la seule vidéo, la vente est à moitié faite.</p>
<h2>2. Une boucle de discours réutilisable</h2>
<p>Environ toutes les cinq minutes : accroche (quel problème), démonstration (montrer en fonctionnement), preuve (commandes, avis, comparaison), objection (prix, taille, livraison), appel à l'action (quel bouton, ce qui se passe). Puis on répète avec un autre produit. Ne lisez pas les spécifications : montrez le résultat.</p>
<h2>3. Revoir avec quatre chiffres</h2>
<ul>
<li><strong>Taux d'entrée</strong> — la couverture et les trois premières secondes fonctionnent-elles ?</li>
<li><strong>Temps de visionnage moyen</strong> — le rythme est-il juste, ou partent-ils dès la première minute ?</li>
<li><strong>Clic produit</strong> — la démo est-elle reliée au produit épinglé ?</li>
<li><strong>Conversion</strong> — prix, stock et délai sont-ils crédibles ?</li>
</ul>
<h2>4. Relier contenu et rayon</h2>
<p>Les extraits de la session deviennent des vidéos courtes qui alimentent la fiche produit ; la fiche alimente la session suivante avec avis et questions. Traitez salle, extraits et fiche comme un système, pas comme trois canaux.</p>
<h2>5. Erreurs fréquentes</h2>
<p>Ouvrir avec le produit le plus cher ; démontrer des fonctionnalités au lieu du résultat ; diffuser deux heures sans rotation de produit ; juger la session au chiffre d'affaires au lieu du chiffre de l'entonnoir qui a cassé.</p>
`,
  "8": `
<p>Un entrepôt à l'étranger n'est pas un entrepôt : c'est un accélérateur de délai de livraison avec une facture de loyer. La décision est un calcul de rotation, pas l'envie d'un badge de livraison rapide.</p>
<h2>1. Trois modèles, trois structures de coût</h2>
<p>Le fulfilment de la marketplace (FBA et équivalents) regroupe stockage, préparation et service client dans un tarif unique et donne le badge. Un entrepôt tiers facture le stockage à la palette ou au mètre cube plus la manutention par commande, et offre de la souplesse. Un entrepôt en propre n'est rationnel qu'à volume, car main-d'œuvre et système sont fixes. Comparez à la commande avec vos dimensions et poids réels, pas avec un tarif au mètre cube de plaquette commerciale.</p>
<h2>2. Entrée : bloquer l'erreur avant l'expédition</h2>
<p>Chaque entrée exige un rendez-vous, un étiquetage carton et palette conforme, et une étiquette unitaire type FNSKU. Les trois erreurs les plus coûteuses : envoyer au mauvais code d'entrepôt, étiqueter correctement le carton mais pas l'unité, et arriver sans rendez-vous. Revérifiez le cahier des charges avant le départ du conteneur : corriger à l'arrivée coûte plus que le fret.</p>
<h2>3. Stock : trois chiffres</h2>
<ul>
<li><strong>Jours de couverture</strong> — disponible plus en transit divisé par les ventes journalières.</li>
<li><strong>Écoulement sur 30 jours</strong> — le test honnête : ce SKU méritait-il la place ?</li>
<li><strong>Stockage rapporté au chiffre d'affaires</strong> — le chiffre qui mange la marge en silence.</li>
</ul>
<h2>4. Dernier kilomètre : choisir par tranche de poids</h2>
<p>Les transporteurs facturent par tranches et l'option la moins chère change à chaque palier. Faites un tableau de vos trois tranches principales contre trois transporteurs et repricez chaque trimestre ; un seul transporteur pour tout est pratique et cher.</p>
<h2>5. Ce qu'il ne faut pas prépositionner</h2>
<p>Le saisonnier à rotation lente, le fragile à fort taux de retour, les produits à durée de vie courte et tout ce dont la demande n'est pas prouvée. Prouvez le SKU par aérien, puis passez-le en stock.</p>
`,
  "9": `
<p>Shopee et Lazada se ressemblent de l'extérieur et se comportent différemment à l'intérieur : pièces d'inscription, structure de frais, programmes logistiques et systèmes de points ont chacun leur logique. Consultez les tarifs en vigueur dans l'espace vendeur — il s'agit ici de la structure, qui change bien moins que les chiffres.</p>
<h2>1. Inscription : préparer le dossier avant de postuler</h2>
<p>Prévoyez un extrait d'immatriculation, la pièce d'identité du représentant légal, un compte bancaire au nom de la société et les autorisations propres aux cosmétiques, à l'alimentaire, à l'électronique et aux produits enfants. Les dossiers bloquent sur des détails : nom qui ne correspond pas entre registre et banque, scan illisible, catégorie exigeant une lettre d'autorisation supplémentaire.</p>
<h2>2. Frais : la commission n'est pas toute la facture</h2>
<p>Regardez quatre lignes : commission par catégorie, frais de transaction ou de paiement, coût de participation aux campagnes et contribution à la subvention d'expédition. Une campagne qui fait +30 % de volume en ajoutant 8 points de frais peut rester déficitaire sur une marge mince. Modélisez-la dans le calculateur de bénéfice avant de vous inscrire.</p>
<h2>3. Logistique : les indicateurs sont des contraintes dures</h2>
<p>Taux d'expédition tardive, taux de non-expédition et taux d'annulation sont mesurés et alimentent directement les points de pénalité et la visibilité en recherche. Utilisez le programme logistique de la plateforme lorsqu'il existe : il coûte de l'argent mais supprime une catégorie de pénalités de retard que vous ne contrôlez pas autrement.</p>
<h2>4. Points et récupération</h2>
<p>Les points viennent des expéditions tardives, des annulations, des signalements de contrefaçon et des infractions de fiche. La récupération n'est pas immédiate : elle exige en général un cycle propre d'expéditions à temps. Planifiez la capacité pour qu'une promo ne vous pousse pas au-delà de votre limite quotidienne de préparation ; c'est la pénalité la plus fréquente que l'on s'inflige soi-même.</p>
<h2>5. Lignes à ne pas franchir</h2>
<ul>
<li>Publier dans une catégorie restreinte sans autorisation.</li>
<li>Utiliser les images ou la marque d'un autre vendeur dans le titre.</li>
<li>Demander à l'acheteur d'annuler et de recommander pour contourner l'indicateur de retard.</li>
<li>Expédier un produit de substitution en cas de rupture.</li>
</ul>
`,
  "10": `
<p>La plupart des tableaux de bord sont décoratifs. Un tableau utile répond à la question sur laquelle vous allez agir, et à rien d'autre. Cinq groupes d'indicateurs, trois niveaux d'analyse et huit chiffres par semaine suffisent à piloter une boutique.</p>
<h2>1. Cinq groupes, chacun lié à une action</h2>
<table><tbody>
<tr><td>Groupe</td><td>Indicateur</td><td>Action déclenchée</td></tr>
<tr><td>Trafic</td><td>Impressions, taux de clic</td><td>Ajuster mots-clés, image principale, enchères</td></tr>
<tr><td>Conversion</td><td>Taux de panier, conversion commande</td><td>Réécrire la fiche, les avis, le prix</td></tr>
<tr><td>Panier</td><td>Valeur moyenne, unités par commande</td><td>Lot, offre à seuil</td></tr>
<tr><td>Bénéfice</td><td>Marge nette par commande</td><td>Repricer, renégocier le fret, couper le gaspillage publicitaire</td></tr>
<tr><td>Santé</td><td>Retours, retards, couverture de stock</td><td>Corriger qualité, capacité, réassort</td></tr>
</tbody></table>
<h2>2. Trois niveaux : SKU, boutique, trésorerie</h2>
<p>Au niveau SKU vous décidez de garder, réparer ou retirer. Au niveau boutique, où va l'unité de budget suivante. Au niveau trésorerie, si la croissance est finançable : stock plus publicité plus calendrier de versement de la plateforme, c'est ce qui casse les vendeurs en croissance, pas la marge.</p>
<h2>3. Un tableau hebdomadaire de huit chiffres</h2>
<ul>
<li>Chiffre d'affaires, bénéfice net, marge nette</li>
<li>Impressions, taux de clic</li>
<li>Taux de conversion, panier moyen</li>
<li>Jours de couverture de stock</li>
</ul>
<p>Huit chiffres, une page, revus le même jour chaque semaine. Si un chiffre bouge, vous devez pouvoir nommer le changement qui l'a causé ; sinon, le tableau ne mesure pas vos décisions.</p>
<h2>4. Utiliser les outils sans les gaspiller</h2>
<p>Exportez les données plutôt que de les lire à l'écran, tenez une feuille par trimestre et reliez chaque indicateur à une décision réellement prise. Un rapport que personne n'utilise est un coût, pas un actif.</p>
`,
};
