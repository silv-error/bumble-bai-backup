import { useQuery } from '@tanstack/react-query'
import React from 'react'

const useGetAddress = () => {
  
    const {data:getMyAddress, isLoading} = useQuery({
        queryKey: ["address"],
        queryFn: async () => {
            try {
                const res = await fetch('/api/users/address');
                const data = await res.json();

                if(!res.ok) {
                    throw new Error(data.error || "Something went wrong");
                }

                return data;
            } catch (error) {
                throw new Error(error);
            }
        }
    });

    return {getMyAddress, isLoading};
}

export default useGetAddress