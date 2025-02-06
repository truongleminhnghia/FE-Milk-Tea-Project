import React from 'react'
import { Button, Checkbox, Col, Form, Input, Row } from 'antd';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { Login, Register } from '../../services/authenticate.service';

const FormActionUserComponent = (props) => {
    const isLogin = props.isLogin;
    const onFinish = (values) => {
        if (props.isLogin) {
            Login(values);
        } else {
            Register(values);
        }
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <div className='w-full' >
            <div className='flex h-[100vh] items-center justify-center'>
                <div className='w-[500px] px-5 py-5 rounded-xl bg-white shadow-md'>
                    <h2
                        className='text-[28px] mb-3 text-left font-bold text-[#29aae1]'>
                        {isLogin ? " Đăng nhập" : " Đăng ký"}
                    </h2>
                    <Form
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        labelAlign="left"
                        colon={false} // dấu 2 chấm
                        name="wrap"
                        className='w-full block'
                        layout="vertical"
                        initialValues={{
                            remember: false,
                        }}
                    >
                        {!isLogin && (
                            <Row>
                                <Col span={8}>
                                    <Form.Item
                                        label="Họ"
                                        name="firstName"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please input your first name!',
                                            },
                                        ]}
                                        labelCol={{ span: 24 }}
                                        wrapperCol={{ span: 24 }}
                                        className="mb-[18px]"
                                    >
                                        <Input className="h-[45px]" />
                                    </Form.Item>
                                </Col>
                                <Col span={14} offset={2}>
                                    <Form.Item
                                        label="Tên"
                                        name="lastName"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please input your email!',
                                            }
                                        ]}
                                        labelCol={{ span: 24 }}
                                        wrapperCol={{ span: 24 }}
                                        className='mb-[18px]'
                                    >
                                        <Input
                                            className='h-[45px]'
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>
                        )}
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[
                                {
                                    message: "Email không được bỏ trống",
                                    required: true,
                                },
                            ]}
                            className='text-base text-[#333] font-normal'
                        >
                            <Input className='text-base text-[#333] font-normal px-4 py-2 h-[45px]' />
                        </Form.Item>

                        <Form.Item
                            label="Mật khẩu"
                            name="password"
                            rules={[
                                {
                                    message: "Mật khẩu không được bỏ trống",
                                    required: true,
                                },
                            ]}
                            className='text-base text-[#333] font-normal'
                        >
                            <Input.Password className='text-base text-[#333] font-normal px-4 py-2 h-[45px]' />
                        </Form.Item>

                        <Form.Item name="remember" valuePropName="checked" label={null} className='!mb-[10px]' >
                            <Checkbox className='float-right' >Ghi nhớ</Checkbox>
                        </Form.Item>

                        <Form.Item label={null} className='!mb-[10px]'>
                            <Button type="primary" htmlType="submit" className='button !w-full bg-[#29aae1] h-[40px]' >
                                {isLogin ? "Đăng Nhập" : "Đăng ký"}
                            </Button>
                        </Form.Item>
                        <p className='text-sm font-normal text-[#333]'>
                            <Link>Quên mật khẩu ?</Link>
                        </p>
                    </Form>
                    <div className='mt-[12x]'>
                        <p
                            className="flex items-center justify-center relative 
                            before:content-[''] before:absolute before:w-[50%] before:border-t before:border-dashed before:border-[#ccc]"
                        >
                            <span
                                className="z-10 relative block px-[10px] py-[5px] bg-white text-[#ccc] text-[12px]"
                            >
                                Hoặc
                            </span>
                        </p>
                        <Row className='mt-[12px]'>
                            <Col
                                span={10}
                                className='flex gap-[10px] items-center justify-center bg-white rounded-sm shadow-md px[12px] py-[8px] cursor-pointer hover:opacity-[0.7]'
                            >
                                <Icon icon="flat-color-icons:google" width="24" height="24" />
                                <span className='text-[14px] font-normal leading-normal text-black'>Google</span>
                            </Col>
                            <Col
                                span={10}
                                offset={4}
                                className='flex gap-[10px] items-center justify-center bg-white rounded-sm shadow-md px[12px] py-[8px] cursor-pointer hover:opacity-[0.7]'
                            >
                                <Icon icon="logos:facebook" width="24" height="24" />
                                <span className='text-[14px] font-normal leading-normal text-black'>Facebook</span>
                            </Col>
                        </Row>
                        <span
                            className='text-[14px] text-[#333] font-normal leading-normal my-[14px] block text-center'
                        >
                            {isLogin ? "Nếu bản chưa có tài khoảng?" : "Bạn đã có tài khoảng?"}
                            <strong
                                className='text-[14px] text-blue-700 font-semibold hover:opacity-[0.8] hover:underline'
                            >
                                <Link to={isLogin ? "/register" : "/login"}>
                                    {isLogin ? " Đăng ký" : " Đăng nhập"}
                                </Link>
                            </strong>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FormActionUserComponent
