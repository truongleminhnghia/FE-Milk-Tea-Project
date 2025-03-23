import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Menu } from "antd";
import { Icon } from "@iconify/react";
// import './SidebarComponent.css'; // Import the custom CSS file

// Default menu items
const defaultItems = [
    {
        key: "/admin-page/dashboard",
        icon: <Icon icon="mdi:view-dashboard-outline" className="text-lg" />,
        label: "Dashboard",
    },
    {
        key: "/admin-page/accountss",
        icon: <Icon icon="mdi:account-group-outline" className="text-lg" />,
        label: "Tài khoản",
        children: [
            { key: "/admin-page/accounts", label: "Doanh mục tài khoản" },
            { key: "/admin-page/create-account", label: "Tạo mới tài khoản" },
            { key: "/admin-page/update-account", label: "Cập nhật tài khoản" },
        ],
    },
    {
        key: "/admin-page/orders",
        icon: <Icon icon="mdi:cart-outline" className="text-lg" />,
        label: "Đơn hàng",
        children: [
            { key: "/admin-page/orders/all", label: "Tất cả" },
            { key: "/admin-page/orders/new", label: "Đơn hàng mới" },
        ],
    },
    {
        key: "/products",
        icon: <Icon icon="mdi:package-variant-closed" className="text-lg" />,
        label: "Sản phẩm",
        children: [
            { key: "/admin-page/categories", label: "Danh mục sản phẩm" },
            { key: "/admin-page/products", label: "Danh sách sản phẩm" },
            { key: "/admin-page/create-product", label: "Tạo mới sản phẩm" },
        ],
    },
    {
        key: "/recipes",
        icon: <Icon icon="mdi:book-open-variant" className="text-lg" />,
        label: "Công thức",
        children: [
            { key: "/admin-page/recipes", label: "Danh sách công thức" },
            { key: "/admin-page/create-recipes", label: "Tạo mới công thức" },
        ],
    },
    {
        key: "/recipes",
        icon: <Icon icon="mdi:book-open-variant" className="text-lg" />,
        label: "Công thức",
        children: [
            { key: "/staff-page/recipes", label: "Danh sách công thức" },
            { key: "/staff-page/create-recipes", label: "Tạo mới công thức" },
        ],
    },
    {
        key: "/admin-page/users",
        icon: <Icon icon="mdi:account-outline" className="text-lg" />,
        label: "Người dùng",
        children: [
            { key: "/admin-page/users/all", label: "Tất cả" },
            { key: "/admin-page/users/new", label: "Người dùng mới" },
        ],
    },
];

const SidebarComponent = ({ menuItems = defaultItems, collapsed }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const [selectedKey, setSelectedKey] = useState(location.pathname);
    const [stateOpenKeys, setStateOpenKeys] = useState([]);

    useEffect(() => {
        setSelectedKey(location.pathname);

        const parentItem = menuItems.find(item => item.children?.some(child => location.pathname.startsWith(child.key)));

        if (parentItem) {
            setStateOpenKeys([parentItem.key]);
        }
    }, [location.pathname, menuItems]);
    
    const onSelect = ({ key }) => {
        setSelectedKey(key);
        navigate(key);
    };
    
    const onOpenChange = (openKeys) => {
        setStateOpenKeys(collapsed ? [] : openKeys);
    };
    
    return (
        <div className="sidebar-wrapper h-full">
            <Menu
                mode="inline"
                selectedKeys={[selectedKey]}
                openKeys={stateOpenKeys}
                onSelect={onSelect}
                onOpenChange={onOpenChange}
                items={collapsed ? menuItems : menuItems.map(item => ({
                    ...item,
                    label: item.extra ? (
                        <div className="flex items-center justify-between">
                            <span>{item.label}</span>
                            {item.extra}
                        </div>
                    ) : item.label
                }))}
                className="border-0 h-full pt-2"
                style={{
                    backgroundColor: "transparent",
                    fontSize: "14px",
                }}
                theme="light"
            />
            
            <style jsx="true">{`
                /* Blue theme customization using CSS */
                .ant-menu-light.ant-menu-inline .ant-menu-item-selected {
                    background-color: #eaf6fc !important;
                    color: #29aae1 !important;
                    font-weight: 500;
                    border-right: 3px solid #29aae1 !important;
                }
                
                .ant-menu-light.ant-menu-inline .ant-menu-submenu-selected >.ant-menu-submenu-title {
                    color: #29aae1 !important;
                    font-weight: 500;
                }
                
                .ant-menu-light .ant-menu-item:hover {
                    color: #29aae1 !important;
                }
                
                .ant-menu-light .ant-menu-submenu-title:hover {
                    color: #29aae1 !important;
                }
                
                .ant-menu-inline .ant-menu-item {
                    margin: 4px 0;
                    padding-left: 24px !important;
                }
                
                .ant-menu-light.ant-menu-inline .ant-menu-sub.ant-menu-inline {
                    background: #f9fafb !important;
                }
            `}</style>
        </div>
    );
};

export default SidebarComponent;
