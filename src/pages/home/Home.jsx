import React, { useEffect, useState } from 'react'
import SwiperSliderComponent from '../../components/SwipperComponents/SwiperSliderComponent'
import { Link } from 'react-router-dom';
import CardProductComponent from '../../components/ui/carts/CardProductComponent';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Button, Col, Input, Row, Space } from 'antd';
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
  return (
    <div>
      <div className='relative'>
        <SwiperSliderComponent />
      </div>
      <section className='content'>
        <div className='container'>
          <h1
            className='text-[24px] text-[#EF2A39] font-medium mt-[32px] uppercase mb-[20px]'
          >Sản phẩm bán chạy</h1>
          <Swiper
            slidesPerView={5}
            spaceBetween={10}
            // pagination={{
            //   clickable: true,
            // }}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            loop={listIngredient?.lenght > 1}
            modules={[Pagination, Navigation, Autoplay]}
            className="h-[310px]"
          >
            {listIngredient.slice(0, 10)?.map((item, index) => (
              <SwiperSlide key={item.id}>
                <CardProductComponent item={item} isNew={true} />
              </SwiperSlide>
            ))}
          </Swiper>
          <Button className='rounded-3xl border-[#EF2A39] text-[#EF2A39] text-sm left-[50%] translate-x-[-50%] hover:!bg-[#EF2A39] hover:!text-white hover:!border-none'>
            Xem tất cả
            <Icon icon="weui:arrow-filled" width="12" height="24" />
          </Button>
        </div>
      </section>
      <section className='bg-[#cf4853] content'>
        <div className='container'>
          <h1
            className='text-[24px] text-white font-medium mt-[32px] uppercase mb-[20px]'
          >Sản phẩm mới</h1>
          <Row className='items-center justify-between'>
            <Col span={7}>
              <img
                className=' w-full h-auto object-cover rounded-lg hover:scale-105'
                src="/images/baners/image.png" alt="" />
            </Col>
            <Col span={16}>
              <Swiper
                slidesPerView={3}
                spaceBetween={10}
                // pagination={{
                //   el: ".custom-pagination",
                //   clickable: true,
                // }}
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: false,
                }}
                loop={listIngredient?.lenght > 1}
                modules={[Pagination, Navigation, Autoplay]}
                className="h-[310px]"
              >
                {listIngredient.slice(0, 10)?.map((item, index) => (
                  <SwiperSlide key={item.id}>
                    <CardProductComponent item={item} isNew={true} />
                  </SwiperSlide>
                ))}
              </Swiper>
              <Button className='rounded-3xl border-[#EF2A39] text-[#EF2A39] text-sm left-[50%] translate-x-[-50%] hover:!bg-[#EF2A39] hover:!text-white hover:!border-none'>
                Xem tất cả
                <Icon icon="weui:arrow-filled" width="12" height="24" />
              </Button>
            </Col>
          </Row>
        </div>
      </section>
      <div className='content'>
        <Row className='container'>
          <img src="/images/baners/section_hot_banner.webp" alt="" />
        </Row>
      </div>
      <section className='content bg-[#EF2A39]'>
        <Row className='container'>
          <div className='mb-[20px] mt-[32px] '>
            <h1 className='text-[24px] text-white font-medium uppercase '>Sale</h1>
            <p className='text-white text-sm mt-2 font-normal'>
              Chương trình khuyến mãi cực sốc. Xem nhiều ưu đãi hơn
              <Link className='text-blue-500 hover:underline'> tại đây</Link>
            </p>
          </div>
          <Row>
            <Swiper
              slidesPerView={5}
              spaceBetween={10}
              // pagination={{
              //   clickable: true,
              // }}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              loop={listIngredient?.lenght > 1}
              modules={[Pagination, Navigation, Autoplay]}
              className="h-[310px]"
            >
              {listIngredient.slice(0, 10)?.map((item, index) => (
                <SwiperSlide key={item.id}>
                  <CardProductComponent item={item} isNew={true} />
                </SwiperSlide>
              ))}
            </Swiper>
          </Row>
          <Row>
            <Swiper
              slidesPerView={5}
              spaceBetween={10}
              // pagination={{
              //   clickable: true,
              // }}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              loop={listIngredient?.lenght > 1}
              modules={[Pagination, Navigation, Autoplay]}
              className="h-[310px]"
            >
              {listIngredient.slice(0, 10)?.map((item, index) => (
                <SwiperSlide key={item.id}>
                  <CardProductComponent item={item} isNew={true} />
                </SwiperSlide>
              ))}
            </Swiper>
            <Button className='rounded-3xl border-[#EF2A39] text-[#EF2A39] text-sm left-[50%] translate-x-[-50%] hover:!bg-[#EF2A39] hover:!text-white hover:!border-none'>
              Xem tất cả
              <Icon icon="weui:arrow-filled" width="12" height="24" />
            </Button>
          </Row>
        </Row>
      </section>
      <section className='content'>
        <Row className='container'>
          <h1 className='text-[24px] text-[#EF2A39] font-medium mt-[32px] uppercase mb-5'>Công thức - Cách làm</h1>
          <Row className='w-full'>
            <div className="transform -translate-y-1/2 ml-auto flex gap-2">
              <Button className="prev-btn bg-white border-[#EF2A39] text-[#EF2A39] text-[18px] px-3 py-2 rounded-full hover:!bg-[#EF2A39] hover:!text-white hover:!border-none">
                ❮
              </Button>
              <Button className="next-btn bg-white border-[#EF2A39] text-[#EF2A39] text-[18px] px-3 py-2 rounded-full hover:!bg-[#EF2A39] hover:!text-white hover:!border-none">
                ❯
              </Button>
            </div>
          </Row>
          <Row className='w-full'>
            <Swiper
              slidesPerView={4}
              spaceBetween={30}
              // pagination={{
              //   clickable: true,
              // }}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              navigation={{
                nextEl: ".next-btn",
                prevEl: ".prev-btn",
              }}
              loop={listIngredient?.lenght > 1}
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
          </Row>
        </Row>
      </section>
      <section className='content bg-slate-100'>
        <Row className='container flex-col'>
          <h1 className='text-[24px] text-[#EF2A39] font-medium mt-[32px] uppercase mb-5'>Đăng Ký để nhận được nhiều ưu đãi hơn</h1>
          <Space.Compact className='max-w-[500px]'>
            <Input
              placeholder="Nhập email của bạn"
              className="hover:border-#EF2A39] h-[45px] text-[14px] px-[20px] py-[8px]
                                        outline-none focus-within:outline-none focus:ring-0 focus:border-[#EF2A39]"
              allowClear
            />
            <Button
              type="primary"
              className="bg-[#EF2A39] shadow-none border-[#EF2A39] h-[45px] w-auto
                                                        hover:!text-[#EF2A39] hover:!bg-white"
            >
              Đăng kí
            </Button>
          </Space.Compact>
        </Row>
      </section>
    </div>
  )
}

export default Home
