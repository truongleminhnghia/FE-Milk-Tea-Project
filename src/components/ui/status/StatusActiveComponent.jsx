import { Tag } from 'antd';
import React from 'react'

const StatusAvitceComponent = ({ status }) => {
    const statusColors = {
        ACTIVE: "green",
        NO_ACTIVE: "gold",
    };
    return <Tag color={statusColors[status] || "default"}>{status}</Tag>;
}

export default StatusAvitceComponent