import React, { useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import LoadingSpinner from '../LoadingSpinner';
import useLogout from '../../../hooks/useLogout';
import { useAuthContext } from '../../../context/UserAuthContext';

const Sidebar = () => {

  const {authUser} = useAuthContext();
  const {logout, loading} = useLogout();

  let location = useLocation()

  return (
    <div className='h-full w-80'>
        <div className='flex h-28 gap-4 p-4 '>
          <img src={authUser?.profileImg} className='size-16 rounded-full'/>
          <div>
            <h2 className='text-lg font-bold cursor-default'>{authUser?.firstName} {authUser?.lastName}</h2>
              <div className='flex gap-1'>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user-round-pen"><path d="M2 21a8 8 0 0 1 10.821-7.487"/><path d="M21.378 16.626a1 1 0 0 0-3.004-3.004l-4.01 4.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z"/><circle cx="10" cy="8" r="5"/></svg>
                <p className='text-slate-800 cursor-default'>Edit profile</p>
              </div>
          </div>
        </div>
        <hr className='mx-auto w-8/12'></hr>
        <div className='my-4 p-4'>
          <div className='flex gap-2'>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle-user-round bg-yellow-300 rounded-full"><path d="M18 20a6 6 0 0 0-12 0"/><circle cx="12" cy="10" r="4"/><circle cx="12" cy="12" r="10"/></svg>
            <h2 className='font-bold cursor-default'>My Account</h2>
          </div>
          <div className='flex flex-col mx-8'>
              <Link
                to={'/'} 
                className={`pt-1 hover:text-red-500 ${location.pathname == "/"? "text-red-500" : ""}`}
              >
                Market Place
              </Link>
              <Link
                to={'/profile'}
                className={`pt-1 hover:text-red-500 ${location.pathname == "/profile"? "text-red-500" : ""}`}
              >
                Profile
              </Link>
              <Link 
                to={'#'} 
                className={`pt-1 hover:text-red-500 ${location.pathname == "/address"? "text-red-500" : ""}`}
              >
                Address
              </Link>
              <Link
                to={'/forgot'}  
                className={`pt-1 hover:text-red-500 ${location.pathname == "/forgot"? "text-red-500" : ""}`}
              >
                Change Password
              </Link>
          </div>
          <div className='flex gap-2 mt-4'>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle-dollar-sign bg-yellow-300 rounded-full"><circle cx="12" cy="12" r="10"/><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"/><path d="M12 18V6"/></svg>
            <h2 className='font-bold cursor-default'>Selling</h2>
          </div>
          <div className='flex flex-col mx-8 h-96'>
            <div className='flex'>
              <Link 
                to={'/products'} 
                className={`pt-1 hover:text-red-500 ${location.pathname == "/products"? "text-red-500" : ""}`}
              >
                Your Listings
              </Link>
            </div>
            <button onClick={() => logout()}
              to={'#'}  
              className='flex gap-2 hover:text-red-500'
            >
              {loading? <LoadingSpinner /> : "Logout"}
            </button>
          </div>
        </div>
    </div>
  )
}

export default Sidebar