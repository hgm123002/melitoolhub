// lib/articles-i18n/vi.ts
// Tiếng Việt — nội dung bài 1–10
import type { ArticleBodyPack } from "./types";

export const vi: ArticleBodyPack = {
  "1": `
<p>Phần lớn thất bại khi chọn sản phẩm không đến từ việc bỏ lỡ xu hướng, mà từ việc không kiểm tra trước khi bỏ tiền xem sản phẩm có chịu được bốn loại chi phí xuyên biên giới hay không: vận chuyển, hoàn hàng, quảng cáo và chứng nhận. Đây là bộ lọc dùng lại được, không phải danh sách ngành hàng đang hot.</p>
<h2>1. Bốn bộ lọc, chạy theo thứ tự</h2>
<p>Lợi nhuận gộp sau giá vốn đến kho, hoa hồng, chi phí xử lý đơn, quảng cáo và hoàn hàng. Trọng lượng thể tích so với trọng lượng thực. Hành vi hoàn hàng và hậu mãi. Và rào cản chứng nhận. Chạy tuần tự, hỏng bộ nào là loại sản phẩm đó. Xếp hạng bán cao không cứu được kinh tế đơn vị âm — bán nhiều hàng lỗ chỉ làm lỗ nhanh hơn.</p>
<h2>2. Biến "có vẻ làm được" thành ba con số</h2>
<p>Dựng mô hình trong <a href="/tools/product-analysis">công cụ phân tích sản phẩm</a>: giá mua, cước nhập, hoa hồng, phí xử lý và chi phí quảng cáo. Kết quả là lợi nhuận ròng mỗi đơn vị, biên ròng và sản lượng hòa vốn. Biên ròng cho biết chịu được bao nhiêu đợt giảm giá; điểm hòa vốn cho biết cần bao nhiêu traffic tự nhiên.</p>
<p>Sau đó kiểm tra nhu cầu trong <a href="/tools/keyword-lab">phòng thí nghiệm từ khóa</a>: có bao nhiêu cụm từ dài mang ý định mua rõ ràng, và tiêu đề còn bao nhiêu ký tự (Amazon 200, Mercado Libre 60, Shopee 255 — xác nhận trong trung tâm người bán). Thị trường không có đuôi dài thường không phải đại dương xanh, mà là thị trường không ai tìm. Cuối cùng đưa kích thước thật vào <a href="/tool/shipping-calculator">công cụ tính phí vận chuyển</a>: tính sai cước nhập là lỗ hổng lợi nhuận phổ biến nhất của người mới.</p>
<h2>3. Kiểm chứng từ khâu rẻ nhất</h2>
<ul>
<li><strong>Mô hình trước</strong> — không tốn tiền, loại phần lớn ứng viên trong mười phút.</li>
<li><strong>Sau đó là ý định tìm kiếm</strong> — mua, không phải tò mò.</li>
<li><strong>Rồi đến mẫu</strong> — mua một hai chiếc của đối thủ; bao bì, hướng dẫn và độ hoàn thiện thấy ngay.</li>
<li><strong>Tồn kho sau cùng</strong> — đơn đầu đủ một chu kỳ bổ hàng, rồi mở rộng bằng dữ liệu thật.</li>
</ul>
<h2>4. Lỗi lặp lại</h2>
<ul>
<li>So sánh sản phẩm bằng doanh thu thay vì biên ròng.</li>
<li>Bỏ qua trọng lượng thể tích cho đến khi hóa đơn cước đến.</li>
<li>Coi chứng nhận là giấy tờ, không phải một dòng chi phí.</li>
</ul>
`,
  "2": `
<p>Tuân thủ ở châu Âu và Mỹ không phải một bộ hồ sơ, mà là ba câu hỏi tách biệt: ai thu thuế, ai chứng nhận sản phẩm, và ai chịu trách nhiệm pháp lý khi có sự cố. Người gộp thành một thủ tục thường kẹt ở cổng ngành hàng, không phải ở hải quan.</p>
<h2>1. Thuế: ai thu, ai kê khai</h2>
<p>Ở EU, VAT bán hàng từ xa thường do sàn thu với giao dịch B2C đến ngưỡng của nước đến, và do bạn thu khi vượt ngưỡng hoặc bán qua website riêng. IOSS áp dụng cho kiện dưới 150 €; trên mức đó là nhập khẩu thông thường. Ở Mỹ thuế theo bang và thu qua nền tảng đã là chuẩn. Nguyên tắc thực hành: số đăng ký, kỳ kê khai và thời hạn lưu trữ để một chỗ, và đừng cho rằng sàn đã kê khai điều bạn chưa kiểm tra.</p>
<h2>2. Chứng nhận không phải một tờ giấy</h2>
<p>CE bao gồm một họ chỉ thị — đồ chơi, điện tử, tương thích điện từ, máy móc, thiết bị bảo hộ — mỗi chỉ thị có phạm vi thử nghiệm riêng. FCC áp dụng cho thiết bị vô tuyến và điện tử ở Mỹ; FDA liên quan đến tiếp xúc thực phẩm, mỹ phẩm và một số công bố. GPSR bổ sung truy xuất nguồn gốc và người chịu trách nhiệm tại EU cho nhiều nhóm hàng; sản phẩm trẻ em ở Mỹ cần CPC. Cái bẫy là mua "chứng nhận CE" rẻ cho sản phẩm chưa từng được thử theo chỉ thị đó.</p>
<h2>3. Lưu hồ sơ trước khi đăng bán</h2>
<ul>
<li>Báo cáo thử nghiệm thấy rõ chỉ thị và tiêu chuẩn.</li>
<li>Tuyên bố hợp quy có ký và ngày.</li>
<li>Thiết kế nhãn: nhà nhập khẩu, địa chỉ, lô, cảnh báo bằng ngôn ngữ địa phương.</li>
<li>Bảng dữ liệu an toàn cho pin, chất lỏng và bình xịt.</li>
<li>Giấy ủy quyền người chịu trách nhiệm khi luật yêu cầu.</li>
</ul>
<h2>4. Cách người bán bị chặn</h2>
<p>Nộp báo cáo Trung Quốc dẫn tiêu chuẩn đã bị thay thế; nhãn chỉ có nhà sản xuất mà không có nhà nhập khẩu; gửi combo mà một linh kiện làm đổi phân loại sản phẩm. Lo hồ sơ trước container đầu tiên, không phải sau khiếu nại đầu tiên.</p>
`,
  "3": `
<p>Cước vận chuyển không phải một khoản mà là bốn: xếp dỡ đầu nguồn, hải quan và thuế, lưu kho, và chặng cuối. Mỗi phần tính theo cơ sở khác nhau, nên phương thức "rẻ hơn" có thể đắt hơn mỗi đơn vị khi cộng ba phần còn lại.</p>
<h2>1. Bốn chặng, bốn cách tính</h2>
<p>Đường biển tính theo CBM kèm mức tối thiểu, đường hàng không theo trọng lượng tính cước (thể tích = dài × rộng × cao ÷ 6000 ở phần lớn hãng), chuyển phát nhanh theo trọng lượng thực với biểu giá theo vùng, chặng cuối theo bậc trọng lượng và khoảng cách. Thuế phụ thuộc mã HS và trị giá khai báo, lưu kho tính theo pallet-ngày hoặc mét khối mỗi tháng. Chỉ so sánh cước chính là so sánh một phần tư hóa đơn.</p>
<h2>2. Chọn phương thức</h2>
<table><tbody>
<tr><td>Phương thức</td><td>Phù hợp</td><td>Lưu ý</td></tr>
<tr><td>Biển LCL</td><td>Bán ổn định, 100–500 kg</td><td>Chậm gom hàng, tắc cảng</td></tr>
<tr><td>Biển FCL</td><td>Sản lượng dự đoán được, giá trị đơn vị thấp</td><td>Vốn bị giữ 40+ ngày</td></tr>
<tr><td>Hàng không</td><td>Thử SKU mới, bù thiếu hàng</td><td>Trọng lượng thể tích phạt hàng cồng kềnh nhẹ</td></tr>
<tr><td>Kho nước ngoài</td><td>Thị trường đòi giao nhanh</td><td>Phí lưu kho và hàng chậm luân chuyển</td></tr>
</tbody></table>
<h2>3. Bổ hàng là một phép tính</h2>
<p>Tồn an toàn = doanh số ngày trung bình × (thời gian đặt hàng + kỳ xem xét) × hệ số phục vụ, trừ lượng đang trên đường. Thời gian đặt hàng đo từ lúc thanh toán đến khi sẵn sàng lên kệ, không phải từ lúc khởi hành đến khi tới: đó là nơi sinh ra thiếu hàng. Xem lại hàng tháng; "cảm giác đủ" là cách vừa thiếu hàng vừa tồn chết trong cùng một quý.</p>
<h2>4. Lỗi thường gặp</h2>
<ul>
<li>Báo giá theo kg mà bỏ mức tối thiểu mỗi lô.</li>
<li>Quên rằng ở một số thị trường thuế tính trên trị giá đã gồm cước.</li>
<li>Bổ hàng theo cảm tính khi chạy khuyến mãi thay vì theo dự báo.</li>
</ul>
`,
  "4": `
<p>Vấn đề vận hành trông như "traffic đắt", nhưng traffic hiếm khi là nguyên nhân. Đi qua phễu theo thứ tự — hiển thị, nhấp, giỏ hàng, đơn, mua lại — và sửa tầng rơi mạnh nhất so với chuẩn ngành hàng của chính bạn, không so với ảnh chụp màn hình của người khác.</p>
<h2>1. Xác định tầng rò rỉ</h2>
<p>Hiển thị ít: từ khóa, vị trí ngành hàng hoặc độ phủ quảng cáo. Hiển thị tốt mà nhấp yếu: ảnh chính, tiêu đề và cách neo giá. Nhấp không thành giỏ: trang chi tiết, đánh giá và cam kết giao hàng. Giỏ bị bỏ: ma sát thanh toán, phương thức thanh toán hoặc chi phí bất ngờ ở bước cuối.</p>
<h2>2. Tiêu đề và ảnh chính: mua cú nhấp</h2>
<p>Tiêu đề thắng khi khớp với thứ người ta gõ, theo đúng thứ tự: từ khóa chính, rồi điểm khác biệt, rồi kích thước hoặc số lượng. Đặt điểm khác biệt so với chín kết quả còn lại trong 60 ký tự đầu, vì điện thoại chỉ hiển thị chừng đó. Ảnh chính phải sống được ở dạng thu nhỏ: một sản phẩm, tương phản cao, không có bức tường chữ, và có gợi ý tỉ lệ trả lời "to cỡ nào".</p>
<h2>3. Trang chi tiết và đánh giá: mua giỏ hàng</h2>
<p>Trả lời bốn câu hỏi khiến người ta dừng mua: có vừa không, có hợp với thứ tôi đang có không, giao bao lâu, và hỏng thì sao. Thêm khối so sánh với lựa chọn thay thế rõ ràng, và đặt phí giao cùng chính sách đổi trả phía trên màn hình đầu. Đánh giá không phải điểm số mà là nguồn từ khóa: những cụm từ người mua lặp lại chính là điều bạn phải trả lời.</p>
<h2>4. Mua lại phải được thiết kế</h2>
<p>Kèm thẻ giới thiệu hàng tiêu hao hoặc phụ kiện, đặt chu kỳ nhắc cho hàng mua định kỳ, và để việc đặt lại chỉ một cú nhấp. Giữ chân rẻ hơn thu hút, nhưng chỉ khi cơ chế được dựng lên.</p>
<h2>5. Lỗi lặp lại</h2>
<ul>
<li>Tăng ngân sách quảng cáo khi vấn đề thật là CTR.</li>
<li>Viết lại tiêu đề mà không kiểm tra hiện đang xếp hạng với từ nào.</li>
<li>Coi đánh giá là quản trị danh tiếng thay vì nghiên cứu sản phẩm.</li>
</ul>
`,
  "5": `
<p>Danh sách công cụ dễ viết, khó dùng. Danh sách này xếp theo quyết định, không theo nhà cung cấp: mỗi khối nêu câu hỏi, công cụ trên trang này trả lời nó, và dữ liệu bạn phải tự mang đến.</p>
<h2>1. Chọn hàng: SKU này có lãi không</h2>
<p>Dùng <a href="/tools/product-analysis">công cụ phân tích sản phẩm</a> cho kinh tế đơn vị và <a href="/tool/profit-calculator">công cụ tính lợi nhuận</a> khi cần bóc tách phí theo đơn. Cả hai đều không tự bịa giá mua hay chi phí quảng cáo của bạn — những số đó phải từ báo giá thật.</p>
<h2>2. Từ khóa và trang bán: được tìm thấy và được nhấp</h2>
<p><a href="/tools/keyword-lab">Phòng thí nghiệm từ khóa</a> mở rộng từ hạt giống thành cụm dài, đo độ phủ tiêu đề và xuất CSV. Kết hợp với <a href="/tool/listing-optimizer">công cụ tối ưu trang bán</a> để chấm tiêu đề theo giới hạn ký tự và độ phủ từ trước khi đăng. Giới hạn: Amazon 200, Mercado Libre 60, Shopee 255 — kiểm tra lại trong trung tâm người bán vì có thay đổi.</p>
<h2>3. Chi phí và giá: đưa tỷ giá vào</h2>
<p><a href="/tool/rate-converter">Công cụ quy đổi tiền tệ</a> lấy tỷ giá trực tiếp và công cụ tính lợi nhuận cộng phí lên trên. Đừng định giá bằng tỷ giá bạn nhớ: hai phần trăm trên biên mỏng là toàn bộ lợi nhuận.</p>
<h2>4. Vận chuyển: tính đúng trọng lượng thể tích</h2>
<p><a href="/tool/shipping-calculator">Công cụ tính phí vận chuyển</a> so sánh trọng lượng thể tích và thực tế, cho biết bạn bị tính theo loại nào. Hàng cồng kềnh nhẹ gần như luôn bị tính theo thể tích.</p>
<h2>5. Tuân thủ: lưu hồ sơ trước khi đăng</h2>
<p><a href="/compliance">Thư viện tuân thủ</a> liệt kê giấy tờ từng thị trường yêu cầu. Dùng như danh sách kiểm trước lô hàng đầu tiên, không phải sau lần bị gỡ đầu tiên.</p>
<h2>6. Ba nguyên tắc khi dùng bất kỳ công cụ nào</h2>
<ul>
<li>Nhập số thật, nếu không sẽ nhận về hư cấu: công cụ với số đoán là máy tạo số ngẫu nhiên.</li>
<li>Một công cụ một quyết định. Không gọi tên được quyết định thì không cần công cụ đó.</li>
<li>Lưu kết quả. Một CSV từ khóa hay mô hình đã lưu có giá trị hơn ảnh chụp không chạy lại được.</li>
</ul>
`,
  "6": `
<p>Mỹ Latinh không phải một thị trường. Mexico và Brazil khác nhau về ngôn ngữ, mã số thuế, thói quen thanh toán và chi phí logistics, và một sản phẩm thành công ở nước này có thể thất bại ở nước kia vì lý do không liên quan đến nhu cầu.</p>
<h2>1. Mexico và Brazil là hai việc kinh doanh khác nhau</h2>
<p>Mexico dùng tiếng Tây Ban Nha, đăng ký RFC và mạng logistics khả thi với người bán xuyên biên giới có kho ở Mỹ hoặc sát biên. Brazil dùng tiếng Bồ Đào Nha, cấu trúc thuế phức tạp, chi phí nhập cao hơn và thông quan lâu hơn — điều này đẩy về tồn kho nội địa hoặc chương trình fulfillment của sàn. Ngân sách và tiến độ phải lập theo từng nước, không theo khu vực.</p>
<h2>2. Tiêu đề 60 ký tự thay đổi logic chọn hàng</h2>
<p>Giới hạn của Mercado Libre buộc phải dùng ký tự cho từ khóa tìm kiếm, không cho tính từ marketing. Thực tế điều này có lợi cho sản phẩm mà giá trị nói được trong bốn năm từ, và bất lợi cho combo cần giải thích. Thử tiêu đề ở 60 ký tự trước khi chốt tồn kho: nếu không chứa nổi từ chính cộng một điểm khác biệt, sản phẩm sẽ khó được tìm thấy.</p>
<h2>3. Hướng đáng theo dõi và cái bẫy</h2>
<ul>
<li><strong>Phụ kiện điện thoại</strong> — nhu cầu ổn định nhưng cạnh tranh giá gay gắt và số model tương thích tăng mãi.</li>
<li><strong>Sắp xếp nhà cửa</strong> — cồng kềnh, trọng lượng thể tích quyết định biên; thiết kế gấp gọn giúp ích.</li>
<li><strong>Làm đẹp và chăm sóc cá nhân</strong> — mua lại cao nhưng đăng ký và nhãn mác nghiêm ngặt.</li>
<li><strong>Phụ tùng ô tô</strong> — dữ liệu tương thích là hào cạnh tranh; sai tương thích tạo hàng trả không bán lại được.</li>
</ul>
<h2>4. Định giá có tính trả góp</h2>
<p>Trả góp 0% là kỳ vọng mặc định ở cả hai thị trường và phí do người bán chịu. Đưa chi phí đó vào giá thay vì phát hiện ở lần đối soát đầu. Kiểm tra cấu trúc trả góp và hoa hồng hiện hành trong trung tâm người bán: thay đổi theo ngành hàng và chiến dịch.</p>
<h2>5. Lỗi thường gặp</h2>
<p>Khởi động Brazil bằng cẩm nang Mexico; định giá thiếu phí trả góp; cho rằng tiêu đề 60 ký tự chứa được combo; gửi hàng mà không kiểm tra phụ phí thuế hay logistics của bang đến.</p>
`,
  "7": `
<p>Bán live không phải nói nhanh. Đó là phễu với bốn con số theo thứ tự: tỉ lệ vào phòng, thời gian xem, nhấp sản phẩm và chuyển đổi. Sửa theo đúng thứ tự đó thì phòng lớn dần; bỏ qua một cái là traffic bị lãng phí.</p>
<h2>1. Trước khi lên sóng: dựng thang sản phẩm</h2>
<p>Thiết kế một thang, không phải danh sách. Bắt đầu bằng món giá thấp giải quyết vấn đề rõ ràng và mang về đơn đầu, rồi đến sản phẩm chính có biên thật, rồi combo hoặc phụ kiện để nâng giá trị giỏ. Mỗi sản phẩm cần một màn trình diễn hiểu được mà không cần lời: khoảnh khắc người xem hiểu lợi ích chỉ từ video là đã xong nửa chặng bán.</p>
<h2>2. Vòng kịch bản dùng lại được</h2>
<p>Khoảng năm phút một lần: móc (giải quyết vấn đề gì), trình diễn (cho thấy nó chạy), bằng chứng (đơn, đánh giá, so sánh), xử lý phản đối (giá, kích thước, giao hàng), kêu gọi hành động (nút nào, tiếp theo ra sao). Lặp lại với sản phẩm khác. Đừng đọc thông số — hãy cho thấy kết quả.</p>
<h2>3. Đánh giá lại bằng bốn con số</h2>
<ul>
<li><strong>Tỉ lệ vào</strong> — ảnh bìa và ba giây đầu có ổn không.</li>
<li><strong>Thời gian xem trung bình</strong> — nhịp vòng lặp có đúng hay người xem rời đi trong phút đầu.</li>
<li><strong>Nhấp sản phẩm</strong> — phần trình diễn có nối với sản phẩm ghim không.</li>
<li><strong>Chuyển đổi</strong> — giá, tồn kho và cam kết giao có đáng tin không.</li>
</ul>
<h2>4. Nối nội dung với kệ hàng</h2>
<p>Đoạn cắt từ buổi live thành video ngắn đổ về trang sản phẩm; trang sản phẩm lại cấp đánh giá và câu hỏi cho buổi sau. Coi phòng live, clip và trang bán là một hệ thống, không phải ba kênh.</p>
<h2>5. Lỗi thường gặp</h2>
<p>Mở bằng sản phẩm đắt nhất; trình diễn tính năng thay vì kết quả; live hai tiếng không đổi sản phẩm; đánh giá buổi bằng doanh thu thay vì con số phễu đã gãy.</p>
`,
  "8": `
<p>Kho nước ngoài không phải kho, mà là bộ tăng tốc giao hàng kèm hóa đơn thuê. Quyết định là một phép tính về vòng quay, không phải mong muốn có huy hiệu giao nhanh.</p>
<h2>1. Ba mô hình, ba cấu trúc chi phí</h2>
<p>Fulfillment của sàn (FBA và tương đương) gộp lưu kho, đóng gói và chăm sóc khách vào một mức phí và cho huy hiệu. Kho bên thứ ba tính lưu kho theo pallet hoặc mét khối cộng phí xử lý mỗi đơn, và linh hoạt hơn. Kho tự vận hành chỉ hợp lý khi sản lượng lớn vì nhân công và hệ thống là chi phí cố định. So sánh theo từng đơn với kích thước và trọng lượng thật, không so với giá mét khối trên quảng cáo.</p>
<h2>2. Nhập kho: chặn lỗi trước khi gửi</h2>
<p>Mỗi lần nhập cần lịch hẹn, đúng quy cách nhãn thùng và pallet, và nhãn đơn vị như FNSKU. Ba lỗi đắt nhất: gửi sai mã kho, dán nhãn thùng đúng nhưng đơn vị không có nhãn, và đến mà không có lịch hẹn. Kiểm lại quy cách trước khi container rời đi: sửa khi đã đến đắt hơn cả cước.</p>
<h2>3. Tồn kho: ba con số</h2>
<ul>
<li><strong>Số ngày phủ hàng</strong> — có sẵn cộng đang trên đường chia doanh số mỗi ngày.</li>
<li><strong>Tỉ lệ bán ra trong 30 ngày đầu</strong> — bài kiểm tra trung thực xem SKU có xứng chỗ không.</li>
<li><strong>Chi phí lưu kho trên doanh thu</strong> — con số ăn mòn biên một cách âm thầm.</li>
</ul>
<h2>4. Chặng cuối: chọn theo bậc trọng lượng</h2>
<p>Đơn vị vận chuyển tính theo bậc, và lựa chọn rẻ nhất đổi ở mỗi mốc. Lập bảng ba bậc chính của bạn với ba hãng và tính lại mỗi quý; một hãng cho tất cả thì tiện và đắt.</p>
<h2>5. Thứ không nên đưa vào kho trước</h2>
<p>Hàng mùa vụ quay chậm, hàng dễ vỡ có tỉ lệ trả cao, hàng hạn ngắn, và bất cứ thứ gì chưa chứng minh được nhu cầu. Chứng minh SKU bằng đường bay trước, rồi mới chuyển sang tồn kho.</p>
`,
  "9": `
<p>Shopee và Lazada nhìn ngoài giống nhau nhưng vận hành khác nhau: hồ sơ đăng ký, cấu trúc phí, chương trình logistics và hệ thống điểm phạt mỗi bên một logic. Xem biểu phí hiện hành trong trung tâm người bán — ở đây nói về cấu trúc, thứ thay đổi ít hơn nhiều so với con số.</p>
<h2>1. Đăng ký: chuẩn bị hồ sơ trước khi nộp</h2>
<p>Dự trù giấy phép kinh doanh, giấy tờ người đại diện pháp luật, tài khoản ngân hàng đứng tên pháp nhân và giấy phép theo ngành cho mỹ phẩm, thực phẩm, điện tử và hàng trẻ em. Hồ sơ hay kẹt ở chi tiết: tên không khớp giữa giấy phép và ngân hàng, bản scan mờ, hoặc ngành cần thêm thư ủy quyền.</p>
<h2>2. Phí: hoa hồng không phải cả hóa đơn</h2>
<p>Nhìn bốn dòng: hoa hồng theo ngành, phí giao dịch hoặc thanh toán, chi phí tham gia chiến dịch và phần đóng góp trợ giá vận chuyển. Một chiến dịch tăng 30% sản lượng nhưng thêm 8 điểm phí vẫn có thể lỗ với biên mỏng. Tính trong công cụ lợi nhuận trước khi đăng ký.</p>
<h2>3. Logistics: chỉ số là ràng buộc cứng</h2>
<p>Tỉ lệ giao muộn, tỉ lệ không giao và tỉ lệ hủy đều được đo và ảnh hưởng trực tiếp đến điểm phạt và hiển thị tìm kiếm. Dùng chương trình logistics của sàn khi có: tốn tiền nhưng loại bỏ một nhóm phạt chậm trễ mà bạn không kiểm soát được.</p>
<h2>4. Điểm và phục hồi</h2>
<p>Điểm tích từ giao muộn, hủy đơn, bị báo hàng giả và vi phạm trang bán. Phục hồi không tức thì: thường cần một chu kỳ giao đúng hạn sạch. Hoạch định năng lực để khuyến mãi không đẩy bạn vượt hạn đóng gói mỗi ngày; đây là hình phạt tự gây phổ biến nhất.</p>
<h2>5. Những vạch không được vượt</h2>
<ul>
<li>Đăng hàng trong ngành hạn chế khi chưa được duyệt.</li>
<li>Dùng ảnh hoặc từ khóa thương hiệu của người bán khác trong tiêu đề.</li>
<li>Đề nghị người mua hủy rồi đặt lại để né chỉ số giao muộn.</li>
<li>Gửi hàng thay thế khi hết tồn.</li>
</ul>
`,
  "10": `
<p>Phần lớn dashboard chỉ để trang trí. Một dashboard hữu ích trả lời câu hỏi bạn sắp hành động, và không gì khác. Năm nhóm chỉ số, ba tầng phân tích và tám con số mỗi tuần là đủ để vận hành một cửa hàng.</p>
<h2>1. Năm nhóm, mỗi nhóm một hành động</h2>
<table><tbody>
<tr><td>Nhóm</td><td>Chỉ số</td><td>Hành động kéo theo</td></tr>
<tr><td>Traffic</td><td>Hiển thị, CTR</td><td>Điều chỉnh từ khóa, ảnh chính, giá thầu</td></tr>
<tr><td>Chuyển đổi</td><td>Tỉ lệ giỏ, chuyển đổi đơn</td><td>Viết lại trang, đánh giá, giá</td></tr>
<tr><td>Giỏ hàng</td><td>Giá trị đơn trung bình, số món mỗi đơn</td><td>Combo, ưu đãi theo ngưỡng</td></tr>
<tr><td>Lợi nhuận</td><td>Biên ròng mỗi đơn</td><td>Định giá lại, đàm phán cước, cắt lãng phí quảng cáo</td></tr>
<tr><td>Sức khỏe</td><td>Hoàn hàng, giao muộn, số ngày phủ tồn</td><td>Sửa chất lượng, chỉnh năng lực, bổ hàng</td></tr>
</tbody></table>
<h2>2. Ba tầng: SKU, cửa hàng, dòng tiền</h2>
<p>Ở tầng SKU bạn quyết giữ, sửa hay bỏ. Ở tầng cửa hàng, đơn vị ngân sách quảng cáo tiếp theo đi đâu. Ở tầng dòng tiền, tăng trưởng có kham được không: tồn kho cộng quảng cáo cộng lịch giải ngân của sàn là thứ làm gãy người bán đang tăng trưởng, không phải biên lợi nhuận.</p>
<h2>3. Dashboard tuần tám con số</h2>
<ul>
<li>Doanh thu, lợi nhuận ròng, biên ròng</li>
<li>Hiển thị, CTR</li>
<li>Tỉ lệ chuyển đổi, giá trị đơn trung bình</li>
<li>Số ngày phủ tồn kho</li>
</ul>
<p>Tám con số, một trang, xem vào cùng một ngày mỗi tuần. Nếu một con số dịch chuyển, bạn phải gọi tên thay đổi của mình đã gây ra nó; nếu không gọi được, dashboard đó không đo quyết định của bạn.</p>
<h2>4. Dùng công cụ mà không lãng phí</h2>
<p>Xuất dữ liệu thay vì đọc trên màn hình, giữ một bảng tính mỗi quý, và nối từng chỉ số với một quyết định bạn thực sự đã ra. Báo cáo không ai hành động là chi phí, không phải tài sản.</p>
`,
};
