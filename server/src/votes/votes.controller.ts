import { Request, Response } from "express";
import { VotesService } from "./votes.service";

export class VotesController {
  private votesService = new VotesService();

  constructor() {
    this.votesService = new VotesService();
    this.postVote = this.postVote.bind(this);
    this.getResults = this.getResults.bind(this);
  }

  public async postVote(req: Request, res: Response): Promise<void> {
    try {
      const { candidateName, category } = req.body;
      console.log("Received data:", req.body);

      if (!candidateName || !category) {
        res
          .status(400)
          .json({ message: "Candidate name and category are required." });
        return;
      }

      const result = await this.votesService.postVotes(candidateName, category);
      res.status(200).json({ data: result });
    } catch (error: any) {
      console.error("Error in postVote:", error);
      res.status(500).json({ message: error.message });
    }
  }

  public async getResults(_req: Request, res: Response): Promise<void> {
    try {
      const results = await this.votesService.getResults();
      console.log("res", results);
      res.status(200).json(results);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
}
