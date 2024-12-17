import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  
  const email = req.headers["x-user-email"];

  if (email) {
    res.status(200).json({ email });
  } else {
    res.status(401).json({ error: "No email found" });
  }
}
