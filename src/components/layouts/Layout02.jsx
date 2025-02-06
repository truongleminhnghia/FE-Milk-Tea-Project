import React from 'react'
import Header02 from '../ui/Header02'
import { Outlet } from 'react-router-dom'
import Footer from '../ui/Footer'

const Layout02 = () => {
    return (
        <div>
            <Header02 />
            <main>
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}

export default Layout02
