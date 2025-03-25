import React from 'react'
import {useSocketContext} from "../../context/SocketContext.jsx"
import useConversation from '../../zustand/useConversation'

const MessageHistory = ({messageHistory}) => {
    const {selectedConversation, setSelectedConversation} = useConversation();
    const {onlineUsers} = useSocketContext()
    const isOnline = onlineUsers.includes(messageHistory._id)

    const selectedUser = selectedConversation?._id === messageHistory?._id;
    return (
        <>
            <li onClick={() => setSelectedConversation(messageHistory)} className={`${selectedUser? "bg-gray-300" : ""}`}>
                <div className='flex gap-4 rounded-sm'>
                    <div className="avatar indicator">
                        <span className={`indicator-item rounded-full h-4 w-4 mt-2 mr-1 ${isOnline? "bg-green-300" : ""}`}></span>
                        <div className="h-12 w-12 rounded-lg">
                            <img
                            className='rounded-full'
                            alt="Tailwind CSS examples"
                            src={messageHistory.profileImg || "/boy1.png"} />
                        </div>
                    </div>
                    <h2 className='flex items-center'>{messageHistory.firstName} {messageHistory.lastName}</h2>
                </div>
            </li>
        </>
    )
}

export default MessageHistory