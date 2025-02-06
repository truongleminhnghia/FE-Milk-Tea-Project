import React from 'react'
import { Link } from 'react-router-dom'
import { Icon } from '@iconify/react'
import { Col, Row } from 'antd'

const TopHeader = () => {
    return (
        <div className='bg-[#29aae1] py-3'>
            <div className="container">
                <div className="flex justify-between items-center">
                    <Link className="text-xs text-white font-semibold hover:opacity-85">
                        Chào mừng đến với Tobee Food!
                    </Link>
                    <ul className='flex gap-3 items-center'>
                        <li className='hover:opacity-85'>
                            <Link className="flex items-center gap-2 text-xs text-white font-semibold">
                                <Icon icon="humbleicons:phone" width="16" height="16" />
                                <span>Liên hệ</span>
                            </Link>
                        </li>
                        <li className='hover:opacity-85'>
                            <Link to={"/login"} className='flex items-center gap-2 text-xs text-white font-semibold'>
                                <Icon icon="mdi:user" width="16" height="16" />
                                Đăng nhập
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default TopHeader
