import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

export const sendMessage = async (req, res) => {
    try {
        const senderId = req.user._id;
        const receiverId = req.params.id;
        const { message } = req.body;

        let conversation = await Conversation.findOne({
            participants: {$all: [senderId, receiverId]}
        });

        if(!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId]
            })
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            message
        });

        if(newMessage) {
            conversation.messages.push(newMessage._id);
        }

        
        Promise.all([
            await conversation.save(),
            await newMessage.save()
        ])

		const receiverSocketId = getReceiverSocketId(receiverId);
		if (receiverSocketId) {
			io.to(receiverSocketId).emit("newMessage", newMessage);
		}

        res.status(200).json(newMessage)

    } catch (error) {
        console.error(`Error in sendMessage controller : ${error.message}`);
        res.status(500).json({error: "Internal server error"});
    }
}

export const getMessages = async (req, res) => {
    try {
        const receiverId = req.params.id;
        const senderId = req.user._id;

        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] }
        }).populate({
            path: "messages"
        });

        if(!conversation) {
            return res.status(200).json([]);
        }

        res.status(200).json(conversation.messages);
    } catch (error) {
        console.error(`Error in getMessages controller : ${error.message}`);
        res.status(500).json({error: "Internal server error"});
    }
}

export const getConversations = async (req, res) => {
    try {
        const userId = req.user._id;
        const conversations = await Conversation.find({
            participants: userId
        }).populate("participants");

        if (!conversations || conversations.length === 0) {
            return res.status(200).json([]);
        }

        const receiverIds = conversations.flatMap(conversation => 
            conversation.participants
                .filter(user => user._id.toString() !== userId.toString())
                .map(user => ({
                    _id: user._id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    profileImg: user.profileImg
                }))
        );

        res.status(200).json(receiverIds);
    } catch (error) {
        console.error(`Error in getConversations controller: ${error.message}`);
        res.status(500).json({ error: "Internal server error" });
    }
}