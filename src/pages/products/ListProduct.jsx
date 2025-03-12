import React from 'react'
import Ingredients from '../../stores/data/ingredient.json'
import CardProductComponent from '../../components/ui/carts/CardProductComponent'
import { Button, Col, Input, Menu, Pagination, Row, Select } from 'antd'
import BreadcrumbItem from '../../components/navigations/BreadcrumbComponent'
import { SearchOutlined } from '@ant-design/icons'


const ListProduct = () => {

  const breadcrumbItems = [
    { title: 'Trang chủ', href: '/' },
    { title: 'Tất cả sản phẩm', href: '/products' }
  ];
  const priceOptions = [
    { label: 'Tăng dần', value: 'isAscending' },
    { label: 'Giảm dần', value: 'isDescending' }
  ];

  const categories = [
    { key: 'all', label: 'Tất cả sản phẩm' },
    { key: 'bot', label: 'Bột' },
    { key: 'syrup', label: 'Syrup', children: [
      { key: 'nuocduong', label: 'Nước đường' },
      { key: 'sirosweetbird', label: 'Siro Sweetbird' }
    ]},
    { key: 'topping', label: 'Topping' },
    { key: 'tra', label: 'Trà' },
    { key: 'suaphache', label: 'Sữa pha chế' },
    { key: 'hat', label: 'Hạt' },
    { key: 'socola', label: 'Sô cô la' },
    { key: 'khoaitay', label: 'Khoai tây' },
    { key: 'lambanh', label: 'Làm bánh & nấu ăn' }
  ];

  return (
    <div className="container">
      <Row className='py-2 w-full !mx-0'>
        <BreadcrumbItem items={breadcrumbItems} />
        <img className='w-full' src="/images/baners/collection_main_banner.webp" alt="" />
      </Row>
      <div className="bg-white py-4">
        <Row gutter={[16, 24]} className='!mx-0' wrap>
          <Row>
            <h2>Filter Options</h2>
            <Button className='mb-2'>
              Mới nhất
            </Button>
            <Select
              className='h-full !w-[200px] mb-2'
              placeholder="Giá"
              allowClear
              options={priceOptions}
            />
          </Row>
          <Row>
            <Col span={6}>
              <div>
                <h2>Tìm kiếm sản phẩm</h2>
                <Input
                  type='text'
                  placeholder="Tìm kiếm"
                  prefix={<SearchOutlined />}
                />
              </div>
              <div>
                <h2>Danh mục sản phẩm</h2>
                <Menu
                  mode="inline"
                  items={categories}
                />
              </div>
            </Col>
            <Col span={18}>
              <Row gutter={[16, 24]} className='!mx-0' wrap>
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
            </Col>
          </Row>
        </Row>
      </div>
    </div>
  )
}

export default ListProduct