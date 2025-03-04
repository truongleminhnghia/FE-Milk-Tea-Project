import React, { useEffect } from 'react'
import SwiperSliderComponent from '../../components/SwipperComponents/SwiperSliderComponent'
import { callBackApi } from '../../services/authenticate.service';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const dispath = useDispatch();
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");

    console.log("code: ", code);
    const callBackLoginGoogle = async () => {
      const params = {
        code: code,
        type_login: "LOGIN_GOOGLE"
      }
      const res = await callBackApi(params, dispath, navigate);
    }

    callBackLoginGoogle();
  }, []);
  return (
    <div>
      <SwiperSliderComponent />
    </div>
  )
}

export default Home
