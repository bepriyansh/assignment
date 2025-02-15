import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import { createError, createResponse } from "../utils/responseHandler.js";
import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET = process.env.SECRET;

export const signup = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return next(createError(400, "All fields are required!"));
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(createError(400, "User already exists"));
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create new user
    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    await user.save();

    // Create token
    const token = jwt.sign({ userId: user._id, name: user.name }, JWT_SECRET, {
      expiresIn: "24h",
    });
    createResponse(res, 201, "User created successfully", {
      token,
      user: {
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Signup error:", error);
    next(createError(500, `Error creating user: ${error.message}`));
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return next(createError(401, "Invalid credentials"));
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return next(createError(401, "Invalid credentials"));
    }

    const token = jwt.sign({ userId: user._id, name: user.name }, JWT_SECRET, {
      expiresIn: "24h",
    });

    createResponse(res, 200, "Login successful", {
      token,
      user: {
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    next(createError(500, `Error logging in: ${error.message}`));
  }
};
