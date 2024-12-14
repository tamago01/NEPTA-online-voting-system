import { Candidate } from "./candidate.schema";

export class VotesService {
  public async postVotes(candidateName: string, category: string) {
    console.log(" candidateName:", candidateName, "Category:", category);

    try {
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

      return {
        message: `Vote successfully added for ${candidateName} in category '${category}'.`,
        candidate,
      };
    } catch (error) {
      console.error("Database error:", error);
      throw new Error(`Failed to update vote: ${error.message}`);
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
}
