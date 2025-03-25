import React from 'react'
import useConversation from '../../zustand/useConversation.js'
import { extractTime } from '../../utils/useTimeFormat.js';
import { useAuthContext } from '../../context/UserAuthContext.jsx';

const Message = ({messages}) => {

    const {selectedConversation} = useConversation();
    const {authUser} = useAuthContext();
    const formattedTime = extractTime(messages.createdAt)
    const fromMe = messages.senderId === authUser._id;
    const profilePic = fromMe? authUser?.profileImg || '/boy1.png' : selectedConversation?.profileImg || '/boy1.png'
    const chatClassName = fromMe? "chat-end" : "chat-start";
    const bubbleBgColor = fromMe? "bg-yellow-300 text-black" : "";

    return (
        <>
            <div className={`chat ${chatClassName} `}>
            <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                <img
                    alt="Tailwind CSS chat bubble component"
                    src={profilePic} />
                </div>
            </div>
            <div className="chat-header">
                <time className="text-xs opacity-50">{formattedTime}</time>
            </div>
                <div className={`chat-bubble ${bubbleBgColor}`}>{messages.message}</div>
            </div>
        </>
  )
}

export default Message

