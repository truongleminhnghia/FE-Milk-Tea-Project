import React, { useEffect, useState } from 'react'
import BreadcrumbComponent from '../../../components/navigations/BreadcrumbComponent'
import { Button, DatePicker, Input, Row, Select } from 'antd'
import TableGenerComponent from '../../../components/tables/TableGenerComponent'
import { Icon } from '@iconify/react/dist/iconify.js'
import { getByListSerivce } from '../../../services/user.service'
import { Link, useNavigate } from 'react-router-dom'
import StatusAvitceComponent from '../../../components/ui/status/StatusActiveComponent'
import { formatISODate } from '../../../utils/utils'

const ListAccount = () => {
    const navigate = useNavigate();
    const [isLoading, setisLoading] = useState(false);
    const [products, setProducts] = useState([])
    const breadcrumbItems = [
        { title: 'Trang chủ', href: '/admin-page' },
        { title: 'Tất cả công thức' }
    ];
    const [params, setParams] = useState({
        status: null,
        minPrice: null,
        maxPrice: null,
        isSale: null,
        isDescending: null,
        categoryId: null,
        search: null,
        startDate: null,
        endDate: null,
        paging: {
            pageCurrent: 1,
            pageSize: 10,
            total: 0,
        }
    })

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

    const handleSearchChange = (e) => {
        setParams((prev) => ({
            ...prev,
            search: e.target.value
        }));
    };

    const fetchAllAccounts = async (params) => {
        try {
            setisLoading(true);  // Bắt đầu tải dữ liệu
            const param = {
                pageCurrent: params.paging.pageCurrent,
                pageSize: params.paging.pageSize,
                status: params.status,
                categoryId: params.categoryId,
                search: params.search,
                startDate: params.startDate,
                endDate: params.endDate,
                minPrice: params.minPrice,
                maxPrice: params.maxPrice,
                isSale: params.isSale
            };
            const res = await getByListSerivce(param);
            if (res?.data) {
                console.log("res", res.data)
                setProducts(res?.data);
                setParams((prev) => ({
                    ...prev,
                    paging: {
                        ...prev.paging,
                        total: res.data.total || 100,
                    }
                }));
                console.log("produt:", products)
            }
        } catch (error) {
            console.error("Error: ", error.message);
        } finally {
            setisLoading(false); // dừng loading sau khi tải xog haowjc gặp lỗi
        }
    }

    useEffect(() => {
        fetchAllAccounts(params);
        }, [JSON.stringify(params)]);
    const stauts = [
        { label: 'Đang hoạt động', value: 'ACTIVE' },
        { label: 'Không hoạt động', value: 'NO_ACTIVE' },
    ];
    const type = [
        { label: 'ID', value: 'CATEGORY_PRODUCT' },
        { label: 'ROLE', value: 'CATEGORY_' },
    ];
    const columns = [

        {
            key: 'FullName',
            title: 'Họ và Tên',
            dataIndex: 'firstName',
            render: (_, record) => (
                <Link className='text-[#2289ff]'>
                    {record.firstName} {record.lastName}
                </Link>
            )
        },

        {
            key: 'createAt',
            title: 'Ngày Tạo',
            dataIndex: 'createAt',
            render: (date) => formatISODate(date),
        },
        {
            key: 'email',
            title: 'Email',
            dataIndex: 'email',
        },
        {
            key: 'phone',
            title: 'Số điện thoại',
            dataIndex: 'phone',
        },
        {
            title: 'Trạng thái',
            dataIndex: "accountStatus",
            key: "accountStatus",
            render: (status) => <StatusAvitceComponent status={status} />,
        },
        {
            key: "imgUrl",
            title: 'ảnh',
            dataIndex: 'imgUrl',
        },
        {
            key: "roleName",
            title: 'Role',
            dataIndex: "roleName",
        },
        {
            key: 'role',
            title: 'Vai trò',
            render: (_, record) => {
                if (record.customer) return 'Khách hàng';
                if (record.employee) return 'Nhân viên';
                return 'Không xác định';
            }
        },
        

    ]
    return (
        <div>
            <BreadcrumbComponent items={breadcrumbItems} />

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
                    <Select
                        className='h-full !w-[200px] mr-3'
                        placeholder="Trạng thái"
                        value={params.status}
                        options={stauts}
                        allowClear
                        onChange={(value) => handleParamsChange("status", value)}
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
                    data={products?.map((item) => ({ ...item, key: item.id }))}
                    columns={columns}
                    loading={isLoading}
                    pagination={{ current: params.paging.pageCurrent, pageSize: params.paging.pageSize, total: params.paging.total }}
                    onChange={handleTableChange}
                />
            </div>
        </div>
    )
}

export default ListAccount