import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from '../../../public/images/images/image.png';

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
                    el: ".custom-pagination",
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
                className="relative !w-full h-[60vh]"
            >
                <SwiperSlide >
                    <img
                        className='!w-full h-full object-cover'
                        src="/images/images/image.png"
                        alt=""
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <img
                        className='!w-full h-full object-cover'
                        src="/images/images/image.png"
                        alt=""
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <img
                        className='!w-full h-full object-cover'
                        src="/images/images/image.png"
                        alt=""
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <img
                        className='!w-full h-full object-cover'
                        src="/images/images/image.png"
                        alt=""
                    />
                </SwiperSlide>
                <div className="custom-pagination text-center absolute bottom-2 left-1/2 transform -translate-x-1/2 z-10">
                </div>
            </Swiper>
            <div className="absolute z-10 top-[45%] w-full transform -translate-y-1/2 flex justify-between px-4">
                <Button className="prev-btn bg-white text-black text-[18px] px-3 py-2 rounded-full">
                    ❮
                </Button>
                <Button className="next-btn bg-white text-black text-[18px] px-3 py-2 rounded-full">
                    ❯
                </Button>
            </div>

        </>
    );
}

export default SwiperSliderComponent