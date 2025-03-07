import React, { useEffect, useState } from 'react'
import BreadcrumbComponent from '../../../components/navigations/BreadcrumbComponent'
import { DatePicker, Form, Input, Row, Select } from 'antd';
import { getByListSerivce } from '../../../services/product.service';
import Column from 'antd/es/table/Column';

const NewProduct = () => {
  const [categories, setCategories] = useState([]);
  const breadcrumbItems = [
    { title: 'Trang chủ', href: '/admin-page' },
    { title: 'Tất cả sản phẩm' }
  ];

  const fetchCateByField = async () => {
    try {
      const params = {
        _field: "Id,CategoryName"
      }
      const res = await getByListSerivce(params);
      if (res?.data) {
        const formatOption = res.data.map((item) => ({
          label: item.CategoryName,
          value: item.Id
        }))
        setCategories(formatOption);
      }

      console.log("cate:", categories)
    } catch (error) {
      console.error("Error: ", error);
    }
  }

  useEffect(() => {
    fetchCateByField();
  }, []);

  const stauts = [
    { label: 'Đang hoạt động', value: 'ACTIVE' },
    { label: 'Không hoạt động', value: 'NO_ACTIVE' },
  ];
  return (
    <div>
      <BreadcrumbComponent items={breadcrumbItems} />
      <Form
        layout='vertical'
        className='bg-white w-full py-2 px-3 rounded-md'
      >
        <Row>
          <h2
            className='text-xl text-black font-medium'
          >Tạo mới nguyên liệu</h2>
        </Row>
        <Row>
          <Column>
            <Form.Item
              label="Tên nguyên liệu"
              name="ingredientName"
              colon={false}
              rules={
                [
                  {
                    required: true, message: "Vui lòng nhập tên nguyên liệu"
                  }
                ]
              }
            >
              <Input
                placeholder='Nhập tên danh mục sản phẩm'
                onChange={(e) => handleChange("categoryName", e.target.value)}
              />
            </Form.Item>
            <Form.Item
              label="Danh mục nguyên liệu"
              name="expiredDate"
              colon={false}
              rules={
                [
                  {
                    required: true, message: "Vui lòng chọn trạng thái"
                  }
                ]
              }>
              <Select
                className='h-full !w-[200px] mr-3'
                placeholder="Danh mục"
                options={categories}
                allowClear
              />
            </Form.Item>
            <Form.Item
              label="Nhà sản xuất"
              name="supplier"
              colon={false}
              rules={
                [
                  {
                    required: true, message: "Vui lòng nhập tên nhà sản xuất"
                  }
                ]
              }
            >
              <Input
                placeholder='Nhập tên danh mục sản phẩm'
                onChange={(e) => handleChange("categoryName", e.target.value)}
              />
            </Form.Item>
            <Form.Item
              label="Chứng chỉ"
              name="foodSafetyCertification"
              colon={false}
              rules={
                [
                  {
                    required: true, message: "Chứng chỉ"
                  }
                ]
              }
            >
              <Input
                placeholder='Nhập tên danh mục sản phẩm'
                onChange={(e) => handleChange("categoryName", e.target.value)}
              />
            </Form.Item>
            <Form.Item
              label="Ngày hết hạn"
              name="expiredDate"
              colon={false}
              rules={
                [
                  {
                    required: true, message: "Vui lòng nhập ngày hết hạng"
                  }
                ]
              }>
              <DatePicker
                placeholder='Ngày kết thúc'
                className='flex w-[200px] h-full items-center text-[#3C2F2F] py-2 px-3 mr-3'
                onChange={(date) => handleDateChange('endDate', date)}
                allowClear
                format="DD-MM-YYYY"
              />
            </Form.Item>
            <Form.Item
              label="Trạng thái"
              name="expiredDate"
              colon={false}
              rules={
                [
                  {
                    required: true, message: "Vui lòng chọn trạng thái"
                  }
                ]
              }>
              <Select
                className='h-full !w-[200px] mr-3'
                placeholder="Trạng thái"
                options={stauts}
                allowClear
              />
            </Form.Item>
          </Column>
          <Column>
          </Column>
        </Row>
      </Form>
    </div>
  )
}

export default NewProduct