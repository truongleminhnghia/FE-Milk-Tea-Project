import { Row } from 'antd';
import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import MenuData from '../../../stores/data/menu.json';
import { Icon } from '@iconify/react';

const MenuCustomerComponent = () => {
    const [openDropdown, setOpenDropdown] = useState(null);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const dropdownRefs = useRef({});
    const location = useLocation();
    const navigate = useNavigate();

    const handleMouseEnter = (title) => {
        setOpenDropdown(title);
    };

    const handleMouseLeave = () => {
        setOpenDropdown(null);
    };

    const isActive = (path) => {
        // Check if current path matches or starts with the menu path
        return location.pathname === path || 
               (path !== '/' && location.pathname.startsWith(path));
    };
    
    const handleChildClick = (e, categoryId) => {
        e.preventDefault();
        navigate(`/products?categoryId=${categoryId}`);
        setOpenDropdown(null);
        setMobileMenuOpen(false);
    };

    // Close mobile menu on route change
    useEffect(() => {
        setMobileMenuOpen(false);
    }, [location.pathname]);

    // Close mobile menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (mobileMenuOpen && !event.target.closest('.mobile-menu-container')) {
                setMobileMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [mobileMenuOpen]);

    return (
        <nav className='bg-gradient-to-r from-[#29aae1] to-[#1d8dba] shadow-md sticky top-0 z-40'>
            <div className='container mx-auto relative'>
                {/* Mobile menu button */}
                <div className="md:hidden flex items-center justify-between py-3 px-4">
                    <button 
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="text-white focus:outline-none"
                    >
                        <Icon icon={mobileMenuOpen ? "mdi:close" : "mdi:menu"} width="28" height="28" />
                    </button>
                    <span className="text-white font-medium text-lg">Menu</span>
                    <div className="w-7"></div> {/* Empty space for symmetry */}
                </div>
                
                {/* Mobile menu */}
                <div className={`md:hidden absolute top-full left-0 right-0 bg-white shadow-lg transition-all duration-300 overflow-hidden mobile-menu-container
                    ${mobileMenuOpen ? 'max-h-[80vh] opacity-100' : 'max-h-0 opacity-0'}`}>
                    <ul className="divide-y divide-gray-100">
                        {MenuData.data.map((item) => (
                            <li key={item.title} className="relative">
                                <Link
                                    to={item.path}
                                    className={`block px-6 py-3 font-medium ${isActive(item.path) ? 'text-[#29aae1] font-medium' : 'text-gray-700'}`}
                                    onClick={() => !item.children && setMobileMenuOpen(false)}
                                >
                                    <div className="flex justify-between items-center">
                                        <span>{item.title}</span>
                                        {item.children && (
                                            <Icon 
                                                icon={openDropdown === item.title ? "mdi:chevron-up" : "mdi:chevron-down"} 
                                                width="20" 
                                                height="20"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    setOpenDropdown(openDropdown === item.title ? null : item.title);
                                                }} 
                                            />
                                        )}
                                    </div>
                                </Link>
                                
                                {item.children && (
                                    <div className={`bg-gray-50 overflow-hidden transition-all duration-300
                                        ${openDropdown === item.title ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                                        {item.children.map((sub) => (
                                            <a
                                                key={sub.key}
                                                href="#"
                                                className="block px-8 py-2 text-gray-600 hover:bg-gray-100 hover:text-[#29aae1]"
                                                // onClick={(e) => handleChildClick(e, sub.categoryId)}
                                            >
                                                {sub.title}
                                            </a>
                                        ))}
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
                
                {/* Desktop menu */}
                <ul className='hidden md:flex'>
                    {MenuData.data.map((item) => (
                        <li
                            key={item.title}
                            className={`group relative ${isActive(item.path) ? 'bg-white' : ''}`}
                            onMouseEnter={() => handleMouseEnter(item.title)}
                            onMouseLeave={handleMouseLeave}
                            ref={(el) => (dropdownRefs.current[item.title] = el)}
                        >
                            <Link
                                to={item.path}
                                className={`block px-6 py-3 font-medium transition-colors duration-200 ${
                                    isActive(item.path) 
                                        ? 'text-[#29aae1] bg-white' 
                                        : 'text-white hover:text-white hover:bg-[#1d8dba]'
                                }`}
                            >
                                <span className="inline-flex items-center gap-1">
                                    {item.title}
                                    {item.children && (
                                        <Icon
                                            icon="material-symbols:arrow-drop-down-rounded"
                                            width="20"
                                            height="20"
                                            className="transition-transform duration-200"
                                        />
                                    )}
                                </span>
                            </Link>
                            
                            {item.children && openDropdown === item.title && (
                                <div className="absolute left-0 bg-white shadow-lg rounded-b-md w-auto min-w-[250px] top-full z-10 overflow-hidden animate-fadeIn">
                                    <div className="py-2">
                                        {item.children.map((sub) => (
                                            <a
                                                key={sub.key}
                                                href="#"
                                                className="block text-[15px] font-normal text-gray-700 hover:text-[#29aae1] hover:bg-blue-50 py-2 px-6 whitespace-nowrap transition-colors duration-200"
                                                // onClick={(e) => handleChildClick(e, sub.categoryId)}
                                            >
                                                {sub.title}
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
            
            <style jsx>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(-10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                
                .animate-fadeIn {
                    animation: fadeIn 0.2s ease-out forwards;
                }
            `}</style>
        </nav>
    );
};

export default MenuCustomerComponent;