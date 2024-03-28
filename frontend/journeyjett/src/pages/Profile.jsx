import React, { useContext, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import ExampleContext from '../context/Context';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../axios';

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
        const images = data.map((item) => item.images[0].places_image);
        setSavedimages(images);
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
                                                    <button className="font-bold p-3" style={{ backgroundColor: '#3DCC3A', color: '#000', fontSize: "25px", fontFamily: 'Josefin Sans, sans-serif' }}>Done</button>
                                                    <button  className="font-bold p-3" style={{ backgroundColor: '#E81B1B', color: '#000', fontSize: "25px", fontFamily: 'Josefin Sans, sans-serif' }}>Delete</button>
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
                {/* <div className='relative'>
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
                                        <button onClick={handleShow} className="font-bold" style={{ width: '100%', height: '100%', backgroundColor: '#1B54E8', color: '#000', fontSize: "45px", fontFamily: 'Josefin Sans, sans-serif' }}>Add review</button>
                                    </div>
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
                                        <Modal.Header closeButton>
                                            <Modal.Title className="-mb-8 mx-4" style={{ fontSize: '2.25rem' }}>{reviewData?.username}</Modal.Title>
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
                            </div>
                        </div>
                    </article>
                </div> */}
            </div>
        </div>
    );
}

export default Profile;