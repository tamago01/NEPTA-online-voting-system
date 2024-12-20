import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import { VotesController } from "./votes.controller";

class VotesRoutes {
  private router: Router;
  private votesController: VotesController;

  constructor() {
    this.router = Router();
    this.votesController = new VotesController();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post("/post-votes",authMiddleware,this.votesController.postVote);
    this.router.get("/get-results", this.votesController.getResults);
    this.router.post("/send-otp",  this.votesController.sendOtp);
    this.router.post("/verify-otp", this.votesController.verifyOtp);
    this.router.get("/verify-status", this.votesController.verifyStatus);
    
  }
  public getRouter(): Router {
    return this.router;
  }
}
const votesRoutes = new VotesRoutes().getRouter();

export default votesRoutes;
