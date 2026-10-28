import { useRouter } from "expo-router";
import RegisterPage from "../pages/register";
import { useAccount } from "../state/account";

export default function RegisterRoute() {
  const router = useRouter();
  const { setAccount } = useAccount();
  return (
    <RegisterPage
      onRegister={(account) => {
        setAccount(account);
        router.replace("/home");
      }}
      onBackToLogin={() => router.replace("/login")}
    />
  );
}
