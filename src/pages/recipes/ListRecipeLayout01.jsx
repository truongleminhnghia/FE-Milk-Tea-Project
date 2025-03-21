import React, { useState, useEffect } from 'react'
import { Row, Col, Input, Select, Button, Pagination, Empty, Skeleton, Tag, Divider } from 'antd'
import CardRecipeComponent from '../../components/ui/carts/CardRecipeComponent'
import { Icon } from '@iconify/react'

const { Search } = Input;
const { Option } = Select;

// Mock data in the same format as product API response
const mockRecipeData = {
  data: [
    {
      id: 1,
      title: "Công thức pha chế trà Lê hồng đào",
      image: "/images/recipes/image.png",
      createdDate: "01-01-2024",
      description: "Trà Lê Hồng Đào không chỉ là một món đồ uống thơm ngon để thưởng thức trong những ngày xuân, mà còn mang lại nhiều ý nghĩa về mặt tinh thần và sức khỏe. Để pha chế được một ly trà hoàn hảo, việc chọn lựa nguyên liệu chất lượng là rất quan trọng.",
      category: "Trà",
      tags: ["Trà", "Hồng đào", "Dễ làm"]
    },
    {
      id: 2,
      title: "Cách làm Trà sữa trân châu đường đen",
      image: "/images/recipes/image.png",
      createdDate: "15-01-2024",
      description: "Trà sữa trân châu đường đen là một trong những loại đồ uống được ưa chuộng trong những năm gần đây. Hương vị béo ngậy của sữa, vị đắng nhẹ của trà đen kết hợp với vị ngọt của đường đen tạo nên một hương vị độc đáo.",
      category: "Trà sữa",
      tags: ["Trà sữa", "Trân châu", "Đường đen"]
    },
    {
      id: 3,
      title: "Sinh tố dâu tây sữa chua",
      image: "/images/recipes/image.png",
      createdDate: "20-01-2024",
      description: "Sinh tố dâu tây sữa chua là món đồ uống tuyệt vời cho những ngày hè nóng bức. Vị chua ngọt của dâu tây kết hợp với vị béo của sữa chua tạo nên một hương vị tươi mát, giải nhiệt hiệu quả.",
      category: "Sinh tố",
      tags: ["Sinh tố", "Dâu tây", "Sữa chua"]
    },
    {
      id: 4,
      title: "Cà phê dừa Đà Nẵng",
      image: "/images/recipes/image.png",
      createdDate: "25-01-2024",
      description: "Cà phê dừa Đà Nẵng là một biến thể độc đáo của cà phê Việt Nam. Sự kết hợp giữa vị đắng của cà phê và vị béo ngậy của kem dừa tạo nên một hương vị khó quên.",
      category: "Cà phê",
      tags: ["Cà phê", "Dừa", "Đà Nẵng"]
    },
    {
      id: 5,
      title: "Sữa chua trân châu dâu tây",
      image: "/images/recipes/image.png",
      createdDate: "01-02-2024",
      description: "Sữa chua trân châu dâu tây là món đồ uống mát lạnh, chua ngọt, kết hợp giữa sữa chua, trân châu và dâu tây tạo nên hương vị thơm ngon, bổ dưỡng.",
      category: "Sữa chua",
      tags: ["Sữa chua", "Trân châu", "Dâu tây"]
    },
    {
      id: 6,
      title: "Nước ép táo cà rốt",
      image: "/images/recipes/image.png",
      createdDate: "10-02-2024",
      description: "Nước ép táo cà rốt là thức uống giàu dinh dưỡng, giúp tăng cường sức khỏe và làm đẹp da. Đây là lựa chọn lý tưởng cho những người muốn detox và giảm cân.",
      category: "Nước ép",
      tags: ["Nước ép", "Táo", "Cà rốt"]
    },
    {
      id: 7,
      title: "Matcha đá xay",
      image: "/images/recipes/image.png",
      createdDate: "15-02-2024",
      description: "Matcha đá xay là thức uống có màu xanh đặc trưng, vị đắng nhẹ của trà xanh kết hợp với vị ngọt của sữa và kem tạo nên một hương vị hấp dẫn.",
      category: "Đá xay",
      tags: ["Matcha", "Đá xay", "Trà xanh"]
    },
    {
      id: 8,
      title: "Smoothie chuối sữa chua",
      image: "/images/recipes/image.png",
      createdDate: "20-02-2024",
      description: "Smoothie chuối sữa chua là món đồ uống bổ dưỡng, dễ làm, phù hợp cho bữa sáng hoặc sau khi tập luyện. Vị ngọt tự nhiên từ chuối kết hợp với vị chua của sữa chua tạo nên hương vị thơm ngon.",
      category: "Smoothie",
      tags: ["Smoothie", "Chuối", "Sữa chua"]
    }
  ],
  total: 8,
  message: "Success",
  code: 200
};

