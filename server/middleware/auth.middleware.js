import Auth from "../models/Auth.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const LoginAuth = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await Auth.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatching = await bcrypt.compare(password, user.password);
    if (!isMatching) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generating JWT Token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "72h",
    });

    // Store JWT in HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true, // Prevents JavaScript access (XSS protection)
      secure: process.env.NODE_ENV === "production", // Use HTTPS in production
      sameSite: "None", // Prevent CSRF
      maxAge: 3600000, // 1 hour
    });

    res.status(200).json({
      success: true,
      message: `Welcome back, ${user.name}!`,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    res.status(500).json({ message: error.message || "Internal server error" });
  }
};

const SignupAuth = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    // Checking if user already exists
    const existingUser = await Auth.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User already exists with this email" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new Auth({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    // Generate JWT Token
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "72h",
    });

    // Store JWT in HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "None",
      maxAge: 3600000,
    });

    res.status(201).json({
      success: true,
      message: `Hello ${newUser.name}, signup successful!`,
      user: { id: newUser._id, name: newUser.name, email: newUser.email },
    });
  } catch (error) {
    res.status(500).json({ message: error.message || "Internal server error" });
  }
};

// Logout Function (Clear Token)
const LogoutAuth = (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "None",
    expires: new Date(0), // Expire immediately
  });
  res.status(200).json({ success: true, message: "Logged out successfully" });
};

export { LoginAuth, SignupAuth, LogoutAuth };
