import { createContext, useContext } from "react";

export const navBarContext = createContext<string | undefined>(undefined);

export const useNavBarContext: string = () => {
  const user = useContext(navBarContext);

  if (user === undefined) {
    throw new Error("user not found");
  }

  return user;
};
