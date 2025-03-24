import { useQuery } from '@tanstack/react-query'

const useGetProducts = () => {
  
    const {data:getProducts, isLoading} = useQuery({
        queryKey: ["products"],
        queryFn: async () => {
            try {
                const res = await fetch('/api/products', {
                    method: 'GET'
                });
                const data = await res.json();

                if(!res.ok) {
                    throw new Error(data.error);
                }

                return data;
            } catch (error) {
                throw new Error(error);
            }
        }
    });

    return {getProducts, isLoading};
}

export default useGetProducts