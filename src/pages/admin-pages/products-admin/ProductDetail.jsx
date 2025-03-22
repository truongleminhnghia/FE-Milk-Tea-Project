import React, { useEffect, useState } from 'react'
import BreadcrumbComponent from '../../../components/navigations/BreadcrumbComponent'
import { Col, Form, Input, Row, Table, Card, Typography, Tag, Divider, Spin, Button, Space, Descriptions, Badge, Statistic } from 'antd';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { FreeMode, Navigation, Thumbs, Pagination, Autoplay } from 'swiper/modules';
import { EditOutlined, ArrowLeftOutlined, LoadingOutlined, CheckCircleOutlined, CloseCircleOutlined, CalendarOutlined, TagOutlined, ShoppingOutlined, InfoCircleOutlined } from '@ant-design/icons';
import TableGenerComponent from '../../../components/tables/TableGenerComponent';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { formatCurrencyVND, formatISODate, toastConfig } from '../../../utils/utils';
import { getByIdService } from '../../../services/product.service';
import { selectUser } from '../../../redux/features/authSlice';
import { useSelector } from 'react-redux';

const { Title, Text } = Typography;

const ProductDetail = () => {
    const currentUser = useSelector(selectUser)
    const { id } = useParams();
    const navigate = useNavigate();
    const breadcrumbItems = [
        { title: 'Trang chủ', href: currentUser.roleName === "ROLE_ADMIN" ? '/admin-page' : '/staff-page' },
        { title: 'Sản phẩm', href: currentUser.roleName === "ROLE_ADMIN" ? '/admin-page/products' : '/staff-page/products' },
        { title: 'Chi tiết sản phẩm' }
    ];
    const [activeIndex, setActiveIndex] = useState(0);
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [data, setData] = useState({})
    const [form] = Form.useForm();

    const fetchDetail = async (id) => {
        try {
            setIsLoading(true);
            const res = await getByIdService(id);
            if (res?.success || res?.data) {
                form.setFieldsValue(res.data);
                setData(res.data);
            } else {
                toastConfig("error", "Không thể tải thông tin sản phẩm");
            }
        } catch (error) {
            console.error("Error fetching product details:", error);
            toastConfig("error", "Đã xảy ra lỗi khi tải chi tiết sản phẩm");
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchDetail(id);
    }, [id]);

    const columnsQuantity = [
        {
            title: "Số lượng",
            dataIndex: "quantity",
            key: "quantity",
            render: (text) => <span>{text?.toLocaleString()}</span>
        },
        {
            title: "Loại",
            dataIndex: "productType",
            key: "productType",
            render: (text) => <Tag color="blue">{text}</Tag>
        },
        {
            title: "Ngày nhập",
            dataIndex: "createAt",
            key: "createAt",
            render: (text) => text ? formatISODate(text) : 'N/A'
        },
    ];

    const getStatusTag = (status) => {
        if (!status) return <Tag>Không xác định</Tag>;

        const statusMap = {
            'ACTIVE': { color: 'green', text: 'Đang hoạt động', icon: <CheckCircleOutlined /> },
            'NO_ACTIVE': { color: 'red', text: 'Không hoạt động', icon: <CloseCircleOutlined /> }
        };

        const { color, text, icon } = statusMap[status] || { color: 'default', text: status, icon: null };

        return (
            <Tag color={color} icon={icon}>
                {text}
            </Tag>
        );
    };

    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

    const handleEdit = () => {
        // Implement edit product logic here
        navigate(`/staff-page/products/edit/${id}`);
    };

    // Function to check if a date is expired
    const isExpired = (dateString) => {
        if (!dateString) return false;

        const expireDate = new Date(dateString);
        const today = new Date();

        return expireDate < today;
    };

    const goBack = () => {
        if (currentUser.roleName === "ROLE_ADMIN") {
            navigate('/admin-page/categories')
        } else if (currentUser.roleName === "ROLE_STAFF") {
            navigate('/staff-page/categories')
        }
    }

    return (
        <div className="product-detail-container">
            <BreadcrumbComponent items={breadcrumbItems} />

            <Spin spinning={isLoading} indicator={antIcon}>
                <Card className="mt-4 shadow-sm">
                    <div className="flex flex-wrap justify-between items-center mb-4">
                        <div className="flex items-center">
                            <Button
                                icon={<ArrowLeftOutlined />}
                                onClick={goBack}
                                className="mr-4"
                            >
                                Quay lại
                            </Button>
                            <Title level={4} className="mb-0">
                                Chi tiết nguyên liệu: {data.ingredientName}
                            </Title>
                        </div>
                        {currentUser.roleName !== "ROLE_ADMIN" && (
                            <Button
                                type="primary"
                                icon={<EditOutlined />}
                                onClick={handleEdit}
                                className="bg-[#29aae1]"
                            >
                                Chỉnh sửa
                            </Button>
                        )}
                    </div>

                    <Divider />

                    <Row gutter={24}>
                        <Col xs={24} lg={12} className="mb-4">
                            <Card title="Thông tin cơ bản" className="h-full">
                                <Descriptions layout="vertical" column={{ xs: 1, sm: 2 }} bordered>
                                    <Descriptions.Item label="Mã sản phẩm" span={2}>
                                        <Text copyable>{data.ingredientCode}</Text>
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Tên nguyên liệu">
                                        <Text strong>{data.ingredientName}</Text>
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Nhà sản xuất">
                                        {data.supplier}
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Trạng thái">
                                        {getStatusTag(data.ingredientStatus)}
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Khuyến mãi">
                                        <Badge status={data.isSale ? "success" : "error"} text={data.isSale ? "Có" : "Không"} />
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Danh mục">
                                        <Link to={`/admin-page/categories/detail/${data.category?.id}`}>
                                            <Tag color="blue">{data.category?.categoryName}</Tag>
                                        </Link>
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Loại nguyên liệu">
                                        <Tag color="purple">{data.ingredientType}</Tag>
                                    </Descriptions.Item>
                                </Descriptions>

                                <div className="mt-4">
                                    <Row gutter={16}>
                                        <Col span={12}>
                                            <Statistic
                                                title="Giá gốc"
                                                value={data.priceOrigin}
                                                formatter={(value) => value ? formatCurrencyVND(value) : 'Không có'}
                                            />
                                        </Col>
                                        <Col span={12}>
                                            <Statistic
                                                title="Giá khuyến mãi"
                                                value={data.pricePromotion || '-'}
                                                valueStyle={{ color: data.pricePromotion ? '#3f8600' : '#999' }}
                                                formatter={(value) => value ? formatCurrencyVND(value) : 'Không có'}
                                            />
                                        </Col>
                                    </Row>
                                </div>
                            </Card>
                        </Col>
                        <Col xs={24} lg={12} className="mb-4">
                            <Card title="Hình ảnh sản phẩm" className="h-full">
                                <div className="product-images">
                                    <Swiper
                                        className='h-[350px] mb-3 border border-gray-100 rounded-lg'
                                        loop={data.images?.length > 1}
                                        spaceBetween={0}
                                        slidesPerView={1}
                                        navigation={{
                                            nextEl: '.swiper-button-next',
                                            prevEl: '.swiper-button-prev',
                                        }}
                                        autoplay={{
                                            delay: 3000,
                                            disableOnInteraction: false,
                                            pauseOnMouseEnter: true
                                        }}
                                        pagination={{
                                            clickable: true,
                                            dynamicBullets: true,
                                        }}
                                        thumbs={{ swiper: thumbsSwiper }}
                                        modules={[Navigation, Thumbs, FreeMode, Autoplay, Pagination]}
                                        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
                                    >
                                        {data.images?.length > 0 ? (
                                            data.images.map((item, index) => (
                                                <SwiperSlide key={item.id || index} className="bg-gray-50 rounded-lg">
                                                    <div className="flex justify-center items-center h-full p-3">
                                                        <img
                                                            className="rounded-lg object-contain max-h-full max-w-full shadow-sm hover:shadow-md transition-all duration-300"
                                                            src={item?.imageUrl}
                                                            alt={`${data.ingredientName} - ${index + 1}`}
                                                        />
                                                    </div>
                                                </SwiperSlide>
                                            ))
                                        ) : (
                                            <SwiperSlide className="bg-gray-50 rounded-lg">
                                                <div className="flex flex-col justify-center items-center h-full">
                                                    <InfoCircleOutlined style={{ fontSize: '32px', color: '#bfbfbf', marginBottom: '12px' }} />
                                                    <Text type="secondary">Sản phẩm chưa có hình ảnh</Text>
                                                </div>
                                            </SwiperSlide>
                                        )}
                                        <div className="swiper-button-next !text-[#29aae1] !opacity-70 !w-[35px] !h-[35px] !right-2 after:!text-[18px] hover:!opacity-100"></div>
                                        <div className="swiper-button-prev !text-[#29aae1] !opacity-70 !w-[35px] !h-[35px] !left-2 after:!text-[18px] hover:!opacity-100"></div>
                                    </Swiper>

                                    {data.images?.length > 1 && (
                                        <Swiper
                                            onSwiper={setThumbsSwiper}
                                            loop={data.images.length > 4}
                                            spaceBetween={10}
                                            slidesPerView="auto"
                                            breakpoints={{
                                                320: {
                                                    slidesPerView: 3,
                                                },
                                                640: {
                                                    slidesPerView: 4,
                                                }
                                            }}
                                            freeMode={true}
                                            watchSlidesProgress={true}
                                            modules={[FreeMode, Navigation, Thumbs]}
                                            className='h-[80px] bg-gray-50 rounded-lg p-2'
                                        >
                                            {data.images.map((item, index) => (
                                                <SwiperSlide
                                                    key={item.id || index}
                                                    className={`cursor-pointer rounded-lg overflow-hidden ${activeIndex === index
                                                            ? "border-2 border-[#29aae1] shadow-md"
                                                            : "border border-gray-200 opacity-70 hover:opacity-100 transition-opacity"
                                                        }`}
                                                    onClick={() => thumbsSwiper?.slideTo(index)}
                                                >
                                                    <div className="h-full w-full">
                                                        <img
                                                            src={item?.imageUrl}
                                                            alt={`thumbnail-${index}`}
                                                            className="rounded-lg object-cover h-full w-full"
                                                        />
                                                    </div>
                                                </SwiperSlide>
                                            ))}
                                        </Swiper>
                                    )}
                                </div>
                            </Card>
                        </Col>
                    </Row>

                    <Row gutter={24}>
                        <Col xs={24} lg={12} className="mb-4">
                            <Card
                                title={
                                    <Space>
                                        <ShoppingOutlined />
                                        <span>Số lượng trong kho</span>
                                    </Space>
                                }
                                className="h-full"
                            >
                                <TableGenerComponent
                                    columns={columnsQuantity}
                                    data={data.ingredientQuantities || []}
                                    pagination={{ pageSize: 5 }}
                                    loading={isLoading}
                                    rowClassName="hover:bg-gray-50"
                                    bordered
                                />
                            </Card>
                        </Col>
                        <Col xs={24} lg={12} className="mb-4">
                            <Card
                                title={
                                    <Space>
                                        <InfoCircleOutlined />
                                        <span>Thông tin chi tiết</span>
                                    </Space>
                                }
                                className="h-full"
                            >
                                <Descriptions layout="vertical" column={1} bordered>
                                    <Descriptions.Item
                                        label={
                                            <Space>
                                                <TagOutlined />
                                                <span>Trọng lượng trên một bịch</span>
                                            </Space>
                                        }
                                    >
                                        <Text strong>{data.weightPerBag}</Text> {data.unit}
                                    </Descriptions.Item>

                                    <Descriptions.Item
                                        label={
                                            <Space>
                                                <ShoppingOutlined />
                                                <span>Số lượng trong một thùng</span>
                                            </Space>
                                        }
                                    >
                                        <Text strong>{data.quantityPerCarton}</Text>
                                    </Descriptions.Item>

                                    <Descriptions.Item
                                        label={
                                            <Space>
                                                <CalendarOutlined />
                                                <span>Hạn sử dụng</span>
                                            </Space>
                                        }
                                    >
                                        {data.expiredDate ? (
                                            <Tag color={isExpired(data.expiredDate) ? 'red' : 'green'}>
                                                {formatISODate(data.expiredDate)}
                                            </Tag>
                                        ) : 'Không có thông tin'}
                                    </Descriptions.Item>

                                    <Descriptions.Item
                                        label={
                                            <Space>
                                                <InfoCircleOutlined />
                                                <span>Chứng nhận ATTP</span>
                                            </Space>
                                        }
                                    >
                                        {data.foodSafetyCertification || 'Không có thông tin'}
                                    </Descriptions.Item>

                                    <Descriptions.Item
                                        label={
                                            <Space>
                                                <InfoCircleOutlined />
                                                <span>Mô tả</span>
                                            </Space>
                                        }
                                    >
                                        {data.description || 'Không có mô tả'}
                                    </Descriptions.Item>
                                </Descriptions>
                            </Card>
                        </Col>
                    </Row>
                </Card>
            </Spin>
        </div>
    );
};

export default ProductDetail;