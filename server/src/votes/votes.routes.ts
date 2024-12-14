import { Router } from "express";
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
    this.router.post("/post-votes", this.votesController.postVote);
    this.router.get("/get-results", this.votesController.getResults);
  }
  public getRouter(): Router {
    return this.router;
  }
}
const votesRoutes = new VotesRoutes().getRouter();

export default votesRoutes;
