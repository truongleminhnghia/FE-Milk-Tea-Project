import React, { useCallback, useEffect, useState } from 'react'
import BreadcrumbComponent from '../../components/navigations/BreadcrumbComponent'
import { Button, DatePicker, Dropdown, Form, Input, Modal, Row, Select } from 'antd';
import { Icon } from '@iconify/react';
import { formatISODate, toastConfig } from '../../utils/utils';
import TableGenerComponent from '../../components/tables/TableGenerComponent';
import { Link } from 'react-router-dom';
import { createCategoryService, deleteByIdservice, getByListSerivce } from '../../services/category.service';
import StatusAvitceComponent from '../../components/ui/status/StatusActiveComponent';
import dayjs from "dayjs";
import ButtonActionComponent from '../../components/ui/actions/ButtonActionComponent';

const ListCategory = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setisLoading] = useState(false);
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
        startDate: null,
        endDate: null,
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
            setisLoading(true);  // Bắt đầu tải dữ liệu
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
            setisLoading(false); // dừng loading sau khi tải xog haowjc gặp lỗi
        }
    }

    useEffect(() => {
        fetchAllCatetegories(params);
    }, [JSON.stringify(params)]);

    const onSubmit = async (value) => {
        try {
            const res = await createCategoryService(value);
            console.log("res", res)
            if (res?.success || res?.data) {
                toastConfig("success", res.message)
            } else {
                toastConfig("error", res);
            }
            fetchAllCatetegories();
            clearData();
            setIsModalOpen(false);
        } catch (error) {
            console.log("Error: ", error);
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

    const handleView = (record) => {
        console.log("Viewing:", record);
    };

    const handleUpdate = (record) => {
        console.log("Updating:", record);
    };

    const handleDelete = async (item) => {
        try {
            const res = await deleteByIdservice(item.id);
            console.log("res", res);
            if (res.success) {
                toastConfig("success", "Xóa thành công");
            } else {
                toastConfig("error", res.message || "Xóa thất bại");
            }
        } catch (error) {
            console.log("Error: ", error.message);
            toastConfig("error", error.message);
        }
    };

    const columns = [
        {
            key: 'categoryName',
            title: 'Tên Danh mục',
            dataIndex: 'categoryName',
        },
        {
            title: 'Action',
            key: 'operation',
            fixed: 'right',
            width: 150,
            render: (item) => (
                <ButtonActionComponent
                    record={item}
                    onView={handleView}
                    onUpdate={handleUpdate}
                    onDelete={handleDelete}
                />
            ),
        },
        {
            key: 'createAt',
            title: 'Ngày Tạo',
            dataIndex: 'createAt',
            render: (date) => formatISODate(date),
        },
        {
            title: 'Status',
            dataIndex: "categoryStatus",
            key: "categoryStatus",
            render: (status) => <StatusAvitceComponent status={status} />,
        },
        {
            key: "categoryType",
            title: 'Loại Danh Mục',
            dataIndex: 'categoryType',
            render: (type) => categoryType(type)
        }
    ]

    const categoryType = (type) => {
        switch (type) {
            case "CATEGORY_PRODUCT":
                return "Danh mục nguyên liệu";
            case "CATEGORY_RECIPE":
                return "Danh mục công thức";
        }
    }

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

    // useEffect(() => {

    // })
    const handleParamsChange = (key, value) => {
        setParams((prev) => ({
            ...prev,
            [key]: value || null,
        }));
    };

    const clearData = () => {
        form.resetFields();
        setFormData({
            categoryName: '',
            categoryStatus: '',
            categoryType: ''
        })
    }


    return (
        <div>
            <BreadcrumbComponent items={breadcrumbItems} />
            <Button
                onClick={showModal}
                className='bg-[#00CC33] text-white px-4 py-4 flex items-center text-lg font-medium '
                icon={
                    <Icon icon="mynaui:plus-solid" />
                }>
                <span>Tạo mới</span>
            </Button>

            <Row className='bg-white py-3 px-3 rounded-xl border-[1px] border-[#ccc] mt-2'>
                <div className='flex items-center h-[40px] w-full'>
                    <Input
                        className='h-full max-w-[200px] py-2 px-3 mr-3 inline-flex text-[14px]'
                        prefix={<Icon
                            className='text-lg text-[#3C2F2F]'
                            icon="iconamoon:search" />}
                        placeholder='Tìm kiếm'
                        allowClear
                        value={params.search}
                        onChange={handleSearchChange}
                    />
                    <DatePicker
                        placeholder="Ngày bắt đầu"
                        className="flex !w-[200px] h-full items-center text-[#3C2F2F] py-2 px-3 mr-3"
                        onChange={(date) => handleDateChange("startDate", date)}
                        allowClear
                        format="DD-MM-YYYY"
                        // Convert string back to dayjs for DatePicker
                        value={params.startDate ? dayjs(params.startDate, "YYYY-MM-DD") : null}
                    />
                    <DatePicker
                        placeholder='Ngày kết thúc'
                        className='flex w-[200px] h-full items-center text-[#3C2F2F] py-2 px-3 mr-3'
                        onChange={(date) => handleDateChange('endDate', date)}
                        allowClear
                        format="DD-MM-YYYY"
                        value={params.endDate ? dayjs(params.endDate, "YYYY-MM-DD") : null}
                    />
                    <Select
                        className='h-full !w-[200px] mr-3'
                        placeholder="Trạng thái"
                        value={params.categoryStatus}
                        options={stauts}
                        allowClear
                        format="DD-MM-YYYY"
                        onChange={(value) => {
                            setParams((prev) => ({
                                ...prev,
                                categoryStatus: value || null // Nếu xóa chọn, đặt thành null
                            }));
                        }}
                    />
                    <Select
                        className='h-full !w-[200px]'
                        placeholder="Loại"
                        value={params.categoryType}
                        options={type}
                        allowClear
                        onChange={(value) => handleParamsChange("categoryType", value)}
                    />
                    {/* <DropdownComponent /> */}
                    <Button
                        className='h-full p-3 flex items-center ml-auto'
                        type='primary'
                        icon={
                            <Icon
                                className='!text-[#fff] text-[18px]'
                                icon="mdi:filter" />}>
                        <span className='!text-[#fff] text-[18px] !font-medium'>Lọc</span>
                    </Button>
                </div>
            </Row>

            <div className='rounded-lg mt-3'>
                <TableGenerComponent
                    data={categories.map((item) => ({ ...item, key: item.id }))}
                    columns={columns}
                    loading={isLoading}
                    pagination={{ current: params.paging.pageCurrent, pageSize: params.paging.pageSize, total: params.paging.total }}
                    onChange={handleTableChange}
                />
            </div>

            <Modal title={"Tạo mới"} open={isModalOpen} onOk={() => form.submit()} onCancel={handleCancel}>
                <Form form={form} layout='vertical' onFinish={onSubmit}>
                    <Form.Item
                        label="Tên danh mục"
                        name="categoryName"
                        colon={false}
                        rules={
                            [
                                {
                                    required: true, message: "Vui lòng nhập tên danh mục"
                                }
                            ]
                        }
                    >
                        <Input
                            placeholder='Nhập tên danh mục sản phẩm'
                            value={formData.categoryName}
                            onChange={(e) => handleChange("categoryName", e.target.value)}
                        />
                    </Form.Item>
                    <Form.Item
                        label="Trạng thái"
                        name="categoryStatus"
                        colon={false}
                        rules={
                            [
                                {
                                    required: true, message: "Vui lòng nhập trạng thái"
                                }
                            ]
                        }
                    >
                        <Select
                            placeholder="Chọn trạng thái"
                            value={formData.categoryStatus || undefined}
                            onChange={(value) => handleChange("categoryStatus", value)}
                        >
                            <Option value="ACTIVE">Hoạt động</Option>
                            <Option value="NO_ACTIVE">Không hoạt động</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="Loại danh mục"
                        name="categoryType"
                        colon={false}
                        rules={
                            [
                                {
                                    required: true, message: "Vui lòng chọn loại danh mục"
                                }
                            ]
                        }
                    >
                        <Select
                            placeholder="Loại danh mục"
                            value={formData.categoryType || undefined}
                            onChange={(value) => handleChange("categoryType", value)}
                        >
                            <Option value={"CATEGORY_PRODUCT"}>Danh mục nguyên liệu</Option>
                            <Option value={"CATEGORY_RECIPE"}>Danh mục công thức</Option>
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </div >
    )
}

export default ListCategory