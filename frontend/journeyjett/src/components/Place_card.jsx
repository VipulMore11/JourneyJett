import React from 'react'
import { Link } from 'react-router-dom'
import { FaLocationDot } from "react-icons/fa6";

const Place_card = (props) => {

  function truncateString(str, num) {
    if (str.length <= num) {
      return str
    }
    return str.slice(0, num) + '...'
  }

  return (
    <div className=''>
      <Link to={`/places/${props.place}`}>
        <div className="w-100 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <img className="rounded-t-lg h-60 w-full" src={`http://127.0.0.1:8000${props.img}`} alt="" />
          <div className="p-3">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{props.title}</h5>
            <p className="mb-1 font-normal text-gray-700 dark:text-gray-400">{truncateString(props.desc, 50)}</p>
          </div>
          <div className='m-4 flex flex-row '>
          <FaLocationDot color='white' />
          <h1 className='text-white mx-3'>{props.city}, {props.state}</h1>
          <h1></h1>
          </div>
        </div>
      </Link>
    </div>

  )
}

export default Place_card
