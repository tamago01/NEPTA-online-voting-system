import { Router } from "express";
import { AuthController } from "./auth.controller";
import { authMiddleware } from "../middleware/authMiddleware";

class AuthRoutes {
  private router: Router;
  private authController: AuthController;

  constructor() {
    this.router = Router();
    this.authController = new AuthController();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post("/register", this.authController.register);
    this.router.post("/login", this.authController.login);
    this.router.post("/logout", this.authController.logout);
    this.router.get("/users", authMiddleware, this.authController.getUser);
    this.router.patch("/:userId/hasVoted", this.authController.updateHasVoted);
  }
  public getRouter(): Router {
    return this.router;
  }
}

const authRoutes = new AuthRoutes().getRouter();

export default authRoutes;
