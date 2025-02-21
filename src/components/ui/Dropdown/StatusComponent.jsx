import { Tag } from 'antd';
import React from 'react'

const StatusComponent = ({ status }) => {
    const statusColors = {
        SUCCESS: "green",
        PENDING: "gold",
        CANCELLED: "red",
        SHIPPING: "blue",
    };
    return <Tag color={statusColors[status] || "default"}>{status}</Tag>;
}

export default StatusComponent