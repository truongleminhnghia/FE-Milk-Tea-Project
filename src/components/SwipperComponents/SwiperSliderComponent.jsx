import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import { Button } from 'antd';
import Slider from '../../stores/data/slide.json'

const SwiperSliderComponent = () => {
    const swiperRef = useRef(null);
    return (
        <>
            <Swiper
                spaceBetween={30}
                pagination={{
                    el: ".custom-pagination",
                    clickable: true,
                    renderBullet: function (index, className) {
                        return `<span class="${className} custom-dot"></span>`;
                    },
                }}
                autoplay={{
                    delay: 3500,
                    disableOnInteraction: false,
                }}
                slidesPerView={1}
                navigation={{
                    nextEl: ".next-btn",
                    prevEl: ".prev-btn",
                }}
                onSwiper={(swiper) => {
                    swiperRef.current = swiper;
                }}
                loop={Slider.length > 1}
                modules={[Pagination, Navigation, Autoplay]}
                className="relative !w-full h-[60vh]"
            >
                {Slider.map((item, index) => (
                    <SwiperSlide key={item.key}>
                        <div className="relative w-full h-full">
                            <img
                                className='!w-full h-full object-cover'
                                src={item.url}
                                alt=""
                            />
                            {item.title && (
                                <div className="absolute inset-0 flex items-center">
                                    <div className="container mx-auto px-8">
                                        <div className="max-w-lg bg-white bg-opacity-90 p-6 rounded-lg shadow-lg">
                                            <h2 className="text-2xl font-bold text-[#29aae1] mb-2">{item.title}</h2>
                                            {item.description && (
                                                <p className="text-gray-700 mb-4">{item.description}</p>
                                            )}
                                            {item.buttonText && (
                                                <Button 
                                                    type="primary" 
                                                    className="bg-[#29aae1] border-[#29aae1] hover:!bg-[#1d8dba] hover:!border-[#1d8dba]"
                                                >
                                                    {item.buttonText}
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </SwiperSlide>
                ))}
                <div className="custom-pagination absolute bottom-6 left-1/2 transform -translate-x-1/2 z-10 flex justify-center gap-2">
                </div>
            </Swiper>
            <div className="absolute z-10 top-[50%] w-full transform -translate-y-1/2 flex justify-between px-8">
                <Button 
                    className="prev-btn bg-white border-[#29aae1] text-[#29aae1] text-[18px] px-4 py-2 rounded-full hover:!bg-[#29aae1] hover:!text-white hover:!border-[#29aae1] shadow-md flex items-center justify-center"
                    icon={<span className="inline-flex items-center justify-center">❮</span>}
                />
                <Button 
                    className="next-btn bg-white border-[#29aae1] text-[#29aae1] text-[18px] px-4 py-2 rounded-full hover:!bg-[#29aae1] hover:!text-white hover:!border-[#29aae1] shadow-md flex items-center justify-center"
                    icon={<span className="inline-flex items-center justify-center">❯</span>}
                />
            </div>

            <style jsx>{`
                :global(.custom-dot) {
                    width: 12px !important;
                    height: 12px !important;
                    background-color: rgba(255, 255, 255, 0.7) !important;
                    border: 1px solid #29aae1 !important;
                    opacity: 1 !important;
                    margin: 0 4px;
                }
                
                :global(.swiper-pagination-bullet-active.custom-dot) {
                    background-color: #29aae1 !important;
                    width: 24px !important;
                    border-radius: 6px !important;
                }
                
                :global(.prev-btn:hover), :global(.next-btn:hover) {
                    transform: scale(1.1);
                    transition: all 0.3s ease;
                }
                
                :global(.swiper-slide) {
                    position: relative;
                }
                
                :global(.swiper-slide::after) {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.3));
                    pointer-events: none;
                }
            `}</style>
        </>
    );
}

export default SwiperSliderComponent