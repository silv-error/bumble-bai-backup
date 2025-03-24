import { useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import {useAuthContext} from "../context/UserAuthContext.jsx"
import { useState } from 'react';

const useLogin = () => {
    const queryClient = useQueryClient();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const {setAuthUser} = useAuthContext();

    const login = async ({email, password}) => {
        setLoading(true);
        try {
            const success = handleError({email, password});
            if(!success) return;

            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({email, password})
            });
            const data = await res.json();

            if(!res.ok) {
                setError(data.error);
                throw new Error(data.error || "Something went wrong");
            }

            localStorage.setItem("chat-app-user", JSON.stringify(data));
            setAuthUser(data);
        } catch (error) {
            throw new Error(error);
        } finally {
            setLoading(false);
        }
    }

    return { login, loading, error }
}

export default useLogin;

function handleError({email, password}) {
    if(!email || !password) {
        toast.error("Please fill in all fields");
        return false;
    }

    return true;
}