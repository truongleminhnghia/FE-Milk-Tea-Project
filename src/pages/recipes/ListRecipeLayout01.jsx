import React, { useState, useEffect } from 'react';
import { Row, Col, Input, Select, Button, Pagination, Empty, Skeleton, Tag, Divider } from 'antd';
import { Icon } from '@iconify/react';
import CardRecipeComponent from '../../components/ui/carts/CardRecipeComponent';
import { getByListSerivce } from '../../services/recipe.service'; 

const { Search } = Input;
const { Option } = Select;

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
    categoryId: null,
    search: null,
    paging: {
      pageCurrent: 1,
      pageSize: 8,
      total: 0
    }
  });

  const [selectedTags, setSelectedTags] = useState([]);
  const [sortBy, setSortBy] = useState('newest');

  
  const fetchRecipes = async () => {
    setLoading(true);
    try {
      const res = await getByListSerivce(params); 
      if (res) {
        setRecipes(res?.data?.data || []); 
        console.log(res?.data?.data);
        setParams(prev => ({
          ...prev,
          paging: {
            ...prev.paging,
            total: res?.data?.data.total || 0
          }
        }));
      }
    } catch (error) {
      console.error("Error fetching recipes:", error);
    } finally {
      setLoading(false);
    }
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
      categoryId: null,
      search: null,
      paging: {
        pageCurrent: 1,
        pageSize: 8,
        total: 0
      }
    });
    setSelectedTags([]);
    setSortBy('newest');
  };

  return (
    <div className="container mx-auto py-8 px-4">
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
              <Button onClick={clearFilters} icon={<Icon icon="mdi:filter-remove" width="16" height="16" />}>
                Xóa bộ lọc
              </Button>
            </Col>
          )}
        </Row>
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
        <Row gutter={[24, 24]}>
          {recipes.map(recipe => (
            <Col xs={24} sm={12} md={8} lg={6} key={recipe.id}>
              <CardRecipeComponent recipe={recipe} />
            </Col>
          ))}
        </Row>
      ) : (
        <div className="py-16">
          <Empty description="Không tìm thấy công thức nào" />
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
    </div>
  );
};

export default ListRecipeLayout01;
