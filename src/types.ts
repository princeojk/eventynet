export type Side = "YES" | "NO";

type MarketStatus = "OPEN" | "CLOSED";

export interface EventOptions {
  id: number;
  title?: string;
  yesPrice: number;
  noPrice: number;
}

export interface Event {
  id: number;
  question: string;
  closesAt: string;
  status: MarketStatus;
  eventOptions: EventOptions[];
  amountTraded: number;

  imageUrl?: string;
}

export interface User {
  uid: string;
  displayName: string | null;
  email: string | null;
  imageUrl?: string;
}
