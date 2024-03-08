import React from 'react'
import goa from '../assets/Goa card.svg'
import kerla from "../assets/Kerla.svg"
import rajastan from "../assets/Rajasthan.svg"
import Guj from "../assets/Guj.svg"

const Discorver = () => {
    return (
        <div className='text-white h-auto mx-11 '>
            <div className='bg-gray-500 w-100 mt-3 mb-28' style={{height:'500px'}}></div>
            <div className='h-auto rounded-xl p-9 my-12' style={{backgroundColor:'#101c34'}}>
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
            <div className='h-auto rounded-xl p-9 my-12' style={{backgroundColor:'#101c34'}}>
                <h1 className='lg:text-6xl text-3xl'>Recommended</h1>
                <div className='grid sm:grid-cols-3 grid-cols-1 lg:gap-5 sm:gap-6 gap-4 my-12 justify-items-center lg:mx-20'>
                        <img className='w-full' src={goa} alt="" />
                        <img className='w-full' src={kerla} alt="" />
                        <img className='w-full' src={rajastan} alt="" />
                </div>
            </div>
            <div className='w-full border-2 border-white h-96'>

            </div>
        </div>
    )
}

export default Discorver
