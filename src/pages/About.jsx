import { projectTeam } from "@/data/projectTeam";
import React from "react";

const About = () => {
  return (
    <div className="about-page mt-15">
      {/* Hero Section */}
      <section className="hero-section bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-6">Về Chúng Tôi</h1>
          <p className="text-xl max-w-3xl mx-auto">
            SkillsSwap - Nền tảng trao đổi kỹ năng hàng đầu Việt Nam, nơi mọi
            người có thể chia sẻ kiến thức và học hỏi lẫn nhau.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-800 mb-6">
                Sứ Mệnh Của Chúng Tôi
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Chúng tôi tin rằng mỗi người đều có những kỹ năng độc đáo và giá
                trị để chia sẻ. SkillsSwap được tạo ra để kết nối những người
                muốn học hỏi với những người sẵn sàng chia sẻ kiến thức.
              </p>
              <p className="text-lg text-gray-600">
                Thông qua việc trao đổi kỹ năng, chúng ta không chỉ phát triển
                bản thân mà còn xây dựng một cộng đồng học tập mạnh mẽ và đoàn
                kết.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
            Giá Trị Cốt Lõi
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <div className="w-16 h-16 bg-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-white text-2xl">🤝</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                Chia Sẻ
              </h3>
              <p className="text-gray-600">
                Khuyến khích tinh thần chia sẻ kiến thức và kinh nghiệm một cách
                miễn phí và tự nguyện.
              </p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <div className="w-16 h-16 bg-green-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-white text-2xl">📚</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                Học Hỏi
              </h3>
              <p className="text-gray-600">
                Tạo môi trường học tập tích cực, nơi mọi người có thể phát triển
                kỹ năng mới mỗi ngày.
              </p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <div className="w-16 h-16 bg-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-white text-2xl">🌟</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                Phát Triển
              </h3>
              <p className="text-gray-600">
                Hỗ trợ mọi người phát triển toàn diện cả về kỹ năng cứng và kỹ
                năng mềm.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
            Cách Thức Hoạt Động
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-blue-600 text-3xl font-bold">1</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Đăng Ký
              </h3>
              <p className="text-gray-600">
                Tạo tài khoản và xây dựng hồ sơ cá nhân với các kỹ năng bạn có
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-green-600 text-3xl font-bold">2</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Tìm Kiếm
              </h3>
              <p className="text-gray-600">
                Khám phá và tìm kiếm những kỹ năng bạn muốn học hoặc chia sẻ
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-yellow-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-yellow-600 text-3xl font-bold">3</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Kết Nối
              </h3>
              <p className="text-gray-600">
                Liên hệ và sắp xếp buổi trao đổi kỹ năng với người phù hợp
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-purple-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-purple-600 text-3xl font-bold">4</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Trao Đổi
              </h3>
              <p className="text-gray-600">
                Bắt đầu hành trình học hỏi và chia sẻ kiến thức cùng nhau
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12">
            Thành Tựu Của Chúng Tôi
          </h2>
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">20</div>
              <div className="text-xl">Người Dùng</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">25</div>
              <div className="text-xl">Kỹ Năng</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">10</div>
              <div className="text-xl">Buổi Trao Đổi</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">90%</div>
              <div className="text-xl">Hài Lòng</div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
            Đội Ngũ Sáng Lập
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {projectTeam.map((member) => (
              <div className="text-center" key={member.id}>
                <div className="w-32 h-32 bg-red-300 rounded-full mx-auto mb-4">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {member.name}
                </h3>
                <p className="text-gray-600 mb-2">{member.role}</p>
                <p className="text-sm text-gray-500">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
