
import User from "../models/User.js";
import { hashPassword, verifyPassword } from "../utils/hashPassword.js";
import { generateToken } from "../utils/jwt.js";
export const register = async (req, res) => {
  try {
    const { email, password, displayName, avatar, bio } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(403)
        .json({ success: false, msg: "user already exists" });
    }
    const hashedPassword = await hashPassword(password);
    const newUser = await User.create({
      email,
      password: hashedPassword,
      displayName,
      avatar,
      bio,
    });
    return res.status(201).json({ success: true, newUser });
  } catch (error) {
    console.error("Register error:", error.message);
    return res.status(500).json({ success: false, msg: "Server error" });
  }
};
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, msg: "User not found" });
    }
    const isPasswordValid = await verifyPassword(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ success: false, msg: "invalid credentials" });
    }
    const token = generateToken({ id: user._id, email: user.email });

    return res.status(200).json({
      success: true,
      msg: "Login successful",
      token,
      user: {
        id: user._id,
        email: user.email,
        displayName: user.displayName,
        avatar: user.avatar,
        bio: user.bio,
      },
    });
  } catch (error) {
    return res.status(500).json({ success: false, msg: "Server error" });
  }
};
