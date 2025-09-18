import express, { Request, Response } from "express";
import Users from "../models/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const findUser = await Users.findOne({ email });
    if (!findUser) {
      return res.status(401).json({ message: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, findUser.password);
    if (!isMatch) {
      throw "Invalid password";
    }
    const token = jwt.sign(
      { userId: findUser._id, email: findUser.email, role: findUser.role },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" }
    );
    const refreshToken = jwt.sign(
      { userId: findUser._id },
      process.env.JWT_REFRESH_SECRET as string,
      { expiresIn: "7d" }
    );
    findUser.refreshToken = refreshToken;
    await findUser.save();
    return res.status(200).json({
      meta: {
        token: token,
        refreshToken: refreshToken,
      },
      user: findUser,
    });
  } catch (error) {
    res.status(500).json({ message: "Unable to login" });
  }
};

export const register = async (req: Request, res: Response) => {
  try {
    const { name, password, email, role } = req.body;
    const user = await Users.findOne({ email });
    if (user) {
      return res.status(404).json({ message: "User already exists!" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new Users({
      email,
      password: hashedPassword,
      name,
      role
    });
    await newUser.save();
    return res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    return res.status(500).json({ message: "Registration failed" });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;
    await Users.findByIdAndUpdate(userId, { refreshToken: null });
    res.json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: "Unable to logout" });
  }
};

export const refreshToGetAccessToken = async (req: Request, res: Response) => {
  try {
    const { refreshToken, email } = req.body;

    if (!refreshToken) {
      return res.status(401).json({ message: "Refresh token is required" });
    }

    const user = await Users.findOne({ email });
    if (!user) {
      return res.status(403).json({ message: "Invalid user details" });
    }

    jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET as string,
      (err: any, decoded: any) => {
        if (err) {
          return res
            .status(403)
            .json({ message: "Expired or invalid refresh token" });
        }

        const newAccessToken = jwt.sign(
          { userId: user._id, email: user.email },
          process.env.JWT_SECRET as string,
          { expiresIn: "15m" }
        );

        return res.json({ message:"here is the access token", accessToken: newAccessToken, user });
      }
    );
  } catch (error) {
    res.status(500).json({ message: "Unable to refresh token" });
  }
};

module.exports = { register, login, logout, refreshToGetAccessToken };
