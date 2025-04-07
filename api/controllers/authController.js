import validator from "validator";
import User from "../models/UserModel.js";
import jwt from "jsonwebtoken";

// create JWT token
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "5d",
  });
};

export const signup = async (req, res) => {
  const { name, email, password, age, gender, genderPreference } = req.body;

  try {
    if (!name || !email || !password || !age || !gender || !genderPreference) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    if (age < 18) {
      return res.status(400).json({
        success: false,
        message: "Age is less than 18",
      });
    }
    if (!validator.isEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Not a valid email",
      });
    }
    if (!validator.isStrongPassword(password)) {
      return res.status(400).json({
        success: false,
        message: "Password is too weak",
      });
    }

    const newUser = await User.create({
      name,
      email,
      password,
      age,
      gender,
      genderPreference,
    });

    const token = signToken(newUser._id);
    res.cookie("jwt", token, {
      maxAge: 5 * 24 * 60 * 60 * 1000, // 5d
      httpOnly: true, // prevent XSS attacks
      sameSite: "strict", // prevent CSRF attacks
      secure: process.env.NODE_ENV === "production",
    });
    res.status(200).json({
      success: true,
      user: newUser,
    });
  } catch (error) {
    console.log("Error in signup controller:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    const user = await User.findOne({ email }).select("password");
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({
        success: false,
        message: "Incorrect email or password",
      });
    }

    const token = signToken(user._id);
    res.cookie("jwt", token, {
      maxAge: 5 * 24 * 60 * 60 * 1000, // 5d
      httpOnly: true, // prevent XSS attacks
      sameSite: "strict", // prevent CSRF attacks
      secure: process.env.NODE_ENV === "production",
    });
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.log("Error in signup controller:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const logout = async (req, res) => {
  res.clearCookie("jwt");
  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
};
