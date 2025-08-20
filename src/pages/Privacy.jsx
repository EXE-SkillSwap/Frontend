import React from "react";

const Privacy = () => {
  return (
    <div className="privacy-page mt-15">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl font-bold text-center mb-4">
            Chính Sách Bảo Mật
          </h1>
          <p className="text-xl text-center max-w-3xl mx-auto">
            Chúng tôi cam kết bảo vệ quyền riêng tư và thông tin cá nhân của bạn
            khi sử dụng SkillsSwap
          </p>
          <p className="text-center mt-4 text-blue-100">
            Cập nhật lần cuối: 20 tháng 8, 2025
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16">
        <div className="container mx-auto px-6 max-w-4xl">
          {/* 1. Giới thiệu */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              1. Giới Thiệu
            </h2>
            <div className="prose prose-lg text-gray-600">
              <p className="mb-4">
                SkillsSwap ("chúng tôi", "của chúng tôi") cam kết bảo vệ quyền
                riêng tư của bạn. Chính sách bảo mật này giải thích cách chúng
                tôi thu thập, sử dụng, tiết lộ và bảo vệ thông tin của bạn khi
                bạn sử dụng nền tảng SkillsSwap.
              </p>
              <p>
                Bằng việc sử dụng dịch vụ của chúng tôi, bạn đồng ý với việc thu
                thập và sử dụng thông tin theo chính sách này.
              </p>
            </div>
          </div>

          {/* 2. Thông tin chúng tôi thu thập */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              2. Thông Tin Chúng Tôi Thu Thập
            </h2>
            <div className="prose prose-lg text-gray-600">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                2.1. Thông tin bạn cung cấp trực tiếp
              </h3>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>Thông tin đăng ký: họ tên, địa chỉ email, mật khẩu</li>
                <li>
                  Thông tin hồ sơ: ảnh đại diện, mô tả bản thân, kỹ năng, sở
                  thích
                </li>
                <li>Thông tin liên hệ: số điện thoại, địa chỉ (tùy chọn)</li>
                <li>
                  Nội dung bạn tạo: bài viết, bình luận, tin nhắn, đánh giá
                </li>
                <li>
                  Thông tin thanh toán (nếu có): thông tin thẻ tín dụng, lịch sử
                  giao dịch
                </li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                2.2. Thông tin tự động thu thập
              </h3>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>
                  Thông tin thiết bị: loại thiết bị, hệ điều hành, trình duyệt
                </li>
                <li>
                  Thông tin sử dụng: thời gian truy cập, trang đã xem, tính năng
                  đã sử dụng
                </li>
                <li>Địa chỉ IP và dữ liệu vị trí (nếu được cho phép)</li>
                <li>Cookies và công nghệ theo dõi tương tự</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                2.3. Thông tin từ bên thứ ba
              </h3>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>
                  Thông tin từ mạng xã hội khi bạn đăng nhập qua Facebook,
                  Google
                </li>
                <li>Thông tin từ các đối tác tích hợp</li>
              </ul>
            </div>
          </div>

          {/* 3. Cách chúng tôi sử dụng thông tin */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              3. Cách Chúng Tôi Sử Dụng Thông Tin
            </h2>
            <div className="prose prose-lg text-gray-600">
              <p className="mb-4">Chúng tôi sử dụng thông tin của bạn để:</p>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                3.1. Cung cấp và cải thiện dịch vụ
              </h3>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>Tạo và quản lý tài khoản của bạn</li>
                <li>Kết nối bạn với những người dùng phù hợp</li>
                <li>Hiển thị nội dung và khuyến nghị cá nhân hóa</li>
                <li>Xử lý giao dịch và thanh toán</li>
                <li>Cung cấp hỗ trợ khách hàng</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                3.2. Giao tiếp
              </h3>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>Gửi thông báo về hoạt động tài khoản</li>
                <li>Thông báo về cập nhật dịch vụ</li>
                <li>Gửi newsletter và thông tin khuyến mãi (với sự đồng ý)</li>
                <li>Phản hồi yêu cầu hỗ trợ</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                3.3. An toàn và bảo mật
              </h3>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Phát hiện và ngăn chặn gian lận</li>
                <li>Bảo vệ chống lại hoạt động bất hợp pháp</li>
                <li>Thực thi điều khoản dịch vụ</li>
                <li>Giải quyết tranh chấp</li>
              </ul>
            </div>
          </div>

          {/* 4. Chia sẻ thông tin */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              4. Chia Sẻ Thông Tin
            </h2>
            <div className="prose prose-lg text-gray-600">
              <p className="mb-4">
                Chúng tôi không bán thông tin cá nhân của bạn. Chúng tôi chỉ
                chia sẻ thông tin trong các trường hợp sau:
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                4.1. Với sự đồng ý của bạn
              </h3>
              <p className="mb-4">
                Khi bạn cho phép chúng tôi chia sẻ thông tin với bên thứ ba cụ
                thể.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                4.2. Với những người dùng khác
              </h3>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>Thông tin hồ sơ công khai (tên, ảnh, kỹ năng)</li>
                <li>Nội dung bạn chia sẻ công khai</li>
                <li>Đánh giá và nhận xét</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                4.3. Với nhà cung cấp dịch vụ
              </h3>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>Nhà cung cấp hosting và lưu trữ dữ liệu</li>
                <li>Dịch vụ thanh toán</li>
                <li>Dịch vụ phân tích và marketing</li>
                <li>Hỗ trợ khách hàng</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                4.4. Theo yêu cầu pháp lý
              </h3>
              <p className="mb-4">
                Khi được yêu cầu bởi pháp luật, lệnh tòa án, hoặc cơ quan chức
                năng có thẩm quyền.
              </p>
            </div>
          </div>

          {/* 5. Bảo mật thông tin */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              5. Bảo Mật Thông Tin
            </h2>
            <div className="prose prose-lg text-gray-600">
              <p className="mb-4">
                Chúng tôi thực hiện các biện pháp bảo mật kỹ thuật và tổ chức để
                bảo vệ thông tin của bạn:
              </p>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>Mã hóa dữ liệu trong quá trình truyền tải (SSL/TLS)</li>
                <li>Mã hóa dữ liệu nhạy cảm trong cơ sở dữ liệu</li>
                <li>Kiểm soát truy cập nghiêm ngặt</li>
                <li>Giám sát bảo mật 24/7</li>
                <li>Đào tạo nhân viên về bảo mật thông tin</li>
                <li>Kiểm tra bảo mật định kỳ</li>
              </ul>
              <p>
                Tuy nhiên, không có phương thức truyền tải qua Internet hoặc lưu
                trữ điện tử nào là 100% an toàn. Chúng tôi không thể đảm bảo
                tuyệt đối về bảo mật.
              </p>
            </div>
          </div>

          {/* 6. Quyền của bạn */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              6. Quyền Của Bạn
            </h2>
            <div className="prose prose-lg text-gray-600">
              <p className="mb-4">
                Bạn có các quyền sau đối với thông tin cá nhân của mình:
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                6.1. Quyền truy cập và cập nhật
              </h3>
              <p className="mb-4">
                Bạn có thể xem và cập nhật thông tin cá nhân trong cài đặt tài
                khoản.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                6.2. Quyền xóa dữ liệu
              </h3>
              <p className="mb-4">
                Bạn có thể yêu cầu xóa tài khoản và dữ liệu cá nhân. Một số
                thông tin có thể được giữ lại theo yêu cầu pháp lý.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                6.3. Quyền hạn chế xử lý
              </h3>
              <p className="mb-4">
                Bạn có thể yêu cầu hạn chế việc xử lý thông tin cá nhân trong
                một số trường hợp nhất định.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                6.4. Quyền từ chối marketing
              </h3>
              <p className="mb-4">
                Bạn có thể hủy đăng ký nhận email marketing bất cứ lúc nào.
              </p>
            </div>
          </div>

          {/* 7. Cookies */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              7. Cookies và Công Nghệ Theo Dõi
            </h2>
            <div className="prose prose-lg text-gray-600">
              <p className="mb-4">
                Chúng tôi sử dụng cookies và công nghệ tương tự để:
              </p>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>Ghi nhớ thông tin đăng nhập</li>
                <li>Cá nhân hóa trải nghiệm người dùng</li>
                <li>Phân tích cách sử dụng website</li>
                <li>Cung cấp quảng cáo có liên quan</li>
              </ul>
              <p className="mb-4">
                Bạn có thể quản lý cookies thông qua cài đặt trình duyệt. Tuy
                nhiên, việc vô hiệu hóa cookies có thể ảnh hưởng đến chức năng
                của website.
              </p>
            </div>
          </div>

          {/* 8. Lưu trữ dữ liệu */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              8. Lưu Trữ Dữ Liệu
            </h2>
            <div className="prose prose-lg text-gray-600">
              <p className="mb-4">
                Chúng tôi lưu trữ thông tin cá nhân của bạn:
              </p>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>Trong thời gian bạn có tài khoản hoạt động</li>
                <li>
                  Thêm 2 năm sau khi tài khoản bị xóa (để giải quyết tranh chấp)
                </li>
                <li>Theo yêu cầu pháp lý cụ thể</li>
              </ul>
              <p>
                Dữ liệu được lưu trữ tại các trung tâm dữ liệu an toàn tại Việt
                Nam và Singapore.
              </p>
            </div>
          </div>

          {/* 9. Trẻ em */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              9. Quyền Riêng Tư Của Trẻ Em
            </h2>
            <div className="prose prose-lg text-gray-600">
              <p className="mb-4">
                Dịch vụ của chúng tôi không dành cho trẻ em dưới 16 tuổi. Chúng
                tôi không cố ý thu thập thông tin cá nhân từ trẻ em dưới 16
                tuổi.
              </p>
              <p>
                Nếu bạn là cha mẹ hoặc người giám hộ và biết rằng con em mình đã
                cung cấp thông tin cá nhân cho chúng tôi, vui lòng liên hệ để
                chúng tôi có thể xóa thông tin đó.
              </p>
            </div>
          </div>

          {/* 10. Thay đổi chính sách */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              10. Thay Đổi Chính Sách Bảo Mật
            </h2>
            <div className="prose prose-lg text-gray-600">
              <p className="mb-4">
                Chúng tôi có thể cập nhật Chính sách Bảo mật này theo thời gian.
                Khi có thay đổi quan trọng, chúng tôi sẽ thông báo qua:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Email đến địa chỉ đã đăng ký</li>
                <li>Thông báo trên website</li>
                <li>Tin nhắn trong ứng dụng</li>
              </ul>
            </div>
          </div>

          {/* Contact */}
          <div className="bg-gray-50 p-8 rounded-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Liên Hệ Về Quyền Riêng Tư
            </h2>
            <p className="text-gray-600 mb-4">
              Nếu bạn có bất kỳ câu hỏi nào về Chính sách Bảo mật này hoặc muốn
              thực hiện các quyền của mình, vui lòng liên hệ với chúng tôi:
            </p>
            <div className="space-y-2 text-gray-600">
              <p>
                <strong>Email:</strong> privacy@skillsswap.vn
              </p>
              <p>
                <strong>Điện thoại:</strong> +84 (0) 123 456 789
              </p>
              <p>
                <strong>Địa chỉ:</strong> Lô E2a-7, Đường D1, Long Thạnh Mỹ,
                Thành Phố Thủ Đức, TP.HCM
              </p>
              <p>
                <strong>Người phụ trách bảo vệ dữ liệu:</strong> Trưởng phòng An
                toàn Thông tin
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Privacy;
