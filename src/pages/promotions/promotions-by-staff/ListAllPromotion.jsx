import React, { useEffect, useState } from 'react';
import BreadcrumbComponent from '../../../components/navigations/BreadcrumbComponent';
import TableGenerComponent from '../../../components/tables/TableGenerComponent';
import { useNavigate } from 'react-router-dom';
import { Button, Input, Row, Select, DatePicker } from 'antd';
import { Icon } from '@iconify/react/dist/iconify.js';
import { getAllPromotionService } from '../../../services/promotion.service';
import ButtonActionComponent from '../../../components/ui/actions/ButtonActionComponent';
import { formatISODate } from '../../../utils/utils';
import dayjs from 'dayjs';

const ListAllPromotion = () => {
    const breadcrumbItems = [
        { title: 'Trang chủ', href: '/staff-page' },
        { title: 'Tất cả khuyến mãi' }
    ];

    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [promotions, setPromotions] = useState([]);  // Lưu danh sách khuyến mãi
    const [params, setParams] = useState({
        promotionCode: null,
        isSale: null,
        startDate: null,
        endDate: null,
        paging: {
            pageCurrent: 1,
            pageSize: 10,
            total: 0,
        }
    });

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
        setParams(prev => ({
            ...prev,
            promotionCode: e.target.value
        }));
    };

    // Hàm gọi API lấy tất cả dữ liệu từ database
    const fetchAllPromotions = async () => {
        try {
            setIsLoading(true); // Bắt đầu loading
            const param = {
                pageCurrent: params.paging.pageCurrent,
                pageSize: params.paging.pageSize,
                promotionCode: params.promotionCode,
                startDate: params.startDate,
                endDate: params.endDate,
                isSale: params.isSale
            };
            const res = await getAllPromotionService(param); 
            if (res?.data) {
                setPromotions(res.data.data); 
                setParams(prev => ({
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
            setIsLoading(false); 
        }
    };

    const handleDateChange = (key, date) => {
        setParams(prev => ({
            ...prev,
            [key]: date ? dayjs(date).isValid() ? dayjs(date).format("YYYY-MM-DD") : null : null
        }));
    };

    const handleParamsChange = (key, value) => {
        setParams(prev => ({
            ...prev,
            [key]: value || null,
        }));
    };

    const handleView = (item) => {
        const id = item.promotionCode;
        navigate(`/staff-page/promotions/${id}`);
    };

    useEffect(() => {
        fetchAllPromotions(); 
    }, [JSON.stringify(params)]);
    const columns = [
        {
            key: 'promotionCode',
            title: 'Mã khuyến mãi',
            dataIndex: 'promotionCode',
        },
        {
            key: 'startDate',
            title: 'Ngày bắt đầu',
            dataIndex: 'startDate',
            render: (startDate) => <span>{formatISODate(startDate)}</span>,
        },
        {
            key: 'endDate',
            title: 'Ngày kết thúc',
            dataIndex: 'endDate',
            render: (endDate) => <span>{formatISODate(endDate)}</span>,
        },
        {
            title: 'Loại khuyến mãi',
            dataIndex: 'promotionType',
            key: 'promotionType',
        },
        {
            title: 'Có khuyến mãi',
            dataIndex: 'isActive',
            key: 'isActive',
            render: (isActive) => (isActive ? 'Có' : 'Không'),
        },
        {
            key: 'createdAt',
            title: 'Ngày tạo',
            dataIndex: 'createdAt',
            render: (createdAt) => <span>{formatISODate(createdAt)}</span>,
        },
        {
            key: 'updatedAt',
            title: 'Ngày cập nhật',
            dataIndex: 'updatedAt',
            render: (updatedAt) => <span>{formatISODate(updatedAt)}</span>,
        },
        {
            title: 'Hành động',
            key: 'operation',
            render: (item) => (
                <ButtonActionComponent
                    record={item}
                    onView={handleView}
                />
            ),
        }
    ];

    return (
        <div>
            <BreadcrumbComponent items={breadcrumbItems} />
            <Row className='bg-white py-3 px-3 rounded-xl border-[1px] border-[#ccc] mt-2'>
                <div className='flex items-center h-[40px] w-full'>
                    <Input
                        className='h-full max-w-[200px] py-2 px-3 mr-3 inline-flex text-[14px]'
                        prefix={<Icon className='text-lg text-[#3C2F2F]' icon="iconamoon:search" />}
                        placeholder='Tìm kiếm mã khuyến mãi'
                        allowClear
                        value={params.promotionCode}
                        onChange={handleSearchChange}
                    />
                    <DatePicker
                        placeholder="Ngày bắt đầu"
                        className="flex !w-[200px] h-full items-center text-[#3C2F2F] py-2 px-3 mr-3"
                        onChange={(date) => handleDateChange("startDate", date)}
                        allowClear
                        format="DD-MM-YYYY"
                        value={params.startDate ? dayjs(params.startDate, "YYYY-MM-DD") : null}
                    />
                    <DatePicker
                        placeholder="Ngày kết thúc"
                        className="flex w-[200px] h-full items-center text-[#3C2F2F] py-2 px-3 mr-3"
                        onChange={(date) => handleDateChange('endDate', date)}
                        allowClear
                        format="DD-MM-YYYY"
                        value={params.endDate ? dayjs(params.endDate, "YYYY-MM-DD") : null}
                    />
                    <Button
                        className='h-full p-3 flex items-center ml-auto'
                        type='primary'
                        icon={<Icon className='!text-[#fff] text-[18px]' icon="mdi:filter" />}
                    >
                        <span className='!text-[#fff] text-[18px] !font-medium'>Lọc</span>
                    </Button>
                </div>
            </Row>

            <div className='rounded-lg mt-3'>
                <TableGenerComponent
                    data={promotions.map((item) => ({ ...item, key: item.promotionCode }))}
                    columns={columns}
                    loading={isLoading}
                    pagination={{
                        current: params.paging.pageCurrent,
                        pageSize: params.paging.pageSize,
                        total: params.paging.total
                    }}
                    onChange={handleTableChange}
                />
            </div>
        </div>
    );
};

export default ListAllPromotion;
