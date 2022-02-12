export const AvailableImagesValue = ["somwua.png", "motorcycle.png"] as const;

export type AvailableImages = typeof AvailableImagesValue[number];

export interface miniQuote {
  quote: string;
  lang: string;
  image: AvailableImages;
}

export interface Quote extends miniQuote {
  count: number;
  id: string;
  created_at: string;
}
