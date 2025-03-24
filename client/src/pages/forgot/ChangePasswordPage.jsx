import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import LoadingSpinner from '../../components/common/LoadingSpinner'
import useForgotPassword from '../../hooks/useForgotPassword'

const ChangePasswordPage = () => {

    const [formData, setFormData] = useState({
        email: "",
        oldPassword: "",
        newPassword: "",
        confirmPassword: ""
    })

    const {forgotPassword, isPending, isError, error} = useForgotPassword();

    const handleSubmit = (e) => {
        e.preventDefault();
        forgotPassword(formData);
    }

    const handleInputChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    const navigate = useNavigate();

  return (
    <div className='max-md:m-5'>
      <div className='flex flex-col gap-4 py-2 max-w-2xl mx-auto h-screen'>
              <img className="mx-auto  w-8/12" src={'/logo.png'}/>
              <Link onClick={() => navigate(-1)}>
                  <svg xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-arrow-left"
                  ><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
              </Link>
              <div>
                  <h1 className='lg:text-3xl md:text-2xl font-bold'>Change Password</h1>
                  <p>Set your account</p>
              </div>
              <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
      
                  <label className="input input-bordered flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" opacity={70} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mail-check"><path d="M22 13V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h8"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/><path d="m16 19 2 2 4-4"/></svg>
                      <input
                          type="text"
                          name='email'
                          className="grow"
                          onChange={handleInputChange}
                          placeholder="Email"
                      />
                  </label>
                  <label className="input input-bordered flex items-center gap-2">
                      <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 16 16"
                          fill="currentColor"
                          className="h-4 w-4 opacity-70">
                          <path
                          fillRule="evenodd"
                          d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                          clipRule="evenodd" />
                      </svg>
                      <input
                          type="password"
                          name='oldPassword'
                          className="grow"
                          onChange={handleInputChange}
                          placeholder='Old Password'
                      />
                  </label>
                  <label className="input input-bordered flex items-center gap-2">
                      <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 16 16"
                          fill="currentColor"
                          className="h-4 w-4 opacity-70">
                          <path
                          fillRule="evenodd"
                          d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                          clipRule="evenodd" />
                      </svg>
                      <input
                          type="password"
                          name='newPassword'
                          className="grow"
                          onChange={handleInputChange}
                          placeholder='New Password'
                      />
                  </label>
                  <label className="input input-bordered flex items-center gap-2">
                      <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 16 16"
                          fill="currentColor"
                          className="h-4 w-4 opacity-70">
                          <path
                          fillRule="evenodd"
                          d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                          clipRule="evenodd" />
                      </svg>
                      <input
                          type="password"
                          name='confirmPassword'
                          className="grow"
                          onChange={handleInputChange}
                          placeholder='Confirm Password'
                      />
                  </label>
                  <button className="btn md:btn-md lg:btn-lg bg-yellow-300 hover:bg-yellow-400">
                      {isPending? <LoadingSpinner /> : "Submit"}
                  </button>
              </form>
              {isError && <p className='text-red-500 text-center'>{error.message}</p>}
      
          </div>
    </div>
  )
}

export default ChangePasswordPage