import React, { useEffect, useState } from 'react'
import BreadcrumbComponent from '../../../components/navigations/BreadcrumbComponent'
import { Button, Card, DatePicker, Input, Row, Select, Space, Table, Tag } from 'antd'
import { Icon } from '@iconify/react/dist/iconify.js'
import { Link, useNavigate } from 'react-router-dom'
import StatusAvitceComponent from '../../../components/ui/status/StatusActiveComponent'
import { formatISODate } from '../../../utils/utils'
import { SearchOutlined, PlusOutlined, FilterOutlined, ReloadOutlined } from '@ant-design/icons';
import ButtonActionComponent from '../../../components/ui/actions/ButtonActionComponent'
import { getByListSerivce } from '../../../services/user.service'

const ListAccount = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [products, setProducts] = useState([])
    const breadcrumbItems = [
        { title: 'Trang chủ', href: '/admin-page' },
        { title: 'Danh sách tài khoản' }
    ];
    const [params, setParams] = useState({
        accountStatus: null,
        roleName: null,
        isDescending: false,
        search: null,
        paging: {
            pageCurrent: 1,
            pageSize: 12,
            total: 0,
        }
    })

    const handleTableChange = (pagination) => {
        setParams(prev => ({
            ...prev,
            paging: {
                pageCurrent: pagination.current || 1,
                pageSize: pagination.pageSize || 12,
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

    const handleParamsChange = (key, value) => {
        setParams((prev) => ({
            ...prev,
            [key]: value
        }));
    };

    const handleFilterClick = () => {
        fetchAllAccounts(params);
    };

    const handleResetFilters = () => {
        setParams({
            accountStatus: null,
            roleName: null,
            isDescending: false,
            search: null,
            paging: {
                pageCurrent: 1,
                pageSize: 12,
                total: 0,
            }
        });
    };

    const fetchAllAccounts = async (params) => {
        try {
            setIsLoading(true);  // Bắt đầu tải dữ liệu
            const param = {
                page: params.paging.pageCurrent,
                pageSize: params.paging.pageSize,
                search: params.search,
                accountStatus: params.accountStatus,
                roleName: params.roleName,
                isDescending: params.isDescending
            };
            const res = await getByListSerivce(param);
            if (res?.data) {
                console.log("res", res.data)
                setProducts(res?.data?.data);
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
            setIsLoading(false); // dừng loading sau khi tải xong hoặc gặp lỗi
        }
    }

    useEffect(() => {
        fetchAllAccounts(params);
    }, [JSON.stringify(params)]);

    const statusOptions = [
        { label: 'Đang hoạt động', value: 'ACTIVE' },
        { label: 'Không hoạt động', value: 'NO_ACTIVE' },
    ];

    const roleOptions = [
        { label: 'Khách hàng', value: 'ROLE_CUSTOMER' },
        { label: 'Nhân viên', value: 'ROLE_STAFF' },
        { label: 'Quản trị viên', value: 'ROLE_ADMIN' },
        { label: 'Quản lý', value: 'ROLE_MANAGER' },
    ];

    const handleView = (item) => {
        console.log("item", item);
        const id = item.id;
        console.log("id", id);
        navigate(`/admin-page/accounts/${id}`);
    }

    const handleDelete = (item) => {
        const id = item.id;
        console.log("id", id);
    }

    const columns = [
        {
            key: 'fullName',
            title: 'Họ và Tên',
            dataIndex: 'firstName',
            render: (_, record) => (
                <span>{record.lastName} {record.firstName}</span>
            )
        },
        {
            key: 'action',
            title: 'Actions',
            width: 100,
            render: (item) => (
                <ButtonActionComponent
                    record={item}
                    onView={handleView}
                    onDelete={handleDelete}
                />
            ),
        },
        {
            key: 'createAt',
            title: 'Ngày Tạo',
            dataIndex: 'createAt',
            render: (date) => formatISODate(date),
            sorter: (a, b) => new Date(a.createAt) - new Date(b.createAt),
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
            render: (status) => {
                if (!status) return <Tag color="default">Không xác định</Tag>;

                const color = status === 'ACTIVE' ? 'success' : 'error';
                const text = status === 'ACTIVE' ? 'Đang hoạt động' : 'Không hoạt động';

                return <Tag color={color}>{text}</Tag>;
            },
            filters: [
                { text: 'Đang hoạt động', value: 'ACTIVE' },
                { text: 'Không hoạt động', value: 'NO_ACTIVE' },
            ],
            onFilter: (value, record) => record.accountStatus === value,
        },
        {
            key: "roleName",
            title: 'Vai trò',
            dataIndex: "roleName",
            render: (roleName) => {
                if (!roleName) return <Tag color="default">Không xác định</Tag>;

                let color, text;
                switch (roleName) {
                    case 'ROLE_ADMIN':
                        color = 'purple';
                        text = 'Quản trị viên';
                        break;
                    case 'ROLE_STAFF':
                        color = 'blue';
                        text = 'Nhân viên';
                        break;
                    case 'ROLE_CUSTOMER':
                        color = 'green';
                        text = 'Khách hàng';
                        break;
                    case 'ROLE_MANAGER':
                        color = 'red';
                        text = 'Quản lý';
                        break;
                    default:
                        color = 'default';
                        text = roleName;
                }

                return <Tag color={color}>{text}</Tag>;
            },
            filters: [
                { text: 'Quản trị viên', value: 'ROLE_ADMIN' },
                { text: 'Nhân viên', value: 'ROLE_STAFF' },
                { text: 'Quản lý', value: 'ROLE_MANAGER' },
                { text: 'Khách hàng', value: 'ROLE_CUSTOMER' },
            ],
            onFilter: (value, record) => record.roleName === value,
        },

    ];

    return (
        <div className="list-account-container">
            <BreadcrumbComponent items={breadcrumbItems} />

            <Card className="mt-4 shadow-sm">
                <div className="flex flex-wrap justify-between items-center mb-4">
                    <div className="text-xl font-medium">Danh sách tài khoản</div>
                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={() => navigate('/admin-page/create-account')}
                        className="bg-[#29aae1]"
                    >
                        Thêm tài khoản
                    </Button>
                </div>

                <div className="bg-white py-4 px-4 rounded-lg border border-gray-200 mb-4 flex items-center justify-between">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <Input
                                placeholder='Tìm kiếm tên, email, số điện thoại...'
                                prefix={<SearchOutlined className="text-gray-400" />}
                                allowClear
                                value={params.search}
                                onChange={handleSearchChange}
                                className="w-full"
                            />
                        </div>
                        <div>
                            <Select
                                className='w-full'
                                placeholder="Trạng thái"
                                value={params.accountStatus}
                                options={statusOptions}
                                allowClear
                                onChange={(value) => handleParamsChange("accountStatus", value)}
                            />
                        </div>
                        <div>
                            <Select
                                className='w-full'
                                placeholder="Vai trò"
                                value={params.roleName}
                                options={roleOptions}
                                allowClear
                                onChange={(value) => handleParamsChange("roleName", value)}
                            />
                        </div>
                    </div>
                    <div className="flex justify-end space-x-2">
                        <Button
                            onClick={handleResetFilters}
                            icon={<ReloadOutlined />}
                        >
                            Đặt lại
                        </Button>
                        <Button
                            type="primary"
                            onClick={handleFilterClick}
                            icon={<FilterOutlined />}
                            className="bg-[#29aae1]"
                        >
                            Lọc
                        </Button>
                    </div>
                </div>

                <Table
                    dataSource={products?.map((item) => ({ ...item, key: item.id }))}
                    columns={columns}
                    loading={isLoading}
                    pagination={{
                        current: params.paging.pageCurrent,
                        pageSize: params.paging.pageSize,
                        total: params.paging.total,
                        showSizeChanger: true,
                        showTotal: (total) => `Tổng ${total} tài khoản`,
                        pageSizeOptions: ['10', '20', '50'],
                    }}
                    onChange={handleTableChange}
                    size="middle"
                    bordered
                    className="rounded-lg shadow-sm overflow-hidden"
                    scroll={{ x: 'max-content' }}
                />
            </Card>
        </div>
    )
}

export default ListAccount