import bcrypt from "bcrypt";
import { User } from "./auth.model";
import jwt from "jsonwebtoken";
import { Types } from "mongoose";

export class AuthService {
  async register(name: string, email: string, password: string) {
    try {
      const existingUser = await User.findOne({ email });

      if (existingUser) {
        throw new Error("User already exists");
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new User({ name, email, password: hashedPassword });

      await newUser.save();

      return {
        id: (newUser._id as Types.ObjectId).toString(),
        name: newUser.name,
        email: newUser.email,
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
    const token = this.generateAccessToken(
      (user._id as Types.ObjectId).toString()
    );
    return {
      id: (user._id as Types.ObjectId).toString(),
      name: user.name,
      email: user.email,
      token,
    };
  }
  public generateAccessToken(id: string): string {
    const payload = { id };
    const secret = process.env.JWT_SECRET;
    const options = { expiresIn: process.env.JWT_EXPIRES_IN };
    return jwt.sign(payload, secret, options);
  }
}
