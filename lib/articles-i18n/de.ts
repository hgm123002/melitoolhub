// lib/articles-i18n/de.ts
// Deutsch — Inhalt der Artikel 1–10
import type { ArticleBodyPack } from "./types";

export const de: ArticleBodyPack = {
  "1": `
<p>Die meisten Fehlgriffe bei der Produktauswahl entstehen nicht aus einer verpassten Trends, sondern weil vor dem Einkauf nicht geprüft wurde, ob ein Produkt vier grenzüberschreitende Kosten tragen kann: Fracht, Retouren, Werbung und Compliance. Das hier ist ein wiederverwendbarer Filter, keine Liste angesagter Kategorien.</p>
<h2>1. Vier Filter, in Reihe</h2>
<p>Bruttomarge nach Landed Cost, Provision, Fulfilment, Werbung und Retouren. Volumengewicht gegen tatsächliches Gewicht. Retouren- und Serviceverhalten. Und die Zertifizierungshürde. Der Reihe nach anwenden: fällt ein Filter, fällt das Produkt. Ein guter Verkaufsrang rettet keine negative Stückkostenrechnung — mehr von einem Verlustartikel zu verkaufen, verliert nur schneller Geld.</p>
<h2>2. Aus "klingt machbar" drei Zahlen machen</h2>
<p>Baue das Modell im <a href="/tools/product-analysis">Produktanalyse-Rechner</a>: Einkaufspreis, eingehende Fracht, Provision, Fulfilment-Gebühr und Werbekosten. Er liefert Nettogewinn pro Stück, Nettomarge und Break-even-Absatz. Die Marge sagt, wie viele Preisrunden du überstehst; der Break-even sagt, wie viel organischen Traffic du brauchst.</p>
<p>Dann prüfe die Nachfrage im <a href="/tools/keyword-lab">Keyword-Lab</a>: Wie viele Long-Tail-Varianten haben klare Kaufabsicht, und wie viel Titelplatz bleibt (Amazon 200 Zeichen, Mercado Libre 60, Shopee 255 — immer im Verkäufer-Center prüfen). Ein Markt ohne Long-Tail ist meist kein Blue Ocean, sondern ein Markt, in dem niemand sucht. Zuletzt die Maße durch den <a href="/tool/shipping-calculator">Versandkostenrechner</a> schicken: falsch kalkulierte eingehende Fracht ist das häufigste versteckte Minus bei neuen Händlern.</p>
<h2>3. In der billigsten Reihenfolge prüfen</h2>
<ul>
<li><strong>Zuerst das Modell</strong> — kostet nichts und sortiert die meisten Kandidaten in zehn Minuten aus.</li>
<li><strong>Dann die Suchintention</strong> — Kaufabsicht, nicht Neugier.</li>
<li><strong>Dann das Muster</strong> — ein bis zwei Wettbewerbsstücke kaufen; Verpackung, Anleitung und Verarbeitung sieht man sofort.</li>
<li><strong>Zuletzt der Bestand</strong> — erste Bestellung für einen Nachbestellzyklus, dann mit echten Daten skalieren.</li>
</ul>
<h2>4. Wiederkehrende Fehler</h2>
<ul>
<li>Produkte nach Umsatz statt nach Nettomarge vergleichen.</li>
<li>Das Volumengewicht ignorieren, bis die Frachtrechnung kommt.</li>
<li>Zertifizierung als Papierkram statt als Kostenposition behandeln.</li>
</ul>
`,
  "2": `
<p>Compliance in Europa und den USA ist kein Dokument, sondern drei getrennte Fragen: Wer zieht die Steuer ein, wer zertifiziert das Produkt, und wer haftet, wenn etwas schiefgeht. Wer alles als einen Vorgang behandelt, bleibt meist am Kategorie-Zugang hängen, nicht im Zoll.</p>
<h2>1. Steuer: wer einzieht, wer abführt</h2>
<p>In der EU zieht der Marktplatz die Umsatzsteuer bei B2C-Fernverkäufen in der Regel bis zur Schwelle des Ziellandes ein, darüber — oder beim eigenen Shop — du selbst. IOSS gilt für Sendungen unter 150 €; darüber wird regulär importiert. In den USA ist die Steuer bundesstaatlich und die Erhebung über die Plattform der Normalfall. Praktische Regel: Steuernummer, Meldezeitraum und Aufbewahrungsfrist an einer Stelle führen und nie annehmen, der Marktplatz habe eine Meldung erledigt, die du nie geprüft hast.</p>
<h2>2. Zertifizierung ist nicht ein Zertifikat</h2>
<p>CE umfasst eine Familie von Richtlinien — Spielzeug, Elektronik, EMV, Maschinen, PSA — jeweils mit eigenem Prüfumfang. FCC gilt in den USA für Funk- und Elektronikgeräte, FDA für Lebensmittelkontakt, Kosmetik und bestimmte Gesundheitsaussagen. GPSR ergänzt Rückverfolgbarkeit und eine EU-verantwortliche Person für viele Produktgruppen; Kinderprodukte in den USA brauchen ein CPC. Die Falle: ein billiges "CE-Zertifikat" für ein Produkt kaufen, dessen Richtlinie nie geprüft wurde.</p>
<h2>3. Vor dem Listing archivieren</h2>
<ul>
<li>Prüfberichte mit sichtbarer Richtlinie und Norm.</li>
<li>Konformitätserklärung, unterschrieben und datiert.</li>
<li>Etikettendaten: Importeur, Adresse, Charge, Warnhinweise in Landessprache.</li>
<li>Sicherheitsdatenblätter für Akkus, Flüssigkeiten, Aerosole.</li>
<li>Bevollmächtigung der verantwortlichen Person, wo vorgeschrieben.</li>
</ul>
<h2>4. Typische Fallen</h2>
<p>Ein chinesischer Prüfbericht, der eine ersetzte Norm zitiert; Etikett nur mit Hersteller, ohne Importeur; ein Bündel, bei dem eine Komponente die Produktklasse ändert. Kläre die Papiere vor dem ersten Container, nicht nach der ersten Reklamation.</p>
`,
  "3": `
<p>Fracht ist kein Kostenblock, sondern vier: Abfertigung am Ursprung, Zoll und Abgaben, Lagerung und letzte Meile. Jeder wird anders abgerechnet, deshalb kann ein "günstigerer" Modus pro Stück teurer sein, sobald die anderen drei dazukommen.</p>
<h2>1. Vier Abschnitte, vier Abrechnungslogiken</h2>
<p>Seefracht rechnet nach Kubikmeter mit Mindestmenge, Luftfracht nach frachtpflichtigem Gewicht (Volumengewicht = L × B × H ÷ 6000 bei den meisten Carrier), Express nach tatsächlichem Gewicht mit Zonenzuschlägen, die letzte Meile nach Gewichtsklasse und Entfernung. Zoll hängt von HS-Code und Warenwert ab, Lagerung wird pro Palette-Tag oder Kubikmeter pro Monat berechnet. Nur die Hauptfrachtrate zu vergleichen heißt, ein Viertel der Rechnung zu vergleichen.</p>
<h2>2. Modus wählen</h2>
<table><tbody>
<tr><td>Modus</td><td>Passt bei</td><td>Achtung</td></tr>
<tr><td>See LCL</td><td>Stabile Verkäufe, 100–500 kg</td><td>Konsolidierungsverzug, Hafenstau</td></tr>
<tr><td>See FCL</td><td>Planbares Volumen, niedriger Stückwert</td><td>Kapital 40+ Tage gebunden</td></tr>
<tr><td>Luft</td><td>Neue SKU testen, Nachschublücken</td><td>Volumengewicht bestraft leicht und sperrig</td></tr>
<tr><td>Lager im Zielmarkt</td><td>Märkte mit Lieferversprechen</td><td>Lagerkosten und Langsamdreher</td></tr>
</tbody></table>
<h2>3. Nachbestellung als Rechnung</h2>
<p>Sicherheitsbestand = durchschnittlicher Tagesabsatz × (Lieferzeit + Prüfzyklus) × Servicefaktor minus Ware im Zulauf. Die Lieferzeit misst man vom Zahlungseingang bis zur Regalreife, nicht von Abfahrt bis Ankunft — genau dort entstehen Out-of-Stocks. Monatlich prüfen; ein "gefühlt ausreichender" Puffer ist der Grund, warum Händler im selben Quartal Out-of-Stock und Ladenhüter haben.</p>
<h2>4. Häufige Fehler</h2>
<ul>
<li>Fracht pro Kilo kalkulieren und Mindestmengen ignorieren.</li>
<li>Vergessen, dass Zoll in manchen Märkten auf den frachtinklusive Wert erhoben wird.</li>
<li>Im Sale aus dem Bauch nachbestellen statt nach Forecast.</li>
</ul>
`,
  "4": `
<p>Operative Probleme sehen aus wie "Traffic ist teuer", aber Traffic ist selten die Ursache. Arbeite den Funnel der Reihe nach ab — Impressionen, Klicks, Warenkorb, Kauf, Wiederkauf — und repariere die Stufe, die gegenüber deiner eigenen Kategorie-Referenz am stärksten abfällt, nicht gegenüber dem Screenshot eines Gurus.</p>
<h2>1. Das Leck lokalisieren</h2>
<p>Wenig Impressionen: Keyword, Kategorieplatzierung oder Anzeigenabdeckung. Impressionen gut, Klicks schwach: Hauptbild, Titel und Preisansatz. Klicks werden keine Warenkörbe: Detailseite, Bewertungen, Lieferversprechen. Warenkörbe brechen ab: Checkout-Reibung, Zahlarten oder unerwartete Kosten am Ende.</p>
<h2>2. Titel und Hauptbild: den Klick kaufen</h2>
<p>Ein Titel gewinnt, wenn er trifft, was Menschen tippen, in der Reihenfolge, in der sie tippen: Kernbegriff zuerst, dann Differenzierer, dann Maß oder Menge. Was dich von den anderen neun Ergebnissen trennt, gehört in die ersten 60 Zeichen — mehr zeigt Mobile nicht. Das Hauptbild muss als Thumbnail funktionieren: ein Produkt, hoher Kontrast, keine Textwände und ein Größenhinweis, der "wie groß ist das?" beantwortet.</p>
<h2>3. Detailseite und Bewertungen: den Warenkorb kaufen</h2>
<p>Beantworte die vier Fragen, die den Kauf stoppen: passt es, funktioniert es mit dem, was ich habe, wie lange dauert die Lieferung, und was passiert bei Defekt. Ein Vergleichsblock gegen die naheliegende Alternative hilft; Versand und Rückgabe gehören über die Falz. Bewertungen sind keine Note, sondern eine Keyword-Quelle — die wiederholten Formulierungen der Käufer sind die, die du beantworten musst.</p>
<h2>4. Wiederkauf wird konstruiert</h2>
<p>Karte mit Verbrauchsmaterial oder Zubehör beilegen, für Wiederholartikel einen Erinnerungszyklus definieren, Nachbestellung auf einen Klick legen. Bindung ist günstiger als Akquise, aber nur wenn der Mechanismus gebaut ist.</p>
<h2>5. Wiederkehrende Fehler</h2>
<ul>
<li>Werbbudget erhöhen, obwohl die CTR das Problem ist.</li>
<li>Titel umschreiben, ohne zu prüfen, für welche Begriffe er aktuell rankt.</li>
<li>Bewertungen als Reputationsmanagement statt als Produktforschung behandeln.</li>
</ul>
`,
  "5": `
<p>Tool-Listen sind leicht geschrieben und schwer genutzt. Diese ist nach Entscheidung sortiert, nicht nach Anbieter: jeder Block nennt die Frage, das Werkzeug auf dieser Seite und die Daten, die nur du liefern kannst.</p>
<h2>1. Auswahl: Verdient dieser SKU Geld?</h2>
<p>Nutze den <a href="/tools/product-analysis">Produktanalyse-Rechner</a> für die Stückkostenrechnung und den <a href="/tool/profit-calculator">Gewinnrechner</a>, wenn du die Gebührenaufschlüsselung pro Bestellung brauchst. Keiner erfindet deinen Einkaufspreis oder deine Werbekosten — die kommen aus einem echten Angebot.</p>
<h2>2. Keywords und Listing: gefunden und geklickt werden</h2>
<p>Das <a href="/tools/keyword-lab">Keyword-Lab</a> erweitert Seed-Begriffe zu Long-Tail, misst Titelabdeckung und erzeugt eine CSV. Kombiniere es mit dem <a href="/tool/listing-optimizer">Listing-Optimierer</a>, um den Titel gegen Zeichenlimits und Begriffsabdeckung zu prüfen, bevor du veröffentlichst. Limits: Amazon 200, Mercado Libre 60, Shopee 255 — im jeweiligen Verkäufer-Center bestätigen, sie ändern sich.</p>
<h2>3. Kosten und Preis: Wechselkurs einrechnen</h2>
<p>Der <a href="/tool/rate-converter">Währungsrechner</a> zieht einen Live-Kurs, der Gewinnrechner legt Gebühren darüber. Preise nicht mit einem erinnerten Kurs: zwei Prozent auf dünner Marge sind der ganze Gewinn.</p>
<h2>4. Logistik: Volumengewicht richtig treffen</h2>
<p>Der <a href="/tool/shipping-calculator">Versandkostenrechner</a> vergleicht Volumen- und tatsächliches Gewicht und zeigt, wonach abgerechnet wird. Sperrig-leichte Ware wird fast immer nach Volumen berechnet.</p>
<h2>5. Compliance: vor dem Listing archivieren</h2>
<p>Die <a href="/compliance">Compliance-Bibliothek</a> listet die Dokumente je Markt. Behandle sie als Checkliste vor der ersten Sendung, nicht nach der ersten Sperre.</p>
<h2>6. Drei Regeln für jedes Tool</h2>
<ul>
<li>Echte Zahlen eingeben, sonst kommt Fiktion heraus: ein Rechner mit geratenen Werten ist ein Zufallsgenerator.</li>
<li>Eine Entscheidung pro Tool. Kannst du die Entscheidung nicht benennen, brauchst du das Tool nicht.</li>
<li>Ergebnis behalten. Eine Keyword-CSV oder ein gespeichertes Modell ist mehr wert als ein Screenshot, den du nicht wiederholen kannst.</li>
</ul>
`,
  "6": `
<p>Lateinamerika ist kein Markt. Mexiko und Brasilien unterscheiden sich in Sprache, Steueridentität, Zahlungsverhalten und Logistikkosten — ein Produkt, das in einem läuft, kann im anderen scheitern, aus Gründen, die nichts mit Nachfrage zu tun haben.</p>
<h2>1. Mexiko und Brasilien sind verschiedene Geschäfte</h2>
<p>Mexiko läuft auf Spanisch, mit RFC-Registrierung und einem Logistiknetz, das für Grenzhändler mit US- oder Grenzlager funktioniert. Brasilien läuft auf Portugiesisch, mit komplexer Steuerstruktur, höheren Importkosten und längerer Abfertigung — das drückt Richtung lokalen Bestand oder Fulfilment-Programm des Marktplatzes. Budget und Zeitplan pro Land bauen, nicht pro Region.</p>
<h2>2. Ein 60-Zeichen-Titel verändert die Auswahllogik</h2>
<p>Das Mercado-Libre-Limit zwingt, Zeichen in den Suchbegriff zu investieren statt in Marketing-Adjektive. Praktisch belohnt das Produkte, deren Wert in vier oder fünf Wörtern steht, und bestraft Bündel, die Erklärung brauchen. Teste Kandidatentitel bei 60 Zeichen, bevor du Bestand kaufst: Passt der Kernbegriff plus ein Differenzierer nicht hinein, wird das Produkt schwer gefunden.</p>
<h2>3. Richtungen und ihre Fallen</h2>
<ul>
<li><strong>Handyzubehör</strong> — stabile Nachfrage, aber harter Preiswettbewerb und viele Kompatibilitätsmodelle.</li>
<li><strong>Aufbewahrung</strong> — sperrig, das Volumengewicht entscheidet die Marge; faltbare Bauformen helfen.</li>
<li><strong>Beauty und Körperpflege</strong> — hohe Wiederkaufsrate, aber strenge Registrierung und Kennzeichnung.</li>
<li><strong>Autoteile</strong> — Passungsdaten sind der Graben; falsche Passung erzeugt unverkäufliche Retouren.</li>
</ul>
<h2>4. Preis mit Ratenzahlung denken</h2>
<p>Zinsfreie Raten sind in beiden Märkten Standard und die Gebühr trägt der Verkäufer. Rechne sie in den Preis, statt sie in der ersten Abrechnung zu entdecken. Prüfe die aktuelle Raten- und Provisionsstruktur im Verkäufer-Center — sie variiert nach Kategorie und Kampagne.</p>
<h2>5. Häufige Fehler</h2>
<p>Brasilien mit dem Mexiko-Playbook starten; ohne Ratengebühr kalkulieren; annehmen, ein 60-Zeichen-Titel trage ein Bündel; versenden, ohne steuerliche oder logistische Zuschläge des Zielstaates zu prüfen.</p>
`,
  "7": `
<p>Live-Verkauf ist kein schnelles Sprechen. Es ist ein Funnel mit vier Zahlen in Folge: Eintrittsrate, Verweildauer, Produktklick, Conversion. In dieser Reihenfolge reparieren, dann wächst der Raum; eine überspringen, und der Traffic ist verloren.</p>
<h2>1. Vor dem Start: die Produktleiter bauen</h2>
<p>Plane eine Leiter, keine Liste. Beginne mit einem günstigen Artikel, der ein offensichtliches Problem löst und die ersten Bestellungen bringt, dann das Hauptprodukt mit der echten Marge, dann Bündel oder Zubehör für den Warenkorbwert. Jedes Produkt braucht eine Demonstration, die ohne Worte funktioniert — in dem Moment, in dem der Zuschauer den Nutzen allein aus dem Video versteht, ist der Verkauf halb durch.</p>
<h2>2. Eine wiederverwendbare Schleife</h2>
<p>Etwa alle fünf Minuten: Hook (welches Problem), Demonstration (funktionierend zeigen), Beweis (Bestellungen, Bewertungen, Vergleich), Einwand (Preis, Größe, Lieferung), Handlungsaufruf (welcher Button, was passiert). Mit einem anderen Produkt wiederholen. Keine Specs vorlesen — das Ergebnis zeigen.</p>
<h2>3. Review mit vier Zahlen</h2>
<ul>
<li><strong>Eintrittsrate</strong> — funktionieren Cover und erste drei Sekunden?</li>
<li><strong>Verweildauer</strong> — stimmt das Tempo, oder gehen sie in der ersten Minute?</li>
<li><strong>Produktklicks</strong> — ist die Demo mit dem angehefteten Produkt verbunden?</li>
<li><strong>Conversion</strong> — sind Preis, Bestand und Lieferversprechen glaubwürdig?</li>
</ul>
<h2>4. Content und Regal verbinden</h2>
<p>Clips aus der Live-Session werden Kurzvideos, die die Produktseite speisen; die Produktseite speist mit Bewertungen und Fragen die nächste Session. Raum, Clips und Listing als ein System behandeln, nicht als drei Kanäle.</p>
<h2>5. Häufige Fehler</h2>
<p>Mit dem teuersten Produkt eröffnen; Features statt Ergebnis demonstrieren; zwei Stunden ohne Produktwechsel senden; und eine Session am Umsatz messen statt an der Funnel-Zahl, die gebrochen ist.</p>
`,
  "8": `
<p>Ein Auslandslager ist kein Lager, sondern ein Lieferzeit-Beschleuniger mit Mietrechnung. Die Entscheidung ist eine Rechnung über Umschlag, nicht über den Wunsch nach einem Schnellversand-Badge.</p>
<h2>1. Drei Modelle, drei Kostenstrukturen</h2>
<p>Marktplatz-Fulfilment (FBA und Verwandte) bündelt Lagerung, Kommissionierung und Kundenservice in einer Gebühr und gibt das Badge. Ein Drittanbieter-Lager berechnet Lagerung pro Palette oder Kubikmeter plus Handling pro Auftrag und ist flexibel. Ein eigenes Lager ist nur bei Volumen rational, weil Personal und System Fixkosten sind. Vergleiche pro Auftrag mit deinen echten Maßen und Gewichten, nicht mit einer Kubikmeter-Rate aus der Überschrift.</p>
<h2>2. Wareneingang: Fehler vor dem Versand stoppen</h2>
<p>Jeder Eingang braucht Termin, korrekte Karton- und Palettenkennzeichnung und eine Einheitenkennzeichnung (FNSKU o. ä.). Die drei teuersten Fehler: falscher Lagercode, Karton richtig und Einheit nicht gekennzeichnet, und Ankunft ohne Termin. Prüfe die Spezifikation erneut, bevor der Container rausgeht — Korrektur nach Ankunft kostet mehr als die Fracht.</p>
<h2>3. Bestand: drei Zahlen</h2>
<ul>
<li><strong>Reichweite in Tagen</strong> — verfügbar plus im Zulauf geteilt durch Tagesabsatz.</li>
<li><strong>Abverkauf in den ersten 30 Tagen</strong> — der ehrliche Test, ob der SKU den Platz verdient hat.</li>
<li><strong>Lagerkostenanteil am Umsatz</strong> — die Zahl, die leise die Marge frisst.</li>
</ul>
<h2>4. Letzte Meile: nach Gewichtsklasse wählen</h2>
<p>Carrier rechnen in Klassen, und die günstigste Option wechselt an jeder Schwelle. Baue eine kleine Tabelle deiner drei wichtigsten Klassen gegen drei Carrier und bepreise sie quartalsweise neu; ein Carrier für alles ist bequem und teuer.</p>
<h2>5. Was nicht vorpositioniert werden sollte</h2>
<p>Langsam drehende Saisonware, zerbrechliche Artikel mit hoher Retourenquote, kurzlebige Produkte und alles, dessen Nachfrage du noch nicht bewiesen hast. Erst per Luft beweisen, dann in Bestand überführen.</p>
`,
  "9": `
<p>Shopee und Lazada sehen von außen gleich aus und verhalten sich innen unterschiedlich: Onboarding-Unterlagen, Gebührenstruktur, Logistikprogramme und Punktesysteme folgen eigener Logik. Aktuelle Sätze im Verkäufer-Center prüfen — hier geht es um die Struktur, die sich viel weniger ändert als die Zahlen.</p>
<h2>1. Onboarding: Unterlagen vor dem Antrag</h2>
<p>Rechne mit Gewerbenachweis, Ausweis des gesetzlichen Vertreters, Bankkonto auf den Firmennamen und kategoriespezifischen Genehmigungen für Kosmetik, Lebensmittel, Elektronik und Kinderware. Anträge hängen an Details: Namensabweichung zwischen Nachweis und Konto, unscharfer Scan, Kategorie mit zusätzlicher Autorisierung.</p>
<h2>2. Gebühren: Provision ist nicht die ganze Rechnung</h2>
<p>Vier Zeilen prüfen: Kategorie-Provision, Transaktions- oder Zahlungsgebühr, Kosten der Kampagnenteilnahme und Beitrag zum Versandzuschuss. Eine Kampagne, die 30 % mehr Volumen bringt und 8 Punkte Kosten hinzufügt, kann bei dünner Marge weiter Verlust machen. Vor der Anmeldung im Gewinnrechner durchrechnen.</p>
<h2>3. Logistik: Kennzahlen sind harte Grenzen</h2>
<p>Verspätungsquote, Nichtversandquote und Stornoquote werden gemessen und fließen direkt in Strafpunkte und Sichtbarkeit ein. Nutze das Logistikprogramm der Plattform, wo es existiert: es kostet Geld, entfernt aber eine Klasse von Verspätungsstrafen, die du sonst nicht kontrollierst.</p>
<h2>4. Punkte und Erholung</h2>
<p>Punkte sammeln sich aus verspäteter Abwicklung, Storni, Fälschungsmeldungen und Listing-Verstößen. Erholung ist nicht sofort — meist braucht es einen sauberen Zyklus pünktlicher Sendungen. Kapazität so planen, dass eine Kampagne dich nicht über das Tageslimit treibt; das ist die häufigste selbst verursachte Strafe.</p>
<h2>5. Rote Linien</h2>
<ul>
<li>In einer gesperrten Kategorie ohne Genehmigung listen.</li>
<li>Bilder oder Markenbegriffe anderer Händler im Titel verwenden.</li>
<li>Käufer zum Stornieren und Neubestellen drängen, um die Verspätungsquote zu umgehen.</li>
<li>Ersatzware senden, wenn der Bestand ausgeht.</li>
</ul>
`,
  "10": `
<p>Die meisten Dashboards sind Dekoration. Ein nützliches beantwortet die Frage, auf die du gleich reagierst, und sonst nichts. Fünf Kennzahlengruppen, drei Analyseebenen, acht Zahlen pro Woche reichen für einen Shop.</p>
<h2>1. Fünf Gruppen, je eine Aktion</h2>
<table><tbody>
<tr><td>Gruppe</td><td>Kennzahl</td><td>Ausgelöste Aktion</td></tr>
<tr><td>Traffic</td><td>Impressionen, CTR</td><td>Keywords, Hauptbild, Gebote anpassen</td></tr>
<tr><td>Conversion</td><td>Warenkorbrate, Bestellconversion</td><td>Detailseite, Bewertungen, Preis überarbeiten</td></tr>
<tr><td>Warenkorb</td><td>Durchschnittswert, Stück pro Auftrag</td><td>Bündel, Schwellenangebot</td></tr>
<tr><td>Gewinn</td><td>Nettomarge pro Auftrag</td><td>Preis anpassen, Fracht verhandeln, Werbeverschwendung kappen</td></tr>
<tr><td>Gesundheit</td><td>Retouren, Verspätungen, Bestandsreichweite</td><td>Qualität, Kapazität, Nachbestellung</td></tr>
</tbody></table>
<h2>2. Drei Ebenen: SKU, Shop, Cash</h2>
<p>Auf SKU-Ebene entscheidest du behalten, reparieren oder einstellen. Auf Shop-Ebene, wohin die nächste Werbeeinheit geht. Auf Cash-Ebene, ob das Wachstum finanzierbar ist — Bestand plus Werbung plus Auszahlungstakt der Plattform bricht wachsende Händler, nicht die Marge.</p>
<h2>3. Wöchentliches Dashboard mit acht Zahlen</h2>
<ul>
<li>Umsatz, Nettogewinn, Nettomarge</li>
<li>Impressionen, CTR</li>
<li>Conversion, durchschnittlicher Bestellwert</li>
<li>Bestandsreichweite in Tagen</li>
</ul>
<p>Acht Zahlen, eine Seite, jede Woche am selben Tag. Bewegt sich eine Zahl, musst du die Änderung benennen können, die sie verursacht hat; sonst misst das Dashboard nicht deine Entscheidungen.</p>
<h2>4. Tools nutzen, ohne sie zu verschwenden</h2>
<p>Daten exportieren statt am Bildschirm lesen, eine Tabelle pro Quartal führen und jede Kennzahl an eine tatsächlich getroffene Entscheidung hängen. Ein Bericht, auf den niemand reagiert, ist Kosten, kein Asset.</p>
`,
};
