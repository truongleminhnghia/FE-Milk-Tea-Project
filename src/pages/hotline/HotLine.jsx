import React from 'react'
import { Row, Col, Card, Button, Form, Input, Typography, Divider, Timeline, List, Collapse } from 'antd'
import { Icon } from '@iconify/react'

const { Title, Text, Paragraph } = Typography
const { TextArea } = Input
const { Panel } = Collapse

const HotLine = () => {
  // Mock data for store locations
  const storeLocations = [
    {
      id: 1,
      name: "TeaShop Quận 1",
      address: "123 Nguyễn Huệ, Quận 1, TP.HCM",
      phone: "028 1234 5678",
      hours: "07:00 - 22:00",
      mapUrl: "https://maps.google.com"
    },
    {
      id: 2,
      name: "TeaShop Quận 3",
      address: "456 Võ Văn Tần, Quận 3, TP.HCM",
      phone: "028 8765 4321",
      hours: "07:00 - 22:00",
      mapUrl: "https://maps.google.com"
    },
    {
      id: 3,
      name: "TeaShop Quận 7",
      address: "78 Nguyễn Lương Bằng, Quận 7, TP.HCM",
      phone: "028 2468 1357",
      hours: "07:00 - 22:30",
      mapUrl: "https://maps.google.com"
    },
    {
      id: 4,
      name: "TeaShop Thủ Đức",
      address: "100 Võ Văn Ngân, TP. Thủ Đức, TP.HCM",
      phone: "028 1357 2468",
      hours: "07:30 - 22:00",
      mapUrl: "https://maps.google.com"
    }
  ]

  // FAQ items
  const faqItems = [
    {
      key: '1',
      question: 'Làm thế nào để đặt hàng trên ứng dụng?',
      answer: 'Bạn có thể tải ứng dụng TeaShop từ App Store hoặc Google Play. Sau khi đăng nhập, chọn sản phẩm bạn muốn và thêm vào giỏ hàng, chọn địa chỉ giao hàng và phương thức thanh toán để hoàn tất đơn hàng.'
    },
    {
      key: '2',
      question: 'Thời gian giao hàng là bao lâu?',
      answer: 'Thời gian giao hàng thông thường là 30-45 phút tùy thuộc vào khoảng cách và tình trạng giao thông. Trong giờ cao điểm, thời gian giao hàng có thể kéo dài hơn.'
    },
    {
      key: '3',
      question: 'Làm thế nào để trở thành thành viên và tích điểm?',
      answer: 'Bạn có thể đăng ký tài khoản thành viên tại quầy hoặc trên ứng dụng của TeaShop. Mỗi giao dịch sẽ được tích điểm tương ứng với giá trị đơn hàng. Điểm thưởng có thể dùng để đổi các ưu đãi và quà tặng.'
    },
    {
      key: '4',
      question: 'Các phương thức thanh toán được chấp nhận?',
      answer: 'TeaShop chấp nhận thanh toán bằng tiền mặt, thẻ ngân hàng, ví điện tử (MoMo, ZaloPay, ShopeePay), và thanh toán qua ứng dụng.'
    },
    {
      key: '5',
      question: 'Chính sách đổi trả sản phẩm?',
      answer: 'Nếu sản phẩm không đúng với mô tả hoặc bị lỗi, chúng tôi sẽ đổi sản phẩm mới hoặc hoàn tiền trong vòng 30 phút kể từ khi bạn nhận hàng. Vui lòng liên hệ hotline để được hỗ trợ.'
    }
  ];

  return (
    <div className="container mx-auto py-8 px-4">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <Title level={1} className="mb-2">Liên hệ & Hỗ trợ</Title>
        <Paragraph className="text-gray-600 max-w-xl mx-auto">
          Chúng tôi luôn sẵn sàng hỗ trợ bạn 24/7. Hãy liên hệ với TeaShop qua các kênh bên dưới để được giải đáp mọi thắc mắc.
        </Paragraph>
      </div>

      {/* Contact Cards */}
      <Row gutter={[24, 24]} className="mb-16">
        <Col xs={24} sm={12} md={8}>
          <Card 
            hoverable 
            className="text-center h-full flex flex-col justify-between shadow-sm hover:shadow-md transition-all"
            bordered={false}
          >
            <div className="p-4">
              <div className="flex justify-center mb-4">
                <div className="rounded-full bg-[#29aae1] bg-opacity-10 p-5 inline-flex">
                  <Icon icon="mdi:phone" width="40" height="40" className="text-[#29aae1]" />
                </div>
              </div>
              <Title level={3} className="mb-2">Hotline</Title>
              <Paragraph className="text-gray-600 mb-4">
                Gọi ngay cho chúng tôi để được hỗ trợ nhanh nhất
              </Paragraph>
              <div className="mb-6">
                <a href="tel:1900123456" className="text-xl font-bold text-[#29aae1] block mb-1">1900 1234 56</a>
                <Text className="text-gray-500">(7:00 - 22:00 hàng ngày)</Text>
              </div>
            </div>
            <Button type="primary" size="large" className="bg-[#29aae1] hover:bg-[#1d8dba]">
              Gọi ngay
            </Button>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card 
            hoverable 
            className="text-center h-full flex flex-col justify-between shadow-sm hover:shadow-md transition-all"
            bordered={false}
          >
            <div className="p-4">
              <div className="flex justify-center mb-4">
                <div className="rounded-full bg-[#29aae1] bg-opacity-10 p-5 inline-flex">
                  <Icon icon="mdi:email" width="40" height="40" className="text-[#29aae1]" />
                </div>
              </div>
              <Title level={3} className="mb-2">Email</Title>
              <Paragraph className="text-gray-600 mb-4">
                Gửi email cho chúng tôi, phản hồi trong vòng 24h
              </Paragraph>
              <div className="mb-6">
                <a href="mailto:support@teashop.com" className="text-xl font-bold text-[#29aae1] block mb-1">support@teashop.com</a>
                <Text className="text-gray-500">(Hỗ trợ 24/7)</Text>
              </div>
            </div>
            <Button type="primary" size="large" className="bg-[#29aae1] hover:bg-[#1d8dba]">
              Gửi email
            </Button>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8} className="sm:col-span-2 md:col-span-1">
          <Card 
            hoverable 
            className="text-center h-full flex flex-col justify-between shadow-sm hover:shadow-md transition-all"
            bordered={false}
          >
            <div className="p-4">
              <div className="flex justify-center mb-4">
                <div className="rounded-full bg-[#29aae1] bg-opacity-10 p-5 inline-flex">
                  <Icon icon="mdi:facebook-messenger" width="40" height="40" className="text-[#29aae1]" />
                </div>
              </div>
              <Title level={3} className="mb-2">Messenger</Title>
              <Paragraph className="text-gray-600 mb-4">
                Nhắn tin với chúng tôi qua Facebook Messenger
              </Paragraph>
              <div className="mb-6">
                <a href="https://m.me/teashop" className="text-xl font-bold text-[#29aae1] block mb-1">@TeaShop</a>
                <Text className="text-gray-500">(Phản hồi trong vòng 15 phút)</Text>
              </div>
            </div>
            <Button type="primary" size="large" className="bg-[#29aae1] hover:bg-[#1d8dba]">
              Nhắn tin
            </Button>
          </Card>
        </Col>
      </Row>

      {/* Store Locations */}
      <div className="mb-16">
        <div className="text-center mb-8">
          <Title level={2} className="mb-2">Cửa hàng của chúng tôi</Title>
          <Paragraph className="text-gray-600 max-w-xl mx-auto">
            Ghé thăm cửa hàng TeaShop gần nhất để trải nghiệm những ly trà sữa thơm ngon nhất.
          </Paragraph>
        </div>
        <Row gutter={[24, 24]}>
          {storeLocations.map(store => (
            <Col xs={24} sm={12} lg={6} key={store.id}>
              <Card
                hoverable
                className="h-full shadow-sm hover:shadow-md transition-all"
                bordered={false}
              >
                <div className="mb-3">
                  <Title level={4} className="mb-2">{store.name}</Title>
                  <div className="flex items-start mb-2">
                    <Icon icon="mdi:map-marker" className="mr-2 mt-1 text-[#29aae1]" />
                    <Text className="text-gray-600">{store.address}</Text>
                  </div>
                  <div className="flex items-center mb-2">
                    <Icon icon="mdi:phone" className="mr-2 text-[#29aae1]" />
                    <Text className="text-gray-600">{store.phone}</Text>
                  </div>
                  <div className="flex items-center mb-4">
                    <Icon icon="mdi:clock-outline" className="mr-2 text-[#29aae1]" />
                    <Text className="text-gray-600">{store.hours}</Text>
                  </div>
                </div>
                <Button 
                  type="default" 
                  block
                  icon={<Icon icon="mdi:directions" className="mr-1" />}
                  href={store.mapUrl}
                  target="_blank"
                  className="border-[#29aae1] text-[#29aae1] hover:bg-[#29aae1] hover:text-white"
                >
                  Xem bản đồ
                </Button>
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      {/* Contact Form and FAQ */}
      <Row gutter={[48, 48]}>
        <Col xs={24} lg={12}>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <Title level={2} className="mb-6">Gửi tin nhắn cho chúng tôi</Title>
            <Form layout="vertical">
              <Row gutter={16}>
                <Col xs={24} sm={12}>
                  <Form.Item label="Họ và tên" name="name" rules={[{ required: true, message: 'Vui lòng nhập họ tên!' }]}>
                    <Input size="large" placeholder="Nhập họ và tên" />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item label="Số điện thoại" name="phone" rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}>
                    <Input size="large" placeholder="Nhập số điện thoại" />
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Vui lòng nhập email!', type: 'email' }]}>
                <Input size="large" placeholder="Nhập địa chỉ email" />
              </Form.Item>
              <Form.Item label="Chủ đề" name="subject">
                <Input size="large" placeholder="Chủ đề tin nhắn" />
              </Form.Item>
              <Form.Item label="Nội dung" name="message" rules={[{ required: true, message: 'Vui lòng nhập nội dung tin nhắn!' }]}>
                <TextArea rows={4} placeholder="Nội dung tin nhắn..." />
              </Form.Item>
              <Form.Item>
                <Button type="primary" size="large" className="bg-[#29aae1] hover:bg-[#1d8dba]" block>
                  Gửi tin nhắn
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Col>
        <Col xs={24} lg={12}>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <Title level={2} className="mb-6">Câu hỏi thường gặp</Title>
            <Collapse defaultActiveKey={['1']} expandIconPosition="end" className="bg-white border-0 shadow-none">
              {faqItems.map(item => (
                <Panel 
                  key={item.key} 
                  header={<span className="font-medium">{item.question}</span>}
                  className="mb-3 rounded-md overflow-hidden border border-gray-100"
                >
                  <Paragraph className="text-gray-600">{item.answer}</Paragraph>
                </Panel>
              ))}
            </Collapse>
            
            <Divider className="my-8" />
            
            <Title level={3} className="mb-4">Quy trình hỗ trợ</Title>
            <Timeline
              items={[
                {
                  color: '#29aae1',
                  children: (
                    <div>
                      <Text strong>Bước 1: Liên hệ với chúng tôi</Text>
                      <p className="text-gray-600 mt-1">Gọi hotline hoặc gửi tin nhắn qua các kênh liên hệ.</p>
                    </div>
                  ),
                },
                {
                  color: '#29aae1',
                  children: (
                    <div>
                      <Text strong>Bước 2: Mô tả vấn đề</Text>
                      <p className="text-gray-600 mt-1">Mô tả chi tiết vấn đề bạn đang gặp phải.</p>
                    </div>
                  ),
                },
                {
                  color: '#29aae1',
                  children: (
                    <div>
                      <Text strong>Bước 3: Nhận hỗ trợ</Text>
                      <p className="text-gray-600 mt-1">Nhân viên của chúng tôi sẽ hỗ trợ giải quyết vấn đề.</p>
                    </div>
                  ),
                },
                {
                  color: '#29aae1',
                  children: (
                    <div>
                      <Text strong>Bước 4: Phản hồi</Text>
                      <p className="text-gray-600 mt-1">Cho chúng tôi biết đánh giá của bạn để cải thiện dịch vụ.</p>
                    </div>
                  ),
                },
              ]}
            />
          </div>
        </Col>
      </Row>

      {/* Connect with us */}
      <div className="mt-16 text-center">
        <Title level={2} className="mb-6">Kết nối với chúng tôi</Title>
        <div className="flex justify-center gap-4">
          <Button
            type="default"
            shape="circle"
            size="large"
            icon={<Icon icon="mdi:facebook" width="22" height="22" />}
            className="border-[#29aae1] text-[#29aae1] hover:bg-[#29aae1] hover:text-white"
          />
          <Button
            type="default"
            shape="circle"
            size="large"
            icon={<Icon icon="mdi:instagram" width="22" height="22" />}
            className="border-[#29aae1] text-[#29aae1] hover:bg-[#29aae1] hover:text-white"
          />
          <Button
            type="default"
            shape="circle"
            size="large"
            icon={<Icon icon="mdi:tiktok" width="22" height="22" />}
            className="border-[#29aae1] text-[#29aae1] hover:bg-[#29aae1] hover:text-white"
          />
          <Button
            type="default"
            shape="circle"
            size="large"
            icon={<Icon icon="mdi:youtube" width="22" height="22" />}
            className="border-[#29aae1] text-[#29aae1] hover:bg-[#29aae1] hover:text-white"
          />
        </div>
        <Paragraph className="text-gray-600 mt-4">
          Theo dõi chúng tôi trên mạng xã hội để cập nhật những tin tức mới nhất và chương trình khuyến mãi hấp dẫn.
        </Paragraph>
      </div>
    </div>
  )
}

export default HotLine