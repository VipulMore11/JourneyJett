import React, { useState } from "react";

export default function Hello() {


    const [value, setValue] = useState(1)

    return (
        <>
            <div className="text-white border-2 border-white h-96 m-5 flex justify-center items-center">
                <div className="mx-80 flex flex-col " >
                    <h1 className="mb-5 text-4xl">Login</h1>
                    <input type="text" className="my-5 text-black h-10 rounded focus:outline-none p-4" placeholder="Username" />
                    <input type="password" className="mb-5 text-black h-10 rounded focus:outline-none p-4" placeholder="Password"/>
                    <div className="flex flex-row gap-3">
                    <input type="checkbox" className="checkbox" />
                    <h1>{value}</h1>
                    </div>
                    <button className="bg-red-700 h-14 rounded-lg " onClick={()=>setValue(value+1)} >Login</button>
                </div>
            </div>
        </>
    )
}
