export type Side = "YES" | "NO";

type MarketStatus = "OPEN" | "CLOSED";

export interface Event {
  id: string;
  question: string;
  closesAt: string;
  status: MarketStatus;

  prices: {
    yes: number;
    no: number;
  };
  imageUrl?: string;
}
