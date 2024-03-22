import React, { useContext, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import ExampleContext from '../context/Context';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../axios';

const Profile = () => {
    const [image, setImage] = useState("https://images.unsplash.com/photo-1438761681033-6461ffad8d80?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwyfHxhdmF0YXJ8ZW58MHwwfHx8MTY5MTg0NzYxMHww&ixlib=rb-4.0.3&q=80&w=1080");
    const { isLogin } = useContext(ExampleContext)
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        phone_number: "",
        profile_image: ""
    });

    const handleupdate = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    const submitupdate = async (e) => {
        try {
            await axiosInstance.post(`http://127.0.0.1:8000/update_profile/`, formData);
        } catch (error) {
            console.error("Error:", error);
        }
        setUpdate(true) 
    };
    const navigate = useNavigate()
    useEffect(() => {
        async function getdata() {

            const token = localStorage.getItem("access_token");

            try {
                const res = await axiosInstance.get('http://127.0.0.1:8000/profile/')
                setFormData(res.data)
            }
            catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        getdata();
    }, [])

    const [update, setUpdate] = useState(true)


    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setImage(reader.result);
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const host = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/397014/';
    const [isHovered, setIsHovered] = useState(false);
    const [doneisHovered, donesetIsHovered] = useState(false);



    const thumbStyle = {
        width: 'auto',
        height: '180px',
        background: `url(${host}new-york-city.png) no-repeat center`,
        backgroundSize: 'cover',
        borderRadius: '15px',
        display: 'flex',
        alignItems: 'end',

    };

    const infosStyle = {
        position: 'absolute',
        top: 0,
        background: '#fff',
        right: isHovered ? '0' : '-100%',
        width: '30%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        transition: '.4s .15s cubic-bezier(.17,.67,.5,1.03)',
    };
    const doneinfosStyle = {
        position: 'absolute',
        top: 0,
        background: '#fff',
        right: doneisHovered ? '0' : '-100%',
        width: '30%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        transition: '.4s .15s cubic-bezier(.17,.67,.5,1.03)',
    };


    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };
    const donehandleMouseEnter = () => {
        donesetIsHovered(true);
    };

    const donehandleMouseLeave = () => {
        donesetIsHovered(false);
    };

    const fileInputRef = useRef(null);

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };
    console.log("image is",image)

    return (
        <div className='text-white h-auto mx-60'>
            <div className='h-auto rounded-xl p-9 my-12' style={{ backgroundColor: '#101c34', display: 'flex' }}>
                <div className="px- flex justify-center flex-col">
                    <img
                        src={image}
                        className="w-60 h-60 mx-20 my-8 object-center object-cover rounded-full transition-all duration-500 delay-500 transform"
                        alt="Profile Image"
                    />
                    <label htmlFor="image"><input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleImageChange}
                        onChangeCapture={() => { console.log('Changed value') }}
                        style={{ display: 'none', margin: 'auto', marginTop: '10px' }}
                    /></label>
                    <button className='bg-gray-600 p-3' id='image' onClick={handleButtonClick}>Data</button>
                </div>
                <div className="p-2 flex flex-col  flex-grow">
                    <h1 className="text-gray-600 dark:text-gray-200 font-bold" style={{ fontSize: "65px", fontFamily: 'Josefin Sans, sans-serif' }}>
                        About me
                    </h1>
                    <div className='my-5'>
                        <label htmlFor="name" className='mb-3 block text-base font-light text-white' style={{ fontSize: "30px" }}>
                            Username
                        </label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={(e)=>{handleupdate(e)}}
                            id="name"
                            placeholder="Full Name"
                            disabled={update ? true : false}
                            className={`  w-full rounded-md border border-[#e0e0e0] bg-[#D9D9D9] py-3 px-6 text-base font-medium ${update ? 'text-[#6B7280]' : 'text-black'}  outline-none focus:border-[#6A64F1] focus:shadow-md`}
                        />

                    </div>
                    <div className='my-5'>
                        <label htmlFor="email" className="mb-3 block text-base font-light text-white" style={{ fontSize: "30px" }}>
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            // onChange={(e)=>{handleupdate(e)}}
                            id="email"
                            placeholder="email"
                            disabled={true}
                            className={` w-full rounded-md border border-[#e0e0e0] bg-[#D9D9D9] py-3 px-6 text-base font-medium text-[#6B7280]  outline-none focus:border-[#6A64F1] focus:shadow-md`}
                        />
                    </div >
                    <div className='my-5'>
                        <label htmlFor="mobile" className="mb-3 block text-base font-light text-white" style={{ fontSize: "30px" }}>
                            Mobile Number
                        </label>
                        <input
                            type="number"
                            name="phone_number"
                            id="mobile"
                            value={formData.phone_number}
                            onChange={(e)=>{handleupdate(e)}}
                            placeholder="Enter your mobile number"
                            disabled={update ? true : false}
                            className={` w-full rounded-md border border-[#e0e0e0] bg-[#D9D9D9] py-3 px-6 text-base font-medium ${update ? 'text-[#6B7280]' : 'text-black '}  outline-none focus:border-[#6A64F1] focus:shadow-md`}
                        />
                    </div>
                    <div className="mt-8 flex justify-end">
                        {update ?
                            <button className="bg-teal-500 text-black px-10 py-3 rounded-full hover:bg-teal-700 dark:bg-[#54E6E6] dark:text-dark dark:hover:bg-teal-900 font-bold" onClick={() => { setUpdate(false) }}>Update Profile</button> :
                            <button className="bg-teal-500 text-black px-10 py-3 rounded-full hover:bg-teal-700 dark:bg-[#54E6E6] dark:text-dark dark:hover:bg-teal-900 font-bold" onClick={() => { submitupdate() }}>SAVE</button>
                        }

                    </div>
                </div>
            </div>

            <div className='h-auto rounded-xl p-9 my-12' style={{ backgroundColor: '#101c34' }}>
                <h1 className='lg:text-6xl text-3xl font-bold'>Saved Trips</h1>
                <div className='relative'>
                    <article className="card my-6 " onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                        <div className="thumb" style={{ ...thumbStyle, position: 'relative' }}>
                            <div style={{ display: "flex" }}>
                                <div className='p-2 fill-grow w-100'>
                                    <div className='mx-10  text-white font-bold' style={{ fontSize: "45px", fontFamily: 'Josefin Sans, sans-serif' }}>
                                        Dona paula
                                    </div>
                                </div>
                                <div className="flex-col" style={infosStyle}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', height: '100%' }}>
                                        <button className="font-bold " style={{ width: '50%', height: '100%', backgroundColor: '#3DCC3A', color: '#000', fontSize: "45px", fontFamily: 'Josefin Sans, sans-serif' }}>Done</button>
                                        <button className="font-bold" style={{ width: '50%', height: '100%', backgroundColor: '#E81B1B', color: '#000', fontSize: "45px", fontFamily: 'Josefin Sans, sans-serif' }}>Delete</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </article>
                </div>
            </div>
            <div className='h-auto rounded-xl p-9 my-12' style={{ backgroundColor: '#101c34' }}>
                <h1 className='lg:text-6xl text-3xl font-bold'>Done Trips</h1>
                <div className='relative'>
                    <article className="card my-6 " onMouseEnter={donehandleMouseEnter} onMouseLeave={donehandleMouseLeave}>
                        <div className="thumb" style={{ ...thumbStyle, position: 'relative' }}>
                            <div style={{ display: "flex" }}>
                                <div className='p-2 fill-grow w-100'>
                                    <div className='mx-10  text-white font-bold' style={{ fontSize: "45px", fontFamily: 'Josefin Sans, sans-serif' }}>
                                        Dona paula
                                    </div>
                                </div>
                                <div className="flex-col" style={doneinfosStyle}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', height: '100%' }}>
                                        <button className="font-bold" style={{ width: '100%', height: '100%', backgroundColor: '#1B54E8', color: '#000', fontSize: "45px", fontFamily: 'Josefin Sans, sans-serif' }}>Add review</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </article>
                </div>
            </div>
        </div>
    );
}

export default Profile;
