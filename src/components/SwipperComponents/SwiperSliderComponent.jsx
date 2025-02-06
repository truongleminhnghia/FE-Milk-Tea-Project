import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import { Button } from 'antd';
const SwiperSliderComponent = () => {
    const swiperRef = useRef(null);
    return (
        <>
            <Swiper
                spaceBetween={30}
                pagination={{
                    clickable: true,
                }}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                navigation={{
                    nextEl: ".next-btn",
                    prevEl: ".prev-btn",
                }}
                onSwiper={(swiper) => {
                    swiperRef.current = swiper;
                }}
                loop={true}
                modules={[Pagination, Navigation, Autoplay]}
                className="relative"
            >
                <SwiperSlide>
                    <img src="../../../public/images/logo/logo.png" alt="" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="../../../public/images/logo/logo.png" alt="" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="../../../public/images/logo/logo.png" alt="" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="../../../public/images/logo/logo.png" alt="" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="../../../public/images/logo/logo.png" alt="" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="../../../public/images/logo/logo.png" alt="" />
                </SwiperSlide>
            </Swiper>
            <div className='absolute z-10 top-1/2 left-2 transform -translate-y-1/2'>
                <Button
                    className="prev-btn bg-black text-white p-2 rounded-full">
                    ❮
                </Button>
                <Button
                    className="next-btn bg-black text-white p-2 rounded-full">
                    ❯
                </Button>
            </div>
        </>
    );
}

export default SwiperSliderComponent