import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Icon } from '@iconify/react'
import { useSelector, useDispatch } from "react-redux";
import DropdownMenuUserComponent from './Dropdown/DropdownMenuUserComponent'
import { selectUser } from "../../redux/features/authSlice";

const TopHeader = () => {
    const currentUser = useSelector(selectUser);
    const isUser = useState(true);
    return (
        <div className='bg-[#29aae1] py-3 relative z-[9999]'>
            <div className="container">
                <div className="flex justify-between items-center">
                    <Link className="text-xs text-white font-semibold hover:opacity-85">
                        Chào mừng đến với Tobee Food!
                    </Link>
                    <ul className='flex gap-4 items-center'>
                        <li className='hover:opacity-85'>
                            <Link className="flex items-center gap-2 text-xs text-white font-semibold">
                                <Icon icon="humbleicons:phone" width="16" height="16" />
                                <span>Liên hệ</span>
                            </Link>
                        </li>
                        <li className='hover:opacity-85'>
                            {!currentUser ? (
                                <Link to={"/login"} className='flex items-center gap-2 text-xs text-white font-semibold'>
                                    <Icon icon="mdi:user" width="16" height="16" />
                                    Đăng nhập
                                </Link>
                            ) : (
                                <DropdownMenuUserComponent isUser={isUser} currentUser={currentUser} />
                            )}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default TopHeader
