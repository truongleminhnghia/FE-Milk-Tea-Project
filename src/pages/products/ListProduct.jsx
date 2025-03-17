import React, { useEffect, useState } from 'react'
import CardProductComponent from '../../components/ui/carts/CardProductComponent'
import { Button, Checkbox, Col, Input, Menu, Pagination, Row, Select } from 'antd'
import BreadcrumbItem from '../../components/navigations/BreadcrumbComponent'
import { SearchOutlined } from '@ant-design/icons'
import { getByListSerivce } from '../../services/product.service';
import { handleKeyDown } from '../../utils/utils'
import products from '../../stores/data/list-product.json'

const ListProduct = () => {
  const [isLoading, setisLoading] = useState(false);
  const [listIngredient, setListIngredient] = useState([]);
  const [params, setParams] = useState({
    categoryId: null,
    supplier: null,
    status: null,
    isSale: null,
    rating: null,
    search: null,
    startDate: null,
    endDate: null,
    paging: {
      pageCurrent: 1,
      pageSize: 10,
      total: 20,
    }
  });

  useEffect(() => {
    setListIngredient(products);
  }, [products])

  // const fetchIngredient = async (params) => {
  //   try {
  //     setisLoading(true);
  //     const param = {
  //       pageCurrent: params.paging.pageCurrent,
  //       pageSize: params.paging.pageSize,
  //       status: params.status,
  //       categoryId: params.categoryId,
  //       search: params.search,
  //       startDate: params.startDate,
  //       endDate: params.endDate,
  //       minPrice: params.minPrice,
  //       maxPrice: params.maxPrice,
  //       isSale: params.isSale,
  //       supplier: params.supplier,
  //       rating: params.rating,
  //     };
  //     const res = await getByListSerivce(param);
  //     if (res?.data) {
  //       setListIngredient(res?.data.data);
  //       setParams((prev) => ({
  //         ...prev,
  //         paging: {
  //           ...prev.paging,
  //           total: res.data.total || 100,
  //         }
  //       }));
  //     }
  //   } catch (error) {
  //     console.error("Error: ", error.message);
  //   } finally {
  //     setisLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   fetchIngredient(params);
  // }, [JSON.stringify(params)]);

  const handleCategoryChange = (id) => {
    console.log("cate chose", id);
    setParams((prev) => ({ ...prev, categoryId: id }));
  };

  const handleSupplierChange = (label) => {
    setParams((prev) => ({ ...prev, supplier: prev.supplier === label ? null : label }));
  };

  const handleStatusChange = (label) => {
    setParams((prev) => ({ ...prev, status: prev.status === label ? null : label }));
  };

  const handleRatingChange = (label) => {
    setParams((prev) => ({ ...prev, rating: prev.rating === label ? null : label }));
  };

  const handleSearch = (e) => {
    setParams((prev) => ({ ...prev, search: e.target.value }));
  };

  const categoryActive = [
    { id: "1", label: "Bột pha trà sữa" },
    { id: "2", label: "Sirup" },
    { id: "3", label: "Trà thái" },
    { id: "4", label: "Hồng trà" },
    { id: "5", label: "Sữa đặc" },
  ];

  const suppliActive = [
    { id: "1", label: "Nhà a" },
    { id: "2", label: "Nhà b" },
    { id: "3", label: "Nhà c" },
    { id: "4", label: "Nhà d" },
  ];

  const checkList = [
    { id: "1", label: "Tất cả" },
    { id: "2", label: "Còn hàng" },
    { id: "3", label: "Khuyến mãi" },
  ];

  const rating = [
    { id: "1", label: "3 sao" },
    { id: "2", label: "4 sao" },
    { id: "3", label: "5 sao" },
  ];

  const price = [
    { id: "1", label: "Tăng dần" },
    { id: "2", label: "Giảm dần" }
  ]
  const rangePrice = [
    { id: "1", label: "Từ 50 đến 100", minVaule: 50, maxValue: 100 },
    { id: "2", label: "Từ 100 đến 500", minVaule: 100, maxValue: 500 },
    { id: "3", label: "Từ 500 đến 1000", minVaule: 500, maxValue: 1000 },
    { id: "3", label: "Từ 1000 trở lên", minVaule: 1000 },
  ]

  return (
    <div className="container">
      <Row className='py-2 w-full !mx-0'>
        <BreadcrumbItem items={[
          { title: 'Trang chủ', href: '/' },
          { title: 'Tất cả sản phẩm' }
        ]} />
        <img className='w-full' src="/images/baners/collection_main_banner.webp" alt="" />
      </Row>
      <Row className='rounded-lg w-full mt-2'>
        <Col span={18} push={6} className='bg-white py-2 px-3 rounded-lg'>
          <Row className='w-full h-auto mb-4 bg-slate-200 py-2 px-2 rounded-md'>
            <Col span={16} >
              <div className='flex gap-2'>
                <Button>Phổ biến</Button>
                <Button>Mới nhất</Button>
                <Button>Bán chạy</Button>
                <Select
                  placeholder="Sắp xếp giá"
                  options={price}
                />
              </div>
            </Col>
            <Col span={8} >
              <Select
                className='w-full'
                placeholder="Khoảng giá"
                options={rangePrice}
              />
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            {listIngredient?.map((item) => (
              <Col
                span={8}
                key={item.id}
                className='' >
                <div className=''>
                  <CardProductComponent item={item} className="" />
                </div>
              </Col>
            ))}
          </Row>
          <div className='py-3 mt-3'>
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
        </Col>
        <Col span={6} pull={18} className='w-full border-[#747474] sticky top-20 max-h-[600px] ' >
          <div className='bg-white w-[95%] rounded-lg h-[600px]'>
            <div className='py-2 px-3 w-full relative'>
              <h3 className='text-[16px] font-medium text-black'>Danh mục nguyên liệu</h3>
              <div className='w-full border-[#383232] border-[1px] mt-[2px] mb-[2px]'>
              </div>
              <ul className='mt-1'>
                {categoryActive.map((item) => (
                  <li
                    key={item.id}
                    className={`text-[14px] px-2 py-1 cursor-pointer hover:text-[#29aae1] ${params.categoryId === item.id ? 'text-[#29aae1] font-bold' : 'text-[#747474]'}`}
                    onClick={() => handleCategoryChange(item.id)}
                    onKeyDown={(event) => handleKeyDown(event, onEnterPress)}
                  >
                    {item.label}
                  </li>
                ))}
              </ul>
            </div>
            <div className='py-2 px-3 w-full relative'>
              <h3 className='text-[16px] font-medium text-black'>Nhà sản xuất</h3>
              <div className='w-full border-[#747474] border-[1px] mt-[2px] mb-[2px]'>
              </div>
              <ul className='mt-1'>
                {suppliActive.map((item) => (
                  <li
                    key={item.label}
                    className={`text-[14px] px-2 py-1 cursor-pointer ${params.supplier === item.label ? 'text-[#29aae1] font-bold' : 'text-[#747474]'}`}
                    onClick={() => handleSupplierChange(item.label)}
                    onKeyDown={(event) => handleKeyDown(event, onEnterPress)}
                  >
                    {item.label}
                  </li>
                ))}
              </ul>
            </div>
            <div className='py-2 px-3 w-full relative'>
              <h3 className='text-[16px] font-medium text-black'>Tình trạng</h3>
              <div className='w-full border-[#747474] border-[1px] mt-[2px] mb-[2px]'>
              </div>
              {checkList.map((item) => (
                <Checkbox
                  key={item.id}
                  className={`text-[14px] px-2 py-1 cursor-pointer ${params.status === item.label ? 'text-[#29aae1] font-bold' : 'text-[#747474]'}`}
                  onClick={() => handleStatusChange(item.label)}>
                  {item.label}
                </Checkbox>
              ))}
            </div>
            <div className='py-2 px-3 w-full relative'>
              <h3 className='text-[16px] font-medium text-black'>Đánh giá</h3>
              <div className='w-full border-[#747474] border-[1px] mt-[2px] mb-[2px]'>
              </div>
              {rating.map((item) => (
                <span
                  key={item.id}
                  className={`block text-[14px] px-2 py-1 cursor-pointer ${params.rating === item.label ? 'text-[#29aae1] font-bold' : 'text-[#747474]'}`}
                  onClick={() => handleRatingChange(item.label)}
                  onKeyDown={(event) => handleKeyDown(event, onEnterPress)}>
                  {item.label}
                </span>
              ))}
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default ListProduct;
