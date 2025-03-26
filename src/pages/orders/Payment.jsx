import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Card, Col, Row, Typography, Radio, Space, Descriptions, Empty, Spin } from 'antd';
import { formatCurrencyVND, toastConfig } from '../../utils/utils';
import BreadcrumbComponent from '../../components/navigations/BreadcrumbComponent';
import { 
  WalletOutlined, 
  CreditCardOutlined, 
  BankOutlined,
  DollarOutlined
} from '@ant-design/icons';
import { getByOrderIdService } from '../../services/order.service';

const { Title, Text } = Typography;

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('COD');
  const [orderData, setOrderData] = useState(null);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      const { orderId } = location.state || {};
      
      if (!orderId) {
        toastConfig("error", "Không tìm thấy mã đơn hàng");
        navigate('/cart');
        return;
      }

      try {
        setIsFetching(true);
        const response = await getByOrderIdService(orderId);
        
        if (response?.success && response?.data) {
          setOrderData(response.data);
        } else {
          toastConfig("error", "Không thể tải thông tin đơn hàng");
          navigate('/cart');
        }
      } catch (error) {
        console.error("Error fetching order details:", error);
        toastConfig("error", "Đã xảy ra lỗi khi tải thông tin đơn hàng");
        navigate('/cart');
      } finally {
        setIsFetching(false);
      }
    };

    fetchOrderDetails();
  }, [location.state, navigate]);

  const breadcrumbItems = [
    { title: 'Trang chủ', href: '/' },
    { title: 'Đơn hàng', href: '/checkout' },
    { title: 'Thanh toán' }
  ];

  const paymentMethods = [
    {
      value: 'COD',
      label: 'Thanh toán khi nhận hàng',
      icon: <DollarOutlined />,
      description: 'Thanh toán bằng tiền mặt khi nhận hàng'
    },
    {
      value: 'MOMO',
      label: 'Ví MoMo',
      icon: <WalletOutlined />,
      description: 'Thanh toán qua ví điện tử MoMo'
    },
    {
      value: 'VNPAY',
      label: 'VNPay',
      icon: <CreditCardOutlined />,
      description: 'Thanh toán qua cổng VNPay'
    },
    {
      value: 'BANK',
      label: 'Chuyển khoản ngân hàng',
      icon: <BankOutlined />,
      description: 'Chuyển khoản qua tài khoản ngân hàng'
    }
  ];

  const handlePayment = async () => {
    if (!orderData) {
      toastConfig("error", "Không tìm thấy thông tin đơn hàng");
      return;
    }

    try {
      setIsLoading(true);
      
      // Add your payment processing logic here
      const paymentData = {
        orderId: orderData.id,
        paymentMethod: paymentMethod,
        amount: orderData.totalAmount
      };

      console.log("Payment data:", paymentData);
      
      switch (paymentMethod) {
        case 'COD':
          // Handle COD payment
          toastConfig("success", "Đặt hàng thành công! Bạn sẽ thanh toán khi nhận hàng.");
          navigate('/orders');
          break;
        case 'MOMO':
          // Redirect to MoMo payment
          // window.location.href = momoPaymentUrl;
          break;
        case 'VNPAY':
          // Redirect to VNPay payment
          // window.location.href = vnpayPaymentUrl;
          break;
        case 'BANK':
          // Show bank transfer information
          // navigate('/bank-transfer', { state: { orderId: orderData.id, amount: orderData.totalAmount } });
          break;
        default:
          toastConfig("error", "Vui lòng chọn phương thức thanh toán");
      }
    } catch (error) {
      console.error("Payment error:", error);
      toastConfig("error", "Lỗi xử lý thanh toán");
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) {
    return (
      <div className="container">
        <Row>
          <BreadcrumbComponent items={breadcrumbItems} />
        </Row>
        <Row className="w-full pt-4 pb-6 justify-center">
          <Spin size="large" tip="Đang tải thông tin đơn hàng..." />
        </Row>
      </div>
    );
  }

  if (!orderData) {
    return (
      <div className="container">
        <Row>
          <BreadcrumbComponent items={breadcrumbItems} />
        </Row>
        <Row className="w-full pt-4 pb-6 justify-center">
          <Empty
            description="Không tìm thấy thông tin đơn hàng"
            className="py-8"
          />
        </Row>
      </div>
    );
  }

  return (
    <div className="container">
      <Row>
        <BreadcrumbComponent items={breadcrumbItems} />
      </Row>
      <Row className="w-full pt-4 pb-6">
        <Col span={16}>
          <Card className="mb-4">
            <Title level={3}>Chọn phương thức thanh toán</Title>
            <Radio.Group 
              onChange={(e) => setPaymentMethod(e.target.value)}
              value={paymentMethod}
              className="w-full"
            >
              <Space direction="vertical" className="w-full">
                {paymentMethods.map((method) => (
                  <Radio 
                    key={method.value} 
                    value={method.value}
                    className="w-full p-4 border rounded-lg mb-2 hover:bg-gray-50"
                  >
                    <Space>
                      {method.icon}
                      <div>
                        <Text strong>{method.label}</Text>
                        <br />
                        <Text type="secondary">{method.description}</Text>
                      </div>
                    </Space>
                  </Radio>
                ))}
              </Space>
            </Radio.Group>
          </Card>
          <Button
            type="primary"
            size="large"
            block
            loading={isLoading}
            onClick={handlePayment}
            className="bg-[#29aae1]"
          >
            Xác nhận thanh toán
          </Button>
        </Col>
        <Col span={8} className="pl-4">
          <Card>
            <Title level={4}>Chi tiết đơn hàng</Title>
            <Descriptions column={1}>
              <Descriptions.Item label="Mã đơn hàng">{orderData.id}</Descriptions.Item>
              <Descriptions.Item label="Người nhận">{orderData.fullNameShipping}</Descriptions.Item>
              <Descriptions.Item label="Số điện thoại">{orderData.phoneShipping}</Descriptions.Item>
              <Descriptions.Item label="Địa chỉ">{orderData.addressShipping}</Descriptions.Item>
            </Descriptions>
            <div className="mt-4 border-t pt-4">
              {orderData.orderDetails?.map((item, index) => (
                <div key={index} className="mb-2">
                  <Text>{item.ingredient?.ingredientName}</Text>
                  <div className="flex justify-between">
                    <Text type="secondary">
                      {item.quantity} x {formatCurrencyVND(item.price)}
                    </Text>
                    <Text>{formatCurrencyVND(item.totalPrice)}</Text>
                  </div>
                </div>
              ))}
              <div className="border-t mt-4 pt-4">
                <div className="flex justify-between">
                  <Text strong>Tổng thanh toán</Text>
                  <Text strong type="danger">
                    {formatCurrencyVND(orderData.totalAmount)}
                  </Text>
                </div>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Payment; 