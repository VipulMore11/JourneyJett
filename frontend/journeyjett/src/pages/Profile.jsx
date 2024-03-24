import React, { useContext, useEffect, useRef, useState } from 'react'
import ExampleContext from '../context/Context'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../axios'
import axios from 'axios'

const Profile = () => {
    const [image, setImage] = useState("https://images.unsplash.com/photo-1438761681033-6461ffad8d80?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwyfHxhdmF0YXJ8ZW58MHwwfHx8MTY5MTg0NzYxMHww&ixlib=rb-4.0.3&q=80&w=1080")
    const { isLogin } = useContext(ExampleContext)
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        phone_number: "",
        profile_image: ""
    });
    const [saved, setSaved] = useState([])

    const handleupdate = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    const submitupdate = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('username', formData.username);
            formData.append('email', null);
            formData.append('phone_number', formData.phone_number);
            formData.append('profile_image', fileInputRef.current.files[0]);
    
            await axiosInstance.post(`http://127.0.0.1:8000/update_profile/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setUpdate(true);
        } catch (error) {
            console.error("Error:", error);
        }
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

    useEffect(() => {
        async function getdata() {
            try {
                const array = [];
                const res = await axiosInstance.get('http://127.0.0.1:8000/get_saved_places/')
                res.data.map((d) => {
                    array.push(d.place.id)
                })
                setSaved(array)
                console.log("ids", array)
            }
            catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        getdata();
    }, [formData])
    const [data, setData] = useState([])
    const [savedimages, setSavedimages] = useState([])

    useEffect(() => {
        async function getdata() {
            try {
                const promises = saved.map(async (d) => {
                    const res = await axios.get(`http://127.0.0.1:8000/get_places/?id=${d}`);
                    return res.data;
                });
                const responseData = await Promise.all(promises);
                setData(responseData)
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        getdata();
    }, [saved]);

    useEffect(() => {
        const images = data.map((item) => item.images[0].places_image);
        setSavedimages(images);
    }, [data]);

    console.log("image", savedimages)
    console.log("data", data)


    const [update, setUpdate] = useState(true)
    const [hoveredIndex, setHoveredIndex] = useState(null);

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

    const fileInputRef = useRef(null);

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    return (
        <div className='text-white h-auto xl:mx-60 mx-10'>
            <div className='h-auto rounded-xl p-9 my-12' style={{ backgroundColor: '#101c34', display: 'flex' }}>
                <div className="px- flex justify-center flex-col">
                    <img
                        src={image}
                        className="lg:w-60 md:w-40 lg:h-60 md:h-40 mx-20 my-8 object-center object-cover rounded-full transition-all duration-500 delay-500 transform"
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
                    <h1 className="text-gray-600 dark:text-gray-200 font-bold lg:text-7xl text-5xl" style={{ fontFamily: 'Josefin Sans, sans-serif' }}>
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
                            onChange={(e) => { handleupdate(e) }}
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
                            onChange={(e) => { handleupdate(e) }}
                            placeholder="Enter your mobile number"
                            disabled={update ? true : false}
                            className={` w-full rounded-md border border-[#e0e0e0] bg-[#D9D9D9] py-3 px-6 text-base font-medium ${update ? 'text-[#6B7280]' : 'text-black '} outline-none focus:border-[#6A64F1] focus:shadow-md `}
                        />
                    </div>
                    <div className="mt-8 flex justify-end">
                        {update ?
                            <button className="bg-teal-500 text-black px-10 py-3 rounded-full hover:bg-teal-700 dark:bg-[#54E6E6] dark:text-dark dark:hover:bg-teal-900 font-bold" onClick={() => { setUpdate(false) }}>Update Profile</button> :
                            <button className="bg-teal-500 text-black px-10 py-3 rounded-full hover:bg-teal-700 dark:bg-[#54E6E6] dark:text-dark dark:hover:bg-teal-900 font-bold" onClick={(e) => { submitupdate(e) }}>SAVE</button>
                        }                </div>
                </div>
            </div>
            <div className='h-auto rounded-xl p-9 my-12' style={{ backgroundColor: '#101c34' }}>
                <h1 className='lg:text-6xl text-3xl font-bold'>Saved Trips</h1>
                <div className='relative'>
                    <article className="card my-6 ">
                        <div className='gap-5' >
                            <div>
                                {data.map((d, i) => (
                                    <div key={i} className='my-5 relative' onMouseEnter={() => setHoveredIndex(i)} onMouseLeave={() => setHoveredIndex(null)}>
                                        <img src={`http://127.0.0.1:8000/${savedimages[i]}`} alt="hi" className='h-40 w-full object-cover rounded-2xl' />
                                            <div className='absolute bottom-0 left-0 mx-5  bg-opacity-50 text-white font-bold text-4xl text-center py-2'>
                                                {data[i].name}
                                            </div>
                                        <div className=''>
                                            {hoveredIndex === i && (
                                                <div className='absolute bottom-0 right-0 flex flex-row '>
                                                    <button className="font-bold p-3" style={{ backgroundColor: '#3DCC3A', color: '#000', fontSize: "25px", fontFamily: 'Josefin Sans, sans-serif' }}>Done</button>
                                                    <button className="font-bold p-3" style={{ backgroundColor: '#E81B1B', color: '#000', fontSize: "25px", fontFamily: 'Josefin Sans, sans-serif' }}>Delete</button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </article>
                </div>
            </div>
            <div className='h-auto rounded-xl p-9 my-12' style={{ backgroundColor: '#101c34' }}>
                <h1 className='lg:text-6xl text-3xl font-bold'>Done Trips</h1>
                <div className='relative'>
                    <article className="card my-6 ">
                        <div className='grid grid-cols-3 gap-5' >
                            {/* {data.map((d, i) => (
                                            <div key={i} >
                                                <img src={`http://127.0.0.1:8000/${d?.images[0]?.places_image}`} alt="hi" className='h-60 w-100' />
                                                <div style={{ display: "flex" }}>
                                                    <div className='p-2 fill-grow w-100' style={{ position: 'absolute', bottom: '10px' }}>
                                                        <div className='mx-10  text-white font-bold' style={{ fontSize: "45px", fontFamily: 'Josefin Sans, sans-serif' }}>
                                                            {data[i]?.name}
                                                        </div>
                                                    </div>
                                                    <div className="flex-col" style={doneinfosStyle}>
                                                        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', height: '100%' }}>
                                                            <button className="font-bold" style={{ width: '100%', height: '100%', backgroundColor: '#1B54E8', color: '#000', fontSize: "45px", fontFamily: 'Josefin Sans, sans-serif' }}>Add review</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))} */}
                        </div>
                    </article>
                </div>
            </div>
        </div>
    );
}

export default Profile;

