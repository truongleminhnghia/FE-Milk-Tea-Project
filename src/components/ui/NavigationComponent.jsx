import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const NavigationComponent = () => {
    const location = useLocation();
    const [openDropdown, setOpenDropdown] = useState(null);

    // Hàm kiểm tra active
    const isActive = (path) => location.pathname === path;

    const menu = [
        {
            title: "Trang chủ",
            path: "/"
        },
        {
            title: "Nguyên liệu",
            path: "/products",
            dropdown: [
                { title: "Loại 1", path: "/nguyenlieu1" },
                { title: "Loại 2", path: "/nguyenlieu2" }
            ]
        },
        {
            title: "Công thức",
            path: "/recipes",
            dropdown: [
                { title: "Món 1", path: "/congthuc1" },
                { title: "Món 2", path: "/congthuc2" }
            ]
        },
        {
            title: "Khuyến mãi",
            path: "/khuyen-mai"
        },
        {
            title: "Giới thiệu",
            path: "/gioi-thieu"
        }
    ];

    return (
        <nav className="bg-[#EF2A39] text-white">
            <div className="container mx-auto relative">
                <ul className="flex space-x-6 py-3 uppercase text-base">
                    {menu.map((item, index) => (
                        <li
                            key={index}
                            className=""
                            onMouseEnter={() => item.dropdown && setOpenDropdown(item.title)}
                            onMouseLeave={() => setOpenDropdown(null)}
                        >
                            <span className={`cursor-pointer px-4 py-2 hover:text-gray-300 dropdown-parent
                                ${isActive(item.path) ? "border-b-2 border-white" : ""}`
                            }>
                                <Link to={item.path}>{item.title} {item.dropdown && "▾"}</Link>
                            </span>

                            {item.dropdown && openDropdown === item.title && (
                                <ul className="absolute top-full left-0  bg-white text-black shadow-lg w-full z-50">
                                    {item.dropdown.map((subItem, subIndex) => (
                                        <li key={subIndex} className="px-4 py-2 hover:bg-gray-200">
                                            <Link to={subItem.path}>{subItem.title}</Link>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
};

export default NavigationComponent;
