import { VercelRequest, VercelResponse } from "@vercel/node";

import { db } from "../lib/Firestore";
import { collection, addDoc } from "firebase/firestore";
import auth from "../lib/AdminAuth";
import { AvailableImagesValue } from "../src/models/Quote";

export default async (req: VercelRequest, res: VercelResponse) => {
  const { quote, lang, image, count, password } = req.body;

  if (!auth(password as string, res)) return;

  if (
    !(
      quote.length &&
      count &&
      ["en", "th"].includes(lang) &&
      AvailableImagesValue.includes(image)
    )
  ) {
    res.status(400).send("Bad Request");
    return;
  }

  try {
    await addDoc(collection(db, "quotes"), {
      quote,
      lang,
      image,
      count,
      created_at: Date().toString(),
    });
    res.status(200).send("Success");
    console.log("API addquote responded successfully (200)");
  } catch (err) {
    res.status(500).send("Internal Server Error");
    console.log(`Internal Error: ${err}`);
  }
};
