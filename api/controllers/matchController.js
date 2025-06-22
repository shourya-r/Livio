import User from "../models/UserModel.js";
import { getConnectedUsers, getIO } from "../socket/socket.server.js";

export const swipeRight = async (req, res) => {
  try {
    const { likedUserId } = req.params;
    const likedUser = await User.findById(likedUserId);
    const currentUser = await User.findById(req.user.id);

    if (!likedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (!currentUser.likes.includes(likedUserId)) {
      currentUser.likes.push(likedUserId);
      await currentUser.save();

      // if other user already likes you, it is a match
      if (likedUser.likes.includes(currentUser.id)) {
        currentUser.matches.push(likedUserId);
        likedUser.matches.push(currentUser.id); // Fixed: should be currentUser.id, not currentUser object
        await Promise.all([currentUser.save(), likedUser.save()]); // Fixed: removed await from individual saves

        // send notifications to both users with socket.io - only if it's a match
        const connectedUsers = getConnectedUsers();
        const io = getIO();
        const likedUserIdString = likedUserId.toString();
        const currentUserIdString = currentUser.id.toString();
        const likedUserSocketId = connectedUsers.get(likedUserIdString);
        const currentUserSocketId = connectedUsers.get(currentUserIdString);

        console.log("Match created! Sending socket notifications:");
        console.log(
          "Liked user ID:",
          likedUserId,
          "String version:",
          likedUserIdString,
          "Socket ID:",
          likedUserSocketId
        );
        console.log(
          "Current user ID:",
          currentUser.id,
          "String version:",
          currentUserIdString,
          "Socket ID:",
          currentUserSocketId
        );
        console.log("Connected users:", Array.from(connectedUsers.entries()));

        if (likedUserSocketId) {
          console.log("Sending newMatch to liked user");
          io.to(likedUserSocketId).emit("newMatch", {
            _id: currentUser.id,
            name: currentUser.name,
            image: currentUser.image,
          });
        }
        if (currentUserSocketId) {
          console.log("Sending newMatch to current user");
          io.to(currentUserSocketId).emit("newMatch", {
            _id: likedUserId,
            name: likedUser.name,
            image: likedUser.image,
          });
        }

        // Return match information for immediate frontend update
        return res.status(200).json({
          success: true,
          user: currentUser,
          isMatch: true,
          match: {
            _id: likedUserId,
            name: likedUser.name,
            image: likedUser.image,
          },
        });
      }
    }
    res.status(200).json({
      success: true,
      user: currentUser,
      isMatch: false,
    });
  } catch (error) {
    console.log("Error in swipeRight: ", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const swipeLeft = async (req, res) => {
  try {
    const { dislikedUserId } = req.params;
    const currentUser = await User.findById(req.user.id);

    if (!currentUser.dislikes.includes(dislikedUserId)) {
      currentUser.dislikes.push(dislikedUserId);
      await currentUser.save();
    }

    res.status(200).json({
      success: true,
      user: currentUser,
    });
  } catch (error) {
    console.log("Error in swipeLeft: ", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getMatches = async (req, res) => {
  try {
    // the matches field is filled with the name and image of matches
    // instead of just user ids
    const user = await User.findById(req.user.id).populate(
      "matches",
      "name image"
    );
    res.status(200).json({
      success: true,
      matches: user.matches, // here we return the matches of the user
    });
  } catch (error) {
    console.log("Error in getMatches: ", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// getting the profiles for a user to swipe
export const getUserProfiles = async (req, res) => {
  try {
    const currentUser = await User.findById(req.user.id);
    const users = await User.find({
      $and: [
        { _id: { $ne: currentUser._id } },
        { _id: { $nin: currentUser.likes } },
        { _id: { $nin: currentUser.dislikes } },
        { _id: { $nin: currentUser.matches } },
        {
          gender:
            currentUser.genderPreference === "both"
              ? { $in: ["male", "female"] }
              : currentUser.genderPreference,
        },
        { genderPreference: { $in: [currentUser.gender, "both"] } },
      ],
    });
    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    console.log("Error in getUserProfiles: ", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
