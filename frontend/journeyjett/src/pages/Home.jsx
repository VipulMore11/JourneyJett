import React from 'react'
import Navbar from "../components/Navbar"
import bg from "../assets/bg pic.svg"
import Search from "../components/Search"
import rect from "../assets/Rectangle 19.svg"
import Footer from "../components/Footer"
import wildlife from "../assets/Wildlife.jpg"
import adventure from "../assets/adventure.jpg"
import beach from "../assets/beach.jpg"
import hill from "../assets/hill.jpg"
import heritage from "../assets/heritage.jpg"
import pilgrimage from "../assets/Pilgrimage.jpg"

const Home = () => {
    return (
        <>
            <div style={{ backgroundColor: '#051120' }} className='md:h-auto w-screen'>
                {/* <Navbar /> */}
                <div className='w-full'>
                    <img className='relative h-full w-full object-cover' src={bg} alt="bg" />
                    <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-4xl font-bold text-center'>
                        Journey Jett Where Dreams <br /> Take Flight
                    </div>
                </div>
                <div className='relative bg-white bg-opacity-25' style={{ marginTop: '-50px' }}>
                    <div className='grid grid-cols-4  py-5 justify-items-center mx-40 '>
                        <Search title={"From"} type={"text"} size={"text-3xl"} style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)' }} />
                        <Search title={"To"} type={"text"} size={"text-3xl"} />
                        <Search title={"Date"} type={"date"} size={"text-xl"} />
                        <button className='bg-blue-900 w-60 text-white rounded-2xl text-3xl font-bold'>Search</button>
                    </div>
                </div>
                <div className='text-white text-8xl mx-auto mt-48 text-center' >
                    Explore  Top<br />
                    Destinations To Travel<br />
                    Based On Environmental<br />
                    Condition
                </div>
                <div className='text-white text-3xl text-center mt-20 font-thin'>
                    Get professional guidance, practical travel advice, comprehensive destination details, and motivation <br /> from us to plan and reserve your ideal vacation.
                </div>
                <div className='grid grid-cols-3 gap-6 mt-10 mx-40 m-10 justify-items-center'>
                    <img src={wildlife} alt="" className='row-span-1  ' />
                    <img src={adventure} alt="" className='row-span-1 h-full w-full ' />
                    <img src={beach} alt="" className='row-span-1 h-full w-full ' />
                    <img src={hill} alt="" className='row-span-1 h-full w-full ' />
                    <img src={heritage} alt="" className='row-span-1 h-full w-full ' />
                    <img src={pilgrimage} alt="" className='row-span-1 h-full w-full ' />
                </div>
                <div className='flex flex-row mt-40 md:gap-52'>
                    <div className='text-white md:ms-40 '>
                        <h1 className=' text-5xl mb-10'>Best of the week </h1>
                        <h1>We're sharing the latest information on the best places to <br />travel right nowt many countries have opened their doors to <br />tourists in recent weeks.</h1>
                    </div>
                    <div className='flex flex-row gap-8'>
                        <img src={rect} alt="" className='rounded-full h-32 ' />
                        <img src={rect} alt="" className='rounded-full h-32 md:mt-28' />
                        <img src={rect} alt="" className='rounded-full h-32 ' />
                    </div>
                </div>
                <Footer />
            </div>
        </>
    )
}

export default Home
