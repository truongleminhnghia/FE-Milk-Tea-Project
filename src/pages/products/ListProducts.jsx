import React from 'react'
import BreadcrumbComponent from '../../components/navigations/BreadcrumbComponent';
import { Button } from 'antd';
import { Icon } from '@iconify/react';

const ListProducts = () => {
  const breadcrumbItems = [
    { title: 'Trang chủ', href: '/admin-page' },
    { title: 'Tất cả sản phẩm' }
  ];
  return (
    <div>
      <BreadcrumbComponent items={breadcrumbItems} />
      <Button
        icon={<Icon icon="mynaui:plus-solid" />}>
          <span>Add Product</span>
      </Button>
    </div>
  )
}

export default ListProducts