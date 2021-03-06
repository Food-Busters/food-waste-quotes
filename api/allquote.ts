import { VercelRequest, VercelResponse } from "@vercel/node";

import { getAllQuotes } from "../lib/getQuote";
import auth from "../lib/AdminAuth";

export default async (req: VercelRequest, res: VercelResponse) => {
  const { password } = req.query;

  if (!auth(password as string, res)) return;

  res.status(200).json(await getAllQuotes());
  console.log("API allquote responded successfully (200)");
};
