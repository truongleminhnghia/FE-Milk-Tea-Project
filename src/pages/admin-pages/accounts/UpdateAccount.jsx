import React from 'react'
import BreadcrumbComponent from '../../../components/navigations/BreadcrumbComponent';
import { Button, Col, Form, Input, Row } from 'antd';
import ImageUploader from '../../../components/uploads/ImageUploader ';

const UpdateAccount = () => {
     const [form] = Form.useForm();
   
    const breadcrumbItems = [
        { title: 'Trang chủ', href: '/admin-page' },
        { title: 'Tạo mới' }
      ];
      const handleSubmit = async (values) => {
        setLoading(true);
        try {
          // upload all
          const uploadPromises = fileList.map((file) => uploadFile(file.originFileObj));
          // lọc thất bại
          const createaccountRequest = {
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            password: values.password,
            roleName: values.roleName,
            ingredientStatus: values.ingredientStatus,
          }
          const res = await create(createaccountRequest);
          if (res.success) {
            toastConfig("success", "Tạo tài khoản thành công!");
            console.log(res.data);
            form.resetFields();
            setFileList([])
            navigate('/admin-page/NewAccount')
          }
    
        } catch (error) {
          console.error("Create product failed:", error);
          message.error("Lỗi khi tạo tài khoản!");
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
        >Cập nhật tài khoản</h1>
        <Row>
          <Col span={12} className="px-2">

            <Form.Item label="Họ" name="firstName" rules={[{ required: true, message: "Nhập họ của bạn!" }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Tên" name="lastName" rules={[{ required: true, message: "Nhập tên của bạn!" }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Số điện thoại" name="phoneNumber" rules={[{ required: true, message: "Nhập sdt của bạn!" }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Email" name="email" rules={[{ required: true, message: "Nhập email của bạn!" }]}>
              <Input />
            </Form.Item>

            <Form.Item label="Mật khẩu" name="password" rules={[{ required: true, message: "Nhập mật khẩu của bạn!" }]}>
              <Input />
            </Form.Item>
            {/* <Form.Item label="Quyền truy cập" name="roleName" rules={[{ required: true, message: "Nhập quyền truy cập!" }]}>
              <Input />
            </Form.Item> */}
            {/* <Form.Item label="Hình ảnh sản phẩm">
              <ImageUploader fileList={fileList} setFileList={setFileList} />
            </Form.Item> */}
          </Col>
        </Row>
        <Row>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Cập nhật tài khoản
            </Button>
          </Form.Item>
        </Row>
      </Form>
    </div>
  );
  
}

export default UpdateAccount