import React, { useEffect, useState } from 'react'
import BreadcrumbComponent from '../../../components/navigations/BreadcrumbComponent';
import { Button, Col, DatePicker, Form, Input, InputNumber, Row, Select, Switch } from 'antd';
import { useNavigate } from 'react-router-dom';
import ImageUploader from '../../../components/uploads/ImageUploader ';

const NewAccount = () => {
  const [form] = Form.useForm();
  const [categories, setCategories] = useState([]);
  const [fileList, setFileList] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const breadcrumbItems = [
    { title: 'Trang chủ', href: '/admin-page' },
    { title: 'Tạo mới' }
  ];

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

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      // upload all
      const uploadPromises = fileList.map((file) => uploadFile(file.originFileObj));
      const uploadedUrls = await Promise.all(uploadPromises);
      // lọc thất bại
      const imageUrls = uploadedUrls.filter((url) => url !== null);

      if (imageUrls.length === 0) {
        toastConfig("error", "Tải ảnh lên thất bại!")
        setLoading(false);
        return;
      }
      const imageRequest = imageUrls.map(url => ({ imageUrl: url }));
      const ingredientQuantities = values.ingredientQuantities.map(iq => ({
        quantity: iq.quantity,
        productType: iq.productType
      }));
      const ingredientRequest = {
        supplier: values.supplier,
        ingredientName: values.ingredientName,
        description: values.description,
        foodSafetyCertification: values.foodSafetyCertification,
        expiredDate: values.expiredDate,
        ingredientStatus: values.ingredientStatus,
        weightPerBag: values.weightPerBag,
        quantityPerCarton: values.quantityPerCarton,
        ingredientType: values.ingredientType,
        unit: values.unit,
        priceOrigin: values.priceOrigin,
        categoryId: values.categoryId,
        isSale: values.isSale,
        imageRequest: imageRequest,
        ingredientQuantities: ingredientQuantities,
      }
      const res = await create(ingredientRequest);
      if (res.success) {
        toastConfig("success", "Tạo sản phẩm thành công!");
        console.log(res.data);
        form.resetFields();
        setFileList([])
        navigate('/admin-page/products')
      }

    } catch (error) {
      console.error("Create product failed:", error);
      message.error("Lỗi khi tạo sản phẩm!");
    }
    setLoading(false);
  };
  return (

    <div>
      <BreadcrumbComponent items={breadcrumbItems} />

      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        className="bg-white py-3 rounded-lg px-3"
      >
        <h1
          className="text-black text-[24px] font-medium mb-4"
        >Tạo mới tài khoản</h1>
        <Row>
          <Col span={12} className="px-2">
          
            <Form.Item label="Họ" name="firstName" rules={[{ required: true, message: "Nhập họ của bạn!" }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Tên" name="lastName" rules={[{ required: true, message: "Nhập tên của bạn!" }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Nhà sản xuất" name="supplier" rules={[{ required: true, message: "Nhập nhà sản xuất!" }]}>
              <Input />
            </Form.Item>

            <Form.Item label="Nhà sản xuất" name="supplier" rules={[{ required: true, message: "Nhập nhà sản xuất!" }]}>
              <Input />
            </Form.Item>

            <Row>
              <Col span={12}>
                <Form.Item label="Trạng thái" name="ingredientStatus">
                  <Select
                    className='h-full !w-[200px] mr-3'
                    placeholder="Trạng thái"
                    options={status}
                    allowClear
                  />
                </Form.Item>
              </Col>
            </Row>

           

            <Form.Item label="Giá nguyên" name="priceOrigin" rules={[{ required: true, message: "Nhập giá gốc!" }]}>
              <InputNumber style={{ width: "100%" }} min={0} />
            </Form.Item>
          </Col>
          <Col span={12} className="px-2">
            <Form.Item label="Chứng nhận ATTP" name="foodSafetyCertification">
              <Input />
            </Form.Item>

            <Form.Item label="Mô tả" name="description">
              <Input.TextArea rows={4} />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Tạo sản phẩm
            </Button>
          </Form.Item>
        </Row>
      </Form>
    </div>
  );
}

export default NewAccount