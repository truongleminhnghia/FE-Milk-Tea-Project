import React, { useEffect, useState } from "react";
import Logo from "../../assets/images/logo/logo.png";
import { Button, Col, Input, Row, Space } from "antd";
import { Icon } from "@iconify/react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/features/authSlice";
import { getByIdService } from "../../services/cart.service";

const Header01 = () => {
    const [searchValue, setSearchValue] = useState("");
    const [cartId, setCartId] = useState('');
    const [totalCart, setTotalCart] = useState(0);
    const currentUser = useSelector(selectUser);
    const navigate = useNavigate();

    const onSearch = () => {
        console.log("user for:", currentUser);
    }

    const fetchCart = async (currentUser) => {
        try {
            const res = await getByIdService(currentUser.id);
            if (res?.data || res.code === 200) {
                setTotalCart(res.data.totalCount)
                setCartId(res.data.id)
                console.log("res", res.data);
            }
        } catch (error) {
            console.error("error", error);
        }
    }

    useEffect(() => {
        fetchCart(currentUser)
    }, [currentUser])


    const goToCart = () => {
        navigate('/customer/gio-hang', { state: { cartId } });
    };

    return (
        <header className="py-2 border-b bg-white">
            <Row className="container mx-auto flex flex-wrap items-center">
                <Col
                    span={24}
                    md={4}
                    className="flex justify-center md:justify-start mb-4 md:mb-0"
                >
                    <Link to={"/"}>
                        <img src={Logo} alt="logo" className="max-w-[120px]" />
                    </Link>
                </Col>

                <Col span={24} md={12} className="flex justify-center md:justify-start mb-4 md:mb-0">
                    <Space.Compact className="w-full">
                        <Input
                            placeholder="Tìm kiếm..."
                            className="rounded-full hover:border-[#29aae1] h-[45px] text-[14px] px-[20px] py-[8px]
                                        outline-none focus-within:outline-none focus:ring-0 focus:border-[#29aae1]"
                            allowClear
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                        />
                        <Button
                            onClick={onSearch}
                            type="primary"
                            className="bg-[#29aae1] shadow-none border-[#29aae1] rounded-full h-[45px] w-auto
                                                        hover:!text-[#29aae1] hover:!bg-white"
                        >
                            <Icon icon="material-symbols:search" width="24" height="24" />
                        </Button>
                    </Space.Compact>
                </Col>

                <Col span={24} md={8} className="flex justify-between md:justify-end items-center">
                    <div className="flex items-center gap-2">
                        <span className="block rounded-full p-2 bg-[#29aae1] text-white">
                            <Icon icon="bxs:phone" width="24" height="24" />
                        </span>
                        <div>
                            <span className="block text-[#094067] text-xs font-normal">
                                Hỗ trợ khách hàng
                            </span>
                            <span className="block text-[#094067] text-xs font-bold">
                                028.6868.7303
                            </span>
                        </div>
                    </div>

                    <div className="ml-4">
                        <div className="flex items-center border-2 border-gray-200 p-2 rounded-lg"
                            onClick={goToCart}
                            onKeyDown={(event) => handleKeyDown(event, onEnterPress)}
                        >
                            <span className="block text-[#29aae1]">
                                <Icon icon="fluent:cart-24-filled" width="30" height="30" />
                            </span>
                            <span className="ml-2 text-[#094067] text-base font-medium"
                            >
                                Giỏ hàng
                            </span>
                            <span className="block bg-[#29aae1] px-[6px] py-[4px] rounded ml-2 text-white text-xs">
                                {totalCart}
                            </span>
                        </div>
                    </div>
                </Col>
            </Row>
        </header>
    );
};

export default Header01;
