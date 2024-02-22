import React from 'react'
import footer from "../assets/gooter.svg"

const Footer = () => {
  return (
    <div className=' border-t-2 mt-20 border-white h-auto '>
      <div className='flex flex-row mx-36 my-24 gap-96 '>
        <h1 className='text-white text-4xl'>journey jett</h1>
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
      <div>
        <img src={footer} alt="" className='w-full' />
      </div>
    </div>
  )
}

export default Footer
