
import { useState } from 'react'
import useConversation from '../zustand/useConversation.js';

const useGetUser = () => {
  
    const { selectedConversation, setSelectedConversation } = useConversation();
    const [loading, setLoading] = useState(false);

    const getUser = async (username) => {
        try {
            const res = await fetch(`/api/users/profile/${username}`);
            const data = await res.json();

            if(!res.ok) {
                throw new Error(data.error);
            }

            setSelectedConversation(data);
        } catch (error) {
            throw new Error(error)
        }
    }

    return { getUser, loading };
}

export default useGetUser