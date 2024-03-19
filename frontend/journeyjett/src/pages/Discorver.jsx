import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swiper from '../components/Swiper';
import img from '../assets/Cruise-ships-1.png';
import goa from '../assets/Goa card.svg';
import kerla from '../assets/Kerla.svg';
import rajastan from '../assets/Rajasthan.svg';
import Guj from '../assets/Guj.svg';

const Discover = () => {
    const [places, setPlaces] = useState([]);
    const [recommendations, setRecommendations] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                // Fetch places
                const placesRes = await axios.get('http://127.0.0.1:8000/get_places/');
                setPlaces(placesRes.data);

                // Fetch recommendations
                const recommendationsRes = await axios.get('http://127.0.0.1:8000/recommendations/', {
                    headers: {
                        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzEwNzIxNjk3LCJpYXQiOjE3MTA2OTE2OTcsImp0aSI6Ijk3NmIxMTAwNTc0YjQ5NTZhZTY4Mjk3NTRmNTAyMTI0IiwidXNlcl9pZCI6MX0.IMgcFxlrDBjVk3V1HFgtIYAWjwHlJglRdULVb1JkZgQ'
                    }
                });
                setRecommendations(recommendationsRes.data.recommendations);

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        fetchData();
    }, []);

    console.log(places);
    console.log(recommendations);

    return (
        <div className='text-white h-auto mx-11'>
            <div className='pt-12'>
                <div className='p-10 h-60' style={{ backgroundImage: `url(${img})`, filter: 'blur(5px)', webkitBackdropFilter: 'blur(10px)' }}></div>
                <div className='mx-20 mt-10 transform -translate-y-2/4'><Swiper /></div>
            </div>
            <div className='h-auto rounded-xl p-9 ' style={{ backgroundColor: '#101c34' }}>
                <h1 className='lg:text-6xl text-3xl'>Best Destination</h1>
                <div className='grid md:grid-cols-4 grid-cols-2 md:gap-5 gap-4 my-12 sm:mx-5 lg:mx-20 justify-items-center'>
                    <img className='w-full' src={goa} alt="" />
                    <img className='w-full' src={kerla} alt="" />
                    <img className='w-full' src={rajastan} alt="" />
                    <img className='w-full' src={Guj} alt="" />
                    <img className='w-full' src={Guj} alt="" />
                    <img className='w-full' src={Guj} alt="" />
                    <img className='w-full' src={Guj} alt="" />
                    <img className='w-full' src={Guj} alt="" />
                </div>
            </div>
            <div className='h-auto rounded-xl p-9 my-12' style={{ backgroundColor: '#101c34' }}>
                <h1 className='lg:text-6xl text-3xl'>Recommended</h1>
                <div className='grid sm:grid-cols-5 grid-cols-1 lg:gap-5 sm:gap-6 gap-4 my-12 justify-items-center lg:mx-20'>
                    {recommendations.map((recommendation) => {
                        // Find the corresponding place
                        const place = places.find((place) => place.id === recommendation.id);
                        // Check if place is found
                        if (place) {
                            return (
                                <div key={recommendation.id} className="relative grid h-[20rem] w-full max-w-[28rem] flex-col items-end justify-center overflow-hidden rounded-xl bg-white bg-clip-border text-center text-gray-700">
                                    <div className="absolute inset-0 m-0 h-full w-full overflow-hidden rounded-none bg-transparent" style={{ backgroundImage: place && place.places_image ? `url(${place.places_image})` : 'none' }}>

                                        <div className="absolute inset-0 w-full h-full bg-gradient-to-t from-black/80 via-black/50"></div>
                                    </div>

                                    <div className="relative mr-12 my-2">
                                        <h5 className="block text-xl antialiased font-bold leading-snug tracking-normal text-white " style={{ textAlign: 'left' }}>
                                            {place.name}
                                        </h5>
                                        {/* Render other details of the place */}
                                    </div>
                                </div>
                            );
                        } else {
                            return null; // Place not found, return null or handle accordingly
                        }
                    })}
                </div>
            </div>
            <div className='w-full border-2 border-white h-96'></div>
        </div>
    );
};

export default Discover;
