import React from 'react'
import Header01 from '../ui/Header01'
import { Outlet } from 'react-router-dom'
import Footer from '../ui/Footer'
import TopHeader from '../ui/TopHeader'
import NavigationComponent from '../ui/NavigationComponent'
import MenuCustomerComponent from '../ui/menus/MenuCustomerComponent'

const Layout01 = () => {
    return (
        <div>
            <TopHeader />
            <Header01 />
            {/* <NavigationComponent /> */}
            <MenuCustomerComponent />
            <main className='bg-[#edf2f5]'>
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}

export default Layout01
