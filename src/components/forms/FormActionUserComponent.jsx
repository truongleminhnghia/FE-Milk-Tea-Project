import React, { useEffect, useState } from 'react'
import { Button, Checkbox, Col, Form, Input, Row, Divider, Typography } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { callBackApi, handlerLoginGoogle, Login, Register } from '../../services/authenticate.service';
import { useDispatch } from 'react-redux';
import { toastConfig, handleKeyDown } from '../../utils/utils';

const { Title, Text } = Typography;

const FormActionUserComponent = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isLogin } = props;
    const [isLoading, setIsLoading] = useState(false);

    const onFinish = async (values) => {
        setIsLoading(true);
        try {
            if (isLogin) {
                await LoginApi(values);
            } else {
                await registerApi(values);
            }
        } finally {
            setIsLoading(false);
        }
    };

    const LoginApi = async (values) => {
        try {
            const res = await Login(values, dispatch, navigate)
            console.log("Login response: ", res)
            if (!res) {
                toastConfig("error", res.message);
            }
            toastConfig("success", "Đăng nhập thành công!")
        } catch (error) {
            toastConfig("error", error.message);
        }
    }

    const registerApi = async (values) => {
        try {
            const res = await Register(values, navigate)
            console.log("register", res);
            if (!res) {
                toastConfig("error", res.message);
            }
            toastConfig("success", "Đăng nhập thành công!")
        } catch (error) {
            toastConfig("error", error.message);
        }
    }

    const loginWithGoogle = async () => {
        try {
            setIsLoading(true);
            const res = await handlerLoginGoogle();
            console.log("res: ", res);
            if (res?.data) {
                const width = 500;
                const height = 600;
                const left = (window.innerWidth - width) / 2;
                const top = (window.innerHeight - height) / 2;

                window.open(
                    res.data,
                    "_blank",
                    `width=${width},height=${height},top=${top},left=${left},resizable=no,scrollbars=no,status=no`
                );
            }
        } catch (error) {
            console.log("Error: ", error.message);
            toastConfig("error", "Đăng nhập Google thất bại");
        } finally {
            setIsLoading(false);
        }
    };

    const onEnterPress = () => {
        // Handle enter press if needed
    };

    useEffect(() => {
        const receiveMessage = async (event) => {
            if (event?.data?.success) {
                console.log("Navigating to:", event);
                // toastConfig("success", "Đăng nhập Google thành công!");
                const params = {
                    code: event?.data?.code,
                    type_login: "LOGIN_GOOGLE",
                };
                const res = await callBackApi(params, dispatch)
                if (res?.data || res?.success) {
                    console.log("call", res)
                    switch (res?.data?.accountResponse?.roleName) {
                        case "ROLE_ADMIN":
                            navigate("/admin-page");
                            break;
                        case "ROLE_MANAGER":
                            navigate("/admin-page");
                            break;
                        case "ROLE_CUSTOMER":
                            navigate("/");
                            break;
                        case "ROLE_STAFF":
                            navigate("/staff-page");
                            break;
                        default:
                            break;
                    }
                }
            } else {
                toastConfig("error", event.data?.message || "Đăng nhập Google thất bại");
            }
        };

        window.addEventListener("message", receiveMessage);
        return () => {
            window.removeEventListener("message", receiveMessage);
        };
    }, []);


    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };
    return (
        <div className='w-full min-h-screen bg-[#e6f7ff] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
            <div className='max-w-md w-full bg-white rounded-xl shadow-lg overflow-hidden'>
                <div className='bg-[#29aae1] px-6 py-4'>
                    <Title level={2} className='m-0 text-white font-bold text-center'>
                        {isLogin ? "Đăng nhập" : "Đăng ký"}
                    </Title>
                </div>

                <div className='px-6 py-8'>
                    <Form
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        labelAlign="left"
                        colon={false}
                        name="auth_form"
                        className='w-full'
                        layout="vertical"
                        initialValues={{
                            remember: false,
                        }}
                        requiredMark={false}
                    >
                        {!isLogin && (
                            <Row gutter={16}>
                                <Col span={12}>
                                    <Form.Item
                                        label={<span className="text-gray-700 font-medium">Họ</span>}
                                        name="firstName"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Vui lòng nhập họ!',
                                            },
                                        ]}
                                    >
                                        <Input 
                                            className="rounded-md h-[45px]" 
                                            prefix={<Icon icon="mdi:account" className="text-gray-400 mr-2" />}
                                            placeholder="Nhập họ"
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item
                                        label={<span className="text-gray-700 font-medium">Tên</span>}
                                        name="lastName"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Vui lòng nhập tên!',
                                            }
                                        ]}
                                    >
                                        <Input
                                            className="rounded-md h-[45px]"
                                            prefix={<Icon icon="mdi:account" className="text-gray-400 mr-2" />}
                                            placeholder="Nhập tên"
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>
                        )}
                        <Form.Item
                            label={<span className="text-gray-700 font-medium">Email</span>}
                            name="email"
                            rules={[
                                {
                                    message: "Email không được bỏ trống",
                                    required: true,
                                },
                                {
                                    type: "email",
                                    message: "Email không hợp lệ",
                                },
                            ]}
                        >
                            <Input 
                                className="rounded-md h-[45px]" 
                                prefix={<Icon icon="mdi:email" className="text-gray-400 mr-2" />}
                                placeholder="Nhập địa chỉ email"
                            />
                        </Form.Item>

                        <Form.Item
                            label={<span className="text-gray-700 font-medium">Mật khẩu</span>}
                            name="password"
                            rules={[
                                {
                                    message: "Mật khẩu không được bỏ trống",
                                    required: true,
                                },
                            ]}
                        >
                            <Input.Password 
                                className="rounded-md h-[45px]" 
                                prefix={<Icon icon="mdi:lock" className="text-gray-400 mr-2" />}
                                placeholder="Nhập mật khẩu"
                            />
                        </Form.Item>

                        <div className="flex justify-between items-center mb-4">
                            <Form.Item name="remember" valuePropName="checked" noStyle>
                                <Checkbox>Ghi nhớ</Checkbox>
                            </Form.Item>
                            
                            {isLogin && (
                                <Link to="/forgot-password" className="text-[#29aae1] text-sm hover:underline">
                                    Quên mật khẩu?
                                </Link>
                            )}
                        </div>

                        <Form.Item>
                            <Button 
                                type="primary" 
                                htmlType="submit" 
                                loading={isLoading}
                                className="w-full h-[45px] bg-[#29aae1] hover:bg-[#1d8dba] rounded-md font-medium"
                            >
                                {isLogin ? "Đăng nhập" : "Đăng ký"}
                            </Button>
                        </Form.Item>
                    </Form>

                    <Divider plain>
                        <Text className="text-gray-500 text-sm">HOẶC</Text>
                    </Divider>

                    <div className="grid grid-cols-2 gap-4 mt-4">
                        <button
                            onClick={loginWithGoogle}
                            disabled={isLoading}
                            className="flex items-center justify-center gap-2 border border-gray-300 rounded-md py-2 px-4 hover:bg-gray-50 transition-colors"
                        >
                            <Icon icon="flat-color-icons:google" width="20" height="20" />
                            <span className="text-sm font-medium text-gray-600">Google</span>
                        </button>
                        <button
                            disabled={isLoading}
                            className="flex items-center justify-center gap-2 border border-gray-300 rounded-md py-2 px-4 hover:bg-gray-50 transition-colors"
                        >
                            <Icon icon="logos:facebook" width="20" height="20" />
                            <span className="text-sm font-medium text-gray-600">Facebook</span>
                        </button>
                    </div>

                    <div className="text-center mt-6">
                        <Text className="text-gray-600">
                            {isLogin ? "Bạn chưa có tài khoản? " : "Bạn đã có tài khoản? "}
                            <Link 
                                to={isLogin ? "/register" : "/login"} 
                                className="text-[#29aae1] font-medium hover:underline"
                            >
                                {isLogin ? "Đăng ký" : "Đăng nhập"}
                            </Link>
                        </Text>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FormActionUserComponent
