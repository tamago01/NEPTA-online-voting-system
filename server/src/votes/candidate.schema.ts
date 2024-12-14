import mongoose from "mongoose";

const candidateSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  voteCount: { type: Number, default: 0 },
});

export const Candidate = mongoose.model("Candidate", candidateSchema);
