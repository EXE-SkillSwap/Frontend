import React from "react";

const Terms = () => {
  return (
    <div className="terms-page">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16 mt-15">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl font-bold text-center mb-4">
            Điều Khoản Dịch Vụ
          </h1>
          <p className="text-xl text-center max-w-3xl mx-auto">
            Vui lòng đọc kỹ các điều khoản và điều kiện sử dụng dịch vụ
            SkillsSwap
          </p>
          <p className="text-center mt-4 text-blue-100">
            Cập nhật lần cuối: 20 tháng 8, 2025
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16">
        <div className="container mx-auto px-6 max-w-4xl">
          {/* 1. Chấp nhận điều khoản */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              1. Chấp Nhận Điều Khoản
            </h2>
            <div className="prose prose-lg text-gray-600">
              <p className="mb-4">
                Bằng việc truy cập và sử dụng nền tảng SkillsSwap, bạn đồng ý
                tuân thủ và bị ràng buộc bởi các Điều khoản Dịch vụ này. Nếu bạn
                không đồng ý với bất kỳ phần nào của các điều khoản này, vui
                lòng không sử dụng dịch vụ của chúng tôi.
              </p>
              <p>
                Chúng tôi có quyền thay đổi, sửa đổi hoặc cập nhật các điều
                khoản này bất cứ lúc nào mà không cần thông báo trước. Việc tiếp
                tục sử dụng dịch vụ sau khi có thay đổi có nghĩa là bạn chấp
                nhận các điều khoản mới.
              </p>
            </div>
          </div>

          {/* 2. Mô tả dịch vụ */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              2. Mô Tả Dịch Vụ
            </h2>
            <div className="prose prose-lg text-gray-600">
              <p className="mb-4">
                SkillsSwap là nền tảng trực tuyến cho phép người dùng:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Chia sẻ và trao đổi kỹ năng với những người dùng khác</li>
                <li>Tìm kiếm và học hỏi các kỹ năng mới</li>
                <li>Tạo hồ sơ cá nhân và hiển thị kỹ năng của mình</li>
                <li>Kết nối với cộng đồng học tập và phát triển</li>
                <li>
                  Tham gia các buổi trao đổi kỹ năng trực tuyến hoặc offline
                </li>
              </ul>
              <p>
                Chúng tôi không đảm bảo chất lượng hoặc độ chính xác của nội
                dung do người dùng cung cấp.
              </p>
            </div>
          </div>

          {/* 3. Đăng ký và tài khoản */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              3. Đăng Ký và Tài Khoản
            </h2>
            <div className="prose prose-lg text-gray-600">
              <p className="mb-4">
                Để sử dụng đầy đủ các tính năng của SkillsSwap, bạn cần:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>
                  Đủ 16 tuổi trở lên hoặc có sự đồng ý của cha mẹ/người giám hộ
                </li>
                <li>Cung cấp thông tin chính xác và đầy đủ khi đăng ký</li>
                <li>Bảo mật thông tin đăng nhập của bạn</li>
                <li>
                  Chịu trách nhiệm cho mọi hoạt động diễn ra trong tài khoản của
                  bạn
                </li>
                <li>
                  Thông báo ngay cho chúng tôi nếu phát hiện việc sử dụng trái
                  phép tài khoản
                </li>
              </ul>
              <p>
                Bạn có thể hủy tài khoản bất cứ lúc nào bằng cách liên hệ với
                chúng tôi hoặc sử dụng tính năng xóa tài khoản trong cài đặt.
              </p>
            </div>
          </div>

          {/* 4. Quy định sử dụng */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              4. Quy Định Sử Dụng
            </h2>
            <div className="prose prose-lg text-gray-600">
              <p className="mb-4">Khi sử dụng SkillsSwap, bạn đồng ý KHÔNG:</p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>
                  Đăng tải nội dung vi phạm pháp luật, có tính chất khiêu dâm,
                  bạo lực hoặc phân biệt đối xử
                </li>
                <li>
                  Sử dụng dịch vụ cho mục đích thương mại mà không có sự cho
                  phép
                </li>
                <li>Quấy rối, đe dọa hoặc làm tổn hại đến người dùng khác</li>
                <li>Giả mạo danh tính hoặc cung cấp thông tin sai lệch</li>
                <li>Spam, gửi tin nhắn rác hoặc quảng cáo không mong muốn</li>
                <li>
                  Cố gắng truy cập trái phép vào hệ thống hoặc dữ liệu của người
                  khác
                </li>
                <li>
                  Sử dụng bot, script hoặc các công cụ tự động để thao tác với
                  nền tảng
                </li>
              </ul>
            </div>
          </div>

          {/* 5. Nội dung người dùng */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              5. Nội Dung Người Dùng
            </h2>
            <div className="prose prose-lg text-gray-600">
              <p className="mb-4">
                Bạn giữ quyền sở hữu đối với nội dung mà bạn đăng tải lên
                SkillsSwap. Tuy nhiên, bằng việc đăng tải, bạn cấp cho chúng tôi
                giấy phép không độc quyền, miễn phí để:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>
                  Hiển thị, phân phối và quảng bá nội dung của bạn trên nền tảng
                </li>
                <li>Sửa đổi và định dạng lại nội dung cho mục đích hiển thị</li>
                <li>Tạo các bản sao lưu và lưu trữ nội dung</li>
              </ul>
              <p>
                Chúng tôi có quyền xóa bất kỳ nội dung nào vi phạm điều khoản
                này hoặc chính sách cộng đồng của chúng tôi.
              </p>
            </div>
          </div>

          {/* 6. Bảo mật và quyền riêng tư */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              6. Bảo Mật và Quyền Riêng Tư
            </h2>
            <div className="prose prose-lg text-gray-600">
              <p className="mb-4">
                Việc thu thập, sử dụng và bảo vệ thông tin cá nhân của bạn được
                quy định trong Chính sách Bảo mật riêng biệt. Bằng việc sử dụng
                dịch vụ, bạn đồng ý với việc thu thập và sử dụng thông tin này
                theo chính sách đó.
              </p>
              <p>
                Chúng tôi cam kết bảo vệ thông tin cá nhân của bạn và chỉ chia
                sẻ với bên thứ ba khi có sự đồng ý của bạn hoặc khi được yêu cầu
                bởi pháp luật.
              </p>
            </div>
          </div>

          {/* 7. Thanh toán và phí */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              7. Thanh Toán và Phí
            </h2>
            <div className="prose prose-lg text-gray-600">
              <p className="mb-4">
                Hiện tại, SkillsSwap cung cấp dịch vụ cơ bản miễn phí. Chúng tôi
                có thể giới thiệu các tính năng cao cấp có phí trong tương lai.
              </p>
              <p className="mb-4">Nếu có phí dịch vụ:</p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>
                  Tất cả phí sẽ được thông báo rõ ràng trước khi thanh toán
                </li>
                <li>
                  Thanh toán được xử lý thông qua các cổng thanh toán an toàn
                </li>
                <li>
                  Không hoàn tiền sau khi đã sử dụng dịch vụ, trừ trường hợp đặc
                  biệt
                </li>
              </ul>
            </div>
          </div>

          {/* 8. Trách nhiệm và giới hạn */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              8. Trách Nhiệm và Giới Hạn
            </h2>
            <div className="prose prose-lg text-gray-600">
              <p className="mb-4">
                SkillsSwap được cung cấp "như hiện tại" mà không có bất kỳ bảo
                đảm nào. Chúng tôi không chịu trách nhiệm cho:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>
                  Thiệt hại trực tiếp hoặc gián tiếp từ việc sử dụng dịch vụ
                </li>
                <li>
                  Chất lượng hoặc độ chính xác của nội dung do người dùng cung
                  cấp
                </li>
                <li>Các vấn đề phát sinh từ giao dịch giữa người dùng</li>
                <li>Mất mát dữ liệu hoặc gián đoạn dịch vụ</li>
              </ul>
              <p>
                Trách nhiệm tối đa của chúng tôi không vượt quá số tiền bạn đã
                thanh toán cho dịch vụ trong 12 tháng qua.
              </p>
            </div>
          </div>

          {/* 9. Chấm dứt dịch vụ */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              9. Chấm Dứt Dịch Vụ
            </h2>
            <div className="prose prose-lg text-gray-600">
              <p className="mb-4">
                Chúng tôi có quyền tạm ngưng hoặc chấm dứt tài khoản của bạn
                nếu:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Vi phạm bất kỳ điều khoản nào trong thỏa thuận này</li>
                <li>Sử dụng dịch vụ một cách bất hợp pháp hoặc có hại</li>
                <li>Không hoạt động trong thời gian dài (hơn 2 năm)</li>
              </ul>
              <p>
                Khi tài khoản bị chấm dứt, bạn sẽ mất quyền truy cập vào tất cả
                dữ liệu và nội dung trong tài khoản.
              </p>
            </div>
          </div>

          {/* 10. Pháp luật áp dụng */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              10. Pháp Luật Áp Dụng
            </h2>
            <div className="prose prose-lg text-gray-600">
              <p className="mb-4">
                Các Điều khoản Dịch vụ này được điều chỉnh bởi pháp luật Việt
                Nam. Mọi tranh chấp phát sinh sẽ được giải quyết tại các tòa án
                có thẩm quyền tại Việt Nam.
              </p>
              <p>
                Nếu bất kỳ điều khoản nào trong thỏa thuận này bị coi là không
                hợp lệ, các điều khoản còn lại vẫn có hiệu lực.
              </p>
            </div>
          </div>

          {/* Contact */}
          <div className="bg-gray-50 p-8 rounded-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Liên Hệ</h2>
            <p className="text-gray-600 mb-4">
              Nếu bạn có bất kỳ câu hỏi nào về Điều khoản Dịch vụ này, vui lòng
              liên hệ với chúng tôi:
            </p>
            <div className="space-y-2 text-gray-600">
              <p>
                <strong>Email:</strong> admin@skillsswap.io.vn
              </p>
              <p>
                <strong>Điện thoại:</strong> +84 077712345
              </p>
              <p>
                <strong>Địa chỉ:</strong>123 Đường Giáo Dục, Thành Phố Học Tập
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Terms;
