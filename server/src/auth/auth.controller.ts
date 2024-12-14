import { Request, Response } from "express";
import { AuthService } from "./auth.service";
import { asyncWrapper } from "../utils/wrapper";

export class AuthController {
  private authService = new AuthService();

  public getUser = asyncWrapper(async (req: Request, res: Response) => {
    const user = req?.user;
    console.log("data", user);
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    res.status(200).json({ user });
  });

  public register = asyncWrapper(async (req: Request, res: Response) => {
    try {
      const { name, email, password } = req.body;
     
      if (!name || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
      }

      const user = await this.authService.register(name, email, password);

      res.status(201).json({ data: user });
    } catch (error) {
      if (error.message === "User already exists") {
        return res.status(409).json({ message: error.message });
      }
      res.status(500).json({ message: "Server error" });
    }
  });

  public login = asyncWrapper(async (req: Request, res: Response) => {
    const { email, password } = req.body;
    console.log("user", email, password);
    try {
      if (!email || !password) {
        return res
          .status(400)
          .json({ message: "Email and password are required" });
      }

      const user = await this.authService.login(email, password);

      const token = this.authService.generateAccessToken(user.id);
      res.cookie("auth-token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 24 * 60 * 60 * 1000, // 24 hours
      });

      res.json({
        message: "Login successful",

        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          token,
        },
      });
    } catch (error) {
      if (error.message === "Invalid credentials") {
        return res.status(401).json({ message: error.message });
      }
      res.status(500).json({ message: "Server error" });
    }
  });

  public logout = asyncWrapper(async (req: Request, res: Response) => {
    try {
      res.clearCookie("auth-token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
      });

      res.status(200).json({ message: "Logout successful" });
    } catch (error) {
      res.status(500).json({ message: "Server error during logout" });
    }
  });
}
