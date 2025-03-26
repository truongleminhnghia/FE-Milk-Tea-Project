import React, { useEffect, useState } from 'react'
import BreadcrumbComponent from '../../../components/navigations/BreadcrumbComponent'
import TableGenerComponent from '../../../components/tables/TableGenerComponent';
import { useNavigate } from 'react-router-dom';
import { Button, DatePicker, Input, Row, Select } from 'antd';
import { Icon } from '@iconify/react/dist/iconify.js';
import {getByListSerivce} from '../../../services/recipe.service'
import StatusAvitceComponent  from '../../../components/ui/status/StatusActiveComponent'
import { formatISODate } from '../../../utils/utils';
import ButtonActionComponent from '../../../components/ui/actions/ButtonActionComponent'

const ListRecipe = () => {
    const breadcrumbItems = [
        { title: 'Trang chủ', href: '/staff-page' },
        { title: 'Tất cả công thức' }
    ];

    const navigate = useNavigate();
    const [isLoading, setisLoading] = useState(false);
    const [products, setProducts] = useState([])
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

    const fetchAllCatetegories = async () => {
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
                setProducts(res?.data.data);
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

    const handleView = (item) => {
        console.log("item", item);
        const id = item.id;
        console.log("id", id);
        navigate(`/staff-page/recipes/${id}`);
    }

    useEffect(() => {
        fetchAllCatetegories(params);
    }, [JSON.stringify(params)]);

    const stauts = [
        { label: 'Đang hoạt động', value: 'ACTIVE' },
        { label: 'Không hoạt động', value: 'NO_ACTIVE' },
    ];

    const type = [
        { label: 'Nguyên Liệu', value: 'CATEGORY_PRODUCT' },
        { label: 'Công thức', value: 'CATEGORY_RECIPE' },
    ];

    const columns = [
       
        {
            key: 'name',
            title: 'Công thức',
            dataIndex: 'recipeTitle',
        },
        {
            title: 'Action',
            key: 'operation',
            fixed: 'right',
            render: (item) => (
                <ButtonActionComponent
                    record={item}
                    onView={handleView}
                // onUpdate={handleUpdate}
                // onDelete={handleDelete}
                />
            ),
        },
        {
            key: 'type',
            title: 'Loại công thức',
            dataIndex: 'recipeLevel',
        },
        {
            title: 'Trạng thái',
            dataIndex: "recipeStatus",
            key: "recipeStatus",
            render: (status) => <StatusAvitceComponent status={status} />,
        },
        {
            key: "category",
            title: 'Loại danh mục',
            dataIndex: ["category", "categoryName"],
        }
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
                    data={products.map((item) => ({ ...item, key: item.id }))}
                    columns={columns}
                    loading={isLoading}
                    pagination={{ current: params.paging.pageCurrent, pageSize: params.paging.pageSize, total: params.paging.total }}
                    onChange={handleTableChange}
                />
            </div>
        </div>
    )
}

export default ListRecipe