import React, { useEffect, useState } from 'react'
import dayjs from "dayjs";
import BreadcrumbComponent from '../../../components/navigations/BreadcrumbComponent';
import { Button, Card, DatePicker, Input, Row, Select, Tag, Space, Divider, Tooltip, Spin } from 'antd';
import { Icon } from '@iconify/react';
import TableGenerComponent from '../../../components/tables/TableGenerComponent';
import { getByListSerivce } from '../../../services/product.service';
import StatusAvitceComponent from '../../../components/ui/status/StatusActiveComponent';
import { formatISODate } from '../../../utils/utils';
import ButtonActionComponent from '../../../components/ui/actions/ButtonActionComponent';
import { Link, useNavigate } from 'react-router-dom';
import { 
  SearchOutlined, 
  FilterOutlined, 
  ReloadOutlined, 
  PlusOutlined,
  LoadingOutlined
} from '@ant-design/icons';

const ListProductsAdmin = () => {
  const navigate = useNavigate();
  const [isLoading, setisLoading] = useState(false);
  const [filterLoading, setFilterLoading] = useState(false);
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

  const fetchAllProducts = async (params) => {
    try {
      setisLoading(true);
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
            total: res.data.total || 0,
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
    navigate(`/admin-page/products/${id}`);
  }
  
  const handleFilterClick = () => {
    setFilterLoading(true);
    fetchAllProducts();
  };

  const handleResetFilters = () => {
    setFilterLoading(true);
    setParams({
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
    });
  };

  useEffect(() => {
    fetchAllProducts(params);
  }, [JSON.stringify(params)]);

  const stauts = [
    { label: 'Đang hoạt động', value: 'ACTIVE' },
    { label: 'Không hoạt động', value: 'NO_ACTIVE' },
  ];

  const type = [
    { label: 'Nguyên Liệu', value: 'CATEGORY_PRODUCT' },
    { label: 'Công thức', value: 'CATEGORY_RECIPE' },
  ];
  const breadcrumbItems = [
    { title: 'Trang chủ', href: '/admin-page' },
    { title: 'Tất cả sản phẩm' }
  ];

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  const columns = [
    {
      key: 'ingredientCode',
      title: 'Mã Sản phẩm',
      dataIndex: 'ingredientCode',
      render: (ingredientCode) => <Link className='text-[#2289ff] font-medium'>{ingredientCode}</Link>
    },
    {
      key: 'ingredientName',
      title: 'Tên Sản phẩm',
      dataIndex: 'ingredientName',
      render: (name) => <span className="font-medium">{name}</span>
    },
    {
      key: 'createAt',
      title: 'Ngày Tạo',
      dataIndex: 'createAt',
      width: 150,
      render: (date) => (
        <Space>
          <Icon icon="carbon:calendar" className="mr-1" />
          {formatISODate(date)}
        </Space>
      ),
    },
    {
      key: 'expiredDate',
      title: 'Ngày hết hạn',
      dataIndex: 'expiredDate',
      render: (date) => {
        if (!date) return <Tag color="default">Không có</Tag>;
        
        const expiredDate = dayjs(date);
        const now = dayjs();
        const daysRemaining = expiredDate.diff(now, 'day');
        
        let color = 'green';
        if (daysRemaining < 0) {
          color = 'error';
        } else if (daysRemaining < 30) {
          color = 'warning';
        }
        
        return (
          <Tooltip title={daysRemaining < 0 ? 'Đã hết hạn' : `Còn ${daysRemaining} ngày`}>
            <Tag color={color}>{formatISODate(date)}</Tag>
          </Tooltip>
        );
      }
    },
    {
      key: 'supplier',
      title: 'Nhà cung cấp',
      dataIndex: 'supplier',
      render: (supplier) => supplier || <span className="text-gray-400">Không có</span>
    },
    {
      key: 'ingredientType',
      title: 'Loại nguyên liệu',
      dataIndex: 'ingredientType',
      render: (type) => {
        const colors = {
          'LIQUID': 'blue',
          'SOLID': 'purple',
          'POWDER': 'orange',
          'OTHER': 'default'
        };
        return <Tag color={colors[type] || 'default'}>{type}</Tag>;
      }
    },
    {
      title: 'Trạng thái',
      dataIndex: "ingredientStatus",
      key: "ingredientStatus",
      render: (status) => <StatusAvitceComponent status={status} />,
    },
    {
      key: "priceOrigin",
      title: 'Giá',
      dataIndex: 'priceOrigin',
      render: (price) => <span className="font-medium text-green-600">{formatPrice(price)}</span>
    },
    {
      key: "category",
      title: 'Danh mục',
      dataIndex: ["category", "categoryName"],
      render: (category) => category ? <Tag color="blue">{category}</Tag> : <span className="text-gray-400">Không có</span>
    },
    {
      title: 'Thao tác',
      key: 'operation',
      fixed: 'right',
      width: 120,
      render: (item) => (
        <ButtonActionComponent
          record={item}
          onView={handleView}
          onUpdate={handleUpdate}
        />
      ),
    }
  ]

  const handleUpdate = (item) => {
    console.log("item", item);
    navigate(`/admin-page/products/edit/${item.id}`);
  }

  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  return (
    <div className="list-products-container">
      <BreadcrumbComponent items={breadcrumbItems} />
      
      <Card className="mt-4 shadow-sm">
        <div className="flex flex-wrap justify-between items-center mb-4">
          <div className="text-xl font-medium">Danh sách sản phẩm</div>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            className="bg-[#29aae1]"
          >
            <Link to={'/admin-page/create-product'}>Thêm sản phẩm</Link>
          </Button>
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
                value={params.startDate ? dayjs(params.startDate, "YYYY-MM-DD") : null}
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
                value={params.status}
                options={stauts}
                allowClear
                onChange={(value) => handleParamsChange("status", value)}
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
              disabled={filterLoading}
            >
              Đặt lại
            </Button>
            <Button
              type="primary"
              onClick={handleFilterClick}
              icon={filterLoading ? null : <FilterOutlined />}
              loading={filterLoading}
              className="bg-[#29aae1]"
            >
              Lọc
            </Button>
          </div>
        </div>

        <TableGenerComponent
          data={products.map((item) => ({ ...item, key: item.id }))}
          columns={columns}
          loading={isLoading}
          pagination={{ 
            current: params.paging.pageCurrent, 
            pageSize: params.paging.pageSize, 
            total: params.paging.total,
            showSizeChanger: true,
            showTotal: (total) => `Tổng ${total} sản phẩm`,
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
    </div>
  )
}

export default ListProductsAdmin