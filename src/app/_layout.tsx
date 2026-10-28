import { Stack } from "expo-router";
import { useState } from "react";
import { AccountContext } from "../state/account";

export default function RootLayout() {
  const [account, setAccount] = useState<{ name: string; email: string; password: string } | null>(null);
  return (
    <AccountContext.Provider value={{ account, setAccount }}>
      <Stack screenOptions={{ headerShown: false }} />
    </AccountContext.Provider>
  );
}
