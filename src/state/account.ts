import { createContext, useContext } from "react";

export type Account = { name: string; email: string; password: string };

type AccountContextValue = {
  account: Account | null;
  setAccount: (account: Account) => void;
};

export const AccountContext = createContext<AccountContextValue | null>(null);

export function useAccount() {
  const context = useContext(AccountContext);
  if (!context) throw new Error("AccountContext indisponível");
  return context;
}
