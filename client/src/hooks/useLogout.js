import { useState } from "react"
import { useAuthContext } from "../context/UserAuthContext";

const useLogout = () => {
  
    const {setAuthUser} = useAuthContext();
    const [loading, setLoading] = useState(false);

    const logout = async () => {
        try {
            setLoading(true);
            const res = await fetch('/api/auth/logout', {
                method: 'POST'
            });
            const data = await res.json();

            if(!res.ok) {
                console.error(data.error);
                throw new Error("Something went wrong");
            }

            localStorage.removeItem("chat-app-user");
            setAuthUser(null);
        } catch (error) {
            throw new Error(error);
        } finally {
            setLoading(true);
        }
    }
    return {logout, loading};
}

export default useLogout