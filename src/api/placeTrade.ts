export const placetrade = async (
  eventId: number,
  side: string,
  price: number,
  amount: number,
  token: string,
) => {
  const url = import.meta.env.VITE_PUBLIC_BASE_URL + "v1/trades/placeTrade";

  const body = {
    eventId: eventId,
    side: side,
    price: price,
    amount,
  };

  const res = await fetch(url, {
    method: "POST",
    headers: new Headers({
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    }),
    body: JSON.stringify(body),
  });

  if (res.ok) {
    console.log(res);
  }
};
