import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import LoadingSpinner from '../../components/common/LoadingSpinner.jsx';

const LoginPage = () => {

  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })

  const {mutate:login, isPending, isError, error} = useMutation({
    mutationFn: async () => {
      try {
        const response = await fetch('/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });
        const data = await response.json();

        if(!response.ok) {
          throw new Error(data.error || "Something went wrong");          
        }
      } catch (error) {
        throw new Error(error);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["authUser"]});
    }
  })

  const handleSubmit = (e) => {
    e.preventDefault();
    login();
  }

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value});
  }

  return (
    <>
    <div className='flex flex-col justify-around py-2 max-w-xl mx-auto h-screen'>
            <img className="mx-auto w-8/12" src={'/logo.png'}/>
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
                        name='password'
                        className="grow"
                        onChange={handleInputChange} 
                        placeholder='Password'
                    />
                </label>
                <button className="btn md:btn-md lg:btn-lg bg-yellow-300 hover:bg-yellow-400">
                  {isPending? <LoadingSpinner /> : "Sign In"}
                </button>
                  <div className="label">
                    <span className="label-text-alt"></span>
                    <Link to={'/forgot'}><span className="label-text-alt">Forgot Password?</span></Link>
                  </div>
                  {isError && <p className='text-red-500 text-center'>{error.message}</p>}
                <div className="row d-flex g-0 justify-content-center">
                    <div className="col-6 divider">or</div>
                </div>
                <Link className='flex justify-center' to={'/signup'}>
                  <button className="btn md:btn-md lg:btn-lg bg-yellow-300 hover:bg-yellow-400">
                    Register Account
                  </button>
                </Link>
            </form>
            <div className="row d-flex g-0 justify-content-center">
              <div className="col-12">
                  <div className="row d-flex g-0 justify-content-center">
                      <div className="text-center">
                          <p id="number_msg">Sign up with your number instead</p>
                      </div>
                  </div>
                  <div className="flex justify-center mx-auto   w-12/12 bg-blue-50">
                        <div className="bg-white p-4 rounded-lg w-full flex flex-col">
                            <label class="text-gray-600 text-sm">
                                Phone number
                            </label>
                            <div className="relative mt-2 w-full text-gray-500">
                                <div className="absolute inset-y-0 left-3 my-auto h-6 border-r">
                                    <select className="text-sm outline-none rounded-lg h-full ">
                                        <option>US</option>
                                        <option>ES</option>
                                        <option>MR</option>
                                    </select>
                                </div>
                                <input type="number" placeholder="+1 (555) 000-000" className="w-full pl-[4.5rem] py-2 appearance-none bg-transparent outline-none border focus:border-slate-600 shadow-sm rounded-lg"/>
                            </div>
                        </div>
                    </div>
              </div>
            </div>
        </div>
    </>
  )
}

export default LoginPage