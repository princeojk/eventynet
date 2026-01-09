import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { getBalance } from "../../api/getBalance";

type BalanceData = {
  amount: number;
  currency: string;
};
export const useBalance = (): UseQueryResult<BalanceData, Error> => {
  return useQuery({
    queryKey: ["balance"],
    queryFn: getBalance,
    enabled: false,
  });
};
