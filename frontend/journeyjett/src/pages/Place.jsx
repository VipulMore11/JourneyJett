import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Caro from "../components/Caro"
import { FaBookmark } from "react-icons/fa";
import { CiBookmark } from "react-icons/ci";
import axiosInstance from '../axios';
import img from "../assets/Rectangle 19.svg"
import Recommendation from '../components/Recommendation';

const Place = () => {
    const { id } = useParams()
    const [data, setData] = useState(null)
    const [Bookmark, setBookmark] = useState(false)
    const [reviews, setReviews] = useState('20')
    const [rating, setRating] = useState("4.0")

    useEffect(() => {
        async function getdata() {
            try {
                const response = await axiosInstance.get(`http://127.0.0.1:8000/get_places/?id=${id}`);
                setData(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }

        getdata();
    }, [id]);

    const handleBookmark = () => {
        if (Bookmark == false) {
            setBookmark(true);
        }
        else {
            setBookmark(false);
        }
        console.log(Bookmark);
    }

    if (!data) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div className='md:h-full xl:mx-40'>
                <div className='md:mx-20 mx-4 '>
                    <h1 className='lg:text-7xl text-center sm:text-5xl text-3xl font-bold text-white my-7'>{data.name}</h1>
                    <div className='md:p-10 p-4 rounded-2xl' style={{ backgroundColor: '#081b33' }}>
                        <Caro />
                        <div className='text-white mt-5'>
                            <div className='mt-5'>
                                <h1 className='md:text-7xl text-4xl'>Description</h1>
                                <h1 className='md:text-xl text-base font-thin my-4 text-gray-400'>{data.country}</h1>
                                <h1 className='md:text-xl text-base'>{data.info}</h1>
                                <div className='flex justify-between mt-5'>
                                    <button onClick={handleBookmark}>{Bookmark ? <FaBookmark className='size-14' /> : <CiBookmark className='size-14' />}</button>
                                    <button className='bg-yellow-400 my-4 text-black font-bold h-12 flex items-center p-4 rounded-xl'>Add to Plan</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='my-7 p-10 text-white rounded-2xl' style={{ backgroundColor: '#081b33' }}>
                        <div className='justify-center'><h1 className=' font-bold text-2xl md:text-3xl  sm:text-4xl my-4'>Festivals To Watch</h1></div>
                        <div className='grid grid-cols-6 gap-12 text-xl text-white mx-12 mb-4' style={{ display: 'inline-block' }}>
                            {data.festivals.map((festival, index) => (
                                <li key={index} style={{ display: 'list-item', listStyleType: 'disc', marginRight: '10px' }}>{festival.name}</li>
                            ))}
                        </div>
                    </div>
                    <div className='my-7 p-10 text-white rounded-2xl ' style={{ backgroundColor: '#081b33' }}>
                        <h1 className='font-bold text-2xl sm:text-4xl my-4'>Traveller's Review</h1>
                        < div className='grid m-8 gap-4 sm:grid-cols-3 '>
                            <div className='text-3xl my-3 col-span-1 '>
                                <h1 className='font-thin text-gray-500'>Total Reviews</h1>
                                <h1>{reviews}</h1>
                                <h1 className='font-thin text-gray-500 mt-6'>Average Rating</h1>
                                <h1>{rating}</h1>
                            </div>

                            <div className='col-span-2 '>
                                <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
                                    <div className='h-auto w-full rounded-2xl p-6 ' style={{ backgroundColor: '#b6b6b6' }}></div>
                                    <div className='h-auto w-full rounded-2xl p-6 ' style={{ backgroundColor: '#b6b6b6' }}></div>
                                    <div className='h-auto w-full rounded-2xl p-6 ' style={{ backgroundColor: '#b6b6b6' }}></div>
                                    <div className='h-auto w-full rounded-2xl p-6 ' style={{ backgroundColor: '#b6b6b6' }}></div>
                                    <div className='h-auto w-full rounded-2xl p-6 ' style={{ backgroundColor: '#b6b6b6' }}></div>
                                    <div className='h-auto w-full rounded-2xl p-6 ' style={{ backgroundColor: '#b6b6b6' }}></div>
                                    <div className='h-auto w-full rounded-2xl p-6  ' style={{ backgroundColor: '#b6b6b6' }}></div>
                                    <div className='h-auto w-full rounded-2xl p-6  ' style={{ backgroundColor: '#b6b6b6' }}></div>
                                </div>

                            </div>



                        </div>
                    </div>
                    <div className='my-7 p-10 text-white rounded-2xl' style={{ backgroundColor: '#081b33' }}>
                        <h1 className=' font-bold text-2xl text-center sm:text-4xl my-4'>Find Best Location On The Basis Of Liking</h1>
                        <div className='grid grid-cols-3 gap-3 p-12'>
                            <Recommendation />
                        </div>
                    </div>
                </div>
            </div >
        </>
    );
};

export default Place;
