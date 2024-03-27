import React, { useEffect, useState } from 'react';
import bg from "../assets/bg pic.svg";
import rect from "../assets/Rectangle 19.svg";
import wildlife from "../assets/Wildlife.jpg";
import adventure from "../assets/adventure.jpg";
import beach from "../assets/beach.jpg";
import hill from "../assets/hill.jpg";
import heritage from "../assets/heritage.jpg";
import pilgrimage from "../assets/Pilgrimage.jpg";
import { ImCross } from "react-icons/im";
import { FaSearch } from "react-icons/fa";
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { Navigate, useNavigate } from 'react-router-dom';

const Home = () => {

    const navigate = useNavigate()
    const [input, setInput] = useState([]);
    const [inputFilter, setInputFilter] = useState([]);
    const [v1, setV1] = useState("");
    const [focus1, setFocus1] = useState(false);
    const [focus2, setFocus2] = useState(false);
    const [place, setPlace] = useState('');

    const handleInputFocus1 = () => {
        setFocus1(true);
        setFocus2(false);
    };

    const handleInputFocus2 = () => {
        setFocus2(true);
        setFocus1(false);
    };

    useEffect(() => {
        async function getData() {
            try {
                const res = await axios.get('http://127.0.0.1:8000/get_destinations/');
                setInput(res.data);

            } catch (error) {
                console.log(error);
            }
        }
        getData();
    }, []);
    const handleFilter = (value) => {
        const response = input.filter(f => f.name.includes(value));
        setInputFilter(response);
    };

    const handlevalue = (value) => {
        setV1(value);
        console.log("v1:", value); // Log the value here
        navigate('/explore', { state: { v1: value } });
    }

    // Testing 


    // const [islogin, setislogin] = useState(false);
    // const [isuser, setisUser] = useState(false);
    // const [onpage, setPage] = useState('');

    // const getUserInfoFromToken = (token) => {
    //     try {
    //         const decodedToken = jwtDecode(token);
    //         const { user_id } = decodedToken;  // Assuming username and email are stored in the token payload
    //         return { user_id };
    //     } catch (error) {
    //         console.error('Error decoding JWT token:', error);
    //         return null;
    //     }
    // };

    // const token = localStorage.getItem('refresh_token');  // Replace with the actual token
    // const userInfo = getUserInfoFromToken(token)
    // useEffect(() => {
    //     if (userInfo) {
    //         setisUser(userInfo.user_id)
    //         // setisUser(userInfo)
    //     }
    // }, [userInfo])
    // console.log(isuser)

    // useEffect(() => {
    //     const refreshToken = localStorage.getItem('refresh_token');
    //     setislogin(!!refreshToken); // Set true if refreshToken exists, false otherwise
    // }, []);

    return (
        <>
            <div>

                <img className='relative h-full w-full object-cover' src={bg} />
                <div className='absolute     mt-2 top-20 sm:top-1/3  left-1/2 transform -translate-x-1/2  text-white sm:text-6xl font-thin text-center'>
                    Journey Jett Where Dreams <br /> Take Flight
                </div>
            </div>
            <div className=' relative bg-white bg-opacity-25 w-auto ' style={{ marginTop: '-20px' }}>
                <div className='sm:grid grid-cols-4 gap-4 p-2 sm:m-3  h-auto'>
                    <div className='p-5 m-2 bg-white rounded-2xl h-auto'>
                        <div className='text-xl'>From</div>
                        <div>
                            <div className='flex flex-row  rounded-2xl'>
                                <input type="text" className={` w-full h-12 font-bold text-5xl ${focus1 ? "" : ""}`} onFocus={() => handleInputFocus1()} onChange={(e) => handleFilter(e.target.value)} />
                                <button className=' flex justify-center items-center px-3 text-xl pe-5 pt-2' onClick={() => setFocus1(false)}>{focus1 ? <ImCross /> : <FaSearch />}</button>
                            </div>

                        </div>
                    </div>
                    <div className='p-5 m-2 bg-white rounded-2xl h-auto'>
                        <div className='text-xl'>To</div>
                        <div>
                            <div className='flex flex-row  rounded-2xl'>
                                <input type="text" className={` w-full h-12 font-bold text-5xl ${focus2 ? "" : ""}`} onFocus={() => handleInputFocus2()} onChange={e => handleFilter(e.target.value)} />
                                <button className=' flex justify-center items-center px-3 text-xl pe-5 pt-2' onClick={() => setFocus2(false)}>{focus2 ? <ImCross /> : <FaSearch />}</button>
                            </div>

                        </div>
                    </div>
                    <div className='p-7 m-2 bg-white rounded-2xl h-auto'>
                        <div className=' text-xl'>Date</div>
                        <div>
                            <input type="date" className='my-2 w-full h-12 text-bold text-4xl ' />
                        </div>
                    </div>
                    <div className=' m-2 bg-white rounded-2xl h-auto'>
                        <button className='bg-[#295476] w-full  text-white rounded-2xl text-6xl font-bold p-11 h-auto'>Search</button>
                    </div>
                </div>
            </div>
            <div className='text-white sm:text-8xl mt-7 mx-auto sm:mt-48 text-center' >
                Explore Top<br />
                Destinations To Travel<br />
                Based On Environmental<br />
                Condition
            </div>
            <div className='text-white text-xl sm:text-3xl text-center mt-9 sm:mt-20 font-thin'>
                Get professional guidance, practical travel advice, comprehensive destination details, and motivation <br /> from us to plan and reserve your ideal vacation.
            </div>
            <div className='grid sm:grid-cols-3 grid-cols-2 p-12 sm:gap-7 gap-2 mt-5 justify-items-center'>
                <img src={wildlife} alt="" className='row-span-1 rounded-md ' />
                <img src={adventure} alt="" className='row-span-1 h-full w-full rounded-md' />
                <img src={beach} alt="" className='row-span-1 h-full w-full rounded-md' />
                <img src={hill} alt="" className='row-span-1 h-full w-full rounded-md' />
                <img src={heritage} alt="" className='row-span-1 h-full w-full rounded-md' />
                <img src={pilgrimage} alt="" className='row-span-1 h-full w-full rounded-md' />
            </div>
            <div className='grid sm:grid-cols-2 mt-4 sm:mt-40 md:gap-52'>
                <div className='text-white md:ms-40 '>
                    <h1 className=' text-4xl text-center sm:text-5xl mb-10'>Best of the week </h1>
                    <h1 className='text-center text-sm px-9 sm:text-base'>We're sharing the latest information on the best places to <br />travel right nowt many countries have opened their doors to <br />tourists in recent weeks.</h1>
                </div>
                <div className='flex flex-row gap-8 mt-4 justify-center'>
                    <img src={rect} alt="" className='rounded-full sm:h-32 h-20' />
                    <img src={rect} alt="" className='rounded-full sm:h-32 h-20 md:mt-28' />
                    <img src={rect} alt="" className='rounded-full sm:h-32 h-20 ' />
                </div>
            </div>
        </>
    );
};

export default Home;
