import { Dropdown, Input } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { useState } from 'react';
const items = [
    { key: '1', label: 'All' },
    { key: '2', label: 'COD' },
    { key: '3', label: 'Mastercard' },
    { key: '4', label: 'Paypal' },
    { key: '5', label: 'Visa' },
];

const DropdownComponent = () => {
    const [selected, setSelected] = useState('All');

    const handleMenuClick = ({ key }) => {
        const selectedItem = items.find((item) => item.key === key);
        setSelected(selectedItem?.label || 'All');
    };
    return (
        <Dropdown
            className="w-[300px]"
            menu={{
                items: items.map((item) => ({
                    key: item.key,
                    label: (
                        <button
                            type="button"
                            className="w-full text-left px-4 py-2 cursor-pointer"
                            onClick={() => handleMenuClick({ key: item.key })}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                    handleMenuClick({ key: item.key });
                                }
                            }}
                        >
                            {item.label}
                        </button>
                    ),
                })),
            }}
            trigger={['click']}
        >
            <Input
                className="w-full cursor-pointer"
                value={selected}
                readOnly
                suffix={<DownOutlined />}
            />
        </Dropdown>
    )
}

export default DropdownComponent