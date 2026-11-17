// lib/articles-i18n/tr.ts
// Türkçe — 1–10 numaralı makalelerin içeriği
import type { ArticleBodyPack } from "./types";

export const tr: ArticleBodyPack = {
  "1": `
<p>Ürün seçimindeki başarısızlıklar genellikle trendi kaçırmaktan değil, para harcamadan önce ürünün dört sınır ötesi maliyeti kaldırıp kaldıramayacağını kontrol etmemekten kaynaklanır: navlun, iade, reklam ve sertifikasyon. Bu, popüler kategori listesi değil, tekrar tekrar kullanılabilen bir filtredir.</p>
<h2>1. Dört filtre, sırayla</h2>
<p>Landed cost, komisyon, fulfillment, reklam ve iadeden sonra brüt marj. Hacimsel ağırlık ile gerçek ağırlık. İade ve satış sonrası davranışı. Ve sertifikasyon eşiği. Sırayla uygulanır: biri düşerse ürün elenir. Yüksek satış sıralaması negatif birim ekonomisini kurtarmaz; zarar eden ürünü daha çok satmak kaybı hızlandırır.</p>
<h2>2. "Yapılabilir gibi" ifadesini üç sayıya çevirmek</h2>
<p><a href="/tools/product-analysis">Ürün analiz hesaplayıcısında</a> modeli kurun: alış fiyatı, giriş navlunu, komisyon, sipariş işleme ve reklam maliyeti. Birim başına net kâr, net marj ve başabaş hacmi verir. Marj kaç fiyat savaşına dayanacağınızı, başabaş ise ne kadar organik trafik gerektiğini söyler.</p>
<p>Ardından talebi <a href="/tools/keyword-lab">anahtar kelime laboratuvarında</a> doğrulayın: net satın alma niyeti taşıyan kaç uzun kuyruk varyantı var ve başlıkta kaç karakter kaldı (Amazon 200, Mercado Libre 60, Shopee 255 — satıcı merkezinden teyit edin). Uzun kuyruğu olmayan bir pazar genellikle mavi okyanus değil, kimsenin arama yapmadığı bir pazardır. Son olarak ölçüleri <a href="/tool/shipping-calculator">kargo hesaplayıcısına</a> girin: yanlış hesaplanan giriş navlunu, yeni satıcıların en yaygın gizli kâr kaybıdır.</p>
<h2>3. En ucuz adımdan doğrulama</h2>
<ul>
<li><strong>Önce model</strong> — ücretsiz, on dakikada adayların çoğunu eler.</li>
<li><strong>Sonra arama niyeti</strong> — merak değil, satın alma.</li>
<li><strong>Sonra numune</strong> — rakipten bir iki adet alın; ambalaj, kılavuz ve işçilik hemen görünür.</li>
<li><strong>En son stok</strong> — tek ikmal döngüsü kadar ilk sipariş, sonra gerçek veriyle büyütme.</li>
</ul>
<h2>4. Tekrarlayan hatalar</h2>
<ul>
<li>Ürünleri ciroyla karşılaştırıp net marjı atlamak.</li>
<li>Navlun faturası gelene kadar hacimsel ağırlığı yok saymak.</li>
<li>Sertifikasyonu evrak işi sayıp maliyet satırı olarak görmemek.</li>
</ul>
`,
  "2": `
<p>Avrupa ve ABD'de uyum tek bir belge değil, üç ayrı sorudur: vergiyi kim topluyor, ürünü kim sertifikalandırıyor, sorun çıktığında hukuken kim sorumlu. Bunları tek prosedür gibi ele alanlar genellikle gümrükte değil kategori kapısında takılır.</p>
<h2>1. Vergi: kim toplar, kim beyan eder</h2>
<p>AB'de uzaktan satışlarda KDV, B2C işlemlerde varış ülkesinin eşiğine kadar genellikle pazaryeri tarafından, eşiğin üzerinde veya kendi mağazanızdan satışta sizin tarafınızdan toplanır. IOSS 150 € altı gönderiler içindir; üzeri normal ithalattır. ABD'de vergi eyalet düzeyindedir ve platform üzerinden tahsilat standarttır. Pratik kural: kayıt numarası, beyan dönemi ve saklama süresi tek yerde olsun ve kontrol etmediğiniz bir beyanı "platform yapmıştır" diye geçmeyin.</p>
<h2>2. Sertifikasyon tek sertifika değildir</h2>
<p>CE bir direktif ailesini kapsar — oyuncak, elektronik, EMC, makine, koruyucu donanım — her birinin test kapsamı farklıdır. ABD'de FCC radyo ve elektronik cihazlar için, FDA gıda teması, kozmetik ve bazı iddialar için geçerlidir. GPSR birçok ürün grubu için izlenebilirlik ve AB içinde sorumlu kişi ekler; ABD'de çocuk ürünleri CPC gerektirir. Tuzak: direktifi hiç test edilmemiş bir ürün için ucuz "CE sertifikası" satın almak.</p>
<h2>3. Listelemeden önce arşivleyin</h2>
<ul>
<li>Direktif ve standardın göründüğü test raporları.</li>
<li>İmzalı ve tarihli uygunluk beyanı.</li>
<li>Etiket tasarımı: ithalatçı, adres, parti, yerel dilde uyarılar.</li>
<li>Pil, sıvı ve aerosol için güvenlik bilgi formları.</li>
<li>Gerekiyorsa sorumlu kişi yetki belgesi.</li>
</ul>
<h2>4. Satıcıların takıldığı yerler</h2>
<p>Yürürlükten kalkmış standardı gösteren Çin raporu sunmak; yalnızca üretici adı olan, ithalatçısı olmayan etiket; bir bileşeni ürün sınıfını değiştiren set göndermek. Evrakı ilk konteynerden önce düzeltin, ilk şikâyetten sonra değil.</p>
`,
  "3": `
<p>Navlun tek maliyet değil dörttür: çıkış elleçleme, gümrük ve vergi, depolama ve son kilometre. Her biri farklı esastan faturalanır; bu yüzden "daha ucuz" mod, diğer üçü eklendiğinde birim başına daha pahalı olabilir.</p>
<h2>1. Dört segment, dört mantık</h2>
<p>Deniz yolu minimumlu metreküp, hava yolu ödenecek ağırlık (hacimsel ağırlık = uzunluk × genişlik × yükseklik ÷ 6000), ekspres gerçek ağırlık ve bölge tarifesi, son kilometre ağırlık bandı ve mesafe ile faturalanır. Vergi HS koduna ve beyan değerine bağlıdır, depolama palet-gün veya aylık metreküp olarak hesaplanır. Yalnızca ana navlunu karşılaştırmak, faturanın dörtte birini karşılaştırmaktır.</p>
<h2>2. Mod seçimi</h2>
<table><tbody>
<tr><td>Mod</td><td>Uygun olduğu durum</td><td>Dikkat</td></tr>
<tr><td>Deniz LCL</td><td>Dengeli satış, 100–500 kg</td><td>Konsolidasyon gecikmesi, liman tıkanıklığı</td></tr>
<tr><td>Deniz FCL</td><td>Öngörülebilir hacim, düşük birim değer</td><td>Sermaye 40+ gün bağlı</td></tr>
<tr><td>Hava</td><td>Yeni SKU testi, stok boşluğu</td><td>Hacimsel ağırlık hafif-hacimli ürünü cezalandırır</td></tr>
<tr><td>Yurt dışı depo</td><td>Hızlı teslimat bekleyen pazarlar</td><td>Depo ücreti ve yavaş stok</td></tr>
</tbody></table>
<h2>3. İkmal bir hesaptır</h2>
<p>Emniyet stoku = ortalama günlük satış × (tedarik süresi + gözden geçirme dönemi) × hizmet katsayısı, eksi yoldaki stok. Tedarik süresi çıkıştan varışa değil, ödemeden rafa hazır hale kadar ölçülür; stok tükenmesi buradan doğar. Ayda bir gözden geçirin; "yeterli gibi" yaklaşımı aynı çeyrekte hem tükenme hem ölü stok üretmenin yoludur.</p>
<h2>4. Sık hatalar</h2>
<ul>
<li>Kilo başına fiyat verip minimum ücretleri yok saymak.</li>
<li>Bazı pazarlarda verginin navlun dahil değer üzerinden alındığını unutmak.</li>
<li>Kampanya sırasında tahmin yerine hisle ikmal yapmak.</li>
</ul>
`,
  "4": `
<p>Operasyon sorunları "trafik pahalı" gibi görünür ama trafik nadiren nedendir. Huniyi sırayla yürüyün — gösterim, tıklama, sepet, sipariş, tekrar alım — ve düşüşün kendi kategori referansınıza göre en sert olduğu katmanı düzeltin, bir başkasının ekran görüntüsüne göre değil.</p>
<h2>1. Sızıntının katmanını bulmak</h2>
<p>Gösterim azsa anahtar kelime, kategori konumu veya reklam kapsamı. Gösterim iyi ama tıklama zayıfsa ana görsel, başlık ve fiyat çıpası. Tıklama sepete dönmüyorsa ürün sayfası, yorumlar ve teslimat vaadi. Sepet terk ediliyorsa ödeme sürtünmesi, ödeme yöntemleri veya son adımdaki sürpriz maliyet.</p>
<h2>2. Başlık ve ana görsel: tıklamayı satın almak</h2>
<p>Başlık, insanların yazdığı sırayla eşleştiğinde kazanır: ana terim, sonra fark yaratan özellik, sonra ölçü veya adet. Sizi diğer dokuz sonuçtan ayıran ifadeyi ilk 60 karaktere koyun, çünkü mobilde görünen o kadardır. Ana görsel küçük resimde yaşamalı: tek ürün, yüksek kontrast, metin duvarı yok ve "ne kadar büyük" sorusunu yanıtlayan ölçek ipucu var.</p>
<h2>3. Sayfa ve yorumlar: sepeti satın almak</h2>
<p>Satın almayı durduran dört soruyu yanıtlayın: uyar mı, elimdekilerle çalışır mı, kaç günde gelir, bozulursa ne olur. Belirgin alternatife karşı bir karşılaştırma bloğu ekleyin; kargo ve iade bilgisini ilk ekranın üstüne taşıyın. Yorumlar bir puan değil anahtar kelime kaynağıdır: alıcıların tekrarladığı ifadeler, yanıtlamanız gereken konulardır.</p>
<h2>4. Tekrar alım tasarlanır</h2>
<p>Sarf malzemesi veya aksesuar kartı ekleyin, tekrar eden ürünler için hatırlatma döngüsü tanımlayın, yeniden siparişi tek tıklamaya indirin. Elde tutma kazanmadan ucuzdur, ama yalnızca mekanizma kurulursa.</p>
<h2>5. Tekrarlayan hatalar</h2>
<ul>
<li>Sorun CTR iken reklam bütçesini artırmak.</li>
<li>Şu anda hangi terimlerle sıralandığını kontrol etmeden başlığı yeniden yazmak.</li>
<li>Yorumları itibar yönetimi sayıp ürün araştırması olarak kullanmamak.</li>
</ul>
`,
  "5": `
<p>Araç listeleri yazması kolay, kullanması zordur. Bu liste tedarikçiye göre değil karara göre düzenlendi: her blok soruyu, bu sitedeki aracı ve yalnızca sizin sağlayabileceğiniz veriyi söyler.</p>
<h2>1. Seçim: bu SKU para kazandırıyor mu</h2>
<p>Birim ekonomisi için <a href="/tools/product-analysis">ürün analiz hesaplayıcısı</a>, sipariş başına ücret dökümü için <a href="/tool/profit-calculator">kâr hesaplayıcısı</a>. Hiçbiri alış fiyatınızı veya reklam maliyetinizi uydurmaz; bunlar gerçek bir tekliften gelir.</p>
<h2>2. Anahtar kelime ve listeleme: bulunmak ve tıklanmak</h2>
<p><a href="/tools/keyword-lab">Anahtar kelime laboratuvarı</a> çekirdek terimleri uzun kuyruğa açar, başlık kapsamını ölçer ve CSV üretir. Yayından önce başlığı karakter limiti ve terim kapsamına göre puanlamak için <a href="/tool/listing-optimizer">listeleme iyileştirici</a> ile birleştirin. Limitler: Amazon 200, Mercado Libre 60, Shopee 255 — değişebilir, satıcı merkezinden doğrulayın.</p>
<h2>3. Maliyet ve fiyat: kuru hesaba katın</h2>
<p><a href="/tool/rate-converter">Döviz çevirici</a> canlı kur çeker, kâr hesaplayıcısı ücretleri üstüne ekler. Hatırladığınız kurdan fiyatlamayın: ince marjda iki puan tüm kârdır.</p>
<h2>4. Lojistik: hacimsel ağırlığı doğru almak</h2>
<p><a href="/tool/shipping-calculator">Kargo hesaplayıcısı</a> hacimsel ve gerçek ağırlığı karşılaştırır, hangisinden faturalandığınızı gösterir. Hacimli-hafif ürün neredeyse her zaman hacimden faturalanır.</p>
<h2>5. Uyum: yayından önce arşiv</h2>
<p><a href="/compliance">Uyum kütüphanesi</a> her pazarın beklediği belgeleri listeler. İlk sevkiyattan önce kontrol listesi olarak kullanın, ilk askıya almadan sonra değil.</p>
<h2>6. Her araç için üç kural</h2>
<ul>
<li>Gerçek sayı girin, yoksa kurgu alırsınız: tahminle beslenen hesaplayıcı rastgele sayı üretecidir.</li>
<li>Araç başına tek karar. Kararı adlandıramıyorsanız araca ihtiyacınız yok.</li>
<li>Çıktıyı saklayın. Anahtar kelime CSV'si veya kaydedilmiş model, tekrarlanamayan ekran görüntüsünden değerlidir.</li>
</ul>
`,
  "6": `
<p>Latin Amerika tek pazar değildir. Meksika ve Brezilya dil, vergi kimliği, ödeme alışkanlığı ve lojistik maliyeti açısından ayrışır; birinde çalışan ürün diğerinde talepten bağımsız nedenlerle başarısız olabilir.</p>
<h2>1. Meksika ve Brezilya iki ayrı iştir</h2>
<p>Meksika İspanyolca, RFC kaydı ve ABD ya da sınırda depo kurabilen sınır ötesi satıcı için gerçekçi bir lojistik ağı. Brezilya Portekizce, karmaşık vergi yapısı, daha yüksek ithalat maliyeti ve daha uzun gümrük — bu da yerel stoğa ya da pazaryeri fulfillment programına iter. Bütçe ve takvim bölgeye göre değil ülkeye göre kurulur.</p>
<h2>2. 60 karakterlik başlık seçim mantığını değiştirir</h2>
<p>Mercado Libre limiti, karakteri pazarlama sıfatlarına değil arama terimine harcamaya zorlar. Pratikte değeri dört beş kelimeyle anlatılan ürünleri ödüllendirir, açıklama gerektiren setleri cezalandırır. Stok taahhüdünden önce aday başlıkları 60 karakterde test edin: ana terim artı bir farklılaştırıcı sığmıyorsa ürün zor bulunur.</p>
<h2>3. İzlenmeye değer yönler ve tuzakları</h2>
<ul>
<li><strong>Telefon aksesuarları</strong> — talep istikrarlı, fiyat rekabeti sert ve uyumlu model sayısı sürekli artıyor.</li>
<li><strong>Ev düzenleme</strong> — hacimli, marjı hacimsel ağırlık belirler; katlanır tasarımlar yardımcı olur.</li>
<li><strong>Güzellik ve kişisel bakım</strong> — tekrar alım yüksek, kayıt ve etiketleme katı.</li>
<li><strong>Oto yedek parça</strong> — uyum verisi hendektir; yanlış uyum yeniden satılamayan iade üretir.</li>
</ul>
<h2>4. Taksitli fiyatlayın</h2>
<p>Faizsiz taksit iki pazarda da varsayılan beklentidir ve ücreti satıcı taşır. Bunu ilk mutabakatta keşfetmek yerine fiyata koyun. Güncel taksit ve komisyon yapısını satıcı merkezinden kontrol edin; kategoriye ve kampa göre değişir.</p>
<h2>5. Sık hatalar</h2>
<p>Brezilya'yı Meksika el kitabıyla başlatmak; taksit ücreti olmadan fiyatlamak; 60 karakterlik başlığın set taşıyacağını varsaymak; varış eyaletinin vergi veya lojistik ek ücretini kontrol etmeden göndermek.</p>
`,
  "7": `
<p>Canlı satış hızlı konuşmak değildir. Sırayla dört sayıdan oluşan bir hunidir: giriş oranı, izleme süresi, ürün tıklaması, dönüşüm. Bu sırayla düzeltirseniz oda büyür; birini atlarsanız trafik boşa gider.</p>
<h2>1. Yayın öncesi: ürün merdivenini kurmak</h2>
<p>Liste değil merdiven planlayın. Belirgin bir sorunu çözen düşük fiyatlı ürünle ilk siparişleri alın, sonra gerçek marjlı ana ürüne geçin, ardından sepet değerini yükseltmek için set veya aksesuar kullanın. Her ürün sözsüz çalışan bir gösterim ister: izleyici faydayı yalnızca videodan anladığı an satış yarılanmıştır.</p>
<h2>2. Tekrar kullanılabilir senaryo döngüsü</h2>
<p>Yaklaşık her beş dakikada: kanca (hangi sorun), gösterim (çalışırken göster), kanıt (sipariş, yorum, karşılaştırma), itiraz (fiyat, beden, teslimat), eylem çağrısı (hangi buton, sonra ne olacak). Başka ürünle tekrarla. Teknik özellik okumayın, sonucu gösterin.</p>
<h2>3. Dört sayıyla değerlendirme</h2>
<ul>
<li><strong>Giriş oranı</strong> — kapak ve ilk üç saniye çalışıyor mu.</li>
<li><strong>Ortalama izleme</strong> — döngü temposu doğru mu, ilk dakikada mı çıkıyorlar.</li>
<li><strong>Ürün tıklaması</strong> — gösterim sabitlenen ürüne bağlı mı.</li>
<li><strong>Dönüşüm</strong> — fiyat, stok ve teslimat vaadi inandırıcı mı.</li>
</ul>
<h2>4. İçerik ile rafı bağlamak</h2>
<p>Yayından kesilen klipler ürün sayfasını besleyen kısa videolar olur; ürün sayfası yorum ve soruları bir sonraki yayına taşır. Oda, klipler ve listeleme üç kanal değil tek sistemdir.</p>
<h2>5. Sık hatalar</h2>
<p>En pahalı ürünle açmak; özellik göstermek, sonucu göstermemek; iki saat ürün değiştirmeden yayın yapmak; oturumu ciroyla değerlendirip kırılan huni sayısına bakmamak.</p>
`,
  "8": `
<p>Yurt dışı depo depo değil, kira faturası olan teslimat hızlandırıcısıdır. Karar devir hızı hesabıdır, hızlı teslimat rozeti isteği değil.</p>
<h2>1. Üç model, üç maliyet yapısı</h2>
<p>Pazaryeri fulfillment (FBA ve benzerleri) depolama, toplama ve müşteri hizmetini tek ücrete toplar ve rozet verir. Üçüncü taraf depo palet veya metreküp başına depolama artı sipariş başına elleçleme alır, esneklik verir. Kendi deponuz yalnızca hacimde mantıklıdır çünkü işgücü ve sistem sabit maliyettir. Reklamdaki metreküp ücretiyle değil, gerçek ölçü ve ağırlıkla sipariş başına karşılaştırın.</p>
<h2>2. Giriş: hatayı sevkiyattan önce durdurmak</h2>
<p>Her girişte randevu, doğru koli ve palet etiket şartnamesi, birim etiketi (FNSKU vb.) gerekir. En pahalı üç hata: yanlış depo koduna göndermek, koliyi doğru etiketleyip birimi etiketlememek, randevusuz varmak. Konteyner çıkmadan şartnameyi tekrar kontrol edin; varışta düzeltmek navlundan pahalıdır.</p>
<h2>3. Stok: üç sayı</h2>
<ul>
<li><strong>Günlük kapsam</strong> — elde olan artı yoldaki, günlük satışa bölünür.</li>
<li><strong>İlk 30 günde erime</strong> — SKU'nun yeri hak edip etmediğinin dürüst testi.</li>
<li><strong>Depolamanın ciroya oranı</strong> — marjı sessizce yiyen sayı.</li>
</ul>
<h2>4. Son kilometre: ağırlık bandına göre seçim</h2>
<p>Taşıyıcılar bant bazında fiyatlar ve en ucuz seçenek her eşikte değişir. Üç ana bandınızı üç taşıyıcıyla karşılaştıran küçük bir tablo yapın ve üç ayda bir güncelleyin; her şey için tek taşıyıcı rahat ve pahalıdır.</p>
<h2>5. Önceden stoklanmaması gerekenler</h2>
<p>Yavaş dönen sezonluk ürünler, iade oranı yüksek kırılganlar, raf ömrü kısa ürünler ve talebi henüz kanıtlanmamış her şey. Önce havayoluyla kanıtlayın, sonra stoğa alın.</p>
`,
  "9": `
<p>Shopee ve Lazada dışarıdan benzer, içeride farklı davranır: katılım belgeleri, ücret yapısı, lojistik programları ve ceza puanı sistemleri kendi mantığına sahiptir. Güncel oranları satıcı merkezinden kontrol edin — burada sayılardan çok daha az değişen yapıyı ele alıyoruz.</p>
<h2>1. Katılım: başvurudan önce dosyayı hazırlayın</h2>
<p>Faaliyet ruhsatı, yasal temsilci kimliği, şirket adına banka hesabı ve kozmetik, gıda, elektronik ile çocuk ürünleri için kategori izinleri beklenir. Başvurular ayrıntıda tıkanır: ruhsat ile banka adı uyuşmazlığı, okunaksız tarama veya ek yetki yazısı gereken kategori.</p>
<h2>2. Ücretler: komisyon tüm fatura değil</h2>
<p>Dört satıra bakın: kategori komisyonu, işlem veya ödeme ücreti, kampanya katılım maliyeti ve kargo sübvansiyonuna katkı. Hacmi %30 artırıp 8 puan maliyet ekleyen kampanya ince marjda yine zarar olabilir. Kaydolmadan önce kâr hesaplayıcısında modelleyin.</p>
<h2>3. Lojistik: metrikler sert kısıttır</h2>
<p>Geç gönderim, gönderilmeme ve iptal oranları ölçülür; doğrudan ceza puanına ve arama görünürlüğüne yansır. Platformun lojistik programı varsa kullanın: para maliyeti var ama kontrol edemediğiniz bir gecikme cezası sınıfını ortadan kaldırır.</p>
<h2>4. Puanlar ve toparlanma</h2>
<p>Puanlar geç fulfillment, iptal, sahte ürün şikâyeti ve listeleme ihlallerinden birikir. Toparlanma anlık değildir: genellikle temiz bir zamanında gönderim döngüsü gerekir. Kapasiteyi kampanyanın günlük paketleme limitinizi aşmayacağı şekilde planlayın; en sık kendi kendinize verdiğiniz cezadır.</p>
<h2>5. Aşılmaması gereken çizgiler</h2>
<ul>
<li>Onaysız kısıtlı kategoride listeleme.</li>
<li>Başlıkta başka satıcının görselini veya marka terimini kullanmak.</li>
<li>Gecikme metriğinden kaçmak için alıcıdan iptal ve yeniden sipariş istemek.</li>
<li>Stok bitince yerine başka ürün göndermek.</li>
</ul>
`,
  "10": `
<p>Panoların çoğu dekorasyondur. Yararlı pano, harekete geçeceğiniz soruyu yanıtlar ve başka bir şeyi değil. Beş metrik grubu, üç analiz düzeyi ve haftada sekiz sayı bir mağazayı yönetmeye yeter.</p>
<h2>1. Beş grup, her biri tek eylem</h2>
<table><tbody>
<tr><td>Grup</td><td>Metrik</td><td>Tetiklediği eylem</td></tr>
<tr><td>Trafik</td><td>Gösterim, CTR</td><td>Anahtar kelime, ana görsel, teklif ayarı</td></tr>
<tr><td>Dönüşüm</td><td>Sepet oranı, sipariş dönüşümü</td><td>Sayfa, yorum, fiyat revizyonu</td></tr>
<tr><td>Sepet</td><td>Ortalama sipariş, sipariş başına adet</td><td>Set, eşik teklifi</td></tr>
<tr><td>Kâr</td><td>Sipariş başına net marj</td><td>Yeniden fiyatlama, navlun pazarlığı, reklam israfını kesme</td></tr>
<tr><td>Sağlık</td><td>İade, geç gönderim, stok kapsamı</td><td>Kalite, kapasite, ikmal</td></tr>
</tbody></table>
<h2>2. Üç düzey: SKU, mağaza, nakit</h2>
<p>SKU düzeyinde tut, düzelt veya bırak kararı verilir. Mağaza düzeyinde bir sonraki reklam biriminin yeri belirlenir. Nakit düzeyinde büyümenin karşılanabilir olup olmadığı: stok artı reklam artı platform ödeme takvimi, büyüyen satıcıyı kıran şeydir, marj değil.</p>
<h2>3. Haftalık sekiz sayılık pano</h2>
<ul>
<li>Ciro, net kâr, net marj</li>
<li>Gösterim, CTR</li>
<li>Dönüşüm oranı, ortalama sipariş değeri</li>
<li>Stok kapsam günü</li>
</ul>
<p>Sekiz sayı, bir sayfa, her hafta aynı gün. Bir sayı hareket ettiyse buna neden olan kendi değişikliğinizi adlandırabilmelisiniz; adlandıramıyorsanız o pano kararlarınızı ölçmüyor.</p>
<h2>4. Araçları israf etmeden kullanmak</h2>
<p>Veriyi ekranda okumak yerine dışa aktarın, çeyrek başına bir tablo tutun ve her metriği gerçekten aldığınız bir karara bağlayın. Kimsenin harekete geçmediği rapor maliyettir, varlık değil.</p>
`,
};
