import React, { useEffect, useState } from 'react';
import { Card, Table, Tag, Row, Input, Select, DatePicker, Button } from 'antd';

import BreadcrumbComponent from '../../../components/navigations/BreadcrumbComponent';


const ListNewOrder = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const breadcrumbItems = [
    { title: 'Trang chủ', href: '/staff-page' },
    { title: 'Đơn hàng mới tạo' }
  ];

  const fetchOrders = async () => {
    setIsLoading(true);
    setTimeout(() => {
      // Mock dữ liệu đơn hàng mới tạo
      const mockData = Array.from({ length: 5 }).map((_, i) => ({
        id: `ORD-${i + 1}`,
        fullNameShipping: `Nguyễn Văn ${i + 1}`,
        phoneShipping: `090000000${i}`,
        emailShipping: `user${i}@gmail.com`,
        noteShipping: `Giao nhanh buổi sáng`,
        addressShipping: `123 Đường ABC, Quận ${i + 1}`,
        promotionCode: i % 2 === 0 ? 'SALE20' : '',
        accountId: `acc-id-${i}`,
        orderDetailList: [
          {
            ingredientProductId: `ingredient-${i}`,
            quantity: 2 + i
          }
        ]
      }));
      setOrders(mockData);
      setIsLoading(false);
    }, 500);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const columns = [
    {
      title: 'Họ tên người nhận',
      dataIndex: 'fullNameShipping',
      key: 'fullNameShipping'
    },
    {
      title: 'SĐT',
      dataIndex: 'phoneShipping',
      key: 'phoneShipping'
    },
    {
      title: 'Email',
      dataIndex: 'emailShipping',
      key: 'emailShipping'
    },
    {
      title: 'Địa chỉ giao hàng',
      dataIndex: 'addressShipping',
      key: 'addressShipping'
    },
    {
      title: 'Mã khuyến mãi',
      dataIndex: 'promotionCode',
      key: 'promotionCode',
      render: (code) => code ? <Tag color="green">{code}</Tag> : '-'
    },
    {
      title: 'Chi tiết đơn hàng',
      dataIndex: 'orderDetailList',
      key: 'orderDetailList',
      render: (list) => (
        <ul className='list-disc pl-4'>
          {list.map((item, idx) => (
            <li key={idx}>ID: {item.ingredientProductId} - SL: {item.quantity}</li>
          ))}
        </ul>
      )
    }
  ];

  return (
    <div>
      <BreadcrumbComponent items={breadcrumbItems} />
      <Card className='mt-4'>
        <Row className='mb-4 flex items-center justify-between'>
          <h2 className='text-xl font-semibold'>Danh sách đơn hàng vừa tạo</h2>
        </Row>

        <Table
          dataSource={orders.map((o) => ({ ...o, key: o.id }))}
          columns={columns}
          loading={isLoading}
          pagination={{ pageSize: 5 }}
        />
      </Card>
    </div>
  );
};

export default ListNewOrder;
