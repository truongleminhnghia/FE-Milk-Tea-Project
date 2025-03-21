import React, { useState, useEffect } from 'react'
import { Row, Col, Input, Select, Button, Pagination, Empty, Skeleton, Tag, Card, Badge, Divider } from 'antd'
import { Icon } from '@iconify/react'

const { Search } = Input;
const { Option } = Select;
const { Meta } = Card;

// Mock data in the same format as product API response
const mockPromotionData = {
  data: [
    {
      id: 1,
      title: "Mua 1 tặng 1 - Thứ 2 hàng tuần",
      image: "/images/promotions/promotion-1.jpg",
      startDate: "2024-07-01",
      endDate: "2024-07-31",
      description: "Áp dụng cho tất cả các loại trà sữa kích thước M vào thứ 2 hàng tuần từ 10:00 - 12:00",
      discountPercent: 100,
      discountAmount: 0,
      minOrderValue: 50000,
      status: "active",
      category: "Mua 1 tặng 1"
    },
    {
      id: 2,
      title: "Giảm 30% cho đơn từ 100K",
      image: "/images/promotions/promotion-2.jpg",
      startDate: "2024-07-15",
      endDate: "2024-08-15",
      description: "Giảm 30% cho đơn hàng có giá trị từ 100.000đ khi đặt hàng qua ứng dụng",
      discountPercent: 30,
      discountAmount: 0,
      minOrderValue: 100000,
      status: "active",
      category: "Giảm giá"
    },
    {
      id: 3,
      title: "Sinh nhật giảm 50%",
      image: "/images/promotions/promotion-3.jpg",
      startDate: "2024-01-01",
      endDate: "2024-12-31",
      description: "Giảm 50% cho một đồ uống bất kỳ vào ngày sinh nhật khách hàng. Áp dụng khi xuất trình CCCD hoặc giấy tờ tùy thân.",
      discountPercent: 50,
      discountAmount: 0,
      minOrderValue: 0,
      status: "active",
      category: "Sinh nhật"
    },
    {
      id: 4,
      title: "Flash Sale - Thứ 6 cuối tháng",
      image: "/images/promotions/promotion-4.jpg",
      startDate: "2024-07-26",
      endDate: "2024-07-26",
      description: "Giảm giá sốc 50% cho tất cả các đồ uống từ 14:00-16:00 vào thứ 6 cuối tháng",
      discountPercent: 50,
      discountAmount: 0,
      minOrderValue: 0,
      status: "upcoming",
      category: "Flash Sale"
    },
    {
      id: 5,
      title: "Khách hàng mới - Giảm 20K",
      image: "/images/promotions/promotion-5.jpg",
      startDate: "2024-07-01",
      endDate: "2024-09-30",
      description: "Giảm 20.000đ cho đơn hàng đầu tiên của khách hàng mới, không áp dụng điều kiện giá trị đơn hàng tối thiểu",
      discountPercent: 0,
      discountAmount: 20000,
      minOrderValue: 0,
      status: "active",
      category: "Khách hàng mới"
    },
    {
      id: 6,
      title: "Combo đôi - Tiết kiệm 25%",
      image: "/images/promotions/promotion-6.jpg",
      startDate: "2024-06-01",
      endDate: "2024-08-31",
      description: "Mua combo 2 đồ uống bất kỳ và 1 bánh ngọt, tiết kiệm 25% tổng hóa đơn",
      discountPercent: 25,
      discountAmount: 0,
      minOrderValue: 0,
      status: "active",
      category: "Combo"
    },
    {
      id: 7,
      title: "Happy Hour - Giảm 15% buổi chiều",
      image: "/images/promotions/promotion-7.jpg",
      startDate: "2024-05-01",
      endDate: "2024-10-31",
      description: "Giảm 15% cho tất cả đơn hàng từ 14:00-17:00 hàng ngày",
      discountPercent: 15,
      discountAmount: 0,
      minOrderValue: 0,
      status: "active",
      category: "Happy Hour"
    },
    {
      id: 8,
      title: "Tháng tri ân - Tặng upsize",
      image: "/images/promotions/promotion-8.jpg",
      startDate: "2024-08-01",
      endDate: "2024-08-31",
      description: "Miễn phí upsize từ size M lên size L cho mọi đồ uống trong tháng 8/2024",
      discountPercent: 0,
      discountAmount: 0,
      minOrderValue: 0,
      status: "upcoming",
      category: "Quà tặng"
    },
  ],
  total: 8,
  message: "Success",
  code: 200
};

