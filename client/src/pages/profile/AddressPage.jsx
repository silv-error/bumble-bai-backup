import React, { useState } from 'react'
import Sidebar from '../../components/common/common/Sidebar';
import EditAddress from './EditAddress';
import { useAuthContext } from '../../context/UserAuthContext';
import { Link } from 'react-router-dom';
import EditProfileImage from './EditProfileImage';
import { useMutation, useQuery } from '@tanstack/react-query';
import useGetAddress from '../../hooks/useGetAddress';

const AddressPage = () => {
  const [editing, setEditing] = useState(false);
  const {authUser} = useAuthContext();
  const {getMyAddress, isLoading} = useGetAddress();

  return (
        <div className='flex justify-between px-20 py-10 h-screen bg-slate-200 box-border'>
          <Sidebar />
          <div className='bg-white px-14 w-10/12 drop-shadow-xl rounded-sm'>
            <div className='flex h-28 justify-between'>
                <div className='flex flex-col gap-1 self-center'>
                <h2 className='text-3xl font-medium cursor-default'>My Address</h2>
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
                {editing? <EditAddress setEditing={setEditing} /> : (
                  <div className='flex flex-col gap-10 w-7/12 py-10 pl-20 text-md '>
                  <div className='flex flex-col gap-10 lg:flex lg:flex-row  lg:gap-20 '>
                      <div className='flex'>
                        <p className=' w-32 text-end text-slate-500 font-medium'>Full Name: </p>
                        <p className='pl-5'>{getMyAddress?.fullName || <Link className='text-blue-500 underline' onClick={() => setEditing(true)}>Add Full Name</Link>}</p>
                      </div>
                  </div>
                  <div className='flex'>
                    <p className='w-32 text-end text-slate-500 font-medium'>Region:</p>
                    <p className='pl-5'>{getMyAddress?.permanentAddress ||  <Link className='text-blue-500 underline' onClick={() => setEditing(true)}>Add Region</Link>}</p>
                  </div>
                  <div className='flex'>
                    <p className='w-32 text-end text-slate-500 font-medium'>Details:</p>
                    <p className='pl-5'>{getMyAddress?.details || <Link className='text-blue-500 underline' onClick={() => setEditing(true)}>Add Address Details</Link>}</p>
                  </div>
                  <div className='flex'>
                    <p className='w-32 text-end text-slate-500 font-medium'>Postal Code:</p>
                    <p className='pl-5'>{getMyAddress?.postalCode || <Link className='text-blue-500 underline' onClick={() => setEditing(true)}>Add Postal Code</Link>}</p>
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

export default AddressPage