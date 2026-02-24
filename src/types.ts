export type Side = "YES" | "NO";

type MarketStatus = "OPEN" | "CLOSED";

export interface Event {
  id: number;
  question: string;
  closesAt: string;
  status: MarketStatus;
  yesPrice: number;
  noPrice: number;
  amountTraded: number;

  imageUrl?: string;
}

export interface User {
  uid: string;
  displayName: string | null;
  email: string | null;
  imageUrl?: string;
}

export interface AlertStatus {
  success: string;
  error: string;
  undefined: string;
}
