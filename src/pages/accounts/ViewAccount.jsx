import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Radio, DatePicker, message } from 'antd';
import BreadcrumbComponent from '../../components/navigations/BreadcrumbComponent';
import AccountSidebar from '../../components/navigations/AccountSidebar';
import axios from 'axios';

const ViewAccount = ({ accountId }) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [initialValues, setInitialValues] = useState({});
    const [changedFields, setChangedFields] = useState({});

    const breadcrumbItems = [
        { title: 'Trang chủ', href: '/' },
        { title: 'Thông tin cá nhân' }
    ];

    useEffect(() => {
        const fetchAccountDetails = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`/api/accounts/${accountId}`);
                setInitialValues(response.data);
                form.setFieldsValue(response.data);
            } catch (error) {
                message.error('Failed to load account details');
            } finally {
                setLoading(false);
            }
        };

        fetchAccountDetails();
    }, [accountId, form]);

    const handleFormSubmit = async () => {
        setLoading(true);
        try {
            const changedValues = {};
            for (const key of Object.keys(changedFields)) {
                if (changedFields[key] !== initialValues[key]) {
                    changedValues[key] = changedFields[key];
                }
            }
            await axios.put(`/api/accounts/${accountId}`, changedValues);
            message.success('Account details updated successfully');
        } catch (error) {
            message.error('Failed to update account details');
        } finally {
            setLoading(false);
        }
    };

    const handleFieldsChange = (changedFields, allFields) => {
        const newChangedFields = {};
        for (const field of allFields) {
            if (field.touched) {
                newChangedFields[field.name[0]] = field.value;
            }
        }
        setChangedFields(newChangedFields);
    };

    return (
        <div className='container mx-auto p-4'>
            <BreadcrumbComponent items={breadcrumbItems} />
            <div className="flex mt-4">
                <div className="w-64 mr-4">
                    <AccountSidebar />
                </div>
                <div className="flex-1 bg-white p-6 rounded-lg shadow-md">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-semibold">Thông tin cá nhân</h2>
                        <Button type="primary">Chọn ảnh</Button>
                    </div>
                    <Form
                        form={form}
                        layout="vertical"
                        className="space-y-4"
                        onFinish={handleFormSubmit}
                        onFieldsChange={handleFieldsChange}
                    >
                        <div className="grid grid-cols-2 gap-4">
                            <Form.Item
                                label="Họ"
                                name="firstName"
                                rules={[{ required: true, message: 'Vui lòng nhập họ' }]}
                            >
                                <Input placeholder="Nguyễn" />
                            </Form.Item>
                            <Form.Item
                                label="Tên"
                                name="lastName"
                                rules={[{ required: true, message: 'Vui lòng nhập tên' }]}
                            >
                                <Input placeholder="Anh Tuấn" />
                            </Form.Item>
                        </div>
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[{ required: true, message: 'Vui lòng nhập email' }]}
                        >
                            <Input type="email" placeholder="tuannase172510@fpt.edu.vn" />
                        </Form.Item>
                        <Form.Item
                            label="Số điện thoại"
                            name="phone"
                            rules={[{ required: true, message: 'Vui lòng nhập số điện thoại' }]}
                        >
                            <Input placeholder="0969696969" />
                        </Form.Item>
                        <div className="grid grid-cols-2 gap-4">
                            <Form.Item
                                label="Ngày sinh"
                                name="birthDate"
                                rules={[{ required: true, message: 'Vui lòng nhập ngày sinh' }]}
                            >
                                <DatePicker className="w-full" placeholder="15/02/2003" format="DD/MM/YYYY" />
                            </Form.Item>
                            <Form.Item
                                label="Giới tính"
                                name="gender"
                                rules={[{ required: true, message: 'Vui lòng chọn giới tính' }]}
                            >
                                <Radio.Group>
                                    <Radio value="male">Nam</Radio>
                                    <Radio value="female">Nữ</Radio>
                                    <Radio value="other">Khác</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </div>
                        {Object.keys(changedFields).length > 0 && (
                            <div className="flex justify-end">
                                <Button type="primary" htmlType="submit" loading={loading}>Lưu thông tin</Button>
                            </div>
                        )}
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default ViewAccount;