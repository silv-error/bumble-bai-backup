import { useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react'
import { toast } from 'react-hot-toast'

const useCreateProducts = () => {
  
    const queryClient = useQueryClient();
    const [loading, setLoading] = useState(false);

    const createProduct = async (formData) => {
        setLoading(true);
        try {
            const success = handleError(formData);
            if(!success) return;

            const res = await fetch('/api/products/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            const data = await res.json();

            if(!res.ok) {
                throw new Error(data.error || "Something went wrong");
            }

            toast.success("Product has been created");
            queryClient.invalidateQueries({queryKey: ["myProducts"]})
            return data;
        } catch (error) {
            throw new Error(error);
        } finally {
            setLoading(false);
        }
    }

    return {createProduct, loading}
}

export default useCreateProducts;

function handleError(formData) {
    if(!formData.title || !formData.price || !formData.category || !formData.productDetails || !formData.productImg) {
        toast.error("Please fill in all fields");
        return false;
    }

    return true;
}