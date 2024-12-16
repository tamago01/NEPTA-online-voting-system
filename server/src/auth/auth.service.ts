import bcrypt from "bcrypt";
import { User } from "./auth.model";
import jwt from "jsonwebtoken";
import { Types } from "mongoose";

export class AuthService {
  public async getUser(id: string) {
    try {
      const user = await User.findOne({ id });
      if (!user) {
        throw new Error("User not found");
      }

      return {
        id: user.id,
        email: user.email,
      };
    } catch (error) {
      console.error("Error in getUser method:", error);
      throw error;
    }
  }

  async register(name: string, email: string, password: string) {
    try {
      const existingUser = await User.findOne({ email });

      if (existingUser) {
        throw new Error("User already exists");
      }

      const newUser = new User({
        name,
        email,
        password,
        isAdmin: false,
      });

      await newUser.save();

      return {
        id: (newUser._id as Types.ObjectId).toString(),
        name: newUser.name,
        email: newUser.email,
        isAdmin: newUser.isAdmin,
      };
    } catch (error) {
      console.error("Error in register method:", error);
      throw error;
    }
  }

  async login(email: string, password: string) {
    const user = await User.findOne({ email });

    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid credentials");
    }

    return {
      id: (user._id as Types.ObjectId).toString(),
      name: user.name,
      email: user.email,
    };
  }
  public generateAccessToken(id: string): string {
    const payload = { id };
    const secret = process.env.JWT_SECRET;
    const options = { expiresIn: process.env.JWT_EXPIRES_IN };
    return jwt.sign(payload, secret, options);
  }
}
