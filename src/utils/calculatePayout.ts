export const calPayout = (amount: number, price: number) => {
  return Math.floor((amount * 100) / price);
};
