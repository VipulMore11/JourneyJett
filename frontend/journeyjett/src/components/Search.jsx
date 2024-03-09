import React from 'react'

const Search = (props) => {
  return (
    <div className='border-2 lg:w-56 w-40 h-auto flex flex-col bg-white p-3 rounded-xl'>
        <h1 className='text-xl text-gray-500 mb-1'>{props.title}</h1>
        <input type={props.type} className={`lg:h-12 md:h-8 border-2 rounded-xl font-bold ${props.size} border-gray-100 focus:outline-none`} />
    </div>
  )
}

export default Search
