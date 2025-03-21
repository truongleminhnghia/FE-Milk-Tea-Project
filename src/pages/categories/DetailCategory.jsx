import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import BreadcrumbComponent from '../../components/navigations/BreadcrumbComponent'
import { Col, Form, Input, Row } from 'antd'
import Swiper from 'swiper'
import { getByIdService } from '../../services/category.service'

const DetailCategory = () => {
    const { id } = useParams()
    const [form] = Form.useForm();
    const [data, setData] = useState({})
    const [isLoading, setIsLoading] = useState(false);
    const breadcrumbItems = [
        { title: 'Trang chủ', href: '/admin-page' },
        { title: 'Danh mục sản phẩm' }
    ];

    const fetchDetail = async (id) => {
        try {
            setIsLoading(true);
            const res = await getByIdService(id);
            if (res?.success || res?.data) {
                form.setFieldsValue(res.data);
                setData(res.data)
                setIsLoading(false);
                console.log('siiuuu', res.data)
            }
        } catch (error) {
            console.log("error", error);
        }
    }
    useEffect(() => {
        fetchDetail(id)
    }, [id, form]);
    return (
        <>
            <BreadcrumbComponent items={breadcrumbItems} />
            <div>
                <Form
                    form={form}
                    layout='vertical'
                >
                    <Row
                        className='bg-white px-3 py-3 rounded-lg mb-[20px]'
                    >
                        <Row className='w-full border-b-[2px] mb-2'>
                            <h1 className='text-[24px] font-medium'>Thông tin nguyên liệu</h1>
                        </Row>
                        <Col
                            span={12}
                            className='pr-2 py-2'
                        >
                            <Form.Item
                                className='!text-[18px] text-black font-medium'
                                label="Tên danh mục"
                                name='categoryName'
                            >
                                <Input className='text-[16px] font-normal text-[#747474]' />
                            </Form.Item>
                            <Form.Item
                                className='!text-[18px] text-black font-medium'
                                label="Ngày tạo"
                                name='createAt'
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                className='!text-[18px] text-black font-medium'
                                label="Loại sản phẩm"
                                name='categoryType'
                            >
                                <Input className='text-[16px] font-normal text-[#747474]' />
                            </Form.Item>

                            <Form.Item
                                className='!text-[18px] text-black font-medium'
                                label="Trạng thái"
                                name='categoryStatus'
                            >
                                <Input />
                            </Form.Item>

                        </Col>

                    </Row>
                </Form>

            </div >
        </>
    )
}

export default DetailCategory