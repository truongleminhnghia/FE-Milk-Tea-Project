import React, { useState, useEffect } from 'react';
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
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import BreadcrumbComponent from '../../../components/navigations/BreadcrumbComponent';
import { getByIdPromotionService, updatePromotionService } from '../../../services/promotion.service';

const { RangePicker } = DatePicker;

const UpdatePromotion = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [promotionId, setPromotionId] = useState(null); // Lưu trữ mã khuyến mãi
  const [promotionData, setPromotionData] = useState(null); // Dữ liệu khuyến mãi
  const navigate = useNavigate();

  const breadcrumbItems = [
    { title: 'Trang chủ', href: '/staff-page' },
    { title: 'Khuyến mãi', href: '/staff-page/promotions' },
    { title: 'Cập nhật khuyến mãi' }
  ];

  // Lấy dữ liệu khuyến mãi khi promotionId thay đổi
  useEffect(() => {
    if (promotionId) {
      fetchPromotion(promotionId);
    }
  }, [promotionId]);

  const fetchPromotion = async (id) => {
    try {
      // Gọi API để lấy dữ liệu khuyến mãi
      const res = await getByIdPromotionService(id);
      if (res?.data) {
        const { startDate, endDate, promotionType } = res.data;

        // Cập nhật dữ liệu vào form
        form.setFieldsValue({
          dateRange: [dayjs(startDate), dayjs(endDate)],
          promotionType
        });
        setPromotionData(res.data);
      } else {
        message.error('Không tìm thấy khuyến mãi với mã này.');
      }
    } catch (err) {
      message.error('Lỗi khi tải thông tin khuyến mãi.');
    }
  };

  // Xử lý khi người dùng nhập mã khuyến mãi
  const handlePromotionIdChange = (e) => {
    setPromotionId(e.target.value); // Cập nhật mã khuyến mãi
  };

  // Xử lý khi người dùng submit form
  const onFinish = async (values) => {
    setLoading(true);
    try {
      const [startDate, endDate] = values.dateRange || [];

      const payload = {
        isActive: true, // Giả sử khuyến mãi luôn ở trạng thái "hoạt động"
        startDate: startDate?.toISOString(),
        endDate: endDate?.toISOString(),
        promotionType: values.promotionType // Loại khuyến mãi được chọn
      };

      const result = await updatePromotionService(promotionId, payload); // Gọi service cập nhật khuyến mãi
      if (result?.data) {
        message.success('Cập nhật khuyến mãi thành công!');
        navigate('/staff-page/promotions');
      } else {
        message.error('Lỗi khi cập nhật khuyến mãi!');
      }
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
              {/* Trường nhập mã khuyến mãi */}
              <Form.Item
                label="Mã khuyến mãi"
                name="promotionId"
                rules={[{ required: true, message: 'Vui lòng nhập mã khuyến mãi!' }]}>
                <Input
                  placeholder="Nhập mã khuyến mãi"
                  value={promotionId}
                  onChange={handlePromotionIdChange} // Khi thay đổi mã khuyến mãi, cập nhật trạng thái
                />
              </Form.Item>

              {/* Hiển thị các thông tin khuyến mãi nếu có dữ liệu */}
              {promotionData && (
                <>
                  <Form.Item
                    label="Thời gian áp dụng"
                    name="dateRange"
                    rules={[{ required: true, message: 'Vui lòng chọn thời gian!' }]}>
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
                    rules={[{ required: true, message: 'Vui lòng chọn loại khuyến mãi!' }]}>
                    <Select
                      placeholder="Chọn loại khuyến mãi"
                      options={[
                        { label: 'Khuyến mãi sản phẩm', value: 'PROMOTION_PRODUCT' },
                        { label: 'Khuyến mãi đơn hàng', value: 'PROMOTION_ORDER' }
                      ]}
                    />
                  </Form.Item>
                </>
              )}

              {/* Nút Lưu */}
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
