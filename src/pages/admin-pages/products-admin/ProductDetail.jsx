import React, { useEffect, useState } from 'react'
import BreadcrumbComponent from '../../../components/navigations/BreadcrumbComponent'
import { Col, Form, Input, Row, Table } from 'antd';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { FreeMode, Navigation, Thumbs, Pagination, Autoplay } from 'swiper/modules';
import { Icon } from '@iconify/react/dist/iconify.js';
import Product from '../../../stores/data/ingredient.json'
import TableGenerComponent from '../../../components/tables/TableGenerComponent';
import { Link, useParams } from 'react-router-dom';
import { toastConfig } from '../../../utils/utils';
import { getByIdService } from '../../../services/product.service';

const ProductDetail = () => {
    const { id } = useParams(); 
    const breadcrumbItems = [
        { title: 'Trang chủ', href: '/admin-page' },
        { title: 'Chi tiết' }
    ];
    const [activeIndex, setActiveIndex] = useState(0);
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [data, setData] = useState({})
    const [form] = Form.useForm();

    const fetchDetail = async (id) => {
        try {
            setIsLoading(true);
            const res = await getByIdService(id);
            if (res?.success || res?.data) {
                form.setFieldsValue(res.data);
                setData(res.data)
                setIsLoading(false);
            }
        } catch (error) {
            console.log("error", error);
        }
    }
    useEffect(() => {
        fetchDetail(id)
    }, [id, form]);

    const columnsQuantity = [
        {
            title: "Số lượng",
            dataIndex: "quantity",
            key: "quantity"
        },
        {
            title: "Loại",
            dataIndex: "productType",
            key: "productType"
        },
        {
            title: "Ngày nhập",
            dataIndex: "createAt",
            key: "createAt"
        },
    ]


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
                                label="Tên nguyên liệu"
                                name='ingredientName'
                            >
                                <Input className='text-[16px] font-normal text-[#747474]' />
                            </Form.Item>
                            <Form.Item
                                className='!text-[18px] text-black font-medium'
                                label="Nhà sản xuất"
                                name='supplier'
                            >
                                <Input className='text-[16px] font-normal text-[#747474]' />
                            </Form.Item>
                            <Form.Item
                                className='!text-[18px] text-black font-medium'
                                label="Mã sản phẩm"
                                name='ingredientCode'
                            >
                                <Input className='text-[16px] font-normal text-[#747474]' />
                            </Form.Item>
                            <Form.Item
                                className='!text-[18px] text-black font-medium'
                                label="Trạng thái"
                                name='ingredientStatus'
                            >
                                <Input />
                            </Form.Item>
                            <Row>
                                <Col span={12} className='pr-2'>
                                    <Form.Item
                                        className='!text-[18px] text-black font-medium'
                                        label='Giá'
                                        name='priceOrigin'
                                    >
                                        <Input className='text-[16px] font-normal text-[#747474]' />
                                    </Form.Item>
                                </Col>
                                <Col span={12} className='pl-2'>
                                    <Form.Item
                                        className='!text-[18px] text-black font-medium'
                                        label='Giá khuyến mãi'
                                        name='pricePromotion'
                                    >
                                        <Input className='text-[16px] font-normal text-[#747474]' />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Form.Item
                                className='!text-[18px] text-black font-medium'
                                label="Dạng nguyên liệu"
                                name="ingredientType"
                            >
                                <Input className='text-[16px] font-normal text-[#747474]' />
                            </Form.Item>
                        </Col>
                        <Col span={12} className='pl-2 py-2'>
                            <Swiper
                                className='h-[400px]'
                                loop={true}
                                spaceBetween={0}
                                navigation={true}
                                autoplay={{
                                    delay: 2500,
                                    disableOnInteraction: false,
                                }}
                                thumbs={{ swiper: thumbsSwiper }}
                                modules={[Navigation, Thumbs, FreeMode, Autoplay, Pagination]}
                                onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
                            >
                                {data.images?.map((item, index) => (
                                    <SwiperSlide key={item.id} className=''>
                                        <img className='rounded-lg object-cover h-full w-full' src={item?.imageUrl} alt="" />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                            <Swiper
                                onSwiper={setThumbsSwiper}
                                loop={true}
                                spaceBetween={0}
                                slidesPerView={4}
                                freeMode={true}
                                watchSlidesProgress={true}
                                modules={[FreeMode, Navigation, Thumbs]}
                                className='h-[90px] bg-slate-100 rounded-lg mt-2'
                            >
                                {data.images?.map((item, index) => (
                                    <SwiperSlide
                                        key={item.id}
                                        className={`px-1 py-1 cursor-pointer ${activeIndex === index ? "border-2 border-blue-500 rounded-lg" : ""
                                            }`}
                                        onClick={() => thumbsSwiper?.slideTo(index)} // Đồng bộ active
                                    >
                                        <img src={item?.imageUrl} alt="" className="rounded-lg object-cover h-full w-full" />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </Col>
                    </Row>
                </Form>
                <Row
                    className='bg-white px-3 py-3 rounded-lg mb-[20px]'
                >
                    <Row className='w-full border-b-[2px] mb-2'>
                        <h1 className='text-[24px] font-medium'>Thông tin chi tiết</h1>
                    </Row>
                    <Col span={12} className='w-full'>
                        <h3 className='text-[18px] font-normal text-black mb-2'>Số lượng trong kho</h3>
                        <TableGenerComponent columns={columnsQuantity} data={data.ingredientQuantities} pagination={null} />
                    </Col>
                    <Col span={12}>
                        <h3 className='text-[18px] font-normal text-black mb-2'>Mô tả sản phẩm</h3>
                        <div className='h-full'>
                            <p className='text-[16px] text-[#747474] font-normal mb-2' >Mã sản phẩm: <strong className='ml-6 text-black'>{data.ingredientCode}</strong></p>
                            <p className='text-[16px] text-[#747474] font-normal mb-2'>Danh mục sản phẩm:
                                <strong className='ml-6 text-black hover:text-blue-600 hover:underline'>
                                    <Link>{data.category?.categoryName}</Link>
                                </strong>
                            </p>
                            <p className='text-[16px] text-[#747474] font-normal mb-2'>Mã sản phẩm: <strong className='ml-6 text-black'>{data.ingredientCode}</strong></p>
                            <p className='text-[16px] text-[#747474] font-normal mb-2'>Trọng lượng trên một bịch: <strong className='ml-6 text-black'>{data.weightPerBag} {Product.unit}</strong></p>
                            <p className='text-[16px] text-[#747474] font-normal mb-2'>Số lượng trong một thùng: <strong className='ml-6 text-black'>{data.quantityPerCarton}</strong></p>
                            <p className='text-[16px] text-[#747474] font-normal mb-2'>Hạng sử dụng: <strong className='ml-[100px] text-black'>{data.expiredDate}</strong></p>
                            <p className='text-[16px] text-[#747474] font-normal mb-2'>Một số mô tả khác: <strong className='ml-[100px] text-black'>{data.description}</strong></p>
                        </div>
                    </Col>
                </Row>
            </div >
        </>
    )
}

export default ProductDetail