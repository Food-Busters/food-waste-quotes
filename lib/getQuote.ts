import { db } from "./Firestore";
import { collection, getDocs } from "firebase/firestore";

import { miniQuote, Quote } from "../src/models/Quote";

export async function getQuote(
  percent: number,
  lang: string
): Promise<miniQuote> {
  const data = (await getAllQuotes()).filter((q) => q.lang == lang);
  console.log(`data: ${data}`);
  const quote = data[Math.floor(Math.random() * data.length)];
  const count = Math.ceil((quote.count * (100 - percent)) / 100);
  return {
    quote: quote.quote.replace("__PARAM__", count.toString()),
    lang: quote.lang,
    image: quote.image,
  };
}

export async function getAllQuotes(): Promise<Quote[]> {
  const querySnapshot = await getDocs(collection(db, "quotes"));

  let result: Quote[] = [];
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    result.push({
      id: doc.id,
      lang: data.lang,
      quote: data.quote,
      count: data.count,
      image: data.image,
      created_at: data.created_at,
    });
  });
  return result;
}
