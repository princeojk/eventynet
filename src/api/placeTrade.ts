import { auth } from "../firebase";

export const placetrade = async (
  eventId: number,
  side: string,
  price: number,
  amount: number,
) => {
  const url = import.meta.env.VITE_PUBLIC_BASE_URL + "v1/orders/placeOrder";
  const token = await auth.currentUser?.getIdToken();

  const body = {
    eventId: eventId,
    side: side,
    price: price,
    amount: amount,
  };

  const res = await fetch(url, {
    method: "POST",
    headers: new Headers({
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    }),
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const body = await res.json();
    console.log(body);
  }
};
