import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from "../components/Footer"

function BaseLayout() {
  return (
    <>
      <div className=" h-screen">
        <nav className="">
          <Navbar/>
        </nav>
        <div className="pt-24 overflow-x-hidden" style={{ backgroundColor: '#051120' }}>
          <Outlet />
          <Footer/>
        </div>
      </div>
    </>
  );
}

export default BaseLayout;
