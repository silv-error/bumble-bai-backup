import React from 'react'
import { useQuery } from '@tanstack/react-query'

const useGetMessageHistory = () => {
    
    const {data:getMessageHistory, isLoading} = useQuery({
        queryKey: ["messageHistory"],
        queryFn: async () => {
            try {
                const res = await fetch('/api/messages');
                const data = await res.json();

                if(!res.ok) {
                    throw new Error("Something went wrong");
                }

                return data;
            } catch (error) {
                throw new Error(error);
            }
        }
    });

    return {getMessageHistory, isLoading}
}

export default useGetMessageHistory