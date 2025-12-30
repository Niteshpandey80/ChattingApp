import bcrypt from "bcryptjs";
import User from "../models/User.js";
import { generateToken } from "../lib/util.js";
import cloudinary from "../lib/cloudinary.js";

// SIGNUP
export const signup = async (req, res) => {
  try {
    const { fullName, email, password, bio } = req.body;
    if (!fullName || !email || !password || !bio)
      return res.status(400).json({ success: false, message: "All fields required" });

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ success: false, message: "User exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({ fullName, email, password: hashedPassword, bio });
    const token = generateToken(newUser._id);

    res.status(201).json({ success: true, userData: newUser, token });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// LOGIN
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ success: false, message: "Email & password required" });

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ success: false, message: "Invalid credentials" });

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) return res.status(400).json({ success: false, message: "Invalid credentials" });

    const token = generateToken(user._id);
    res.status(200).json({ success: true, userData: user, token });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// CHECK AUTH
export const checkAuth = (req, res) => {
  res.status(200).json({ success: true, user: req.user });
};

// UPDATE PROFILE
export const updateProfile = async (req, res) => {
  try {
    const { profilePic, fullName, bio } = req.body;
    const userId = req.user._id;
    const updateData = { fullName, bio };

    if (profilePic && profilePic.startsWith("data:")) {
      const uploadResult = await cloudinary.uploader.upload(profilePic, { folder: "profile_pics" });
      updateData.profilePic = uploadResult.secure_url;
    } else if (profilePic) {
      updateData.profilePic = profilePic;
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true }).select("-password");
    res.status(200).json({ success: true, user: updatedUser });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
