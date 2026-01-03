export type Side = "YES" | "NO";

type MarketStatus = "OPEN" | "CLOSED";

export interface EventOptions {
  id: string;
  title?: string;
  yesPrice: number;
  noPrice: number;
}

export interface Event {
  id: string;
  question: string;
  closesAt: string;
  status: MarketStatus;
  eventOptions: EventOptions[];
  amountTraded: number;

  imageUrl?: string;
}

export interface User {
  id: number;
  userName: string;
  email: string;
}
