import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Icon } from '@iconify/react'
import { useSelector, useDispatch } from "react-redux";
import DropdownMenuUserComponent from './Dropdown/DropdownMenuUserComponent'
import { selectUser } from "../../redux/features/authSlice";

const TopHeader = () => {
    const currentUser = useSelector(selectUser);
    const isUser = useState(true);
    
    return (
        <div className='bg-gradient-to-r from-[#29aae1] to-[#1d8dba] py-2 relative z-[9999] shadow-sm'>
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center">
                    <div className="flex items-center">
                        <Icon icon="mdi:store" className="text-white mr-2" width="18" height="18" />
                        <Link className="text-sm text-white font-medium hover:text-blue-100 transition-colors">
                            Chào mừng đến với Tobee Food!
                        </Link>
                    </div>
                    
                    <ul className='flex gap-6 items-center'>
                        <li>
                            <Link to="/about" className="flex items-center gap-2 text-sm text-white font-medium hover:text-blue-100 transition-colors">
                                <Icon icon="mdi:information-outline" width="18" height="18" />
                                <span className="hidden sm:inline">Giới thiệu</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/contact" className="flex items-center gap-2 text-sm text-white font-medium hover:text-blue-100 transition-colors">
                                <Icon icon="humbleicons:phone" width="18" height="18" />
                                <span className="hidden sm:inline">Liên hệ</span>
                            </Link>
                        </li>
                        <li className="relative">
                            {!currentUser ? (
                                <Link to={"/login"} className='flex items-center gap-2 text-sm text-white font-medium hover:text-blue-100 transition-colors'>
                                    <Icon icon="mdi:user" width="18" height="18" />
                                    <span>Đăng nhập</span>
                                </Link>
                            ) : (
                                <div className="flex items-center">
                                    <DropdownMenuUserComponent isUser={isUser} currentUser={currentUser} />
                                </div>
                            )}
                        </li>
                    </ul>
                </div>
            </div>
            
            {/* Responsive mobile menu for small screens */}
            <div className="sm:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-2 px-4 z-50">
                <div className="flex justify-around items-center">
                    <Link to="/" className="flex flex-col items-center text-[#29aae1]">
                        <Icon icon="mdi:home" width="24" height="24" />
                        <span className="text-xs mt-1">Trang chủ</span>
                    </Link>
                    <Link to="/products" className="flex flex-col items-center text-gray-500 hover:text-[#29aae1]">
                        <Icon icon="mdi:shopping" width="24" height="24" />
                        <span className="text-xs mt-1">Sản phẩm</span>
                    </Link>
                    <Link to="/customer/gio-hang" className="flex flex-col items-center text-gray-500 hover:text-[#29aae1]">
                        <Icon icon="mdi:cart" width="24" height="24" />
                        <span className="text-xs mt-1">Giỏ hàng</span>
                    </Link>
                    <Link to="/contact" className="flex flex-col items-center text-gray-500 hover:text-[#29aae1]">
                        <Icon icon="mdi:phone" width="24" height="24" />
                        <span className="text-xs mt-1">Liên hệ</span>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default TopHeader
