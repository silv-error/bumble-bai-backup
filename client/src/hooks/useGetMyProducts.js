import { useQuery } from "@tanstack/react-query";

const useGetMyProducts = () => {
    
    const {data, isLoading} = useQuery({
        queryKey: ["myProducts"],
        queryFn: async () => {
            try {
                const res = await fetch('/api/products/shop');
                const data = await res.json();
    
                if(!res.ok) {
                    throw new Error(data.error || "Something went wrong");
                }
    
                return data;
            } catch (error) {
                throw new Error(error.message);
            }
        }   
    });

    return {data, isLoading}

}

export default useGetMyProducts