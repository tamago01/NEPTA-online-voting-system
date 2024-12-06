import { Router } from "express";
import { AuthController } from "./auth.controller";

class AuthRoutes {
  private router: Router;
  private authController: AuthController;

  constructor() {
    this.router = Router();
    this.authController = new AuthController();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post("/signup", this.authController.signup);
    this.router.post("/login", this.authController.login);
  }
  public getRouter(): Router {
    return this.router;
  }
}

const authRoutes = new AuthRoutes().getRouter();

export default authRoutes;
