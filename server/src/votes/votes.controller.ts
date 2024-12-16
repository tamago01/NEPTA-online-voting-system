import { Request, Response } from "express";
import { VotesService } from "./votes.service";

export class VotesController {
  private votesService: VotesService;

  constructor() {
    this.votesService = new VotesService();
    this.postVote = this.postVote.bind(this);
    this.getResults = this.getResults.bind(this);
    this.sendOtp = this.sendOtp.bind(this);
    this.verifyOtp = this.verifyOtp.bind(this);
  }

  public async postVote(req: Request, res: Response): Promise<void> {
    try {
      const { candidateName, category } = req.body;
      console.log("req", req.user);
    
      if (!candidateName || !category) {
        res
          .status(400)
          .json({ message: "Candidate name and category are required." });
        return;
      }

      const result = await this.votesService.postVotes(candidateName, category, req.user.email);
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

  public async sendOtp(_req: Request, res: Response): Promise<void> {
    try {
      console.log("req", _req.body.email);
      
      const data = await this.votesService.sendOtp(_req.body.email);
      console.log("data", data);
      res.status(200).json(data);
    } catch (error) {
      console.log("error", error);
      
      res.status(500).json({ message: error.message });
      
    }
  }
  public async verifyOtp(req: Request, res: Response): Promise<void> {
    try {
      const data = await this.votesService.verifyOtp(req.body.email, req.body.otp);
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}
