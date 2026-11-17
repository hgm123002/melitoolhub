// lib/articles-i18n/id.ts
// Bahasa Indonesia — isi artikel 1–10
import type { ArticleBodyPack } from "./types";

export const id: ArticleBodyPack = {
  "1": `
<p>Kegagalan pemilihan produk jarang karena melewatkan tren, tetapi karena sebelum mengeluarkan uang tidak diperiksa apakah produk mampu menanggung empat biaya lintas negara: pengiriman, retur, iklan, dan kepatuhan. Ini filter yang bisa dipakai berulang, bukan daftar kategori yang sedang naik.</p>
<h2>1. Empat filter, dijalankan berurutan</h2>
<p>Margin kotor setelah biaya sampai gudang, komisi, fulfillment, iklan, dan retur. Berat volumetrik versus berat aktual. Perilaku retur dan layanan purna jual. Dan hambatan sertifikasi. Jika satu filter gagal, produk dibuang. Peringkat penjualan tinggi tidak menyelamatkan ekonomi unit yang negatif — menjual lebih banyak barang rugi hanya mempercepat kerugian.</p>
<h2>2. Ubah "kayaknya bisa" jadi tiga angka</h2>
<p>Bangun model di <a href="/tools/product-analysis">kalkulator analisis produk</a>: harga beli, ongkos masuk, komisi, biaya fulfillment, biaya iklan. Hasilnya laba bersih per unit, margin bersih, dan volume titik impas. Margin menunjukkan berapa kali perang harga bisa ditahan; titik impas menunjukkan berapa banyak trafik organik yang dibutuhkan.</p>
<p>Lalu uji permintaan di <a href="/tools/keyword-lab">laboratorium kata kunci</a>: berapa frasa ekor panjang yang punya niat beli jelas, dan berapa sisa karakter judul (Amazon 200, Mercado Libre 60, Shopee 255 — cek di seller centre). Pasar tanpa ekor panjang biasanya bukan samudra biru, melainkan pasar yang tidak dicari orang. Terakhir, masukkan dimensi ke <a href="/tool/shipping-calculator">kalkulator pengiriman</a>: ongkos masuk yang salah hitung adalah kebocoran margin paling umum bagi pemula.</p>
<h2>3. Verifikasi dari yang paling murah</h2>
<ul>
<li><strong>Model dulu</strong> — gratis dan menyisihkan sebagian besar kandidat dalam sepuluh menit.</li>
<li><strong>Lalu niat pencarian</strong> — niat beli, bukan rasa penasaran.</li>
<li><strong>Lalu sampel</strong> — beli satu atau dua unit pesaing; kemasan, manual, dan hasil akhir langsung terlihat.</li>
<li><strong>Stok terakhir</strong> — order pertama seukuran satu siklus pengisian, lalu skala dengan data nyata.</li>
</ul>
<h2>4. Kesalahan yang berulang</h2>
<ul>
<li>Membandingkan produk dengan omzet, bukan margin bersih.</li>
<li>Mengabaikan berat volumetrik sampai tagihan pengiriman datang.</li>
<li>Menganggap sertifikasi sebagai urusan dokumen, bukan baris biaya.</li>
</ul>
`,
  "2": `
<p>Kepatuhan di Eropa dan Amerika bukan satu dokumen, melainkan tiga pertanyaan berbeda: siapa memungut pajak, siapa mensertifikasi produk, dan siapa bertanggung jawab hukum bila ada masalah. Yang memperlakukannya sebagai satu prosedur biasanya tertahan di gerbang kategori, bukan di bea cukai.</p>
<h2>1. Pajak: siapa memungut, siapa melapor</h2>
<p>Di UE, PPN penjualan jarak jauh umumnya dipungut marketplace untuk transaksi B2C sampai ambang negara tujuan, dan oleh Anda di atasnya atau saat berjualan lewat toko sendiri. IOSS berlaku untuk kiriman di bawah €150; di atas itu impor biasa. Di AS pajak di tingkat negara bagian dan pemungutan lewat platform sudah menjadi standar. Aturan praktis: nomor registrasi, periode pelaporan, dan masa simpan di satu tempat, dan jangan menganggap platform sudah melaporkan sesuatu yang tidak Anda periksa.</p>
<h2>2. Sertifikasi bukan satu sertifikat</h2>
<p>CE mencakup keluarga direktif — mainan, elektronik, kompatibilitas elektromagnetik, mesin, alat pelindung — masing-masing dengan ruang uji sendiri. FCC berlaku untuk perangkat radio dan elektronik di AS; FDA untuk kontak pangan, kosmetik, dan klaim tertentu. GPSR menambah ketertelusuran dan penanggung jawab di UE untuk banyak kelompok produk; produk anak di AS butuh CPC. Jebakannya: membeli "sertifikat CE" murah untuk produk yang direktifnya tidak pernah diuji.</p>
<h2>3. Arsipkan sebelum tayang</h2>
<ul>
<li>Laporan uji dengan direktif dan standar terlihat.</li>
<li>Deklarasi kesesuaian bertanda tangan dan bertanggal.</li>
<li>Desain label: importir, alamat, batch, peringatan dalam bahasa lokal.</li>
<li>Lembar data keselamatan untuk baterai, cairan, dan aerosol.</li>
<li>Mandat penanggung jawab bila diwajibkan.</li>
</ul>
<h2>4. Cara penjual terjatuh</h2>
<p>Menyajikan laporan uji Tiongkok yang mengutip standar yang sudah dicabut; label hanya nama pabrikan tanpa importir; mengirim bundel yang satu komponennya mengubah kelas produk. Rapikan dokumen sebelum kontainer pertama, bukan setelah keluhan pertama.</p>
`,
  "3": `
<p>Ongkos kirim bukan satu biaya, melainkan empat: penanganan di asal, bea cukai dan tarif, penyimpanan, dan mil terakhir. Masing-masing ditagih dengan dasar berbeda, jadi moda "lebih murah" bisa lebih mahal per unit setelah tiga lainnya dijumlahkan.</p>
<h2>1. Empat segmen, empat logika tagihan</h2>
<p>Laut menagih per CBM dengan minimum, udara per berat terhitung (berat volumetrik = P × L × T ÷ 6000 pada sebagian besar maskapai), ekspres per berat aktual dengan tarif zona, mil terakhir per kelas berat dan jarak. Bea masuk bergantung kode HS dan nilai pabean, penyimpanan ditagih per palet-hari atau per meter kubik per bulan. Membandingkan tarif utama saja berarti membandingkan seperempat tagihan.</p>
<h2>2. Memilih moda</h2>
<table><tbody>
<tr><td>Moda</td><td>Cocok untuk</td><td>Perhatikan</td></tr>
<tr><td>Laut LCL</td><td>Penjualan stabil, 100–500 kg</td><td>Keterlambatan konsolidasi, kemacetan pelabuhan</td></tr>
<tr><td>Laut FCL</td><td>Volume terprediksi, nilai unit rendah</td><td>Modal tertahan 40+ hari</td></tr>
<tr><td>Udara</td><td>Uji SKU baru, menutup kekosongan</td><td>Berat volumetrik menghukum barang ringan berukuran besar</td></tr>
<tr><td>Gudang lokal</td><td>Pasar menuntut pengiriman cepat</td><td>Biaya simpan dan stok lambat</td></tr>
</tbody></table>
<h2>3. Pengisian stok sebagai hitungan</h2>
<p>Stok pengaman = penjualan harian rata-rata × (lead time + periode tinjau) × faktor layanan, dikurangi yang sudah dalam perjalanan. Lead time diukur dari pembayaran sampai siap di rak, bukan dari keberangkatan sampai kedatangan: di situ kekosongan lahir. Tinjau tiap bulan; bantalan "kayaknya cukup" adalah cara berakhir dengan kekosongan dan stok mati di kuartal yang sama.</p>
<h2>4. Kesalahan umum</h2>
<ul>
<li>Menghitung per kilo sambil mengabaikan tagihan minimum.</li>
<li>Lupa bahwa di sebagian pasar bea dihitung atas nilai termasuk ongkir.</li>
<li>Mengisi stok berdasarkan feeling saat promo, bukan proyeksi.</li>
</ul>
`,
  "4": `
<p>Masalah operasional terlihat seperti "trafik mahal", padahal trafik jarang menjadi penyebabnya. Telusuri funnel berurutan — tayangan, klik, keranjang, pesanan, pembelian ulang — lalu perbaiki lapisan dengan penurunan terbesar dibandingkan patokan kategori Anda sendiri, bukan tangkapan layar orang lain.</p>
<h2>1. Menemukan lapisan yang bocor</h2>
<p>Tayangan sedikit: kata kunci, posisi kategori, atau cakupan iklan. Tayangan baik tetapi klik lemah: gambar utama, judul, dan jangkar harga. Klik tidak jadi keranjang: halaman detail, ulasan, janji pengiriman. Keranjang ditinggalkan: friksi checkout, metode bayar, atau biaya tak terduga di langkah akhir.</p>
<h2>2. Judul dan gambar utama: membeli klik</h2>
<p>Judul menang bila cocok dengan yang diketik orang, sesuai urutannya: istilah inti, lalu pembeda, lalu ukuran atau jumlah. Taruh pembeda dari sembilan hasil lain di 60 karakter pertama, karena itulah yang tampil di ponsel. Gambar utama harus bertahan sebagai thumbnail: satu produk, kontras tinggi, tanpa dinding teks, dan petunjuk skala yang menjawab "seberapa besar".</p>
<h2>3. Halaman dan ulasan: membeli keranjang</h2>
<p>Jawab empat pertanyaan yang menghentikan pembelian: apakah pas, apakah cocok dengan yang saya punya, berapa lama pengiriman, dan apa yang terjadi bila rusak. Tambahkan blok perbandingan dengan alternatif yang jelas, dan taruh pengiriman serta retur di atas lipatan. Ulasan bukan skor, tetapi sumber kata kunci: frasa yang diulang pembeli adalah yang harus Anda jawab.</p>
<h2>4. Pembelian ulang dirancang</h2>
<p>Sertakan kartu barang habis pakai atau aksesori, tetapkan siklus pengingat untuk barang berulang, dan buat pemesanan ulang satu klik. Retensi lebih murah daripada akuisisi, tetapi hanya jika mekanismenya dibangun.</p>
<h2>5. Kesalahan berulang</h2>
<ul>
<li>Menaikkan anggaran iklan padahal masalahnya CTR.</li>
<li>Menulis ulang judul tanpa memeriksa kata kunci yang kini mendatangkan tayangan.</li>
<li>Memperlakukan ulasan sebagai manajemen reputasi, bukan riset produk.</li>
</ul>
`,
  "5": `
<p>Daftar alat mudah ditulis dan sulit dipakai. Yang ini disusun menurut keputusan, bukan vendor: setiap blok menyebut pertanyaan, alat di situs ini yang menjawabnya, dan data yang hanya bisa Anda sediakan.</p>
<h2>1. Pemilihan: apakah SKU ini untung</h2>
<p>Gunakan <a href="/tools/product-analysis">kalkulator analisis produk</a> untuk ekonomi unit, dan <a href="/tool/profit-calculator">kalkulator laba</a> saat butuh rincian biaya per pesanan. Keduanya tidak mengarang harga beli atau biaya iklan Anda — itu dari penawaran nyata.</p>
<h2>2. Kata kunci dan listing: ditemukan dan diklik</h2>
<p><a href="/tools/keyword-lab">Laboratorium kata kunci</a> mengembangkan istilah benih jadi ekor panjang, mengukur cakupan judul, dan mengekspor CSV. Gabungkan dengan <a href="/tool/listing-optimizer">pengoptimal listing</a> untuk menilai judul terhadap batas karakter dan cakupan istilah sebelum tayang. Batas: Amazon 200, Mercado Libre 60, Shopee 255 — pastikan di seller centre, angkanya berubah.</p>
<h2>3. Biaya dan harga: masukkan kurs</h2>
<p><a href="/tool/rate-converter">Konverter mata uang</a> mengambil kurs langsung dan kalkulator laba menambahkan biaya di atasnya. Jangan menetapkan harga dengan kurs yang Anda ingat: dua persen pada margin tipis adalah seluruh laba.</p>
<h2>4. Logistik: berat volumetrik yang tepat</h2>
<p><a href="/tool/shipping-calculator">Kalkulator pengiriman</a> membandingkan berat volumetrik dan aktual serta menunjukkan dasar tagihan. Barang besar dan ringan hampir selalu ditagih berdasarkan volume.</p>
<h2>5. Kepatuhan: arsip sebelum tayang</h2>
<p><a href="/compliance">Perpustakaan kepatuhan</a> mencantumkan dokumen yang diminta tiap pasar. Pakai sebagai checklist sebelum pengiriman pertama, bukan setelah penangguhan pertama.</p>
<h2>6. Tiga aturan memakai alat apa pun</h2>
<ul>
<li>Masukkan angka nyata atau terima fiksi: kalkulator dengan tebakan adalah pembangkit angka acak.</li>
<li>Satu keputusan per alat. Bila tidak bisa menyebut keputusannya, alat itu tidak diperlukan.</li>
<li>Simpan hasilnya. CSV kata kunci atau model tersimpan lebih bernilai daripada tangkapan layar yang tak bisa diulang.</li>
</ul>
`,
  "6": `
<p>Amerika Latin bukan satu pasar. Meksiko dan Brasil berbeda dalam bahasa, identitas pajak, kebiasaan pembayaran, dan biaya logistik, dan produk yang berhasil di satu bisa gagal di lainnya karena alasan yang tak ada kaitannya dengan permintaan.</p>
<h2>1. Meksiko dan Brasil adalah dua bisnis berbeda</h2>
<p>Meksiko berjalan dengan Spanyol, registrasi RFC, dan jaringan logistik yang realistis bagi penjual lintas batas bermodal gudang di AS atau perbatasan. Brasil berjalan dengan Portugis, struktur pajak kompleks, biaya impor lebih tinggi, dan clearance lebih lama — yang mendorong ke stok lokal atau program fulfillment marketplace. Anggaran dan jadwal disusun per negara, bukan per kawasan.</p>
<h2>2. Judul 60 karakter mengubah logika pemilihan</h2>
<p>Batas Mercado Libre memaksa Anda membelanjakan karakter untuk istilah pencarian, bukan kata sifat pemasaran. Praktisnya ini menguntungkan produk yang nilainya bisa dijelaskan dalam empat atau lima kata, dan menghukum bundel yang butuh penjelasan. Uji judul kandidat pada 60 karakter sebelum memesan stok: bila istilah inti plus satu pembeda tidak muat, produk sulit ditemukan.</p>
<h2>3. Arah yang layak dipantau dan jebakannya</h2>
<ul>
<li><strong>Aksesori ponsel</strong> — permintaan stabil, tetapi persaingan harga keras dan model kompatibilitas terus bertambah.</li>
<li><strong>Penataan rumah</strong> — besar, jadi berat volumetrik menentukan margin; desain lipat membantu.</li>
<li><strong>Kecantikan dan perawatan</strong> — pembelian ulang tinggi, tetapi registrasi dan label ketat.</li>
<li><strong>Suku cadang mobil</strong> — data kecocokan adalah benteng; kecocokan salah menghasilkan retur yang tak bisa dijual lagi.</li>
</ul>
<h2>4. Tetapkan harga dengan cicilan</h2>
<p>Cicilan tanpa bunga adalah ekspektasi standar di kedua pasar dan biayanya ditanggung penjual. Masukkan ke harga, jangan temukan di settlement pertama. Periksa struktur cicilan dan komisi yang berlaku di seller centre: berbeda per kategori dan kampanye.</p>
<h2>5. Kesalahan umum</h2>
<p>Meluncurkan di Brasil dengan buku panduan Meksiko; menetapkan harga tanpa biaya cicilan; menganggap judul 60 karakter bisa memuat bundel; mengirim tanpa memeriksa biaya tambahan pajak atau logistik negara bagian tujuan.</p>
`,
  "7": `
<p>Jualan live bukan soal bicara cepat. Ini funnel dengan empat angka berurutan: tingkat masuk, durasi tonton, klik produk, dan konversi. Perbaiki berurutan, ruangan tumbuh; lewati satu, trafik terbuang.</p>
<h2>1. Sebelum siaran: susun tangga produk</h2>
<p>Rancang tangga, bukan daftar. Mulai dari produk murah yang menyelesaikan masalah jelas dan mendatangkan pesanan pertama, lalu produk utama dengan margin nyata, lalu bundel atau aksesori untuk menaikkan nilai keranjang. Tiap produk butuh demonstrasi yang bekerja tanpa kata: saat penonton paham manfaatnya hanya dari video, penjualan sudah setengah jalan.</p>
<h2>2. Loop naskah yang bisa dipakai ulang</h2>
<p>Kira-kira tiap lima menit: pancingan (masalah apa), demonstrasi (tunjukkan bekerja), bukti (pesanan, ulasan, perbandingan), bantahan (harga, ukuran, pengiriman), ajakan (tombol mana, apa berikutnya). Ulangi dengan produk lain. Jangan membacakan spesifikasi — tunjukkan hasilnya.</p>
<h2>3. Evaluasi dengan empat angka</h2>
<ul>
<li><strong>Tingkat masuk</strong> — apakah cover dan tiga detik pertama bekerja?</li>
<li><strong>Durasi tonton rata-rata</strong> — apakah tempo loop tepat atau mereka pergi di menit pertama?</li>
<li><strong>Klik produk</strong> — apakah demonstrasi tersambung ke produk yang disematkan?</li>
<li><strong>Konversi</strong> — apakah harga, stok, dan janji kirim meyakinkan?</li>
</ul>
<h2>4. Hubungkan konten dan rak</h2>
<p>Potongan dari siaran menjadi video pendek yang mengalir ke halaman produk; halaman produk memasok ulasan dan pertanyaan ke siaran berikutnya. Perlakukan ruangan, potongan, dan listing sebagai satu sistem, bukan tiga kanal.</p>
<h2>5. Kesalahan umum</h2>
<p>Membuka dengan produk termahal; mendemonstrasikan fitur bukan hasil; siaran dua jam tanpa rotasi produk; menilai sesi dari omzet alih-alih angka funnel yang patah.</p>
`,
  "8": `
<p>Gudang luar negeri bukan gudang, melainkan akselerator kecepatan kirim dengan tagihan sewa. Keputusannya hitungan perputaran, bukan keinginan punya lencana kirim cepat.</p>
<h2>1. Tiga model, tiga struktur biaya</h2>
<p>Fulfillment marketplace (FBA dan sejenisnya) menggabungkan penyimpanan, picking, dan layanan pelanggan dalam satu tarif serta memberi lencana. Gudang pihak ketiga menagih simpan per palet atau meter kubik plus penanganan per pesanan, dan memberi keleluasaan. Gudang sendiri hanya masuk akal pada volume besar karena tenaga kerja dan sistem adalah biaya tetap. Bandingkan per pesanan dengan dimensi dan berat nyata, bukan tarif meter kubik di iklan.</p>
<h2>2. Inbound: hentikan kesalahan sebelum kirim</h2>
<p>Setiap inbound butuh janji temu, spesifikasi label karton dan palet yang benar, serta label unit seperti FNSKU. Tiga kegagalan termahal: kirim ke kode gudang salah, karton benar tetapi unit tidak berlabel, dan tiba tanpa janji temu. Periksa spesifikasi sekali lagi sebelum kontainer berangkat: koreksi setelah tiba lebih mahal dari ongkos kirim.</p>
<h2>3. Persediaan: tiga angka</h2>
<ul>
<li><strong>Hari cakupan</strong> — tersedia plus dalam perjalanan dibagi penjualan harian.</li>
<li><strong>Penjualan 30 hari pertama</strong> — uji jujur apakah SKU layak mendapat ruang.</li>
<li><strong>Biaya simpan terhadap pendapatan</strong> — angka yang diam-diam memakan margin.</li>
</ul>
<h2>4. Mil terakhir: pilih per kelas berat</h2>
<p>Kurir menagih per kelas, dan opsi termurah berubah di tiap batas. Buat tabel tiga kelas utama Anda melawan tiga kurir dan perbarui tiap kuartal; satu kurir untuk semua praktis dan mahal.</p>
<h2>5. Yang tidak layak distok di depan</h2>
<p>Musiman lambat, barang rapuh dengan retur tinggi, produk berumur simpan pendek, dan apa pun yang permintaannya belum terbukti. Buktikan SKU lewat udara, lalu pindahkan ke stok.</p>
`,
  "9": `
<p>Shopee dan Lazada mirip dari luar dan berbeda perilaku di dalam: dokumen pendaftaran, struktur biaya, program logistik, dan sistem poin punya logikanya sendiri. Periksa tarif berlaku di seller centre — di sini yang dibahas strukturnya, yang jauh lebih jarang berubah daripada angkanya.</p>
<h2>1. Pendaftaran: siapkan berkas sebelum mengajukan</h2>
<p>Perkirakan izin usaha, identitas perwakilan legal, rekening bank atas nama badan usaha, dan izin khusus kategori untuk kosmetik, pangan, elektronik, dan produk anak. Pengajuan macet pada detail: nama berbeda antara izin dan rekening, hasil pindai tidak terbaca, atau kategori yang butuh surat kuasa tambahan.</p>
<h2>2. Biaya: komisi bukan seluruh tagihan</h2>
<p>Lihat empat baris: komisi per kategori, biaya transaksi atau pembayaran, biaya ikut kampanye, dan kontribusi subsidi pengiriman. Kampanye yang menaikkan volume 30% tetapi menambah 8 poin biaya bisa tetap rugi pada margin tipis. Hitung di kalkulator laba sebelum mendaftar.</p>
<h2>3. Logistik: metrik adalah batas keras</h2>
<p>Tingkat kirim terlambat, tingkat tidak kirim, dan tingkat pembatalan diukur dan langsung mengalir ke poin penalti serta visibilitas pencarian. Gunakan program logistik platform bila tersedia: berbiaya, tetapi menghapus satu kelas penalti keterlambatan yang tak bisa Anda kendalikan.</p>
<h2>4. Poin dan pemulihan</h2>
<p>Poin menumpuk dari pemenuhan terlambat, pembatalan, klaim barang palsu, dan pelanggaran listing. Pemulihan tidak instan: biasanya butuh satu siklus bersih pengiriman tepat waktu. Rencanakan kapasitas agar promo tidak mendorong Anda melewati batas packing harian; ini penalti paling sering yang disebabkan sendiri.</p>
<h2>5. Garis yang tidak dilintasi</h2>
<ul>
<li>Menayangkan di kategori terbatas tanpa persetujuan.</li>
<li>Memakai gambar atau istilah merek penjual lain di judul.</li>
<li>Meminta pembeli membatalkan dan memesan ulang untuk menghindari metrik keterlambatan.</li>
<li>Mengirim produk pengganti saat stok habis.</li>
</ul>
`,
  "10": `
<p>Sebagian besar dasbor hanya dekorasi. Dasbor berguna menjawab pertanyaan yang akan Anda tindak lanjuti, dan tidak lebih. Lima kelompok metrik, tiga tingkat analisis, dan delapan angka per minggu cukup untuk mengelola toko.</p>
<h2>1. Lima kelompok, masing-masing satu tindakan</h2>
<table><tbody>
<tr><td>Kelompok</td><td>Metrik</td><td>Tindakan yang dipicu</td></tr>
<tr><td>Trafik</td><td>Tayangan, CTR</td><td>Sesuaikan kata kunci, gambar utama, tawaran</td></tr>
<tr><td>Konversi</td><td>Tingkat keranjang, konversi pesanan</td><td>Tulis ulang halaman, ulasan, harga</td></tr>
<tr><td>Keranjang</td><td>Nilai pesanan rata-rata, unit per pesanan</td><td>Bundel, penawaran ambang</td></tr>
<tr><td>Laba</td><td>Margin bersih per pesanan</td><td>Tetapkan ulang harga, negosiasi ongkir, potong pemborosan iklan</td></tr>
<tr><td>Kesehatan</td><td>Retur, kirim terlambat, cakupan stok</td><td>Perbaiki kualitas, sesuaikan kapasitas, isi ulang stok</td></tr>
</tbody></table>
<h2>2. Tiga tingkat: SKU, toko, kas</h2>
<p>Di tingkat SKU Anda memutuskan simpan, perbaiki, atau hentikan. Di tingkat toko, ke mana unit anggaran iklan berikutnya. Di tingkat kas, apakah pertumbuhan terjangkau: stok plus iklan plus jadwal pencairan platform adalah yang mematahkan penjual yang tumbuh, bukan margin.</p>
<h2>3. Dasbor mingguan delapan angka</h2>
<ul>
<li>Pendapatan, laba bersih, margin bersih</li>
<li>Tayangan, CTR</li>
<li>Tingkat konversi, nilai pesanan rata-rata</li>
<li>Hari cakupan stok</li>
</ul>
<p>Delapan angka, satu halaman, ditinjau pada hari yang sama tiap minggu. Bila sebuah angka bergerak, Anda harus bisa menyebut perubahan yang menyebabkannya; bila tidak, dasbor itu tidak mengukur keputusan Anda.</p>
<h2>4. Memakai alat tanpa membuangnya</h2>
<p>Ekspor data daripada membacanya di layar, simpan satu spreadsheet per kuartal, dan hubungkan tiap metrik dengan keputusan yang benar-benar diambil. Laporan yang tidak ditindaklanjuti adalah biaya, bukan aset.</p>
`,
};
