import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import img from "../assets/hill.jpg"

const Explore = () => {

    const [data, setData] = useState('')
    useEffect(() => {
        async function getdata() {
            try {
                const response = await axios.get('http://127.0.0.1:8000/get_places/');
                setData(response.data)
                console.log(response.data)
                console.log(data[0].images[0].places_image)
                console.log(data[0].name)
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }

        getdata();
    }, []);

    return (
        <div style={{ backgroundColor: '#051120' }} className='md:h-screen w-screen'>
            <div className='pt-28'>
                <div className='grid grid-cols-4 gap-5 mx-4'>
                    <div className='border-2 col-span-1'>
                        <h1 className='text-white font-bold mx-3 mt-4 text-2xl'>Filter</h1>
                        <div className='border-2 text-white mx-5 rounded mt-4 p-6'>
                            <div className='flex flex-row gap-6 items-center'><input type="checkbox" /> <h1>Trending</h1></div>
                            <div className='flex flex-row gap-6 items-center'><input type="checkbox" /> <h1>Adventure Tours</h1></div>
                            <div className='flex flex-row gap-6 items-center'><input type="checkbox" /> <h1>Beach Tours</h1></div>
                            <div className='flex flex-row gap-6 items-center'><input type="checkbox" /> <h1>Heritage Tours</h1></div>
                            <div className='flex flex-row gap-6 items-center'><input type="checkbox" /> <h1>Pilgrimage Tours</h1></div>
                        </div>
                    </div>
                    <div className='col-span-3 border-2'>
                        {data && data.map(destination => (
                            <Link to={`/places/${destination.id}`} key={destination.id}>
                                <div className='border-2 h-32 m-9 flex flex-row'>
                                    <img src={`http://127.0.0.1:8000${destination.images[0].places_image}`} alt="" className='items-center m-4' style={{ height: '90px', width: '120px' }} />
                                    <div className='mt-5 ms-5'>
                                        <h1 className='text-white font-bold mb-2'>{destination.name}</h1>
                                        <h1 className='text-white'>{destination.info}</h1>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Explore
