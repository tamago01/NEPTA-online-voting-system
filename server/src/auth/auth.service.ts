import bcrypt from "bcrypt";
import { UsersModel } from "./auth.model";

export class AuthService {
  async signup(email: string, password: string, name?: string) {
    const existingUser = await UsersModel.findOne({ email });
    if (existingUser) {
      throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password);

    const newUser = new UsersModel({
      email,
      password: hashedPassword,
      name,
    });

    await newUser.save();
    return { message: "User registered successfully" };
  }

  async login(email: string, password: string) {
    const user = await UsersModel.findOne({ email });
    if (!user) {
      throw new Error("Invalid credentials");
    }

    return {
      id: user._id,
      email: user.email,
      name: user.name,
    };
  }
}
