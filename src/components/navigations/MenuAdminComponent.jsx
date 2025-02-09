import React, { useEffect, useState } from 'react';
import { MenuAdmin, MenuStaff } from '../../utils/menu/menu.navigation';
import { Icon } from "@iconify/react";
import { Link } from 'react-router-dom';
import { User } from '../../stores/storeTest/user';

const MenuAdminComponent = () => {
    const [activeIndex, setActiveIndex] = useState(0); // Mục menu được chọn
    const [openIndex, setOpenIndex] = useState(null); // Menu đang mở
    // const [isAdmin, setIsAdmin] = useState(true);
    const currentUser = User;

    const checkRole = (currentUser) => {
        if (!currentUser || !currentUser.roleName) return MenuStaff; // Tránh lỗi khi user chưa có dữ liệu
        return currentUser.roleName === "ROLE_ADMIN" ? MenuAdmin : MenuStaff;
    };

    const handleItemClick = (index) => {
        setActiveIndex(index);
        if (menuList[index].attribute) {
            // Nếu item có attribute, mở/đóng submenu
            setOpenIndex(openIndex === index ? null : index);
        }
    };

    const handleKeyDown = (event, index) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            handleItemClick(index);
        }
    };

    const menuList = checkRole(currentUser);

    return (
        <div className='w-full'>
            <ul className='w-full'>
                {menuList.map((item, index) => (
                    <React.Fragment key={item.path}>
                        <li
                            onClick={() => handleItemClick(index)}
                            onKeyDown={(event) => handleKeyDown(event, index)}
                            className={`flex items-center gap-3 py-3 px-3 w-full cursor-pointer
                                ${activeIndex === index ? 'bg-[#29aae1] text-white' : 'hover:bg-gray-200'}`}
                        >
                            <Icon className='text-[24px]' icon={item.icon} />
                            <Link className='hover:!text-white font-semibold text-[20px]' to={item.path}>
                                {item.title}
                            </Link>

                            {item.attribute && (
                                <Icon
                                    icon="weui:arrow-filled"
                                    className={`text-[20px] ml-auto mr-2 transition-transform ${openIndex === index ? 'rotate-90' : ''}`}
                                />
                            )}
                        </li>
                        {item.attribute && openIndex === index && (
                            <ul className="ml-6 border-l-2 border-gray-300 pl-4">
                                {item.attribute.map((sub, subIndex) => (
                                    <li key={sub.paht} className="py-2">
                                        <Link
                                            to={sub.paht}
                                            className="text-gray-700 hover:text-blue-500"
                                        >
                                            {sub.subTitle}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </React.Fragment>
                ))}
            </ul>
        </div>
    );
};

export default MenuAdminComponent;
