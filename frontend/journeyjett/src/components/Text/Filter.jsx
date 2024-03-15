import React from 'react'

const Filter = (props) => {
  return (
    <div className='rounded-full border-2 w-auto lg:p-2 md:p-2 flex justify-center items-center border-black'>
      <h1 className='md:text-xs'>{props.value}</h1>
    </div>
  )
}

export default Filter
