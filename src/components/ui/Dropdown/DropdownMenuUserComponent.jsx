import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logoutApi } from '../../../services/authenticate.service';
import { toastConfig, handleKeyDown } from '../../../utils/utils';

const DropdownMenuUserComponent = ({ isUser, currentUser }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onEnterPress = () => {
    console.log("Enter key detected in input field!");
  };
  
  const id = currentUser.id;

  const handleLogout = async () => {
    try {
      const res = await dispatch(logoutApi()); // Gọi thunk action
      if (!res) {
        toastConfig("error", res?.message);
      }
      toastConfig("success", "Đăng xuất thành công!");
      navigate('/'); // Điều hướng sau khi đăng xuất
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  useEffect(() => {
    if (!currentUser) {
      console.log("User đã logout, cập nhật giao diện");
      navigate("/login"); // Chuyển hướng về trang đăng nhập nếu user null
    }
  }, [currentUser, navigate]);

  return (
    <div className='relative group'>
      <div className='flex items-center gap-2 text-xs text-white font-semibold cursor-pointer'>
        <img
          className='block h-[40px] w-[40px] rounded-full mr-[8px]'
          src={currentUser.imageUrl ? currentUser.imageUrl : "/images/images/avatar-default.png"}
          alt="avatar" />
        <p className='w-full'>
          <span className='block text-[16px] text-black font-bold uppercase hover:underline'>{currentUser.lastName || currentUser.firstName}</span>
          {!isUser && (
            <span className='block text-[14px] text-[#333] font-medium'>{currentUser.roleName}</span>
          )}
        </p>
      </div>
      <div className='absolute overflow-hidden hidden z-[999999] bg-white w-[150px] group-hover:flex shadow-md rounded top-[40px] -ml-3'>
        <ul className='w-full'>
          <li className='py-2 px-2 hover:bg-gray-300'>
            <Link
              to={`/customer/profile/${id}`}
              className='cursor-pointer text-base text-black hover:text-white'
            >
              Hồ sơ của bạn
            </Link>
          </li>
          <li className='py-2 px-2 hover:bg-gray-300'>
            <Link to="/orders" className='text-base text-black hover:text-white'>Đơn mua</Link>
          </li>
          <li className='py-2 px-2 hover:bg-gray-300'>
            <p
              className='cursor-pointer text-base text-black hover:text-white'
              onClick={handleLogout}
              onKeyDown={(event) => handleKeyDown(event, onEnterPress)}
            >
              Đăng xuất
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DropdownMenuUserComponent;