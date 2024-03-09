import React, { useState } from 'react'
import img from "../../assets/login img.svg"
import { FaGoogle } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const navigate = useNavigate()

    const [showpassword, setShowPassword] = useState(false)
    const [password, setPassword] = useState('')
    return (
        <div className='h-screen p-10 overflow-hidden' style={{ backgroundColor: '#051120' }}>
            <button className='text-white' onClick={()=>navigate(-1)}>Back</button> {/*This is used to navigate to previous route*/ }
            <div className='lg:h-full w-100 align flex flex-row  xl:mx-48 mx-2 rounded-3xl' style={{ backgroundColor: '#22405b' }}>
                <img src={img} alt="hi" className='rounded hidden lg:block' />
                <div className='text-white flex  items-center w-full flex-col'>
                    <h1 className=' md:text-4xl text-2xl mt-8 italic border-4 border-white p-8 md:p-8 lg:p-2 xl:p-8 rounded-3xl h-min lg:w-96 w-auto  flex justify-center items-center md:mt-8 font-medium'>Journey Jett</h1>
                    <FaGoogle className=' size-14 my-10' />
                    <div className='w-full flex justify-center'>
                        <input type="text" placeholder='E-mail' className='text-white bg-transparent border-white py-2 w-4/6 text-2xl focus:outline-none my-2' style={{ borderBottom: '2px solid white' }} />
                        <button ><MdOutlineMailOutline className=' size-5'/></button>
                    </div>
                    <div className='w-full flex justify-center'>
                        <input type={showpassword ? "text" : "password"} placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} className='text-white bg-transparent border-white py-2  w-4/6 text-2xl focus:outline-none' style={{ borderBottom: '2px solid white' }} />
                        <button onClick={() => setShowPassword(!showpassword)}>{showpassword ? <FaRegEyeSlash className=' size-5' /> : <FaRegEye className=' size-5' />}</button>
                    </div>
                    <button className='my-5 py-3 px-10 rounded-full text-2xl' style={{ backgroundColor: '#1598ff' }}>Login</button>
                    <Link to="/signup" className='mb-5'>New user? Signup</Link>
                </div>
            </div>
        </div>
    )
}

export default Login
