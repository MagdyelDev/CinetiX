import { useRouter } from "expo-router";
import LoginPage from "../pages/login";
import { useAccount } from "../state/account";

export default function LoginRoute() {
  const router = useRouter();
  const { account } = useAccount();
  return (
    <LoginPage
      account={account}
      onLoginSuccess={() => router.replace("/home")}
      onOpenRegister={() => router.push("/register")}
    />
  );
}
