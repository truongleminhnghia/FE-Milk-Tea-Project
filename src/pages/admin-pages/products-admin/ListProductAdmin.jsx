import React, { useEffect, useState } from 'react'
import dayjs from "dayjs";
import BreadcrumbComponent from '../../../components/navigations/BreadcrumbComponent';
import { Button, DatePicker, Input, Row, Select } from 'antd';
import { Icon } from '@iconify/react';
import TableGenerComponent from '../../../components/tables/TableGenerComponent';
import { getByListSerivce } from '../../../services/product.service';
import StatusAvitceComponent from '../../../components/ui/status/StatusActiveComponent';
import { formatISODate } from '../../../utils/utils';
import ButtonActionComponent from '../../../components/ui/actions/ButtonActionComponent';
import { Link, useNavigate } from 'react-router-dom';

const ListProductsAdmin = () => {
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
    navigate(`/admin-page/products/${id}`);
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
  const breadcrumbItems = [
    { title: 'Trang chủ', href: '/admin-page' },
    { title: 'Tất cả sản phẩm' }
  ];

  const columns = [
    {
      key: 'Code',
      title: 'Mã Sản phẩm',
      dataIndex: 'ingredientCode',
      render: (ingredientCode) => <Link className='text-[#2289ff]'>{ingredientCode}</Link>
    },
    {
      key: 'name',
      title: 'Tên Sản phẩm',
      dataIndex: 'ingredientName',
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
      key: 'createAt',
      title: 'Ngày Tạo',
      dataIndex: 'createAt',
      render: (date) => formatISODate(date),
    },
    {
      key: 'expiredDate',
      title: 'Ngày hết hạn',
      dataIndex: 'expiredDate',
      render: (date) => formatISODate(date),
    },
    {
      key: 'supplier',
      title: 'Nhà cung cấp',
      dataIndex: 'supplier',
    },
    {
      key: 'type',
      title: 'Loại nguyên liệu',
      dataIndex: 'ingredientType',
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
      <Button
        type='primary'
        icon={<Icon icon="mynaui:plus-solid" />}>
        <Link to={'/admin-page/create-product'}>Add Product</Link>
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

export default ListProductsAdmin