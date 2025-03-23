import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { getByIdService } from '../../services/ingredien-product.service';
import { Button, Card, Col, Form, Input, InputNumber, List, Row, Select, Space, Typography, message } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/features/authSlice';
import BreadcrumbComponent from '../../components/navigations/BreadcrumbComponent';
import Icon, { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { formatCurrencyVND, toastConfig } from '../../utils/utils';
import { getByIdItemService } from '../../services/cart.service';
const { Title, Text } = Typography;
const { Option } = Select;

const Checkout = () => {
  const location = useLocation();
  const currentUser = useSelector(selectUser);
  const navigate = useNavigate();
  const { cartItemId } = location.state || { cartItemId: '' };
  const [isLoading, setIsLoading] = useState(false);
  const [cartData, setCartData] = useState(null);
  const [form] = useForm();

  console.log("Location state:", location.state);
  console.log("Cart Item ID received:", cartItemId);
  
  const breadcrumbItems = [
    { title: 'Trang chủ', href: '/' },
    { title: 'Tạo đơn hàng' }
  ];

  const fetchCartItemDetails = async (cartItemId) => {
    if (!cartItemId) {
      console.error("No cart item ID provided");
      toastConfig("error", "Không thể tải thông tin đơn hàng");
      return;
    }

    try {
      setIsLoading(true);
      const res = await getByIdItemService(cartItemId);
      if (res?.success || res?.data) {
        console.log('Cart item data:', res.data);
        setCartData(res.data);
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
      // You might want to redirect or show an error message
    }
  }, [cartItemId]);

  useEffect(() => {
    if (!currentUser) {
      navigate('/login', { state: { returnUrl: location.pathname } });
    }
  }, [currentUser, navigate, location.pathname]);

  const onSubmit = async (values) => {
    if (!cartItemId) {
      toastConfig("error", "Không tìm thấy thông tin đơn hàng");
      return;
    }

    try {
      setIsLoading(true);
      const model = {
        fullNameShipping: values.fullName,
        phoneShipping: values.phone,
        emailShipping: values.email,
        noteShipping: values.note,
        addressShipping: values.address,
        promotionCode: values.promotionCode,
        accountId: currentUser.id,
        cartItemId: cartItemId
      };

      console.log("Order model:", model);
      // Add your API call to place the order here
      
      toastConfig("success", "Đặt hàng thành công!");
      // Redirect to order confirmation or orders page
      // navigate('/orders');
    } catch (error) {
      console.error("Error submitting order:", error);
      toastConfig("error", error?.message || "Lỗi khi đặt hàng");
    } finally {
      setIsLoading(false);
    }
  };

  //detail

  const [cart, setCart] = useState([
    { id: 1, title: "Bột sữa chuyên dụng pha trà sữa Bone", price: 399000, quantity: 1, image: "https://m.media-amazon.com/images/I/71m-MxdJ2WL.jpg" },
    { id: 2, title: "Hồng trà cozy", price: 399000, quantity: 1, image: "https://m.media-amazon.com/images/I/81be6SahKIL.jpg" },
    { id: 3, title: "Sirup dâu", price: 399000, quantity: 1, image: "https://m.media-amazon.com/images/I/91bYsX41DVL.jpg" },
  ]);

  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [discount, setDiscount] = useState(0);
  const deliveryCharge = 0;

  // Danh sách mã giảm giá
  const coupons = [
    { code: "SALE10", discount: 10, label: "Giảm 10%" },
    { code: "SALE20", discount: 20, label: "Giảm 20%" },
    { code: "FREESHIP", discount: 200, label: "Giảm 200 RS." },
  ];

  // Tính tổng tiền
  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const totalAmount = totalPrice + deliveryCharge - discount;

  // Cập nhật số lượng
  const updateQuantity = (id, type) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id
          ? {
            ...item,
            quantity: type === "increase" ? item.quantity + 1 : Math.max(1, item.quantity - 1),
          }
          : item
      )
    );
  };

  // Chọn mã giảm giá
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
                  rules={[
                    {
                      required: true,
                      message: 'Tên không được trống',
                    }
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    {
                      required: true,
                      type: 'email',
                      message: 'Email không hợp lệ',
                    }
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Số điện thoại"
                  name="phone"
                  rules={[
                    {
                      required: true,
                      message: 'Số điện thoại không được trống',
                    }
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Địa chỉ"
                  name="address"
                  rules={[
                    {
                      required: true,
                      message: 'Địa chỉ không được trống',
                    }
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Ghi chú"
                  name="note"
                >
                  <Input.TextArea rows={4} placeholder="Ghi chú về đơn hàng, ví dụ: thời gian hay chỉ dẫn địa điểm giao hàng chi tiết hơn." />
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
            <List
              itemLayout="horizontal"
              dataSource={cart}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<img src={item.image} alt={item.title} width={50} />}
                    title={<Text className="text-[16px] font-medium">{item.title}</Text>}
                    description={
                      <div className='flex items-center gap-4'>
                        <Text>X {formatCurrencyVND(item.price)}</Text>
                        <div className="flex items-center space-x-2 mt-1">
                          <Space.Compact className='h-[30px]' >
                            <Button className='h-full' size="small" icon={<MinusOutlined />} onClick={() => updateQuantity(item.id, "decrease")} />
                            <Input
                              className="w-12 text-center h-full"
                              value={item.quantity}
                              onChange={(value) => updateQuantity(item.id, value)}
                            />
                            <Button className='h-full' size="small" icon={<PlusOutlined />} onClick={() => updateQuantity(item.id, "increase")} />
                          </Space.Compact>
                        </div>
                      </div>
                    }
                  />
                </List.Item>
              )}
            />
            <Row gutter={8} className="mt-4">
              <Col span={16}>
                <Select className="w-full" placeholder="Chọn mã giảm giá" onChange={applyCoupon}>
                  {coupons.map((coupon) => (
                    <Option key={coupon.code} value={coupon.code}>
                      {coupon.label}
                    </Option>
                  ))}
                </Select>
              </Col>
            </Row>
            <div className="mt-4 border-t pt-2">
              <Row justify="space-between"><Text>Tổng đơn hàng</Text><Text>{formatCurrencyVND(totalPrice)}</Text></Row>
              <Row justify="space-between"><Text>Giảm giá</Text><Text>- {formatCurrencyVND(discount)}</Text></Row>
              <Row justify="space-between"><Text>Phí vận chuyển</Text><Text>{formatCurrencyVND(deliveryCharge)}</Text></Row>
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