import { Icon } from '@iconify/react/dist/iconify.js'
import { Col, Row } from 'antd'
import React from 'react'

const Footer = () => {
  return (
    <footer className='content bg-slate-200'>
      <Row className='container'>
        <Col span={6} className='px-1 pl-0'>
          <div className='w-[300px]'>
            <h3 className='text-lg font-medium text-black'>Về chúng tôi</h3>
            <p className='text-2xl font-medium text-black mt-4'>Babo<strong className='text-[#EF2A39]'>Station</strong></p>
            <p className='text-sm font-medium text-[#8a8888] flex mt-3'>
              <Icon icon="mdi:address-marker" width="24" height="24" />
              <span className='block ml-1 text-sm'><strong>Địa chỉ: </strong> TT16 Tam đảo, Phường 15, Quận 1, TP Hồ Chí Minh, Việt nam</span>
            </p>
            <p className='text-sm font-medium text-[#8a8888] flex mt-3'>
              <Icon icon="mdi-light:phone" width="16" height="18" />
              <span className='block ml-1 text-sm'><strong>Số điện thoại: </strong> 028.7303.6868</span>
            </p>
            <p className='text-sm font-medium text-[#8a8888] flex mt-3'>
              <Icon icon="ic:round-email" width="18" height="18" />
              <span className='block ml-1 text-sm'><strong>Email: </strong> teo@gmail.com</span>
            </p>
          </div>
        </Col>
        <Col span={6} className='px-1 pl-0'>
          <div className='w-[300px]'>
            <h3 className='text-lg font-medium text-black'>Hỗ trợ khách hàng</h3>
            <p className='text-sm font-medium text-[#8a8888] flex mt-3'>Bảo hành
            </p>
            <p className='text-sm font-medium text-[#8a8888] flex mt-3'>
              Điều khoản & Điều kiện
            </p>
            <p className='text-sm font-medium text-[#8a8888] flex mt-3'>
              Chính sách bán hàng
            </p>
            <p className='text-sm font-medium text-[#8a8888] flex mt-3'>
              Hướng dẫn mua hàng
            </p>
            <p className='text-sm font-medium text-[#8a8888] flex mt-3'>
              Giao hàng & nhận hàng
            </p>
            <p className='text-sm font-medium text-[#8a8888] flex mt-3'>
              Hướng dẫn đổi trả
            </p>
            <p className='text-sm font-medium text-[#8a8888] flex mt-3'>
              Câu hỏi thường gặp
            </p>
          </div>
        </Col>
        <Col span={6} className='px-1 pl-0'>
          <div className='w-[300px]'>
            <h3 className='text-lg font-medium text-black'>Tìm hiểu</h3>
            <p className='text-sm font-medium text-[#8a8888] flex mt-3'>Giới thiệu
            </p>
            <p className='text-sm font-medium text-[#8a8888] flex mt-3'>
              Khuyến mãi
            </p>
          </div>
        </Col>
        <Col span={6} className='px-1 pl-0'>
          <div className='w-[300px]'>
            <h3 className='text-lg font-medium text-black'>Tìm hiểu</h3>
            <p className='text-sm font-medium text-[#8a8888] flex mt-3'>Giới thiệu
            </p>
            <p className='text-sm font-medium text-[#8a8888] flex mt-3'>
              Khuyến mãi
            </p>
          </div>
        </Col>
      </Row>
    </footer>
  )
}

export default Footer
