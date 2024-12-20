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
    this.verifyStatus = this.verifyStatus.bind(this);
  }

  public async postVote(req: Request, res: Response): Promise<void> {
    try {
      const { votes } = req.body;
      const userEmail = req.user?.email;
      if (!userEmail) {
        res
          .status(401)
          .json({ message: "Unauthorized: User not authenticated" });
        return;
      }
      if (!votes || typeof votes !== "object") {
        res.status(400).json({
          message: "Votes must be provided as an object.",
          details: { votesProvided: !!votes },
        });
        return;
      }

      const result = await this.votesService.postVotes(votes, userEmail);

      res.status(200).json({
        message: "Votes submitted successfully.",
        data: result,
      });
    } catch (error: any) {
      console.error("Error in postVote:", error);

      if (error.message.includes("already voted")) {
        res.status(403).json({
          message: error.message,
          code: "DUPLICATE_VOTE",
        });
      } else {
        res.status(500).json({
          message: "An unexpected error occurred while processing your votes.",
          errorDetails: error.message,
        });
      }
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
      const data = await this.votesService.verifyOtp(
        req.body.email,
        req.body.otp
      );
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  public async verifyStatus(req: Request, res: Response) {
    try {
      const result = await this.votesService.checkVotingStatus();
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}
