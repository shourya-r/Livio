import Message from "../models/MessageModel.js";
import { getIO, getConnectedUsers } from "../socket/socket.server.js";

export const sendMessage = async (req, res) => {
  try {
    const { content, receiverId } = req.body;

    const newMessage = await Message.create({
      sender: req.user.id,
      receiver: receiverId,
      content,
    });

    // Populate sender information for the socket emission
    const populatedMessage = await Message.findById(newMessage._id)
      .populate('sender', 'username profilePicture')
      .populate('receiver', 'username profilePicture');

    // Send the message in real time via Socket.IO
    const io = getIO();
    const connectedUsers = getConnectedUsers();
    
    // Get both sender's and receiver's socket IDs
    const senderSocketId = connectedUsers.get(req.user.id.toString());
    const receiverSocketId = connectedUsers.get(receiverId.toString());
    
    // Emit to receiver if connected
    if (receiverSocketId) {
      console.log(`Emitting newMessage to receiver ${receiverId} at socket ${receiverSocketId}`);
      console.log('Message being emitted:', populatedMessage);
      io.to(receiverSocketId).emit('newMessage', populatedMessage);
    } else {
      console.log(`Receiver ${receiverId} is not connected. Connected users:`, Array.from(connectedUsers.keys()));
    }
    
    // Emit to sender if connected (for real-time feedback)
    if (senderSocketId) {
      console.log(`Emitting newMessage to sender ${req.user.id} at socket ${senderSocketId}`);
      io.to(senderSocketId).emit('newMessage', populatedMessage);
    }

    res.status(201).json({
      success: true,
      message: populatedMessage,
    });
  } catch (error) {
    console.log("Error in sendMessage: ", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
export const getConversation = async (req, res) => {
  const { userId } = req.params;

  try {
    const messages = await Message.find({
      $or: [
        { sender: req.user._id, receiver: userId },
        { sender: userId, receiver: req.user._id },
      ],
    }).sort("createdAt");

    res.status(200).json({
      success: true,
      messages,
    });
  } catch (error) {
    console.log("Error in getConversation: ", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
