import React, { useState } from 'react'
import { toast } from "react-hot-toast";
import { useAuthContext } from '../context/UserAuthContext';
import { useQueryClient } from '@tanstack/react-query';

const useUpdateProfile = () => {
    
    const queryClient = useQueryClient();
    const {setAuthUser} = useAuthContext();
    const [loading, setLoading] = useState(false);

    const updateProfile = async ({firstName, lastName, email, phone, shopName, gender, dateOfBirth}) => {
        setLoading(true);
        try {
            const res = await fetch('/api/users/update', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({firstName, lastName, email, phone, shopName, gender, dateOfBirth})
            });
            const data = await res.json();

            if(!res.ok) {
                toast.error(data.error);
                throw new Error(data.error || "Something went wrong");
            }

            toast.success("Profile updated successfully");

            localStorage.setItem("chat-app-user", JSON.stringify(data))
            setAuthUser(data);
            return data;
        } catch (error) {
            throw new Error(error);
        } finally {
            Promise.all([
                queryClient.invalidateQueries({queryKey: ["chatUser"]}),
                setLoading(false)
            ])
        }
    }
    
    return {updateProfile, loading};
}

export default useUpdateProfile;