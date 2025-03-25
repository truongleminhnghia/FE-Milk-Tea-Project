import React, { useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import Header03 from '../ui/Header03'
import SidebarComponent from '../navigations/SidebarComponent'
import { Layout } from 'antd'
import { Icon } from "@iconify/react";

const { Sider, Content } = Layout;

// Define custom menu items for customer/staff layout
const menuStaff = [
    {
        key: "/staff-page",
        icon: <Icon icon="mdi:account-group-outline" className="text-lg" />,
        label: "Đơn hàng mới"
    },
    {
        key: "/staff-page/accounts",
        icon: <Icon icon="mdi:account-group-outline" className="text-lg" />,
        label: "Tài khoản"
    },
    {
        key: "/staff-page/orders",
        icon: <Icon icon="mdi:cart-outline" className="text-lg" />,
        label: "Đơn hàng",
        children: [
            { key: "/staff-page/orders", label: "Tất cả" },
            { key: "/staff-page/orders/new", label: "Đơn hàng mới" },
        ],
    },
    {
        key: "/products",
        icon: <Icon icon="mdi:package-variant-closed" className="text-lg" />,
        label: "Sản phẩm",
        children: [
            { key: "/staff-page/categories", label: "Danh mục sản phẩm" },
            { key: "/staff-page/products", label: "Danh sách sản phẩm" },
            { key: "/staff-page/create-product", label: "Tạo mới sản phẩm" },
        ],
    },
    {
        key: "/recipes",
        icon: <Icon icon="mdi:book-open-variant" className="text-lg" />,
        label: "Công thức",
        children: [
            { key: "/staff-page/recipes", label: "Danh sách công thức" },
            { key: "/staff-page/create-recipes", label: "Tạo mới công thức" },
            { key: "/staff-page/update-recipes", label: "Cập nhật công thức" },
        ],
    },
    {
        key: "/promotions",
        icon: <Icon icon="lsicon:badge-promotion-filled" className="text-lg"  />,
        label: "Khuyến mãi",
        children: [
            { key: "/staff-page/promotions", label: "Danh sách mã khuyến mãi" },
            { key: "/staff-page/create-promotions", label: "Tạo mã khuyến mãi" },
            { key: "/staff-page/update-promotions", label: "Cập nhật mã khuyến mãi" },
            { key: "/staff-page/delete-promotions", label: "Xóa mã khuyến mãi" },
        ],
    }
];

const Layout03 = () => {
    const [collapsed, setCollapsed] = useState(false);

    const toggleSidebar = () => {
        setCollapsed(!collapsed);
    };

    return (
        <Layout className="min-h-screen">
            <Sider 
                width={250} 
                collapsedWidth={80}
                collapsed={collapsed}
                className="bg-white border-r border-gray-100"
                style={{ 
                    overflow: 'auto',
                    height: '100vh',
                    position: 'fixed',
                    left: 0,
                    zIndex: 10
                }}
            >
                <div className="py-4 px-6 flex justify-center border-b border-gray-100">
                    <Link to="/customer/dashboard" className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-[#29aae1] flex items-center justify-center">
                            <span className="text-white font-bold">T</span>
                        </div>
                        {!collapsed && (
                            <span className="ml-2 font-bold text-lg text-gray-800">
                                <span className="text-[#29aae1]">Tea</span> Shop
                            </span>
                        )}
                    </Link>
                </div>
                <div className="px-3 py-4 border-b border-gray-100">
                    <div className="text-xs text-gray-400 font-medium pl-3 mb-1">
                        {!collapsed && "KHÁCH HÀNG"}
                    </div>
                    <SidebarComponent menuItems={menuStaff} collapsed={collapsed} />
                </div>
            </Sider>
            
            <Layout style={{ marginLeft: collapsed ? 80 : 250, transition: 'margin-left 0.2s' }}>
                <Header03 toggleSidebar={toggleSidebar} />
                <Content 
                    className="p-6 bg-gray-50 min-h-[calc(100vh-64px)]"
                >
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    )
}

export default Layout03 