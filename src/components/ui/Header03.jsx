import React from 'react'
import { Icon } from "@iconify/react";
import { Input, Row } from 'antd';
import { User } from "../../stores/storeTest/user"
const Header03 = () => {
    const user = User;
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

                {user && (
                    <div className='flex items-center cursor-pointer bg-slate-300 px-3 py-2 rounded-md hover:opacity-70'>
                        <img
                            className='block h-[40px] w-[40px] rounded-full mr-[8px]'
                            src={user.avatar ? user.avatar : "/images/images/avatar-default.png"}
                            alt="avatar" />
                        <p className='w-full'>
                            <span className='block text-[16px] text-black font-bold uppercase hover:underline'>{user.lastName}</span>
                            <span className='block text-[14px] text-[#333] font-medium'>{user.roleName}</span>
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Header03