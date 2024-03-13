import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Place_card from '../components/Place_card'

const Explore = () => {

    const [data, setData] = useState([])

    useEffect(() => {
        async function getdata() {
            try {
                const response = await axios.get('http://127.0.0.1:8000/get_places/');
                setData(response.data)
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }

        getdata();
    }, []);

    return (
        <div className=' h-auto w-100 mt-3 mx-20'>
            <div className='grid grid-cols-8 gap-5 mx-4'>
                <div className='lg:col-span-2 hidden lg:block rounded-xl p-3' style={{ backgroundColor: '#081b33' }}>
                    <h1 className='text-white font-bold mt-4 text-2xl'>Filter</h1>
                    <div className=' text-white rounded mt-4 p-6 ' >
                        <div className='flex flex-row gap-4 items-center my-3'><input type="checkbox" id='trending' className='size-4' /> <label htmlFor='trending' className='text-xl'>Trending</label></div>
                        <div className='flex flex-row gap-4 items-center my-3'><input type="checkbox" id='adventure' className='size-4' /> <label htmlFor='adventure' className='text-xl'>Adventure Tours</label></div>
                        <div className='flex flex-row gap-4 items-center my-3'><input type="checkbox" id='Beach' className='size-4' /> <label htmlFor='Beach' className='text-xl'>Beach Tours</label></div>
                        <div className='flex flex-row gap-4 items-center my-3'><input type="checkbox" id='heritage' className='size-4' /> <label htmlFor='heritage' className='text-xl'>Heritage Tours</label></div>
                        <div className='flex flex-row gap-4 items-center my-3'><input type="checkbox" id='pilgrim' className='size-4' /> <label htmlFor='pilgrim' className='text-xl'>Pilgrimage Tours</label></div>
                    </div>
                </div>
                <div className='grid grid-cols-3 gap-5 lg:col-span-6 col-span-5 rounded-xl'>
                    {data.map((d) => (
                        <div key={d.id}><Place_card place={d.id} img={d.images[0]?.places_image} title={d.name} desc={d.info} city={d.city} state={d.state}/></div>
                    ))}


                    {/* {data && data.map(destination => (
                        <Link to={`/places/${destination.id}`} key={destination.id}>
                            <div className='border-2 h-32 m-9 flex flex-row'>
                                {destination.images && destination.images.length > 0 && (
                                    <img src={`http://127.0.0.1:8000${destination.images[0].places_image}`} alt="" className='items-center m-4' style={{ height: '90px', width: '120px' }} />
                                )}
                                <div className='mt-5 ms-5'>
                                    <h1 className='text-white font-bold mb-2'>{destination.name}</h1>
                                    <h1 className='text-white'>{destination.info}</h1>
                                </div>
                            </div>
                        </Link>
                    ))} */}

                </div>
            </div>

        </div>
    )
}

export default Explore
