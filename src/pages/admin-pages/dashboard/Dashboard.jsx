import React from 'react';
import { Card, Table, Tag, Avatar, Pagination, Select, Row, Col, Tooltip } from 'antd';
import { Icon } from '@iconify/react';
import { Line } from '@ant-design/plots';

const Dashboard = () => {
    // Fake data for stats cards
    const statsData = [
        {
            title: 'TOTAL EARNINGS',
            value: '₫98,851.35',
            change: '+18.30%',
            changeType: 'increase',
            icon: 'mdi:wallet-outline',
            color: 'bg-blue-100 text-[#29aae1]'
        },
        {
            title: 'ORDERS',
            value: '65,802',
            change: '-2.74%',
            changeType: 'decrease',
            icon: 'mdi:cart-outline',
            color: 'bg-blue-100 text-[#29aae1]'
        },
        {
            title: 'CUSTOMERS',
            value: '79,958',
            change: '+29.08%',
            changeType: 'increase',
            icon: 'mdi:account-outline',
            color: 'bg-blue-100 text-[#29aae1]'
        },
        {
            title: 'PRODUCTS',
            value: '36,758',
            change: '+1.67%',
            changeType: 'increase',
            icon: 'mdi:diamond-outline',
            color: 'bg-blue-100 text-[#29aae1]'
        }
    ];

    // Fake data for revenue chart
    const chartData = [
        { month: 'Jan', Orders: 180, Refunds: 100, Earnings: 260 },
        { month: 'Feb', Orders: 230, Refunds: 150, Earnings: 300 },
        { month: 'Mar', Orders: 280, Refunds: 400, Earnings: 340 },
        { month: 'Apr', Orders: 340, Refunds: 300, Earnings: 380 },
        { month: 'May', Orders: 390, Refunds: 280, Earnings: 430 },
        { month: 'Jun', Orders: 420, Refunds: 260, Earnings: 520 },
        { month: 'Jul', Orders: 460, Refunds: 240, Earnings: 620 },
        { month: 'Aug', Orders: 520, Refunds: 220, Earnings: 720 },
        { month: 'Sep', Orders: 540, Refunds: 180, Earnings: 820 },
        { month: 'Oct', Orders: 580, Refunds: 160, Earnings: 800 },
        { month: 'Nov', Orders: 620, Refunds: 140, Earnings: 830 },
        { month: 'Dec', Orders: 680, Refunds: 120, Earnings: 920 }
    ];

    // Configuration for the revenue chart
    const config = {
        data: chartData,
        xField: 'month',
        yField: 'value',
        seriesField: 'category',
        smooth: true,
        padding: 'auto',
        yAxis: {
            min: 0,
        },
        legend: {
            position: 'bottom',
        },
        point: {
            size: 5,
            shape: 'circle',
            style: {
                fill: 'white',
                stroke: '#29aae1',
                lineWidth: 2,
            },
        },
    };

    // Prepare data for line chart in the format required
    const lineData = [];
    chartData.forEach(item => {
        lineData.push({ month: item.month, value: item.Orders, category: 'Orders' });
        lineData.push({ month: item.month, value: item.Refunds, category: 'Refunds' });
        lineData.push({ month: item.month, value: item.Earnings, category: 'Earnings' });
    });

    // Recent orders data
    const ordersData = [
        {
            id: '#TB010331',
            product: 'Macbook Pro',
            customer: 'Terry White',
            customerAvatar: 'https://randomuser.me/api/portraits/men/32.jpg',
            amount: '$658.00',
            orderDate: '17 Dec, 2022',
            deliveryDate: '26 Jan, 2023',
            vendor: 'Brazil',
            rating: 4.5,
            status: 'New'
        },
        {
            id: '#TB010332',
            product: 'Borosil Paper Cup',
            customer: 'Daniel Gonzalez',
            customerAvatar: 'https://randomuser.me/api/portraits/men/41.jpg',
            amount: '$345.00',
            orderDate: '02 Jan, 2023',
            deliveryDate: '26 Jan, 2023',
            vendor: 'Namibia',
            rating: 4.8,
            status: 'Out Of Delivery'
        },
        {
            id: '#TB010333',
            product: 'Stillbird Helmet',
            customer: 'Stephen Bird',
            customerAvatar: 'https://randomuser.me/api/portraits/men/13.jpg',
            amount: '$80.00',
            orderDate: '20 Dec, 2022',
            deliveryDate: '29 Dec, 2022',
            vendor: 'USA',
            rating: 4.3,
            status: 'Delivered'
        },
        {
            id: '#TB010334',
            product: 'Bentwood Chair',
            customer: 'Ashley Silva',
            customerAvatar: 'https://randomuser.me/api/portraits/women/22.jpg',
            amount: '$349.99',
            orderDate: '31 Nov, 2022',
            deliveryDate: '13 Dec, 2022',
            vendor: 'Argentina',
            rating: 3.9,
            status: 'Pending'
        },
        {
            id: '#TB010335',
            product: 'Apple Headphone',
            customer: 'Scott Wilson',
            customerAvatar: 'https://randomuser.me/api/portraits/men/44.jpg',
            amount: '$264.37',
            orderDate: '23 Nov, 2022',
            deliveryDate: '03 Dec, 2022',
            vendor: 'Jersey',
            rating: 4.7,
            status: 'Shipping'
        },
        {
            id: '#TB010336',
            product: "Smart Watch for Man's",
            customer: 'Heather Jimenez',
            customerAvatar: 'https://randomuser.me/api/portraits/women/3.jpg',
            amount: '$741.98',
            orderDate: '02 Nov, 2022',
            deliveryDate: '12 Nov, 2022',
            vendor: 'Spain',
            rating: 4.4,
            status: 'Delivered'
        }
    ];

    // Column configuration for orders table
    const columns = [
        {
            title: 'Order ID',
            dataIndex: 'id',
            key: 'id',
            render: (text) => <a href="#" className="text-[#29aae1]">{text}</a>,
        },
        {
            title: 'Product Name',
            dataIndex: 'product',
            key: 'product',
        },
        {
            title: 'Customer Name',
            dataIndex: 'customer',
            key: 'customer',
            render: (text, record) => (
                <div className="flex items-center">
                    <Avatar src={record.customerAvatar} size="small" className="mr-2" />
                    {text}
                </div>
            ),
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount',
        },
        {
            title: 'Order Date',
            dataIndex: 'orderDate',
            key: 'orderDate',
        },
        {
            title: 'Delivery Date',
            dataIndex: 'deliveryDate',
            key: 'deliveryDate',
        },
        {
            title: 'Vendor',
            dataIndex: 'vendor',
            key: 'vendor',
        },
        {
            title: 'Ratings',
            dataIndex: 'rating',
            key: 'rating',
            render: (rating) => (
                <div className="flex items-center">
                    {rating} <Icon icon="mdi:star" className="ml-1 text-yellow-400" />
                </div>
            ),
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status) => {
                let color = '#29aae1';
                if (status === 'Delivered') color = 'green';
                if (status === 'Out Of Delivery') color = 'red';
                if (status === 'Pending') color = 'orange';
                return (
                    <Tag color={color} className="rounded-full px-3 py-1">
                        {status}
                    </Tag>
                );
            },
        },
    ];

    return (
        <div className="dashboard-container p-4">
            {/* Stats Cards */}
            <Row gutter={[16, 16]} className="mb-6">
                {statsData.map((stat, index) => (
                    <Col xs={24} sm={12} md={6} key={index}>
                        <Card bordered={false} className="shadow-sm">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-gray-500 text-xs uppercase font-medium mb-1">{stat.title}</p>
                                    <h2 className="text-2xl font-bold mb-2">{stat.value}</h2>
                                    <div className={`text-xs px-2 py-1 rounded-full inline-flex items-center ${
                                        stat.changeType === 'increase' 
                                            ? 'bg-green-100 text-green-700' 
                                            : 'bg-red-100 text-red-700'
                                    }`}>
                                        <Icon 
                                            icon={stat.changeType === 'increase' ? 'mdi:arrow-up' : 'mdi:arrow-down'} 
                                            className="mr-1"
                                        />
                                        {stat.change} than last week
                                    </div>
                                </div>
                                <div className={`${stat.color} p-3 rounded-lg`}>
                                    <Icon icon={stat.icon} className="text-2xl" />
                                </div>
                            </div>
                        </Card>
                    </Col>
                ))}
            </Row>

            {/* Revenue Chart */}
            <Card 
                title={<h3 className="text-lg font-medium">Revenue</h3>}
                className="mb-6 shadow-sm"
                bordered={false}
            >
                <Line 
                    {...config}
                    data={lineData}
                    height={300}
                    color={['#29aae1', '#ff6b6b', '#52c41a']}
                    xField="month"
                    yField="value"
                    seriesField="category"
                    smooth
                    animation={{
                        appear: {
                            animation: 'wave-in',
                            duration: 1500,
                        },
                    }}
                    tooltip={{
                        formatter: (datum) => {
                            return { name: datum.category, value: datum.value };
                        },
                    }}
                    legend={{
                        position: 'bottom',
                    }}
                    point={{
                        size: 5,
                        shape: 'circle',
                        style: (datum) => {
                            return {
                                r: 5,
                                stroke: datum.category === 'Orders' ? '#29aae1' : datum.category === 'Refunds' ? '#ff6b6b' : '#52c41a',
                                fill: '#fff',
                                lineWidth: 2,
                            };
                        },
                    }}
                />
            </Card>

            {/* Recent Orders Table */}
            <Card 
                title={
                    <div className="flex justify-between items-center">
                        <h3 className="text-lg font-medium">Recent Orders</h3>
                        <div className="flex items-center">
                            <span className="mr-2 text-sm text-gray-600">SORT BY:</span>
                            <Select 
                                defaultValue="Today" 
                                style={{ width: 120 }}
                                className="text-sm"
                                options={[
                                    { value: 'Today', label: 'Today' },
                                    { value: 'This Week', label: 'This Week' },
                                    { value: 'This Month', label: 'This Month' },
                                ]}
                            />
                        </div>
                    </div>
                }
                className="shadow-sm"
                bordered={false}
            >
                <Table 
                    dataSource={ordersData} 
                    columns={columns} 
                    pagination={false}
                    className="mb-4"
                    rowKey="id"
                    size="middle"
                />
                <div className="flex justify-between items-center">
                    <div className="text-sm text-gray-500">Showing 6 of 25 Results</div>
                    <Pagination 
                        simple 
                        defaultCurrent={2} 
                        total={25} 
                        pageSize={6} 
                        showSizeChanger={false}
                    />
                </div>
            </Card>
        </div>
    );
};

export default Dashboard; 