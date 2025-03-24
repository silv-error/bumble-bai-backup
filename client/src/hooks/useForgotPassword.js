import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

const useForgotPassword = () => {
    const {mutate:forgotPassword, isPending, isError, error} = useMutation({
        mutationFn: async ({email, oldPassword, newPassword, confirmPassword}) => {
            const success = handleError({email, oldPassword, newPassword, confirmPassword});
            if(!success) {
                throw new Error();
            };
            try {
                const response = await fetch('/api/users/forgotPassword', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({email, oldPassword, newPassword, confirmPassword})
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
          toast.success("Successfully updated your password");
        },
      });

    return {forgotPassword, isPending, isError, error};
}

export default useForgotPassword

function handleError({email, oldPassword, newPassword, confirmPassword}) {
    if(!email || !oldPassword || !newPassword || !confirmPassword) {
        toast.error("Please fill in all fields");
        return false;
    }

    if(newPassword !== confirmPassword) {
        toast.error("Password does not match");
        return false;
    }

    if(newPassword.length < 6) {
        toast.error("Password must be at least 6 characters");
        return false;
    }

    return true;
}