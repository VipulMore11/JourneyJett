import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Event_caro from '../components/Event_caro'
import axios from 'axios'
import { IoLocationOutline } from "react-icons/io5";
import { IoTimeOutline } from "react-icons/io5";
import Cast_caro from "../components/Cast_caro"

const Events = () => {
  const { id } = useParams()

  function truncateString(str, num) {
    if (str?.length <= num) {
      return str
    }
    return str?.slice(0, num) + '...'
  }
  const [data, setData] = useState([])
  const [reviews, setReviews] = useState('20')
  const [rating, setRating] = useState("4.0")
  const [readmore, setReadmore] = useState(true)

  useEffect(() => {
    async function getdata() {
      try {
        const res = await axios.get('http://127.0.0.1:8000/get_event/')
        setData(res.data)
        console.log(res.data)
      }
      catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    getdata()
  }, [])
  return (
    <div className='md:h-full xl:mx-40'>
      <div className='md:mx-20 mx-4 '>
        <h1 className='lg:text-7xl sm:text-5xl text-3xl font-bold text-white my-7'>{data[0]?.name}</h1>
        <div className='md:p-10 p-4 rounded-2xl' style={{ backgroundColor: '#081b33' }}>
          <Event_caro />
          <div className='text-white mt-5'>
            <div className='mt-5'>
              <div className='my-5 flex flex-row items-center gap-3 text-2xl text-gray-500'>
                <IoLocationOutline className='size-10' />
                <h1>{data[0]?.location}</h1>
                <IoTimeOutline className='size-10'/>
                <h1>{data[0]?.timing}</h1>
              </div>
              <h1 className='md:text-5xl text-4xl'>Description</h1>
              <h1 className='md:text-xl text-base font-thin my-4 text-gray-400'>{data?.country}</h1>
              <h1 className='md:text-xl text-base'>{readmore ? truncateString(data[0]?.info, 800) : data[0].info} {readmore ? <button onClick={() => { setReadmore(!readmore) }} className='lg:text-2xl text-xl font-bold'>Read more</button> : ""}</h1>
            </div>
          </div>
        </div>
        <div className='rounded-2xl my-7 px-10 py-5' style={{ backgroundColor: '#081b33'}}>
          <h1 className='text-5xl text-white mb-5'>Cast </h1>
          <Cast_caro />
        </div >
        <div className='my-7 p-10 text-white rounded-2xl ' style={{ backgroundColor: '#081b33' }}>
          <h1 className='font-bold text-4xl my-4'>Traveller's Review</h1>
          <div className='flex flex-row gap-60'>
            <div className='text-3xl my-3'>
              <h1 className='font-thin text-gray-500'>Total Reviews</h1>
              <h1>{reviews}</h1>
              <h1 className='font-thin text-gray-500 mt-6'>Average Rating</h1>
              <h1>{rating}</h1>
            </div>
            <div className='flex flex-row gap-20'>
              <div className='bg-white w-1 rounded-2xl h-full'></div>
              <div className='grid grid-cols-2 gap-2'>
                <h1 className='h-40 w-96 col-span-1 rounded-2xl p-6' style={{ backgroundColor: '#b6b6b6' }}></h1>
                <h1 className='bg-gray-300 h-100 w-96 col-span-1 rounded-2xl' style={{ backgroundColor: '#b6b6b6' }}></h1>
                <h1 className='bg-gray-300 h-40 w-96 col-span-1 rounded-2xl' style={{ backgroundColor: '#b6b6b6' }}></h1>
                <h1 className='bg-gray-300 h-100 w-96 col-span-1 rounded-2xl' style={{ backgroundColor: '#b6b6b6' }}></h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Events