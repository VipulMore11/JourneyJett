import React from 'react'
import Hellocard from '../components/Hellocard'
import { HiAdjustmentsHorizontal } from "react-icons/hi2";
import Filter from '../components/Text/Filter';

const Hello = () => {
    return (
        <div className='grid md:grid-cols-10 gap-5  p-5'>
            <div className='filter col-span-3 border-2 text-black xl:p-6 h-auto md:p-3 md:block hidden' style={{backgroundColor:'#f7f8f2', boxShadow:' 5px 10px 15px gray'}}>
                <HiAdjustmentsHorizontal className='size-10' />
                <div className='my-8' >
                    <h1 className='xl:text-3xl md:text-2xl'>Category</h1>
                    <div className='grid xl:grid-cols-3 md:grid-cols-2 my-4 xl:gap-4 md:gap-2'>
                        <Filter value={"Ui/Ux"} />
                        <Filter value={"Development"} />
                        <Filter value={"Finance"} />
                        <Filter value={"Technology"} />
                        <Filter value={"Research"} />
                        <Filter value={"Senior Level"} />
                    </div>
                </div>
                <div className='bg-gray-500 h-1 rounded-full'></div>
                <div className='my-8'>
                    <h1 className='xl:text-3xl md:text-2xl'>Sort</h1>
                    <div className='flex flex-col text-xl py-2 xl:mx-6 md:mx-2 gap-1'>
                        <div ><input type="checkbox" className='xl:size-4 md:size-3' id="work" /><label htmlFor="work" className='xl:mx-3 md:mx-2 md:text-lg'>Work</label></div>
                        <div><input type="checkbox" className='xl:size-4 md:size-3' id="work from home" /><label htmlFor="work from home" className='xl:mx-3 md:mx-2 md:text-lg'>Work from home</label></div>
                        <div><input type="checkbox" className='xl:size-4 md:size-3' id="work" /><label htmlFor="work" className='xl:mx-3 md:mx-2 md:text-lg'>Freelance</label></div>
                    </div>
                </div>
                <div className='bg-gray-500 h-1 rounded-full'></div>
                <div className='my-8'>
                    <h1 className='xl:text-3xl md:text-2xl'>Role category</h1>
                    <div className='flex flex-col text-xl py-2 xl:mx-6 md:mx-2 gap-1'>
                        <div ><input type="checkbox" className='xl:size-4 md:size-3' id="work" /><label htmlFor="work" className='xl:mx-3 md:mx-2 md:text-lg'>Developer</label></div>
                        <div><input type="checkbox" className='xl:size-4 md:size-3' id="work from home" /><label htmlFor="work from home" className='xl:mx-3 md:mx-2 md:text-lg'>Accounting & Taxation</label></div>
                        <div><input type="checkbox" className='xl:size-4 md:size-3' id="work" /><label htmlFor="work" className='xl:mx-3 md:mx-2 md:text-lg'>Production & Manufacture</label></div>
                    </div>
                </div>
                <div className='bg-gray-500 h-1 rounded-full'></div>
                <div className='my-8'>
                    <h1 className='xl:text-3xl md:text-2xl'>Industry</h1>
                    <div className='flex flex-col text-xl py-2 xl:mx-6 md:mx-2 gap-1'>
                        <div ><input type="checkbox" className='xl:size-4 md:size-3' id="work" /><label htmlFor="work" className='xl:mx-3 md:mx-2 md:text-lg'>Chemical</label></div>
                        <div><input type="checkbox" className='xl:size-4 md:size-3' id="work from home" /><label htmlFor="work from home" className='xl:mx-3 md:mx-2 md:text-lg'>Textile & Apparal</label></div>
                        <div><input type="checkbox" className='xl:size-4 md:size-3' id="work" /><label htmlFor="work" className='xl:mx-3 md:mx-2 md:text-lg'>corporate</label></div>
                    </div>
                </div>
            </div>
            <div className='col-span-7 grid grid-cols-2 xl:gap-12 md:gap-3 gap-3'>
                <div className='col-span-2 text-black flex justify-center items-center xl:text-7xl md:text-5xl h-10 mt-10 font-bold'>Articles</div>
                <Hellocard />
                <Hellocard />
            </div>
        </div>
    )
}

export default Hello
