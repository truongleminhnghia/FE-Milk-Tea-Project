import React, { useEffect, useState } from 'react'
import { Button, Checkbox, Col, Input, Pagination, Row, Select, Spin, Empty } from 'antd'
import BreadcrumbItem from '../../components/navigations/BreadcrumbComponent'
import { SearchOutlined } from '@ant-design/icons'
import { getByListSerivce } from '../../services/product.service';
import { getByListSerivce as getCategoryService } from '../../services/category.service'; 
import { handleKeyDown } from '../../utils/utils'
import CardProductComponent from '../../components/ui/carts/CardProductComponent';

const ListProduct = () => {
  const [isLoading, setisLoading] = useState(false);
  const [listIngredient, setListIngredient] = useState([]);
  const [categories, setCategories] = useState([]); 
  const [receivedMessage, setReceivedMessage] = useState("");
  const [params, setParams] = useState({
    categoryId: null,
    supplier: null,
    status: null,
    isSale: null,
    search: null,
    startDate: null,
    endDate: null,
    minPrice: null,
    maxPrice: null,
    paging: {
      pageCurrent: 1,
      pageSize: 12,
      total: 0,
    }
  });

  const fetchCategories = async () => {
    try {
      const params = {
        _field: "Id,CategoryName",
        categoryStatus: "ACTIVE",
        categoryType: "CATEGORY_PRODUCT"
      };
      const res = await getCategoryService(params);
      if (res?.data) {
        const formatCategories = res.data.map((item) => ({
          label: item.CategoryName,
          value: item.Id
        }));
        setCategories(formatCategories);
      }
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  useEffect(() => {
    fetchCategories(); 
    fetchIngredient(params); 
  }, [JSON.stringify(params)]);

  const fetchIngredient = async (params) => {
    try {
      setisLoading(true);
      const param = {
        pageCurrent: params.paging.pageCurrent,
        pageSize: params.paging.pageSize,
        status: params.status,
        categoryId: params.categoryId,
        search: params.search,
        startDate: params.startDate,
        endDate: params.endDate,
        minPrice: params.minPrice,
        maxPrice: params.maxPrice,
        isSale: params.isSale,
        supplier: params.supplier,
        sortBy: params.sortBy,
        isDescending: params.isDescending
      };
      const res = await getByListSerivce(param);
      if (res?.data) {
        setListIngredient(res?.data.data);
        setParams((prev) => ({
          ...prev,
          paging: {
            ...prev.paging,
            total: res.data.total || 0,
          }
        }));
      }
    } catch (error) {
      console.error("Error: ", error.message);
    } finally {
      setisLoading(false);
    }
  };

  const checkList = [
    { id: "1", label: "Tất cả" },
    { id: "2", label: "Còn hàng" },
    { id: "3", label: "Khuyến mãi" },
  ];

  const handleCategoryChange = (id) => {
    setParams((prev) => ({ ...prev, categoryId: id }));
  };

  const handleSupplierChange = (label) => {
    setParams((prev) => ({ ...prev, supplier: prev.supplier === label ? null : label }));
  };

  const handleStatusChange = (label) => {
    if (label === "Khuyến mãi") {
      setParams((prev) => ({ ...prev, isSale: prev.isSale ? null : true }));
    } else if (label === "Còn hàng") {
      setParams((prev) => ({ ...prev, status: prev.status === "ACTIVE" ? null : "ACTIVE" }));
    } else {
      setParams((prev) => ({ ...prev, status: null, isSale: null }));
    }
  };

  const handleSearch = (e) => {
    setParams((prev) => ({ ...prev, search: e.target.value }));
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchIngredient(params);
  };

  const handlePriceRangeChange = (value) => {
    const selectedRange = rangePrice.find(item => item.id === value);
    if (selectedRange) {
      setParams((prev) => ({ 
        ...prev, 
        minPrice: selectedRange.minVaule || null, 
        maxPrice: selectedRange.maxValue || null 
      }));
    }
  };

  const handleSortChange = (value) => {
    if (value === "1") { // Tăng dần
      setParams((prev) => ({ ...prev, sortBy: "priceOrigin", isDescending: false }));
    } else if (value === "2") { // Giảm dần
      setParams((prev) => ({ ...prev, sortBy: "priceOrigin", isDescending: true }));
    }
  };

  const uniqueSuppliers = listIngredient.length > 0 
    ? [...new Set(listIngredient.map(item => item.supplier))].map(supplier => ({ id: supplier, label: supplier }))
    : [
        { id: "1", label: "Wonderful" },
        { id: "2", label: "Gia Uy" },
        { id: "3", label: "Wings" },
        { id: "4", label: "KING" },
      ];

  const price = [
    { id: "1", label: "Tăng dần" },
    { id: "2", label: "Giảm dần" }
  ];

  const rangePrice = [
    { id: "1", label: "Từ 0 đến 100,000đ", minVaule: 0, maxValue: 100000 },
    { id: "2", label: "Từ 100,000đ đến 500,000đ", minVaule: 100000, maxValue: 500000 },
    { id: "3", label: "Từ 500,000đ đến 1,000,000đ", minVaule: 500000, maxValue: 1000000 },
    { id: "4", label: "Từ 1,000,000đ trở lên", minVaule: 1000000, maxValue: null },
  ];

  return (
    <div className="container">
      <Row className='py-2 w-full !mx-0'>
        <BreadcrumbItem items={[ { title: 'Trang chủ', href: '/' }, { title: 'Tất cả sản phẩm' }]} />
        <img className='w-full h-[180px] object-cover rounded-lg' src="/images/baners/collection_main_banner.webp" alt="Nguyên liệu pha chế đồ uống" />
      </Row>
      <Row className='rounded-lg w-full mt-4'>
        <Col span={18} push={6} className='bg-white py-4 px-4 rounded-lg shadow-sm'>
          <Row className='w-full h-auto mb-6 bg-slate-100 py-3 px-3 rounded-md'>
            <Col span={12}>
              <div className='flex gap-3'>
                <Button type={!params.sortBy ? "primary" : "default"} onClick={() => setParams(prev => ({...prev, sortBy: null}))}>Phổ biến</Button>
                <Button type={params.sortBy === "createAt" ? "primary" : "default"} 
                  onClick={() => setParams(prev => ({...prev, sortBy: "createAt", isDescending: true}))}>
                  Mới nhất
                </Button>
                <Select
                  className='w-[120px]'
                  placeholder="Sắp xếp giá"
                  options={price}
                  onChange={handleSortChange}
                />
              </div>
            </Col>
            <Col span={12}>
              <div className='flex gap-2 justify-end'>
                <Select
                  className='w-[200px]'
                  placeholder="Khoảng giá"
                  options={rangePrice}
                  onChange={handlePriceRangeChange}
                />
                <form onSubmit={handleSearchSubmit} className='flex'>
                  <Input 
                    placeholder="Tìm kiếm sản phẩm" 
                    value={params.search || ""} 
                    onChange={handleSearch}
                    prefix={<SearchOutlined />}
                    className="rounded-r-none"
                  />
                  <Button type="primary" htmlType="submit" className="rounded-l-none">
                    Tìm
                  </Button>
                </form>
              </div>
            </Col>
          </Row>

          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <Spin size="large" />
            </div>
          ) : listIngredient.length > 0 ? (
            <Row gutter={[16, 24]}>
              {listIngredient.map((item) => (
                <Col
                  span={6}
                  key={item.id}
                  className='transition-all hover:translate-y-[-5px]' >
                  <CardProductComponent item={item} className="h-full" />
                </Col>
              ))}
            </Row>
          ) : (
            <Empty description="Không tìm thấy sản phẩm nào" className="py-10" />
          )}
          
          {!isLoading && listIngredient.length > 0 && (
            <div className='py-4 mt-4'>
              <Pagination
                align="center"
                current={params.paging.pageCurrent}
                total={params.paging.total}
                pageSize={params.paging.pageSize}
                onChange={(page, pageSize) => {
                  setParams((prev) => ({
                    ...prev,
                    paging: {
                      ...prev.paging,
                      pageCurrent: page,
                      pageSize: pageSize,
                    }
                  }));
                }} />
            </div>
          )}
        </Col>
        <Col span={6} pull={18} className='w-full sticky top-20 max-h-[calc(100vh-140px)] overflow-auto pr-4'>
          <div className='bg-white w-full rounded-lg shadow-sm py-4'>
            <div className='py-2 px-4 w-full relative'>
              <h3 className='text-lg font-medium text-black'>Danh mục sản phẩm</h3>
              <div className='w-full border-[#e0e0e0] border-[1px] mt-2 mb-2'></div>
              <Select
                placeholder="Chọn danh mục"
                options={categories}
                value={params.categoryId}
                onChange={handleCategoryChange}
                className="w-full"
              />
            </div>
            <div className='py-2 px-4 w-full relative mt-2'>
              <h3 className='text-lg font-medium text-black'>Nhà sản xuất</h3>
              <div className='w-full border-[#e0e0e0] border-[1px] mt-2 mb-2'></div>
              <Select
                placeholder="Chọn nhà sản xuất"
                options={uniqueSuppliers}
                value={params.supplier}
                onChange={handleSupplierChange}
                className="w-full"
              />
            </div>
            <div className='py-2 px-4 w-full relative mt-2'>
              <h3 className='text-lg font-medium text-black'>Tình trạng</h3>
              <div className='w-full border-[#e0e0e0] border-[1px] mt-2 mb-2'></div>
              <Select
                placeholder="Chọn tình trạng"
                value={params.status || params.isSale}
                onChange={handleStatusChange}
                className="w-full"
              >
                {checkList.map(item => (
                  <Select.Option key={item.id} value={item.label}>
                    {item.label}
                  </Select.Option>
                ))}
              </Select>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default ListProduct;
