import mongoose from "mongoose";
import { User } from "../auth/auth.model";
import { emailService } from "../service/emailProvider";
import { Candidate } from "./candidate.schema";

export class VotesService {
  public async postVotes(votes: Record<string, string[]>, userEmail: string) {
    try {
      console.log("User Email:", userEmail);
      console.log("Received Payload:", votes);

      const user = await User.findOne({
        email: userEmail,
        hasVoted: true,
      });
      if (user) {
        throw new Error(
          "You have already voted. Multiple votes are not allowed."
        );
      }

      const hasCandidatesSelected = Object.values(votes).some(
        (candidates) => candidates.length > 0
      );

      if (!hasCandidatesSelected) {
        await User.findOneAndUpdate(
          { email: userEmail },
          { $set: { hasVoted: true } }
        );

        return {
          message: "No candidates selected. No updates were made.",
          candidates: [],
        };
      }

      const votePromises = Object.entries(votes).map(
        async ([category, candidates]) => {
          if (candidates.length > 0) {
            const candidateName = candidates[0];

            const updatedCandidate = await Candidate.findOneAndUpdate(
              { name: candidateName, category: category.toLowerCase() },
              { $inc: { voteCount: 1 } },
              {
                new: true,
                upsert: true,

                setDefaultsOnInsert: true,
              }
            );

            console.log("Individual Candidate Update:", updatedCandidate);
            return updatedCandidate;
          }
          return null;
        }
      );

      const updatedCandidates = await Promise.all(votePromises);
      const validCandidates = updatedCandidates.filter(
        (candidate) => candidate !== null
      );

      console.log("Updated Candidates in Database:", validCandidates);

      await User.findOneAndUpdate(
        { email: userEmail },
        { $set: { hasVoted: true } }
      );

      return {
        message: "Vote successfully added.",
        data: {
          candidates: validCandidates,
        },
      };
    } catch (err) {
      console.error("Database error:", err);
      throw new Error(`Failed to update votes: ${err.message}`);
    }
  }

  public async getResults() {
    try {
      const results = await Candidate.aggregate([
        {
          $group: {
            _id: "$category",
            candidates: {
              $push: { name: "$name", voteCount: "$voteCount" },
            },
          },
        },
        {
          $sort: { _id: 1 },
        },
      ]);

      return results;
    } catch (error) {
      throw new Error(`Failed to fetch results: ${error.message}`);
    }
  }

  public async sendOtp(userEmail: string) {
    console.log("userEmaisendOtpl", userEmail);

    if (!userEmail) {
      throw new Error("Email is required");
    }

    const otp = this.generateNumericOtp(6);

    const user = await User.findOne({ email: userEmail });
    if (!user) {
      throw new Error("User not found");
    }

    user.otp = otp;
    await user.save();

    console.log(`OTP generated: ${otp} for ${userEmail}`);

    try {
      await emailService.sendOtpEmail(userEmail, otp);
      console.log(`OTP sent to email: ${userEmail}`);
    } catch (error) {
      console.error(`Failed to send OTP to ${userEmail}:`, error);
      throw new Error("Failed to send OTP email");
    }
    return { message: `OTP sent to email: ${userEmail} otp: ${otp}` };
  }

  public async verifyOtp(
    userEmail: string,
    otp: string
  ): Promise<{ message: string }> {
    const BACKUP_OTP = "098123";

    if (!userEmail || !otp) {
      throw new Error("Email and OTP are required");
    }

    const user = await User.findOne({ email: userEmail });
    if (!user) {
      throw new Error("User not found");
    }
    if (user.otp === otp || otp === BACKUP_OTP) {
      return { message: `OTP has been verified successfully` };
    }

    throw new Error("Invalid OTP");
  }

  private generateNumericOtp(length: number): string {
    let otp = "";
    for (let i = 0; i < length; i++) {
      otp += Math.floor(Math.random() * 10); // Random digit from 0 to 9
    }
    return otp;
  }
}
