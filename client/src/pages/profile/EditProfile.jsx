import React, { useEffect, useState } from 'react'
import { useAuthContext } from '../../context/UserAuthContext';
import useUpdateProfile from '../../hooks/useUpdateProfile';
import LoadingSpinner from '../../components/common/LoadingSpinner.jsx'

const EditProfile = ({setEditing}) => {
    const {authUser} = useAuthContext();
  
    const [formData, setFormData] = useState({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      shopName: "",
      gender: "",
      dateOfBirth: ""
    });
  
    useEffect(() => {
      if(authUser) {
        setFormData({
          firstName: authUser.firstName,
          lastName: authUser.lastName,
          email: authUser.email,
          phone: authUser.phone,
          shopName: authUser.shopName,
          gender: authUser.gender,
          dateOfBirth: authUser.dateOfBirth
        })
      }
    }, [authUser])

    const {updateProfile, loading} = useUpdateProfile();

    const handleSubmit = async (e) => {
      e.preventDefault();
      await updateProfile(formData);
      await setEditing(false);
    }
  
    const handleOnChange = (e) => {
      setFormData({...formData, [e.target.name]: e.target.value})
    }

    const handleCheckBoxChange = (gender) => {
      setFormData({ ...formData, gender })
    }

  
  return (
    <>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4 p-4 mx-auto w-96'>
      <div className='flex gap-2'>
        <label className=''>
          First Name
          <input className='input-sm border border-black rounded-md w-full'
            name='firstName' 
            value={formData.firstName}
            onChange={handleOnChange}
          />
        </label>
        <label className=''>
          Last Name
          <input className='input-sm border border-black rounded-md w-full' 
            name='lastName' 
            value={formData.lastName}
            onChange={handleOnChange}
          />
        </label>
      </div>
      <label className=''>
        Email
        <input className='input-sm border border-black rounded-md w-full' 
          name='email' 
          value={formData.email}
          onChange={handleOnChange}
        />
      </label>
      <label className=''>
        Phone Number
        <input className='input-sm border border-black rounded-md w-full'
          name='phone' 
          value={formData.phone}
          onChange={handleOnChange}
          placeholder='+63'
        />
      </label>
      <label className=''>
        Shop Name
        <input className='input-sm border border-black rounded-md w-full' 
          name='shopName' 
          value={formData.shopName}
          onChange={handleOnChange}
        />
      </label>
      Gender
      <div className='flex gap-4'>
          <input
              type="checkbox"
              className="radio rounded-full checked"
              checked={formData.gender == "male"}
              onChange={() => handleCheckBoxChange("male")}
              />
          <label>Male</label>
          <input
              type="checkbox"
              className="radio rounded-full" 
              checked={formData.gender == "female"}
              onChange={() => handleCheckBoxChange("female")}
              />
          <label>Female</label>
          <input
              type="checkbox"
              className="radio rounded-full"
              checked={formData.gender == "others"}
              onChange={() => handleCheckBoxChange("others")} 
              />
          <label>Others</label>
      </div>
      <label>
        Date of Birth
        <input type='date' className='border border-black rounded-md w-full text-center'
          name='dateOfBirth'
          onChange={handleOnChange}
        ></input>
      </label>
      <div className='flex gap-2 w-full'>
        <button className='btn w-20'
          onClick={(e) => {
            e.preventDefault();
            setEditing(false);
          }}
        >Cancel</button>
        <button className='btn btn-primary w-20'>
          {loading? <LoadingSpinner /> : "Save"}
        </button>
      </div>
      </form>
    </>
  )
}

export default EditProfile