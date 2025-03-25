import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

const useUpdateAddress = () => {
    const {mutateAsync:updateAddress, isPending} = useMutation({
        mutationFn: async (formData) => {
            try {
                const res = await fetch('/api/users/updateAddress', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });
                const data = await res.json();
    
                if(!res.ok) {
                    toast.error(data.error);
                    throw new Error(data.error || "Something went wrong");
                }
    
                return data;
            } catch (error) {
                throw new Error(error);
            }
        },
        onSuccess: () => {
            toast.success("Address updated successfully");
        }
    });

    return {updateAddress, isPending}
}

export default useUpdateAddress;