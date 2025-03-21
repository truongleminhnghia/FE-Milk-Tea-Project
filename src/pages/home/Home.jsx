import React, { useEffect, useState } from 'react'
import SwiperSliderComponent from '../../components/SwipperComponents/SwiperSliderComponent'
import { Link } from 'react-router-dom';
import CardProductComponent from '../../components/ui/carts/CardProductComponent';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Button, Col, Input, Row, Space, Skeleton, Empty, Spin } from 'antd';
import { Icon } from '@iconify/react/dist/iconify.js';
import CardRecipeComponent from '../../components/ui/carts/CardRecipeComponent';
import { getByListSerivce } from '../../services/product.service';

const Home = () => {
  const [isLoading, setisLoading] = useState(false);
  const [listIngredient, setListIngredient] = useState([]);
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
      pageSize: 10,
      total: 0,
    }
  })
  const fetchIngredient = async (params) => {
    try {
      setisLoading(true);  // Bắt đầu tải dữ liệu
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
        isSale: params.isSale
      };
      const res = await getByListSerivce(param);
      if (res?.data) {
        setListIngredient(res?.data.data);
        setParams((prev) => ({
          ...prev,
          paging: {
            ...prev.paging,
            total: res.data.total || 100,
          }
        }));
      }
    } catch (error) {
      console.error("Error: ", error.message);
    } finally {
      setisLoading(false); // dừng loading sau khi tải xog haowjc gặp lỗi
    }
  }
  useEffect(() => {
    fetchIngredient(params);
  }, [JSON.stringify(params)]);
  
  // Loading placeholder for product slides
  const renderLoadingSkeletons = (count, height = 310) => {
    return Array(count).fill(null).map((_, index) => (
      <SwiperSlide key={`skeleton-${index}`}>
        <div className="p-2">
          <Skeleton.Image active className="w-full h-36 mb-2" />
          <Skeleton active paragraph={{ rows: 2 }} />
        </div>
      </SwiperSlide>
    ));
  };
  
  return (
    <div className="bg-white">
      <div className='relative'>
        <SwiperSliderComponent />
      </div>
      
      {/* Bestselling Products Section */}
      <section className='content py-8'>
        <div className='container'>
          <h1
            className='text-[24px] text-[#29aae1] font-medium mt-[32px] uppercase mb-[20px] relative'
          >
            Sản phẩm bán chạy
            <div className="absolute bottom-[-8px] left-0 w-20 h-1 bg-[#29aae1]"></div>
          </h1>
          
          {isLoading ? (
            <div className="relative">
              <Swiper
                slidesPerView={5}
                spaceBetween={10}
                className="h-[310px]"
              >
                {renderLoadingSkeletons(5)}
              </Swiper>
              <div className="absolute inset-0 flex items-center justify-center">
                <Spin size="large" className="z-10" />
              </div>
            </div>
          ) : listIngredient.length > 0 ? (
            <Swiper
              slidesPerView={5}
              spaceBetween={10}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              loop={listIngredient.length > 1}
              modules={[Pagination, Navigation, Autoplay]}
              className="h-[310px]"
            >
              {listIngredient.slice(0, 10)?.map((item, index) => (
                <SwiperSlide key={item.id}>
                  <CardProductComponent item={item} isNew={true} />
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <Empty 
              description="Không có sản phẩm bán chạy" 
              className="py-12" 
              image={Empty.PRESENTED_IMAGE_SIMPLE} 
            />
          )}
          
          <Button className='rounded-3xl border-[#29aae1] text-[#29aae1] text-sm left-[50%] translate-x-[-50%] hover:!bg-[#29aae1] hover:!text-white hover:!border-none shadow-sm'>
            Xem tất cả
            <Icon icon="material-symbols:arrow-forward-rounded" width="16" height="16" />
          </Button>
        </div>
      </section>
      
      {/* New Products Section */}
      <section className='bg-[#29aae1] bg-opacity-10 content py-10'>
        <div className='container'>
          <h1
            className='text-[24px] text-[#29aae1] font-medium mt-[32px] uppercase mb-[20px] relative'
          >
            Sản phẩm mới
            <div className="absolute bottom-[-8px] left-0 w-20 h-1 bg-[#29aae1]"></div>
          </h1>
          <Row className='items-center justify-between'>
            <Col span={7}>
              <img
                className='w-full h-auto object-cover rounded-lg shadow-md hover:scale-105 transition-transform duration-300'
                src="/images/baners/image.png" alt="" />
            </Col>
            <Col span={16}>
              {isLoading ? (
                <div className="relative">
                  <Swiper
                    slidesPerView={3}
                    spaceBetween={10}
                    className="h-[310px]"
                  >
                    {renderLoadingSkeletons(3)}
                  </Swiper>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Spin size="large" className="z-10" />
                  </div>
                </div>
              ) : listIngredient.length > 0 ? (
                <Swiper
                  slidesPerView={3}
                  spaceBetween={10}
                  autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                  }}
                  loop={listIngredient.length > 1}
                  modules={[Pagination, Navigation, Autoplay]}
                  className="h-[310px]"
                >
                  {listIngredient.slice(0, 10)?.map((item, index) => (
                    <SwiperSlide key={item.id}>
                      <CardProductComponent item={item} isNew={true} />
                    </SwiperSlide>
                  ))}
                </Swiper>
              ) : (
                <Empty 
                  description="Không có sản phẩm mới" 
                  className="py-12" 
                  image={Empty.PRESENTED_IMAGE_SIMPLE} 
                />
              )}
              <Button className='rounded-3xl border-[#29aae1] text-[#29aae1] text-sm left-[50%] translate-x-[-50%] hover:!bg-[#29aae1] hover:!text-white hover:!border-none shadow-sm mt-4'>
                Xem tất cả
                <Icon icon="material-symbols:arrow-forward-rounded" width="16" height="16" />
              </Button>
            </Col>
          </Row>
        </div>
      </section>
      
      <div className='content py-8'>
        <Row className='container'>
          <img src="/images/baners/section_hot_banner.webp" alt="" className="rounded-lg shadow-md w-full hover:opacity-95 transition-opacity" />
        </Row>
      </div>
      
      {/* Sale Section */}
      <section className='content bg-gradient-to-r from-[#29aae1] to-[#1d8dba] py-10'>
        <Row className='container'>
          <div className='mb-[20px] mt-[32px]'>
            <h1 className='text-[24px] text-white font-medium uppercase relative'>
              Sale
              <div className="absolute bottom-[-8px] left-0 w-20 h-1 bg-white"></div>
            </h1>
            <p className='text-white text-sm mt-6 font-normal'>
              Chương trình khuyến mãi cực sốc. Xem nhiều ưu đãi hơn
              <Link className='text-white hover:underline ml-1 font-medium'>tại đây</Link>
            </p>
          </div>
          
          <Row className="w-full mb-5">
            {isLoading ? (
              <div className="relative w-full">
                <Swiper
                  slidesPerView={5}
                  spaceBetween={10}
                  className="h-[310px]"
                >
                  {renderLoadingSkeletons(5)}
                </Swiper>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Spin size="large" className="z-10" />
                </div>
              </div>
            ) : listIngredient.length > 0 ? (
              <Swiper
                slidesPerView={5}
                spaceBetween={10}
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: false,
                }}
                loop={listIngredient.length > 1}
                modules={[Pagination, Navigation, Autoplay]}
                className="h-[310px]"
              >
                {listIngredient.slice(0, 10)?.map((item, index) => (
                  <SwiperSlide key={item.id}>
                    <CardProductComponent item={item} isNew={true} />
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              <Empty 
                description={<span className="text-white">Không có sản phẩm đang giảm giá</span>} 
                className="py-12 w-full" 
                image={Empty.PRESENTED_IMAGE_SIMPLE} 
              />
            )}
          </Row>
          
          <Row className="w-full">
            {isLoading ? (
              <div className="relative w-full">
                <Swiper
                  slidesPerView={5}
                  spaceBetween={10}
                  className="h-[310px]"
                >
                  {renderLoadingSkeletons(5)}
                </Swiper>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Spin size="large" className="z-10" />
                </div>
              </div>
            ) : listIngredient.length > 0 ? (
              <Swiper
                slidesPerView={5}
                spaceBetween={10}
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: false,
                }}
                loop={listIngredient.length > 1}
                modules={[Pagination, Navigation, Autoplay]}
                className="h-[310px]"
              >
                {listIngredient.slice(0, 10)?.map((item, index) => (
                  <SwiperSlide key={item.id}>
                    <CardProductComponent item={item} isNew={true} />
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              <Empty 
                description={<span className="text-white">Không có sản phẩm đang giảm giá</span>} 
                className="py-12 w-full" 
                image={Empty.PRESENTED_IMAGE_SIMPLE} 
              />
            )}
            <Button className='rounded-3xl bg-white border-white text-[#29aae1] text-sm left-[50%] translate-x-[-50%] hover:!bg-[#f8f8f8] hover:!text-[#1d8dba] hover:!border-white shadow-md mt-6'>
              Xem tất cả
              <Icon icon="material-symbols:arrow-forward-rounded" width="16" height="16" />
            </Button>
          </Row>
        </Row>
      </section>
      
      {/* Recipes Section */}
      <section className='content py-10'>
        <Row className='container'>
          <h1 className='text-[24px] text-[#29aae1] font-medium mt-[32px] uppercase mb-5 relative'>
            Công thức - Cách làm
            <div className="absolute bottom-[-8px] left-0 w-20 h-1 bg-[#29aae1]"></div>
          </h1>
          <Row className='w-full'>
            <div className="transform -translate-y-1/2 ml-auto flex gap-2">
              <Button className="prev-btn bg-white border-[#29aae1] text-[#29aae1] text-[18px] px-3 py-2 rounded-full hover:!bg-[#29aae1] hover:!text-white hover:!border-none shadow-sm">
                ❮
              </Button>
              <Button className="next-btn bg-white border-[#29aae1] text-[#29aae1] text-[18px] px-3 py-2 rounded-full hover:!bg-[#29aae1] hover:!text-white hover:!border-none shadow-sm">
                ❯
              </Button>
            </div>
          </Row>
          <Row className='w-full'>
            {isLoading ? (
              <div className="relative w-full">
                <Swiper
                  slidesPerView={4}
                  spaceBetween={30}
                  className="h-[350px]"
                >
                  {renderLoadingSkeletons(4, 350)}
                </Swiper>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Spin size="large" className="z-10" />
                </div>
              </div>
            ) : (
              <Swiper
                slidesPerView={4}
                spaceBetween={30}
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: false,
                }}
                navigation={{
                  nextEl: ".next-btn",
                  prevEl: ".prev-btn",
                }}
                loop={listIngredient.length > 1}
                modules={[Pagination, Navigation, Autoplay]}
                className="h-[350px]"
              >
                <SwiperSlide>
                  <CardRecipeComponent />
                </SwiperSlide>
                <SwiperSlide>
                  <CardRecipeComponent />
                </SwiperSlide>
                <SwiperSlide>
                  <CardRecipeComponent />
                </SwiperSlide>
                <SwiperSlide>
                  <CardRecipeComponent />
                </SwiperSlide>
                <SwiperSlide>
                  <CardRecipeComponent />
                </SwiperSlide>
                <SwiperSlide>
                  <CardRecipeComponent />
                </SwiperSlide>
                <SwiperSlide>
                  <CardRecipeComponent />
                </SwiperSlide>
              </Swiper>
            )}
          </Row>
        </Row>
      </section>
      
      {/* Newsletter Section */}
      <section className='content bg-[#29aae1] bg-opacity-5 py-10 rounded-t-3xl'>
        <Row className='container flex-col items-center'>
          <h1 className='text-[24px] text-[#29aae1] font-medium mt-[32px] uppercase mb-8 relative text-center'>
            Đăng Ký để nhận được nhiều ưu đãi hơn
            <div className="absolute bottom-[-8px] left-1/2 transform -translate-x-1/2 w-20 h-1 bg-[#29aae1]"></div>
          </h1>
          <Space.Compact className='max-w-[500px] w-full'>
            <Input
              placeholder="Nhập email của bạn"
              className="hover:border-[#29aae1] h-[45px] text-[14px] px-[20px] py-[8px]
                        outline-none focus-within:outline-none focus:ring-0 focus:border-[#29aae1]"
              allowClear
            />
            <Button
              type="primary"
              className="bg-[#29aae1] shadow-none border-[#29aae1] h-[45px] w-auto
                        hover:!bg-[#1d8dba] hover:!border-[#1d8dba]"
              loading={isLoading}
            >
              Đăng kí
            </Button>
          </Space.Compact>
        </Row>
      </section>

      {/* Global loading indicator */}
      {isLoading && (
        <div className="fixed top-0 left-0 z-50 w-full h-1 bg-[#29aae1] bg-opacity-50">
          <div className="h-full bg-[#29aae1] animate-pulse" style={{ width: '30%', animation: 'loading 1.5s infinite ease-in-out' }}></div>
        </div>
      )}

      <style jsx>{`
        @keyframes loading {
          0% { width: 0%; left: 0; }
          50% { width: 30%; left: 35%; }
          100% { width: 0%; left: 100%; }
        }
      `}</style>
    </div>
  )
}

export default Home
