import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import {useAuthContext} from "../context/UserAuthContext.jsx"
import { useState } from 'react';

const useSignUp = () => {
    const {setAuthUser} = useAuthContext();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const signup = async ({firstName, lastName, email, username, password, confirmPassword}) => {
        setLoading(true);
        const success = handleError({firstName, lastName, email, username, password, confirmPassword});
        if(!success) return;

        try {
            const res = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({firstName, lastName, email, username, password, confirmPassword})
            });
            const data = await res.json();

            if(!res.ok) {
                setError(data.error)
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

    return {signup, loading};
}

export default useSignUp

function handleError({firstName, lastName, email, username, password, confirmPassword}) {

    if(!firstName || !lastName || !email || !username || !password || !confirmPassword) {
        toast.error("Please fill in all fields");
        return false;
    }

    if(password !== confirmPassword) {
        toast.error("Password does not match");
        return false;
    }

    if(password.length < 6) {
        toast.error("Password must be at least 6 characters");
        return false;
    }

    return true;
}