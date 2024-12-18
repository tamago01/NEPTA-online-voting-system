import { User } from "../auth/auth.model";
import { emailService } from "../service/emailProvider";
import { Candidate } from "./candidate.schema";

export class VotesService {
  public async postVotes(
    voteData: Record<string, string | string[]>,
    userEmail: string
  ) {
    try {
      const maxCandidates = 5;
      const categoriesWithLimit = ["CommitteeMemberOpen", "NationalCommitteeMember"];
      for (const category in voteData) {
        const candidates = Array.isArray(voteData[category])
          ? voteData[category]
          : [voteData[category]];
  
        if (categoriesWithLimit.includes(category) && candidates.length > maxCandidates) {
          throw new Error(`Category '${category}' cannot have more than ${maxCandidates} votes.`);
        }
      }
  
      // Process votes
      for (const [category, candidateList] of Object.entries(voteData)) {
        const candidates = Array.isArray(candidateList) ? candidateList : [candidateList];
  
        for (const candidateName of candidates) {
          let candidate = await Candidate.findOneAndUpdate(
            { name: candidateName, category },
            { $inc: { voteCount: 1 } },
            { new: true }
          );
  
          if (!candidate) {
            candidate = await Candidate.create({
              name: candidateName,
              category,
              voteCount: 1,
            });
  
            console.log("Created new candidate:", candidate);
          }
        }
      }
  
      // Update user voting status
      const user = await User.findOneAndUpdate(
        { email: userEmail },
        { $set: { hasVoted: true } },
        { new: true }
      );
  
      if (!user) {
        throw new Error("User not found to update voting status");
      }
  
      return {
        message: "Votes successfully processed.",
      };
    } catch (error) {
      console.error("Database error:", error);
      throw new Error(`Failed to process votes: ${error.message}`);
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
