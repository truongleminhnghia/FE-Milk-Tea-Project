import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Radio, DatePicker, message, Upload } from 'antd';
import BreadcrumbComponent from '../../components/navigations/BreadcrumbComponent';
import AccountSidebar from '../../components/navigations/AccountSidebar';
import { UserOutlined, LoadingOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { getById } from '../../apis/user.api';

const ViewAccount = () => {
    const { id } = useParams();
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState('');
    const [uploadLoading, setUploadLoading] = useState(false);
    const [initialValues, setInitialValues] = useState({});
    const [changedFields, setChangedFields] = useState({});

    const breadcrumbItems = [
        { title: 'Trang chủ', href: '/' },
        { title: 'Thông tin cá nhân' }
    ];

    const fetchAccountDetails = async (id) => {
        setLoading(true);
        try {
            const response = await getById(id);
            console.log("data", response.data)
            setInitialValues(response.data);
            form.setFieldsValue(response.data);
            if (response.data?.avatar) {
                setImageUrl(response.data.avatar);
            }
        } catch (error) {
            message.error('Failed to load account details');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAccountDetails(id);
    }, [id, form]);

    const handleFormSubmit = async () => {
        setLoading(true);
        try {
            const changedValues = {};
            for (const key of Object.keys(changedFields)) {
                if (changedFields[key] !== initialValues[key]) {
                    changedValues[key] = changedFields[key];
                }
            }
            await axios.put(`/api/accounts/${id}`, changedValues);
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

    const beforeUpload = (file) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
            return false;
        }
        const isLt1M = file.size / 1024 / 1024 < 1;
        if (!isLt1M) {
            message.error('Image must smaller than 1MB!');
            return false;
        }
        return true;
    };

    const customUpload = async ({ file, onSuccess, onError }) => {
        setUploadLoading(true);
        try {
            const formData = new FormData();
            formData.append('avatar', file);
            
            const response = await axios.post(`/api/accounts/${id}/avatar`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            
            setImageUrl(response.data.avatarUrl);
            message.success('Avatar uploaded successfully');
            onSuccess();
        } catch (error) {
            message.error('Error uploading avatar');
            onError();
        } finally {
            setUploadLoading(false);
        }
    };

    const uploadButton = (
        <div>
            {uploadLoading ? <LoadingOutlined /> : <UserOutlined className="text-4xl text-gray-400" />}
        </div>
    );

    return (
        <div className='container mx-auto p-4'>
            <BreadcrumbComponent items={breadcrumbItems} />
            <div className="flex mt-4">
                <div className="w-64 mr-4">
                    <AccountSidebar />
                </div>
                <div className="flex-1 bg-white p-6 rounded-lg shadow-md">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-semibold">Hồ Sơ Của Tôi</h2>
                        <p className="text-gray-600">Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
                    </div>
                    <div className="flex">
                        <div className="flex-grow pr-24 border-r">
                            <Form
                                form={form}
                                layout="vertical"
                                className="space-y-4"
                                onFinish={handleFormSubmit}
                                onFieldsChange={handleFieldsChange}
                            >
                                <Form.Item
                                    label={<span className="text-gray-600">Tên đăng nhập</span>}
                                    name="username"
                                >
                                    <Input 
                                        disabled
                                        className="bg-gray-50"
                                        style={{ width: '100%' }}
                                    />
                                    <p className="text-gray-500 text-sm mt-1">Tên Đăng nhập chỉ có thể thay đổi một lần.</p>
                                </Form.Item>

                                <div className="grid grid-cols-2 gap-4">
                                    <Form.Item
                                        label={<span className="text-gray-600">Họ <span className="text-red-500">*</span></span>}
                                        name="firstName"
                                        rules={[{ required: true, message: 'Vui lòng nhập họ' }]}
                                    >
                                        <Input placeholder="Nguyễn" />
                                    </Form.Item>
                                    <Form.Item
                                        label={<span className="text-gray-600">Tên <span className="text-red-500">*</span></span>}
                                        name="lastName"
                                        rules={[{ required: true, message: 'Vui lòng nhập tên' }]}
                                    >
                                        <Input placeholder="Anh Tuấn" />
                                    </Form.Item>
                                </div>

                                <Form.Item
                                    label={<span className="text-gray-600">Email <span className="text-red-500">*</span></span>}
                                    name="email"
                                    rules={[{ required: true, message: 'Vui lòng nhập email' }]}
                                >
                                    <div className="flex items-center">
                                        <Input 
                                            disabled 
                                            className="bg-gray-50 flex-grow"
                                            placeholder="tuannase172510@fpt.edu.vn"
                                        />
                                        <Button type="link" className="text-blue-500 ml-2 whitespace-nowrap">
                                            Thay Đổi
                                        </Button>
                                    </div>
                                </Form.Item>

                                <Form.Item
                                    label={<span className="text-gray-600">Số điện thoại <span className="text-red-500">*</span></span>}
                                    name="phone"
                                    rules={[{ required: true, message: 'Vui lòng nhập số điện thoại' }]}
                                >
                                    <div className="flex items-center">
                                        <Input 
                                            disabled 
                                            className="bg-gray-50 flex-grow"
                                            placeholder="0969696969"
                                        />
                                        <Button type="link" className="text-blue-500 ml-2 whitespace-nowrap">
                                            Thay Đổi
                                        </Button>
                                    </div>
                                </Form.Item>

                                <div className="grid grid-cols-2 gap-4">
                                    <Form.Item
                                        label={<span className="text-gray-600">Ngày sinh <span className="text-red-500">*</span></span>}
                                        name="birthDate"
                                        rules={[{ required: true, message: 'Vui lòng nhập ngày sinh' }]}
                                    >
                                        <DatePicker 
                                            className="w-full" 
                                            placeholder="15/02/2003" 
                                            format="DD/MM/YYYY"
                                        />
                                    </Form.Item>

                                    <Form.Item
                                        label={<span className="text-gray-600">Giới tính <span className="text-red-500">*</span></span>}
                                        name="gender"
                                        rules={[{ required: true, message: 'Vui lòng chọn giới tính' }]}
                                    >
                                        <Radio.Group>
                                            <Radio value="Nam">Nam</Radio>
                                            <Radio value="Nữ">Nữ</Radio>
                                            <Radio value="Khác">Khác</Radio>
                                        </Radio.Group>
                                    </Form.Item>
                                </div>

                                <Form.Item>
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        loading={loading}
                                        className="hover:bg-[#ee4d2d]/80 border-none px-8"
                                    >
                                        Lưu
                                    </Button>
                                </Form.Item>
                            </Form>
                        </div>

                        <div className="w-64 pl-8 flex flex-col items-center">
                            <Upload
                                name="avatar"
                                listType="picture-circle"
                                className="avatar-uploader mb-3"
                                showUploadList={false}
                                beforeUpload={beforeUpload}
                                customRequest={customUpload}
                            >
                                {imageUrl ? (
                                    <img 
                                        src={imageUrl} 
                                        alt="avatar" 
                                        className="w-32 h-32 rounded-full object-cover"
                                    />
                                ) : (
                                    <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center">
                                        {uploadButton}
                                    </div>
                                )}
                            </Upload>
                            <Button 
                                className="mb-3 bg-blue-500 text-white hover:bg-blue-600"
                                icon={<UserOutlined />}
                                onClick={() => document.getElementById('avatar-upload').click()}
                            >
                                Chọn Ảnh
                            </Button>
                            <input
                                type="file"
                                id="avatar-upload"
                                hidden
                                accept="image/jpeg,image/png"
                                onChange={(e) => {
                                    const file = e.target.files[0];
                                    if (file && beforeUpload(file)) {
                                        customUpload({
                                            file,
                                            onSuccess: () => {},
                                            onError: () => {}
                                        });
                                    }
                                    e.target.value = '';
                                }}
                            />
                            <div className="text-center text-sm text-gray-500">
                                <p>Dung lượng file tối đa 1 MB</p>
                                <p>Định dạng: .JPEG, .PNG</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewAccount;