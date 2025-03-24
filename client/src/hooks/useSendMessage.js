import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast';
import useConversation from '../zustand/useConversation';
import { useState } from 'react';

const useSendMessage = () => {
    
    // const {messages, setMessages, selectedConversation} = useConversation()

    // const {mutate:sendMessage, isPending} = useMutation({
    //     mutationFn: async ({message}) => {
    //         try {
    //             const response = await fetch(`/api/messages/send/${selectedConversation?._id}`, {
    //                 method: 'POST',
    //                 headers: {
    //                     'Content-Type': 'application/json'
    //                 },
    //                 body: JSON.stringify({message})
    //             });
    //             const data = await response.json();

    //             if(!response.ok) {
    //                 throw new Error(data.error || "Something went wrong");
    //             }

    //             setMessages([...messages, data]);
    //         } catch (error) {
    //             throw new Error(error);
    //         }
    //     },
    // });

    const queryClient = useQueryClient();
	const { messages, setMessages, selectedConversation } = useConversation();

    const sendMessage = async ({message}) => {
        const success = handleError({message});
        if(!success) true;
        try {
			const res = await fetch(`/api/messages/send/${selectedConversation._id}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ message }),
			});
			const data = await res.json();
			if (data.error) throw new Error(data.error);

			setMessages([...messages, data]);
            queryClient.invalidateQueries({queryKey: ["messageHistory"]})
		} catch (error) {
			throw new Error(error);
		}
	};

    return {sendMessage};
}

export default useSendMessage

function handleError({message}) {
    if(!message) {
        toast.error("Please input your message");
        return false;
    }

    return true;
}