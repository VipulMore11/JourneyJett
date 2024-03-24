import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swiper from '../components/Swiper';
import img from '../assets/Cruise-ships-1.png';
import goa from '../assets/Goa card.svg';
import kerla from '../assets/Kerla.svg';
import rajastan from '../assets/Rajasthan.svg';
import Guj from '../assets/Guj.svg';
import Place_card from '../components/Place_card';
import Recommendation from '../components/Recommendation';
const Discover = () => {
    return (
        <div className='text-white h-auto mx-11'>
                <div className='mx-20 my-10 '><Swiper /></div>
            <div className='h-auto rounded-xl p-9 ' style={{ backgroundColor: '#101c34' }}>
                <h1 className='lg:text-6xl text-3xl'>Best Destination</h1>
                <div className='grid md:grid-cols-4 grid-cols-2 md:gap-5 gap-4 my-12 sm:mx-5 lg:mx-20 justify-items-center'>
                    <img className='w-full' src={goa} alt="" />
                    <img className='w-full' src={kerla} alt="" />
                    <img className='w-full' src={rajastan} alt="" />
                    <img className='w-full' src={Guj} alt="" />
                    <img className='w-full' src={Guj} alt="" />
                    <img className='w-full' src={Guj} alt="" />
                    <img className='w-full' src={Guj} alt="" />
                    <img className='w-full' src={Guj} alt="" />
                </div>
            </div>
            <div className='h-auto rounded-xl p-9 my-12' style={{ backgroundColor: '#101c34' }}>
                <h1 className='lg:text-6xl text-3xl'>Recommended</h1>
                <div className='lg:grid lg:grid-cols-3 xl:grid-cols-4 gap-5 flex flex-row overflow-auto md: my-12 justify-items-center lg:mx-20'>
                    <Recommendation showIcon={false}/>
                </div>
            </div>
            <div className='w-full border-2 border-white h-96'></div>
        </div>
    );
};

export default Discover;
