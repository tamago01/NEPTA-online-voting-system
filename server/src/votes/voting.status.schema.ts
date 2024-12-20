import mongoose from "mongoose";

const votingStatusSchema = new mongoose.Schema({
votingStarted: { type: Boolean },
message: { type: String,  },
});

export const VotingStatus = mongoose.model("VotingStatus", votingStatusSchema);