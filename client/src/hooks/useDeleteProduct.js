import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast';

const useDeleteProduct = () => {
    
    const queryClient = useQueryClient();

    const {mutate:deleteProduct, isPending} = useMutation({
        mutationFn: async (productId) => {
            try {
                const res = await fetch(`/api/products/delete/${productId}`, {
                    method: 'POST'
                });
                const data = await res.json();

                if(!res.ok) {
                    throw new Error(error.data || "Something went wrong");
                }

                queryClient.invalidateQueries({queryKey: ["myProducts"]})
                return data;
            } catch (error) {
                throw new Error(error);
            }
        },
        onSuccess: (data) => {
            toast.success(data.message);
        },
        onError: () => {
            toast.error("Something went wrong");
        }
    });

    return {deleteProduct, isPending}
}

export default useDeleteProduct;