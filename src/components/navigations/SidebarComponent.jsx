import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AppstoreOutlined, MailOutlined, SettingOutlined, UserOutlined } from "@ant-design/icons";
import { Menu } from "antd";
// import './SidebarComponent.css'; // Import the custom CSS file

const items = [
    {
        key: "/admin-page/dashboard",
        icon: <MailOutlined />,
        label: "Dashboard",
    },
    {
        key: "/admin-page/accountss",
        icon: <AppstoreOutlined />,
        label: "Tài khoản",
        children: [
            { key: "/admin-page/accounts", label: "Doanh mục tài khoản" },
            { key: "/admin-page/create-account", label: "Tạo mới tài khoản" },
        ],
    },
    {
        key: "/admin-page/orders",
        icon: <AppstoreOutlined />,
        label: "Đơn hàng",
        children: [
            { key: "/admin-page/orders/all", label: "Tất cả" },
            { key: "/admin-page/orders/new", label: "Đơn hàng mới" },
        ],
    },
    {
        key: "/products",
        icon: <SettingOutlined />,
        label: "Sản phẩm",
        children: [
            { key: "/admin-page/categories", label: "Danh mục sản phẩm" },
            { key: "/admin-page/products", label: "Danh sách sản phẩm" },
            { key: "/admin-page/create-product", label: "Tạo mới sản phẩm" },
        ],
    },
    {
        key: "/recipes",
        icon: <SettingOutlined />,
        label: "Công thức",
        children: [
            { key: "/admin-page/recipes", label: "Danh sách công thức" },
            { key: "/admin-page/create-recipes", label: "Tạo mới công thức" },
        ],
    },
    {
        key: "/admin-page/users",
        icon: <UserOutlined />,
        label: "Người dùng",
        children: [
            { key: "/admin-page/users/all", label: "Tất cả" },
            { key: "/admin-page/users/new", label: "Người dùng mới" },
        ],
    },
];

const SidebarComponent = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // Lấy `selectedKey` từ URL
    const [selectedKey, setSelectedKey] = useState(location.pathname);
    const [stateOpenKeys, setStateOpenKeys] = useState([]);

    // Khi reload trang, cập nhật `selectedKey` và mở menu cha tương ứng
    useEffect(() => {
        setSelectedKey(location.pathname);

        // Tìm menu cha chứa đường dẫn hiện tại
        const parentItem = items.find(item => item.children?.some(child => location.pathname.startsWith(child.key)));

        if (parentItem) {
            setStateOpenKeys([parentItem.key]); // Mở menu cha
        }
    }, [location.pathname]);

    // Xử lý chọn menu
    const onSelect = ({ key }) => {
        setSelectedKey(key);
        navigate(key);
    };

    // Xử lý mở menu cha
    const onOpenChange = (openKeys) => {
        setStateOpenKeys(openKeys);
    };

    return (
        <Menu
            mode="inline"
            selectedKeys={[selectedKey]}
            openKeys={stateOpenKeys}
            onSelect={onSelect}
            onOpenChange={onOpenChange}
            items={items}
            className="custom-menu" // Apply custom class
        />
    );
};

export default SidebarComponent;
