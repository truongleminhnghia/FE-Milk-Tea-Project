import React, { useEffect, useState } from "react";
import Logo from "/images/logo/babo.png";
import { Button, Col, Input, Row, Space, Badge, Dropdown, Avatar, Menu } from "antd";
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
        if (searchValue.trim()) {
            navigate(`/products?search=${encodeURIComponent(searchValue.trim())}`);
        }
    }

    const fetchCart = async (currentUser) => {
        try {
            const res = await getByIdService(currentUser.id);
            if (res?.data || res.code === 200) {
                setTotalCart(res.data.totalCount)
                setCartId(res.data.id)
            }
        } catch (error) {
            console.error("error", error);
        }
    }

    useEffect(() => {
        if (currentUser?.id) {
            fetchCart(currentUser);
        }
    }, [currentUser]);

    const goToCart = () => {
        if (currentUser == null) {
            navigate('/login');
        } else {
            navigate('/customer/gio-hang', { state: { cartId } });
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            onSearch();
        }
    };

    const userMenu = (
        <Menu
            items={[
                {
                    key: '1',
                    label: <Link to="/profile">Tài khoản của tôi</Link>,
                    icon: <Icon icon="mdi:account-outline" className="mr-2" />,
                },
                {
                    key: '2',
                    label: <Link to="/orders">Đơn hàng của tôi</Link>,
                    icon: <Icon icon="material-symbols:order-approve-outline" className="mr-2" />,
                },
                {
                    key: '3',
                    label: 'Đăng xuất',
                    icon: <Icon icon="material-symbols:logout" className="mr-2" />,
                    danger: true,
                },
            ]}
        />
    );

    return (
        <header className="py-3 border-b shadow-sm bg-white sticky top-0 z-50">
            <div className="container mx-auto">
                <Row gutter={[16, 16]} align="middle" className="items-center">
                    {/* Logo */}
                    <Col xs={24} sm={24} md={4} lg={4} xl={4} className="flex justify-center md:justify-start">
                        <Link to={"/"} className="transition-transform hover:scale-105">
                            <img src={Logo} alt="logo" className="max-w-[130px]" />
                        </Link>
                    </Col>

                    {/* Search Bar */}
                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                        <Space.Compact className="w-full">
                            <Input
                                placeholder="Tìm kiếm sản phẩm..."
                                className="rounded-l-full hover:border-[#29aae1] h-[45px] text-[14px] px-[20px] py-[8px]
                                        outline-none focus-within:outline-none focus:ring-0 focus:border-[#29aae1]"
                                allowClear
                                value={searchValue}
                                onChange={(e) => setSearchValue(e.target.value)}
                                onKeyPress={handleKeyPress}
                                prefix={<Icon icon="material-symbols:search" className="text-gray-400 mr-2" width="20" height="20" />}
                            />
                            <Button
                                onClick={onSearch}
                                type="primary"
                                className="bg-[#29aae1] shadow-none border-[#29aae1] rounded-r-full h-[45px] px-5
                                        hover:!bg-[#1d8dba] hover:!border-[#1d8dba] transition-all"
                            >
                                Tìm kiếm
                            </Button>
                        </Space.Compact>
                    </Col>

                    {/* Contact and Cart */}
                    <Col xs={24} sm={24} md={8} lg={8} xl={8} className="flex justify-center md:justify-end items-center gap-4">
                        {/* Phone Contact */}
                        <div className="flex items-center gap-3 bg-blue-50 px-3 py-2 rounded-lg transition-transform hover:scale-105">
                            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#29aae1] text-white">
                                <Icon icon="bxs:phone" width="20" height="20" />
                            </div>
                            <div>
                                <span className="block text-gray-500 text-xs font-normal">
                                    Hỗ trợ khách hàng
                                </span>
                                <span className="block text-[#094067] text-sm font-bold">
                                    028.6868.7303
                                </span>
                            </div>
                        </div>

                        {/* Shopping Cart */}
                        <Badge count={totalCart} color="#29aae1" overflowCount={99}>
                            <Button
                                type="default"
                                onClick={goToCart}
                                className="flex items-center border-2 border-gray-200 hover:border-[#29aae1] py-5 px-4 rounded-lg transition-all hover:bg-blue-50"
                                icon={<Icon icon="fluent:cart-24-filled" className="text-[#29aae1]" width="24" height="24" />}
                            >
                                <span className="ml-2 text-gray-700 text-sm font-medium">
                                    Giỏ hàng
                                </span>
                            </Button>
                        </Badge>

                        {/* User Account */}
                        {/* {currentUser?.id ? (
                            <Dropdown overlay={userMenu} placement="bottomRight" arrow>
                                <Button 
                                    type="default" 
                                    className="flex items-center border-2 border-gray-200 hover:border-[#29aae1] py-5 px-4 rounded-lg transition-all hover:bg-blue-50"
                                    icon={<Icon icon="mdi:user-circle" className="text-[#29aae1]" width="24" height="24" />}
                                >
                                    <span className="ml-2 text-gray-700 text-sm font-medium hidden md:inline">
                                        {currentUser.name || 'Tài khoản'}
                                    </span>
                                </Button>
                            </Dropdown>
                        ) : (
                            <Link to="/login">
                                <Button 
                                    type="primary" 
                                    className="flex items-center bg-[#29aae1] border-[#29aae1] py-5 px-4 rounded-lg transition-all hover:!bg-[#1d8dba]"
                                    icon={<Icon icon="mdi:login" width="20" height="20" />}
                                >
                                    <span className="ml-2 text-white text-sm font-medium">
                                        Đăng nhập
                                    </span>
                                </Button>
                            </Link>
                        )} */}
                    </Col>
                </Row>
            </div>
        </header>
    );
};

export default Header01;
