import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams, useLocation } from 'react-router-dom'
import BreadcrumbComponent from '../../components/navigations/BreadcrumbComponent'
import { Button, Card, Col, Descriptions, Divider, Form, Input, Row, Select, Skeleton, Spin, Tag, Tabs, Typography, Space, Statistic, Avatar, notification } from 'antd'
import { getByIdService, updateByIdService } from '../../services/category.service'
import {
    ArrowLeftOutlined,
    EditOutlined,
    SaveOutlined,
    LoadingOutlined,
    CheckCircleOutlined,
    ClockCircleOutlined,
    TagsOutlined,
    CheckOutlined,
    CloseOutlined
} from '@ant-design/icons';
import { formatISODate, toastConfig } from '../../utils/utils';
import dayjs from 'dayjs';
import { useSelector } from 'react-redux'
import { selectUser } from '../../redux/features/authSlice'

const { Option } = Select;
const { Title, Text } = Typography;
const { TabPane } = Tabs;

const DetailCategory = () => {
    const currentUser = useSelector(selectUser);
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const [form] = Form.useForm();
    const [category, setCategory] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isEditMode, setIsEditMode] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [activeTab, setActiveTab] = useState('1');

    const breadcrumbItems = [
        { title: 'Trang chủ', href: '/admin-page' },
        { title: 'Danh mục sản phẩm', href: '/admin-page/categories' },
        { title: 'Chi tiết danh mục' }
    ];

    const fetchCategoryDetail = async (id) => {
        try {
            setIsLoading(true);
            const res = await getByIdService(id);
            if (res?.success || res?.data) {
                setCategory(res.data);
                form.setFieldsValue(res.data);
            } else {
                toastConfig('error', 'Không thể tải thông tin danh mục');
            }
        } catch (error) {
            console.log("error:", error);
            toastConfig('error', error.message || 'Đã xảy ra lỗi khi tải thông tin danh mục');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (id) {
            fetchCategoryDetail(id);
        }
    }, [id]);

    // Check if edit=true is present in the URL
    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const shouldEdit = searchParams.get('edit') === 'true';
        if (shouldEdit && !isEditMode && !isLoading && category) {
            setIsEditMode(true);
            setActiveTab('2');
        }
    }, [location.search, isLoading, category]);

    const handleSave = async (values) => {
        try {
            setSubmitting(true);

            // Get only the changed fields by comparing with original category data
            const changedValues = {};
            const originalValues = category || {};

            Object.keys(values).forEach(key => {
                if (values[key] !== originalValues[key]) {
                    changedValues[key] = values[key];
                }
            });

            // Only proceed if there are changes
            if (Object.keys(changedValues).length === 0) {
                notification.info({
                    message: 'Thông báo',
                    description: 'Không có thay đổi nào để lưu',
                });
                setSubmitting(false);
                setIsEditMode(false);
                setActiveTab('1');
                return;
            }

            // Add id to the request
            const updateData = {
                ...changedValues,
                id: category.id
            };

            console.log("Saving changed fields only:", updateData);
            const res = await updateByIdService(category.id, updateData);

            if (res?.success) {
                notification.success({
                    message: 'Thành công',
                    description: 'Cập nhật danh mục thành công!',
                    icon: <CheckCircleOutlined style={{ color: '#52c41a' }} />
                });

                // Refresh data to show the updated info
                fetchCategoryDetail(id);
                setIsEditMode(false);
                setActiveTab('1');
            } else {
                throw new Error(res?.message || 'Cập nhật danh mục thất bại');
            }
        } catch (error) {
            console.error('Update failed:', error);
            notification.error({
                message: 'Lỗi',
                description: error.message || 'Đã xảy ra lỗi khi cập nhật danh mục',
            });
        } finally {
            setSubmitting(false);
        }
    };

    const handleCancel = () => {
        form.setFieldsValue(category);
        setIsEditMode(false);
        setActiveTab('1');
    };

    const switchToEditMode = () => {
        setIsEditMode(true);
        setActiveTab('2');
    };

    const getCategoryTypeIcon = (type) => {
        switch (type) {
            case "CATEGORY_PRODUCT":
                return {
                    icon: <TagsOutlined style={{ color: '#1890ff' }} />,
                    color: 'blue',
                    text: 'Danh mục nguyên liệu'
                };
            case "CATEGORY_RECIPE":
                return {
                    icon: <TagsOutlined style={{ color: '#52c41a' }} />,
                    color: 'green',
                    text: 'Danh mục công thức'
                };
            default:
                return {
                    icon: <TagsOutlined style={{ color: '#d9d9d9' }} />,
                    color: 'default',
                    text: 'Không xác định'
                };
        }
    };

    const getCategoryStatusIcon = (status) => {
        if (!status) return {
            icon: <CloseOutlined style={{ color: '#d9d9d9' }} />,
            color: 'default',
            text: 'Không xác định'
        };

        const isActive = status === 'ACTIVE';
        return {
            icon: isActive ? <CheckOutlined style={{ color: '#52c41a' }} /> : <CloseOutlined style={{ color: '#f5222d' }} />,
            color: isActive ? 'success' : 'error',
            text: isActive ? 'Đang hoạt động' : 'Không hoạt động'
        };
    };

    const getInitialLetter = (name) => {
        return name ? name.charAt(0).toUpperCase() : '?';
    };

    const getCategoryAvatar = (type) => {
        const colors = {
            "CATEGORY_PRODUCT": "#1890ff",
            "CATEGORY_RECIPE": "#52c41a",
            "default": "#d9d9d9"
        };

        return (
            <Avatar
                size={64}
                style={{
                    backgroundColor: colors[type] || colors.default,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    fontSize: '28px'
                }}
            >
                {getInitialLetter(category?.categoryName)}
            </Avatar>
        );
    };

    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

    const handleTabChange = (key) => {
        setActiveTab(key);
        if (key === '2' && !isEditMode) {
            setIsEditMode(true);
        } else if (key === '1' && isEditMode) {
            form.setFieldsValue(category);
            setIsEditMode(false);
        }
    };

    const goBack = () => {
        if (currentUser.roleName === "ROLE_ADMIN") {
            navigate('/admin-page/categories')
        } else if (currentUser.roleName === "ROLE_STAFF") {
            navigate('/staff-page/categories')
        }
    }

    return (
        <div className="detail-category-container">
            <BreadcrumbComponent items={breadcrumbItems} />

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
                        <div className="text-xl font-medium">
                            {isLoading ? 'Đang tải...' : `Chi tiết danh mục: ${category?.categoryName}`}
                        </div>
                    </div>
                    {!isLoading && !isEditMode && currentUser.roleName !== "ROLE_ADMIN" && (
                        <Button
                            type="primary"
                            icon={<EditOutlined />}
                            onClick={switchToEditMode}
                            className="bg-[#29aae1]"
                        >
                            Chỉnh sửa
                        </Button>
                    )}
                </div>

                {isLoading ? (
                    <Skeleton active paragraph={{ rows: 6 }} />
                ) : (
                    <Tabs activeKey={activeTab} onChange={handleTabChange} className="category-detail-tabs">
                        <TabPane tab="Thông tin chi tiết" key="1">
                            <div className="p-4">
                                <Row gutter={[24, 24]} className="mb-6">
                                    <Col xs={24} md={8} className="text-center">
                                        <div className="flex flex-col items-center justify-center">
                                            {getCategoryAvatar(category?.categoryType)}
                                            <Title level={4} className="mt-2 mb-0">{category?.categoryName}</Title>
                                            <div className="mt-2">
                                                <Tag color={getCategoryStatusIcon(category?.categoryStatus).color}>
                                                    {getCategoryStatusIcon(category?.categoryStatus).icon}{' '}
                                                    {getCategoryStatusIcon(category?.categoryStatus).text}
                                                </Tag>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col xs={24} md={16}>
                                        <Card bordered={false} className="h-full shadow-sm">
                                            <Row gutter={[16, 16]}>
                                                <Col xs={24} sm={12}>
                                                    <Statistic
                                                        title="Loại danh mục"
                                                        value={getCategoryTypeIcon(category?.categoryType).text}
                                                        prefix={getCategoryTypeIcon(category?.categoryType).icon}
                                                    />
                                                </Col>
                                                <Col xs={24} sm={12}>
                                                    <Statistic
                                                        title="Ngày tạo"
                                                        value={formatISODate(category?.createAt) || 'Không có dữ liệu'}
                                                        prefix={<ClockCircleOutlined />}
                                                    />
                                                </Col>
                                                <Col xs={24} sm={12}>
                                                    <Statistic
                                                        title="Cập nhật lần cuối"
                                                        value={formatISODate(category?.updateAt) || 'Chưa được cập nhật'}
                                                        prefix={<ClockCircleOutlined />}
                                                    />
                                                </Col>
                                                <Col xs={24} sm={12}>
                                                    <Statistic
                                                        title="Trạng thái"
                                                        value={getCategoryStatusIcon(category?.categoryStatus).text}
                                                        prefix={getCategoryStatusIcon(category?.categoryStatus).icon}
                                                        valueStyle={{ color: category?.categoryStatus === 'ACTIVE' ? '#52c41a' : '#f5222d' }}
                                                    />
                                                </Col>
                                            </Row>
                                        </Card>
                                    </Col>
                                </Row>

                                <Divider orientation="left">Thông tin chi tiết</Divider>

                                <Descriptions
                                    bordered
                                    column={{ xs: 1, sm: 2, md: 2 }}
                                    className="bg-white rounded-lg shadow-sm"
                                    labelStyle={{ fontWeight: 'bold' }}
                                    contentStyle={{ padding: '16px' }}
                                    size="middle"
                                >
                                    <Descriptions.Item
                                        label={<span className="text-gray-700">Mã danh mục</span>}
                                        labelStyle={{ width: '180px' }}
                                    >
                                        <Text copyable>{category?.id || 'Không có dữ liệu'}</Text>
                                    </Descriptions.Item>
                                    <Descriptions.Item
                                        label={<span className="text-gray-700">Tên danh mục</span>}
                                        labelStyle={{ width: '180px' }}
                                    >
                                        <Text strong>{category?.categoryName || 'Không có dữ liệu'}</Text>
                                    </Descriptions.Item>
                                    <Descriptions.Item
                                        label={<span className="text-gray-700">Trạng thái</span>}
                                        labelStyle={{ width: '180px' }}
                                    >
                                        <Tag
                                            color={getCategoryStatusIcon(category?.categoryStatus).color}
                                            style={{ padding: '4px 8px', fontSize: '14px' }}
                                        >
                                            {getCategoryStatusIcon(category?.categoryStatus).icon}{' '}
                                            {getCategoryStatusIcon(category?.categoryStatus).text}
                                        </Tag>
                                    </Descriptions.Item>
                                    <Descriptions.Item
                                        label={<span className="text-gray-700">Loại danh mục</span>}
                                        labelStyle={{ width: '180px' }}
                                    >
                                        <Tag
                                            color={getCategoryTypeIcon(category?.categoryType).color}
                                            style={{ padding: '4px 8px', fontSize: '14px' }}
                                        >
                                            {getCategoryTypeIcon(category?.categoryType).icon}{' '}
                                            {getCategoryTypeIcon(category?.categoryType).text}
                                        </Tag>
                                    </Descriptions.Item>
                                    <Descriptions.Item
                                        label={<span className="text-gray-700">Ngày tạo</span>}
                                        labelStyle={{ width: '180px' }}
                                    >
                                        <Space>
                                            <ClockCircleOutlined />
                                            {formatISODate(category?.createAt) || 'Không có dữ liệu'}
                                        </Space>
                                    </Descriptions.Item>
                                    <Descriptions.Item
                                        label={<span className="text-gray-700">Cập nhật lần cuối</span>}
                                        labelStyle={{ width: '180px' }}
                                    >
                                        <Space>
                                            <ClockCircleOutlined />
                                            {formatISODate(category?.updateAt) || 'Chưa được cập nhật'}
                                        </Space>
                                    </Descriptions.Item>
                                </Descriptions>
                            </div>
                        </TabPane>
                        {currentUser.roleName !== "ROLE_ADMIN" && (
                            <TabPane tab="Chỉnh sửa" key="2">
                                <div className="p-4">
                                    <Spin spinning={submitting} indicator={antIcon}>
                                        <Form
                                            form={form}
                                            layout="vertical"
                                            onFinish={handleSave}
                                            initialValues={category}
                                            className="bg-white p-6 rounded-lg shadow-sm"
                                        >
                                            <Row gutter={24}>
                                                <Col xs={24} md={12}>
                                                    <Form.Item
                                                        label="Tên danh mục"
                                                        name="categoryName"
                                                        rules={[{ required: true, message: "Vui lòng nhập tên danh mục" }]}
                                                    >
                                                        <Input placeholder="Nhập tên danh mục" className="rounded-md" size="large" />
                                                    </Form.Item>
                                                </Col>
                                                <Col xs={24} md={12}>
                                                    <Form.Item
                                                        label="Trạng thái"
                                                        name="categoryStatus"
                                                        rules={[{ required: true, message: "Vui lòng chọn trạng thái" }]}
                                                    >
                                                        <Select placeholder="Chọn trạng thái" className="rounded-md" size="large">
                                                            <Option value="ACTIVE">
                                                                <Space>
                                                                    <CheckOutlined style={{ color: '#52c41a' }} />
                                                                    Hoạt động
                                                                </Space>
                                                            </Option>
                                                            <Option value="NO_ACTIVE">
                                                                <Space>
                                                                    <CloseOutlined style={{ color: '#f5222d' }} />
                                                                    Không hoạt động
                                                                </Space>
                                                            </Option>
                                                        </Select>
                                                    </Form.Item>
                                                </Col>
                                                <Col xs={24} md={12}>
                                                    <Form.Item
                                                        label="Loại danh mục"
                                                        name="categoryType"
                                                        rules={[{ required: true, message: "Vui lòng chọn loại danh mục" }]}
                                                    >
                                                        <Select placeholder="Chọn loại danh mục" className="rounded-md" size="large">
                                                            <Option value="CATEGORY_PRODUCT">
                                                                <Space>
                                                                    <TagsOutlined style={{ color: '#1890ff' }} />
                                                                    Danh mục nguyên liệu
                                                                </Space>
                                                            </Option>
                                                            <Option value="CATEGORY_RECIPE">
                                                                <Space>
                                                                    <TagsOutlined style={{ color: '#52c41a' }} />
                                                                    Danh mục công thức
                                                                </Space>
                                                            </Option>
                                                        </Select>
                                                    </Form.Item>
                                                </Col>
                                            </Row>

                                            <Divider />

                                            <div className="flex justify-end mt-4 space-x-2">
                                                <Button onClick={handleCancel} disabled={submitting} size="large">
                                                    Hủy
                                                </Button>
                                                <Button
                                                    type="primary"
                                                    htmlType="submit"
                                                    icon={<SaveOutlined />}
                                                    loading={submitting}
                                                    className="bg-[#29aae1]"
                                                    size="large"
                                                >
                                                    Lưu thay đổi
                                                </Button>
                                            </div>
                                        </Form>
                                    </Spin>
                                </div>
                            </TabPane>
                        )}
                    </Tabs>
                )}
            </Card>
        </div>
    );
};

export default DetailCategory;