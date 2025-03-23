import React, { useEffect, useState } from 'react';
import {
  Form,
  Input,
  Button,
  Card,
  Row,
  Col,
  DatePicker,
  Select,
  message
} from 'antd';
import { SaveOutlined } from '@ant-design/icons';
import { useParams, useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import BreadcrumbComponent from '../../../components/navigations/BreadcrumbComponent';
import axios from 'axios';

const { RangePicker } = DatePicker;

const UpdatePromotion = () => {
  const { id } = useParams();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const breadcrumbItems = [
    { title: 'Trang chủ', href: '/staff-page' },
    { title: 'Khuyến mãi', href: '/staff-page/promotions' },
    { title: 'Cập nhật khuyến mãi' }
  ];

  useEffect(() => {
    fetchPromotion();
  }, []);

  const fetchPromotion = async () => {
    try {
      const res = await axios.get(`/api/promotions/${id}`);
      const { startDate, endDate, promotionType } = res.data;

      form.setFieldsValue({
        dateRange: [dayjs(startDate), dayjs(endDate)],
        promotionType
      });
    } catch (err) {
      message.error('Không thể tải thông tin khuyến mãi.');
    }
  };

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const [startDate, endDate] = values.dateRange || [];

      const payload = {
        isActive: true,
        startDate: startDate?.toISOString(),
        endDate: endDate?.toISOString(),
        promotionType: values.promotionType
      };

      await axios.put(`/api/promotions/${id}`, payload);
      message.success('Cập nhật khuyến mãi thành công!');
      navigate('/staff-page/promotions');
    } catch (error) {
      console.error(error);
      message.error('Lỗi khi cập nhật khuyến mãi!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <BreadcrumbComponent items={breadcrumbItems} />

      <Card className="mt-4">
        <h2 className="text-lg font-semibold mb-4">Cập nhật mã khuyến mãi</h2>

        <Form layout="vertical" form={form} onFinish={onFinish}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Mã khuyến mãi">
                <Input value={id} disabled />
              </Form.Item>

              <Form.Item
                label="Thời gian áp dụng"
                name="dateRange"
                rules={[{ required: true, message: 'Vui lòng chọn thời gian!' }]}
              >
                <RangePicker
                  showTime
                  format="DD-MM-YYYY HH:mm"
                  style={{ width: '100%' }}
                  placeholder={['Ngày bắt đầu', 'Ngày kết thúc']}
                />
              </Form.Item>

              <Form.Item
                label="Loại khuyến mãi"
                name="promotionType"
                rules={[{ required: true, message: 'Vui lòng chọn loại khuyến mãi!' }]}
              >
                <Select
                  placeholder="Chọn loại khuyến mãi"
                  options={[
                    { label: 'Khuyến mãi sản phẩm', value: 'PROMOTION_PRODUCT' },
                    { label: 'Khuyến mãi đơn hàng', value: 'PROMOTION_ORDER' }
                  ]}
                />
              </Form.Item>

              <Form.Item className="text-right">
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  icon={<SaveOutlined />}
                >
                  Lưu thay đổi
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>
    </div>
  );
};

export default UpdatePromotion;