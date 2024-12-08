import { Request, Response } from "express";
import { AuthService } from "./auth.service";

export class AuthController {
  public authService = new AuthService();

  register = async (req: Request, res: Response) => {
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
  };

  login = async (req: Request, res: Response) => {
    try {
      if (req.user) {
        return res.json({
          message: "User already logged in",
          user: req.user,
        });
      }
      const { email, password } = req.body;
      if (!email || !password) {
        return res
          .status(400)
          .json({ message: "Email and password are required" });
      }

      const user = await this.authService.login(email, password);
      res.json({
        message: "Login successful",
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          token: user.token,
        },
      });
    } catch (error) {
      if (error.message === "Invalid credentials") {
        return res.status(401).json({ message: error.message });
      }
      res.status(500).json({ message: "Server error" });
    }
  };
  // Add this method to your existing AuthController
  verifyToken = async (req: Request, res: Response) => {
    try {
      // This route will be protected by the authMiddleware
      // If the middleware passes, it means the token is valid
      res.json({
        message: "Token is valid",
        user: {
          id: req.user?.id,
        },
      });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  };
}
