import React, { useEffect, useState } from 'react'
import BreadcrumbComponent from '../../../components/navigations/BreadcrumbComponent'
import { Button, Checkbox, Col, DatePicker, Form, Input, InputNumber, Row, Select, Space, Upload } from 'antd';
import { getByListSerivce } from '../../../services/category.service';
import { MinusCircleOutlined, PlusOutlined, UploadOutlined } from "@ant-design/icons";
import ImgCrop from 'antd-img-crop';

const NewProduct = () => {
  const [categories, setCategories] = useState([]);
  const [fileList, setFileList] = useState([]);
  const breadcrumbItems = [
    { title: 'Trang chủ', href: '/admin-page' },
    { title: 'Tất cả sản phẩm' }
  ];

  const handleDateChange = (field, date) => {
    console.log(`${field}:`, date);
  };

  const fetchCateByField = async () => {
    try {
      const params = {
        _field: "Id,CategoryName",
        categoryStatus: "ACTIVE"
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

  const status = [
    { label: 'Đang hoạt động', value: 'ACTIVE' },
    { label: 'Không hoạt động', value: 'NO_ACTIVE' },
  ];

  const quantityTypes = [
    { label: 'Thùng', value: 'BIG' },
    { label: 'bịch', value: 'BAG' },
  ]
  const units = [
    { label: 'gam', value: 'Gam' },
    { label: 'kg', value: 'Kg' }
  ]
  const ingredientTypes = [
    { label: 'Bột', value: 'bot' },
    { label: 'Trà', value: 'tra' },
  ]

  const handleUploadChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const handleFormSubmit = (values) => {
    const formData = new FormData();
    Object.keys(values).forEach(key => {
      if (key === 'images' && values[key]) {
        values[key].forEach(file => {
          formData.append('images', file.originFileObj);
        });
      } else {
        formData.append(key, values[key]);
      }
    });
  
    // Log the contents of the FormData object
    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }
  
    // You can now send formData to your server using an API call
    // Example:
    // fetch('/api/upload', {
    //   method: 'POST',
    //   body: formData,
    // }).then(response => response.json())
    //   .then(data => console.log(data))
    //   .catch(error => console.error('Error:', error));
  };

  return (
    <div>
      <BreadcrumbComponent items={breadcrumbItems} />
      <Form
        layout='vertical'
        className='bg-white w-full py-2 px-3 rounded-md'
        onFinish={handleFormSubmit}
      >
        <Row>
          <h2 className='text-xl text-black font-medium'>Tạo mới nguyên liệu</h2>
        </Row>
        <Row gutter={16}>
          <Col span={11}>
            <Form.Item
              label="Tên nguyên liệu"
              name="ingredientName"
              colon={false}
              rules={[{ required: true, message: "Vui lòng nhập tên nguyên liệu" }]}
            >
              <Input placeholder='Nhập tên danh mục sản phẩm' />
            </Form.Item>
            <Form.Item
              label="Danh mục nguyên liệu"
              name="category"
              colon={false}
              rules={[{ required: true, message: "Vui lòng chọn trạng thái" }]}
            >
              <Select
                className='h-full !w-[200px] mr-3'
                placeholder="Danh mục"
                options={categories ?? []}
                allowClear
              />
            </Form.Item>
            <Form.Item
              label="Nhà sản xuất"
              name="supplier"
              colon={false}
              rules={[{ required: true, message: "Vui lòng nhập tên nhà sản xuất" }]}
            >
              <Input placeholder='Nhập tên danh mục sản phẩm' />
            </Form.Item>
            <Form.Item
              label="Chứng chỉ"
              name="foodSafetyCertification"
              colon={false}
              rules={[{ required: true, message: "Chứng chỉ" }]}
            >
              <Input placeholder='Nhập tên danh mục sản phẩm' />
            </Form.Item>
            <Form.Item
              label="Ngày hết hạn"
              name="expiredDate"
              colon={false}
              rules={[{ required: true, message: "Vui lòng nhập ngày hết hạng" }]}
            >
              <DatePicker
                placeholder='Ngày kết thúc'
                className='flex w-[200px] h-full items-center text-[#3C2F2F] py-2 px-3 mr-3'
                allowClear
                format="DD-MM-YYYY"
              />
            </Form.Item>
            <Form.Item
              label="Trạng thái"
              name="ingredientStatus"
              colon={false}
              rules={[{ required: true, message: "Vui lòng chọn trạng thái" }]}
            >
              <Select
                className='h-full !w-[200px] mr-3'
                placeholder="Trạng thái"
                options={status}
                allowClear
              />
            </Form.Item>
            <Form.Item
              label="Giá"
              name="priceOrigin"
              colon={false}
              rules={[{ required: true, message: "Vui lòng nhập giá nguyên liệu" }]}
            >
              <InputNumber placeholder='Nhập giá' />
            </Form.Item>
          </Col>
          <Col span={11} offset={1}>
            <Form.Item label="Số lượng">
              <Form.List name="quantity">
                {(fields, { add, remove }) => (
                  <div>
                    <div style={{ marginBottom: 16 }}>
                      <Button
                        type="dashed"
                        onClick={() => add()}
                        icon={<PlusOutlined />}
                        style={{ height: "40px" }}
                      >
                        Thêm số lượng
                      </Button>
                    </div>
                    <Row gutter={16}>
                      {fields.map((field) => (
                        <Col span={24} key={field.key}>
                          <Space
                            style={{ display: "flex", alignItems: "center", marginBottom: 8 }}
                            align="start"
                          >
                            <Form.Item
                              {...field}
                              name={[field.name, "quantityType"]}
                              fieldKey={[field.fieldKey, "quantityType"]}
                              rules={[{ required: true, message: "Vui lòng nhập số lượng" }]}
                            >
                              <Select
                                className="h-full !w-[200px] mr-3"
                                placeholder="Loại số lượng"
                                options={quantityTypes}
                                allowClear
                              />
                            </Form.Item>
                            <Form.Item
                              {...field}
                              name={[field.name, "quantity"]}
                              fieldKey={[field.fieldKey, "quantity"]}
                              rules={[{ required: true, message: "Vui lòng nhập số lượng" }]}
                            >
                              <InputNumber placeholder="Số lượng" min={1} />
                            </Form.Item>
                            <MinusCircleOutlined onClick={() => remove(field.name)} />
                          </Space>
                        </Col>
                      ))}
                    </Row>
                  </div>
                )}
              </Form.List>
            </Form.Item>
            <Form.Item
              label="Trọng lượng trên một bịch"
              name="weightPerBag"
              colon={false}
              rules={[{ required: true, message: "Vui lòng nhập trọng lượng" }]}
            >
              <InputNumber placeholder='Trọng lượng trên bịch' />
            </Form.Item>
            <Form.Item
              label="Đơn vị"
              name="unit"
              colon={false}
              rules={[{ required: true, message: "Vui lòng nhập đơn vị" }]}
            >
              <Select
                className='h-full !w-[200px] mr-3'
                placeholder="Đơn vị"
                options={units}
                allowClear
              />
            </Form.Item>
            <Form.Item
              label="Số lượng trên một thùng"
              name="quantityPerCarton"
              colon={false}
            >
              <InputNumber placeholder='Số lượng trên một thùng' />
            </Form.Item>
            <Form.Item
              label="Loại nguyên liệu"
              name="ingredientType"
              colon={false}
            >
              <Select
                className='h-full !w-[200px] mr-3'
                placeholder="Loại nguyên liệu"
                options={ingredientTypes}
                allowClear
              />
            </Form.Item>
            <Form.Item
              label="Khuyến mãi"
              name="isSale"
              colon={false}
            >
              <Checkbox checked={true} />
            </Form.Item>
            <Form.Item
              label="Hình ảnh"
              name="images"
              colon={false}
              valuePropName="fileList"
              getValueFromEvent={(e) => e?.fileList}
            >
              <ImgCrop rotate>
                <Upload
                  listType="picture-card"
                  fileList={fileList}
                  onChange={handleUploadChange}
                  beforeUpload={() => false}
                >
                  {fileList.length < 5 && <div>
                    <UploadOutlined />
                    <div style={{ marginTop: 8 }}>Upload</div>
                  </div>}
                </Upload>
              </ImgCrop>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Tạo nguyên liệu
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  )
}

export default NewProduct