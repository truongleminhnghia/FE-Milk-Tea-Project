import React from 'react'
import BreadcrumbComponent from '../../components/navigations/BreadcrumbComponent'
import { Input, Row, DatePicker, Dropdown, Button } from 'antd';
import { Icon } from '@iconify/react';
import { formatCurrencyVND } from '../../utils/utils';
import TableGenerComponent from '../../components/tables/TableGenerComponent';
import { Link } from 'react-router-dom';
import DataOrder from '../../stores/data/list-order.json'

const ListOrders = () => {
  const onChange = (date, dateString) => {
    console.log(date, dateString);
  };

  const breadcrumbItems = [
    { title: 'Trang chủ', href: '/admin-page' },
    { title: 'Tất cả đơn hàng' }
  ];

  const items = [
    { label: 'item 1', key: 'item-1' }, // remember to pass the key prop
    { label: 'item 2', key: 'item-2' },
  ];

  const items2 = [
    { label: 'item 1', key: 'item-1' }, // remember to pass the key prop
    { label: 'item 2', key: 'item-2' },
  ];
  const columns = [
    {
      title: 'Code',
      dataIndex: 'orderCode',
      render: (orderCode) => <Link className='text-blue-700'>{orderCode}</Link>,
      // sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Action',
      key: 'operation',
      fixed: 'right',
      width: 100,
      render: () => <Link>action</Link>,
    },
    {
      title: 'Date',
      dataIndex: 'orderDate',
    },
    {
      title: 'Status',
      dataIndex: "orderStatus",
      key: "orderStatus",
      // render: (status) => <StatusComponent status={status} />,
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
    },
    {
      title: 'Total Price',
      dataIndex: 'totlaPrice',
      render: (totalPrice) => formatCurrencyVND(totalPrice),
    },
    {
      title: 'Price Promotion',
      dataIndex: 'priceAffterPromotion',
      render: (priceAffterPromotion) => formatCurrencyVND(priceAffterPromotion),
    },
    {
      title: 'Note ',
      dataIndex: 'address',
    },
    {
      title: 'RefCode ',
      dataIndex: 'refCode',
      render: (refCode) => <Link className='text-blue-700'>{refCode}</Link>
    },
  ];
  const data = DataOrder.data;

  return (
    <>
      <BreadcrumbComponent items={breadcrumbItems} />
      <Row className='bg-white py-3 px-3 rounded-xl border-[1px] border-[#ccc]'>
        <div className='flex items-center h-[40px]'>
          <Input
            className='h-full py-2 px-3 mr-3 inline-flex text-base w-[400px]'
            prefix={<Icon
              className='text-lg text-[#3C2F2F]'
              icon="iconamoon:search" />}
            placeholder='Tìm kiếm'
            allowClear
          />
          <DatePicker
            className='flex w-[400px] h-full items-center text-[#3C2F2F] py-2 px-3 mr-3'
            onChange={onChange}
            picker="week"
            allowClear
          />
          <Dropdown
            className='flex w-[300px] h-full text-[#3C2F2F] text-base mr-3'
            menu={{
              items: items
            }}
          >
            <Input placeholder='All' suffix={<Icon icon="ep:arrow-down-bold" />} />
          </Dropdown>
          <Dropdown
            className='flex w-[300px] h-full text-[#3C2F2F] text-base mr-3'
            menu={{
              items: items2
            }}
          >
            <Input placeholder='All' suffix={<Icon icon="ep:arrow-down-bold" />} />
          </Dropdown>
          {/* <DropdownComponent /> */}
          <Button
            className='h-full p-3 flex items-center'
            type='primary'
            icon={
              <Icon
                className='!text-[#fff] text-[18px]'
                icon="mdi:filter" />}>
            <span className='!text-[#fff] text-[18px] !font-medium'>Lọc</span>
          </Button>
        </div>
      </Row>
      <div className='bg-white rounded-lg mt-3'>
        <TableGenerComponent data={data} columns={columns} />
      </div>
    </>
  )
}

export default ListOrders