import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

function BaseLayout() {
  return (
    <>
      <div className=" h-screen">
        <nav className="">
          <Navbar/>
        </nav>
        <div className="">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default BaseLayout;
