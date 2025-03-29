import React, { useState } from 'react';
import { Card, Row, Col, Tag, Space, Typography, Tabs, Button, Input, Carousel, Statistic, Divider, Badge, Avatar, List } from 'antd';
import { ClockCircleOutlined, UserOutlined, FireOutlined, StarOutlined, SearchOutlined, EyeOutlined, HeartOutlined, CommentOutlined, BookOutlined, CoffeeOutlined, ShopOutlined, RocketOutlined, RightOutlined } from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;
const { TabPane } = Tabs;
const { Search } = Input;

const ModernNewsCard = ({ news, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="group relative overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-500 hover:shadow-2xl"
      style={{
        animation: `fadeInUp 0.5s ease-out ${index * 0.1}s both`,
        transform: isHovered ? 'translateY(-10px)' : 'translateY(0)',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-64 overflow-hidden">
        <img
          src={news.image}
          alt={news.title}
          className="h-full w-full object-cover transition-transform duration-700"
          style={{
            transform: isHovered ? 'scale(1.1)' : 'scale(1)',
          }}
        />
        <div 
          className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-opacity duration-500"
          style={{ opacity: isHovered ? 1 : 0.7 }}
        />
        <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
          <Badge count={news.views} color="blue">
            <Tag color="blue" className="px-4 py-1.5 text-sm font-medium">
              {news.category}
            </Tag>
          </Badge>
          {news.isHot && (
            <div className="animate-pulse">
              <Tag color="red" className="px-4 py-1.5 text-sm font-medium" icon={<FireOutlined />}>
                Hot
              </Tag>
            </div>
          )}
        </div>
      </div>

      <div className="p-6">
        <div className="mb-4 flex items-center justify-between">
          <Space className="text-gray-500">
            <span className="flex items-center">
              <ClockCircleOutlined className="mr-1" />
              {news.readTime}
            </span>
            <span className="flex items-center">
              <UserOutlined className="mr-1" />
              {news.author}
            </span>
          </Space>
          <div className="text-sm text-gray-500">
            {new Date(news.date).toLocaleDateString('vi-VN', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </div>
        </div>

        <Title 
          level={4} 
          className="mb-3 text-xl font-bold transition-colors duration-300"
          style={{ color: isHovered ? '#1890ff' : 'inherit' }}
        >
          {news.title}
        </Title>

        <Paragraph className="mb-4 text-gray-600 line-clamp-3">
          {news.description}
        </Paragraph>

        <div className="flex flex-wrap gap-2 mb-4">
          {news.tags?.map((tag, idx) => (
            <Tag key={idx} color="default" className="px-3 py-1 text-sm">
              {tag}
            </Tag>
          ))}
        </div>

        <Divider className="my-4" />

        <div className="flex items-center justify-between">
          <Space>
            <Statistic 
              value={news.views} 
              prefix={<EyeOutlined />} 
              className="text-gray-500"
            />
            <Statistic 
              value={news.likes} 
              prefix={<HeartOutlined />} 
              className="text-gray-500"
            />
            <Statistic 
              value={news.comments} 
              prefix={<CommentOutlined />} 
              className="text-gray-500"
            />
          </Space>
          <Button 
            type="primary" 
            ghost
            className="transition-all duration-300 hover:scale-105"
          >
            Đọc thêm
          </Button>
        </div>
      </div>
    </div>
  );
};

const News = () => {
  const [activeTab, setActiveTab] = useState('1');
  const [searchText, setSearchText] = useState('');

  const categories = [
    { key: '1', label: 'Tất cả', icon: <BookOutlined /> },
    { key: '2', label: 'Nguyên liệu', icon: <CoffeeOutlined /> },
    { key: '3', label: 'Công thức', icon: <ShopOutlined /> },
    { key: '4', label: 'Xu hướng', icon: <RocketOutlined /> },
    { key: '5', label: 'Đánh giá', icon: <StarOutlined /> }
  ];

  const newsData = {
    featured: [
      {
        id: 0,
        title: "",
        description: "Năm 2024 đánh dấu sự phát triển mạnh mẽ của ngành nguyên liệu trà sữa, với việc các thành phố lớn đón nhận nhiều xu hướng mới về nguyên liệu tự nhiên và healthy.",
        image: "https://scontent.fsgn2-7.fna.fbcdn.net/v/t39.30808-6/461435599_1058867866240630_8931337263888091662_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=127cfc&_nc_ohc=mJbbv4N7SZEQ7kNvgH8aIQo&_nc_oc=Adlz_zB3zPHnWJzMDdVk-lpNcHZrA272l0pIR6DSynItO9vc2EAVpZsBClU_tmrqgd4azZupW7NNexe5qDlpzQhl&_nc_zt=23&_nc_ht=scontent.fsgn2-7.fna&_nc_gid=QAzNlK6LpWrciMyWltTx6A&oh=00_AYHHgDAZZ5CNGEW5jQS0IKSBorH3ABEJgyMzL4PFrleYeg&oe=67EE0530",
        date: "2024-03-16",
        author: "Admin",
        category: "Đặc biệt",
        readTime: "10 phút",
        isHot: true,
        views: 1234,
        likes: 89,
        comments: 23,
        tags: ["Trà sữa", "Đài Loan", "Hương vị"],
        rating: 4.8,
        price: "35.000đ - 45.000đ",
        location: "Đài Loan",
        ingredients: ["Trà đen", "Sữa tươi", "Trân châu", "Kem cheese"]
      }
    ],
    ingredients: [
      {
        id: 1,
        title: "Khám phá các loại trà đặc biệt từ Đài Loan",
        description: "Tìm hiểu về các loại trà đặc biệt được sử dụng trong trà sữa Đài Loan, từ trà sữa trân châu đến trà sữa matcha...",
        image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        date: "2024-03-15",
        author: "Admin",
        category: "Nguyên liệu",
        readTime: "5 phút",
        isHot: true,
        views: 856,
        likes: 45,
        comments: 12,
        tags: ["Trà", "Nguyên liệu", "Chất lượng"],
        price: "15.000đ - 25.000đ",
        location: "Đài Loan",
        ingredients: ["Trà xanh", "Trà đen", "Trà oolong", "Trà matcha"],
        nutritionalInfo: {
          calories: "150-200",
          protein: "2g",
          fat: "5g",
          carbs: "30g"
        }
      },
      {
        id: 2,
        title: "Bí quyết chọn nguyên liệu chất lượng cho trà sữa",
        description: "Hướng dẫn chi tiết cách chọn các nguyên liệu chất lượng cao cho món trà sữa thơm ngon, từ trà đến sữa và các topping...",
        image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        date: "2024-03-14",
        author: "Admin",
        category: "Nguyên liệu",
        readTime: "7 phút",
        isHot: false,
        views: 654,
        likes: 32,
        comments: 8,
        tags: ["Nguyên liệu", "Chất lượng", "Hướng dẫn"],
        price: "20.000đ - 30.000đ",
        location: "Việt Nam",
        ingredients: ["Sữa tươi", "Kem béo", "Trân châu", "Thạch"],
        nutritionalInfo: {
          calories: "180-220",
          protein: "3g",
          fat: "7g",
          carbs: "35g"
        }
      },
      {
        id: 7,
        title: "Top 5 loại topping phổ biến trong trà sữa",
        description: "Khám phá những loại topping được yêu thích nhất và cách chọn topping phù hợp với từng loại trà sữa...",
        image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        date: "2024-03-13",
        author: "Admin",
        category: "Nguyên liệu",
        readTime: "6 phút",
        isHot: true,
        views: 543,
        likes: 28,
        comments: 6,
        tags: ["Topping", "Trà sữa", "Phổ biến"],
        price: "5.000đ - 15.000đ",
        location: "Toàn cầu",
        ingredients: ["Trân châu", "Thạch", "Pudding", "Kem cheese", "Bánh flan"],
        nutritionalInfo: {
          calories: "50-100",
          protein: "1g",
          fat: "2g",
          carbs: "10g"
        }
      }
    ],
    recipes: [
      {
        id: 3,
        title: "Cách pha trà sữa matcha đúng chuẩn",
        description: "Hướng dẫn chi tiết cách pha trà sữa matcha thơm ngon, đúng vị và đẹp mắt...",
        image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        date: "2024-03-13",
        author: "Admin",
        category: "Công thức",
        readTime: "6 phút",
        isHot: true,
        views: 987,
        likes: 67,
        comments: 15,
        tags: ["Matcha", "Công thức", "Hướng dẫn"],
        price: "40.000đ - 50.000đ",
        location: "Nhật Bản",
        ingredients: ["Bột matcha", "Sữa tươi", "Kem béo", "Đường"],
        steps: [
          "Pha bột matcha với nước nóng",
          "Thêm sữa tươi và kem béo",
          "Khuấy đều và thêm đá"
        ],
        nutritionalInfo: {
          calories: "200-250",
          protein: "4g",
          fat: "8g",
          carbs: "40g"
        }
      },
      {
        id: 4,
        title: "Bí quyết làm trân châu ngon tại nhà",
        description: "Khám phá cách làm trân châu thơm ngon, dẻo dai đúng chuẩn Đài Loan...",
        image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        date: "2024-03-12",
        author: "Admin",
        category: "Công thức",
        readTime: "8 phút",
        isHot: false,
        views: 543,
        likes: 28,
        comments: 6,
        tags: ["Trân châu", "Công thức", "Tự làm"],
        price: "10.000đ - 20.000đ",
        location: "Đài Loan",
        ingredients: ["Bột năng", "Đường", "Nước", "Màu thực phẩm"],
        steps: [
          "Nhào bột với nước",
          "Tạo viên trân châu",
          "Luộc trong nước sôi",
          "Ngâm trong nước đường"
        ],
        nutritionalInfo: {
          calories: "80-100",
          protein: "1g",
          fat: "0g",
          carbs: "20g"
        }
      }
    ],
    trends: [
      {
        id: 5,
        title: "Xu hướng trà sữa 2024",
        description: "Khám phá những xu hướng mới nhất trong thế giới trà sữa năm 2024...",
        image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        date: "2024-03-11",
        author: "Admin",
        category: "Xu hướng",
        readTime: "5 phút",
        isHot: true,
        views: 765,
        likes: 54,
        comments: 10,
        tags: ["Xu hướng", "2024", "Mới nhất"],
        price: "35.000đ - 55.000đ",
        location: "Toàn cầu",
        ingredients: ["Các nguyên liệu mới", "Topping độc đáo"],
        trends: [
          "Trà sữa sạch",
          "Topping tự nhiên",
          "Bao bì thân thiện môi trường"
        ]
      },
      {
        id: 6,
        title: "Top 10 quán trà sữa nổi tiếng",
        description: "Danh sách những quán trà sữa được yêu thích nhất trong năm 2024...",
        image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        date: "2024-03-10",
        author: "Admin",
        category: "Xu hướng",
        readTime: "7 phút",
        isHot: false,
        views: 432,
        likes: 21,
        comments: 5,
        tags: ["Top 10", "Quán trà sữa", "Nổi tiếng"],
        price: "30.000đ - 60.000đ",
        location: "Việt Nam",
        ingredients: ["Đa dạng nguyên liệu"],
        stores: [
          "The Coffee House",
          "Highlands Coffee",
          "Phúc Long",
          "Gong Cha",
          "Koi Thé"
        ]
      }
    ]
  };



  const renderFeaturedNews = () => (
    <div className="mb-12">
      <Title level={3} className="mb-6 flex items-center">
        <FireOutlined className="text-red-500 mr-2" />
        Bài Viết Nổi Bật
      </Title>
      <Carousel autoplay className="rounded-xl overflow-hidden shadow-lg">
        {newsData.featured.map((news) => (
          <div key={news.id} className="relative h-[500px]">
            <img
              src={news.image}
              alt={news.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent flex items-end">
              <div className="container mx-auto px-4 pb-12">
                <div className="max-w-2xl">
                  <Tag color="red" className="mb-4 text-base px-4 py-1" icon={<FireOutlined />}>
                    Bài viết nổi bật
                  </Tag>
                  <Title level={2} className="text-white mb-4 text-3xl">{news.title}</Title>
                  <Paragraph className="text-white text-lg mb-6">{news.description}</Paragraph>
                  <Space className="text-white text-base">
                    <span><ClockCircleOutlined className="mr-1" />{news.readTime}</span>
                    <span><UserOutlined className="mr-1" />{news.author}</span>
                    <span><EyeOutlined className="mr-1" />{news.views}</span>
                  </Space>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );

  const renderModernNewsList = () => (
    <div className="space-y-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Object.values(newsData).flat().filter(filterNews).map((news, index) => (
          <ModernNewsCard key={news.id} news={news} index={index} />
        ))}
      </div>
    </div>
  );

  const filterNews = (news) => {
    if (!searchText) return true;
    return news.title.toLowerCase().includes(searchText.toLowerCase()) ||
           news.description.toLowerCase().includes(searchText.toLowerCase());
  };

  const mainNews = {
    id: 1,
    title: "",
    description: "Cuộc chiến nảy lửa giữa các thương hiệu trà sữa: Mixue thống lĩnh, TocoToco 'lún sâu' vào lỗ",
    image: "https://nqs.1cdn.vn/2024/08/18/dautu.kinhtechungkhoan.vn-stores-news_dataimages-2024-082024-18-02-_f7b69b-fb05eb41131847afa5a5ca5ff7dbd694-mv220240818020123.5780760.png",
    date: "25/03/2024",
    time: "15:00",
    author: "Admin"
  };

  const latestNews = [
    {
      "id": 2,
      "title": "Nguyên Liệu Trà Sữa 1/2024: Cơ Hội Mới Cho Nhà Đầu Tư",
      "date": "24/03/2024",
      "time": "14:15"
    },
    {
      "id": 3,
      "title": "Nguyên Liệu Trà Hoa Lục Đề Ngưng Vì Giá Thuế",
      "date": "23/03/2024",
      "time": "16:45"
    },
    {
      "id": 4,
      "title": "Nguyên Liệu Trà Cam Thái Mang Lại 'Lãi Kép' Cho Nhà Đầu Tư",
      "date": "22/03/2024",
      "time": "09:30"
    }
  ];

  const mostViewedNews = [
    {
      id: 5,
      title: "Top 10 Loại Trà Được Ưa Chuộng Nhất Tháng 3/2024",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSp2hllW-VAwpWbpLvV3Wpx5DpnBe_w6zG_HA&s",
      description: "Trong số các loại trà được sử dụng làm trà sữa, những loại trà này đang dẫn đầu thị trường với doanh số bán ra cao nhất..."
    },
    {
      id: 6,
      title: "Biến Chuyển Thị Trường Trân Châu Đen Phía Thái",
      image: "https://images.unsplash.com/photo-1558857563-b371033873b8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      description: "Giá trân châu đen từ Thái Lan có dấu hiệu tăng mạnh do nhu cầu thị trường và các yếu tố về nguồn cung..."
    }
  ];

  const renderMainNews = () => (
    <div className="relative h-[400px] rounded-lg overflow-hidden mb-8">
      <img
        src={mainNews.image}
        alt={mainNews.title}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent">
        <div className="absolute bottom-0 p-6 text-white">
          <div className="flex items-center gap-4 mb-2 text-sm">
            <span>{mainNews.date}</span>
            <span>{mainNews.time}</span>
            <span className="flex items-center">
              <UserOutlined className="mr-1" />
              {mainNews.author}
            </span>
          </div>
          <Title level={2} className="text-white mb-4">
            {mainNews.title}
          </Title>
          <Paragraph className="text-white/80 text-lg mb-0">
            {mainNews.description}
          </Paragraph>
        </div>
      </div>
    </div>
  );

  const renderLatestNews = () => (
    <div className="bg-gray-50 p-6 rounded-lg mb-8">
      <Title level={4} className="mb-6">
        Tin tức mới nhất
      </Title>
      <List
        itemLayout="horizontal"
        dataSource={latestNews}
        renderItem={item => (
          <List.Item className="border-b last:border-b-0 py-4">
            <Space direction="vertical" size={2} className="w-full">
              <div className="flex items-center justify-between text-sm text-gray-500">
                <Space>
                  <ClockCircleOutlined />
                  <span>{item.date}</span>
                  <span>{item.time}</span>
                </Space>
              </div>
              <Title level={5} className="mb-0 hover:text-blue-600 cursor-pointer">
                {item.title}
              </Title>
            </Space>
          </List.Item>
        )}
      />
    </div>
  );

  const renderMostViewed = () => (
    <div className="mb-8">
      <Title level={4} className="mb-6">
        Bài viết được xem nhiều nhất
      </Title>
      <Row gutter={[24, 24]}>
        {mostViewedNews.map(news => (
          <Col xs={24} md={12} key={news.id}>
            <Card
              hoverable
              cover={
                <div className="h-48 overflow-hidden">
                  <img
                    alt={news.title}
                    src={news.image}
                    className="w-full h-full object-cover"
                  />
                </div>
              }
              className="h-full"
            >
              <Title level={5} className="mb-3 hover:text-blue-600">
                {news.title}
              </Title>
              <Paragraph className="text-gray-600 mb-0 line-clamp-2">
                {news.description}
              </Paragraph>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <style>
        {`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          @keyframes float {
            0% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-10px);
            }
            100% {
              transform: translateY(0px);
            }
          }
          .float-animation {
            animation: float 3s ease-in-out infinite;
          }
        `}
      </style>

      {renderFeaturedNews()}
      
      <Tabs 
        activeKey={activeTab} 
        onChange={setActiveTab}
        className="mb-8"
        items={categories.map(cat => ({
          key: cat.key,
          label: (
            <span className="flex items-center">
              {cat.icon}
              <span className="ml-2">{cat.label}</span>
            </span>
          )
        }))}
      >
        <TabPane tab="Tất cả" key="1">
          {renderModernNewsList()}
        </TabPane>
        
        <TabPane tab="Nguyên liệu" key="2">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {newsData.ingredients.filter(filterNews).map((news, index) => (
              <ModernNewsCard key={news.id} news={news} index={index} />
            ))}
          </div>
        </TabPane>
        
        <TabPane tab="Công thức" key="3">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {newsData.recipes.filter(filterNews).map((news, index) => (
              <ModernNewsCard key={news.id} news={news} index={index} />
            ))}
          </div>
        </TabPane>
        
        <TabPane tab="Xu hướng" key="4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {newsData.trends.filter(filterNews).map((news, index) => (
              <ModernNewsCard key={news.id} news={news} index={index} />
            ))}
          </div>
        </TabPane>
      </Tabs>

      <Row gutter={24}>
        <Col xs={24} lg={16}>
          {renderMainNews()}
          {renderMostViewed()}
        </Col>
        <Col xs={24} lg={8}>
          <div className="sticky top-4">
            <Search
              placeholder="Tìm kiếm tin tức..."
              allowClear
              enterButton
              size="large"
              className="mb-6"
              onChange={(e) => setSearchText(e.target.value)}
            />
            {renderLatestNews()}
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default News;