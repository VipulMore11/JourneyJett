import React, { useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import img1 from "../assets/caro img ship.svg"

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { Navigation, Pagination } from 'swiper/modules';

export default function App() {
  return (
    <>
      <Swiper pagination={true} navigation={true} modules={[Pagination, Navigation]} className="mySwiper text-white rounded-full ">
        <SwiperSlide><img src={img1} alt="hi" /></SwiperSlide>
        <SwiperSlide>Img2</SwiperSlide>
      </Swiper>
    </>
  );
}
