import React, { useCallback, useEffect, useState } from 'react'
import BreadcrumbComponent from '../../components/navigations/BreadcrumbComponent'
import { Button, Card, DatePicker, Dropdown, Form, Input, Modal, Row, Select, Space, Tag, Spin } from 'antd';
import { PlusOutlined, SearchOutlined, FilterOutlined, ReloadOutlined, LoadingOutlined } from '@ant-design/icons';
import { formatISODate, toastConfig } from '../../utils/utils';
import TableGenerComponent from '../../components/tables/TableGenerComponent';
import { Link, useNavigate } from 'react-router-dom';
import { createCategoryService, deleteByIdservice, getByListSerivce } from '../../services/category.service';
import StatusAvitceComponent from '../../components/ui/status/StatusActiveComponent';
import dayjs from "dayjs";
import ButtonActionComponent from '../../components/ui/actions/ButtonActionComponent';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/features/authSlice';
const { Option } = Select;

const ListCategory = () => {
    const currentUser = useSelector(selectUser);
    const navigate = useNavigate()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setisLoading] = useState(false);
    const [formSubmitting, setFormSubmitting] = useState(false);
    const [filterLoading, setFilterLoading] = useState(false);
    const [deletingId, setDeletingId] = useState(null);
    const [form] = Form.useForm();
    const [categories, setCategories] = useState([]);
    const [formData, setFormData] = useState({
        categoryName: '',
        categoryStatus: '',
        categoryType: ''
    })

    const [params, setParams] = useState({
        categoryStatus: null,
        categoryType: null,
        search: null,
        startDate: '',
        endDate: '',
        paging: {
            pageCurrent: 1,
            pageSize: 10,
            total: 0,
        }
    })

    const handleSearchChange = (e) => {
        setParams((prev) => ({
            ...prev,
            search: e.target.value
        }));
    };

    const showModal = () => {
        setIsModalOpen(true);
    }

    const fetchAllCatetegories = async () => {
        try {
            setisLoading(true);
            const param = {
                page: params.paging.pageCurrent,
                pageSize: params.paging.pageSize,
                categoryStatus: params.categoryStatus,
                categoryType: params.categoryType,
                search: params.search,
                startDate: params.startDate,
                endDate: params.endDate
            };
            const res = await getByListSerivce(param);
            if (res?.data) {
                setCategories(res?.data.data);
                setParams((prev) => ({
                    ...prev,
                    paging: {
                        ...prev.paging,
                        total: res.data.total || 100,
                    }
                }));
            }
        } catch (error) {
            console.error("Error: ", error.message);
        } finally {
            setisLoading(false);
            setFilterLoading(false);
        }
    }

    useEffect(() => {
        fetchAllCatetegories(params);
        console.log('params', params)
    }, [JSON.stringify(params)]);

    const onSubmit = async (value) => {
        try {
            setFormSubmitting(true);
            const res = await createCategoryService(value);
            console.log("res", res)
            if (res?.success || res?.data) {
                toastConfig("success", res.message || "Tạo danh mục thành công");
                fetchAllCatetegories();
                clearData();
                setIsModalOpen(false);
            } else {
                toastConfig("error", res);
            }
        } catch (error) {
            console.log("Error: ", error);
            toastConfig("error", error.message || "Đã xảy ra lỗi khi tạo danh mục");
        } finally {
            setFormSubmitting(false);
        }
    }

    const handleChange = (name, value) => {
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    }

    const breadcrumbItems = [
        { title: 'Trang chủ', href: '/admin-page' },
        { title: 'Danh mục sản phẩm' }
    ];

    const stauts = [
        { label: 'Đang hoạt động', value: 'ACTIVE' },
        { label: 'Không hoạt động', value: 'NO_ACTIVE' },
    ];

    const type = [
        { label: 'Nguyên Liệu', value: 'CATEGORY_PRODUCT' },
        { label: 'Công thức', value: 'CATEGORY_RECIPE' },
    ];

    const handleView = (item) => {
        console.log("item", item);
        const id = item.id;
        console.log("id", id);
        if (currentUser.roleName === "ROLE_ADMIN") {
            navigate(`/admin-page/categories/${id}`);
        } else if (currentUser.roleName === "ROLE_STAFF") {
            navigate(`/staff-page/categories/${id}`);
        }
    }

    const handleUpdate = (record) => {
        console.log("Updating:", record);
        const id = record.id;
        navigate(`/staff-page/categories/${id}?edit=true`);
    };

    const handleDelete = async (item) => {
        try {
            setDeletingId(item.id);
            const res = await deleteByIdservice(item.id);
            console.log("res", res);
            if (res?.success) {
                toastConfig("success", "Xóa thành công");
                fetchAllCatetegories();
            } else {
                toastConfig("error", res.message || "Xóa thất bại");
            }
        } catch (error) {
            console.log("Error: ", error.message);
            toastConfig("error", error.message);
        } finally {
            setDeletingId(null);
        }
    };

    const categoryType = (type) => {
        switch (type) {
            case "CATEGORY_PRODUCT":
                return <Tag color="blue">Danh mục nguyên liệu</Tag>;
            case "CATEGORY_RECIPE":
                return <Tag color="green">Danh mục công thức</Tag>;
            default:
                return <Tag color="default">Không xác định</Tag>;
        }
    }

    const columns = [
        {
            key: 'categoryName',
            title: 'Tên Danh mục',
            dataIndex: 'categoryName',
        },
        {
            key: 'createAt',
            title: 'Ngày Tạo',
            dataIndex: 'createAt',
            render: (date) => formatISODate(date),
        },
        {
            title: 'Trạng thái',
            dataIndex: "categoryStatus",
            key: "categoryStatus",
            render: (status) => {
                if (!status) return <Tag color="default">Không xác định</Tag>;

                const color = status === 'ACTIVE' ? 'success' : 'error';
                const text = status === 'ACTIVE' ? 'Đang hoạt động' : 'Không hoạt động';

                return <Tag color={color}>{text}</Tag>;
            },
        },
        {
            key: "categoryType",
            title: 'Loại Danh Mục',
            dataIndex: 'categoryType',
            render: (type) => categoryType(type)
        },
        {
            title: 'Thao tác',
            key: 'operation',
            fixed: 'right',
            width: 150,
            render: (item) => (
                <ButtonActionComponent
                    record={item}
                    onView={handleView}
                    onUpdate={currentUser.roleName !== "ROLE_ADMIN" ? handleUpdate : undefined}
                    onDelete={handleDelete}
                    loading={deletingId === item.id}
                />
            ),
        }
    ]

    const handleTableChange = (pagination) => {
        setParams(prev => ({
            ...prev,
            paging: {
                pageCurrent: pagination.current || 1,
                pageSize: pagination.pageSize || 10,
                total: pagination.total || 0,
            }
        }));
    };

    const handleDateChange = (key, date) => {
        setParams((prev) => ({
            ...prev,
            [key]: date ? dayjs(date).isValid() ? dayjs(date).format("YYYY-MM-DD") : null : null
        }));
    };

    const handleParamsChange = (key, value) => {
        setParams((prev) => ({
            ...prev,
            [key]: value || null,
        }));
    };

    const handleFilterClick = () => {
        setFilterLoading(true);
        fetchAllCatetegories();
    };

    const handleResetFilters = () => {
        setFilterLoading(true);
        setParams({
            categoryStatus: null,
            categoryType: null,
            search: null,
            startDate: '',
            endDate: '',
            paging: {
                pageCurrent: 1,
                pageSize: 10,
                total: 0,
            }
        });
    };

    const clearData = () => {
        form.resetFields();
        setFormData({
            categoryName: '',
            categoryStatus: '',
            categoryType: ''
        })
    }

    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

    return (
        <div className="list-category-container">
            <BreadcrumbComponent items={breadcrumbItems} />

            <Card className="mt-4 shadow-sm">
                <div className="flex flex-wrap justify-between items-center mb-4">
                    <div className="text-xl font-medium">Danh sách danh mục</div>
                    {currentUser.roleName !== "ROLE_ADMIN" && (
                        <Button
                            type="primary"
                            icon={<PlusOutlined />}
                            onClick={showModal}
                            className="bg-[#29aae1]"
                        >
                            Thêm danh mục
                        </Button>
                    )}
                </div>

                <div className="bg-white py-4 px-4 rounded-lg border border-gray-200 mb-4">
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                        <div>
                            <Input
                                placeholder='Tìm kiếm theo tên...'
                                prefix={<SearchOutlined className="text-gray-400" />}
                                allowClear
                                value={params.search}
                                onChange={handleSearchChange}
                                className="w-full"
                                disabled={filterLoading}
                            />
                        </div>
                        <div>
                            <DatePicker
                                placeholder="Ngày bắt đầu"
                                className="w-full"
                                onChange={(date) => handleDateChange("startDate", date)}
                                allowClear
                                format="DD-MM-YYYY"
                                value={params.startDate ? dayjs(params.startDate, "YYYY-MM-DD") : ''}
                                disabled={filterLoading}
                            />
                        </div>
                        <div>
                            <DatePicker
                                placeholder='Ngày kết thúc'
                                className="w-full"
                                onChange={(date) => handleDateChange('endDate', date)}
                                allowClear
                                format="DD-MM-YYYY"
                                value={params.endDate ? dayjs(params.endDate, "YYYY-MM-DD") : null}
                                disabled={filterLoading}
                            />
                        </div>
                        <div>
                            <Select
                                className='w-full'
                                placeholder="Trạng thái"
                                value={params.categoryStatus}
                                options={stauts}
                                allowClear
                                onChange={(value) => handleParamsChange("categoryStatus", value)}
                                disabled={filterLoading}
                            />
                        </div>
                        <div>
                            <Select
                                className='w-full'
                                placeholder="Loại danh mục"
                                value={params.categoryType}
                                options={type}
                                allowClear
                                onChange={(value) => handleParamsChange("categoryType", value)}
                                disabled={filterLoading}
                            />
                        </div>
                    </div>
                    <div className="flex justify-end mt-4 space-x-2">
                        <Button
                            onClick={handleResetFilters}
                            icon={<ReloadOutlined />}
                            loading={filterLoading}
                        >
                            Đặt lại
                        </Button>
                        <Button
                            type="primary"
                            onClick={handleFilterClick}
                            icon={filterLoading ? null : <FilterOutlined />}
                            className="bg-[#29aae1]"
                            loading={filterLoading}
                        >
                            Lọc
                        </Button>
                    </div>
                </div>

                <TableGenerComponent
                    data={categories.map((item) => ({ ...item, key: item.id }))}
                    columns={columns}
                    loading={isLoading}
                    pagination={{
                        current: params.paging.pageCurrent,
                        pageSize: params.paging.pageSize,
                        total: params.paging.total,
                        showSizeChanger: true,
                        showTotal: (total) => `Tổng ${total} danh mục`,
                        pageSizeOptions: ['10', '20', '50'],
                    }}
                    onChange={handleTableChange}
                    className="rounded-lg shadow-sm overflow-hidden"
                    bordered
                    size="middle"
                    scroll={{ x: 'max-content' }}
                    locale={{
                        emptyText: isLoading ? <Spin indicator={antIcon} /> : 'Không có dữ liệu'
                    }}
                />
            </Card>

            <Modal
                title={<div className="text-lg">Thêm danh mục mới</div>}
                open={isModalOpen}
                onOk={() => form.submit()}
                onCancel={handleCancel}
                okText="Lưu"
                cancelText="Hủy"
                okButtonProps={{
                    className: 'bg-[#29aae1]',
                    loading: formSubmitting
                }}
                cancelButtonProps={{
                    disabled: formSubmitting
                }}
                confirmLoading={formSubmitting}
            >
                <Spin spinning={formSubmitting} indicator={antIcon}>
                    <Form form={form} layout='vertical' onFinish={onSubmit}>
                        <Form.Item
                            label="Tên danh mục"
                            name="categoryName"
                            rules={[{ required: true, message: "Vui lòng nhập tên danh mục" }]}
                        >
                            <Input
                                placeholder='Nhập tên danh mục sản phẩm'
                                value={formData.categoryName}
                                onChange={(e) => handleChange("categoryName", e.target.value)}
                                disabled={formSubmitting}
                            />
                        </Form.Item>
                        <Form.Item
                            label="Trạng thái"
                            name="categoryStatus"
                            rules={[{ required: true, message: "Vui lòng chọn trạng thái" }]}
                        >
                            <Select
                                placeholder="Chọn trạng thái"
                                value={formData.categoryStatus || undefined}
                                onChange={(value) => handleChange("categoryStatus", value)}
                                disabled={formSubmitting}
                            >
                                <Option value="ACTIVE">Hoạt động</Option>
                                <Option value="NO_ACTIVE">Không hoạt động</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item
                            label="Loại danh mục"
                            name="categoryType"
                            rules={[{ required: true, message: "Vui lòng chọn loại danh mục" }]}
                        >
                            <Select
                                placeholder="Chọn loại danh mục"
                                value={formData.categoryType || undefined}
                                onChange={(value) => handleChange("categoryType", value)}
                                disabled={formSubmitting}
                            >
                                <Option value={"CATEGORY_PRODUCT"}>Danh mục nguyên liệu</Option>
                                <Option value={"CATEGORY_RECIPE"}>Danh mục công thức</Option>
                            </Select>
                        </Form.Item>
                    </Form>
                </Spin>
            </Modal>
        </div>
    )
}

export default ListCategory