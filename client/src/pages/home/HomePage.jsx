import { useMutation, useQueryClient } from '@tanstack/react-query'
import React from 'react'

const HomePage = () => {

  const queryClient = useQueryClient();

  const {mutate:logout} = useMutation({
    mutationFn: async () => {
      try {
        const response = await fetch('/api/auth/logout', {
          method: 'POST'
        })

        if(!response.ok) {
          throw new Error("Something went wrong");
        }
      } catch (error) {
        throw new Error(error);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["authUser"]});
    }
  })

  return (
    <div className='flex mx-auto bg-blue-50'>
      <div>Hello World</div>
      <button className="btn" onClick={(e) => { e.preventDefault(); logout(); }} >Logout</button>
    </div>
  )
}

export default HomePage