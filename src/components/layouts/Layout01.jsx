import React from 'react'
import Header01 from '../ui/Header01'
import { Outlet } from 'react-router-dom'
import Footer from '../ui/Footer'
import TopHeader from '../ui/TopHeader'

const Layout01 = () => {
    return (
        <div>
            <TopHeader />
            <Header01 />
            <main>
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}

export default Layout01
