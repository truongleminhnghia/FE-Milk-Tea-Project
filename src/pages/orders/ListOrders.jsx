import React from 'react'
import BreadcrumbComponent from '../../components/navigations/BreadcrumbComponent'
import { Input, Row, DatePicker, Dropdown, Button } from 'antd';
import { Icon } from '@iconify/react';
import TableComponent from '../../components/ui/Dropdown/TableComponent';

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
              items,
            }}
          >
            <Input placeholder='All' suffix={<Icon icon="ep:arrow-down-bold" />} />
          </Dropdown>
          <Dropdown
            className='flex w-[300px] h-full text-[#3C2F2F] text-base mr-3'
            menu={{
              items,
            }}
            icon={<Icon icon="ep:arrow-down-bold" />}
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
        <TableComponent />
      </div>
    </>
  )
}

export default ListOrders