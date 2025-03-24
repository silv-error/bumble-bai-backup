import React, { useRef } from 'react'
import useConversation from '../../zustand/useConversation.js'
import { useQuery } from '@tanstack/react-query';
import { extractTime } from '../../utils/useTimeFormat.js';
import { useAuthContext } from '../../context/UserAuthContext.jsx';

const Message = ({messages}) => {

    const {selectedConversation} = useConversation();
    const {authUser} = useAuthContext();
    const formattedTime = extractTime(messages.createdAt)
    const fromMe = messages.senderId === authUser._id;
    const profilePic = fromMe? authUser.profileImg : selectedConversation.profileImg || 'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp'
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