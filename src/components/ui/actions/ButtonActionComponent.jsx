import React from "react";
import { Button, Space } from "antd";
import { EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";

const ButtonActionComponent = ({ record, onView, onUpdate, onDelete }) => {
  return (
    <Space>
      {onView && (
        <Button type="link" icon={<EyeOutlined />} onClick={() => onView(record)}>
          View
        </Button>
      )}
      {onUpdate && (
        <Button type="link" icon={<EditOutlined />} onClick={() => onUpdate(record)}>
          Update
        </Button>
      )}
      {onDelete && (
        <Button type="link" danger icon={<DeleteOutlined />} onClick={() => onDelete(record)}>
          Delete
        </Button>
      )}
    </Space>
  )
}

export default ButtonActionComponent