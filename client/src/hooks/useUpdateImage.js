import React, { useState } from 'react'
import { toast } from "react-hot-toast";
import { useAuthContext } from '../context/UserAuthContext';
import { useQueryClient } from '@tanstack/react-query';

const useUpdateImage = () => {
    
    const {setAuthUser} = useAuthContext();
    const [loading, setLoading] = useState(false);

    const updateImage = async ({profileImg}) => {
        setLoading(true);
        try {
            const res = await fetch('/api/users/update', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({profileImg})
            });
            const data = await res.json();

            if(!res.ok) {
                toast.error(data.error);
                throw new Error(data.error || "Something went wrong");
            }

            toast.success("Profile Image updated successfully");
            
            localStorage.setItem("chat-app-user", JSON.stringify(data))
            setAuthUser(data);
            return data;
        } catch (error) {
            throw new Error(error);
        } finally {
            setLoading(false);
        }
    }
    
    return {updateImage, loading};
}

export default useUpdateImage;