// Categories for filter
const CATEGORIES = [
  { value: "all", label: "Tất cả" },
  { value: "Trà", label: "Trà" },
  { value: "Trà sữa", label: "Trà sữa" },
  { value: "Sinh tố", label: "Sinh tố" },
  { value: "Cà phê", label: "Cà phê" },
  { value: "Sữa chua", label: "Sữa chua" },
  { value: "Nước ép", label: "Nước ép" },
  { value: "Đá xay", label: "Đá xay" },
  { value: "Smoothie", label: "Smoothie" }
];

const ListRecipeLayout01 = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [params, setParams] = useState({
    status: null,
    minPrice: null,
    maxPrice: null,
    isSale: null,
    isDescending: null,
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
  const [selectedTags, setSelectedTags] = useState([]);
  const [sortBy, setSortBy] = useState('newest');

  // Popular tags
  const popularTags = [
    "Trà", "Trân châu", "Sữa chua", "Đá xay", "Cà phê", "Dâu tây", "Matcha"
  ];

  // Fetch recipes (simulating API call)
  const fetchRecipes = async () => {
    setLoading(true);
    
    // Simulate API delay
    setTimeout(() => {
      try {
        // Mock API response formatting similar to product API
        let filteredRecipes = [...mockRecipeData.data];
        
        // Apply category filter
        if (params.categoryId) {
          filteredRecipes = filteredRecipes.filter(recipe => recipe.category === params.categoryId);
        }
        
        // Apply search filter
        if (params.search) {
          const searchLower = params.search.toLowerCase();
          filteredRecipes = filteredRecipes.filter(recipe => 
            recipe.title.toLowerCase().includes(searchLower) || 
            recipe.description.toLowerCase().includes(searchLower)
          );
        }
        
        // Apply tag filter
        if (selectedTags.length > 0) {
          filteredRecipes = filteredRecipes.filter(recipe => 
            selectedTags.some(tag => recipe.tags.includes(tag))
          );
        }
        
        // Apply sorting - similar to how product sorting would work
        if (sortBy === 'newest') {
          filteredRecipes.sort((a, b) => new Date(b.createdDate) - new Date(a.createdDate));
        } else if (sortBy === 'oldest') {
          filteredRecipes.sort((a, b) => new Date(a.createdDate) - new Date(b.createdDate));
        } else if (sortBy === 'az') {
          filteredRecipes.sort((a, b) => a.title.localeCompare(b.title));
        } else if (sortBy === 'za') {
          filteredRecipes.sort((a, b) => b.title.localeCompare(a.title));
        }
        
        const total = filteredRecipes.length;
        
        // Apply pagination (similar to product API response structure)
        const start = (params.paging.pageCurrent - 1) * params.paging.pageSize;
        const paginatedRecipes = filteredRecipes.slice(start, start + params.paging.pageSize);
        
        // Update state with paginated data and total count
        setRecipes(paginatedRecipes);
        setParams(prev => ({
          ...prev,
          paging: {
            ...prev.paging,
            total: total
          }
        }));
        
      } catch (error) {
        console.error("Error fetching recipes:", error);
      } finally {
        setLoading(false);
      }
    }, 800);
  };

  useEffect(() => {
    fetchRecipes();
  }, [params.paging.pageCurrent, params.paging.pageSize, params.search, params.categoryId, sortBy, selectedTags]);

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

  const handleTagClick = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
    
    setParams(prev => ({
      ...prev,
      paging: {
        ...prev.paging,
        pageCurrent: 1
      }
    }));
  };

  const clearFilters = () => {
    setParams({
      status: null,
      minPrice: null,
      maxPrice: null,
      isSale: null,
      isDescending: null,
      categoryId: null,
      search: null,
      startDate: null,
      endDate: null,
      paging: {
        pageCurrent: 1,
        pageSize: 8,
        total: mockRecipeData.total,
      }
    });
    setSelectedTags([]);
    setSortBy('newest');
  };

  return (
    <div className="container mx-auto py-8 px-4">
      {/* Page Header */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Công thức pha chế đồ uống</h1>
        <p className="text-gray-600 max-w-3xl mx-auto">
          Khám phá các công thức pha chế đồ uống độc đáo và thơm ngon. Từ trà sữa, cà phê đến sinh tố và nước ép trái cây.
        </p>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-8">
        <Row gutter={[16, 16]} className="items-center">
          <Col xs={24} md={10} lg={8}>
            <Search
              placeholder="Tìm kiếm công thức..."
              value={params.search || ''}
              onChange={(e) => setParams(prev => ({ ...prev, search: e.target.value }))}
              onSearch={handleSearch}
              className="w-full"
              allowClear
            />
          </Col>
          <Col xs={24} md={7} lg={6}>
            <Select
              placeholder="Danh mục"
              className="w-full"
              value={params.categoryId || 'all'}
              onChange={handleCategoryChange}
            >
              {CATEGORIES.map(cat => (
                <Option key={cat.value} value={cat.value}>{cat.label}</Option>
              ))}
            </Select>
          </Col>
          <Col xs={24} md={7} lg={6}>
            <Select
              placeholder="Sắp xếp theo"
              className="w-full"
              value={sortBy}
              onChange={handleSortChange}
            >
              <Option value="newest">Mới nhất</Option>
              <Option value="oldest">Cũ nhất</Option>
              <Option value="az">A-Z</Option>
              <Option value="za">Z-A</Option>
            </Select>
          </Col>
          {(params.search || params.categoryId || selectedTags.length > 0 || sortBy !== 'newest') && (
            <Col xs={24} lg={4} className="flex justify-end">
              <Button 
                onClick={clearFilters}
                icon={<Icon icon="mdi:filter-remove" width="16" height="16" />}
              >
                Xóa bộ lọc
              </Button>
            </Col>
          )}
        </Row>

        {/* Tags */}
        <div className="mt-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm text-gray-600 font-medium">Tags phổ biến:</span>
            {popularTags.map(tag => (
              <Tag 
                key={tag}
                className={`cursor-pointer transition-all ${
                  selectedTags.includes(tag) 
                    ? 'bg-[#29aae1] text-white border-[#29aae1]' 
                    : 'text-gray-600 hover:text-[#29aae1] hover:border-[#29aae1]'
                }`}
                onClick={() => handleTagClick(tag)}
              >
                {tag}
              </Tag>
            ))}
          </div>
        </div>
      </div>

      {/* Recipe Grid */}
      {loading ? (
        <Row gutter={[24, 24]}>
          {Array(params.paging.pageSize).fill(null).map((_, index) => (
            <Col xs={24} sm={12} md={8} lg={6} key={`skeleton-${index}`}>
              <div className="bg-white rounded-lg shadow-sm p-4 h-full">
                <Skeleton.Image active className="w-full h-[180px]" />
                <Skeleton active paragraph={{ rows: 3 }} className="mt-4" />
              </div>
            </Col>
          ))}
        </Row>
      ) : recipes.length > 0 ? (
        <>
          <Row gutter={[24, 24]}>
            {recipes.map(recipe => (
              <Col xs={24} sm={12} md={8} lg={6} key={recipe.id}>
                <CardRecipeComponent recipe={recipe} />
              </Col>
            ))}
          </Row>
          
          {/* Filter Summary */}
          {params.paging.total > 0 && (
            <div className="mt-6 text-gray-600 text-sm">
              Hiển thị {Math.min(params.paging.pageSize, recipes.length)} trên {params.paging.total} công thức
              {params.categoryId && <span> trong danh mục <b>{params.categoryId}</b></span>}
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
                Không tìm thấy công thức nào 
                {params.search && <span> phù hợp với từ khóa "<b>{params.search}</b>"</span>}
                {params.categoryId && <span> trong danh mục <b>{params.categoryId}</b></span>}
                {selectedTags.length > 0 && (
                  <span> với tags <b>{selectedTags.join(', ')}</b></span>
                )}
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
      
      {/* About Section */}
      <div className="mt-16">
        <Divider />
        <div className="py-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Công thức độc đáo cho quán trà sữa của bạn</h2>
          <Row gutter={24} className="items-center">
            <Col xs={24} md={14}>
              <p className="text-gray-600 mb-4">
                Tại đây, chúng tôi cung cấp các công thức pha chế đồ uống chuyên nghiệp, được nghiên cứu và kiểm chứng bởi các chuyên gia pha chế hàng đầu. Mỗi công thức đều được thiết kế tỉ mỉ, cân đối hương vị và dễ dàng thực hiện.
              </p>
              <p className="text-gray-600 mb-4">
                Bạn có thể tìm thấy các công thức từ cơ bản đến nâng cao, phù hợp với nhu cầu kinh doanh của quán trà sữa, cà phê hay nước giải khát. Chúng tôi thường xuyên cập nhật công thức mới theo xu hướng thị trường.
              </p>
              <Button 
                type="primary" 
                className="bg-[#29aae1] border-[#29aae1] hover:bg-[#1d8dba] hover:border-[#1d8dba]"
                icon={<Icon icon="mdi:book-open-variant" width="18" height="18" />}
              >
                Xem hướng dẫn chi tiết
              </Button>
            </Col>
            <Col xs={24} md={10} className="mt-6 md:mt-0">
              <img 
                src="/images/recipes/image.png" 
                alt="Công thức pha chế" 
                className="rounded-lg w-full shadow-md"
              />
            </Col>
          </Row>
        </div>
      </div>
    </div>
  )
}

export default ListRecipeLayout01
