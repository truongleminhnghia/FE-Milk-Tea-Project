import { Button } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'

const CardRecipeComponent = ({ recipe }) => {
    // Default values if no recipe prop is provided (for demo/fallback)
    // const {
    //     id = 1,
    //     title = "Công thức pha chế trà Lê hồng đào",
    //     image = "/images/recipes/image.png",
    //     createdDate = "01-01-2025",
    //     description = "Trà Lê Hồng Đào không chỉ là một món đồ uống thơm ngon để thưởng thức trong những ngày xuân, mà còn mang lại nhiều ý nghĩa về mặt tinh thần và sức khỏe. Để pha chế được một ly trà hoàn hảo, việc chọn lựa nguyên liệu chất lượng là rất quan trọng."
    // } = recipe || {};

    return (
        <div className='bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 h-full flex flex-col'>
            <div className="relative overflow-hidden rounded-t-lg">
                <img
                    className='w-full h-[180px] object-cover transition-transform duration-500 hover:scale-105'
                    src={recipe?.imageUrl}
                    alt={recipe?.recipeTitle}
                    onError={(e) => {
                        e.target.src = "/images/recipes/image.png"; // Fallback image
                    }}
                />
                <div className="absolute top-3 right-3 bg-[#29aae1] text-white text-xs font-medium px-2 py-1 rounded-full">
                    Công thức
                </div>
            </div>

            <div className='p-4 flex flex-col flex-grow'>
                <h3 className='text-lg font-medium text-gray-800 line-clamp-2 hover:text-[#29aae1] transition-colors mb-2'>{recipe?.recipeTitle}</h3>

                <p className='text-sm text-gray-500 font-normal mb-3 flex items-center'>
                    <span className="mr-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z" />
                            <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z" />
                        </svg>
                    </span>
                    Ngày tạo: <span className="ml-1 text-gray-700">13/8/2233</span>
                </p>

                {/* <p className='line-clamp-3 text-gray-600 text-sm font-normal mb-4 flex-grow'>
                    {description}
                </p> */}

                <Link to={`/cong-thuc/${recipe?.id}`}>
                    <Button
                        className='rounded-full border-[#29aae1] text-[#29aae1] text-sm hover:!bg-[#29aae1] hover:!text-white hover:!border-[#29aae1] transition-all duration-300 flex items-center'
                    >
                        <span className='text-base'>Xem chi tiết</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" className="ml-1">
                            <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z" />
                        </svg>
                    </Button>
                </Link>

            </div>
        </div>
    )
}

export default CardRecipeComponent