import React, { useContext, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import ExampleContext from '../context/Context';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { Rating } from "@material-tailwind/react";

const Profile = () => {
    const [image, setImage] = useState(null);
    const { isLogin } = useContext(ExampleContext)
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        phone_number: "",
        //profile_image: ""
    });
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [donehoveredIndex, setdoneHoveredIndex] = useState(null);
    const [saved, setSaved] = useState([])
    const [data, setData] = useState([])
    const [savedimages, setSavedimages] = useState([])

    const handleupdate = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // const del = (id) => {
    //     axiosInstance.post(`http://127.0.0.1:8000/saved_places/?id=${id}`)
    // }

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
        const images = data.map((item) => item.images[0] ? item.images[0].places_image : null);
        setSavedimages(images.filter(image => image !== null));
    }, [data]);

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

    const fileInputRef = useRef(null);

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    const [doneTrips, setDoneTrips] = useState([]);
    const [showDoneTripData, setShowDoneTripData] = useState(false);

    useEffect(() => {
        const fetchDoneTrips = async () => {
            const token = localStorage.getItem("access_token");

            try {
                const promises = saved.map(async (c) => {
                    const res = await axiosInstance.get(`http://127.0.0.1:8000/get_done_place/?id=${c}`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    return res.data;
                });
                const responseData = await Promise.all(promises);
                setDoneTrips(responseData);
                console.log("done trips", responseData);
                setShowDoneTripData(true);
            } catch (error) {
                console.error("Error fetching done trips data:", error);
            }
        };
        fetchDoneTrips();
    }, []);





    const handleDoneButtonClick = async () => {
        const token = localStorage.getItem("access_token");

        try {
            const promises = saved.map(async (id) => {

                const response = await axiosInstance.post(`http://127.0.0.1:8000/done_place/`, { id },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            'Content-Type': 'application/json'
                        }
                    }
                );

                return response.data;
            });


            const responseData = await Promise.all(promises);


            console.log("Response Data:", responseData);
        } catch (error) {
            console.error("Error posting IDs:", error);
        }
    };

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




    const [show, setShow] = useState(false);
    const [reviewData, setReviewData] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = async () => {
        try {
            const res = await axios.get('http://127.0.0.1:8000/get_reviews/?place_id=1');
            const { user } = res.data[0];
            const { username, profile_image } = user;
            setReviewData({ username, profile_image });
            setShow(true);
            console.log(reviewData.username, reviewData.profile_image);
        } catch (error) {
            console.error("Error fetching review data:", error);
        }
    };

    const [reviewText, setReviewText] = useState('');
    const [rating, setRating] = useState(0);
    const handleReviewChange = (e) => {
        setReviewText(e.target.value);
    };
    const postReview = async () => {
        try {
            const data = {
                review: reviewText,
                place_id: 6,
                rating: rating,
                // You may need to include other data such as the user ID or place ID
            };
            await axiosInstance.post('http://127.0.0.1:8000/reviews/', data);
            // Optionally, you can perform additional actions after the review is successfully posted
            console.log('Review posted successfully');
            handleClose(); // Close the modal after posting the review
        } catch (error) {
            console.error('Error posting review:', error);
        }
    };




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
                    </div>
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
                                                    <button className="font-bold p-3" style={{ backgroundColor: '#3DCC3A', color: '#000', fontSize: "25px", fontFamily: 'Josefin Sans, sans-serif ' }} onClick={handleDoneButtonClick}>Done</button>
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
                        <div className='gap-5' >
                            {showDoneTripData && (
                                <div>
                                    {doneTrips.map((c, i) => (
                                        <div key={i} className='my-5 relative' onMouseEnter={() => setdoneHoveredIndex(i)} onMouseLeave={() => setdoneHoveredIndex(null)}>
                                            <img src={`http://127.0.0.1:8000/${savedimages[i]}`} alt="hi" className='h-40 w-full object-cover rounded-2xl' />
                                            <div className='absolute bottom-0 left-0 mx-5  bg-opacity-50 text-white font-bold text-4xl text-center py-2'>
                                                {doneTrips[i].name}
                                            </div>
                                            <div className=''>
                                                {donehoveredIndex === i && (
                                                    <div className='absolute bottom-0 right-0 flex flex-row '>
                                                        <button className="font-bold p-3" style={{ backgroundColor: '#0000FF', color: '#000', fontSize: "25px", fontFamily: 'Josefin Sans, sans-serif' }}>Add review</button>
                                                        <Modal style={{
                                                            position: 'absolute',
                                                            margin: 'auto',
                                                            borderRadius: 5,
                                                            top: '50%',
                                                            left: '50%',
                                                            transform: 'translate(-50%, -50%)',
                                                            width: 400,
                                                            color: 'white',
                                                            backgroundColor: '#979797',
                                                            border: '0px solid #000',
                                                            boxShadow: 24,



                                                        }} show={show} onHide={handleClose}>
                                                            <Modal.Header closeButton className='mb-0 grid grid-cols-3 justify-items-center m-4'>
                                                                <div>
                                                                    <Modal.Title className="-m-3 " style={{ fontSize: '2.25rem' }}>{reviewData?.username}</Modal.Title>
                                                                </div>
                                                                <div className=' grid col-span-2'>
                                                                    <Rating value={rating} onChange={setRating} />
                                                                </div>
                                                            </Modal.Header>
                                                            <Modal.Body>
                                                                <Form>
                                                                    <Form.Group className="" controlId="exampleForm.ControlInput1">


                                                                    </Form.Group>
                                                                    <Form.Group
                                                                        className="mb-0 grid grid-cols-3 justify-items-center m-4 "
                                                                        controlId="exampleForm.ControlTextarea1"
                                                                    >
                                                                        <img
                                                                            src={`http://127.0.0.1:8000${reviewData?.profile_image}`}
                                                                            alt="User profile"
                                                                            className="rounded-full h-20 w-20 object-cover  justify-items-center"
                                                                        />

                                                                        <Form.Control as="textarea"
                                                                            className="text-black col-span-2 w-full h-20 rounded-lg m-4"
                                                                            rows={3}

                                                                            value={reviewText}
                                                                            onChange={handleReviewChange} />
                                                                    </Form.Group>
                                                                </Form>
                                                            </Modal.Body>
                                                            <Modal.Footer>
                                                                <Button variant="secondary" className=' bg-slate-400 m-3 p-2 rounded-md' onClick={handleClose}>
                                                                    Close
                                                                </Button>
                                                                <Button variant="primary" className=' bg-slate-600  p-2 rounded-md' onClick={postReview}>
                                                                    Save
                                                                </Button>
                                                            </Modal.Footer>
                                                        </Modal>

                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </article>
                </div>
                
            </div>
        </div>
    );
}

export default Profile;