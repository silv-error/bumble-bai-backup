import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
	cors: {
		origin: ["http://localhost:8000"],
		methods: ["GET", "POST"],
	},
});

// this function takes the receiverId 
export const getReceiverSocketId = (receiverId) => {
	return userSocketMap[receiverId];
};

const userSocketMap = {}; // {userId: socketId} object that tracks which user is connected to which socket ID. It maps user IDs to their respective socket IDs

// listens for new connections. When a user connects, it logs their socket ID to the console.
io.on("connection", (socket) => {
	console.log("a user connected", socket.id);

    /**
     * when user connects, they can send their user ID as part of the connection request.
     * this code retrieves that user ID and stores it in the 'userSocketMap' along with socket ID
     */
	const userId = socket.handshake.query.userId; 
	if (userId != "undefined") {
        userSocketMap[userId] = socket.id // we're storing the connected clients in userSocketMap object
    };

	// io.emit() is used to send events to ALL the connected clients
    // so here's we're passing all the connected clients' ID to all connected clients in the connection
	io.emit("getOnlineUsers", Object.keys(userSocketMap));

	// socket.on() is used to listen to the events. can be used both on client and server side
	socket.on("disconnect", () => {
		console.log("user disconnected", socket.id);
		delete userSocketMap[userId]; // here when socket.on listens to the disconnected users, this will remove to the userSocketMap object
		io.emit("getOnlineUsers", Object.keys(userSocketMap)); // here we're sending the updated onlineUsers from userSocketMap
	});
});

export { app, io, server };