import { Button, Table } from 'antd';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import DataOrder from '../../../stores/data/list-order.json'
import StatusComponent from './StatusComponent';
import { formatCurrencyVND } from '../../../utils/utils';

const columns = [
    {
        title: 'Code',
        dataIndex: 'orderCode',
        render: (orderCode) => <Link className='text-blue-700'>{orderCode}</Link>,
        // sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
        title: 'Action',
        key: 'operation',
        fixed: 'right',
        width: 100,
        render: () => <Link>action</Link>,
    },
    {
        title: 'Date',
        dataIndex: 'orderDate',
    },
    {
        title: 'Status',
        dataIndex: "orderStatus",
        key: "orderStatus",
        render: (status) => <StatusComponent status={status} />,
    },
    {
        title: 'Quantity',
        dataIndex: 'quantity',
    },
    {
        title: 'Total Price',
        dataIndex: 'totlaPrice',
        render: (totalPrice) => formatCurrencyVND(totalPrice),
    },
    {
        title: 'Price Promotion',
        dataIndex: 'priceAffterPromotion',
        render: (priceAffterPromotion) => formatCurrencyVND(priceAffterPromotion),
    },
    {
        title: 'Note ',
        dataIndex: 'address',
    },
    {
        title: 'RefCode ',
        dataIndex: 'refCode',
        render: (refCode) => <Link className='text-blue-700'>{refCode}</Link>
    },
];
const data = DataOrder.data;
const TableComponent = () => {
    const onChange = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
    };

    return (
        <div>
            <Table columns={columns} dataSource={data} onChange={onChange} />
        </div>
    );
}

export default TableComponent