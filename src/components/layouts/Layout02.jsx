import React from 'react'
import Header02 from '../ui/Header02'
import { Link, Outlet } from 'react-router-dom'
import Footer from '../ui/Footer'
import Header03 from '../ui/Header03'
import SidebarComponent from '../navigations/SidebarComponent'
import { Col, Row } from 'antd'

const Layout02 = () => {
    return (
        <Row className="h-[100vh]">
            <Col span={4}
                className='bg-white border-r-[2px]'
            >
                <Link
                    to={"/dashboard"}
                >
                    <img
                        className='ml-[50%] translate-x-[-50%] w-[150px] h-[85px]'
                        src="/images/logo/logo.png"
                        alt="logo" />
                </Link>
                <SidebarComponent />
            </Col>
            <Col span={20}>
                <Header03
                    className='block w-ull' />
                <main
                    className='p-4 bg-[#e7e4e4be]'
                >
                    <Outlet />
                </main>
            </Col>
        </Row>
    )
}

export default Layout02
