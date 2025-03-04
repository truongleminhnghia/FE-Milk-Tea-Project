import { Table } from 'antd'
import React from 'react'

const TableGenerComponent = ({ data, columns, pagination, onChange }) => {
  return (
    <div>
      <Table
      className='px-2 bg-white'
        columns={columns}
        dataSource={data}
        pagination={pagination}
        onChange={onChange} 
      />
    </div>
  );
};

export default TableGenerComponent