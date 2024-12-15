import bcrypt from "bcrypt";
import { User } from "./auth.model";
import jwt from "jsonwebtoken";
import { Types } from "mongoose";

export class AuthService {
  async register(name: string, email: string, password: string,hasVoted:boolean) {
    try {
      const existingUser = await User.findOne({ email });

      if (existingUser) {
        throw new Error("User already exists");
      }

      const newUser = new User({ name, email, password: password,hasVoted });

      await newUser.save();

      return {
        id: (newUser._id as Types.ObjectId).toString(),
        name: newUser.name,
        email: newUser.email,
        isAdmin: newUser.isAdmin,
        hasVoted:newUser.hasVoted
      };
    } catch (error) {
      console.error("Error in register method:", error);
      throw error;
    }
  }
  public async registerFromExcel(name: string, email: string, phoneNumber: string, membershipNumber: string, membershipValidityDate: string) {
    try {
      const existingUser = await User.findOne({ email });

      if (existingUser) {
        throw new Error("User already exists");
      }

      const password = this.generateRandomPassword();
      const newUser = new User({ 
        name, 
        email,
        password: password,
        hasVoted: false,
        phoneNumber,
        membershipNumber,
        membershipValidityDate
      });

      await newUser.save();

      return {
        id: (newUser._id as Types.ObjectId).toString(),
        name: newUser.name,
        email: newUser.email,
        hasVoted: newUser.hasVoted
      };
    } catch (error) {
      console.error("Error in register method:", error);
      throw error;
    }
  }
  public test(){
    console.log('test');
  }
  async updateHasVoted(userId: string, hasVoted: boolean) {
    const user = await User.findById(userId); 
    if (!user) {
      return null;
    }
    user.hasVoted = hasVoted;
    await user.save(); 
    return user;
  }
  

  async login(email: string, password: string) {
      console.log('login ,',email,password);
    const user = await User.findOne({ email });
    console.log('user',user);

    // if (!user) {
    //   throw new Error("Invalid credentials");
    // }

    const isPasswordValid = password === user.password;
    console.log('isPasswordValid',isPasswordValid);
    if (!isPasswordValid) {
      throw new Error("Invalid credentials");
    }
    console.log('user._id',user._id);
    
    const token = this.generateAccessToken(
      (user._id as Types.ObjectId).toString()
    );
    console.log('token',token);

    return {
      id: (user._id as Types.ObjectId).toString(),
      name: user.name,
      email: user.email,
      hasVoted:user.hasVoted,
      token,
    };
  }
  public generateAccessToken(id: string): string {
    console.log('generateAccessToken',id);
    
    const payload = { id };
    const secret = process.env.JWT_SECRET;
    const options = { expiresIn: process.env.JWT_EXPIRES_IN };
    return jwt.sign(payload, secret, options);
  }

  public generateRandomPassword() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890';
    let password = '';
    for (let i = 0; i < 6; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        password += characters[randomIndex];
    }
    return password;
}
}


