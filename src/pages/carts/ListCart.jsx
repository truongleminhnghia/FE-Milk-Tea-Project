import { Button, Checkbox, Col, Input, Row, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import BreadcrumbComponent from '../../components/navigations/BreadcrumbComponent';
import ingredientProducts from '../../stores/data/in-products.json';
import { Icon } from '@iconify/react';
import { useParams } from 'react-router-dom';
import { getByIdService } from '../../services/cart.service';

const ListCart = () => {
    const { id } = useParams();
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const breadcrumbItems = [
        { title: 'Trang chủ', href: '/' },
        { title: 'Danh mục sản phẩm' }
    ];

    const fetchDetail = async (id) => {
        try {
            setIsLoading(true);
            const res = await getByIdService(id);
            if (res?.success || res?.data) {
                console.log("list Cart", res.data);
                setData(res.data);
                setIsLoading(false);
            }
        } catch (error) {
            console.log("error", error);
        }
    };

    useEffect(() => {
        fetchDetail(id);
    }, [id]);

    const [selectedProducts, setSelectedProducts] = useState([]);

    const handleCheckboxChange = (product) => {
        setSelectedProducts((prevSelected) => {
            const updatedList = [...prevSelected];
            const index = updatedList.findIndex((p) => p.id === product.id);

            if (index !== -1) {
                updatedList.splice(index, 1);
            } else {
                updatedList.push({ ...product, quantity: product.quantity || 1 });
            }
            return updatedList;
        });
    };

    const handleMinus = (id) => {
        setSelectedProducts((prev) =>
            prev.map((p) =>
                p.id === id ? { ...p, quantity: Math.max(1, p.quantity - 1) } : p
            )
        );
    };

    const handlePlus = (id) => {
        setSelectedProducts((prev) =>
            prev.map((p) =>
                p.id === id ? { ...p, quantity: p.quantity + 1 } : p
            )
        );
    };

    const handleBuy = () => {
        console.log("Sản phẩm đã chọn:", selectedProducts);
    };

    return (
        <div className='container'>
            <BreadcrumbComponent items={breadcrumbItems} />
            <Row className='bg-white py-3 px-4 rounded-lg'>
                <Col span={24}>
                    <h1 className='text-2xl font-medium text-black'>Giỏ hàng</h1>
                </Col>
            </Row>
            {ingredientProducts.map((product, index) => {
                const pricePerUnit = product?.ingredient?.pricePromotion ?? product?.ingredient?.priceOrigin;
                const totalPrice = pricePerUnit * (product.quantity || 1);
                const isChecked = selectedProducts.some((p) => p.id === product.id);

                return (
                    <Row key={product.id || `product-${index}`}>
                        <Col span={24} className='flex items-center px-4 py-3 bg-white mt-4 rounded-lg'>
                            <Checkbox
                                checked={isChecked}
                                onChange={() => handleCheckboxChange(product)}
                            />
                            <img
                                src={product?.ingredient?.images[0]?.imageUrl}
                                alt={product?.ingredient?.ingredientName}
                                className='w-[100px] h-[80px] object-cover rounded ml-[100px]'
                            />
                            <h3 className='text-base font-medium ml-[100px] text-black'>
                                {product?.ingredient?.ingredientName}
                            </h3>
                            <p className='ml-[100px] text-base text-black font-normal'>
                                {product.productType === 'BICH' ? "Bịch" : ""}
                            </p>
                            <div className='ml-[150px]'>
                                <Space.Compact>
                                    <Button
                                        type="default"
                                        icon={<Icon icon="ic:baseline-minus" />}
                                        onClick={() => handleMinus(product.id)}
                                    />
                                    <Input
                                        className='!w-[50px] !text-center'
                                        value={product.quantity || 1}
                                        readOnly
                                    />
                                    <Button
                                        type="default"
                                        icon={<Icon icon="ic:baseline-plus" />}
                                        onClick={() => handlePlus(product.id)}
                                    />
                                </Space.Compact>
                            </div>
                            <p className='ml-[120px] text-[#ee4d2d] text-base font-medium'>
                                {totalPrice.toLocaleString()} <u className='ml-1'>đ</u>
                            </p>
                        </Col>
                    </Row>
                );
            })}
            <Button type="primary" className="mt-4" onClick={handleBuy}>
                Mua hàng
            </Button>
        </div>
    );
}

export default ListCart;
