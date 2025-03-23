import React, { useState } from 'react';
import {
  Form,
  Input,
  Button,
  Card,
  Row,
  Col,
  DatePicker,
  Select,
  InputNumber,
  Space,
  message
} from 'antd';
import { PlusOutlined, MinusCircleOutlined, SaveOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import BreadcrumbComponent from '../../../components/navigations/BreadcrumbComponent';
import axios from 'axios';

const { RangePicker } = DatePicker;

const CreatePromotion = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const breadcrumbItems = [
    { title: 'Trang chủ', href: '/staff-page' },
    { title: 'Khuyến mãi', href: '/staff-page/promotions' },
    { title: 'Tạo mã khuyến mãi' }
  ];

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const [startDate, endDate] = values.dateRange || [];

      const payload = {
        isActive: true,
        startDate: startDate?.toISOString(),
        endDate: endDate?.toISOString(),
        promotionType: values.promotionType,
        promotionDetailList: values.promotionDetailList.map((item) => ({
          ...item,
          description: item.description || ''
        }))
      };

      await axios.post('/api/promotions', payload);
      message.success('Tạo mã khuyến mãi thành công!');
      navigate('/staff-page/promotions');
    } catch (error) {
      console.error(error);
      message.error('Lỗi khi tạo mã khuyến mãi!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <BreadcrumbComponent items={breadcrumbItems} />

      <Card className="mt-4">
        <h2 className="text-lg font-semibold mb-4">Tạo mã khuyến mãi</h2>

        <Form layout="vertical" form={form} onFinish={onFinish} initialValues={{ promotionType: 'PROMOTION_PRODUCT' }}>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                label="Thời gian áp dụng"
                name="dateRange"
                rules={[{ required: true, message: 'Vui lòng chọn thời gian!' }]}
              >
                <RangePicker
                  showTime
                  format="DD-MM-YYYY HH:mm"
                  style={{ width: '100%' }}
                  placeholder={["Ngày bắt đầu", "Ngày kết thúc"]}
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

              <Form.List name="promotionDetailList">
                {(fields, { add, remove }) => (
                  <>
                    <label className="font-semibold">Chi tiết khuyến mãi</label>
                    {fields.map(({ key, name, ...restField }) => (
                      <Space
                        key={key}
                        style={{ display: 'flex', marginBottom: 8 }}
                        align="baseline"
                        wrap
                      >
                        <Form.Item
                          {...restField}
                          name={[name, 'promotionName']}
                          rules={[{ required: true, message: 'Nhập tên khuyến mãi' }]}
                        >
                          <Input placeholder="Tên khuyến mãi" />
                        </Form.Item>

                        <Form.Item
                          {...restField}
                          name={[name, 'description']}
                        >
                          <Input placeholder="Mô tả" />
                        </Form.Item>

                        <Form.Item
                          {...restField}
                          name={[name, 'discountValue']}
                          rules={[{ required: true, message: 'Nhập % giảm' }]}
                        >
                          <InputNumber placeholder="% giảm" min={1} max={100} />
                        </Form.Item>

                        <Form.Item
                          {...restField}
                          name={[name, 'miniValue']}
                        >
                          <InputNumber placeholder="Giá trị tối thiểu" min={0} />
                        </Form.Item>

                        <Form.Item
                          {...restField}
                          name={[name, 'maxValue']}
                        >
                          <InputNumber placeholder="Giá trị tối đa" min={0} />
                        </Form.Item>

                        <MinusCircleOutlined onClick={() => remove(name)} />
                      </Space>
                    ))}
                    <Form.Item>
                      <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                        Thêm chi tiết khuyến mãi
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form.List>

              <Form.Item className="text-right">
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  icon={<SaveOutlined />}
                >
                  Tạo khuyến mãi
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>
    </div>
  );
};

export default CreatePromotion;