import { useQuery } from '@tanstack/react-query'

const useGetConversation = () => {
    const {data:products, isPending} = useQuery({
        queryKey: ["products"],
        queryFn: async () => {
            try {
                const res = await fetch("/api/products");
                const data = await res.json();

                if(!res.ok) {
                    console.error(data.error);
                    throw new Error(data.error || "Something went wrong");
                } 

                return data;
            } catch (error) {
                throw new Error(error);
            }
        }
    });

    return { products, isPending };
}

export default useGetConversation;