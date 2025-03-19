import { Icon } from '@iconify/react/dist/iconify.js';
import { Button } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { formatCurrencyVND } from '../../../utils/utils';

const CardProductComponent = ({ isNew, item }) => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const goToDetailIngredient = (item) => {
        const id = item?.id ?? item?.Id;
        if (id) {
            navigate(`/nguyen-lieu/${id}`);
        } else {
            console.error("Invalid item: Missing ID", item);
        }
    };

    useEffect(() => {
        if (item) {
            setIsLoading(false);
        }
    }, [item])

    return (
        <div className={`relative h-auto w-auto overflow-hidden bg-white rounded-xl drop-shadow-md cursor-pointer transition-all 
            ${isLoading ? 'opacity-50 grayscale' : ''}`}
            onClick={() => goToDetailIngredient(item)}
            onKeyDown={(event) => handleKeyDown(event, onEnterPress)}
        >
            <div className="relative group">
                <img
                    className="w-full h-[220px] object-cover transition-opacity duration-300 group-hover:opacity-80"
                    src={item?.Images?.[0]?.ImageURL || item?.images?.[0]?.imageUrl}
                    alt={item?.IngredientName || item?.ingredientName}
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
                <h2 className='text-[18px] text-black font-medium hover:text-[#EF2A39] line-clamp-1'>{item?.IngredientName || item?.ingredientName}</h2>
                <p className='flex justify-between mt-2'>
                    {item?.PricePromotion !== 0 || item?.pricePromotion !== 0 && (
                        <span className='block text-[16px] text-[#F46C02] font-medium'>
                            {formatCurrencyVND(item?.PricePromotion || item?.pricePromotion)}
                        </span>
                    )}

                    {item?.PricePromotion === 0 || item?.pricePromotion === 0 && (
                        <span className='block text-[16px] text-[#7d7d7d] font-medium'>
                            {formatCurrencyVND(item?.PriceOrigin || item?.priceOrigin)}
                        </span>
                    )}

                    {item?.IsSale || item?.isSale && (
                        <span className='block text-[16px] font-medium text-[#7d7d7d] line-through'>{formatCurrencyVND(item?.PriceOrigin || item?.priceOrigin)}</span>
                    )}
                </p>
            </div>
        </div>
    );
};

export default CardProductComponent;