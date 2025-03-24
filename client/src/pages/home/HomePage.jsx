import React, { useEffect, useRef, useState } from 'react'
import Product from './Product'
import '../../styles/swipe.css'
import Message from './Message'
import useGetProducts from '../../hooks/useGetProducts'
import useConversation from '../../zustand/useConversation.js'
import useSendMessage from '../../hooks/useSendMessage.js'
import useGetMessages from '../../hooks/useGetMessages.js'
import { Link, useLocation } from 'react-router-dom'
import MessageHistory from './MessageHistory.jsx'
import useGetMessageHistory from '../../hooks/useGetMessageHistory.js'
import useListenMessages from '../../hooks/useListenMessages.js'
import { useAuthContext } from '../../context/UserAuthContext.jsx'
import toast from 'react-hot-toast'


const HomePage = () => {

	const {getProducts, isLoading} = useGetProducts();
	const {messages, selectedConversation, setSelectedConversation} = useConversation();
	const {sendMessage} = useSendMessage();
	const {messages:userMessage, loading} = useGetMessages();
	const {authUser} = useAuthContext();
	const {getMessageHistory, isLoading:gettingMessages} = useGetMessageHistory();
	useListenMessages();

	const lastMessageRef = useRef();
		
	useEffect(() => {
		setTimeout(() => {
			lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
		}, 100);
	}, [messages]);

	const [message, setMessage] = useState({
		message: ""
	})

	const handleSubmit = async (e) => {
		e.preventDefault();
		if(message.length == 0) {
			toast.error("Please input your message");
			return;
		}
		await sendMessage(message);
		setMessage({ message: ""})
	}

	const handleOnChange = (e) => {
		setMessage({...message, [e.target.name]: e.target.value})
	}

	useEffect(() => {
		return () => setSelectedConversation(null);
	}, [])


  return (
	<>
		<div id="splashScreen" className="fixed inset-0 hidden flex items-center justify-center bg-yellow-400/100 z-50">
			<div className="text-white text-6xl font-bold animate-pulse">
				👍 Liked!
			</div>
		</div>


		{/* // <!-- <div id="assistantButton" className="fixed z-40 bottom-5 right-5 bg-yellow-300 text-white p-4 cursor-pointer rounded-full shadow-lg hover:bg-yellow-400 transition-all">
		//     <div className="relative">
		//         <img src="{{ url_for('static', filename='message-icon.svg') }}" className="w-8 h-[12]" alt="" id="svg-logo">
		//         <span id="notificationCounter" className="absolute -top-7 -right-5 bg-red-500 text-md w-8 h-8 rounded-full flex items-center justify-center">1</span>
		//     </div>
		// </div> --> */}

		{/* // <!-- FAQ Section (hidden by default) --> */}
		<div id="faqSection" className="fixed z-40 bottom-20 right-5 bg-yellow-400 p-5 shadow-lg rounded-lg w-80 max-h-96 overflow-y-auto hidden">
			<h3 className="text-xl font-semibold text-white mb-8">Messages</h3>
			<div className="space-y-2" id="messageList">
				{/* <!-- Message Items will be dynamically inserted here --> */}
			</div>
		</div>

		<div className="flex h-screen">
			
			{/* <!-- Collapsible Sidebar --> */}
			<div id="sidebar" className="w-84 border-r bg-white transition-all duration-300 relative overflow-hidden ">
				{/* <!-- Toggle Button --> */}
				<button onClick={toggleSidebar} className="absolute -right-3 top-4 bg-white rounded-full shadow-md h-6 w-6 flex items-center justify-center z-10">
					<svg id="toggleIcon" className="w-4 h-4 transform transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5l7 7-7 7M5 5l7 7-7 7"/>
					</svg>
				</button>
				{/* <!-- Sidebar Content --> */}
				<div className="overflow-hidden flex flex-col h-full">
					{/* <!-- Profile Header --> */}
					<Link to={'/profile'}>
						<div className="p-4 hover:bg-gray-100 flex gap-3 items-center">
							<img src={authUser?.profileImg} className="w-8 h-8 bg-gray-200 rounded-full" />
							<span className="font-semibold sidebar-expanded">{authUser?.firstName} {authUser?.lastName}</span>
						</div>
					</Link>

					{/* // <!-- Chat Header --> */}
					<div className="bg-gray-50 px-4 py-3 border-b">
						{!selectedConversation ? "Select a user to chat" : <h2 className="text-lg font-semibold">{selectedConversation?.firstName} {selectedConversation?.lastName}</h2>}
					</div>

					{/* // <!-- Messages --> */}
					<div className="flex-1 overflow-y-auto h-0" id="chatMessages">
						{!loading && userMessage.map((message) => (
						<div key={message._id} ref={lastMessageRef}>
							<Message messages={message} />
						</div>
						))}
					</div>

					{/* // <!-- Message Input --> */}
					<div className="p-4 border-t" id="message_input">
						<div className="flex items-center">
						<input name='message' value={message.message} onChange={handleOnChange} type="text" id="messageInput" placeholder="Type a message..." className="flex-1 border rounded-full py-2 px-4 focus:outline-none focus:border-blue-500" />
						<button onClick={handleSubmit} className={` ml-2 bg-yellow-500 text-white rounded-full p-2 hover:bg-yellow-600`}
							disabled={`${message.length? "disabled": "" }`}
						>
							<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
							</svg>
						</button>
						</div>
					</div>
				</div>
			</div>

			{/* // <!-- Main Content with Padding --> */}
			<div className="flex-1 p-8 flex flex-col items-center justify-center sticky">
				<h1 className="text-2xl font-bold mb-6 text-yellow-400">Bumble <span className="font-normal">Bai</span></h1>
				{/* <!-- Card Container --> */}
				<div className="relative w-[300px] h-[450px]">
					{/* <!-- Swipe Overlays --> */}
					<div className="swipe-overlay absolute inset-0 border-4 border-green-500 rounded-2xl bg-green-500/20" id="likeOverlay"></div>
					<div className="swipe-overlay absolute inset-0 border-4 border-red-500 rounded-2xl bg-red-500/20" id="rejectOverlay"></div>
					
					{!isLoading && getProducts.map((product) => (
						<Product key={product._id} product={product} />
					)).reverse()}
					
				</div>

				{/* <!-- Action Buttons --> */}
				<div className="flex gap-4 mt-8">
					{/* <!-- Reject Button --> */}
					<button onClick={swipeLeft} className="w-[60px] h-[60px] flex items-center justify-center rounded-full border-2 border-gray-200 hover:border-gray-300 transition-colors">
						<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
						</svg>
					</button>
					
					{/* <!-- Like Button --> */}
					<button onClick={swipeRight} className="w-[60px] h-[60px] flex items-center justify-center rounded-full border-2 bg-yellow-400 border-yellow-400  transition-colors" >
						<svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
						</svg>
					</button>
				</div>
			</div>
			
			<div className="drawer lg:drawer-open drawer-end w-80">
				<input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
				<div className="drawer-side">
					<label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay block"></label>
					<ul className="menu text-base-content min-h-full w-80 bg-white border-l p-0">
					{/* Sidebar content here */}
					<h2 className='flex items-center justify-center text-lg font-medium h-20 bg-gray-50'>Message History</h2>
					<hr></hr>
					{!gettingMessages && getMessageHistory.map((message) => (
						<MessageHistory key={message._id} messageHistory={message} />
					))}
					</ul>
				</div>
			</div>
		</div>
	</>
  )
}

export default HomePage