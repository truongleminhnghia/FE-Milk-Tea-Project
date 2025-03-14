import BreadcrumbComponent from '../../components/navigations/BreadcrumbComponent'
import Ingredient from '../../stores/data/ingredient.json'
import { Button, Col, Form, Input, Row, Space } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { FreeMode, Navigation, Thumbs, Pagination, Autoplay } from 'swiper/modules';
import { Icon } from '@iconify/react/dist/iconify.js';
import ListPrdocut from "../../stores/data/list-product.json"
import CardProductComponent from '../../components/ui/carts/CardProductComponent';
import { useParams } from 'react-router-dom';
import { getByIdService } from '../../services/product.service';

const ViewDetail = () => {
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(false)
    const [data, setData] = useState({});
    const breadcrumbItems = [
        { title: 'Trang chủ', href: '/' },
        { title: 'Chi tiết' }
    ];

    const fetchDetail = async (id) => {
        try {
            setIsLoading(true);
            const res = await getByIdService(id);
            if (res?.success || res?.data) {
                setData(res.data)
                setIsLoading(false);
            }
        } catch (error) {
            console.log("error", error);
        }
    }
    useEffect(() => {
        fetchDetail(id)
    }, [id]);

    const [form] = Form.useForm();
    const [selectedProductType, setSelectedProductType] = useState('');
    const [activeIndex, setActiveIndex] = useState(0);

    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [quantity, setQuantity] = useState(0);

    const handlePlus = () => {
        setQuantity(prev => prev + 1);
    }
    const handleMinus = () => {
        if (quantity > 0) {
            setQuantity(prev => prev - 1);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'quantity') {
            if (!/^\d+$/.test(value) && value !== '') return;
            if (Number(value) < 1) return;
        }
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const onSubmit = (values) => {
        console.log('Mua hàng:', { ...values, productType: selectedProductType });
    };

    const addToCart = () => {
        const values = form.getFieldsValue();
        if (selectedProductType === '') {
            form.setFields([{ name: 'productType', errors: ['Vui lòng chọn loại sản phẩm'] }]);
            return;
        }
        if (quantity === 0) {
            form.setFields([{ name: 'quantity', errors: ['Vui lòng chọn số lượng'] }]);
            return
        }
        console.log('Thêm vào giỏ hàng:', { ...values, productType: selectedProductType });
    };
    return (
        <>
            <div className='container'>
                <BreadcrumbComponent items={breadcrumbItems} />
            </div>
            <Row className='container bg-white rounded-lg h-[550px] mt-4'>
                <Col span={12} className='!h-full'>
                    <Swiper
                        className='h-[450px]'
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
                <Col span={12}>
                    <div className='p-4'>
                        <div className='w-full'>
                            <h1 className='text-2xl font-medium uppercase text-black'>{Ingredient.ingredientName}</h1>
                            <p className='flex items-center mt-1'>
                                <span className='flex items-center gap-1'>
                                    <strong className='text-sm underline font-medium mr-1'>4.8</strong>
                                    <Icon icon="fluent-color:star-32" width="24" height="24" />
                                    <Icon icon="fluent-color:star-32" width="24" height="24" />
                                    <Icon icon="fluent-color:star-32" width="24" height="24" />
                                    <Icon icon="fluent-color:star-32" width="24" height="24" />
                                    <Icon icon="fluent-color:star-32" width="24" height="24" />
                                </span>
                                <span className='ml-5 flex items-center gap-3'>
                                    <strong className='text-sm text-black underline'>106</strong>
                                    Đánh giá
                                </span>
                            </p>
                        </div>
                        <div className='mt-4'>
                            <p className='bg-slate-200 p-2 rounded-lg flex items-center'>
                                <span className='text-lg font-medium text-[#ee4d2d]'>
                                    100.000đ
                                </span>
                                <span className='text-base font-normal line-through ml-4 text-[#9b9b9b]'>
                                    110.000đ
                                </span>
                            </p>
                            <p className='mt-3 flex items-center'>
                                <span className='text-black text-base font-normal'>Trạng thái: </span>
                                <span className='text-green-500 bg-green-200 px-2 py-1 rounded-md text-base font-medium ml-3'>{data.ingredientStatus === 'ACTIVE' ? 'Còn hàng' : 'hết hàng'}</span>
                            </p>
                            <p className='mt-3 flex items-center'>
                                <span className=' text-black text-base font-normal'>Thương hiệu: </span>
                                <span className='text-lg text-black font-medium ml-3'>{data.supplier}</span>
                            </p>
                            <p className='mt-3 flex items-center'>
                                <span className=' text-black text-base font-normal'>Mã sản phẩm: </span>
                                <span className='text-lg text-black font-medium ml-3'>{data.ingredientCode}</span>
                            </p>
                        </div>
                        <Form
                            form={form}
                            onFinish={onSubmit}
                            layout='vertical'
                        >
                            <Form.Item
                                label='Loại'
                                name='productType'
                                rules={[{ required: true, message: 'Vui lòng chọn loại sản phẩm' }]}
                            >
                                <div>
                                    {data.ingredientQuantities?.map((item, index) => (
                                        <Button
                                            key={item.id}
                                            className={`mr-2 ${selectedProductType === item.productType ? 'bg-blue-500 text-white' : ''}`}
                                            onClick={() => {
                                                setSelectedProductType(item.productType);
                                                form.setFieldsValue({ productType: item.productType });
                                            }}
                                        >
                                            {item.productType}
                                        </Button>
                                    ))}
                                </div>
                            </Form.Item>

                            <Form.Item
                                label='Số lượng'
                                name='quantity'
                                rules={[{ required: true, message: 'Vui lòng chọn số lượng' }, { type: 'number', min: 1, message: 'Số lượng phải lớn hơn 0' }]}
                            >
                                <Space.Compact >
                                    <Button
                                        type="default"
                                        icon={<Icon icon="ic:baseline-minus" />}
                                        onClick={() => {
                                            const newQuantity = Math.max(1, quantity - 1);
                                            setQuantity(newQuantity);
                                            form.setFieldsValue({ quantity: newQuantity });
                                        }} />
                                    <Input
                                        className='!w-[50px] !text-center'
                                        value={quantity}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            if (/^\d+$/.test(value) && Number(value) >= 1) {
                                                setQuantity(Number(value));
                                                form.setFieldsValue({ quantity: Number(value) });
                                            }
                                        }} />
                                    <Button
                                        type="default"
                                        icon={<Icon icon="ic:baseline-plus" />}
                                        onClick={() => {
                                            setQuantity(quantity + 1);
                                            form.setFieldsValue({ quantity: quantity + 1 });
                                        }} />
                                </Space.Compact>
                            </Form.Item>
                            <Form.Item>
                                <div className='flex gap-1'>
                                    <Button
                                        onClick={addToCart}
                                        className='!border-[#29aae1] w-full text-[#29aae1] hover:!bg-[#29aae1] hover:!text-white hover:border-none text-lg font-medium'
                                        size='large'
                                        icon={<Icon icon="tdesign:cart-add-filled" width="18" height="18" />}>
                                        Thêm vào giỏ hàng
                                    </Button>
                                    <Button
                                        htmlType='submit'
                                        className='!border-none bg-[#29aae1] w-full text-[#fff] hover:!bg-[#29aae1] hover:!text-white hover:border-none text-lg font-medium'
                                        size='large'
                                    >
                                        Mua hàng
                                    </Button>
                                </div>
                            </Form.Item>
                        </Form>
                    </div>
                </Col>
            </Row>
            <Row className='container'>
                <Col span={24}>
                    <div className='bg-white rounded-lg mt-4 p-4'>
                        <h2 className='text-2xl font-medium'>Chi tiết sản phẩm</h2>
                        <p className='mt-3 text-base font-normal'>Danh mục: {Ingredient.category.categoryName}</p>
                        <p className='mt-3 text-base font-normal'>Nhà sản xuất: {Ingredient.supplier}</p>
                        <p className='mt-3 text-base font-normal'>Ngày hết hạn: {Ingredient.expiredDate}</p>
                        <p className='mt-3 text-base font-normal'>Trọng lượng trong một bịch: {Ingredient.weightPerBag} <span>{Ingredient.unit}</span></p>
                        <p className='mt-3 text-base font-normal'>Số lượng trong một thùng: {Ingredient.quantityPerCarton}</p>
                        <p className='mt-3 text-base font-normal'>Loại nguyên liệu: {Ingredient.ingredientType}</p>
                    </div>
                </Col>
            </Row>
            <Row className='container'>
                <Col span={24}>
                    <div className='bg-white rounded-lg mt-4 p-4'>
                        <h2 className='text-2xl font-medium'>Sản phẩm liên quan</h2>
                        <Row className='items-center justify-between mt-5'>
                            <Swiper
                                slidesPerView={5}
                                spaceBetween={10}
                                // pagination={{
                                //   clickable: true,
                                // }}
                                autoplay={{
                                    delay: 2500,
                                    disableOnInteraction: false,
                                }}
                                loop={true}
                                modules={[Pagination, Navigation, Autoplay]}
                                className="h-[310px]"
                            >
                                {ListPrdocut.map((item, index) => (
                                    <SwiperSlide key={item.id}>
                                        <CardProductComponent item={item} isNew={true} />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                            <Button className='rounded-3xl border-[#EF2A39] text-[#EF2A39] text-sm left-[50%] translate-x-[-50%] hover:!bg-[#EF2A39] hover:!text-white hover:!border-none'>
                                Xem tất cả
                                <Icon icon="weui:arrow-filled" width="12" height="24" />
                            </Button>
                        </Row>
                    </div>
                </Col>
            </Row>
        </>
    )
}

export default ViewDetail