import { Button } from 'antd'
import React from 'react'

const CardRecipeComponent = () => {
    return (
        <div className='max-w-[340px] bg-white rounded-lg drop-shadow-md'>
            <img
                className='w-full h-[150px] rounded-tl-[8px] rounded-tr-[8px] object-cover'
                src="../../public/images/recipes/image.png" alt="" />
            <div className='mt-2 px-2'>
                <h3 className='text-base font-medium text-black line-clamp-2'>Công thức pha chế trà Lê hồng đào</h3>
                <p className='text-sm text-[#747373] font-normal mt-2'>Ngày tạo: <span>01-01-2025</span></p>
                <p className='line-clamp-2 text-[#747373] text-sm font-normal mt-2'>Trà Lê Hồng Đào không chỉ là một món đồ uống thơm ngon để thưởng thức trong những ngày xuân, mà còn mang lại nhiều
                    ý nghĩa về mặt tinh thần và sức khỏe. Để pha chế được một ly trà hoàn hảo, việc chọn lựa nguyên liệu chất lượng là rất quan trọng.
                    Với công thức và các mẹo pha chế trên, bạn có thể dễ dàng tạo ra một ly Trà Trà Lê Hồng Đào hoàn hảo tại nhà.
                    Nếu bạn đang tìm kiếm nguyên liệu pha chế giá rẻ gần đây,  hãy nhắn tin cho chúng tôi. Vua An Toàn sẽ tìm hiểu và tư vấn cho bạn kỹ về
                    nguyên liệu - máy móc - dụng cụ dành cho pha chế phù hợp với nhu cầu của bạn
                </p>
                <Button
                    className='my-2 rounded-3xl border-[#EF2A39] text-[#EF2A39] text-sm hover:!bg-[#EF2A39] hover:!text-white hover:!border-none'
                >
                    <span className='!text-base text-[]'>Xem thêm</span>
                </Button>
            </div>
        </div>
    )
}

export default CardRecipeComponent