import React, { useState } from 'react'
import img from "../../assets/login img.svg"
import { FaGoogle } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { Link } from 'react-router-dom';

const Register = () => {

    const [showpassword, setShowPassword] = useState(false)
    const [password, setPassword] = useState('')
    return (
        <div className='h-screen p-10' style={{ backgroundColor: '#051120' }}>
            <div className='h-full w-100 align flex flex-row  mx-60 rounded-3xl' style={{ backgroundColor: '#22405b' }}>
                <img src={img} alt="hi" className=' rounded' />
                <div className='text-white flex  items-center w-full flex-col'>
                    <h1 className=' text-4xl italic border-4 border-white p-8 rounded-3xl h-min w-96  flex justify-center items-center md:mt-10 font-medium'>Journey Jett</h1>
                    <FaGoogle className=' size-14 my-10' />
                    <input type="text" placeholder='Phone' className='text-white bg-transparent border-white py-2 w-4/6 text-2xl focus:outline-none ' style={{borderBottom:'2px solid white'}} />
                    <input type="text" placeholder='E-mail' className='text-white bg-transparent border-white py-2 w-4/6 text-2xl focus:outline-none my-2' style={{borderBottom:'2px solid white'}} />
                    {showpassword ? (
                        <input type="text" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} className='text-white bg-transparent border-white py-2 my-2 w-4/6 text-2xl focus:outline-none' style={{borderBottom:'2px solid white'}} />
                    ) : (
                        <input type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} className='text-white bg-transparent border-white py-2 my-2 w-4/6 text-2xl focus:outline-none' style={{borderBottom:'2px solid white'}} />
                    ) }
                    <button onClick={()=>setShowPassword(!showpassword)}>Show Password</button>
                <button className='my-5 py-3 px-10 rounded-full text-2xl' style={{backgroundColor:'#1598ff'}}>Signup</button>
                <Link to="/login">Already A user? Login</Link>
                </div>
            </div>
        </div>
    )
}

export default Register
