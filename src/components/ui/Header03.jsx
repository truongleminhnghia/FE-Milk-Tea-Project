import React from 'react'
import { Icon } from "@iconify/react";
import { Input, Row } from 'antd';
import { useSelector, useDispatch } from "react-redux";
import UserHook from '../../protectedRoute/hook/UserHook';
import { selectUser } from "../../redux/features/authSlice";
import DropdownMenuUserComponent from './Dropdown/DropdownMenuUserComponent';
const Header03 = () => {
    const isUser = false;
    const currentUser = useSelector(selectUser);
    return (
        <div
            className='flex items-center bg-white shadow-md py-3 px-3'>
            <div
                className='mr-4'
            >
                <Icon
                    className='text-[#000] text-[24px] hover:text-[#29aae1]'
                    icon="material-symbols:menu" />
            </div>
            <div
                className='w-[240px] ml-6'>
                <Input
                    className='w-full h-[45px] !rounded-2xl text-base px-[12px] py-[8px]'
                    prefix={<Icon className='text-[20px] mr-[8px]' icon="iconamoon:search" />}
                    placeholder="Tìm kiếm"
                />
            </div>
            <div className='flex items-center ml-auto'>
                <div
                    className='flex gap-4 mr-8'>
                    <Icon
                        className='text-[24px] text-[#000] cursor-pointer'
                        icon="emojione-monotone:bright-button" />
                    <Icon
                        className='text-[24px] text-[#000] cursor-pointer'
                        icon="bxs:bell" />
                </div>

                {currentUser && (
                    <DropdownMenuUserComponent isUser={isUser} currentUser={currentUser} />
                )}
            </div>
        </div>
    )
}

export default Header03