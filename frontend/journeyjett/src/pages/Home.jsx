import React, { useEffect, useState } from 'react'
import bg from "../assets/bg pic.svg"
import Search from "../components/Search"
import rect from "../assets/Rectangle 19.svg"
import wildlife from "../assets/Wildlife.jpg"
import adventure from "../assets/adventure.jpg"
import beach from "../assets/beach.jpg"
import hill from "../assets/hill.jpg"
import heritage from "../assets/heritage.jpg"
import pilgrimage from "../assets/Pilgrimage.jpg"
import axios from 'axios'
import '@fontsource/londrina-solid';
import '@fontsource-variable/andada-pro';
const Home = () => {

    const [input, setinput] = useState('')
    useEffect(() => {
        async function getdata() {
            try {
                const res = await axios.get('https://jsonplaceholder.typicode.com/users');
                console.log(res.data)
                setinput(res.data)
            }
            catch (error) {
                console.log(error)
            }
        }
        getdata();
    }, [])

    return (
        <>
            <div className="bg-cover bg-center bg"
      style={{
        backgroundImage: `url(${bg})`,
      }}>

            </div>
        </>
    )
}

export default Home
