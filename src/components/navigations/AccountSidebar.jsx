import React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import { UserOutlined, EnvironmentOutlined, HeartOutlined, HistoryOutlined, GiftOutlined } from '@ant-design/icons';

const AccountSidebar = () => {
    return (
        <Menu
            mode="vertical"
            defaultSelectedKeys={['account-info']}
            className="w-64"
        >
            <Menu.Item key="account-info" icon={<UserOutlined />}>
                <Link to="/profile">Thông tin tài khoản</Link>
            </Menu.Item>
            <Menu.Item key="address" icon={<EnvironmentOutlined />}>
                <Link to="/account/address">Địa chỉ</Link>
            </Menu.Item>
            <Menu.Item key="favorites" icon={<HeartOutlined />}>
                <Link to="/account/favorites">Yêu thích</Link>
            </Menu.Item>
            <Menu.Item key="order-history" icon={<HistoryOutlined />}>
                <Link to="/account/orders">Lịch sử giao dịch</Link>
            </Menu.Item>
            <Menu.Item key="vouchers" icon={<GiftOutlined />}>
                <Link to="/account/vouchers">Voucher của bạn</Link>
            </Menu.Item>
        </Menu>
    );
};

export default AccountSidebar;