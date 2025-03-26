import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Button, Card, Col, Form, Input, List, Row, Select, Typography, message } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/features/authSlice';
import BreadcrumbComponent from '../../components/navigations/BreadcrumbComponent';
import { formatCurrencyVND, toastConfig } from '../../utils/utils';
import { getByIdItemService } from '../../services/cart.service';
import { createOrderService } from '../../services/order.service';
const { Title, Text } = Typography;
const { Option } = Select;

const Checkout = () => {
  const location = useLocation();
  const currentUser = useSelector(selectUser);
  const navigate = useNavigate();
  const { cartItemId } = location.state || { cartItemId: '' };
  const [isLoading, setIsLoading] = useState(false);
  const [cartItem, setCartItem] = useState(null);
  const [form] = useForm();

  const breadcrumbItems = [
    { title: 'Trang chủ', href: '/' },
    { title: 'Tạo đơn hàng' }
  ];

  const fetchCartItemDetails = async (cartItemId) => {
    if (!cartItemId) {
      toastConfig("error", "Không tìm thấy thông tin đơn hàng");
      return;
    }

    try {
      setIsLoading(true);
      const res = await getByIdItemService(cartItemId);
      if (res?.success && res?.data) {
        console.log('Cart item data:', res.data);
        setCartItem(res.data);
        // Pre-fill shipping info from user profile
        form.setFieldsValue({
          fullName: `${currentUser?.firstName || ''} ${currentUser?.lastName || ''}`.trim(),
          email: currentUser?.email,
          phone: currentUser?.phone,
          address: currentUser?.address
        });
      } else {
        toastConfig("error", "Không thể tải thông tin đơn hàng");
      }
    } catch (error) {
      console.error("Error fetching cart item:", error);
      toastConfig("error", "Đã xảy ra lỗi khi tải thông tin đơn hàng");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (cartItemId) {
      fetchCartItemDetails(cartItemId);
    } else {
      console.warn("No cart item ID in location state");
      navigate('/cart');
    }
  }, [cartItemId]);

  useEffect(() => {
    if (!currentUser) {
      navigate('/login', { state: { returnUrl: location.pathname } });
    }
  }, [currentUser, navigate, location.pathname]);

  const onSubmit = async (values) => {
    if (!cartItemId || !cartItem) {
      toastConfig("error", "Không tìm thấy thông tin đơn hàng");
      return;
    }

    try {
      setIsLoading(true);
      const orderModel = {
        fullNameShipping: values.fullName,
        phoneShipping: values.phone,
        emailShipping: values.email,
        noteShipping: values.note || '',
        addressShipping: values.address,
        promotionCode: values.promotionCode,
        accountId: currentUser.id,
        orderDetailList: [
          {
            cartItemId: cartItemId
          }
        ]
      };

      console.log("Order model:", orderModel);
      const response = await createOrderService(orderModel);
      
      if (response?.success && response?.data) {
        toastConfig("success", "Đặt hàng thành công!");
        // Only pass orderId to payment page
        navigate('/payment', {
          state: {
            orderId: response.data.id
          }
        });
      } else {
        toastConfig("error", "Không thể tạo đơn hàng");
      }
    } catch (error) {
      console.error("Error submitting order:", error);
      toastConfig("error", error?.message || "Lỗi khi đặt hàng");
    } finally {
      setIsLoading(false);
    }
  };

  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [discount, setDiscount] = useState(0);
  const deliveryCharge = 0;

  const coupons = [
    { code: "SALE10", discount: 10, label: "Giảm 10%" },
    { code: "SALE20", discount: 20, label: "Giảm 20%" },
    { code: "FREESHIP", discount: 200, label: "Giảm 200 RS." },
  ];

  const totalPrice = cartItem?.totalPrice || 0;
  const totalAmount = totalPrice + deliveryCharge - discount;

  const applyCoupon = (value) => {
    const coupon = coupons.find((c) => c.code === value);
    if (coupon) {
      setSelectedCoupon(coupon);
      setDiscount(coupon.discount);
      message.success(`Áp dụng mã: ${coupon.label}`);
    }
  };

  return (
    <div className='container'>
      <Row>
        <BreadcrumbComponent items={breadcrumbItems} />
      </Row>
      <Row className='w-full pt-4 pb-6'>
        <Col span={14}>
          <Row>
            <Col span={24} className='bg-white px-3 py-2 rounded-xl shadow-sm'>
              <Form
                form={form}
                layout='vertical'
                colon={false}
                labelAlign='left'
                onFinish={onSubmit}
              >
                <Form.Item
                  label="Họ & Tên"
                  name='fullName'
                  rules={[{ required: true, message: 'Tên không được trống' }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[{ required: true, type: 'email', message: 'Email không hợp lệ' }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Số điện thoại"
                  name="phone"
                  rules={[{ required: true, message: 'Số điện thoại không được trống' }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Địa chỉ"
                  name="address"
                  rules={[{ required: true, message: 'Địa chỉ không được trống' }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item label="Ghi chú" name="note">
                  <Input.TextArea 
                    rows={4} 
                    placeholder="Ghi chú về đơn hàng, ví dụ: thời gian hay chỉ dẫn địa điểm giao hàng chi tiết hơn." 
                  />
                </Form.Item>
                
                <Form.Item>
                  <Button 
                    type="primary" 
                    htmlType="submit" 
                    className="bg-[#29aae1]" 
                    size="large"
                    loading={isLoading}
                    block
                  >
                    Đặt hàng
                  </Button>
                </Form.Item>
              </Form>
            </Col>
          </Row>
        </Col>
        <Col span={10} className='px-2'>
          <Card className="w-full mx-auto shadow-lg rounded-lg">
            <Title level={3} className="text-center text-black">Chi tiết đơn hàng</Title>
            {cartItem && (
              <List
                itemLayout="horizontal"
                dataSource={[cartItem]}
                renderItem={(item) => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={
                        <img 
                          src={item.ingredient.images[0]?.imageUrl} 
                          alt={item.ingredient.ingredientName} 
                          width={50} 
                        />
                      }
                      title={
                        <Text className="text-[16px] font-medium">
                          {item.ingredient.ingredientName}
                        </Text>
                      }
                      description={
                        <div className='flex flex-col gap-2'>
                          <Text>Đơn giá: {formatCurrencyVND(item.price)}</Text>
                          <Text>Số lượng: {item.quantity} {item.productType}</Text>
                          <Text>Nhà cung cấp: {item.ingredient.supplier}</Text>
                        </div>
                      }
                    />
                  </List.Item>
                )}
              />
            )}
            <Row gutter={8} className="mt-4">
              <Col span={16}>
                <Select 
                  className="w-full" 
                  placeholder="Chọn mã giảm giá" 
                  onChange={applyCoupon}
                >
                  {coupons.map((coupon) => (
                    <Option key={coupon.code} value={coupon.code}>
                      {coupon.label}
                    </Option>
                  ))}
                </Select>
              </Col>
            </Row>
            <div className="mt-4 border-t pt-2">
              <Row justify="space-between">
                <Text>Tổng đơn hàng</Text>
                <Text>{formatCurrencyVND(totalPrice)}</Text>
              </Row>
              <Row justify="space-between">
                <Text>Giảm giá</Text>
                <Text>- {formatCurrencyVND(discount)}</Text>
              </Row>
              <Row justify="space-between">
                <Text>Phí vận chuyển</Text>
                <Text>{formatCurrencyVND(deliveryCharge)}</Text>
              </Row>
            </div>
            <Row justify="space-between" className="mt-2">
              <Title level={4}>Tổng</Title>
              <Title level={4} type="danger">{formatCurrencyVND(totalAmount)}</Title>
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default Checkout