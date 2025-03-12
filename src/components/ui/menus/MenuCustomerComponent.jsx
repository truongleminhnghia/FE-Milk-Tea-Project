import { Row } from 'antd';
import React, { useState, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import MenuData from '../../../stores/data/menu.json';
import { Icon } from '@iconify/react';

const MenuCustomerComponent = () => {
    const [openDropdown, setOpenDropdown] = useState(null);
    const dropdownRefs = useRef({});
    const location = useLocation();

    const handleMouseEnter = (title) => {
        setOpenDropdown(title);
    };

    const handleMouseLeave = () => {
        setOpenDropdown(null);
    };

    const isActive = (path) => location.pathname === path;

    return (
        <nav className='bg-[#29aae1]'>
            <Row className='container'>
                <ul className='flex'>
                    {MenuData.data.map((item, index) => (
                        <li
                            key={item.title}
                            className={`group relative text-white text-lg px-3 py-3 ${isActive(item.path) ? 'bg-white text-[#29aae1]' : ''}`}
                            onMouseEnter={() => handleMouseEnter(item.title)}
                            onMouseLeave={handleMouseLeave}
                            ref={(el) => (dropdownRefs.current[item.title] = el)}
                        >
                            <Link
                                to={item.path}
                                className={`block px-6 py-2 font-medium hover:text-[#29aae1] ${isActive(item.path) ? 'text-[#29aae1] bg-white font-bold' : 'text-white'}`}
                            >
                                <span className="inline-flex text-[18px] items-center">
                                    {item.title}
                                    {item.children && (
                                        <Icon
                                            icon="material-symbols:arrow-drop-down-rounded"
                                            width="20"
                                            height="20"
                                        />
                                    )}
                                </span>
                            </Link>
                            {item.children && openDropdown === item.title && (
                                <div className="absolute left-0 bg-white shadow-lg p-6 rounded-sm h-auto w-full top-full z-10">
                                    <div className="grid grid-cols-1 gap-4">
                                        {item.children.map((sub) => (
                                            <div key={sub.key} className="w-full">
                                                <h2 className="text-[16px] font-medium text-black hover:text-[#29aae1]">
                                                    {sub.title}
                                                </h2>
                                                <ul>
                                                    <li>
                                                        <Link to={sub.path} className="block text-[14px] font-normal my-[8px] hover:text-[#ff9897]">
                                                            {sub.title}
                                                        </Link>
                                                    </li>
                                                </ul>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            </Row>
        </nav>
    );
};

export default MenuCustomerComponent;