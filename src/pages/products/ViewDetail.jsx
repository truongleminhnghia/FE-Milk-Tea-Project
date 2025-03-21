import BreadcrumbComponent from '../../components/navigations/BreadcrumbComponent'
import Ingredient from '../../stores/data/ingredient.json'
import { Button, Col, Form, Input, Row, Space, Skeleton, Spin } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { FreeMode, Navigation, Thumbs, Pagination, Autoplay } from 'swiper/modules';
import { Icon } from '@iconify/react/dist/iconify.js';
import CardProductComponent from '../../components/ui/carts/CardProductComponent';
import { useNavigate, useParams } from 'react-router-dom';
import { getByIdService, getByListSerivce } from '../../services/product.service';
import { createServiceOrder } from '../../services/ingredien-product.service';
import { formatCurrencyVND, toastConfig } from '../../utils/utils';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/features/authSlice';
import { createItem } from '../../services/cart.service';

const ViewDetail = () => {
    const currentUser = useSelector(selectUser);
    const { id } = useParams();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false)
    const [listIngredient, setListIngredient] = useState([])
    const [data, setData] = useState({});
    const [calculatedPrice, setCalculatedPrice] = useState(0);
    const breadcrumbItems = [
        { title: 'Trang chủ', href: '/' },
        { title: 'Chi tiết' }
    ];

    // get detail
    const fetchDetail = async (id) => {
        try {
            setIsLoading(true);
            const res = await getByIdService(id);
            if (res?.success || res?.data) {
                setData(res.data)
            }
        } catch (error) {
            console.log("error", error);
        } finally {
            setIsLoading(false);
        }
    }
    useEffect(() => {
        fetchDetail(id)
    }, [id]);


    //get lq
    const fetchIngredient = async () => {
        try {
            setIsLoading(true);
            const res = await getByListSerivce();
            if (res?.data) {
                setListIngredient(res?.data.data);
            }
        } catch (error) {
            console.error("Error: ", error.message);
        } finally {
            setIsLoading(false); // dừng loading sau khi tải xog haowjc gặp lỗi
        }
    }

    useEffect(() => {
        fetchIngredient();
    }, [id]);

    const [form] = Form.useForm();
    const [selectedProductType, setSelectedProductType] = useState('');
    const [activeIndex, setActiveIndex] = useState(0);

    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [quantity, setQuantity] = useState(0);

    const handlePlus = () => {
        // Find the selected product type's max quantity
        const selectedType = data.ingredientQuantities?.find(
            item => item.productType === selectedProductType
        );
        
        if (selectedType && quantity + 1 > selectedType.quantity) {
            toastConfig("error", `Số lượng vượt quá giới hạn (${selectedType.quantity}) cho loại ${selectedProductType}`);
            return;
        }
        
        setQuantity(quantity + 1);
        form.setFieldsValue({ quantity: quantity + 1 });
    }
    const handleMinus = () => {
        if (quantity > 0) {
            const newQuantity = Math.max(0, quantity - 1);
            setQuantity(newQuantity);
            form.setFieldsValue({ quantity: newQuantity });
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

    const calculateTotalPrice = (productType, quantity) => {
        const currentPrice = data.isSale ? data.pricePromotion : data.priceOrigin;
        if (productType === "Thung") {
            return currentPrice * quantity * data.quantityPerCarton;
        } else {
            return currentPrice * quantity;
        }
    };

    useEffect(() => {
        if (selectedProductType && quantity > 0) {
            const price = calculateTotalPrice(selectedProductType, quantity);
            setCalculatedPrice(price);
        } else {
            setCalculatedPrice(0);
        }
    }, [selectedProductType, quantity, data]);

    const onSubmit = async () => {
        try {
            const values = form.getFieldsValue();
            if (selectedProductType === '') {
                form.setFields([{ name: 'productType', errors: ['Vui lòng chọn loại sản phẩm'] }]);
                return;
            }
            if (quantity === 0) {
                form.setFields([{ name: 'quantity', errors: ['Vui lòng chọn số lượng'] }]);
                return;
            }
            const selectedType = data.ingredientQuantities?.find(
                item => item.productType === selectedProductType
            );
            
            if (selectedType && values.quantity > selectedType.quantity) {
                toastConfig("error", `Số lượng vượt quá giới hạn (${selectedType.quantity}) cho loại ${selectedProductType}`);
                return;
            }
            const totalPrice = calculateTotalPrice(selectedProductType, values.quantity);
            
            const model = [
                {
                    quantity: values.quantity,
                    productType: selectedProductType,
                    ingredientId: id,
                    totalPrice: totalPrice
                }
            ];
            
            console.log('model', model);
            const response = await createServiceOrder(model);
            if (response?.success || response?.data) {
                toastConfig("success", "Đặt hàng thành công");
                navigate("/order-history");
            } else {
                toastConfig("error", response?.message || "Đặt hàng thất bại");
            }
        } catch (error) {
            console.log("error", error);
            toastConfig("error", error?.message || "Đã xảy ra lỗi khi đặt hàng");
        }
    };

    const addToCart = async () => {
        try {
            if (currentUser == null) {
                navigate("/login");
                return;
            }
            const values = form.getFieldsValue();
            if (selectedProductType === '') {
                form.setFields([{ name: 'productType', errors: ['Vui lòng chọn loại sản phẩm'] }]);
                return;
            }
            if (quantity === 0) {
                form.setFields([{ name: 'quantity', errors: ['Vui lòng chọn số lượng'] }]);
                return;
            }
            const selectedType = data.ingredientQuantities?.find(
                item => item.productType === selectedProductType
            );
            
            if (selectedType && values.quantity > selectedType.quantity) {
                toastConfig("error", `Số lượng vượt quá giới hạn (${selectedType.quantity}) cho loại ${selectedProductType}`);
                return;
            }
            const totalPrice = calculateTotalPrice(selectedProductType, values.quantity);
            
            const model = {
                accountId: currentUser.id,
                quantity: values.quantity,
                ingredientId: id,
                productType: selectedProductType,
                totalPrice: totalPrice
            }
            console.log("model", model)

            const response = await createItem(model);
            if (response?.success || response?.data) {
                toastConfig("success", "Thêm giỏ hàng thành công")
            } else {
                toastConfig("error", response?.message || "Thêm giỏ hàng thất bại")
            }
        } catch (error) {
            console.error("Error adding to cart:", error);
            toastConfig("error", error?.message || "Đã xảy ra lỗi khi thêm vào giỏ hàng")
        }
    };
    return (
        <>
            <div className='container'>
                <BreadcrumbComponent items={breadcrumbItems} />
            </div>
            {isLoading ? (
                <div className='container bg-white rounded-lg py-8 mt-4'>
                    <Row gutter={[24, 24]}>
                        <Col span={12}>
                            <Skeleton.Image className='!w-full !h-[450px]' active />
                            <Row className='mt-2' gutter={[8, 8]}>
                                {[1, 2, 3, 4].map((item) => (
                                    <Col span={6} key={item}>
                                        <Skeleton.Image className='!w-full !h-[90px]' active />
                                    </Col>
                                ))}
                            </Row>
                        </Col>
                        <Col span={12}>
                            <Skeleton active paragraph={{ rows: 4 }} />
                            <Skeleton active paragraph={{ rows: 3 }} className='mt-6' />
                            <Skeleton active paragraph={{ rows: 2 }} className='mt-6' />
                            <Row className='mt-8' gutter={[16, 16]}>
                                <Col span={12}>
                                    <Skeleton.Button active block className='!h-[45px]' />
                                </Col>
                                <Col span={12}>
                                    <Skeleton.Button active block className='!h-[45px]' />
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    
                    {/* Product details skeleton */}
                    <div className='mt-4 py-6 px-4 bg-white rounded-lg'>
                        <Skeleton active paragraph={{ rows: 6 }} />
                    </div>
                    
                    {/* Related products skeleton */}
                    <div className='mt-4 py-6 px-4 bg-white rounded-lg'>
                        <Skeleton active paragraph={{ rows: 1 }} />
                        <Row className='mt-4' gutter={[16, 16]}>
                            {[1, 2, 3, 4, 5].map((item) => (
                                <Col span={4} key={item}>
                                    <Skeleton.Image className='!w-full !h-[180px]' active />
                                    <Skeleton active paragraph={{ rows: 2 }} className='mt-2' />
                                </Col>
                            ))}
                        </Row>
                    </div>
                    
                    {/* Reviews skeleton */}
                    <div className='mt-4 py-6 px-4 bg-white rounded-lg'>
                        <Skeleton active paragraph={{ rows: 3 }} />
                    </div>
                </div>
            ) : (
                <>
                    <Row className='container bg-white rounded-lg h-[550px] mt-4'>
                        <Col span={12} className='!h-full'>
                            {data?.images && data.images.length > 0 ? (
                                <>
                                    <Swiper
                                        className='h-[450px]'
                                        loop={data.images.length > 1}
                                        spaceBetween={0}
                                        slidesPerView={1}
                                        navigation={true}
                                        autoplay={{
                                            delay: 2500,
                                            disableOnInteraction: false,
                                        }}
                                        thumbs={thumbsSwiper ? { swiper: thumbsSwiper } : undefined}
                                        modules={[Navigation, Thumbs, FreeMode, Autoplay, Pagination]}
                                        onSlideChange={swiper => {
                                            if (swiper) {
                                                setActiveIndex(swiper.realIndex);
                                            }
                                        }}
                                    >
                                        {data.images.map((item, index) => (
                                            <SwiperSlide key={item.id || `image-${index}`}>
                                                <img 
                                                    className='rounded-lg object-cover h-full w-full' 
                                                    src={item.imageUrl} 
                                                    alt={`Product image ${index + 1}`} 
                                                />
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>
                                    
                                    <Swiper
                                        onSwiper={setThumbsSwiper}
                                        loop={data.images.length > 1}
                                        spaceBetween={10}
                                        slidesPerView={4}
                                        freeMode={true}
                                        watchSlidesProgress={true}
                                        modules={[FreeMode, Navigation, Thumbs]}
                                        className='h-[90px] bg-slate-100 rounded-lg mt-2'
                                    >
                                        {data.images.map((item, index) => (
                                            <SwiperSlide 
                                                key={item.id || `thumb-${index}`} 
                                                className={`px-1 py-1 cursor-pointer ${activeIndex === index ? "border-2 border-blue-500 rounded-lg" : ""}`}
                                            >
                                                <img 
                                                    src={item.imageUrl} 
                                                    alt={`Thumbnail ${index + 1}`} 
                                                    className="rounded-lg object-cover h-full w-full" 
                                                />
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>
                                </>
                            ) : (
                                <div className='h-[450px] w-full bg-slate-100 rounded-lg flex items-center justify-center'>
                                    <p className='text-gray-500'>Không có hình ảnh</p>
                                </div>
                            )}
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
                                        <span className='text-lg font-medium text-[#9b9b9b]'>
                                            {formatCurrencyVND(data?.priceOrigin)}
                                        </span>
                                        {data.isSale && (
                                            <>
                                                <span className='text-lg font-medium text-[#ee4d2d]'>
                                                    {formatCurrencyVND(data?.pricePromotion)}
                                                </span>
                                                <span className='text-base font-normal line-through ml-4 text-[#9b9b9b]'>
                                                    {formatCurrencyVND(data?.priceOrigin)}
                                                </span>
                                            </>
                                        )}
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
                                    {calculatedPrice > 0 && (
                                        <p className='mt-3 flex items-center'>
                                            <span className='text-black text-base font-normal'>Tổng tiền: </span>
                                            <span className='text-lg text-red-500 font-medium ml-3'>
                                                {formatCurrencyVND(calculatedPrice)}
                                            </span>
                                        </p>
                                    )}
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
                                                        
                                                        // Check if current quantity exceeds the max for this type
                                                        if (quantity > item.quantity) {
                                                            const newQuantity = Math.min(item.quantity, 1);
                                                            setQuantity(newQuantity);
                                                            form.setFieldsValue({ quantity: newQuantity });
                                                            if (item.quantity === 0) {
                                                                toastConfig("warning", `Loại ${item.productType} hiện đã hết hàng`);
                                                            } else if (quantity > item.quantity) {
                                                                toastConfig("warning", `Đã điều chỉnh số lượng về ${newQuantity} (tối đa cho loại ${item.productType})`);
                                                            }
                                                        } else if (quantity === 0 && item.quantity > 0) {
                                                            // Set to 1 if current is 0 and stock is available
                                                            setQuantity(1);
                                                            form.setFieldsValue({ quantity: 1 });
                                                        }
                                                    }}
                                                >
                                                    {item.productType} {item.quantity > 0 ? 
                                                        `(Còn ${item.quantity})` : 
                                                        "(Hết hàng)"}
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
                                                onClick={handleMinus} />
                                            <Input
                                                className='!w-[50px] !text-center'
                                                value={quantity}
                                                onChange={(e) => {
                                                    const value = e.target.value;
                                                    if (/^\d+$/.test(value) && Number(value) >= 1) {
                                                        const numValue = Number(value);
                                                        
                                                        // Find the selected product type's max quantity
                                                        const selectedType = data.ingredientQuantities?.find(
                                                            item => item.productType === selectedProductType
                                                        );
                                                        
                                                        if (selectedType && numValue > selectedType.quantity) {
                                                            toastConfig("error", `Số lượng vượt quá giới hạn (${selectedType.quantity}) cho loại ${selectedProductType}`);
                                                            return;
                                                        }
                                                        
                                                        setQuantity(numValue);
                                                        form.setFieldsValue({ quantity: numValue });
                                                    }
                                                }} />
                                            <Button
                                                type="default"
                                                icon={<Icon icon="ic:baseline-plus" />}
                                                onClick={handlePlus} />
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
                                                className='!border-none bg-[#29aae1] w-full text-[#fff] hover:!bg-white hover:!border-[#29aae1] hover:!border-solid hover:!text-[#29aae1] text-lg font-medium'
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
                                    {listIngredient && listIngredient.length > 0 ? (
                                        <Swiper
                                            slidesPerView={5}
                                            spaceBetween={10}
                                            autoplay={{
                                                delay: 2500,
                                                disableOnInteraction: false,
                                            }}
                                            loop={listIngredient.length > 1}
                                            modules={[Pagination, Navigation, Autoplay]}
                                            className="h-[310px]"
                                        >
                                            {listIngredient.map((item, index) => (
                                                <SwiperSlide key={item.id || `related-${index}`}>
                                                    <CardProductComponent item={item} isNew={true} />
                                                </SwiperSlide>
                                            ))}
                                        </Swiper>
                                    ) : (
                                        <div className='w-full h-[200px] bg-slate-100 rounded-lg flex items-center justify-center'>
                                            <p className='text-gray-500'>Không có sản phẩm liên quan</p>
                                        </div>
                                    )}
                                    <Button className='rounded-3xl border-[#EF2A39] text-[#EF2A39] text-sm left-[50%] translate-x-[-50%] hover:!bg-[#EF2A39] hover:!text-white hover:!border-none'>
                                        Xem tất cả
                                        <Icon icon="weui:arrow-filled" width="12" height="24" />
                                    </Button>
                                </Row>
                            </div>
                        </Col>
                    </Row>

                    <Row className='container'>
                        <div className=' mt-10 bg-white px-3 py-3 rounded-lg border-[#747474] w-full'>
                            <Row className=''>
                                <h1 className='text-[24px] font-medium w-full'>Bình luận và đánh giá</h1>
                                <p className='flex gap-3 mt-2 text-[14px] font-normal'>
                                    <span className='block' ><u>4.2</u> sao</span>
                                    <span className='block' ><u>2.4k</u> bình luận</span>
                                </p>
                            </Row>
                            <Row>
                                <Col span={24}>
                                    <div className='flex items-center gap-2 mt-3'>
                                        <img src="/images/images/avatar-default.png" alt="" className='h-[50px] w-[50] rounded-full' />
                                        <div>
                                            <strong>Nguyễn Văn A</strong>
                                            <span className='block'>5 sao</span>
                                            <span className='block'>2025-01-21 13:26</span>
                                        </div>
                                    </div>
                                    <p>Sản phẩm chất lượng qá tốt</p>
                                </Col>
                            </Row>
                        </div>
                    </Row>
                </>
            )}
        </>
    )
}

export default ViewDetail