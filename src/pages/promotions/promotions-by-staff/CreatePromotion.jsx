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
import moment from 'moment';

const { Title, Text } = Typography;
const { TextArea } = Input;

const BREADCRUMB_ITEMS = [
  { title: 'Trang chủ', href: '/staff-page' },
  { title: 'Khuyến mãi', href: '/staff-page/promotions' },
  { title: 'Tạo mới khuyến mãi' },
];

const CreatePromotion = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [promotionDetails, setPromotionDetails] = useState([]);

  const statusOptions = [
    { label: 'Đang hoạt động', value: true },
    { label: 'Không hoạt động', value: false },
  ];

  // Hàm tạo khuyến mãi
  const onFinish = async (values) => {
    // Validate promotion details
    if (promotionDetails.length === 0) {
      message.error("Vui lòng thêm ít nhất một chi tiết khuyến mãi!");
      return;
    }

    // Check if all promotion details are valid
    const isDetailsValid = promotionDetails.every(detail => 
      detail.promotionName && 
      detail.discountValue !== null && 
      detail.discountValue !== undefined
    );

    if (!isDetailsValid) {
      message.error("Vui lòng điền đầy đủ thông tin chi tiết khuyến mãi!");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        isActive: values.status,
        startDate: values.startDate.toISOString(),
        endDate: values.endDate.toISOString(),
        promotionCode: values.promotionCode,
        promotionType: 'PROMOTION_PRODUCT',
        promotionDetailList: promotionDetails.map(detail => ({
          promotionName: detail.promotionName,
          description: detail.description || '',
          discountValue: detail.discountValue,
          miniValue: detail.miniValue || 0,
          maxValue: detail.maxValue || 0
        }))
      };

      const result = await createPromotionService(payload);
      
      if (result?.data) {
        message.success("Tạo khuyến mãi thành công!");
        navigate('/staff-page/promotions');  
      } else {
        // Handle potential error messages from the service
        message.error(result || "Tạo khuyến mãi thất bại");
      }
    } catch (error) {
      console.error("Error creating promotion:", error);
      message.error("Đã xảy ra lỗi khi tạo khuyến mãi!");
    } finally {
      setLoading(false);
    }
  };

  const addPromotionDetail = () => {
    setPromotionDetails([
      ...promotionDetails, 
      { 
        promotionName: '', 
        description: '', 
        discountValue: null, 
        miniValue: null, 
        maxValue: null 
      }
    ]);
  };

  const removePromotionDetail = (index) => {
    const updatedDetails = [...promotionDetails];
    updatedDetails.splice(index, 1);
    setPromotionDetails(updatedDetails);
  };

  const updatePromotionDetail = (index, field, value) => {
    const updatedDetails = [...promotionDetails];
    updatedDetails[index][field] = value;
    setPromotionDetails(updatedDetails);
  };

  // Custom validator to ensure start date is before end date
  const validateDateRange = (_, values) => {
    const { startDate, endDate } = values;
    if (startDate && endDate && startDate.isAfter(endDate)) {
      return Promise.reject(new Error('Ngày bắt đầu phải trước ngày kết thúc'));
    }
    return Promise.resolve();
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

        <Form 
          layout="vertical" 
          form={form} 
          onFinish={onFinish}
          onValuesChange={() => form.validateFields()}
        >
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
                  rules={[
                    { required: true, message: "Vui lòng chọn ngày bắt đầu!" },
                    { validator: validateDateRange }
                  ]}
                >
                  <DatePicker
                    style={{ width: '100%' }}
                    format="DD-MM-YYYY"
                    placeholder="Chọn ngày bắt đầu"
                    disabledDate={(current) => current && current < moment().startOf('day')}
                  />
                </Form.Item>

                <Form.Item
                  label="Ngày kết thúc"
                  name="endDate"
                  rules={[
                    { required: true, message: "Vui lòng chọn ngày kết thúc!" },
                    { validator: validateDateRange }
                  ]}
                >
                  <DatePicker
                    style={{ width: '100%' }}
                    format="DD-MM-YYYY"
                    placeholder="Chọn ngày kết thúc"
                    disabledDate={(current) => current && current < moment().startOf('day')}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Card>

          <Card 
            title="Chi tiết khuyến mãi" 
            className="mb-4" 
            extra={
              <Button 
                type="dashed" 
                onClick={addPromotionDetail} 
                icon={<PlusOutlined />}
              >
                Thêm chi tiết khuyến mãi
              </Button>
            }
          >
            {promotionDetails.map((detail, index) => (
              <Card 
                key={index} 
                className="mb-4"
                extra={
                  <Button 
                    type="text" 
                    danger 
                    icon={<MinusCircleOutlined />} 
                    onClick={() => removePromotionDetail(index)}
                  >
                    Xóa
                  </Button>
                }
              >
                <Row gutter={24}>
                  <Col xs={24} md={12}>
                    <Form.Item 
                      label="Tên khuyến mãi"
                      validateStatus={!detail.promotionName ? 'error' : ''}
                      help={!detail.promotionName ? 'Vui lòng nhập tên khuyến mãi' : ''}
                    >
                      <Input 
                        placeholder="Nhập tên khuyến mãi"
                        value={detail.promotionName}
                        onChange={(e) => updatePromotionDetail(index, 'promotionName', e.target.value)}
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={12}>
                    <Form.Item 
                      label="Giá trị giảm giá"
                      validateStatus={detail.discountValue === null ? 'error' : ''}
                      help={detail.discountValue === null ? 'Vui lòng nhập giá trị giảm giá' : ''}
                    >
                      <InputNumber 
                        style={{ width: '100%' }}
                        placeholder="Nhập giá trị giảm giá"
                        min={0}
                        value={detail.discountValue}
                        onChange={(value) => updatePromotionDetail(index, 'discountValue', value)}
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24}>
                    <Form.Item label="Mô tả">
                      <TextArea 
                        placeholder="Nhập mô tả khuyến mãi"
                        value={detail.description}
                        onChange={(e) => updatePromotionDetail(index, 'description', e.target.value)}
                        rows={3}
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={12}>
                    <Form.Item label="Giá trị tối thiểu">
                      <InputNumber 
                        style={{ width: '100%' }}
                        placeholder="Nhập giá trị tối thiểu"
                        min={0}
                        value={detail.miniValue}
                        onChange={(value) => updatePromotionDetail(index, 'miniValue', value)}
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={12}>
                    <Form.Item label="Giá trị tối đa">
                      <InputNumber 
                        style={{ width: '100%' }}
                        placeholder="Nhập giá trị tối đa"
                        min={0}
                        value={detail.maxValue}
                        onChange={(value) => updatePromotionDetail(index, 'maxValue', value)}
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </Card>
            ))}
            {promotionDetails.length === 0 && (
              <div className="text-center">
                <Text type="secondary">
                  Chưa có chi tiết khuyến mãi. Nhấn "Thêm chi tiết khuyến mãi" để bắt đầu.
                </Text>
              </div>
            )}
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