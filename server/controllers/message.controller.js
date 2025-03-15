import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

export const sendMessage = async (req, res) => {
    try {
        const senderId = req.user._id;
        const receiverId = req.params.id;
        const { message } = req.body;

        let conversation = await Conversation.findOne({
            participants: {$all: [senderId, receiverId]}
        });

        if(!conversation) {
            conversation = await Conversation.create({ // This will just create a collection
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

        // TODO: CREATE SOCKET IO FUNCTIONALITY

        Promise.all([
            await conversation.save(),
            await newMessage.save()
        ])

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