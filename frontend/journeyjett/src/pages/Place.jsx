import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Caro from "../components/Caro"

const Place = () => {
    const { id } = useParams();
    const [data, setData] = useState(null);

    useEffect(() => {
        async function getdata() {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/get_places/?id=${id}`);
                setData(response.data);
                console.log(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }

        getdata();
    }, [id]);

    if (!data) {
        return <div>Loading...</div>;
    }

    return (
        <div style={{ backgroundColor: '#051120' }} className='md:h-full w-screen'>
            <div className='pt-32 mx-60 ' style={{ backgroundColor: '#051120' }}>
                <Caro/> 
                <div className='text-white mt-5'>
                    <div className='border-2 border-white rounded'>
                        <div className='mx-12 mt-5'>
                            <h1 className='text-4xl font-bold '>{data.name}</h1>
                            <h1 className='text-xl font-thin my-4 text-gray-400'>{data.country}</h1>
                            <h1 className='text-xl'>{data.info}</h1>
                            <button className='bg-white my-4 text-black h-12 flex items-center p-4 rounded-xl justify-end'>Plan your Trip</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='my-2 border-2 border-white mx-60 text-white rounded'>
                <h1 className=' font-bold text-4xl mx-12 my-4'>Festivals To Watch</h1>
                <div className='grid grid-cols-6 gap-12 text-xl text-white mx-12 mb-4' style={{ display: 'inline-block' }}>
                    {data.festivals.map((festival, index) => (
                        <li key={index} style={{ display: 'list-item', listStyleType: 'disc', marginRight: '10px' }}>{festival.name}</li>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Place;
