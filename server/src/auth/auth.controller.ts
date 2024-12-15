import { Request, Response } from "express";
import { AuthService } from "./auth.service";
import { log } from "console";

export class AuthController {
  public authService = new AuthService();

  register = async (req: Request, res: Response) => {
    try {
      const { name, email, password } = req.body;

      if (!name || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
      }

      const user = await this.authService.register(name, email, password,false);

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
      
      const { email, password } = req.body;
      if (!email || !password) {
        return res
          .status(400)
          .json({ message: "Email and password are required" });
      }

      const user = await this.authService.login(email, password);
     return res.json({
        message: "Login successful",
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          token: user.token,
          hasVoted:user.hasVoted
        },
      });
    } catch (error) {
      console.log('error',error);
      
      if (error.message === "Invalid credentials") {
        return res.status(401).json({ message: error.message });
      }
      res.status(500).json({ message: "Server error" });
    }
  };
  
  updateHasVoted = async (req: Request, res: Response) => {
    try {
      const { userId } = req.params; 
      const { hasVoted } = req.body; 
  
      if (typeof hasVoted !== 'boolean') {
        return res.status(400).json({ message: "Invalid hasVoted value, must be boolean" });
      }
  
      const updatedUser = await this.authService.updateHasVoted(userId, hasVoted);
      
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }
  
      res.json({
        message: "hasVoted updated successfully",
        user: {
          id: updatedUser.id,
          name: updatedUser.name,
          email: updatedUser.email,
          hasVoted: updatedUser.hasVoted,
        },
      });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };
  
  verifyToken = async (req: Request, res: Response) => {
    try {
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
