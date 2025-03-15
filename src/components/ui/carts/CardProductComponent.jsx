import { Icon } from '@iconify/react/dist/iconify.js';
import { Button } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const CardProductComponent = ({ isNew, item }) => {
    const navigate = useNavigate();
    const gotToDetailIngredient = (item) => {
        const id = item.id;
        navigate(`/nguyen-lieu/${id}`);
    }
    return (
        <div className='relative overflow-hidden w-[240px] bg-white rounded-xl drop-shadow-md cursor-pointer'
            onClick={() => gotToDetailIngredient(item)}
            onKeyDown={(event) => handleKeyDown(event, onEnterPress)}
        >
            <div className="relative group">
                <img
                    className="w-full h-[220px] object-cover transition-opacity duration-300 group-hover:opacity-80"
                    src={item?.images?.[0]?.imageUrl}
                    alt={item?.IngredientName}
                />
                {isNew && (
                    <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                        Mới
                    </span>
                )}

                {item?.IsSale && (
                    <Icon
                        className="absolute top-1 right-2 text-red-600 text-xs font-semibold px-2 py-1 rounded-full"
                        icon="foundation:burst-sale" width="60" height="60" />
                )}

                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center gap-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <Button className="bg-white p-2 rounded-full shadow-md">
                        <Icon icon="lets-icons:view" width="24" height="24" />
                    </Button>
                    <Button className="bg-white p-2 rounded-full shadow-md">
                        <Icon icon="mdi:cart-outline" width="24" height="24" />
                    </Button>
                </div>
            </div>
            <div className='px-2 mt-2 pb-2'>
                <h2 className='text-[18px] text-black font-medium hover:text-[#EF2A39] line-clamp-1'>{item?.ingredientName}</h2>
                <p className='flex justify-between mt-2'>
                    <span className='block text-[16px] text-[#F46C02] font-medium'>
                        {item?.pricePromotion && item?.pricePromotion !== 0 ? item.pricePromotion : item?.priceOrigin}
                        <u className='ml-[2px]'>đ</u>
                    </span>
                    {item?.IsSale && (
                        <span className='block text-[16px] font-medium text-[#7d7d7d] line-through'>{item?.priceOrigin}<u className='ml-[2px]'>đ</u></span>
                    )}
                </p>
            </div>
        </div>
    );
};

export default CardProductComponent;