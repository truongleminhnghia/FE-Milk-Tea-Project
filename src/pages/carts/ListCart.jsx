import React, { useEffect, useMemo, useState } from "react";
import { Button, Checkbox, Col, Input, Row, Space } from "antd";
import { Icon } from "@iconify/react";
import { formatCurrencyVND } from "../../utils/utils";
import BreadcrumbComponent from "../../components/navigations/BreadcrumbComponent";
import { useLocation } from "react-router-dom";
import { getListItemByCart } from "../../services/cart.service";

const ListCart = () => {
    const location = useLocation();
    const [cartItem, setCartItem] = useState([]);
    const { cartId } = location.state || { cartId: '' };
    const [quantities, setQuantities] = useState({});

    useEffect(() => {
        console.log("Cart ID:", cartId);
        getList(cartId);
    }, [cartId]);

    const getList = async (id) => {
        try {
            const res = await getListItemByCart(id);
            if (res?.data || res?.success) {
                setCartItem(res.data);
                const initialQuantities = res.data.reduce((acc, item) => {
                    acc[item.id] = item.Quantity || 1;
                    return acc;
                }, {});
                setQuantities(initialQuantities);
                console.log("data item", res.data);
            }
        } catch (error) {
            console.log("error", error);
        }
    };

    const [checkedList, setCheckedList] = useState({});

    const handleCheck = (ingredientCode, checked) => {
        setCheckedList((prev) => ({
            ...prev,
            [ingredientCode]: checked,
        }));
    };

    const handleCheckAll = (checked) => {
        const newCheckedList = {};
        cartItem.forEach((item) => {
            newCheckedList[item.id] = checked;
        });
        setCheckedList(newCheckedList);
    };

    const handleIncrease = (ingredientCode) => {
        setQuantities((prev) => ({
            ...prev,
            [ingredientCode]: prev[ingredientCode] + 1,
        }));
    };

    const handleDecrease = (ingredientCode) => {
        setQuantities((prev) => ({
            ...prev,
            [ingredientCode]: prev[ingredientCode] > 1 ? prev[ingredientCode] - 1 : 1,
        }));
    };

    const handleChange = (ingredientCode, value) => {
        if (/^\d+$/.test(value) && Number(value) >= 1) {
            setQuantities((prev) => ({
                ...prev,
                [ingredientCode]: Number(value),
            }));
        }
    };

    const totalPriceOnItem = (quantity, price) => quantity * price;

    const getTotalPrice = useMemo(() => {
        return cartItem.reduce((total, item) => {
            if (checkedList[item.id]) {
                const price = item?.ingredient?.pricePromotion > 0.0 ? item?.ingredient?.pricePromotion : item?.ingredient?.priceOrigin;
                total += quantities[item.id] * price;
            }
            return total;
        }, 0);
    }, [quantities, checkedList, cartItem]);

    const handleSubmit = () => {
        const checkedItems = cartItem.filter((item) => checkedList[item.id]);
        const totalPrice = getTotalPrice;
        const formData = {
            items: checkedItems.map((item) => ({
                Id: item.id,
                Quantity: quantities[item.id],
                Price: item?.ingredient?.pricePromotion > 0.0 ? item?.ingredient?.pricePromotion : item?.ingredient?.priceOrigin
            })),
            totalPrice,
        };
        console.log("Form data to send to backend:", formData);
        // Send formData to backend
    };

    const breadcrumbItems = [
        { title: 'Trang chủ', href: '/' },
        { title: 'Giỏ hàng' }
    ];

    return (
        <Row>
            <div className="container">
                <Row>
                    <BreadcrumbComponent items={breadcrumbItems} />
                </Row>
                <Row className="bg-white py-2 px-2 rounded-lg border-[#747474] mt-3">
                    <Col span={24} className="text-[24px] font-medium text-black">Giỏ hàng</Col>
                    <Col span={24} className="mt-3 rounded-lg border-[#747474]">
                        <Checkbox
                            className="text-[16px] text-black"
                            onChange={(e) => handleCheckAll(e.target.checked)}
                        >
                            Chọn tất cả
                        </Checkbox>
                    </Col>
                </Row>
                <Row>
                    {cartItem.map((item) => (
                        <Col span={24} key={item.id} className="flex flex-col gap-3 mt-3">
                            <Row className="items-center bg-white px-3 py-3 rounded-lg border-[#747474] w-full justify-between">
                                <Checkbox
                                    checked={checkedList[item.id] || false}
                                    onChange={(e) => handleCheck(item.id, e.target.checked)}
                                />
                                <img
                                    src={item?.ingredient?.images[0]?.imageURL}
                                    alt={item?.ingredient?.ingredientName}
                                    className="h-[100px] w-[100px] object-cover ml-3 rounded-lg" />
                                <p
                                    className="text-[18px] text-black font-medium max-w-[300px] line-clamp-1 ml-3"
                                >
                                    {item?.ingredient?.ingredientName}
                                </p>
                                <p className="ml-3 text-[16px] font-medium text-black max-w-[200px]">
                                    {item?.ingredient?.pricePromotion > 0.0 ? (
                                        <>
                                            <strong>{formatCurrencyVND(item?.ingredient?.pricePromotion)}</strong>
                                            <strong className="text-[12px] line-through text-[#747474] ">{formatCurrencyVND(item?.ingredient?.priceOrigin)}</strong>
                                        </>
                                    ) : (
                                        <strong>{formatCurrencyVND(item?.ingredient?.priceOrigin)}</strong>
                                    )}
                                </p>
                                <Space.Compact className="h-[40px] ml-3 max-w-[150px]" >
                                    <Button
                                        className="h-full"
                                        type="default"
                                        icon={<Icon icon="ic:baseline-minus" />}
                                        onClick={() => handleDecrease(item.id)}
                                    />
                                    <Input
                                        className='!w-[50px] !text-center'
                                        value={quantities[item?.id]}
                                        onChange={(e) => handleChange(item.id, e.target.value)}
                                    />
                                    <Button
                                        className="h-full"
                                        type="default"
                                        icon={<Icon icon="ic:baseline-plus" />}
                                        onClick={() => handleIncrease(item.id)}
                                    />
                                </Space.Compact>
                                <p className="max-w-[200px] text-[16px] font-normal text-[#ee4d2d]"><strong>{formatCurrencyVND(totalPriceOnItem(quantities[item.id], item?.ingredient?.pricePromotion > 0.0 ? item?.ingredient?.pricePromotion : item?.ingredient?.priceOrigin))}</strong></p>
                            </Row>
                        </Col>
                    ))}
                </Row>
                <Row className="mt-5 p-4 bg-white rounded-lg shadow-md flex items-center justify-between border border-gray-300">
                    <Col>
                        <span className="text-lg font-medium text-black">Tổng tiền: </span>
                        <span className="text-2xl font-bold text-[#ee4d2d]">
                            {formatCurrencyVND(getTotalPrice)}
                        </span>
                    </Col>
                    <Col>
                        <Button
                            type="primary"
                            className="bg-[#ee4d2d] text-white text-lg px-6 py-2 rounded-lg"
                            disabled={getTotalPrice === 0} // Chỉ cho phép thanh toán khi có sản phẩm được chọn
                            onClick={handleSubmit}
                        >
                            Thanh toán ({Object.values(checkedList).filter(Boolean).length} sản phẩm)
                        </Button>
                    </Col>
                </Row>
            </div>
        </Row>
    );
};

export default ListCart;
