import React from 'react'
import Ingredients from '../../stores/data/ingredient.json'
import CardProductComponent from '../../components/ui/carts/CardProductComponent'
import { Button, Col, Pagination, Row, Select } from 'antd'
import BreadcrumbItem from '../../components/navigations/BreadcrumbComponent'

const ListProduct = () => {

  const breadcrumbItems = [
    { title: 'Trang chủ', href: '/' },
    { title: 'Tất cả sản phẩm', href: '/products' }
  ];
  const priceOptions = [
    { lable: 'Tăng dần', value: 'isDescing' },
    { lable: 'Giảm dần', value: 'isDescing' }
  ];

  return (
    <div className="container ">
      <Row className='py-2w-full !mx-0'>
        <BreadcrumbItem items={breadcrumbItems} />
        <img className='w-full' src="/images/baners/collection_main_banner.webp" alt="" />
      </Row>
      <div className="bg-white py-4">
        <Row gutter={[16, 24]} className='!mx-0' wrap>
          <Row className='w-full px-2'>
            <Col span={12}>
              <h1>Danh sách sản phẩm</h1>
            </Col>
            <Col span={12} className='text-right' >
              <Button>
                Mới nhất
              </Button>
              <Select
                className='h-full !w-[200px]'
                placeholder="Giá"
                allowClear
                options={priceOptions}
              />
            </Col>
          </Row>
          {Ingredients.map((item) => (
            <Col
              className='flex justify-center items-center'
              key={item.id} xs={24} sm={12} md={8} lg={6}>
              <CardProductComponent item={item} className="" />
            </Col>
          ))}
        </Row>
        <div className="flex justify-center mt-4">
          <Pagination defaultCurrent={1} total={50} />
        </div>
      </div>
    </div>
  )
}

export default ListProduct