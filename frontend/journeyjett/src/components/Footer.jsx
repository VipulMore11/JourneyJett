import React from 'react'
import footer from "../assets/gooter.svg"

const Footer = () => {
  return (
    <div className=' border-t-2 mt-20 border-white h-auto '>
      <div className='flex md:flex-row flex-col lg:mx-36 mx-20 my-24 xl:gap-96 lg:gap-60 md:gap-32'>
        <h1 className='text-white text-4xl flex justify-center md:justify-start mb-10 md:mb-0'>journey jett</h1>
        <div className='flex flex-row xl:gap-72 lg:gap-20 md:gap-14 gap-10' >
        <div className='flex flex-col text-white text-center '>
            <h1 className='text-2xl font-bold my-2'>Resource</h1>
            <h1>About Us</h1>
            <h1>Article</h1>
        </div>
        <div className='flex flex-col text-white text-center'>
            <h1 className='text-2xl font-bold my-2'>Follow Us</h1>
            <h1>Instagram</h1>
            <h1>Twitter</h1>
        </div>
        </div>
      </div>
      <div>
        <img src={footer} alt="" className='w-full' />
      </div>
    </div>
  )
}

export default Footer
