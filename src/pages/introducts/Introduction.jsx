import React from "react";
import { Button, Card, Typography, Row, Col, Divider, Timeline, Carousel, Image } from "antd";
import { ShopOutlined, RocketOutlined, TrophyOutlined, HeartOutlined, TeamOutlined, EnvironmentOutlined, MailOutlined, PhoneOutlined } from "@ant-design/icons";

const { Title, Paragraph, Text } = Typography;

const Introduction = () => {
  return (
    <div className="container mx-auto py-8 px-4">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl shadow-sm p-8 mb-12">
        <Row gutter={[24, 24]} align="middle">
          <Col xs={24} md={12}>
            <Title level={1} className="text-blue-800 mb-4">Nguyên Liệu Pha Chế Đồ Uống Hàng Đầu</Title>
            <Paragraph className="text-gray-600 text-lg mb-8">
              Chúng tôi cung cấp những nguyên liệu pha chế chất lượng cao nhất cho các quán trà sữa và cà phê. 
              Với hơn 5 năm kinh nghiệm, chúng tôi tự hào là đối tác tin cậy của hơn 1,000+ quán trà sữa trên toàn quốc.
            </Paragraph>
            <Button type="primary" size="large" shape="round" className="mr-4">
              Liên hệ ngay
            </Button>
            <Button size="large" shape="round">
              Xem sản phẩm
            </Button>
          </Col>
          <Col xs={24} md={12} className="flex justify-center">
            <img src="/images/baners/collection_main_banner.webp" alt="Hero Image" className="rounded-lg shadow-md w-full max-w-md" />
          </Col>
        </Row>
      </div>

      {/* About Us Section */}
      <div className="text-center mb-16">
        <Title level={2} className="text-blue-700 mb-2">Về Chúng Tôi</Title>
        <div className="w-24 h-1 bg-blue-500 mx-auto mb-8 rounded-full"></div>
        <Paragraph className="text-gray-600 max-w-3xl mx-auto text-lg mb-12">
          Được thành lập vào năm 2018, chúng tôi đã trở thành nhà cung cấp nguyên liệu pha chế đồ uống 
          hàng đầu Việt Nam. Sứ mệnh của chúng tôi là mang đến những nguyên liệu chất lượng cao, an toàn 
          và đáng tin cậy cho tất cả các đối tác.
        </Paragraph>

        <Row gutter={[32, 32]} className="mb-12">
          <Col xs={24} sm={8}>
            <Card className="h-full hover:shadow-lg transition-shadow" bordered={false}>
              <ShopOutlined className="text-5xl text-blue-500 mb-4" />
              <Title level={4} className="text-gray-800">Đa dạng sản phẩm</Title>
              <Paragraph className="text-gray-600">
                Hơn 500+ sản phẩm từ trà, trân châu, bột pha chế đến các loại syrup và topping.
              </Paragraph>
            </Card>
          </Col>
          <Col xs={24} sm={8}>
            <Card className="h-full hover:shadow-lg transition-shadow" bordered={false}>
              <RocketOutlined className="text-5xl text-blue-500 mb-4" />
              <Title level={4} className="text-gray-800">Giao hàng nhanh chóng</Title>
              <Paragraph className="text-gray-600">
                Vận chuyển trong 24h đến các tỉnh thành lớn và 48h đến các khu vực khác.
              </Paragraph>
            </Card>
          </Col>
          <Col xs={24} sm={8}>
            <Card className="h-full hover:shadow-lg transition-shadow" bordered={false}>
              <TrophyOutlined className="text-5xl text-blue-500 mb-4" />
              <Title level={4} className="text-gray-800">Chất lượng đảm bảo</Title>
              <Paragraph className="text-gray-600">
                Tất cả sản phẩm đều có chứng nhận an toàn thực phẩm và nguồn gốc rõ ràng.
              </Paragraph>
            </Card>
          </Col>
        </Row>
      </div>

      {/* Our Values Section */}
      <div className="bg-gray-50 py-16 px-8 rounded-xl mb-16">
        <Row gutter={[48, 48]} align="middle">
          <Col xs={24} md={12}>
            <Title level={2} className="text-blue-700 mb-6">Giá Trị Cốt Lõi</Title>
            <Timeline
              items={[
                {
                  dot: <HeartOutlined className="text-red-500 text-xl" />,
                  children: (
                    <div className="mb-8">
                      <Title level={4} className="text-gray-800 mb-2">Cam kết chất lượng</Title>
                      <Paragraph className="text-gray-600">
                        Chúng tôi cam kết cung cấp những sản phẩm chất lượng cao nhất, đảm bảo an toàn vệ sinh thực phẩm và hương vị tuyệt vời.
                      </Paragraph>
                    </div>
                  ),
                },
                {
                  dot: <TeamOutlined className="text-blue-500 text-xl" />,
                  children: (
                    <div className="mb-8">
                      <Title level={4} className="text-gray-800 mb-2">Đồng hành cùng đối tác</Title>
                      <Paragraph className="text-gray-600">
                        Chúng tôi không chỉ là nhà cung cấp mà còn là đối tác tin cậy, hỗ trợ bạn trong suốt quá trình kinh doanh.
                      </Paragraph>
                    </div>
                  ),
                },
                {
                  dot: <RocketOutlined className="text-green-500 text-xl" />,
                  children: (
                    <div>
                      <Title level={4} className="text-gray-800 mb-2">Đổi mới liên tục</Title>
                      <Paragraph className="text-gray-600">
                        Chúng tôi không ngừng nghiên cứu và phát triển sản phẩm mới, bắt kịp xu hướng thị trường và nhu cầu khách hàng.
                      </Paragraph>
                    </div>
                  ),
                },
              ]}
            />
          </Col>
          <Col xs={24} md={12}>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <img src="https://firebasestorage.googleapis.com/v0/b/fir-app-2f0da.appspot.com/o/bottrasuakhoaimonking1-240.jpg?alt=media&token=b1942afc-08e6-4505-8bc8-8e9f048175c1" alt="Tea products" className="rounded-lg shadow w-full h-48 object-cover" />
              </div>
              <div>
                <img src="https://firebasestorage.googleapis.com/v0/b/fir-app-2f0da.appspot.com/o/Tran-Chau-Trang-Wonderful-1Kg.jpg?alt=media&token=a3bca1d8-282c-4e23-b6d0-3733c4bba26c" alt="Tapioca pearls" className="rounded-lg shadow w-full h-40 object-cover" />
              </div>
              <div>
                <img src="https://firebasestorage.googleapis.com/v0/b/fir-app-2f0da.appspot.com/o/vinbar__1__33e04ccdd19c429390749d3be336dc79_1024x1024.webp?alt=media&token=0288e2f2-fd7c-49fe-ad43-36dad2ff0908" alt="Bubble tea supplies" className="rounded-lg shadow w-full h-40 object-cover" />
              </div>
            </div>
          </Col>
        </Row>
      </div>

      {/* Achievements Section */}
      <div className="mb-16">
        <Title level={2} className="text-blue-700 text-center mb-2">Thành Tựu Của Chúng Tôi</Title>
        <div className="w-24 h-1 bg-blue-500 mx-auto mb-12 rounded-full"></div>
        
        <Row gutter={[24, 24]} className="text-center">
          <Col xs={12} md={6}>
            <div className="p-6">
              <Title level={1} className="text-blue-600 mb-2">5+</Title>
              <Text className="text-gray-600 text-lg">Năm kinh nghiệm</Text>
            </div>
          </Col>
          <Col xs={12} md={6}>
            <div className="p-6">
              <Title level={1} className="text-blue-600 mb-2">1000+</Title>
              <Text className="text-gray-600 text-lg">Khách hàng</Text>
            </div>
          </Col>
          <Col xs={12} md={6}>
            <div className="p-6">
              <Title level={1} className="text-blue-600 mb-2">500+</Title>
              <Text className="text-gray-600 text-lg">Sản phẩm</Text>
            </div>
          </Col>
          <Col xs={12} md={6}>
            <div className="p-6">
              <Title level={1} className="text-blue-600 mb-2">63</Title>
              <Text className="text-gray-600 text-lg">Tỉnh thành</Text>
            </div>
          </Col>
        </Row>
      </div>

      {/* Testimonials Section */}
      <div className="bg-blue-50 py-16 px-8 rounded-xl mb-16">
        <Title level={2} className="text-blue-700 text-center mb-2">Khách Hàng Nói Gì Về Chúng Tôi</Title>
        <div className="w-24 h-1 bg-blue-500 mx-auto mb-12 rounded-full"></div>
        
        <Carousel autoplay className="max-w-4xl mx-auto">
          <div>
            <Card className="mx-8 my-4">
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span key={star} className="text-yellow-400 text-2xl">★</span>
                  ))}
                </div>
                <Paragraph className="text-gray-600 italic text-lg mb-6">
                  "Nhờ có nguyên liệu chất lượng cao từ công ty, quán trà sữa của tôi đã trở nên nổi tiếng 
                  với các món signature. Dịch vụ giao hàng nhanh chóng và đội ngũ tư vấn nhiệt tình."
                </Paragraph>
                <Title level={4} className="text-gray-800 mb-1">Chị Nguyễn Thị Hương</Title>
                <Text className="text-gray-500">Chủ quán The Bubble Tea, TP.HCM</Text>
              </div>
            </Card>
          </div>
          <div>
            <Card className="mx-8 my-4">
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span key={star} className="text-yellow-400 text-2xl">★</span>
                  ))}
                </div>
                <Paragraph className="text-gray-600 italic text-lg mb-6">
                  "Đã hợp tác hơn 3 năm và rất hài lòng với chất lượng sản phẩm. Đặc biệt là trân châu và 
                  các loại bột trà sữa luôn đảm bảo hương vị ổn định qua từng đợt hàng."
                </Paragraph>
                <Title level={4} className="text-gray-800 mb-1">Anh Trần Văn Minh</Title>
                <Text className="text-gray-500">Chuỗi cửa hàng Tea House, Hà Nội</Text>
              </div>
            </Card>
          </div>
        </Carousel>
      </div>

      {/* Contact Section */}
      <div className="mb-16">
        <Title level={2} className="text-blue-700 text-center mb-2">Liên Hệ Với Chúng Tôi</Title>
        <div className="w-24 h-1 bg-blue-500 mx-auto mb-12 rounded-full"></div>
        
        <Row gutter={[48, 48]}>
          <Col xs={24} md={12}>
            <Card bordered={false} className="h-full shadow-sm">
              <Title level={3} className="text-gray-800 mb-8">Thông Tin Liên Hệ</Title>
              
              <div className="flex items-start mb-6">
                <EnvironmentOutlined className="text-xl text-blue-500 mr-4 mt-1" />
                <div>
                  <Title level={5} className="text-gray-800 mb-1">Địa chỉ:</Title>
                  <Paragraph className="text-gray-600">
                    123 Đường Nguyễn Văn Linh, Quận 7, TP. Hồ Chí Minh
                  </Paragraph>
                </div>
              </div>
              
              <div className="flex items-start mb-6">
                <MailOutlined className="text-xl text-blue-500 mr-4 mt-1" />
                <div>
                  <Title level={5} className="text-gray-800 mb-1">Email:</Title>
                  <Paragraph className="text-gray-600">
                    info@milkteasupplies.com
                  </Paragraph>
                </div>
              </div>
              
              <div className="flex items-start">
                <PhoneOutlined className="text-xl text-blue-500 mr-4 mt-1" />
                <div>
                  <Title level={5} className="text-gray-800 mb-1">Điện thoại:</Title>
                  <Paragraph className="text-gray-600">
                    (028) 1234 5678
                  </Paragraph>
                </div>
              </div>
            </Card>
          </Col>
          <Col xs={24} md={12}>
            <Card bordered={false} className="h-full shadow-sm">
              <Title level={3} className="text-gray-800 mb-6">Gửi Tin Nhắn</Title>
              <Paragraph className="text-gray-600 mb-8">
                Hãy để lại thông tin, chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất!
              </Paragraph>
              
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Họ và tên</label>
                <input 
                  type="text" 
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Nhập họ và tên"
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Email</label>
                <input 
                  type="email" 
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Nhập email"
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Tin nhắn</label>
                <textarea 
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[120px]"
                  placeholder="Nhập nội dung tin nhắn"
                ></textarea>
              </div>
              
              <Button type="primary" size="large" className="mt-2">
                Gửi tin nhắn
              </Button>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Introduction;