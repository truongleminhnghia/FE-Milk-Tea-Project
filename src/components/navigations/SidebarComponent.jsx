import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import để điều hướng
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
            { key: "new-product", label: "Tạo mới sản phẩm" },
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
        key: "user",
        icon: <SettingOutlined />,
        label: "Người dùng",
        children: [
            { key: "users", label: "Tất cả" },
            { key: "", label: "Người dùng mới" },
        ],
    },
];

const SidebarComponent = () => {
    const navigate = useNavigate(); // Hook điều hướng
    const [selectedKey, setSelectedKey] = useState("dashboard"); // Mặc định chọn Dashboard
    const [stateOpenKeys, setStateOpenKeys] = useState([]); // Danh sách menu mở

    // Xử lý sự kiện khi chọn menu
    const onSelect = ({ key }) => {
        setSelectedKey(key);
        navigate(key); // Điều hướng trang

        // Kiểm tra xem có phải menu cha không
        const parentItem = items.find(item => item.key === key);

        if (parentItem?.children?.length > 0) {
            const firstChildKey = parentItem.children[0].key; // Lấy phần tử con đầu tiên
            setSelectedKey(firstChildKey);
            setStateOpenKeys([key]); // Mở menu cha
            navigate(firstChildKey);
        }
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
        />
    );
};

export default SidebarComponent;
