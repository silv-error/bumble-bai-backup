import React, { useEffect, useState } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import useUpdateAddress from '../../hooks/useUpdateAddress';

const EditAddress = ({setEditing}) => {
    const [formData, setFormData] = useState({
        fullName: "",
        permanentAddress: "",
        details: "",
        postalCode: ""
    });

    const {updateAddress, isPending} = useUpdateAddress();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await updateAddress(formData);
        await setEditing(false);
    }
  
    const handleOnChange = (e) => {
      setFormData({...formData, [e.target.name]: e.target.value})
    }

    return (
        <form onSubmit={handleSubmit} className='flex flex-col gap-4 p-4 mx-auto w-96'>
        <label className=''>
        Full Name
        <input 
            type='text' 
            className='input input-sm border border-black rounded-md w-full'
            placeholder='John Doe'
            name='fullName' 
            value={formData.fullName}
            onChange={handleOnChange}
        />
        </label>
        <label className=''>
            Region
            <select className='select focus:outline-none input-sm border border-black rounded-md w-full'
            defaultValue={""}
            name='permanentAddress' 
            value={formData.permanentAddress}
            onChange={handleOnChange}
            >
                <option disabled selected>Select a Region</option>
                <option>National Capital Region (NCR)</option>
                <option>Cordillera Administrative Region (CAR)</option>
                <option>Ilocos Region (Region I)</option>
                <option>Cagayan Valley (Region II)</option>
                <option>Central Luzon (Region III)</option>
                <option>Calabarzon (Region IV-A)</option>
                <option>Mimaropa (Region IV-B)</option>
                <option>Bicol Region (Region V)</option>
                <option>Western Visayas (Region VI)</option>
                <option>Central Visayas (Region VII)</option>
                <option>Eastern Visayas (Region VIII)</option>
                <option>Zamboanga Peninsula (Region IX)</option>
                <option>Northern Mindanao (Region X)</option>
                <option>Davao Region (Region XI)</option>
                <option>Soccsksargen (Region XII)</option>
                <option>Caraga (Region XIII)</option>
                <option>Bangsamoro Autonomous Region in Muslim Mindanao (BARMM)</option>
            </select>
        </label>
        <label className=''>
            Details Address
            <input 
                type='text' 
                className='input input-sm border border-black rounded-md w-full'
                name='details' 
                value={formData.details}
                onChange={handleOnChange}
                placeholder='Type here'
            />
        </label>
        <label className=''>
            Postal Code
            <input 
                className='input input-sm border border-black rounded-md w-full' 
                name='postalCode' 
                value={formData.postalCode}
                placeholder='Type here'
                onChange={handleOnChange}
            />
        </label>
        <div className='flex gap-2 w-full'>
            <button className='btn w-20'
            onClick={(e) => {
                e.preventDefault();
                setEditing(false);
            }}
            >Cancel</button>
            <button className='btn btn-primary w-20'>
                {isPending ? <LoadingSpinner /> : "Save"}
            </button>
        </div>
        </form>
    )
}

export default EditAddress