import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Sidebar from '../../components/common/common/Sidebar'
import EditProfile from './EditProfile'
import EditProfileImage from './EditProfileImage'
import { useAuthContext } from '../../context/UserAuthContext'

const ProfilePage = () => {
  const [editing, setEditing] = useState(false);

  const {authUser} = useAuthContext();

  return (
    <div className='flex justify-between px-20 py-10 h-screen bg-slate-200 box-border'>
      <Sidebar />
      <div className='bg-white px-14 w-10/12 drop-shadow-xl rounded-sm'>
        <div className='flex h-28 justify-between'>
            <div className='flex flex-col gap-1 self-center'>
            <h2 className='text-3xl font-medium cursor-default'>My Profile</h2>
            <p className='font-semibold text-slate-400 cursor-default'>Manage and protect your account</p>
            </div>
            {!editing && <button className='btn border border-black mr-10 flex self-center'
              onClick={() => {
                if(editing) {
                  setEditing(false);
                } else {
                  setEditing(true);
                }
              }}
            >
                Edit Profile
            </button>}
        </div>
        <div className=''>
            <hr className='mx-auto'></hr>
        </div>
        <div className='flex py-10 h-5/6'>
            {/* PERSONAL INFO */}
            {editing? <EditProfile setEditing={setEditing} /> : (
              <div className='flex flex-col gap-10 w-7/12 py-10 pl-20 text-md '>
              <div className='flex flex-col gap-10 lg:flex lg:flex-row  lg:gap-20 '>
                  <div className='flex'>
                    <p className=' w-32 text-end text-slate-500 font-medium'>First Name: </p>
                    <p className='pl-5'>{authUser.firstName}</p>
                  </div>
                  <div className='flex'>
                    <p className='w-32 text-end text-slate-500 font-medium'>Last Name:</p>
                    <p className='pl-5'>{authUser.lastName}</p>
                  </div>
              </div>
              <div className='flex'>
                <p className='w-32 text-end text-slate-500 font-medium'>Email:</p>
                <p className='pl-5'>{authUser.email}</p>
              </div>
              <div className='flex'>
                <p className='w-32 text-end text-slate-500 font-medium'>Phone Number:</p>
                <p className='pl-5'>{authUser.phone || <Link className='text-blue-500 underline' onClick={() => setEditing(true)}>Add Phone Number</Link>}</p>
              </div>
              <div className='flex'>
                <p className='w-32 text-end text-slate-500 font-medium'>Shop Name:</p>
                <p className='pl-5'>{authUser.shopName || <Link className='text-blue-500 underline' onClick={() => setEditing(true)}>Edit Shop Name</Link>}</p>
              </div>
              <div className='flex'>
                <p className='w-32 text-end text-slate-500 font-medium'>Gender:</p>
                <p className='pl-5'>{authUser.gender || <Link className='text-blue-500 underline' onClick={() => setEditing(true)}>Edit Gender</Link>}</p>
              </div>
              <div className='flex'>
                <p className='w-32 text-end text-slate-500 font-medium'>Date of Birth:</p>
                <p className='pl-5'>{authUser.dateOfBirth || <Link className='text-blue-500 underline' onClick={() => setEditing(true)}>Edit Date of Birth</Link>}</p>
              </div>
            </div>
            )}

            {/* IMAGE INFO */}
            <EditProfileImage />
          </div>
      </div>
    </div>
  )
}

export default ProfilePage