import React, { useState } from 'react'
import BreadcrumbComponent from '../../../components/navigations/BreadcrumbComponent';
import { Button, Card, Col, Form, Input, Row, Select, Space, notification, Spin, Result } from 'antd';
import { useNavigate } from 'react-router-dom';
import { UserOutlined, MailOutlined, LockOutlined, SaveOutlined, RollbackOutlined, LoadingOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { createService } from '../../../services/user.service';

const NewAccount = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  
  const breadcrumbItems = [
    { title: 'Trang chủ', href: '/admin-page' },
    { title: 'Tài khoản', href: '/admin-page/accounts' },
    { title: 'Thêm mới tài khoản' }
  ];

  const roleOptions = [
    { label: 'Quản trị viên', value: 'ROLE_ADMIN' },
    { label: 'Nhân viên', value: 'ROLE_STAFF' },
    { label: 'Quản lý', value: 'ROLE_MANAGER' },
    { label: 'Khách hàng', value: 'ROLE_CUSTOMER' }
  ];

  const handleSubmit = async (values) => {
    setLoading(true);
    setSubmitting(true);
    try {
      const createAccountRequest = {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        password: values.password,
        roleName: values.roleName
      }
      
      const res = await createService(createAccountRequest);
      
      if (res?.success) {
        setSuccess(true);
        notification.success({
          message: 'Thành công',
          description: 'Tạo tài khoản thành công!',
        });
        form.resetFields();
        
        // Redirect after a short delay to show success state
        setTimeout(() => {
          navigate('/admin-page/accounts');
        }, 1500);
      }
    } catch (error) {
      console.error("Create account failed:", error);
      notification.error({
        message: 'Lỗi',
        description: error.response?.data?.message || 'Lỗi khi tạo tài khoản!',
      });
      setSubmitting(false);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    if (submitting) return; // Prevent navigation during submission
    navigate('/admin-page/accounts');
  };

  const validatePassword = (_, value) => {
    if (!value) {
      return Promise.reject('Vui lòng nhập mật khẩu');
    }
    if (value.length < 6) {
      return Promise.reject('Mật khẩu phải có ít nhất 6 ký tự');
    }
    return Promise.resolve();
  };

  const validateEmail = (_, value) => {
    if (!value) {
      return Promise.reject('Vui lòng nhập email');
    }
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(value)) {
      return Promise.reject('Email không hợp lệ');
    }
    return Promise.resolve();
  };

  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  if (success) {
    return (
      <div className="new-account-container">
        <BreadcrumbComponent items={breadcrumbItems} />
        <Card className="mt-4 shadow-sm">
          <Result
            status="success"
            icon={<CheckCircleOutlined style={{ color: '#29aae1' }} />}
            title="Tạo tài khoản thành công!"
            subTitle="Đang chuyển hướng đến trang danh sách tài khoản..."
            extra={[
              <Button 
                type="primary" 
                key="console" 
                onClick={() => navigate('/admin-page/accounts')}
                className="bg-[#29aae1]"
              >
                Đến trang danh sách
              </Button>,
            ]}
          />
        </Card>
      </div>
    );
  }

  return (
    <div className="new-account-container">
      <BreadcrumbComponent items={breadcrumbItems} />

      <Card className="mt-4 shadow-sm">
        <Spin spinning={submitting} indicator={antIcon} tip="Đang xử lý...">
          <div className="text-xl font-medium mb-6">Thêm mới tài khoản</div>

          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            requiredMark={false}
            initialValues={{
              roleName: 'ROLE_CUSTOMER'
            }}
            disabled={submitting}
          >
            <Row gutter={16}>
              <Col xs={24} md={12}>
                <Form.Item 
                  label="Họ" 
                  name="lastName" 
                  rules={[{ required: true, message: "Vui lòng nhập họ" }]}
                >
                  <Input 
                    prefix={<UserOutlined className="site-form-item-icon" />} 
                    placeholder="Nhập họ"
                  />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item 
                  label="Tên" 
                  name="firstName" 
                  rules={[{ required: true, message: "Vui lòng nhập tên" }]}
                >
                  <Input 
                    prefix={<UserOutlined className="site-form-item-icon" />} 
                    placeholder="Nhập tên"
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col xs={24} md={12}>
                <Form.Item 
                  label="Email" 
                  name="email" 
                  rules={[{ validator: validateEmail }]}
                >
                  <Input
                    prefix={<MailOutlined className="site-form-item-icon" />}
                    placeholder="Nhập email"
                  />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item 
                  label="Mật khẩu" 
                  name="password" 
                  rules={[{ validator: validatePassword }]}
                >
                  <Input.Password
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    placeholder="Nhập mật khẩu"
                  />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item 
              label="Vai trò" 
              name="roleName" 
              rules={[{ required: true, message: "Vui lòng chọn vai trò" }]}
            >
              <Select
                placeholder="Chọn vai trò"
                options={roleOptions}
                className="w-full"
              />
            </Form.Item>

            <Form.Item className="mt-6">
              <Space>
                <Button 
                  type="primary" 
                  htmlType="submit" 
                  loading={loading}
                  disabled={submitting}
                  icon={<SaveOutlined />}
                  className="bg-[#29aae1]"
                >
                  Tạo tài khoản
                </Button>
                <Button 
                  onClick={handleCancel}
                  icon={<RollbackOutlined />}
                  disabled={submitting}
                >
                  Hủy bỏ
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Spin>
      </Card>
    </div>
  );
}

export default NewAccount