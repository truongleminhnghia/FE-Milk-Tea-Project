import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AppstoreOutlined, MailOutlined, SettingOutlined } from "@ant-design/icons";
import { Menu } from "antd";

const items = [
    {
        key: "dashboard",
        icon: <MailOutlined />,
        label: "Dashboard",
    },
    {
        key: "new-order",
        icon: <AppstoreOutlined />,
        label: "Đơn hàng mới",
    },
    {
        key: "product",
        icon: <SettingOutlined />,
        label: "Sản phẩm",
        children: [
            { key: "categories", label: "Danh mục sản phẩm" },
            { key: "products", label: "Danh sách sản phẩm" },
            { key: "create-product", label: "Tạo mới sản phẩm" },
        ],
    },
    {
        key: "order",
        icon: <SettingOutlined />,
        label: "Đơn hàng",
        children: [
            { key: "orders", label: "Tất cả" },
            { key: "new-order", label: "Đơn hàng mới" },
        ],
    },
    {
        key: "/user",
        icon: <SettingOutlined />,
        label: "Người dùng",
        children: [
            { key: "users", label: "Tất cả" },
            { key: "new-user", label: "Người dùng mới" },
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
        const parentItem = items.find(item => item.children?.some(child => child.key === location.pathname));

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
            style={{ fontFamily: "inherit" }}
        />
    );
};

export default SidebarComponent;
