import { useRouter } from "expo-router";
import HomePage from "../pages/home";
import { useAccount } from "../state/account";

export default function HomeRoute() {
  const router = useRouter();
  const { account } = useAccount();
  return <HomePage userName={account?.name ?? "Visitante"} onBackToLogin={() => router.replace("/login")} onNavigate={(destination) => router.push(`/${destination}` as never)} />;
}
