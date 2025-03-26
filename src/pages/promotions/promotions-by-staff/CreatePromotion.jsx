import React, { useState } from 'react';
import {
  Input,
  Space,
  Button,
  Card,
  Col,
  Divider,
  Form,
  Row,
  Select,
  Typography,
  message,
  DatePicker,
  InputNumber,
} from 'antd';
import { SaveOutlined, ArrowLeftOutlined, PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import BreadcrumbComponent from '../../../components/navigations/BreadcrumbComponent';
import { createPromotionService } from '../../../services/promotion.service';

const { Title } = Typography;

const BREADCRUMB_ITEMS = [
  { title: 'Trang chủ', href: '/staff-page' },
  { title: 'Khuyến mãi', href: '/staff-page/promotions' },
  { title: 'Tạo mới khuyến mãi' },
];

const CreatePromotion = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [statusOptions] = useState([
    { label: 'Đang hoạt động', value: 'ACTIVE' },
    { label: 'Không hoạt động', value: 'NO_ACTIVE' },
  ]);

  // Hàm tạo khuyến mãi
  const onFinish = async (values) => {
    try {
      setLoading(true);

      const payload = {
        isActive: values.status === 'ACTIVE', 
        startDate: values.startDate, 
        endDate: values.endDate, 
        promotionType: 'PROMOTION_PRODUCT', 
        
      };

      const result = await createPromotionService(payload);  // Gọi API tạo khuyến mãi
      if (result?.success) {
        message.success("Tạo khuyến mãi thành công!");
        navigate('/staff-page/promotions');  
      } else {
        throw new Error(result?.message || "Tạo khuyến mãi thất bại");
      }
    } catch (error) {
      console.error("Error creating promotion:", error);
      message.error("Đã xảy ra lỗi khi tạo khuyến mãi!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <BreadcrumbComponent items={BREADCRUMB_ITEMS} />
      <Card className="mt-4 shadow-sm">
        <div className="flex flex-wrap justify-between items-center mb-4">
          <div className="flex items-center">
            <Button
              icon={<ArrowLeftOutlined />}
              onClick={() => navigate('/staff-page/promotions')}
              className="mr-4"
            >
              Quay lại
            </Button>
            <Title level={4} className="mb-0">Tạo mới khuyến mãi</Title>
          </div>
        </div>
        <Divider />

        <Form layout="vertical" form={form} onFinish={onFinish}>
          {}
          <Card title="Thông tin cơ bản" className="mb-4">
            <Row gutter={24}>
              <Col xs={24} md={12}>
                <Form.Item
                  label="Mã khuyến mãi"
                  name="promotionCode"
                  rules={[{ required: true, message: "Vui lòng nhập mã khuyến mãi!" }]}
                >
                  <Input placeholder="Nhập mã khuyến mãi" />
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item
                  label="Trạng thái"
                  name="status"
                  rules={[{ required: true, message: "Vui lòng chọn trạng thái" }]}
                >
                  <Select
                    placeholder="Chọn trạng thái"
                    options={statusOptions}
                  />
                </Form.Item>

                <Form.Item
                  label="Ngày bắt đầu"
                  name="startDate"
                  rules={[{ required: true, message: "Vui lòng chọn ngày bắt đầu!" }]}
                >
                  <DatePicker
                    style={{ width: '100%' }}
                    format="DD-MM-YYYY"
                    placeholder="Chọn ngày bắt đầu"
                  />
                </Form.Item>

                <Form.Item
                  label="Ngày kết thúc"
                  name="endDate"
                  rules={[{ required: true, message: "Vui lòng chọn ngày kết thúc!" }]}
                >
                  <DatePicker
                    style={{ width: '100%' }}
                    format="DD-MM-YYYY"
                    placeholder="Chọn ngày kết thúc"
                  />
                </Form.Item>
              </Col>
            </Row>
          </Card>
          <div className="flex justify-end">
            <Space>
              <Button
                onClick={() => navigate('/staff-page/promotions')}
                disabled={loading}
              >
                Hủy
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                icon={<SaveOutlined />}
              >
                Tạo khuyến mãi
              </Button>
            </Space>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default CreatePromotion;
