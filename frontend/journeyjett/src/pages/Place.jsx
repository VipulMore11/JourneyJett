import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Caro from "../components/Caro"
import { FaBookmark } from "react-icons/fa";
import { CiBookmark } from "react-icons/ci";
import axiosInstance from '../axios';
import Recommendation from '../components/Recommendation';

const Place = () => {
    const { id } = useParams()
    const [data, setData] = useState(null)
    const [Bookmark, setBookmark] = useState(false)
    const [reviews, setReviews] = useState('20')
    const [rating, setRating] = useState("4.0")
    const [readmore, setReadmore] = useState(true)
    const [forecast, setForecast] = useState([])
    const [saved, setSaved] = useState('')

    useEffect(() => {
        async function getdata() {
            try {
                const response = await axiosInstance.get(`http://127.0.0.1:8000/get_places/?id=${id}`);
                setData(response.data);
                console.log(data.location[0])
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }

        getdata();
    }, [id]);

    useEffect(() => {
        async function getWeatherData() {
            try {
                if (!data || !data.location) {
                    return;
                }
                const res = await axios.get(`http://api.weatherapi.com/v1/forecast.json?key=bc0f0dcb734749ecaa1145032242303&q=${data.location[0]},${data.location[1]}&days=5`)
                setForecast(res.data.forecast.forecastday)
            } catch (error) {
                console.error("Error fetching weather data:", error);
            }
        } 
        getWeatherData();
    }, [data]);
    

    useEffect(() => {
        async function getdata() {
            try {
                const res = await axios.get('http://127.0.0.1:8000/get_saved_places/', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('access_token')}`
                    }
                });
                // console.log("saved", res.data);
                const savedPlace = res.data.find(place => place.id === id);
                if (savedPlace) {
                    setSaved(savedPlace.saved);
                } else {
                    setSaved(false);
                }
            } catch (error) {
                console.error("Error fetching apna data:", error);
            }
        }
        getdata();
    }, [id]);
    // console.log("issaved?",saved)
    
    

    const handleBookmark = () => {
        axiosInstance.post(`http://127.0.0.1:8000/saved_places/?id=${id}`)
        if (Bookmark == false) {
            setBookmark(true);
        }
        else {
            setBookmark(false);
        }
    }

    function truncateString(str, num) {
        if (str.length <= num) {
            return str
        }
        return str.slice(0, num) + '...'
    }

    if (!data) {
        return <div className='text-white'>Loading...</div>;
    }

    return (
        <>
            <div className='md:h-full xl:mx-40'>
                <div className='md:mx-20 mx-4 '>
                    <h1 className='lg:text-7xl sm:text-5xl text-3xl font-bold text-white my-7'>{data.name}</h1>
                    <div className='md:p-10 p-4 rounded-2xl' style={{ backgroundColor: '#081b33' }}>
                        <Caro />
                        <div className='text-white mt-5'>
                            <div className='mt-5'>
                                <h1 className='md:text-7xl text-4xl'>Description</h1>
                                <h1 className='md:text-xl text-base font-thin my-4 text-gray-400'>{data.country}</h1>
                                <h1 className='md:text-xl text-base'>{readmore ? truncateString(data.info, 800) : data.info} {readmore ? <button onClick={() => { setReadmore(!readmore) }} className='lg:text-2xl text-xl font-bold'>Read more</button> : ""}</h1>
                                <div className='flex justify-between mt-5'>
                                    <button onClick={handleBookmark}>{Bookmark ? <FaBookmark className='size-14' /> : <CiBookmark className='size-14' />}</button>
                                    <button className='bg-yellow-400 my-4 text-black font-bold h-12 flex items-center p-4 rounded-xl'>Add to Plan</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='my-7 p-10 text-white rounded-2xl' style={{ backgroundColor: '#081b33' }}>
                        <h1 className=' font-bold text-4xl my-4'>Forecast</h1>
                        <div className=' grid grid-cols-5 text-xl gap-4 text-white mx-12 mb-4' >
                            {forecast && forecast.map((d, i) => (
                                <div key={i} className='flex justify-center items-center flex-col' >
                                    <h1 className='text-base text-gray-400'>{d.date}</h1>
                                    <img src={d.day.condition.icon} alt="hii" />
                                    <h1>{d.day.condition.text}</h1>
                                    <h5 className='text-gray-400 text-base'>{d.day.avgtemp_c}°C</h5>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className='my-7 p-10 text-white rounded-2xl' style={{ backgroundColor: '#081b33' }}>
                        <h1 className=' font-bold text-4xl my-4'>Festivals To Watch</h1>
                        <div className='grid grid-cols-6 gap-12 text-xl text-white mx-12 mb-4' style={{ display: 'inline-block' }}>
                            {data.festivals.map((festival, index) => (
                                <li key={index} style={{ display: 'list-item', listStyleType: 'disc', marginRight: '10px' }}>{festival.name}</li>
                            ))}
                        </div>
                    </div>
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
                    <div className='my-7 p-10 text-white rounded-2xl' style={{ backgroundColor: '#081b33' }}>
                        <h1 className=' font-bold text-4xl my-4'>Find Best Location On The Basis Of Liking</h1>
                        <div className='grid lg:grid-cols-3 grid-cols-2 gap-3 md:p-12'>
                            <Recommendation />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Place;
