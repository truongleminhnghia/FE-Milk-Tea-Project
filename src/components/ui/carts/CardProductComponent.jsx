import { Icon } from '@iconify/react/dist/iconify.js';
import { Button, Skeleton } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { formatCurrencyVND } from '../../../utils/utils';

const CardProductComponent = ({ isNew, item }) => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [isHovered, setIsHovered] = useState(false);
    
    const goToDetailIngredient = (item) => {
        const id = item?.id ?? item?.Id;
        if (id) {
            navigate(`/nguyen-lieu/${id}`);
        } else {
            console.error("Invalid item: Missing ID", item);
        }
    };

    const handleAddToCart = (e) => {
        e.stopPropagation();
        // Add cart functionality here
    };

    const handleQuickView = (e) => {
        e.stopPropagation();
        // Quick view functionality here
    };

    useEffect(() => {
        if (item) {
            setIsLoading(false);
        }
    }, [item]);

    const isSale = item?.IsSale || item?.isSale;
    const priceOrigin = item?.PriceOrigin || item?.priceOrigin || 0;
    const pricePromotion = item?.PricePromotion || item?.pricePromotion || 0;
    const hasPromotion = pricePromotion > 0;
    const displayName = item?.IngredientName || item?.ingredientName || 'Sản phẩm';
    const imageUrl = item?.Images?.[0]?.ImageURL || item?.images?.[0]?.imageUrl || 'https://via.placeholder.com/300x300.png?text=No+Image';
    
    // Calculate discount percentage
    const discountPercent = priceOrigin && hasPromotion 
        ? Math.round(((priceOrigin - pricePromotion) / priceOrigin) * 100) 
        : 0;

    if (isLoading) {
        return (
            <div className="bg-white rounded-xl shadow-sm p-3 h-[330px]">
                <Skeleton.Image active className="w-full h-[180px]" />
                <Skeleton active paragraph={{ rows: 2 }} className="mt-3" />
            </div>
        );
    }

    return (
        <div 
            className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden h-full"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => goToDetailIngredient(item)}
        >
            <div className="relative overflow-hidden">
                {/* Product Image with overlay */}
                <div className="relative h-[180px] overflow-hidden">
                    <img
                        className={`w-full h-full object-cover transition-transform duration-500 ${isHovered ? 'scale-110' : 'scale-100'}`}
                        src={imageUrl}
                        alt={displayName}
                        onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/300x300.png?text=Error+Loading';
                        }}
                    />
                    
                    {/* Gradient overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-t from-black/30 to-transparent transition-opacity duration-300 ${isHovered ? 'opacity-80' : 'opacity-0'}`}></div>
                </div>
                
                {/* Product badges */}
                <div className="absolute top-0 left-0 p-2 flex flex-col gap-2">
                    {isNew && (
                        <span className="bg-[#29aae1] text-white text-xs font-semibold px-2 py-1 rounded-full shadow-sm">
                            Mới
                        </span>
                    )}
                    
                    {isSale && discountPercent > 0 && (
                        <span className="bg-orange-500 text-white text-xs font-semibold px-2 py-1 rounded-full shadow-sm">
                            -{discountPercent}%
                        </span>
                    )}
                </div>
                
                {/* Quick action buttons */}
                <div className={`absolute bottom-3 right-3 flex gap-2 transition-all duration-300 ${isHovered ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'}`}>
                    <Button 
                        className="bg-white hover:bg-[#29aae1] hover:text-white border-none rounded-full shadow-md flex items-center justify-center w-9 h-9"
                        onClick={handleQuickView}
                        icon={<Icon icon="lets-icons:view" width="18" height="18" />}
                    />
                    <Button 
                        className="bg-white hover:bg-[#29aae1] hover:text-white border-none rounded-full shadow-md flex items-center justify-center w-9 h-9"
                        onClick={handleAddToCart}
                        icon={<Icon icon="mdi:cart-outline" width="18" height="18" />}
                    />
                </div>
            </div>
            
            {/* Product information */}
            <div className="p-3">
                <h3 className="text-base font-medium text-gray-800 line-clamp-2 min-h-[48px] hover:text-[#29aae1] transition-colors">
                    {displayName}
                </h3>
                
                <div className="mt-2 flex items-center justify-between">
                    <div className="flex flex-col">
                        {hasPromotion ? (
                            <>
                                <span className="text-[#29aae1] font-medium text-base">
                                    {formatCurrencyVND(pricePromotion)}
                                </span>
                                {isSale && (
                                    <span className="text-gray-400 text-sm line-through">
                                        {formatCurrencyVND(priceOrigin)}
                                    </span>
                                )}
                            </>
                        ) : (
                            <span className="text-[#29aae1] font-medium text-base">
                                {formatCurrencyVND(priceOrigin)}
                            </span>
                        )}
                    </div>
                    
                    <div className={`text-yellow-400 flex transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-70'}`}>
                        {[1, 2, 3, 4, 5].map((star) => (
                            <span key={star}>★</span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CardProductComponent;