// Categories for filter
const CATEGORIES = [
  { value: "all", label: "Tất cả" },
  { value: "Mua 1 tặng 1", label: "Mua 1 tặng 1" },
  { value: "Giảm giá", label: "Giảm giá" },
  { value: "Sinh nhật", label: "Sinh nhật" },
  { value: "Flash Sale", label: "Flash Sale" },
  { value: "Khách hàng mới", label: "Khách hàng mới" },
  { value: "Combo", label: "Combo" },
  { value: "Happy Hour", label: "Happy Hour" },
  { value: "Quà tặng", label: "Quà tặng" }
];

// Status options
const STATUS_OPTIONS = [
  { value: "all", label: "Tất cả" },
  { value: "active", label: "Đang diễn ra" },
  { value: "upcoming", label: "Sắp diễn ra" },
  { value: "expired", label: "Đã kết thúc" }
];

const PromotionListLayout1 = () => {
  const [promotions, setPromotions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [params, setParams] = useState({
    status: null,
    categoryId: null,
    search: null,
    startDate: null,
    endDate: null,
    paging: {
      pageCurrent: 1,
      pageSize: 8,
      total: 0,
    }
  });

  // Additional state for UI purposes
  const [sortBy, setSortBy] = useState('newest');

  // Fetch promotions (simulating API call)
  const fetchPromotions = async () => {
    setLoading(true);
    
    // Simulate API delay
    setTimeout(() => {
      try {
        // Mock API response formatting similar to product API
        let filteredPromotions = [...mockPromotionData.data];
        
        // Apply category filter
        if (params.categoryId) {
          filteredPromotions = filteredPromotions.filter(promo => promo.category === params.categoryId);
        }
        
        // Apply status filter
        if (params.status) {
          filteredPromotions = filteredPromotions.filter(promo => promo.status === params.status);
        }
        
        // Apply search filter
        if (params.search) {
          const searchLower = params.search.toLowerCase();
          filteredPromotions = filteredPromotions.filter(promo => 
            promo.title.toLowerCase().includes(searchLower) || 
            promo.description.toLowerCase().includes(searchLower)
          );
        }
        
        // Apply sorting
        if (sortBy === 'newest') {
          filteredPromotions.sort((a, b) => new Date(b.startDate) - new Date(a.startDate));
        } else if (sortBy === 'endingSoon') {
          filteredPromotions.sort((a, b) => new Date(a.endDate) - new Date(b.endDate));
        } else if (sortBy === 'discountHighToLow') {
          filteredPromotions.sort((a, b) => (b.discountPercent || 0) - (a.discountPercent || 0));
        }
        
        const total = filteredPromotions.length;
        
        // Apply pagination
        const start = (params.paging.pageCurrent - 1) * params.paging.pageSize;
        const paginatedPromotions = filteredPromotions.slice(start, start + params.paging.pageSize);
        
        // Update state with paginated data and total count
        setPromotions(paginatedPromotions);
        setParams(prev => ({
          ...prev,
          paging: {
            ...prev.paging,
            total: total
          }
        }));
        
      } catch (error) {
        console.error("Error fetching promotions:", error);
      } finally {
        setLoading(false);
      }
    }, 800);
  };

  useEffect(() => {
    fetchPromotions();
  }, [params.paging.pageCurrent, params.paging.pageSize, params.search, params.categoryId, params.status, sortBy]);

  const handleSearch = (value) => {
    setParams(prev => ({
      ...prev,
      search: value,
      paging: {
        ...prev.paging,
        pageCurrent: 1
      }
    }));
  };

  const handleCategoryChange = (value) => {
    setParams(prev => ({
      ...prev,
      categoryId: value === 'all' ? null : value,
      paging: {
        ...prev.paging,
        pageCurrent: 1
      }
    }));
  };

  const handleStatusChange = (value) => {
    setParams(prev => ({
      ...prev,
      status: value === 'all' ? null : value,
      paging: {
        ...prev.paging,
        pageCurrent: 1
      }
    }));
  };

  const handleSortChange = (value) => {
    setSortBy(value);
  };

  const handlePageChange = (page) => {
    setParams(prev => ({
      ...prev,
      paging: {
        ...prev.paging,
        pageCurrent: page
      }
    }));
  };

  const clearFilters = () => {
    setParams({
      status: null,
      categoryId: null,
      search: null,
      startDate: null,
      endDate: null,
      paging: {
        pageCurrent: 1,
        pageSize: 8,
        total: mockPromotionData.total,
      }
    });
    setSortBy('newest');
  };

  // Format date for display
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('vi-VN', options);
  };

  // Get status badge
  const getStatusBadge = (status) => {
    switch (status) {
      case 'active':
        return <Badge status="success" text="Đang diễn ra" />;
      case 'upcoming':
        return <Badge status="processing" text="Sắp diễn ra" />;
      case 'expired':
        return <Badge status="default" text="Đã kết thúc" />;
      default:
        return null;
    }
  };

  // Format discount for display
  const formatDiscount = (promotion) => {
    if (promotion.discountPercent > 0) {
      return `Giảm ${promotion.discountPercent}%`;
    } else if (promotion.discountAmount > 0) {
      return `Giảm ${promotion.discountAmount.toLocaleString('vi-VN')}đ`;
    } else if (promotion.category === 'Mua 1 tặng 1') {
      return 'Mua 1 tặng 1';
    } else if (promotion.category === 'Quà tặng') {
      return 'Quà tặng';
    }
    return 'Khuyến mãi';
  };

  return (
    <div className="container mx-auto py-8 px-4">
      {/* Page Header */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Ưu đãi đặc biệt</h1>
        <p className="text-gray-600 max-w-3xl mx-auto">
          Khám phá các chương trình khuyến mãi hấp dẫn từ TeaShop. Từ ưu đãi mua 1 tặng 1, giảm giá đến các chương trình đặc biệt dành cho khách hàng thân thiết.
        </p>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-8">
        <Row gutter={[16, 16]} className="items-center">
          <Col xs={24} md={8} lg={7}>
            <Search
              placeholder="Tìm khuyến mãi..."
              value={params.search || ''}
              onChange={(e) => setParams(prev => ({ ...prev, search: e.target.value }))}
              onSearch={handleSearch}
              className="w-full"
              allowClear
            />
          </Col>
          <Col xs={12} md={5} lg={5}>
            <Select
              placeholder="Loại khuyến mãi"
              className="w-full"
              value={params.categoryId || 'all'}
              onChange={handleCategoryChange}
            >
              {CATEGORIES.map(cat => (
                <Option key={cat.value} value={cat.value}>{cat.label}</Option>
              ))}
            </Select>
          </Col>
          <Col xs={12} md={5} lg={4}>
            <Select
              placeholder="Trạng thái"
              className="w-full"
              value={params.status || 'all'}
              onChange={handleStatusChange}
            >
              {STATUS_OPTIONS.map(opt => (
                <Option key={opt.value} value={opt.value}>{opt.label}</Option>
              ))}
            </Select>
          </Col>
          <Col xs={12} md={6} lg={5}>
            <Select
              placeholder="Sắp xếp theo"
              className="w-full"
              value={sortBy}
              onChange={handleSortChange}
            >
              <Option value="newest">Mới nhất</Option>
              <Option value="endingSoon">Sắp kết thúc</Option>
              <Option value="discountHighToLow">Giảm giá cao nhất</Option>
            </Select>
          </Col>
          {(params.search || params.categoryId || params.status || sortBy !== 'newest') && (
            <Col xs={12} lg={3} className="flex justify-end">
              <Button 
                onClick={clearFilters}
                icon={<Icon icon="mdi:filter-remove" width="16" height="16" />}
              >
                Xóa bộ lọc
              </Button>
            </Col>
          )}
        </Row>
      </div>

      {/* Promotions Grid */}
      {loading ? (
        <Row gutter={[24, 24]}>
          {Array(params.paging.pageSize).fill(null).map((_, index) => (
            <Col xs={24} sm={12} md={8} lg={6} key={`skeleton-${index}`}>
              <div className="bg-white rounded-lg shadow-sm h-full">
                <Skeleton.Image active className="w-full h-[200px]" />
                <div className="p-4">
                  <Skeleton active paragraph={{ rows: 3 }} />
                </div>
              </div>
            </Col>
          ))}
        </Row>
      ) : promotions.length > 0 ? (
        <>
          <Row gutter={[24, 24]}>
            {promotions.map(promotion => (
              <Col xs={24} sm={12} md={8} lg={6} key={promotion.id}>
                <Card
                  hoverable
                  className="h-full overflow-hidden transition-all duration-300 hover:shadow-md"
                  cover={
                    <div className="relative overflow-hidden h-[200px]">
                      <img 
                        alt={promotion.title} 
                        src={promotion.image} 
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                      />
                      <div className="absolute top-0 right-0 m-3">
                        <Tag className="font-medium" color={promotion.status === 'active' ? 'success' : promotion.status === 'upcoming' ? 'blue' : 'default'}>
                          {promotion.status === 'active' ? 'Đang diễn ra' : promotion.status === 'upcoming' ? 'Sắp diễn ra' : 'Đã kết thúc'}
                        </Tag>
                      </div>
                      <div className="absolute top-0 left-0 m-3">
                        <Tag color="#29aae1" className="font-bold">
                          {formatDiscount(promotion)}
                        </Tag>
                      </div>
                    </div>
                  }
                >
                  <Meta
                    title={promotion.title}
                    description={
                      <div className="mt-2">
                        <p className="text-gray-600 text-sm mb-2 line-clamp-2">{promotion.description}</p>
                        <div className="mt-3 text-sm text-gray-500">
                          <div className="flex items-center mb-1">
                            <Icon icon="mdi:calendar-range" className="mr-2" />
                            <span>{formatDate(promotion.startDate)} - {formatDate(promotion.endDate)}</span>
                          </div>
                          {promotion.minOrderValue > 0 && (
                            <div className="flex items-center">
                              <Icon icon="mdi:cart-outline" className="mr-2" />
                              <span>Đơn tối thiểu: {promotion.minOrderValue.toLocaleString('vi-VN')}đ</span>
                            </div>
                          )}
                        </div>
                        <Button type="primary" className="mt-4 w-full bg-[#29aae1] hover:bg-[#1d8dba]">
                          Xem chi tiết
                        </Button>
                      </div>
                    }
                  />
                </Card>
              </Col>
            ))}
          </Row>
          
          {/* Filter Summary */}
          {params.paging.total > 0 && (
            <div className="mt-6 text-gray-600 text-sm">
              Hiển thị {Math.min(params.paging.pageSize, promotions.length)} trên {params.paging.total} khuyến mãi
              {params.categoryId && <span> trong loại <b>{params.categoryId}</b></span>}
              {params.status && <span> có trạng thái <b>{params.status === 'active' ? 'đang diễn ra' : params.status === 'upcoming' ? 'sắp diễn ra' : 'đã kết thúc'}</b></span>}
              {params.search && <span> phù hợp với tìm kiếm <b>"{params.search}"</b></span>}
            </div>
          )}
          
          {/* Pagination */}
          <div className="mt-8 flex justify-center">
            <Pagination
              current={params.paging.pageCurrent}
              pageSize={params.paging.pageSize}
              total={params.paging.total}
              onChange={handlePageChange}
              showSizeChanger={false}
            />
          </div>
        </>
      ) : (
        <div className="py-16">
          <Empty 
            description={
              <span className="text-gray-500">
                Không tìm thấy khuyến mãi nào 
                {params.search && <span> phù hợp với từ khóa "<b>{params.search}</b>"</span>}
                {params.categoryId && <span> trong loại <b>{params.categoryId}</b></span>}
                {params.status && <span> có trạng thái <b>{params.status === 'active' ? 'đang diễn ra' : params.status === 'upcoming' ? 'sắp diễn ra' : 'đã kết thúc'}</b></span>}
              </span>
            } 
          />
          <div className="mt-4 flex justify-center">
            <Button type="primary" onClick={clearFilters} className="bg-[#29aae1] hover:bg-[#1d8dba]">
              Xóa bộ lọc
            </Button>
          </div>
        </div>
      )}
      
      {/* Info Section */}
      <div className="mt-16">
        <Divider />
        <div className="py-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Chương trình ưu đãi hấp dẫn</h2>
          <Row gutter={24} className="items-center">
            <Col xs={24} md={14}>
              <p className="text-gray-600 mb-4">
                Tại TeaShop, chúng tôi luôn mang đến những chương trình ưu đãi hấp dẫn dành cho khách hàng. Từ các chương trình mua 1 tặng 1, giảm giá đặc biệt cho khách hàng mới, đến các ưu đãi sinh nhật và happy hour hàng ngày.
              </p>
              <p className="text-gray-600 mb-4">
                Đặc biệt, khách hàng thành viên sẽ được tích lũy điểm thưởng cho mỗi giao dịch và nhận thêm nhiều đặc quyền. Hãy đăng ký tài khoản thành viên để không bỏ lỡ các ưu đãi độc quyền!
              </p>
              <div className="flex flex-wrap gap-3">
                <Button 
                  type="primary" 
                  className="bg-[#29aae1] border-[#29aae1] hover:bg-[#1d8dba] hover:border-[#1d8dba]"
                  icon={<Icon icon="mdi:account-plus" width="18" height="18" />}
                >
                  Đăng ký thành viên
                </Button>
                <Button
                  icon={<Icon icon="mdi:information-outline" width="18" height="18" />}
                >
                  Điều khoản áp dụng
                </Button>
              </div>
            </Col>
            <Col xs={24} md={10} className="mt-6 md:mt-0">
              <img 
                src="/images/promotions/promotion-banner.jpg" 
                alt="Khuyến mãi" 
                className="rounded-lg w-full shadow-md"
              />
            </Col>
          </Row>
        </div>
      </div>
    </div>
  )
}

export default PromotionListLayout1